import React, { RefObject } from "react";
import classNames from "classnames";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

import { SelectProps } from "../FormControl.types";

import styles from "./SelectInput.module.scss";
import { useSelectInput } from "./UseSelectInput";

export const SelectInput = React.forwardRef(
  (
    { options, onChange, className, disabled = false, value }: SelectProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const {
      isDropdownOpen,
      onSelectClick,
      onSearchInputHandler,
      searchTerm,
      filteredOptions,
      onSelectOptionClick,
      isOptionsSelected,
      onRemoveClick,
    } = useSelectInput({
      options,
      onChange,
      value,
      controlRef: ref as RefObject<HTMLElement>,
    });

    const renderOptions = () =>
      isDropdownOpen && (
        <ul className={styles.options}>
          {filteredOptions.map((option) => (
            <li key={option.value + option.label}>
              <button type="button" onClick={() => onSelectOptionClick(option)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      );

    const renderIcon = () =>
      !disabled ? (
        isOptionsSelected ? (
          <CiCircleRemove className={styles.clearIcon} onClick={onRemoveClick} />
        ) : (
          <IoMdArrowDropdown onClick={onSelectClick} />
        )
      ) : (
        ""
      );

    return (
      <span
        className={classNames(
          "form-control",
          styles.selectWrapper,
          disabled ? styles.selectWrapperDisabled : "",
          className,
        )}
      >
        <input
          ref={ref}
          type="text"
          disabled={disabled}
          onChange={onSearchInputHandler}
          value={options.find((opt) => opt.value === value)?.label || searchTerm}
          onClick={onSelectClick}
        />
        {renderOptions()}
        {renderIcon()}
      </span>
    );
  },
);
