import { createBrowserHistory } from "history";

export type NavigationState = Record<string, unknown>;

export const navigator = createBrowserHistory({ window });

/**
navigateTo: This function is used to navigate to a new route. It takes two parameters:
* @param {string} to: The route to navigate to.
* @param {NavigationState} state: The state to pass to the new route.
*/

export const navigateTo = (to: string, state?: NavigationState) => {
  navigator.push(to, state);
};

/**
navigateBack: This function is used to navigate back to the previous route.
 */

export const navigateBack = () => {
  navigator.back();
};

/**
navigateReplace: This function is used to replace the current route with a new route.
 * It takes two parameters:
 * @param {string} to: The route to navigate to.
 * @param {NavigationState} state: The state to pass to the new route.
 */

export const navigateReplace = (to: string, state?: NavigationState) => {
  navigator.replace(to, state);
};

/**
  navigateForward: This function is used to navigate forward to the next route.
*/

export const navigateForward = () => {
  navigator.forward();
};
