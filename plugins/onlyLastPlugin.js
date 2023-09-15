const onlyLastPlugin = {
  name: "onlyLastPlugin",
  initField: "onlyLast",
  handler: async function (executor, { method, store }) {
    const now = Date.now();
    const prevReqTime = store.prevRequestTime;

    if (prevReqTime !== 0 && prevReqTime < now) {
      store.prevRequest.abortRequest();
    }

    store.prevRequestTime = now;
    store.prevRequest = method;

    let result;
    try {
      result = await executor();
    } catch (err) {
      if (err.name !== "AbortError") {
        throw err;
      }
    }

    return result;
  },
  createStore() {
    this.prevRequestTime = 0;
    this.prevRequest = null;
  },
};

export default onlyLastPlugin;
