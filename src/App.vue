<template>
  <h1>Vue Form Generator Test</h1>
  <div class="mx-auto max-w-7xl">
    <Generator :form="form" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { form } from "./config/FormConfig";
import Generator from "./components/Generator.vue";

export default defineComponent({
  name: "App",
  components: {
    Generator,
  },
  setup() {
    return {
      form,
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
