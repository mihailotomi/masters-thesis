import React from "react";
import { Button as Btn } from "react-bootstrap";
import classNames from "classnames";

import { Loader } from "../loader";
import { getButtonLoaderColor } from "./utils/getButtonLoaderColor";
import { ButtonProps } from "./button.types";
import styles from "./Button.module.scss";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      variant,
      onMouseLeave,
      onMouseEnter,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const [_hovered, setHovered] = React.useState(false);

    return (
      <Btn
        size={props.size}
        onMouseEnter={(e) => {
          setHovered(true);
          if (onMouseEnter) {
            onMouseEnter(e);
          }
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          if (onMouseLeave) {
            onMouseLeave(e);
          }
        }}
        ref={ref}
        disabled={disabled || loading}
        className={classNames(
          styles.button,
          { [className as string]: !!className },
          { [styles["button--fill"]]: !variant?.includes("outline") },
        )}
        variant={variant}
        {...props}
      >
        {leftIcon && !loading && (
          <span
            className={classNames(styles["button--icon"], {
              [styles["button-icon--left"]]: !!children,
            })}
          >
            {leftIcon}
          </span>
        )}
        <>
          {loading && (
            <div className={styles["button--loader"]}>
              <Loader size="x-small" color={getButtonLoaderColor(variant)} />
            </div>
          )}
          {children}
        </>
        {rightIcon && !loading && (
          <span
            className={classNames(styles["button--icon"], {
              [styles["button--icon__right"]]: !!children,
            })}
          >
            {rightIcon}
          </span>
        )}
      </Btn>
    );
  },
);
