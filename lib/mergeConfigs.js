import { hasKey } from "../helpers/checks.js";

const mergeConfigs = (...configs) => {
  return configs.reduce((result, config) => {
    Object.entries(config).forEach(([key, value]) => {
      if (!hasKey(result, key)) {
        result[key] = value;
      }
    });
    return result;
  }, {});
};

export default mergeConfigs;
