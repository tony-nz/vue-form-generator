interface Conditional {
  field: string;
  value: string | number | boolean;
}

interface Field {
  type?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  fileType?: string;
  class?: string;
  options?: Array<any>;
  formats?: Array<string>;
  localData?: Array<any>;
  display?: string;
  optionsUrl?: string;
  optionValue?: string;
  optionsLabel?: string;
  resourceName?: string;
  editorStyle?: string;
  readonly?: boolean;
  conditional?: Conditional;
}

interface ChildField {
  label?: string;
  description?: string;
  class?: string;
  fields?: Array<Field>;
}

interface Form {
  type?: "tab" | "step" | "group";
  name?: string;
  children?: Array<ChildField>;
}

export default Form;

export type { Field, ChildField, Form };
