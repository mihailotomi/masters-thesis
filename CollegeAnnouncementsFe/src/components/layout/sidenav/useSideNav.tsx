import classNames from "classnames";
import { NavLink } from "react-router-dom";

import { drawerActions } from "@reducers";
import { useAppDispatch, useAppSelector } from "@store";

import { TopLevelLink, isLinkGroup } from "./Sidenav.types";
import { SubnavigationGroup } from "./subnavigationGroup";
import { getUserSidebarLinks } from "./utils/getUserSidenavLinks";

import styles from "./Sidenav.module.scss";

export function useSideNav() {
  const isOpen = useAppSelector(({ drawer }) => drawer.isOpen);
  const dispatch = useAppDispatch();

  const links = getUserSidebarLinks();

  const toggleDrawer = () => {
    dispatch(drawerActions.setIsOpen(!isOpen));
  };

  const renderTopLevelLink = (link: TopLevelLink) => (
    <NavLink
      key={link.label}
      to={link.path}
      className={({ isActive }) =>
        classNames({
          [styles.sidenavItem]: isOpen,
          [styles.sidenavItemCollapsed]: !isOpen,
          [styles.sidenavItemActive]: isActive,
        })
      }
    >
      {link.icon}
      {isOpen && <span className={styles.sidenavLabel}>{link.label}</span>}
    </NavLink>
  );

  const renderLinks = () => {
    return links.map((link) => {
      if (isLinkGroup(link)) {
        return <SubnavigationGroup key={link.label} group={link} />;
      }

      return renderTopLevelLink(link)
    });
  };

  return { toggleDrawer, isOpen, links: renderLinks() };
}
