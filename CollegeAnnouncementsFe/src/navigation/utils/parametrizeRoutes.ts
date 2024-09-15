import { AppRoute } from "../app-routes";

type Params = { [k: string]: string | undefined };

export const processUrl = (rawUrl: string, params: Params) => {
  const segments = rawUrl.split("/");

  // Replace wildcard parameters with values from the dictionary
  const processedSegments = segments.map((segment) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      return params[paramName] !== undefined ? params[paramName] : segment;
    }
    return segment;
  });

  // Join the processed segments back into a URI
  const processedURI = processedSegments.join("/");
  return processedURI;
};

/**
 * Utility function used to inject url parameters into routes defined with possible wildcard paths.
 * @param  routes
 * @param params
 * @returns {AppRoute[]}
 */
export const parametrizeRoutes = (routes: AppRoute[], params: Params): AppRoute[] =>
  routes.map((route) => ({
    ...route,
    path: processUrl(route.path, params),
  }));
