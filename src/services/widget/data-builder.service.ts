export function dataBuilder(
  dataset: any[],
  newData: any,
  queue: boolean,
): any[] {
  const queueData: any[] = [];
  dataset.forEach((val: any) => {
    queueData.push(val);
  });
  queueData.push(newData);
  if (queue) queueData.shift();
  return queueData;
}
