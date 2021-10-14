export const preProcessText = (text: string): string => {
  let removableCharacters = /[\n .\t\r]+/g;
  return text.toLowerCase().replace(removableCharacters, "");
};
