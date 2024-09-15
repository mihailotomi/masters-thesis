import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./PageLoader.module.scss";

type PageLoaderProps = {
  loading?: boolean;
  height?: string;
};

export const PageLoader: React.FC<PageLoaderProps> = ({ height = "5px", loading = false }) => {
  const [width, setWidth] = useState("0%");
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      setWidth("99%");
    } else {
      // First, complete the loader to 100%
      const completeLoad = setTimeout(() => {
        setWidth("100%");
        // Then, after a short delay, hide the loader
        const hideLoader = setTimeout(() => setWidth("0%"), 500);
        timeoutId.current = hideLoader;
      }, 500); // Delay to allow the transition to 100% to be visible
      timeoutId.current = completeLoad;
    }

    // Clear timeout on component unmount or when loading state changes
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [loading]);

  const loaderClass = useMemo(
    () => `${styles.loader} ${loading ? styles.loadingAnimation : ""}`,
    [loading],
  );

  return <div className={loaderClass} style={{ height, width }} />;
};

export default PageLoader;
