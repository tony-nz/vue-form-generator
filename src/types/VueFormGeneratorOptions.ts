export interface VueFormGeneratorOptions {
  provider: string;
  defaultFetchData: (parameter: Object) => Promise<void>;
}
