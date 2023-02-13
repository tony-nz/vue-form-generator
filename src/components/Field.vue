<template>
  <div
    v-if="isMounted && isFieldVisible(field)"
    :class="field.class ? field.class : 'col-span-12'"
  >
    <component :is="getLabelType(field)" class="label" />
    <label :for="field.id" class="block text-sm font-medium text-gray-700">{{
      field.label
    }}</label>
    <p class="text-gray-500">
      {{ field.description }}
    </p>
    <div v-if="field.type == 'file'">
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
      <span class="text-red-700">{{ state.errors[0] }}</span>
    </div>
    <div v-else>
      <component
        v-if="field.type"
        v-model="localValue"
        :value="localValue"
        :name="field.id"
        :is="getComponent(field.type)"
        :required="field.required"
        :class="{
          'input w-full': field.type != 'switch' ? true : false,
          'p-invalid': errors[field.id],
        }"
        :placeholder="field.placeholder || 'Please select...'"
        :readonly="field.readonly"
        :formats="field.formats"
        :editorStyle="field.editorStyle"
        :options="getFieldOptions(field)"
        :auto-clear="false"
        :min="0"
        :max="100"
        :trueValue="1"
        :falseValue="0"
        :max-date="new Date()"
        showButtons
        :optionValue="field.optionValue ? field.optionValue : 'id'"
        :optionLabel="field.optionsLabel ? field.optionsLabel : 'name'"
        mode="decimal"
        date-format="dd-mm-yy"
        class="dark:bg-slate-900 dark:border-none"
      />
      <span class="text-red-700">errors</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import type { Field } from "@/config/FormConfigTypes";

export default defineComponent({
  name: "Field",
  props: {
    errors: {
      type: Array,
      default: () => [],
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
      required: true,
    },
    values: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const isMounted = ref(false);

    /**
     * formatOption
     * @param option
     * @returns a clean option, removing underscores
     * and capitalizing first letter
     */
    const formatOption = (option) => {
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
    const formatValue = (value) => {
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
     * @param resourceName
     * @returns data from an api source
     */
    const getData = (url: string, fieldId: string, resourceName: string) => {
      // setTimeout(() => {
      //   if (resourceName) {
      //     try {
      //       const resourceStore = useResourceStore(resourceName)();
      //       return resourceStore.getList().then(({ data }) => {
      //         if (typeof data == "undefined") {
      //           return null;
      //         }
      //         state.value.options[fieldId] = data.data ? data.data : data;
      //         return data.data ? data.data : data;
      //       });
      //     } catch (e) {
      //       // TODO ERROR LOG
      //       console.log(e);
      //     }
      //   }
      //   ApiService.get(url).then((res) => {
      //     state.value.options[fieldId] = res.data.data;
      //     return res.data.data;
      //   });
      // }, 1);
    };

    /**
     * Retrieve data from api server
     */
    const getApiData = (url: string, id: string, resourceName: string) => {
      // if (
      //   Object.keys(props.state.options).length === 0 &&
      //   isMounted.value === true
      // ) {
      //   getData(url, id, resourceName);
      // }
      // return props.state.options[id];
    };

    /**
     * getFieldOptions
     * @param field
     * @returns apiData or localData or field.options
     */
    const getFieldOptions = (field: any) => {
      if (field.optionsUrl) {
        return getApiData(field.optionsUrl, field.id, field.resourceName);
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
      const conditionalField = props.values[field.conditional.field];

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
    const setFileFieldValue = (field, $event) => {
      emit("setFileFieldValue", field, $event);
    };

    onMounted(() => {
      isMounted.value = true;
    });

    return {
      getComponent,
      getFieldOptions,
      getLabelType,
      isFieldVisible,
      setFileFieldValue,
      formatValue,
      formatOption,
      isMounted,
      localValue,
    };
  },
});
</script>
