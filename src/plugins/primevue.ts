/* eslint-disable vue/multi-word-component-names */
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
import Chart from "primevue/chart";
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
