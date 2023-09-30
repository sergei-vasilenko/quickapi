const tests = ["initialApp", "mergeConfigs", "prepareConfig"];

const launcher = async () => {
  const args = process.argv.slice(2);
  for (const test of tests) {
    if (args.length && !args.includes(test)) {
      continue;
    }
    await import(`./${test}.js`);
  }
};

launcher();
