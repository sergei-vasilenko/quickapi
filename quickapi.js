import { initialApp, prepareConfig } from "./lib";

const appConfigurations = {
  mode: "prod",
  separator: ".",
  base: null,
  plugins: new Set(),
  modules: new Set(),
  interseptor: {
    reqbefore: null,
    reqerror: null,
    resbefore: null,
    reserror: null,
  },
};

const appTuner = (mode = "prod") => {
  if (mode === "dev") {
    appConfigurations.mode = mode;
    const appSettings = prepareConfig(appConfigurations);
  }
  Object.assign(appTuner, {
    plugin(config) {
      if (config !== null && typeof config === "object") {
        appConfigurations.plugins.add(config);
      }
      return this;
    },
    module(config) {
      if (config !== null && typeof config === "object") {
        appConfigurations.modules.add(config);
      }
      return this;
    },
    interseptor(type, handler) {
      if (appConfigurations.interseptor[type] === null && isFn(handler)) {
        appConfigurations.interseptor[type] = handler;
      }
      return this;
    },
    separator(value) {
      if (/[.>=:*#/]/.test(value)) {
        appConfigurations.separator = value;
      } else {
        console.warn(
          "Valid characters for separator: '.', '>', '=', ':', '*', '#', '/'."
        );
      }
      return this;
    },
  });
  return initialApp(appConfigurations);
};

const quickApi = (host, globalOptions, credentials) => {
  appConfigurations.base = { host, globalOptions, credentials };
  return appTuner;
};

export default quickApi;
