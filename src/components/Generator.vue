<template>
  <form
    v-if="isMounted"
    ref="form"
    novalidate
    @submit.prevent="state.submitting"
  >
    <input
      :autocomplete="`${autoComplete}`"
      name="hidden"
      type="text"
      class="hidden"
    />
    <!-- Tab header Component -->
    <!-- Step header Component -->
    <template v-if="form && Object.keys(form).length > 0">
      <template v-for="(item, index) in form" :key="index">
        <div
          v-show="state.currentStep === index"
          class="grid grid-cols-12 gap-4"
        >
          <div
            v-for="(child, index) in item.children"
            :key="index"
            :class="child.class ? child.class : 'col-span-12'"
          >
            {{ child.label }}
            {{ child.description }}
            <div class="grid grid-cols-12 gap-4">
              <template v-for="(field, index) in child.fields" :key="index">
                <Field
                  @update="updateValue"
                  :field="field"
                  :state="state"
                  :value="state.values[field.id]"
                />
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
import type FormTypes from "@/config/FormConfigTypes";
import Field from "./Field.vue";

interface State {
  currentStep: number;
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
      type: Boolean,
      default: false,
    },
    form: {
      type: Array as PropType<FormTypes>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state = ref<State>({
      currentStep: 0,
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
