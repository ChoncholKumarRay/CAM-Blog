const STORAGE_KEY = "camblog_user";

export const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "",
        email: parsed.email || "",
      };
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return { name: "", email: "" };
};

export const saveUserToStorage = (name, email) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const hasStoredUser = () => {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return false;
  }
};
