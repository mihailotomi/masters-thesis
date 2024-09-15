/**
 *  Converts an array of objects to a CSV string with headers based on the keys provided
 * @param keys  Array of keys to be used as identifiers for the object properties
 * @param headers Array of headers to be used in the CSV file
 * @param data Array of objects to be converted to CSV
 * @param delimiter Delimiter to be used in CSV file (default is ',')
 * @returns CSV string
 */

export const convertToCSV = <T extends Record<string, unknown>>(
  keys: Array<keyof T>,
  headers: Array<string>,
  data: Array<T>,
  delimiter = ",",
): string => {
  const headerRow = headers.join(delimiter);
  const rows = data
    .map((row) =>
      keys.map((field) => (row[field] === undefined ? "" : String(row[field]))).join(delimiter),
    )
    .join("\n");

  return `${headerRow}\n${rows}`;
};
