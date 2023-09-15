# Quick api

## Description
Function for quick creation and convenient use of network requests.

### Note
Wrapper over the fetch.

### Arguments
When you first call the function, you can pass three parameters: `host`, `?globalOptions` and `?credentials`.

Then you can configure the application in a chain:
- `extention` `<Object>` - expand the functionality of the application.
- `module`: `<Object>` - to add a module. Modules are designed to group methods of working with the server.
- `interseptor`: `type <String>` `handler <Function>` - request processing. `type [ requestbefore | requesterror | responsebefore | responseerror ]`.
- `separator`: `<String>` - separator character.

Don't forget to call the function without arguments `()` or specify a mode to initialize it.

### Usage Examples:
```
const host = "https://jsonplaceholder.typicode.com/";
const globalOptions = null;
const credentials = "include";

const prepareApi = quickApi(host, globalOptions, credentials);
const api = prepareApi
  .extention(onlyLastExt)
  .extention(relaunchExt)
  .module(postsModule)("dev");

(async () => {
  const result = await api("posts.list", { limit: 20 });
  console.log("RESULT", result);
})();
```
