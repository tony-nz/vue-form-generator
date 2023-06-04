export interface VueFormGeneratorOptions {
  provider: string;
  defaultFetchData: (parameter: Object) => Promise<void>;
  googlePlace: {
    apiKey: string;
    libraries: Array<string>;
    bounds: boolean | object | string;
    location: boolean | object | string;
    offset: boolean;
    radius: boolean;
    types: boolean | Array<string>;
  };
}
