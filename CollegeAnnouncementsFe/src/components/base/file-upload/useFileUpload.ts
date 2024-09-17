import React from "react";
import { activeStyle, inactiveStyle } from "./FileUpload.types";

export function useFileUpload(onUpload: (files: File[]) => any) {
  const [config, setConfig] = React.useState(inactiveStyle);

  const _onDrop = (files: File[]) => {
    onUpload(files);
    onDragLeave();
  };

  const onDragEnter = () => {
    setConfig(activeStyle);
  };

  const onDragLeave = () => {
    setConfig(inactiveStyle);
  };

  return { _onDrop, onDragEnter, onDragLeave, config };
}
