export default class ValidateUtil {
  // eslint-disable-next-line
  static isEmpty = (value: any, chkRaw?: boolean): boolean => {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') {
      let str: string = <string>value;
      if (!chkRaw) str = str.trim();
      if (str.length === 0) return true;
    } else if (Array.isArray(value)) {
      if (value.length === 0) return true;
    }
    return false;
  };

  static isEmail = (email: string): boolean => {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  };

  static minLength = (str: string, minLength: number, trim?: boolean): boolean => {
    if (!str) str = '';
    if (trim) return str.trim().length >= minLength;
    return str.length >= minLength;
  };

  static maxLength = (str: string, maxLength: number, trim?: boolean): boolean => {
    if (!str) return true;
    if (trim) return str.trim().length <= maxLength;
    return str.length <= maxLength;
  };

  static minMaxLength = (str: string, minLength: number, maxLength: number, trim?: boolean): boolean => {
    if (!str) str = '';
    if (trim) str = str.trim();
    return minLength <= str.length && str.length <= maxLength;
  };

  static minValue = (value: number, min: number): boolean => {
    return value >= min;
  };

  static maxValue = (value: number, max: number): boolean => {
    return value <= max;
  };

  static minMaxValue = (value: number, min: number, max: number): boolean => {
    return min <= value && value <= max;
  };

  // eslint-disable-next-line
  static inList = (value: any, list: any[]): boolean => {
    return list.includes(value);
  };

  // eslint-disable-next-line
  static createResData(field: string, msg?: string): any {
    // eslint-disable-next-line
    const vldData: any = {};
    vldData[field] = msg ? msg : 'error';
    return vldData;
  }
}
