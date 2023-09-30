const MESSAGE_OK = "Ok";
const MESSAGE_FAIL = "Result doesn't match";

const logColor = (kind) => {
  const colors = {
    warning: "\x1b[1;33m",
    error: "\x1b[0;31m",
    success: "\x1b[32m",
    info: "\x1b[1;37m",
    brown: "\x1b[38;2;139;69;19m",
  };
  const color = colors[kind] || colors.info;
  return (text) => color + text + "\x1b[0m";
};

const color = {
  warn: logColor("warning"),
  err: logColor("error"),
  info: logColor("info"),
  ok: logColor("success"),
  heading: logColor("brown"),
};

const logStyles = {
  bold: (string) => `\x1b[1m${string}\x1b[0m`,
};

const testsStatus = {
  testId: 0,
  add(message, messageType = "ok") {
    if (!this.groups[this.testId]) {
      this.groups[this.testId] = {
        messages: [],
        ok: 0,
        fail: 0,
      };
    }
    const colorMessage =
      messageType === "ok" ? color.ok(message) : color.err(message);
    this.groups[this.testId].messages.push(colorMessage);
    if (messageType === "ok") {
      this.groups[this.testId].ok++;
    } else {
      this.groups[this.testId].fail++;
    }
  },
  end() {
    this.testId++;
  },
  get messages() {
    return this.groups[this.testId]?.messages || [];
  },
  get ok() {
    return this.groups[this.testId]?.ok || 0;
  },
  get fail() {
    return this.groups[this.testId]?.fail || 0;
  },
  groups: {},
};

const printExpression = (expression, isEqual = true) => {
  const expressionStr = expression.toString().replace(/\s*\(.*\) => /, "");
  const result = (
    typeof expression === "function" ? expression() : expression
  ).toString();
  const equalsSym = isEqual ? "=" : "≠";
  testsStatus.add(
    `${expressionStr} ${equalsSym} ${result}`,
    isEqual ? "ok" : "fail"
  );
};

const checkExpression = (
  expression,
  result,
  messageOk = MESSAGE_OK,
  messageFail = MESSAGE_FAIL
) => {
  const message = "";
  if (expression() === result) {
    testsStatus.add(`${messageOk}: ${printExpression(expression)}`);
  } else {
    testsStatus.add(
      `${messageFail}: ${printExpression(expression, false)}`,
      "fail"
    );
  }
};

const equal = (
  description,
  left,
  right,
  messageOk = MESSAGE_OK,
  messageFail = MESSAGE_FAIL
) => {
  const preview = logStyles.bold(description ? `${description}: ` : "");
  if (left !== right) {
    testsStatus.add(
      `${preview}${messageFail}. LEFT: ${left} ≠ RIGHT: ${right}`,
      "fail"
    );
  } else {
    testsStatus.add(`${preview}${messageOk}. ${left} = ${right}`);
  }
};

const unequal = (
  description,
  left,
  right,
  messageOk = MESSAGE_OK,
  messageFail = MESSAGE_FAIL
) => {
  const preview = logStyles.bold(description ? `${description}: ` : "");
  if (left === right) {
    testsStatus.add(
      `${preview}${messageFail}. LEFT: ${left} = RIGHT: ${right}`,
      "fail"
    );
  } else {
    testsStatus.add(`${preview}${messageOk}. ${left} ≠ ${right}`);
  }
};

const functions = {
  checkExpression,
  equal,
  unequal,
};

const group = (name, handler) => {
  handler(functions);
  let resultMessage = `\n`;
  const heading = logStyles.bold(color.heading(name));
  console.group(heading);
  for (const message of testsStatus.messages) {
    resultMessage += message + "\n";
  }
  resultMessage += "\n";
  resultMessage += testsStatus.ok ? color.ok(`Ok: ${testsStatus.ok}`) : "";
  resultMessage += testsStatus.fail
    ? color.err(`Fail: ${testsStatus.fail}`)
    : "";
  resultMessage += "\n\n";
  console.log(resultMessage);
  testsStatus.end();
  console.groupEnd();
};

const test = (name, testsBlock) => {
  console.group(name);
  testsBlock({ group, ...functions });
  console.groupEnd();
};

export { test };
