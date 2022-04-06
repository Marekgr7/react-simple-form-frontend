import { isEmailValid } from "./validators";

const emailCases = [
  [true, "test@test.com"],
  [true, "ad@ad.com"],
  [false, "add@"],
  [false, ""],
  [false, "@addd.com"],
  [false, "add@add"],
];

describe("validators", () => {
  it.each(emailCases)("check if email is valid", (expected, email) => {
    expect(isEmailValid(email)).toBe(expected);
  });
});
