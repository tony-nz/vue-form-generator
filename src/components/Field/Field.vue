<template>
  <div v-if="isMounted && isFieldVisible(field) && field.id" class="grid gap-1">
    <component
      v-if="field.label && field.type !== 'switch'"
      :is="getLabelType(field)" class="label"
      :for="field.id"
    >
      {{ field.label }}
    </component>
    <div v-if="field.type == 'address'">
      <AutoComplete
        v-model="addressValue"
        :optionLabel="field.optionsLabel ? field.optionsLabel : 'name'"
        :suggestions="addressPredictions"
        @complete="searchAddress"
        class="w-full"
      >
        <template #option="slotProps">
          <div class="flex align-options-center">
            <div @click="selectAddress(slotProps.option)">
              {{ field.optionsLabel ? slotProps.option[field.optionsLabel] : slotProps.option.description }}
            </div>
          </div>
        </template>
      </AutoComplete>
    </div>
    <div v-else-if="field.type == 'file'">
      <FileUpload
        :name="`${field.id}`"
        :multiple="field.multiple || false"
        :file-limit="field.maxFiles || null"
        :custom-upload="true"
        :preview-width="100"
        :max-file-size="field.maxFileSize || 5000000"
        :show-upload-button="false"
        :show-cancel-button="false"
        :accept="field.fileType || null"
        :class="{
          'border-red-500 border rounded': state.errors[field.id],
        }"
        @select="setFileFieldValue(field, $event)"
      >
        <template #empty>
          <p>
            {{ field.placeholder || "Drag and drop file here to upload." }}
          </p>
        </template>
      </FileUpload>
      <ProgressBar
        v-if="state.uploadProgress[field.id]"
        :value="state.uploadProgress[field.id]"
        class="mt-2"
      />
      <p v-if="state.uploadErrors[field.id]" class="mt-2 text-red-600">
        {{ state.uploadErrors[field.id] }}
      </p>
    </div>
    <div v-else-if="field.type == 'switch'">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <InputSwitch
            v-model="localValue"
            :value="localValue"
            :name="field.id"
            :required="field.required"
            :class="{
              'input w-full': field.type != 'switch' ? true : false,
            }"
            :trueValue="1"
            :falseValue="0"
            class="dark:border-none"
          />
        </div>
        <div class="ml-3 text-sm">
          <label :for="field.id" class="font-medium text-gray-700">{{
            field.label
          }}</label>
          <p class="text-gray-500">
            {{ field.placeholder }}
          </p>
          <span
            v-if="
              Object.keys(state.errors).length > 0 && state.errors[field.id]
            "
            class="text-red-700"
          >
            {{ state.errors[field.id] }}
          </span>
        </div>
      </div>
    </div>
    <div v-else-if="field.type === 'radio'">
      <div
        v-for="option of field.options"
        :key="option.id"
        class="field-radiobutton"
      >
        <RadioButton
          :inputId="formatValue(option)"
          :name="field.id"
          :value="formatValue(option)"
          :required="field.required"
          v-model="localValue"
        />
        <label :for="option" class="ml-2">{{ formatOption(option) }}</label>
      </div>
      <span
        v-if="Object.keys(state.errors).length > 0 && state.errors[field.id]"
        class="text-red-700"
      >
        {{ state.errors[field.id] }}
      </span>
    </div>
    <div v-else>
      <component
        v-if="field && field.type"
        v-model="localValue"
        :auto-clear="false"
        :buttonLayout="field.buttonLayout ? field.buttonLayout : 'horizontal'"
        :class="Object.assign(
          {
            'input w-full': field.type !== 'switch',
            'p-invalid': state.errors[field.id]
          }, field.class !== undefined ? field.class : {'dark:bg-slate-900 dark:border-none': true}
        )"
        :currency="field.currency ? field.currency : 'NZD'"
        :date-format="field.dateFormat ? field.dateFormat : 'dd/mm/yy'"
        :decrementButtonClass="field.decrementButtonClass ? field.decrementButtonClass : 'p-button-danger'"
        :decrementButtonIcon="field.decrementButtonIcon ? field.decrementButtonIcon : 'pi pi-minus'"
        :editorStyle="field.editorStyle"
        :falseValue="0"
        :filter="field.filter ? field.filter : false"
        :formats="field.formats"
        :incrementButtonClass="field.incrementButtonClass ? field.incrementButtonClass : 'p-button-success'"
        :incrementButtonIcon="field.incrementButtonIcon ? field.incrementButtonIcon : 'pi pi-plus'"
        :is="getComponent(field.type)"
        :max="100"
        :max-date="new Date()"
        :min="0"
        :mode="field.mode ? field.mode : 'decimal'"
        :name="field.id"
        :optionLabel="field.optionsLabel ? field.optionsLabel : 'name'"
        :optionValue="field.optionValue ? field.optionValue : 'id'"
        :options="getFieldOptions(field)"
        :placeholder="field.placeholder || 'Please select...'"
        :readonly="field.readonly"
        :required="field.required"
        :showButtons="field.showButtons ? field.showButtons : false"
        :size="field.size ? field.size : null"
        :step="field.step ? field.step : '1'"
        :trueValue="1"
        :value="localValue"
      >
        <template #option="slotProps">
          <slot name="option" v-bind:slotProps="slotProps" />
        </template>
      </component>
      <span
        v-if="Object.keys(state.errors).length > 0 && state.errors[field.id]"
        class="text-red-700"
      >
        {{ state.errors[field.id] }}
      </span>
    </div>
    <p v-if="field.hint" class="mt-2 text-sm italic text-gray-500">
      {{ field.hint }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, PropType, ref } from "vue";
