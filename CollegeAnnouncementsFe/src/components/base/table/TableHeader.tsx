import React, { useLayoutEffect, useRef, useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

import { Order, HeadCell } from "./table.types";
import "./TableHeader.scss";
import FilterRow, { FilterValue } from "./FilterRow";

type Props<T> = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell<T>[];
  showFilters: boolean;
  filters: Record<string, FilterValue>;
  handleFilterChange: (id: string, value: FilterValue) => void;
};

export function TableHeader<T>({
  order,
  orderBy,
  headCells,
  showFilters,
  filters,
  handleFilterChange,
  onRequestSort,
}: Props<T>) {
  const headerRef = useRef<HTMLTableRowElement>(null);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  useLayoutEffect(() => {
    const calculateWidths = () => {
      if (headerRef.current) {
        const widths = Array.from(headerRef.current.children).map(
          (child) => (child as HTMLElement).getBoundingClientRect().width,
        );
        setColumnWidths(widths);
      }
    };

    const timeoutId = setTimeout(calculateWidths, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [headerRef.current, headCells, showFilters]);

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr ref={headerRef}>
        {headCells.map((hcell) => (
          <th
            key={String(hcell.id) + hcell.label}
            style={{
              width: hcell.width ? `${hcell.width}%` : "inherit",
            }}
            className="tableHeaderCell"
            onClick={hcell.sortable ? createSortHandler(hcell.id as string) : undefined}
          >
            {hcell.label}
            {hcell.sortable && (
              <span className={`sortIcon ${orderBy === hcell.id ? "active" : ""}`}>
                {orderBy === hcell.id &&
                  (order === "desc" ? <CgChevronDown size={22} /> : <CgChevronUp size={22} />)}
              </span>
            )}
          </th>
        ))}
      </tr>
      {showFilters && (
        <FilterRow
          filters={filters}
          headCells={headCells}
          onFilterChange={handleFilterChange}
          columnWidths={columnWidths}
        />
      )}
    </thead>
  );
}
