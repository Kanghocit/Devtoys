export type HandlerName =
  | "setLowercase"
  | "setUppercase"
  | "setDigits"
  | "setSpecial"
  | "setExcluded";

export type HandlerType = {
  setLowercase: (value: React.SetStateAction<boolean>) => void;
  setUppercase: (value: React.SetStateAction<boolean>) => void;
  setDigits: (value: React.SetStateAction<boolean>) => void;
  setSpecial: (value: React.SetStateAction<boolean>) => void;
  setExcluded: (value: React.SetStateAction<string>) => void;
};

export type PasswordOptions = {
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  special: boolean;
  excluded: string;
  length: number;
  rows: number;
};
