import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import PaginationButton from "./PaginationButton";
import PaginationListItem from "./PaginationListItem";
import { iPaginationProps } from "./pagination.types";

const rowsPerPageOptions = [5, 10, 25, 50];

export const Pagination = ({
  currentPage = 0,
  perPage,
  count,
  paginationConfiguration,
  onPageChange,
  onRowsPerPageChange,
}: iPaginationProps) => {
  const positionStyles = React.useMemo(() => {
    switch (paginationConfiguration?.position) {
      case "center":
        return "justify-content-center";
      case "left":
        return "justify-content-start";
      case "right":
        return "justify-content-end";

      default:
        return "justify-content-end";
    }
  }, [paginationConfiguration]);

  // local state
  const [pageNumbers, setPageNumbers] = React.useState<(number | string)[]>([]);

  const handleRowsPerPageChange = React.useCallback(
    (value: number) => {
      if (!onRowsPerPageChange) return;
      onRowsPerPageChange(value);
    },
    [onRowsPerPageChange],
  );

  // private functions
  const back = React.useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange, perPage]);

  const next = React.useCallback(() => {
    const lastPageNumber = pageNumbers[pageNumbers.length - 1] as number;
    if (currentPage < lastPageNumber) onPageChange(currentPage + 1);
  }, [currentPage, onPageChange, pageNumbers, perPage]);

  const countPages = React.useCallback(() => {
    const newLastPage = Math.ceil(count / perPage);

    if (newLastPage <= 1) {
      setPageNumbers([]);
      return;
    }

    const totalSlots = 7; // Total slots, including page numbers and ellipses
    const pages: (number | string)[] = [1]; // Always start with the first page

    if (newLastPage <= totalSlots) {
      // If total pages are 7 or fewer, display all pages
      for (let page = 2; page <= newLastPage; page++) {
        pages.push(page);
      }
    } else {
      const nearStart = currentPage <= 3;
      const nearEnd = currentPage > newLastPage - 3;

      if (nearStart) {
        for (let page = 2; page <= 5; page++) {
          pages.push(page);
        }
        pages.push("right-ellipses");
      } else if (nearEnd) {
        pages.push("left-ellipses");
        for (let page = newLastPage - 4; page <= newLastPage; page++) {
          pages.push(page);
        }
      } else {
        // Current page in the middle
        pages.push("left-ellipses");
        for (let page = currentPage - 1; page <= currentPage + 1; page++) {
          pages.push(page);
        }
        pages.push("right-ellipses");
      }
    }

    // Include the last page if it's not already included
    if (pages[pages.length - 1] !== newLastPage) {
      pages.push(newLastPage);
    }

    setPageNumbers(pages);
  }, [perPage, count, currentPage]);

  // effects hooks
  React.useEffect(() => {
    countPages();
    return () => {};
  }, [countPages]);

  return (
    <div className={`d-flex ${positionStyles}`}>
      <nav className="d-flex justify-content-between align-items-center  gap-4">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="white" id="dropdown-per-page">
              {perPage} po strani
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {rowsPerPageOptions.map((option) => (
                <Dropdown.Item key={option} onClick={() => handleRowsPerPageChange(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          {pageNumbers?.length ? (
            <ul className="m-0 p-1 d-flex justify-content-center align-items-center gap-2">
              <PaginationButton
                onClick={back}
                type="back"
                currentPage={currentPage}
                buttonConfiguration={paginationConfiguration?.backButton}
                pageNumbers={pageNumbers.filter((item) => typeof item === "number") as number[]}
                perPage={perPage}
              />

              {pageNumbers.map((item) =>
                item === "left-ellipses" || item === "right-ellipses" ? (
                  <li key={item}>
                    <span>...</span>
                  </li>
                ) : (
                  <PaginationListItem
                    onPageChange={() => onPageChange(item as number)}
                    key={item}
                    pageButton={paginationConfiguration?.pageButton}
                    pageNumber={item as number}
                    currentPage={currentPage}
                  />
                ),
              )}
              <PaginationButton
                type="next"
                onClick={next}
                buttonConfiguration={paginationConfiguration?.nextButton}
                pageNumbers={pageNumbers.filter((item) => typeof item === "number") as number[]}
                currentPage={currentPage}
                perPage={perPage}
              />
            </ul>
          ) : null}
        </div>
      </nav>
    </div>
  );
};
