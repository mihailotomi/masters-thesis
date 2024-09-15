import moment from "moment";
import { HeadCell, Order, Searchable } from "./table.types";

export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const descendingComparator = <T extends { [key: string]: unknown }>(
  a: T,
  b: T,
  orderBy: keyof T,
  dataType: "string" | "number" | "date" | "boolean" | "custom",
) => {
  // Existing logic for other types
  if (typeof b[orderBy] === "symbol" || typeof a[orderBy] === "symbol") {
    return 0;
  }

  const aValue = a[orderBy];
  const bValue = b[orderBy];
  if (dataType === "custom") {
    return 0;
  }
  if (dataType === "date") {
    const dateA = moment(aValue as string, moment.ISO_8601);
    const dateB = moment(bValue as string, moment.ISO_8601);
    if (dateA.isValid() && dateB.isValid()) {
      return dateB.valueOf() - dateA.valueOf();
    }
  }

  if (typeof aValue === "number" && typeof bValue === "number") {
    // Handle numeric values
    return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
  }

  if (typeof aValue === "string" && typeof bValue === "string") {
    // Handle string values
    return bValue.localeCompare(aValue);
  }

  return 0;
};

export const getComparator = <T extends { [key: string]: unknown }>(
  order: Order,
  orderBy: keyof T,
  dataType: "string" | "number" | "date" | "boolean",
): ((a: T, b: T) => number) => {
  return order === "desc"
    ? (a, b) => {
        return descendingComparator(a, b, orderBy, dataType);
      }
    : (a, b) => -descendingComparator(a, b, orderBy, dataType);
};

export function searchArray<T extends Searchable>(
  arr: T[],
  searchKeys: string[],
  searchString: string,
): T[] {
  if (searchKeys.length === 0) {
    return arr;
  }

  return arr.filter((obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of searchKeys) {
      if (
        key !== "" &&
        obj[key] !== undefined &&
        obj[key]?.toString().toLowerCase().includes(searchString.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  });
}

export function defaultColumnCsvMapper<T>(value: string, column: HeadCell<T>): string {
  if (column.dataType === "date") {
    return moment(value as unknown as Date).format(column.dateFormat || "DD-MM-YYYY HH:mm");
  }
  if (column.dataType === "boolean") {
    return value ? "Da" : "Ne";
  }
  if (column.dataType === "number") {
    return value.toString();
  }
  if (column.id === "actions" || column.id === "checkbox") {
    return "";
  }
  return value;
}
