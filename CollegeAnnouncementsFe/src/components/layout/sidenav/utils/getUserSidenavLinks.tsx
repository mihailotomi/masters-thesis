import { FaBriefcase } from "react-icons/fa";

import { SideNavLink } from "../Sidenav.types";

import styles from "../Sidenav.module.scss";
import { appRoutes } from "@navigation";

export const getUserSidebarLinks = (): SideNavLink[] => {
  return [
    {
      kind: "group",
      label: "Администрација",
      icon: <FaBriefcase className={styles.sidenavIcon} />,
      sublinks: [
        {
          label:"Ново обавештење",
          path: appRoutes.addAnnouncement.path
        }
      ],
    },
  ];
};
