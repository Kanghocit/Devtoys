export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export const sortJsonKeys = (obj: JsonValue): JsonValue => {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortJsonKeys(obj[key]);
        return acc;
      }, {} as Record<string, JsonValue>);
  }
  return obj;
};

export const formatJson = (
  input: string,
  type: "2 spaces" | "4 spaces" | "1 tab" | "Minified",
  sortOptions: boolean
): string => {
  try {
    let parsed = JSON.parse(input);
    if (sortOptions) {
      parsed = sortJsonKeys(parsed);
    }

    const spaceMap = {
      "2 spaces": 2,
      "4 spaces": 4,
      "1 tab": "\t",
      Minified: 0,
    };

    return JSON.stringify(parsed, null, spaceMap[type]);
  } catch {
    return input;
  }
};
