import { FaBriefcase } from "react-icons/fa";

import { SideNavLink } from "../Sidenav.types";

import styles from "../Sidenav.module.scss";

export const getUserSidebarLinks = (): SideNavLink[] => {
  return [
    {
      kind: "group",
      label: "Administracija",
      icon: <FaBriefcase className={styles.sidenavIcon} />,
      sublinks: [],
    },
  ];
};
