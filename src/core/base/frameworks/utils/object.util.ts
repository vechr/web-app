import { EFormItem } from '@/core/base/domain/entities/protocol';

/**
 *
 * @param obj1 is not full properties
 *
 * @param obj2 is full properties
 */
export function mergeObjectOnlySameField(obj1: any, obj2: any) {
  Object.keys(obj2)
    .filter((key) => key in obj1)
    .forEach((key) => (obj1[key] = obj2[key]));
  return obj1;
}

/**
 * This function is used to remove specific properties
 * @param object your object
 * @param attr your properties or attributes
 * @returns result of object
 */
export const removeAttrFromObject = <O extends object, A extends keyof O>(
  object: O,
  attr: A,
): Omit<O, A> => {
  const newObject = { ...object };

  if (attr in newObject) {
    delete newObject[attr];
  }

  return newObject;
};

/**
 * Transform widget form data into request body.
 * For example is `const data2: TypeForm transformFormtoBodyRequest<TypeBody>(
    removeAttrFromObject(data, 'propertiesWhichWillDeleted'),
  );`
 * @param fields object of form
 * @returns result of object
 */
export function transformFormtoBodyRequest<T>(fields: Record<string, any>): T {
  const result: Record<string, any> = {};
  Object.keys(fields).forEach((fieldName) => {
    if (
      fields[fieldName].type === EFormItem.FormDynamicArray &&
      Array.isArray(fields[fieldName].value)
    ) {
      result[fieldName] = [];
      const dataArrayDynamic = fields[fieldName].value as Record<string, any>[];
      dataArrayDynamic.forEach((dynamicField) => {
        result[fieldName].push(transformFormtoBodyRequest(dynamicField));
      });
    } else {
      if (fields[fieldName].type === EFormItem.FormDynamic) {
        result[fieldName] = transformFormtoBodyRequest(fields[fieldName].value);
      } else {
        result[fieldName] = fields[fieldName].value;
      }
    }
  });

  return result as T;
}

/**
 * Collects the properties that have dynamic form.
 * @param fieldsDynamic fields source
 * @returns the result of object collection
 */
export const getDynamicObject = (fieldsDynamic: Record<string, any>) => {
  const dynamicObjectCollection: { [key: string]: any } = {};
  Object.keys(fieldsDynamic).forEach((fieldName) => {
    if (fieldsDynamic[fieldName].type == EFormItem.FormDynamicArray) {
      dynamicObjectCollection[fieldName] = fieldsDynamic[fieldName].value[0];
    }
  });

  return JSON.parse(JSON.stringify(dynamicObjectCollection));
};
