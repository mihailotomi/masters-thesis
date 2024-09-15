import React, { useLayoutEffect, useMemo, useState } from "react";
import { Table as TB } from "react-bootstrap";
import { BiDownload } from "react-icons/bi";
import { GrDocumentMissing } from "react-icons/gr";
import moment from "moment";

import { areDatesEqualByDay, isDateInBetween } from "@utils";

import { HeadCell, Order, SearchOption, Searchable } from "./table.types";
import { defaultColumnCsvMapper, getComparator, searchArray, stableSort } from "./utils";
import { TableHeader } from "./TableHeader";
import { Pagination } from "./Pagination";
import { TableSearch } from "./TableSearch";
import { FilterValue } from "./FilterRow";
import { PageLoader } from "../page-loader";
import { ButtonDownloadCSV } from "../buttons/ButtonDownloadCSV";

import "./Table.scss";
import { Button } from "../buttons";

type CommonTableProps<T extends Searchable> = {
  data: T[];

  columns: HeadCell<T>[];
  isLoading?: boolean;
  height?: string | number;
};

type ServerTableProps<T extends Searchable> = CommonTableProps<T> & {
  isServerSide: true;
  count: number;
  currentPage: number;
  sortOrder: Order;
  sortBy: string;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSort?: (sortBy: keyof T, order: Order) => void;
  onFilterChange?: (filters: Record<string, FilterValue>) => void;
  onSearch?: (search: string) => void;
  onCsvDownload?: () => void;
  isDownloadingCsv?: boolean;
  onRefresh: () => void;
};

type ClientTableProps<T extends Searchable> = CommonTableProps<T> & {
  isServerSide: false;
  searchOptions: SearchOption[];
};

type TableProps<T extends Searchable> = ServerTableProps<T> | ClientTableProps<T>;

