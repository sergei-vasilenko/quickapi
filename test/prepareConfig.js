import { test } from "./testlib.js";
import prepareConfig from "../lib/prepareConfig.js";
import config from "../schemas/applicationConfigurations.js";

test("prepareConfig", ({ group, schemaMatches }) => {
  const result = prepareConfig();
});
