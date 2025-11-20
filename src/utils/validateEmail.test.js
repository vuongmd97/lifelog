import { test, expect } from "vitest";
import { validateEmail } from "./EmailUtils";

test("Valid email should return true", () => {
  expect(validateEmail("hello@gmail.com")).toBe(true);
  expect(validateEmail(" test@domain.co ")).toBe(true);
});

test("Invalid email should return false", () => {
  expect(validateEmail("t")).toBe(false);
  expect(validateEmail("abc@")).toBe(false);
  expect(validateEmail("@gmail.com")).toBe(false);
  expect(validateEmail("")).toBe(false);
});
