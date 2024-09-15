import { BiDownload } from "react-icons/bi";

import { convertToCSV } from "@utils";
import { Button } from "./Button";

interface DownloadButtonProps<T> {
  keys: Array<keyof T>;
  data: T[];
  headers: string[];
  delimiter?: string;
  fileName?: string;
  variant?: string;
}

export const ButtonDownloadCSV = <T extends Record<string, unknown>>({
  keys,
  headers,
  data,
  delimiter,
  fileName,
  variant = "outline-primary",
}: DownloadButtonProps<T>) => {
  const handleDownload = () => {
    const csvData = convertToCSV(keys, headers, data, delimiter);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName || "table-data.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <Button leftIcon={<BiDownload size={20} />} variant={variant} onClick={handleDownload} />;
};
