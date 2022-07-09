export function buildFilter(object: any) {
  let filter: any = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];

      if (element.isId && element.value) {
        filter[key] = { value: element.value, isId: element.isId };
      } else {
        filter[key] = element.value;
      }
    }
  }

  return filter;
}
