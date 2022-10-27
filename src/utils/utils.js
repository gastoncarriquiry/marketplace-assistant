export const transformImageUrl = (url) => {
  const hyphenIndex = url.lastIndexOf("-");
  const dotIndex = url.lastIndexOf(".");

  return url.substring(0, hyphenIndex + 1) + "O" + url.substring(dotIndex, url.length);
};
