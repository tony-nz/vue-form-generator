<template>
  <form
    v-if="isMounted"
    ref="form"
    novalidate
    @submit.prevent="state.submitting"
    class="p-4"
  >
    <input name="hidden" type="text" class="hidden" />
    <!-- Tab header Component -->
    <!-- Step header Component -->
    <template v-if="form && Object.keys(form).length > 0">
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
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import type { Form } from "@/config/FormConfigTypes";
import Field from "./Field.vue";

interface State {
  currentStep: number;
  errors: Record<string, any>;
  isMounted: boolean;
  options: Record<string, any>;
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
    onMounted(() => {
      isMounted.value = true;
    });

    return {
      onChange,
      updateValue,
      isMounted,
      state,
    };
  },
});
</script>
