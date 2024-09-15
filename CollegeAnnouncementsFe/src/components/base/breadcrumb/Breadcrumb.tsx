import { Link } from "react-router-dom";
import classNames from "classnames";

import { AppRoute } from "@navigation";

import styles from "./Breadcrumb.module.scss";

export type BreadcrumbItem = AppRoute & {
  active?: boolean;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="d-flex flex-row">
      {items.map((item) => (
        <li
          key={item.name}
          aria-current={item.active ? "page" : undefined}
          className={classNames(styles.breadcrumb, { [styles.active]: item.active })}
        >
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </nav>
  );
};
