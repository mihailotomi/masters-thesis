export const downloadFileWithBlob = (blob: Blob, fileName: string) => {
  const hiddenElement = document.createElement("a");
  const url = window.URL || window.webkitURL;
  const blobUrl = url.createObjectURL(blob);
  hiddenElement.href = blobUrl;
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName;
  hiddenElement.click();
};
