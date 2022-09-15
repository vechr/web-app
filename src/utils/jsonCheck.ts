export function isJsonString(str: any) {
  try {
    if (Object.keys(JSON.parse(str)).length !== 0) {
      JSON.parse(str);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}
