import quickApi from "./quickapi.js";
import { onlyLastPlugin, relaunchPlugin } from "./plugins/index.js";

const postsModule = {
  namespace: "posts",
  options: {
    debug: true,
  },
  methods: {
    list: {
      method: "GET",
      url: "posts",
      onlyLast: true,
    },
    post: {
      method: "GET",
      dynamic(id) {
        return {
          url: `posts/${id}`,
        };
      },
    },
  },
};

const host = "https://jsonplaceholder.typicode.com/";
const globalOptions = null;
const credentials = "include";

const prepareApi = quickApi(host, globalOptions, credentials);
const api = prepareApi
  .plugin(onlyLastPlugin)
  .plugin(relaunchPlugin)
  .module(postsModule)("dev");

(async () => {
  const result = await api("posts.list", { limit: 20 });
  console.log("RESULT", result);
})();
