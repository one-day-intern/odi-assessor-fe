import { timeParser } from "./timeParser";

describe("Time parser test suite", () => {
    it("Test time parser without seconds", () => {
        const time = timeParser("10:15");
        expect(time.getHours()).toBe(10);
        expect(time.getMinutes()).toBe(15);
        expect(time.getSeconds()).toBe(0);
    });

    it("Test time parser with seconds", () => {
        const time = timeParser("12:05:15");
        expect(time.getHours()).toBe(12);
        expect(time.getMinutes()).toBe(5);
        expect(time.getSeconds()).toBe(15);
    });

    it("Test time parser with seconds zulu", () => {
        const time = timeParser("01:15:05", { isUTC: true });
        expect(time.getUTCHours()).toBe(1);
        expect(time.getUTCMinutes()).toBe(15);
        expect(time.getUTCSeconds()).toBe(5);
    })
})