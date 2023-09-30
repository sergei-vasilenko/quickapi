const None = Symbol("None");

const isNone = (value) => value === None;

const isFn = (value) => typeof value === "function";

const hasKey = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);

const type = (value) => {
  if (value === null) {
    return "null";
  }
  if (value !== value) {
    return "NaN";
  }
  const baseType = typeof value;
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  return baseType;
};

const schemaMatches = (object, schema) => {
  const currentPath = [];
  const inconsistencies = [];

  const worker = (target) => {
    console.log({ target });
    if (["Object", "Array"].includes(type(target))) {
      Object.entries(target).forEach(([schemaKey, schemaValue]) => {
        currentPath.push(schemaKey);
        worker(schemaValue, schemaKey);
      });
    } else {
      const objectKeyValue = findByPath(currentPath, object);
      if (isNone(objectKeyValue)) {
        inconsistencies.push(`Field '${currentPath.join("/")}' doesn't exist.`);
      } else if (!target.startsWith("?") && type(objectKeyValue) !== target) {
        inconsistencies.push(
          `Expected type for field '${currentPath.join(
            "/"
          )}' '${target}', actual - '${type(objectKeyValue)}'.`
        );
      }
    }
    currentPath.pop();
  };
  worker(schema);
  return inconsistencies;
};

export { None, isNone, isFn, hasKey, type, schemaMatches };
