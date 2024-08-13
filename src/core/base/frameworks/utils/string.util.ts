/**
 * String split by capital for example `HelloWorld => Hello World`
 * @param input string input
 * @returns string
 */
export const stringSplitByCapital = (input: string): string => {
  return input.split(/(?=[A-Z])/).join(' ');
};

/**
 * Camelize the string for example `HelloWorld => helloWorld`
 * @param str string input
 * @returns string
 */
export function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
