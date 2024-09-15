export const encodeAsUrlEncoded = <T extends { [key: string]: string | number }>(
  data: T,
): string => {
  const formBody: string[] = [];

  Object.entries(data).forEach(([key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value).replace(" ", "+");
    formBody.push(`${encodedKey}=${encodedValue}`);
  });

  return formBody.join("&");
};