export const Table = <T extends Searchable>({
  data = [],
  columns,
  isLoading = true,
  isServerSide = false,
  height,
  // server side props
  ...rest
}: TableProps<T>): JSX.Element => {
  const serverProps = isServerSide
    ? (rest as Omit<ServerTableProps<T>, keyof CommonTableProps<T>> as ServerTableProps<T>)
    : (null as never);

  const searchOptions =
    (rest as Omit<ClientTableProps<T>, keyof CommonTableProps<T>> as ClientTableProps<T>)
      .searchOptions || [];

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(
    (columns.find((col) => col.sortable)?.id as string) || "",
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<T[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState<Record<string, FilterValue>>({});

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const applyFilters = (tableData: T[], tableFilters: Record<string, FilterValue>) => {
    return tableData.filter((row) =>
      Object.entries(tableFilters).every(([key, filterValue]) => {
        const rowData = row[key];
        if (typeof filterValue === "string") {
          return (rowData ?? "").toString().toLowerCase().includes(filterValue.toLowerCase());
        }
        if (filterValue instanceof Date) {
          const rowDate = rowData ? new Date(rowData as string) : null;

          return areDatesEqualByDay(rowDate as Date, filterValue);
        }
        if (filterValue instanceof Array && filterValue.every((value) => value instanceof Date)) {
          const rowDate = rowData ? new Date(rowData as string) : new Date();

          return isDateInBetween(rowDate, filterValue[0], filterValue[1]);
        }
        return true;
      }),
    );
  };

  const filteredRows = useMemo(() => {
    if (isServerSide) return data;

    let filteredData = applyFilters(rows, filters);
    // Find the column definition based on the orderBy state
    if (searchValue) {
      filteredData = searchArray(
        filteredData,
        searchOptions.map((v) => v.value as string),
        searchValue,
      );
    }

    const columnDef = columns.find((col) => col.id === orderBy) as HeadCell<T>;

    return stableSort(
      filteredData,
      getComparator(
        order,
        orderBy,
        columnDef?.dataType as "string" | "number" | "boolean" | "date",
      ),
    );
  }, [rows, filters, searchOptions, searchValue, order, orderBy, rowsPerPage]);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleChangePage = (newPage: number) => {
    if (isServerSide) {
      serverProps.onPageChange(newPage);
    } else setPage(newPage);
  };

  const handleChangeRowsPerPage = (option: number) => {
    if (isServerSide) {
      serverProps.onRowsPerPageChange(option);
    } else {
      setRowsPerPage(option);
      setPage(1);
    }
  };

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    if (isServerSide && serverProps?.onSort) {
      const isAsc = serverProps?.sortBy === property && serverProps.sortOrder === "asc";
      serverProps?.onSort(property as keyof T, isAsc ? "desc" : "asc");
    } else {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    }
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isServerSide) {
      serverProps.onSearch?.(event.target.value);
    } else {
      setSearchValue(event.target.value);
      setPage(1);
    }
  };

  const handleFilterChange = (columnId: string, value: FilterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
    if (isServerSide) {
      serverProps.onFilterChange?.({ ...filters, [columnId]: value });
    }
  };

  const prepareHeadersForCSV = (tableColumns: HeadCell<T>[]) => {
    const csvColumns = tableColumns.filter(
      (col) => col.id !== "actions" && col.id !== "checkbox" && col?.label,
    );

    const csvLabels = csvColumns.map((col) => col.label);

    return {
      columns: csvColumns.map((col) => col.id),
      labels: csvLabels,
    };
  };

  const prepareDataForCSV = (tableData: T[]): T[] => {
    return tableData
      .filter((d) => d.id !== "actions")
      .map((row) => {
        const newRow = {} as T;
        columns.forEach((column) => {
          let value = (row[column.id] as string) || "";
          value = column.customCsvMapper
            ? column.customCsvMapper(row)
            : defaultColumnCsvMapper(value, column);
          newRow[column.id] = value as T["actions"] & T["checkbox"] & T[keyof T];
        });
        return newRow;
      });
  };

  useLayoutEffect(() => {
    if (data?.length) {
      setRows([...data]);
    }
  }, [data]);

  return (
    <div
      style={{
        minWidth: `${columns.length * 100}px`,
        width: "100%",
        minHeight: height || "inherit",
        maxHeight: height || "inherit",
        position: "relative",
        overflowX: "clip",
      }}
      className="table-container"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <PageLoader loading={isLoading} />
      </div>
      <div style={{ maxHeight: height }}>
        <TableSearch
          showFilters={showFilters}
          handleInputSearch={handleInputSearch}
          toggleFilters={handleToggleFilters}
          isLoading={isLoading}
          refresh={serverProps?.onRefresh}
          downloadCSV={
            isServerSide ? (
              serverProps.onCsvDownload && (
                <Button
                  leftIcon={<BiDownload size={20} />}
                  variant="outline-primary"
                  onClick={serverProps.onCsvDownload}
                  loading={serverProps.isDownloadingCsv}
                />
              )
            ) : (
              <ButtonDownloadCSV
                keys={prepareHeadersForCSV(columns).columns}
                headers={prepareHeadersForCSV(columns).labels}
                data={prepareDataForCSV(data)}
                fileName="table-data.csv"
              />
            )
          }
        />
        <TB striped bordered hover size="md" className="custom-table">
          <TableHeader
            filters={filters}
            headCells={columns}
            order={isServerSide ? serverProps.sortOrder : order}
            orderBy={isServerSide ? serverProps.sortBy : orderBy}
            onRequestSort={handleRequestSort}
            handleFilterChange={handleFilterChange}
            showFilters={showFilters}
          />
          {data?.length > 0 ? (
            <tbody>
              {(isServerSide
                ? data
                : filteredRows.slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage,
                  )
              ).map((row, idx) => (
                <tr key={String(row.id) + String(idx)}>
                  {columns.map((column) => {
                    let value: string | number | Date | boolean = row[column.id] || "";
                    if (column.dataType === "date") {
                      value = moment(value as unknown as Date).format(
                        column.dateFormat || "DD-MM-YYYY HH:mm",
                      );
                    }
                    return (
                      <td
                        key={String(column.id) + column.label}
                        style={{
                          minWidth: "100px",
                          width: `${column?.width}%` || "inherit",
                          overflow: "hidden",
                          textAlign: column?.align || "left",
                          verticalAlign: "middle",
                        }}
                        className={
                          isServerSide
                            ? serverProps.sortBy === column.id
                              ? "sorted"
                              : ""
                            : orderBy === column.id
                              ? "sorted"
                              : ""
                        }
                      >
                        {column?.render ? column.render(row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="no-data">
                  {!isLoading ? (
                    <>
                      <GrDocumentMissing size={24} /> <p>Nema podataka.</p>
                    </>
                  ) : null}
                </td>
              </tr>
            </tbody>
          )}
        </TB>
      </div>
      <Pagination
        count={isServerSide ? serverProps.count : filteredRows.length}
        currentPage={isServerSide ? serverProps.currentPage : page}
        onPageChange={handleChangePage}
        perPage={isServerSide ? serverProps.rowsPerPage : rowsPerPage}
        id="table-pagination"
        onRowsPerPageChange={handleChangeRowsPerPage}
        paginationConfiguration={{
          backButton: {
            label: "Prethodna",
          },
          nextButton: {
            label: "Sledeća",
          },
        }}
      />
    </div>
  );
};
