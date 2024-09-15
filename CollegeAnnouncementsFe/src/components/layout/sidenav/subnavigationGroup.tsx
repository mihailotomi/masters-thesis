import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";

import { useAppSelector } from "@store";

import { BaseLink, SideNavGroup } from "./Sidenav.types";

import styles from "./Sidenav.module.scss";

export interface SubnavigationGroupProps {
  group: SideNavGroup;
}

export function SubnavigationGroup({ group }: SubnavigationGroupProps) {
  const location = useLocation();
  const isNavOpen = useAppSelector(({ drawer }) => drawer.isOpen);

  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const isAnyLinkActive = group.sublinks.some(({ path }) => location.pathname === path);

  const submenuRef = useRef<HTMLDivElement>(null);

  const toggleGroupOpen = () => {
    setIsGroupOpen(() => !isGroupOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        !isNavOpen &&
        isGroupOpen
      ) {
        toggleGroupOpen();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [submenuRef, isNavOpen, isGroupOpen]);

  const renderSublink = (link: BaseLink) => (
    <NavLink
      key={link.label}
      to={link.path}
      className={({ isActive }) =>
        classNames({
          [styles.subNavigationItemActive]: isActive,
          [styles.subNavigationItem]: true,
        })
      }
    >
      {link.label}
    </NavLink>
  );

  const renderSublinks = () => {
    return isGroupOpen ? (
      <div
        className={classNames({
          [styles.subNavigation]: true,
          [styles.subNavigationCollapsed]: !isNavOpen,
        })}
      >
        {group.sublinks.map((sub) => renderSublink(sub))}
      </div>
    ) : (
      ""
    );
  };

  return (
    <div ref={submenuRef}>
      <button
        type="button"
        className={classNames(
          [isNavOpen ? styles.sidenavItem : styles.sidenavItemCollapsed],
          "button-span",
          { [styles.sidenavItemActive]: isAnyLinkActive },
        )}
        onClick={() => toggleGroupOpen()}
      >
        {group.icon}
        {isNavOpen && <span className={styles.sidenavLabel}>{group.label}</span>}
      </button>
      {renderSublinks()}
    </div>
  );
}
