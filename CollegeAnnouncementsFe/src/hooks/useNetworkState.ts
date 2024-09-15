import * as React from "react";

interface NetworkInformation {
  online?: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?: "bluetooth" | "cellular" | "ethernet" | "none" | "wifi" | "wimax" | "other" | "unknown";
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface ExtendedNetworkInformation extends NetworkInformation {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

const isShallowEqual = <T extends Record<string, unknown>>(object1: T, object2: T): boolean => {
  const keys1 = Object.keys(object1) as Array<keyof T>;

  return (
    keys1.length === Object.keys(object2).length &&
    keys1.every((key) => object1[`${key as string}`] === object2[`${key as string}`])
  );
};

const getConnection = (): ExtendedNetworkInformation | null => {
  const navigatorWithConnection = navigator as NavigatorWithConnection;

  return (navigatorWithConnection.connection ||
    navigatorWithConnection.mozConnection ||
    navigatorWithConnection.webkitConnection) as ExtendedNetworkInformation | null;
};

const subscribe = (callback: () => void) => {
  window.addEventListener("online", callback, { passive: true });
  window.addEventListener("offline", callback, { passive: true });

  const connection = getConnection();

  if (connection) {
    connection.addEventListener("change", callback, { passive: true });
  }

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);

    if (connection) {
      connection.removeEventListener("change", callback);
    }
  };
};

const getServerSnapshot = () => {
  throw Error("useNetworkState is a client-only hook");
};

export function useNetworkState() {
  const cache = React.useRef({});

  const getSnapshot = () => {
    const online = navigator.onLine;
    const connection = getConnection();

    const nextState = {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    };

    if (isShallowEqual(cache.current, nextState)) {
      return cache.current as NetworkInformation;
    }
    cache.current = nextState;
    return nextState;
  };

  const value = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    ...value,
  };
}
