<template>
  <form
    v-if="isMounted"
    ref="form"
    novalidate
    @submit.prevent="state.submitting"
    class="p-4"
  >
    <input name="hidden" type="text" class="hidden" />
    <template v-if="form && Object.keys(form).length > 0">
      <div class="lg:border-t lg:border-b lg:border-gray-200 text-left">
        <nav class="" aria-label="Progress">
          <ol
            role="list"
            class="rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
          >
            <li
              v-for="(step, stepIdx) in form"
              :key="step.id"
              class="relative overflow-hidden lg:flex-1"
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
                <a
                  v-if="step.status === 'complete'"
                  :href="step.href"
                  class="group"
                >
                  <span
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
                        class="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full"
                      >
                        <CheckIcon
                          class="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span class="mt-0.5 ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold tracking-wide uppercase"
                        >{{ step.name }}</span
                      >
                      <span class="text-sm font-medium text-gray-500">{{
                        step.description
                      }}</span>
                    </span>
                  </span>
                </a>
                <a
                  v-else-if="step.status === 'current'"
                  :href="step.href"
                  aria-current="step"
                >
                  <span
                    class="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
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
                        class="w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full"
                      >
                        <span class="text-indigo-600">{{ step.id }}</span>
                      </span>
                    </span>
                    <span class="mt-0.5 ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold text-indigo-600 tracking-wide uppercase"
                        >{{ step.name }}</span
                      >
                      <span class="text-sm font-medium text-gray-500">{{
                        step.description
                      }}</span>
                    </span>
                  </span>
                </a>
                <a v-else :href="step.href" class="group">
                  <span
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
                        class="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full"
                      >
                        <span class="text-gray-500">{{ step.id }}</span>
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
                </a>
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
      <!-- Tab header Component -->
      <!-- Step header Component -->
      <template v-for="(item, index) in form" :key="index">
        <div
          v-if="item"
          v-show="state.currentStep === index || item.type === 'group'"
          class="p-2 mb-4 bg-gray-100 grid grid-cols-12 gap-4 text-left"
        >
          <div
            v-for="(child, index) in item.children"
            :key="index"
            :class="child.class ? child.class : 'col-span-12'"
          >
            <!-- {{ child.description }} -->
            <label
              :for="child.id"
              class="block text-sm font-medium text-gray-700"
              >{{ child.label }}</label
            >
            <div class="grid grid-cols-12 gap-4">
              <template v-for="(field, index) in child.fields" :key="index">
                <div
                  v-if="!allowedFields || allowedFields?.includes(field?.id)"
                  :class="field.class ? field.class : 'col-span-12'"
                >
                  <Accordion v-if="field.display == 'accordion'">
                    <AccordionTab :header="field.label">
                      <Field
                        @update="updateValue"
                        :field="field"
                        :state="state"
                        :value="state.values[field.id]"
                      />
                    </AccordionTab>
                  </Accordion>
                  <Field
                    v-else
                    @update="updateValue"
                    :field="field"
                    :state="state"
                    :value="state.values[field.id]"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>

      <div
        v-if="form[0].type === 'tab'"
        class="mt-10 flex justify-end pt-6 border-t border-gray-200"
      >
        <button
          v-if="state.currentStep > 0"
          @click="state.currentStep--"
          type="submit"
          class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 mr-2"
        >
          Previous
        </button>
        <button
          v-if="state.currentStep < form.length - 1"
          @click="validateStepFields() ? state.currentStep++ : null"
          type="submit"
          class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import type { Form } from "@/config/FormConfigTypes";
import Field from "./Field.vue";

interface Steps {
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
  values: Record<string, any>;
}
export default defineComponent({
  name: "Generator",
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
    form: {
      type: Array as PropType<Form>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state = ref<State>({
      currentStep: 0,
      errors: [],
      isMounted: false,
      options: {},
      steps: [],
      submitting: false,
      values: {},
    });
    const isMounted = ref(false);
    const updateValue = (fieldId: string, value: any) => {
      state.value.values[fieldId] = value;
    };
    const onChange = (data: any) => {
      emit("updateData", data);
    };

    /**
     * Load steps
     * @description Load steps from form config
     */
    const loadSteps = () => {
      const steps = props.form.map((item, index) => {
        return {
          id: index,
          name: item.name,
          description: item.description,
          status: "",
          requiredFields: item.children
            .map((child) => {
              return child.fields
                .filter((field) => field.required)
                .map((field) => field.id);
            })
            .flat(),
        };
      });
      state.value.steps.push(...steps);
    };

    const validateStepFields = () => {
      const currentStep = state.value.steps[state.value.currentStep];
      const requiredFields = currentStep.requiredFields;
      const values = state.value.values;
      const errors = requiredFields.filter((field) => !values[field]);
      console.log("validateStepFields", errors);
      if (errors.length) {
        // loop through errors and set error message
        errors.forEach((error) => {
          state.value.errors[error] = "This field is required";
        });
        // state.value.errors = errors;
        return false;
      }
      return true;
    };

    onMounted(() => {
      loadSteps();
      isMounted.value = true;
    });

    return {
      onChange,
      updateValue,
      isMounted,
      state,
      validateStepFields,
    };
  },
});
</script>
