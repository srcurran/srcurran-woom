import sharpService from "astro/assets/services/sharp";
import { baseDevService } from "./shared-dev-service.js";
const service = {
  ...baseDevService,
  getHTMLAttributes(options, ...args) {
    const { inputtedWidth, ...props } = options;
    if (inputtedWidth) {
      props.width = inputtedWidth;
    }
    return sharpService.getHTMLAttributes ? sharpService.getHTMLAttributes(props, ...args) : {};
  },
  transform(...args) {
    const transform = args[1];
    transform.format = transform.src.endsWith("svg") ? "svg" : "webp";
    return sharpService.transform(...args);
  }
};
var dev_service_default = service;
export {
  dev_service_default as default
};
