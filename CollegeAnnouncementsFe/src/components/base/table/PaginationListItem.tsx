/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { iActivePageProps } from "./pagination.types";

const PaginationListItem = ({
  onPageChange,
  pageNumber,
  currentPage,
  pageButton,
}: iActivePageProps) => {
  const baseClasses = "px-1 text-center rounded";

  const activeClasses = "bg-primary rounded-1 text-white";

  const isActivePage = React.useMemo(() => {
    return pageNumber === currentPage;
  }, [pageNumber, currentPage]);

  return (
    <li
      style={{
        cursor: "pointer",
      }}
      onClick={onPageChange}
    >
      {pageButton?.render ? (
        pageButton.render(pageNumber, isActivePage)
      ) : (
        <span
          style={{
            display: "inline-block",
            minWidth: "30px",
            height: "30px",
            lineHeight: "30px",
          }}
          className={`${pageButton?.styles ? pageButton.styles : baseClasses} ${
            isActivePage ? (pageButton?.activeStyles ? pageButton.activeStyles : activeClasses) : ""
          }`}
        >
          {pageNumber}
        </span>
      )}
    </li>
  );
};

export default PaginationListItem;
