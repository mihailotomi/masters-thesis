import { ChangeEvent, ReactNode } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { BiFilter, BiSearch } from "react-icons/bi";
import { IoReload } from "react-icons/io5";

import { Button } from "../buttons";
import "./TableSearch.scss"; // Import the SCSS file for styling

export type SearchOption = { value: string | number; label: string };

interface Props<T> {
  showFilters: boolean;
  isLoading: boolean;
  downloadCSV?: ReactNode;
  toggleFilters: () => void;
  handleInputSearch: (event: ChangeEvent<HTMLInputElement>) => T;
  refresh?: () => void;
}

export const TableSearch = <T,>({
  showFilters,
  isLoading,
  downloadCSV,
  toggleFilters,
  handleInputSearch,
  refresh,
}: Props<T>) => {
  return (
    <div className="table-search">
      <div className="search-wrapper">
        <InputGroup>
          <FormControl placeholder="Search..." aria-label="Search" onChange={handleInputSearch} />
          <InputGroup.Text>
            <BiSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center gap-2">
        <Button
          variant={showFilters ? "primary" : "outline-primary"}
          onClick={toggleFilters}
          leftIcon={<BiFilter size={22} />}
        />
        {downloadCSV && downloadCSV}
      </div>
      {refresh && (
        <div>
          <Button
            type="button"
            disabled={isLoading}
            variant="outline-primary"
            onClick={() => refresh()}
            leftIcon={<IoReload size={22} />}
            className="refresh"
          />
        </div>
      )}
    </div>
  );
};
