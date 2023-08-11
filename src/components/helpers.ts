export function capitalizeFirstLetter(str: string) {
    if (str.length === 0) {
      return "";
    }
    let lowerCaseString = str.toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
  }