import { Form } from "react-bootstrap";

import { Loader } from "../loader";

import styles from "./Switch.module.scss";

export interface SwitchProps {
  onChange: () => void;
  checked: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function Switch({
  loading = false,
  checked = false,
  disabled = false,
  onChange,
}: SwitchProps) {
  const onChangeHandler = () => {
    onChange();
  };

  return (
    <Form.Check
      type="switch"
      onChange={() => onChangeHandler()}
      checked={checked}
      disabled={disabled}
      className={loading ? styles.switchLoading : ""}
    >
      {loading && (
        <div className={styles.switchLoader}>
          <Loader size="x-small" color="primary" />
        </div>
      )}
    </Form.Check>
  );
}
