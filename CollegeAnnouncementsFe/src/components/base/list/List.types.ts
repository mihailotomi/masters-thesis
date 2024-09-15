import { ReactElement } from "react";

export type ListRow = (ReactElement | string | number)[];

export interface ListProps {
  headers: string[];
  data: ListRow[];
  loading?: boolean;
  className?: string;
}
