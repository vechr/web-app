/**
 * Convert a number into IDR format
 * @param number number | undefined | null
 * @returns number
 */
export const rupiah = (number: number | undefined | null) => {
  if (number === undefined || number === null) return 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};
