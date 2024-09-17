import Dropzone from "react-dropzone";
import { elementsColor, FileUploadProps } from "./FileUpload.types";
import { useFileUpload } from "./useFileUpload";
import "./FileUpload.style.scss";
import { FaFile } from "react-icons/fa";

export function FileUpload({ maxFiles, accept, onUpload }: FileUploadProps) {
  const { _onDrop, onDragEnter, onDragLeave, config } = useFileUpload(onUpload);
  return (
    <Dropzone
      onDrop={_onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      accept={accept}
      maxFiles={maxFiles}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="file-container mx-auto"
          style={{
            borderColor: config.color,
            borderStyle: config.borderStyle,
            backgroundColor: config.backgroundColor,
            borderWidth: config.borderWidth,
          }}
        >
          <input {...getInputProps()} />
          <FaFile />
          <p className="mt-3 mb-0" style={{ color: elementsColor }}>
            {config.text}
          </p>
        </div>
      )}
    </Dropzone>
  );
}
