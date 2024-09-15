import React from "react";

import { iPaginationButtonProps } from "./pagination.types";

const PaginationButton = ({
  type,
  currentPage,
  pageNumbers,
  perPage,
  onClick,
  buttonConfiguration,
}: iPaginationButtonProps) => {
  const textWrapperStyles = `d-flex align-items-center gap-1 text-capitalize rounded px-1 py-1 ${type === "back" ? "flex-row-reverse" : "flex-row"}`;

  const disabled = React.useMemo(() => {
    if (type === "back") {
      return currentPage <= 1;
    }
    if (type === "next") {
      return currentPage >= pageNumbers[pageNumbers.length - 1];
    }
    return false;
  }, [pageNumbers, currentPage, type, perPage]);

  return (
    <li>
      {buttonConfiguration?.render ? (
        buttonConfiguration.render()
      ) : (
        <button type="button" disabled={disabled} onClick={onClick}>
          <span
            className={buttonConfiguration?.styles ? buttonConfiguration.styles : textWrapperStyles}
          >
            {buttonConfiguration?.label || type}
            {buttonConfiguration?.icon ? buttonConfiguration.icon : null}
          </span>
        </button>
      )}
    </li>
  );
};

export default PaginationButton;
