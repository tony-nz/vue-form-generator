<template>
  <h1>Vue Form Generator Test</h1>
  <div class="p-4 mx-auto max-w-7xl">
    <Generator @updateData="updateData" :form="form" :type="'steps'" />
  </div>
  <div v-if="showSuccess" class="mt-8 mx-auto max-w-7xl p-8 bg-green-300">
    <h2>Success!</h2>
    <div class="mt-4">{{ data }}</div>
  </div>
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
    const showSuccess = ref(false);
    const data = ref();

    const updateData = (values: any) => {
      console.log("updateData", values);
      data.value = values;
      showSuccess.value = true;
    };

    return {
      data,
      form,
      showSuccess,
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
