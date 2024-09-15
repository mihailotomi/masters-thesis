import { Loader } from "../loader";
import { ListProps } from "./List.types";

import styles from "./List.module.scss";

export function List({ headers, data, loading = false, className = "" }: ListProps) {
  return (
    <table className={`table table-striped ${styles.list} ${className}`}>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={header + String(idx)}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.listBody}>
        {loading && (
          <tr className={styles.listOverlay}>
            <td className="bg-transparent">
              <Loader size="small" />
            </td>
          </tr>
        )}
        {data.map((row, idx) => (
          <tr key={`${String(row)} ${String(idx)}`}>
            {row.map((el, i) => (
              <td
                key={`
                ${String(el)}
                ${String(i)}
                ${String(idx)}
                `}
              >
                {el}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
