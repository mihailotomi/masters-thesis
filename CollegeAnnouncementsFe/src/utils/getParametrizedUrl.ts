export const getParametrizedUrl = (unparametrizedUrl: string, id: number) => {
  return unparametrizedUrl.replace(":id", id.toString());
};
