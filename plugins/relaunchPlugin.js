const relaunchPlugin = {
  name: "relaunchPlugin",
  initField: "retriesOnFailure",
  handler: async function (executor, { store }) {
    let retries = 0;
    let result;
    while (retries <= store.retriesOnFailure) {
      try {
        result = await executor();
        break;
      } catch (err) {
        retries += 1;
        if (retries === store.retriesOnFailure) {
          throw err;
        }
      }
    }

    return result;
  },
  createStore(initValue) {
    this.retriesOnFailure = initValue;
  },
};

export default relaunchPlugin;
