export const transformImageUrl = (url) => {
  const hyphenIndex = url.lastIndexOf("-");
  const dotIndex = url.lastIndexOf(".");

  return url.substring(0, hyphenIndex + 1) + "O" + url.substring(dotIndex, url.length);
};

/**
 * Transforms body of a fetch raw response to a JSON object
 * @param {object} apiRaw - Fetch raw response
 * @param {object} apiJson - Body of fetch response transformed to JSON
 */
export const apiToJson = (apiRaw) => {
  return apiRaw.json();
};

/**
 * Saves to localStorage a JSON string
 * @param {string} key - Key identifier
 * @param {any} value - Value to store
 */
export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves from localStorage a JSON parsed object
 * @param {string} key - Key identifier
 * @param {any} defaultValue - Default value if not key present
 */
export const loadLocalStorage = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

/**
 * Creates an encoded url with params
 * @param {string} url - The base url
 * @param {object} params - Params in key-value structure
 * @return {string} Encoded url with params
 */
export const buildUrl = (url, params) => {
  const urlObj = new URL(url);
  if (params) {
    urlObj.search = new URLSearchParams(params).toString();
  }

  return urlObj;
};