import StringUtils from "@antony-gp/string-utils";

const AVAILABLE_REPLACE_FORMATS = {
  "yyyy-MM-dd": /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g,
  "dd/MM/yyyy": /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g,
};

export default class DateUtils {
  static stringify(date, format) {
    if (!(date instanceof Date)) return new Error(`Invalid date '${date}'.`);

    if (!AVAILABLE_REPLACE_FORMATS[format])
      return new Error(`Format '${format}' is not yet available.`);

    return format
      .replace("dd", date.getDate().toString().padStart(2, "0"))
      .replace("MM", (date.getMonth() + 1).toString().padStart(2, "0"))
      .replace("yyyy", date.getFullYear().toString().padStart(4, "0"));
  }

  static format(dateStr, from, to) {
    if (StringUtils.isEmpty(dateStr)) return new Error("Empty date string.");

    const replaceFormatFrom = AVAILABLE_REPLACE_FORMATS[from];

    if (!replaceFormatFrom)
      return new Error(`Format '${from}' is not yet available.`);

    if (!AVAILABLE_REPLACE_FORMATS[to])
      return new Error(`Format '${to}' is not yet available.`);

    const [year, month, day] = StringUtils.removeEmptySpaces(dateStr)
      .replace(replaceFormatFrom, "$<year>-$<month>-$<day>")
      .split("-");

    return this.stringify(new Date(year, month - 1, day), to);
  }
}
