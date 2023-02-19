<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/tony-nz/vue-form-generator">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Vue Form Generator</h3>

  <p align="center">
    Vue Form Generator is a powerful and flexible form creation tool for Vue.js applications. It generates forms from a configuration file and provides different frontend rendering options such as form, tabs, and steps. The tool uses Tailwind CSS and PrimeVue UI component library to create attractive and responsive forms. Additionally, it can retrieve data from a defined API provider. With Vue Form Generator, users can quickly create customized and dynamic forms that seamlessly integrate with their Vue.js applications.
    <br />
    <br />
    <a href="#">Documentation</a>
    ·
    <a href="https://vue-form-generator.netlify.app/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/tony-nz/vue-form-generator/issues">Report Bug</a>
    ·
    <a href="https://github.com/tony-nz/vue-form-generator/issues">Request Feature</a>
    ·
  </p>
</div>

[![Product Name Screen Shot][product-screenshot]](https://example.com)

### Installation

1. Install npm
   ```sh
    npm install @tony-nz/vue-form-generator
   ```
2. Install the following:

- [PrimeVue](https://primevue.org/setup)
- [TailwindCSS](https://v2.tailwindcss.com/docs/guides/vue-3-vite)

3. Edit `main.js` or `main.ts`

   ```ts
   import { createApp } from "vue";
   import { initPrimeVue } from "@/plugins/primevue";
   import { VueFormGeneratorPlugin } from "@tony-nz/vue-form-generator";

   import App from "./App.vue";
   import "./assets/tailwind.css";

   const app = createApp(App);

   /**
    * Initialize PrimeVue
    */
   initPrimeVue(app);

   /**
    * Initialize VueFormGenerator
    */
   app.use(VueFormGeneratorPlugin, {});

   app.mount("#app");

   export default app;
   ```

4. Create `plugins/primevue.ts`

   ```ts
   import { App } from "vue";
   import PrimeVue from "primevue/config";
   import ConfirmationService from "primevue/confirmationservice";
   import ToastService from "primevue/toastservice";

   // directives
   import Tooltip from "primevue/tooltip";

   // components
   import Accordion from "primevue/accordion";
   import AccordionTab from "primevue/accordiontab";
   import Button from "primevue/button";
   import Calendar from "primevue/calendar";
   import Checkbox from "primevue/checkbox";
   import Column from "primevue/column";
   import ConfirmDialog from "primevue/confirmdialog";
   import ConfirmPopup from "primevue/confirmpopup";
   import ContextMenu from "primevue/contextmenu";
   import Dialog from "primevue/dialog";
   import Dropdown from "primevue/dropdown";
   import Editor from "primevue/editor";
   import FileUpload from "primevue/fileupload";
   import InputMask from "primevue/inputmask";
   import InputNumber from "primevue/inputnumber";
   import InputText from "primevue/inputtext";
   import InputSwitch from "primevue/inputswitch";
   import Menu from "primevue/menu";
   import Menubar from "primevue/menubar";
   import MultiSelect from "primevue/multiselect";
   import PanelMenu from "primevue/panelmenu";
   import ProgressBar from "primevue/progressbar";
   import RadioButton from "primevue/radiobutton";
   import SelectButton from "primevue/selectbutton";
   import Sidebar from "primevue/sidebar";
   import TabPanel from "primevue/tabpanel";
   import TabView from "primevue/tabview";
   import Textarea from "primevue/textarea";
   import Tree from "primevue/tree";

   // styling
   import "primevue/resources/themes/tailwind-light/theme.css";
   // import "../../assets/tailwind-light/theme.css";
   import "primevue/resources/primevue.min.css";
   import "primeicons/primeicons.css";

   /**
    * Initialize PrimeVUE component
    * @param app vue instance
    */
   export function initPrimeVue(app: App<Element>) {
     app.use(PrimeVue);
     app.use(ToastService);
     app.use(ConfirmationService);
     app.directive("tooltip", Tooltip);

     // register components
     app.component("Accordion", Accordion);
     app.component("AccordionTab", AccordionTab);
     app.component("Button", Button);
     app.component("Calendar", Calendar);
     app.component("Chart", Chart);
     app.component("Checkbox", Checkbox);
     app.component("Column", Column);
     app.component("ConfirmDialog", ConfirmDialog);
     app.component("ConfirmPopup", ConfirmPopup);
     app.component("ContextMenu", ContextMenu);
     app.component("Dialog", Dialog);
     app.component("Dropdown", Dropdown);
     app.component("Editor", Editor);
     app.component("FileUpload", FileUpload);
     app.component("InputMask", InputMask);
     app.component("InputNumber", InputNumber);
     app.component("InputText", InputText);
     app.component("InputSwitch", InputSwitch);
     app.component("Menu", Menu);
     app.component("Menubar", Menubar);
     app.component("MultiSelect", MultiSelect);
     app.component("PanelMenu", PanelMenu);
     app.component("ProgressBar", ProgressBar);
     app.component("RadioButton", RadioButton);
     app.component("SelectButton", SelectButton);
     app.component("Sidebar", Sidebar);
     app.component("TabPanel", TabPanel);
     app.component("TabView", TabView);
     app.component("Textarea", Textarea);
     app.component("Tree", Tree);
   }
   ```

5. Edit `tailwind.config.js`
   ```js
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/@tony-nz/vue-form-generator/**/*.{vue,js,ts,jsx,tsx}",
    ],
   ```

<!-- LICENSE -->

## License

Distributed under the MIT License.

## Acknowledgments

- [Michael Price](https://github.com/MickyPrice)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/tony-nz/vue-form-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/tony-nz/vue-form-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tony-nz/vue-form-generator.svg?style=for-the-badge
[forks-url]: https://github.com/tony-nz/vue-form-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/tony-nz/vue-form-generator.svg?style=for-the-badge
[stars-url]: https://github.com/tony-nz/vue-form-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/tony-nz/vue-form-generator.svg?style=for-the-badge
[issues-url]: https://github.com/tony-nz/vue-form-generator/issues
[license-shield]: https://img.shields.io/github/license/tony-nz/vue-form-generator.svg?style=for-the-badge
[license-url]: https://github.com/tony-nz/vue-form-generator/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
