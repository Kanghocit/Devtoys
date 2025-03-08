import { CHARACTER_SETS } from "./constants";
import { PasswordOptions } from "./types";

export const generatePassword = (options: PasswordOptions): string[] => {
  const { lowercase, uppercase, digits, special, excluded, length, rows } =
    options;

  // Kiểm tra độ dài tối thiểu dựa trên số loại ký tự được chọn
  const selectedTypes = [lowercase, uppercase, digits, special].filter(
    Boolean
  ).length;
  if (selectedTypes === 0) {
    throw new Error("Please select at least one character type");
  }
  if (length < selectedTypes) {
    throw new Error(
      `Password length must be at least ${selectedTypes} for selected character types`
    );
  }

  // Tạo các mảng ký tự theo loại
  const charSets = {
    lowercase: CHARACTER_SETS.lowercase.split(""),
    uppercase: CHARACTER_SETS.uppercase.split(""),
    digits: CHARACTER_SETS.digits.split(""),
    special: CHARACTER_SETS.special.split(""),
  };

  // Loại bỏ các ký tự excluded
  const excludedSet = new Set(excluded);
  Object.keys(charSets).forEach((key) => {
    charSets[key as keyof typeof charSets] = charSets[
      key as keyof typeof charSets
    ].filter((char) => !excludedSet.has(char));
  });

  // Kiểm tra xem còn đủ ký tự để tạo mật khẩu không
  if (lowercase && charSets.lowercase.length === 0) {
    throw new Error("No lowercase characters available after exclusion");
  }
  if (uppercase && charSets.uppercase.length === 0) {
    throw new Error("No uppercase characters available after exclusion");
  }
  if (digits && charSets.digits.length === 0) {
    throw new Error("No digits available after exclusion");
  }
  if (special && charSets.special.length === 0) {
    throw new Error("No special characters available after exclusion");
  }

  const newPasswords = [];
  for (let i = 0; i < rows; i++) {
    // 1. Đảm bảo mỗi loại ký tự được chọn xuất hiện ít nhất một lần
    const password: string[] = [];

    if (lowercase) {
      password.push(
        charSets.lowercase[
          crypto.getRandomValues(new Uint32Array(1))[0] %
            charSets.lowercase.length
        ]
      );
    }
    if (uppercase) {
      password.push(
        charSets.uppercase[
          crypto.getRandomValues(new Uint32Array(1))[0] %
            charSets.uppercase.length
        ]
      );
    }
    if (digits) {
      password.push(
        charSets.digits[
          crypto.getRandomValues(new Uint32Array(1))[0] % charSets.digits.length
        ]
      );
    }
    if (special) {
      password.push(
        charSets.special[
          crypto.getRandomValues(new Uint32Array(1))[0] %
            charSets.special.length
        ]
      );
    }

    // 2. Thêm các ký tự còn lại
    const allChars: string[] = [];
    if (lowercase) allChars.push(...charSets.lowercase);
    if (uppercase) allChars.push(...charSets.uppercase);
    if (digits) allChars.push(...charSets.digits);
    if (special) allChars.push(...charSets.special);

    while (password.length < length) {
      const randomIndex =
        crypto.getRandomValues(new Uint32Array(1))[0] % allChars.length;
      password.push(allChars[randomIndex]);
    }

    // 3. Trộn ngẫu nhiên các ký tự trong mật khẩu
    for (let j = password.length - 1; j > 0; j--) {
      const k = crypto.getRandomValues(new Uint32Array(1))[0] % (j + 1);
      [password[j], password[k]] = [password[k], password[j]];
    }

    newPasswords.push(password.join(""));
  }

  return newPasswords;
};
