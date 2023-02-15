<template>
  <h1 class="text-xl mb-2">Vue Form Generator</h1>
  <span class="font-medium text-sm"
    >A Vue 3 component for generating forms by tony-nz
    <span class="text-xs text-gray-400"
      ><a href="https://github.com/tony-nz/vue-form-generator" target="_blank"
        >Github</a
      ></span
    ></span
  >
  <div class="p-4 mx-auto max-w-7xl">
    <div class="my-4">
      <select
        v-model="type"
        class="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="form">Form</option>
        <option value="steps">Steps</option>
        <option value="tabs">Tabs</option>
      </select>
    </div>
    <Generator
      @updateData="updateData"
      :data="savedData"
      :form="form"
      :type="type"
    />
  </div>
  <footer
    v-if="showSuccess"
    class="w-full h-64 bg-green-300 fixed bottom-0 pt-10"
  >
    <div class="ml-auto relative">
      <div class="absolute -top-5 right-0 h-16 w-16">
        <button
          @click="showSuccess = false"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-green-400 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="defaultModal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close success</span>
        </button>
      </div>
    </div>
    <div class="mx-auto max-w-7xl bg-green-300">
      <h2 class="font-medium text-xl">Success!</h2>
      <div class="mt-4">{{ data }}</div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { form } from "./config/FormConfig";
import Generator from "./components/Generator.vue";

export default defineComponent({
  name: "App",
  components: {
    Generator,
  },
  setup() {
    const data = ref();
    const savedData = ref({
      givenName: "John",
      familyName: "Doe",
      changePasswordAtNextLogin: 1,
    });
    const showSuccess = ref(false);
    const type = ref("tabs");
    const updateData = (values: any) => {
      data.value = values;
      showSuccess.value = true;
    };

    return {
      data,
      form,
      savedData,
      showSuccess,
      type,
      updateData,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  margin-bottom: 30px;
}
</style>
