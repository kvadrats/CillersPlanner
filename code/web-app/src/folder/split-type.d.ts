declare module "split-type" {
  interface SplitTypeOptions {
    types?: string;
    tagName?: string;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
  }

  export default class SplitType {
    constructor(selector: string | HTMLElement, options?: SplitTypeOptions);
  }
}
