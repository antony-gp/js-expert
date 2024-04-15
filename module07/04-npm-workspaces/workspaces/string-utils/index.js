export default class StringUtils {
  static removeEmptySpaces(str) {
    return str.replace(/\s/g, "");
  }

  static isEmpty(str) {
    return !str?.length;
  }
}
