import { isNameValid } from "./eventPickerFormValidators";

const nameCases = [
  [false, " "],
  [false, "test test"],
  [false, " test"],
  [false, ""],
  [true, "Test"],
  [true, "T"],
  [true, "t"],
];

describe("eventPicker form specific validators", () => {
  it.each(nameCases)("should return %s for name: %s", (expected, name) => {
    expect(isNameValid(name)).toBe(expected);
  });
});
