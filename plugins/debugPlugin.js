const debugPlugin = {
  name: "debugPlugin",
  initField: "debug",
  handler: async function (executor, context, args, { emit }) {
    const process = this._logger.createNewProcess();
    let result;
    try {
      process.start();
      process.settings(context);
      process.arguments(args);
      result = await executor();
    } catch (err) {
      throw err;
    } finally {
      process.end();
      emit(process);
    }
    return result;
  },
  createStore() {
    this.logger = new ApiLoggerStore();
  },
};

export default debugPlugin;
