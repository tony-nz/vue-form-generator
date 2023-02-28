<template>
  <div v-if="isMounted && isFieldVisible(field) && field.id">
    <component :is="getLabelType(field)" class="label" />
    <label
      v-if="field.label && field.type !== 'switch'"
      :for="field.id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ field.label }}
    </label>
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
    <div v-if="field.type == 'switch'">
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
            class="dark:bg-slate-900 dark:border-none"
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
        :value="localValue"
        :name="field.id"
        :is="getComponent(field.type)"
        :required="field.required"
        :class="{
          'input w-full': field.type != 'switch' ? true : false,
          'p-invalid': state.errors[field.id],
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
import type { Field } from "../../types/VueFormGenerator";

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
      required: true,
    },
    values: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const dropdownOptions: any = ref([]);
    const isMounted = ref(false);

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
    async function getData(url: string, fieldId: string, resourceName: string) {
      const vueFormGeneratorOptions: VueFormGeneratorOptions | undefined = inject("vueFormGenerator");
      if(props.fetchData) {
        props.fetchData({ url, fieldId, resourceName }).then((data: any) => {
          dropdownOptions.value[fieldId] = data;
        });
      } else if (vueFormGeneratorOptions && typeof vueFormGeneratorOptions.defaultFetchData == "function") {
        vueFormGeneratorOptions.defaultFetchData({ url, fieldId, resourceName }).then(
          (data: any) => {
            dropdownOptions.value[fieldId] = data;
          }
        );
      }
      return dropdownOptions.value[fieldId];
    }

    /**
     * getFieldOptions
     * @param field
     * @returns apiData or localData or field.options
     */
    const getFieldOptions = (field: any) => {
      if (field.optionsUrl) {
        getData(field.optionsUrl, field.id, field.resourceName);
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

    onMounted(() => {
      isMounted.value = true;
    });

    return {
      formatOption,
      formatValue,
      getComponent,
      getData,
      getFieldOptions,
      getLabelType,
      isFieldVisible,
      isMounted,
      localValue,
      setFileFieldValue,
    };
  },
});
</script>
