import { emailPattern } from "./regexPatterns";

export const isEmailValid = (email = "") => {
  return emailPattern.test(email);
};

export const isDateInFuture = (date) => {
  return new Date().getTime() < date.getTime();
};
