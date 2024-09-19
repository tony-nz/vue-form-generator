<template>
  <form
    v-if="state.isMounted"
    ref="form"
    novalidate
    @submit.prevent="submitForm"
  >
    <input name="hidden" type="text" class="hidden" />
    <template v-if="form && Object.keys(form).length > 0">
      <div
        v-if="type === 'steps'"
        class="mb-4 lg:border-t lg:border-b lg:border-gray-200 text-left"
      >
        <nav aria-label="Progress">
          <ol
            role="list"
            class="rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
          >
            <li
              v-for="(step, stepIdx) in form"
              :key="stepIdx"
              class="relative overflow-hidden flex-1"
            >
              <div
                :class="[
                  stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
                  stepIdx === Object.keys(step).length - 1
                    ? 'border-t-0 rounded-b-md'
                    : '',
                  'border border-gray-200 overflow-hidden lg:border-0',
                ]"
              >
                <div class="text-left">
                  <span
                    :class="
                      state.steps[stepIdx].status === 'complete'
                        ? 'bg-primary-400'
                        : 'bg-gray-200'
                    "
                    class="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                    aria-hidden="true"
                  />
                  <span
                    :class="[
                      stepIdx !== 0 ? 'lg:pl-9' : '',
                      'px-6 py-5 flex items-start text-sm font-medium',
                    ]"
                  >
                    <span class="flex-shrink-0">
                      <span
                        :class="
                          state.steps[stepIdx].status === 'complete'
                            ? 'bg-primary-500 border-primary-400'
                            : 'bg-gray-200'
                        "
                        class="w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-full"
                      >
                        <span class="text-gray-500">
                          <svg
                            v-if="state.steps[stepIdx].status === 'complete'"
                            class="checkmark"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                          >
                            <path
                              class="checkmark__check"
                              fill="none"
                              d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                    <span class="mt-0.5 ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold text-gray-500 tracking-wide uppercase"
                        >{{ step.name }}</span
                      >
                      <span class="text-sm font-medium text-gray-500">{{
                        step.description
                      }}</span>
                    </span>
                  </span>
                </div>
                <template v-if="stepIdx !== 0">
                  <!-- Separator -->
                  <div
                    class="hidden absolute top-0 left-0 w-3 inset-0 lg:block"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-full w-full text-gray-300"
                      viewBox="0 0 12 82"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.5 0V31L10.5 41L0.5 51V82"
                        stroke="currentcolor"
                        vector-effect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </template>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div v-if="type === 'tabs'">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option
              v-for="(tab, tabIdx) in form"
              :key="tabIdx"
              :selected="state.currentStep === tabIdx"
            >
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200 mb-4">
            <nav class="-mb-px flex gap-8" aria-label="Tabs">
              <button
                v-for="(tab, tabIdx) in form"
                :key="tabIdx"
                @click="state.currentStep = tabIdx"
                :class="[
                  state.currentStep === tabIdx
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                ]"
                :aria-current="
                  state.currentStep === tabIdx ? 'page' : undefined
                "
                type="button"
              >
                {{ tab.name }}
                <span
                  v-if="state.steps[tabIdx].errors.length > 0"
                  class="text-red-500 text-xs italic"
                  >({{ state.steps[tabIdx].errors.length }} error{{
                    state.steps[tabIdx].errors.length > 1 ? "s" : null
                  }})</span
                >
              </button>
              <button
                type="submit"
                class="ml-auto my-2 bg-primary-500 p-2 px-4 rounded-md text-white font-bold"
              >
                Save
              </button>
            </nav>
          </div>
        </div>
      </div>
      <template v-for="(item, index) in form" :key="index">
        <div
          v-if="item"
          v-show="state.currentStep === index || type === 'form'"
          class="p-4 mb-4 bg-gray-100 dark:bg-slate-800 grid grid-cols-12 gap-4 text-left"
        >
          <div
            v-for="(child, index) in item.children"
            :key="index"
            :class="child.class ? child.class : 'col-span-12'"
          >
            <div v-if="child.label" class="mb-4 pb-2 border-b">
              <label
                :for="child.label"
                class="block text-lg font-medium text-gray-700"
                >{{ child.label }}</label
              >
              <span class="block text-sm font-medium text-gray-400">
                {{ child.description }}
              </span>
            </div>
            <div class="grid grid-cols-12 gap-4">
              <template v-for="(field, index) in child.fields" :key="index">
                <template
                  v-if="!allowedFields || allowedFields?.includes(field?.id)"
                >
                  <Accordion v-if="field.display == 'accordion'" class="mt-4">
                    <AccordionTab :header="field.label">
                      <Field
                        v-if="field.id"
                        @update="updateValue"
                        :fetchData="fetchData"
                        :field="field"
                        :state="state"
                        :value="state.values[field.id]"
                      />
                    </AccordionTab>
                  </Accordion>
                  <template v-else-if="field.id && isFieldVisible(field)">
                    <Field
                      @update="updateValue"
                      :fetchData="fetchData"
                      :field="field"
                      :hiddenFields="hiddenFields"
                      :state="state"
                      :value="state.values[field.id]"
                    />
                  </template>
                </template>
              </template>
            </div>
          </div>
        </div>
      </template>

      <div
        v-if="showSubmit && type === 'form'"
        class="flex border-t border-gray-200 p-4 bg-gray-100 dark:bg-slate-800 justify-end"
      >
        <slot name="footer" />
        <div>
          <button
            type="submit"
            class="bg-primary-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500"
          >
            Save
          </button>
        </div>
      </div>
      <div
        v-if="form.length > 0 && type === 'steps'"
        class="mt-10 flex justify-between pt-6 border-t border-gray-200"
      >
        <nav
          class="flex items-center justify-center ml-2"
          aria-label="Progress"
        >
          <p class="text-sm font-medium">
            Step
            {{ state.currentStep + 1 }} of
            {{ form.length }}
          </p>
          <ol role="list" class="ml-8 flex items-center space-x-5">
            <li v-for="step in state.steps" :key="step.id">
              <a
                v-if="step.status === 'complete'"
                class="block w-2.5 h-2.5 bg-primary-600 rounded-full hover:bg-primary-900"
              >
                <span class="sr-only">{{ step.name }}</span>
              </a>
              <a
                v-else-if="step.status === 'current'"
                class="relative flex items-center justify-center"
                aria-current="step"
              >
                <span class="absolute w-5 h-5 p-px flex" aria-hidden="true">
                  <span class="w-full h-full rounded-full bg-primary-200" />
                </span>
                <span
                  class="relative block w-2.5 h-2.5 bg-primary-600 rounded-full"
                  aria-hidden="true"
                />
                <span class="sr-only">{{ step.name }}</span>
              </a>
              <a
                v-else
                class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400"
              >
                <span class="sr-only">{{ step.name }}</span>
              </a>
            </li>
          </ol>
        </nav>
        <div>
          <button
            v-if="state.currentStep > 0"
            @click="state.currentStep--"
            class="bg-gray-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 mr-2"
            type="button"
          >
            Previous
          </button>
          <button
            v-if="state.currentStep < form.length - 1"
            @click="validateStepFields() ? state.currentStep++ : null"
            class="bg-gray-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            type="button"
          >
            Next
          </button>
          <button
            v-if="state.currentStep === form.length - 1"
            type="submit"
            class="bg-primary-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500"
          >
            Finish
          </button>
        </div>
      </div>
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import type {
  Field as FieldType,
  Form as VueFormGeneratorForm,
} from "../../types/VueFormGenerator";
import Field from "../Field";
import "../../style.css";

