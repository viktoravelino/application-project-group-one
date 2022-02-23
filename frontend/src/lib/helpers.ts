export const capitalizeFirstLettersEachWord = (str: string): string => {
  const strArray = str.split(" ");
  const capSrt = strArray.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capSrt.join(" ");
};
