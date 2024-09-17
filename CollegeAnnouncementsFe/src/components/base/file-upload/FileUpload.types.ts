import { Accept } from "react-dropzone";

export interface FileUploadProps {
  onUpload: (files: File[]) => any;
  maxFiles?: number;
  accept?: Accept;
}

export const elementsColor: string = "#808080";

export const activeStyle = {
  color: elementsColor,
  borderStyle: "solid",
  borderWidth: 1,
  backgroundColor: "#F8F8F8",
  text: "Drop file(s)",
};

export const inactiveStyle = {
  color: elementsColor,
  borderStyle: "dashed",
  borderWidth: 1,
  backgroundColor: "transparent",
  text: "Click or drag to upload file(s)",
};
