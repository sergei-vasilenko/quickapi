import { test } from "./testlib.js";
import mergeConfigs from "../lib/mergeConfigs.js";

test("'mergeConfigs' function test.", ({ group, equal, unequal }) => {
  group("All fields from 'methodConfig'.", () => {
    // Data
    const methodConfig = { debug: true, cache: true };
    const moduleConfig = {
      debug: "module-debug-value",
      cache: "module-cache-value",
    };
    const appConfig = { debug: "app-debug-value", cache: "app-cache-value" };

    // Result
    const result = mergeConfigs(methodConfig, moduleConfig, appConfig);

    // Checks
    equal(
      "'debug' field: result.debug = methodConfig.debug",
      result.debug,
      methodConfig.debug
    );
    equal(
      "'cache' field: result.cache = methodConfig.cache",
      result.cache,
      methodConfig.cache
    );
    unequal(
      "'cache' field: result.cache ≠ moduleConfig.cache",
      result.cache,
      moduleConfig.cache
    );
    unequal(
      "'debug' field: result.debug ≠ appConfig.debug",
      result.debug,
      appConfig.debug
    );
    unequal(
      "'cache' field: result.cache ≠ appConfig.cache",
      result.cache,
      appConfig.cache
    );
  });

  group(
    "Field from 'methodConfig' + additional fields from 'moduleConfig'.",
    () => {
      // Data
      const methodConfig = { cache: true };
      const moduleConfig = { debug: true, cache: false, onlyLast: true };
      const appConfig = { debug: false, cache: true };

      // Result
      const result = mergeConfigs(methodConfig, moduleConfig, appConfig);

      // Checks
      equal(
        "'debug' field: result.debug = moduleConfig.debug",
        result.debug,
        moduleConfig.debug
      );
      equal(
        "'cache' field: result.cache = methodConfig.cache",
        result.cache,
        methodConfig.cache
      );
      equal(
        "'onlyLast' field: result.onlyLast = moduleConfig.onlyLast",
        result.onlyLast,
        moduleConfig.onlyLast
      );
    }
  );

  group("Field from 'moduleConfig' and 'appConfig'.", () => {
    // Data
    const methodConfig = {};
    const moduleConfig = { cache: false, onlyLast: true };
    const appConfig = { debug: true };

    // Result
    const result = mergeConfigs(methodConfig, moduleConfig, appConfig);

    // Checks
    equal(
      "'debug' field: result.debug = appConfig.debug",
      result.debug,
      appConfig.debug
    );
    equal(
      "'cache' field: result.cache = moduleConfig.cache",
      result.cache,
      moduleConfig.cache
    );
    equal(
      "'onlyLast' field: result.onlyLast = moduleConfig.onlyLast",
      result.onlyLast,
      moduleConfig.onlyLast
    );
  });
});
