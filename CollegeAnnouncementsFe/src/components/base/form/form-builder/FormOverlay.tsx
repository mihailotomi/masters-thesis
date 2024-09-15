import { Loader } from "../../loader";

import styles from "./FormBuilder.module.scss";

export function FormOverlay() {
  return (
    <div className={styles.formOverlay}>
      <Loader />
    </div>
  );
}