interface Steps {
  errors: Record<string, any>;
  id: number;
  name: string;
  description: string;
  status: string;
  requiredFields: Array<string>;
}
interface State {
  currentStep: number;
  errors: Record<string, any>;
  isMounted: boolean;
  options: Record<string, any>;
  steps: Array<Steps>;
  submitting: boolean;
  uploadErrors: Array<string>;
  uploadProgress: Array<string>;
  values: Record<string, any>;
}
export default defineComponent({
  name: "VueFormGenerator",
  components: {
    Field,
  },
  props: {
    allowedFields: {
      type: Array,
    },
    autoComplete: {
      type: String,
      default: "off",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    fetchData: {
      type: Function as PropType<(parameter: Object) => Promise<void>>,
      required: false,
    },
    form: {
      type: Array as PropType<Array<VueFormGeneratorForm>>,
      required: true,
    },
    hiddenFields: {
      type: Array,
    },
    showSubmit: {
      type: Boolean,
      default: false,
    },
    submit: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "form",
    },
  },
  setup(props, { emit }) {
    /**
     * State
     * @description State
     * @type {State}
     * @property {number} currentStep - Current step
     * @property {Array} errors - Errors
     * @property {boolean} isMounted - Is mounted
     * @property {Object} options - Options
     * @property {Array} steps - Steps
     * @property {boolean} submitting - Submitting
     * @property {Object} values - Values
     */
    const state = ref<State>({
      currentStep: 0,
      errors: [],
      isMounted: false,
      options: {},
      steps: [],
      submitting: false,
      uploadErrors: [],
      uploadProgress: [],
      values: {},
    });

    /**
     * Load props
     * @description Load props
     */
    const loadProps = () => {
      const steps = props.form.map((item: any, index) => {
        return {
          errors: {},
          id: index,
          name: item.name,
          description: item.description,
          status: "",
          requiredFields: item.children
            .map((child: any) => {
              return child.fields
                .filter((field: any) => field.required)
                .map((field: any) => field.id);
            })
            .flat(),
          matchedFields: item.children
            .map((child: any) => {
              return child.fields
                .filter((field: any) => field.matched)
                .map((field: any) => field.id);
            })
            .flat(),
        };
      });
      state.value.steps.push(...steps);
      // loop through form
      props.form.forEach((item: any) => {
        // loop through children
        item.children.forEach((child: any) => {
          // loop through fields
          child.fields.forEach((field: any) => {
            const value = child.type === "checkbox" ? [] : "";

            // set value
            state.value.values[field.id] = props.data[field.id]
              ? props.data[field.id]
              : value;
            // set options
            if (field.options) {
              state.value.options[field.id] = field.options;
            }
          });
        });
      });
      // loop through props.data and set values
      Object.keys(props.data).forEach((key) => {
        state.value.values[key] = props.data[key];
      });
    };

    /**
     * isFieldVisible
     * @param field
     * @returns boolean
     * This function checks if a field is visible
     * based on the conditional property.
     */
    const isFieldVisible = (field: FieldType) => {
      if (
        !field.conditional ||
        !field.conditional.field ||
        !field.conditional.value
      ) {
        return true;
      }
      const conditionalValue = field.conditional.value;
      const conditionalField = state.value.values[field.conditional.field];

      // Check if the conditional value is a regex
      if (conditionalValue instanceof RegExp) {
        return conditionalValue.test(conditionalField);
      }

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
     * Save data
     * @description emit data back
     * @param {string} fieldId - Field id
     */
    const saveData = (data: any) => {
      emit("updateData", data);
    };

    /**
     * Submit form
     * @description Submit form
     */
    const submitForm = () => {
      if (validateAllSteps()) {
        saveData(state.value.values);
      }
    };

    /**
     * Update state values
     * @description Update value
     * @param {string} fieldId - Field id
     * @param {any} value - Value
     */
    const updateValue = (fieldId: string, value: any) => {
      state.value.values[fieldId] = value;
    };

    /**
     * Validate all steps
     * @description Validate all steps
     */
    const validateAllSteps = () => {
      state.value.errors = [];
      const steps = state.value.steps;
      const values = state.value.values;

      const errors = steps
        .map((step) => {
          const unfilledFields = step.requiredFields.filter(
            (field) => !values[field]
          );

          if (unfilledFields.length === 0) {
            // All required fields have been filled out
            step.status = "complete";
          }

          step.errors = unfilledFields;
          return unfilledFields;
          // return step.requiredFields.filter((field) => !values[field]);
        })
        .flat();
      if (errors.length) {
        // loop through errors and set error message
        errors.forEach((error) => {
          state.value.errors[error] = "This field is required";
        });
        return false;
      }
      return true;
    };

    /**
     * Validate step fields
     * @description Validate required fields for current step
     */
    const validateStepFields = () => {
      const currentStep = state.value.steps[state.value.currentStep];
      const requiredFields = currentStep.requiredFields;
      const values = state.value.values;
      // clear all step status
      state.value.steps.forEach((step) => {
        step.status = "";
      });
      state.value.errors = [];
      currentStep.status = "";

      const errors = requiredFields.filter((field) => !values[field]);
      if (errors.length) {
        // loop through errors and set error message
        errors.forEach((error) => {
          state.value.errors[error] = "This field is required";
        });
        return false;
      }
      currentStep.status = "complete";
      return true;
    };

    // watch for changes in values, send back to parent
    watch(
      state.value.values,
      () => {
        emit("onChange", state.value.values);
      },
      { deep: true }
    );

    /**
     * Watch for new prop data
     */
    watch(
      () => props.data,
      async (newData) => {
        // loop through props.data and set values
        Object.keys(newData).forEach((key) => {
          state.value.values[key] = newData[key];
        });
      },
      { deep: true }
    );

    // watch for changes on submit prop
    watch(
      () => props.submit,
      () => {
        if (props.submit) {
          if (validateAllSteps()) {
            emit("validated", true, state.value.values);
          } else {
            emit("validated", false);
          }
        }
      }
    );

    onMounted(() => {
      loadProps();
      state.value.isMounted = true;
    });

    return {
      isFieldVisible,
      state,
      submitForm,
      updateValue,
      validateStepFields,
    };
  },
});
</script>

<style>
/*
 * Component CSS
 */
.checkmark {
  width: 40px;
  height: 40px;
  stroke-width: 4;
  stroke: white;
}

.p-invalid {
  color: #000000;
  background: rgb(255, 0, 0, 0.2);
}
</style>
