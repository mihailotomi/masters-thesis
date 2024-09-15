import React from "react";
import styles from "./Loader.module.scss";

type CSSLength = `${number}px` | `${number}em` | `${number}rem` | `${number}vw` | `${number}vh`;

type LoaderSize = "x-small" | "small" | "medium" | "large" | "x-large";

type CustomSize = {
  height: CSSLength;
  width: CSSLength;
  maxWidth: CSSLength;
  maxHeight: CSSLength;
  backgroundSize: `${CSSLength} ${CSSLength}`;
};

type LoaderProps = {
  size?: LoaderSize;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "white";
  customSize?: CustomSize;
};

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  color = "secondary",
  customSize,
}) => {
  let loaderClassName = styles.loader;

  if (customSize) {
    const { height, width, maxWidth, maxHeight, backgroundSize } = customSize;
    const customStyles = {
      height,
      width,
      maxWidth,
      maxHeight,
      backgroundSize,
    };
    return <div className={loaderClassName} style={customStyles} />;
  }
  loaderClassName += ` ${styles[`loader--${size}`]} ${styles[`loader--${color}`]}`;
  return (
    <div
      className={loaderClassName}
      style={{
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Loader;
