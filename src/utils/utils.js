/**
 * Transforms MELI's thumbnail low-res image URL to original full-res image URL
 * @param {string} url - MELI's thumbnail product property from fetch response
 */
export const transformImageUrl = (url) => {
  const hyphenIndex = url.lastIndexOf("-");
  const dotIndex = url.lastIndexOf(".");

  return url.substring(0, hyphenIndex + 1) + "O" + url.substring(dotIndex, url.length);
};

/**
 * Creates a query string form separate properties
 * @param {string} operation - operation type obtained from a select field
 * @param {string} property - property type obtained from a select field
 * @param {string} zone - zone obtained from a custom datalist
 */
export const buildQuery = (operation, property, zone) => {
  const operationType = operation.toLowerCase();
  const propertyType = property.toLowerCase();

  return `${operationType} de ${propertyType} en ${zone}`;
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

/**
 * Formats dates to dd/mm/yyyy - hh:mm
 * @param {string} rawDate - UNIX Timestamp
 */
export const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = String(date.getFullYear());
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
