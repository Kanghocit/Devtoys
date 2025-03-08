import { HandlerName } from "./types";

interface CharacterOption {
  name: string;
  detail: string;
  handler: HandlerName;
  type: "boolean" | "string";
}

export const characters: CharacterOption[] = [
  {
    name: "Lowercase characters",
    detail: "Use lowercase characters",
    handler: "setLowercase",
    type: "boolean",
  },
  {
    name: "Uppercase characters",
    detail: "Use uppercase characters",
    handler: "setUppercase",
    type: "boolean",
  },
  {
    name: "Digit characters",
    detail: "Use digit characters",
    handler: "setDigits",
    type: "boolean",
  },
  {
    name: "Special characters",
    detail: "Use special characters",
    handler: "setSpecial",
    type: "boolean",
  },
  {
    name: "Excluded characters",
    detail: "",
    handler: "setExcluded",
    type: "string",
  },
];

export const CHARACTER_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;
