import { ReactNode } from "react";
import { useParams } from "react-router-dom";

import { AppRoute, parametrizeRoutes } from "@navigation";

import { Breadcrumb, BreadcrumbItem } from "../../base";

import styles from "./Header.module.scss";

export interface WithHeaderProps {
  title: string;
  fullPath: AppRoute[];
  children: ReactNode;
}

export function WithHeader({ children, title, fullPath }: WithHeaderProps) {
  const params = useParams();

  const breadcrumbItems: BreadcrumbItem[] = parametrizeRoutes(fullPath, params);
  if (breadcrumbItems.length) {
    breadcrumbItems[breadcrumbItems.length - 1].active = true;
  }

  return (
    <>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      {children}
    </>
  );
}
