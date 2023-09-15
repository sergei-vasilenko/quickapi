import { hasKey, None } from "./checks.js";

const findByPath = (path, object) => {
  return (Array.isArray(path) ? path : path.split(".")).reduce(
    (currentPoint, pathPart, index, { length }) => {
      if (!hasKey(currentPoint, pathPart) && index + 1 === length) {
        return None;
      } else if (!hasKey(currentPoint, pathPart)) {
        return currentPoint[pathPart] || {};
      }
      return currentPoint[pathPart];
    },
    object || {}
  );
};

export { findByPath };
