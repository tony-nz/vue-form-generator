interface Conditional {
  field?: string;
  value?: string | number | boolean;
}

interface GooglePlace {
  apiKey?: string;
  libraries?: Array<string>;
  bounds?: boolean | object | string;
  location?: boolean | object | string;
  offset?: boolean;
  radius?: boolean;
  types?: boolean | Array<string>;
}

interface Field {
  conditional?: Conditional;
  hint?: string;
  disabled?: boolean;
  display?: string;
  editorStyle?: string;
  fileType?: string;
  formats?: Array<string>;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  class?: string;
  options?: Array<any>;
  localData?: Array<any>;
  optionsUrl?: string;
  optionValue?: string;
  optionsLabel?: string;
  resourceName?: string;
  readonly?: boolean;
  mode?: string;
  decrementButtonClass?: string;
  incrementButtonClass?: string;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;
  buttonLayout?: string;
  step?: string;
  showButtons?: boolean;
  currency?: string;
  dateFormat?: string;
  googlePlace?: GooglePlace;
}

interface ChildField {
  label?: string;
  description?: string;
  class?: string;
  fields?: Array<Field>;
}

interface Form {
  name?: string;
  description?: string;
  children?: Array<ChildField>;
}

export default Form;

export type { ChildField, Field, Form };
