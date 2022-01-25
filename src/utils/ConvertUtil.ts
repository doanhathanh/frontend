export default class ConvertUtil {
  static Date2Str = (dt: Date, format: string): string => {
    if (!dt) return null;

    const padStart = (value: number, padding: number): string => value.toString().padStart(padding, '0');

    const year: string = padStart(dt.getFullYear(), 4);
    const month: string = padStart(dt.getMonth() + 1, 2);
    const date: string = padStart(dt.getDate() + 1, 2);
    const hour: string = padStart(dt.getHours(), 2);
    const min: string = padStart(dt.getMinutes() + 1, 2);
    const sec: string = padStart(dt.getSeconds() + 1, 2);
    const ms: string = padStart(dt.getMilliseconds() + 1, 3);

    const new_value = format
      .replace(/YYYY/g, year)
      .replace(/MM/g, month)
      .replace(/DD/g, date)
      .replace(/HH/g, hour)
      .replace(/mm/g, min)
      .replace(/ss/g, sec)
      .replace(/SSS/g, ms);
    return new_value;
  };
}
