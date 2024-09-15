type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type TableWidth = IntRange<0, 101>;

export type Order = "asc" | "desc";

export type SearchKeyValue = number | string | null | undefined | boolean;

export interface Searchable {
  id: string | number;
  [key: string]: SearchKeyValue;
}

export type SearchOption = { value: string | number; label: string };

export type HeadCell<T> = {
  id: keyof T | "actions" | "checkbox";
  label: string;
  dataType: "string" | "number" | "date" | "boolean" | "custom";
  disablePadding?: boolean;
  width?: TableWidth;
  align?: "right" | "left";
  hide?: boolean;
  sortable?: boolean;
  filterType?: "text" | "number" | "date" | "date-range" | "boolean";
  filterValue?: string;
  render?: (item: T) => JSX.Element | string;
  customCsvMapper?: (item: T) => string;
  dateFormat?: string;
};
