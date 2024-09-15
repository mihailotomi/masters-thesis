import { PropsWithChildren } from "react";

import styles from "./Panel.module.scss";

export const Panel: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  return <div className={styles.panel}>{children}</div>;
};