import { VueFormGeneratorOptions } from "../../types/VueFormGeneratorOptions";
import type { Field, Resource } from "../../types/VueFormGenerator";

/**
 * This is a workaround for the google maps typescript definitions
 */
declare global {
  interface Window {
    google: any;
  }
}

export default defineComponent({
  name: "Field",
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    fetchData: {
      type: Function as PropType<(parameter: Object) => Promise<void>>,
      required: false,
    },
    field: {
      type: Object as PropType<Field>,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
    value: {
      type: [Object, Array, Number, String, Boolean],
      required: true,
    },
    values: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const addressPredictions = ref();
    const addressService = ref();
    const addressGeocoder = ref();
    const dropdownOptions: any = ref([]);
    const isMounted = ref(false);
    const options = inject("vueFormGeneratorOptions") as VueFormGeneratorOptions;

    /**
     * formatOption
     * @param option
     * @returns a clean option, removing underscores
     * and capitalizing first letter
     */
    const formatOption = (option: string) => {
      return (
        option.charAt(0).toUpperCase() +
        option.slice(1).toLowerCase().replaceAll("_", " ")
      );
    };
    /**
     * formatValue
     * @param value
     * @returns converted value
     */
    const formatValue = (value: string) => {
      switch (value.toLowerCase()) {
        case "true":
        case "yes":
          return "1";
        case "false":
        case "no":
          return "0";
        default:
          return value;
      }
    };
    /**
     * getComponent
     * @param value
     *
     * Get component name from field type
     */
    const getComponent = (fieldType: string) => {
      switch (fieldType) {
        case "address":
          return "Checkbox";
        case "checkbox":
          return "Checkbox";
        case "date":
          return "Calendar";
        case "editor":
          return "Editor";
        case "file":
          return "FileUpload";
        case "mulitselect":
          return "MultiSelect";
        case "number":
          return "InputNumber";
        case "radio":
          return "RadioButton";
        case "select":
          return "Dropdown";
        case "switch":
          return "InputSwitch";
        case "textarea":
          return "Textarea";
        case "text":
        case "tel":
          return "InputText";
        case "colorpicker":
          return "ColorPicker";
        default:
          return "InputText";
      }
    };
    /**
     * getData
     * @param url
     * @param fieldId
     * @returns data from an external/api source
     */
    async function getData(url: string, fieldId: string, resource: Resource) {
      const vueFormGeneratorOptions: VueFormGeneratorOptions | undefined = inject("vueFormGeneratorOptions");
      setTimeout(() => {
        if (props.fetchData) {
          props.fetchData({ url, fieldId, resource }).then((data: any) => {
            dropdownOptions.value[fieldId] = data;
          });
        } else if (vueFormGeneratorOptions && typeof vueFormGeneratorOptions.defaultFetchData == "function") {
          vueFormGeneratorOptions.defaultFetchData({ url, fieldId, resource }).then(
            (data: any) => {
              dropdownOptions.value[fieldId] = data;
            }
          );
        }
        return dropdownOptions.value[fieldId];
      }, 1);
    }

    /**
     * getFieldOptions
     * @param field
     * @returns apiData or localData or field.options
     */
    const getFieldOptions = (field: any) => {
      if (field.optionsUrl) {
        // Extract field names from the optionsUrl - /${date}/${id}
        const fieldNames = field.optionsUrl.match(/\${(.*?)}/g);
        if (fieldNames) {
          fieldNames.forEach((fieldName: string) => {
            const fieldNameWithoutBraces = fieldName.replace("${", "").replace("}", "");
            field.optionsUrl = field.optionsUrl.replace(fieldName, props.values[fieldNameWithoutBraces]);
          });
        }
        if (Object.keys(dropdownOptions.value).length === 0 && isMounted.value === true) {
          getData(field.optionsUrl, field.id, field.resource);
        }
        return dropdownOptions.value[field.id];
      } else if (field.localData) {
        return field.localData;
      }
      return field.options;
    };

    /**
     * getLabelType
     * @param field
     * @returns string
     * This function returns the label type for a field.
     */
    const getLabelType = (field: Field) => {
      switch (field.type) {
        case "radio":
        case "checkbox":
        case "file":
        case "multiselect":
          return "span";
        default:
          return "label";
      }
    };

    /**
     * isFieldVisible
     * @param field
     * @returns boolean
     * This function checks if a field is visible
     * based on the conditional property.
     */
    const isFieldVisible = (field: Field) => {
      if (
        !field.conditional ||
        !field.conditional.field ||
        !field.conditional.value
      ) {
        return true;
      }
      const conditionalValue = field.conditional.value;
      const conditionalField = props.state.values[field.conditional.field];

      if (Array.isArray(conditionalValue)) {
        if (Array.isArray(conditionalField)) {
          return conditionalValue.some((value) =>
            conditionalField.includes(value)
          );
        } else {
          return conditionalValue.includes(conditionalField);
        }
      }
      return conditionalField === conditionalValue;
    };

    /**
     * addressValue
     * @returns emit update
     * @returns emit input
     */
    const addressValue = computed({
      get() {
        if (typeof props.value === "object" && props.value !== null) {
          const valueObj = props.value as Record<string, any>;
          return valueObj.address;
        }
        return props.value;
      },
      set(value) {
        emit("update", props.field?.id, value);
      },
    });

    /**
     * localValue
     * @returns emit update
     * @returns emit input
     */
    const localValue = computed({
      get() {
        return props.value;
      },
      set(value) {
        emit("update", props.field?.id, value);
      },
    });

    /**
     * setFileFieldValue
     * @param field
     * @param $event
     *
     * Add files to state object fileFieldsFiles
     */
    const setFileFieldValue = (field: Field, $event: any) => {
      emit("setFileFieldValue", field, $event);
    };

    /**
     * geocode
     * @param options
     * 
     * Geocode an address
     */
    const geocode = (options: any) => {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        if (!options.geometry) {
          geocoder.geocode(options, (results: any, status: any) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              resolve(results);
            } else {
              reject(status);
            }
          });
        } else {
          resolve([options]);
        }
      });
    };

    /**
     * selectAddress
     * @param place 
     */

    const selectAddress = (place: any) => {
      geocode({ placeId: place.place_id }).then((response: any) => {
        const result = {
          address: response[0].formatted_address,
          place_id: response[0].place_id,
          latitude: response[0].geometry.location.lat(),
          longitude: response[0].geometry.location.lng(),
        };

        addressValue.value = result;
      });
    };

    /**
     * getRequestOptions
     * @returns options
     * 
     * Get request options, cross check with props.field.googlePlace
     */
    const getRequestOptions = () => {
      const requestOptions = {
        input: addressValue.value,
        ...options?.googlePlace,
      };

      return requestOptions;
    };

    /**
     * searchAddress
     */
    const searchAddress = () => {
      return new Promise((resolve, reject) => {
        if (!addressValue.value) {
          addressPredictions.value = false;
          reject(new Error('Input empty'));
        } else {
          addressService.value.getPlacePredictions(
            getRequestOptions(),
            (response: any, status: any) => {
              switch (status) {
                case window.google.maps.places.PlacesServiceStatus.OK:
                addressPredictions.value = response;
                  resolve(response);
                  break;
                default:
                  reject(new Error(`Error with status: ${status}`));
              }
            }
          );
        }
      });
    };

    /**
     * loadGoogleMaps
     * 
     */
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          addressService.value = new window.google.maps.places.AutocompleteService();
          addressGeocoder.value = new window.google.maps.Geocoder();
          resolve;
        } else {
          if(!options?.googlePlace?.apiKey) {
            reject(new Error("No API key provided"));
          } else {
            const script = document.createElement("script");
            const libraries = options?.googlePlace?.libraries || ["geometry", "places"];
            // callback function for google maps
            (window as any).googleMapsCallback = function () {
              return true;
            };
            
            script.src = `https://maps.googleapis.com/maps/api/js?key=${options?.googlePlace.apiKey}&libraries=${libraries.join(",")}&callback=googleMapsCallback`;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
          }
        }
      });
    };

    /**
     * onMounted
     */
    onMounted(() => {
      if (props.field.type == "address") {
        loadGoogleMaps().then(() => {
          addressService.value = new window.google.maps.places.AutocompleteService();
          addressGeocoder.value = new window.google.maps.Geocoder();
        });
      }
      isMounted.value = true;
    });

    return {
      addressPredictions,
      addressValue,
      formatOption,
      formatValue,
      getComponent,
      getData,
      getFieldOptions,
      getLabelType,
      isFieldVisible,
      isMounted,
      localValue,
      searchAddress,
      selectAddress,
      setFileFieldValue,
    };
  },
});
</script>
