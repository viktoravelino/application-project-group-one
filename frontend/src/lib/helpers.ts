/**
 * This function capitalizes every first letter
 * @param str String to convert each first letter into a capital letter
 * @returns String with each first letter capitalized
 */
export const capitalizeFirstLettersEachWord = (str: string): string => {
  const strArray = str.split(" ");
  const capSrt = strArray.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capSrt.join(" ");
};
