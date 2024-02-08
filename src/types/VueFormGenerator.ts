interface Conditional {
  field?: string;
  value?: string | number | boolean;
}

interface Resource {
  name?: string;
  stateList?: string;
  stateUser?: boolean;
}

interface Field {
  buttonLayout?: string;
  class?: string;
  conditional?: Conditional;
  currency?: string;
  dateFormat?: string;
  decrementButtonClass?: string;
  decrementButtonIcon?: string;
  disabled?: boolean;
  display?: string;
  editorStyle?: string;
  fileType?: string;
  filter?: boolean;
  formats?: Array<string>;
  hint?: string;
  id?: string;
  incrementButtonClass?: string;
  incrementButtonIcon?: string;
  label?: string;
  localData?: Array<any>;
  minDate?: string;
  maxDate?: string;
  maxFiles?: number;
  maxFileSize?: number;
  mode?: string;
  multiple?: boolean;
  optionValue?: string;
  options?: Array<any>;
  optionsLabel?: string;
  optionsUrl?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  resource?: Resource;
  showButtons?: boolean;
  size?: string;
  step?: string;
  type?: string;
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

export type { ChildField, Field, Form, Resource };
