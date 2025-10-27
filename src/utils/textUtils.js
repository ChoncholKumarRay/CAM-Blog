export const isBengaliText = (text) => /[\u0980-\u09FF]/.test(text);

export const getFontFamily = (text) => {
  return isBengaliText(text)
    ? "'Tiro Bangla', sans-serif"
    : "'Roboto', sans-serif";
};
