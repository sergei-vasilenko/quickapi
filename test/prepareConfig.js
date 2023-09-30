import { schemaMatches } from "../helpers/checks.js";
import prepareConfig from "../lib/prepareConfig.js";
import applicationConfigurations from "../schemas/applicationConfigurations.js";

const result = prepareConfig();

const checksResult = schemaMatches(result, applicationConfigurations);
