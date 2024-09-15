import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";

import { useSideNav } from "./useSideNav";

import styles from "./Sidenav.module.scss";

export function SideNav() {
  const { isOpen, toggleDrawer, links } = useSideNav();

  return (
    <div className={classNames([isOpen ? styles.sidenavNonCollapsed : styles.sidenavCollapsed])}>
      <div className={styles.toggle}>
        <button type="button" className={styles.toggleButton} onClick={toggleDrawer}>
          <GiHamburgerMenu className={styles.toggleIcon} />
        </button>
      </div>
      <div className={styles.navigation}>{links}</div>
    </div>
  );
}
