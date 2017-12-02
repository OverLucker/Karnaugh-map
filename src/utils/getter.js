export default function get(object, ...path) {
  let obj = Object.assign({}, object);
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (obj === null || obj === undefined) {
      return null;
    }
  }
  return obj;
}
