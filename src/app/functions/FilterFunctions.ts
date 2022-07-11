export function buildFilter(object: any) {
  let filter: any = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];

      if (element.isId && element.value) {
        filter[key] = { value: element.value, isId: element.isId };
      } else {
        // Solo se envian objetos de NgbDateStruct
        if (typeof element.valueDate === 'object') {
          filter[key] = new Date(
            element.valueDate.year,
            element.valueDate.month - 1,
            element.valueDate.day
          );
        } else filter[key] = element.value;
      }
    }
  }

  return filter;
}
