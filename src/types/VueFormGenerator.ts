interface Conditional {
  field?: string;
  value?: string | number | boolean | RegExp;
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
  default?: string | number | boolean | Array<any>;
  decrementButtonClass?: string;
  decrementButtonIcon?: string;
  disabled?: boolean;
  disabledDays?: Array<number>;
  disabledDates?: Array<string>;
  display?: string;
  editorStyle?: string;
  fileType?: string;
  filter?: boolean;
  formats?: Array<string>;
  hint?: string;
  hourFormat?: string;
  insertHash?: boolean;
  id?: string;
  incrementButtonClass?: string;
  incrementButtonIcon?: string;
  label?: string;
  localData?: Array<any>;
  minDate?: string | any;
  maxDate?: string | any;
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
  rows?: number;
  showButtons?: boolean;
  showSliderInput?: boolean;
  showTime?: boolean;
  size?: string;
  step?: string;
  timeFormat?: string;
  timeOnly?: boolean;
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
