import * as types from "../types";

export class Common {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static parseIpAddress(req: types.ExpressRequest): string {
    const ip: any = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || ("" as string);
    const parts = String(ip).toString().split(",");
    const ipAddress = parts[parts.length > 2 ? parts.length - 2 : 0].trim();

    return Common.detectIpAddress(ipAddress);
  }

  static detectIpAddress(ipAddress: string): string {
    if (!ipAddress) return "";
    const ipVersion = require("net").isIP(ipAddress.trim());

    if (ipVersion == 4 || ipVersion == 6) {
      return ipAddress;
    } else {
      return "";
    }
  }

  static getEpochForDateTime(dateTime: Date | undefined): number | undefined {
    if (dateTime) return ~~(dateTime.getTime() / 1000);
    else null;
  }

  static listDifference<T>(listA: T[], listB: T[]): T[] {
    const setA = new Set(listA);
    const setB = new Set(listB);

    const difference: T[] = [...setA].filter(value => !setB.has(value));

    return difference;
  }

  static findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const commonElements: T[] = [];

    arr2.forEach((element) => {
      if (set1.has(element)) {
        commonElements.push(element);
      }
    });

    return commonElements;
  }

  /**
   * Compares 2 strings without checking cases.
   */
  static ciCompare(a: string, b: string): boolean {
    return a?.toLowerCase() === b?.toLowerCase();
  }

  /**
   * Compares 2 addresses without checking cases.
   */
  static ciCompareAddress(a: string, b: string): boolean {
    return this.toAddress(a).toLowerCase() === this.toAddress(b).toLowerCase();
  }

  static toAddress(addr: string): string {
    return "0x" + addr?.substring(addr.length - 40);
  }

  /**
   * Utility function to round the epoch timestamp to the nearest number of minutes given
   * @param time The timestamp in second epoch
   * @param roundingMinute The number of minute block to round off. Ex: given roundingMinute = 5, time 12:04 will be rounded to 12:00
   * @param ceil If true, rounding will happen to the ceiling value. ExL 12:04 will be rounded to 12:05
   * @returns rounded Timestamp in second epoch
   */
  static roundTimestamp(time: number, roundingMinute: number, ceil: boolean = false) {
    const roundingSecond = roundingMinute * 60;
    const roundedTime = time - (time % roundingSecond);
    if (ceil) {
      return roundedTime + roundingSecond;
    }
    return roundedTime;
  }

  /**
   * @param epoch The epoch value to be converted
   * @returns The epoch value in milliSeconds
   */
  static convertSecsToMillis(epoch: number): number {
    if (epoch.toString().length === 10) return epoch * 1000;
    else return epoch;
  }

  static removeEscapeCharactersFromString(message: string): string {
    return message.replace(/[^a-zA-Z .]/g, "");
  }

  /**
   * Converts scientific notations to pretty numbers
   */
  static convertScientificNotationNumber(value: number): string {
    const decimalsPart = value?.toString()?.split(".")?.[1] || "";
    const eDecimals = Number(decimalsPart?.split("e-")?.[1]) || 0;
    const countOfDecimals = decimalsPart.length + eDecimals;
    return Number(value).toFixed(countOfDecimals);
  }
}

export const gracefulShutdown = async () => {
  process.exit(0);
};

export const trapGlobalException = (err: Error) => {
  console.error(err);
};