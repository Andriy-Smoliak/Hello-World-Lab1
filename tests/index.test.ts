import { describe, expect, it } from "vitest";
import { BasicAddition } from "../src/basicAddition";

describe("BasicAddition", () => {
  it("додає два додатні числа", () => {
    expect(BasicAddition(2, 3)).toBe(5);
  });

  it("додає від'ємне число", () => {
    expect(BasicAddition(-2, 3)).toBe(1);
  });

  it("коректно додає нуль", () => {
    expect(BasicAddition(0, 7)).toBe(7);
  });
});
