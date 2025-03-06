// Paste
export const handlePaste = async (callback: (value: string) => void) => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      callback(text);
    }
  } catch (error) {
    console.error("Failed to paste:", error);
  }
};

// Copy
export const handleCopy = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

// File Upload
export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (value: string) => void
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result as string;
    callback(text.trim());
  };
  reader.readAsText(file);
};
