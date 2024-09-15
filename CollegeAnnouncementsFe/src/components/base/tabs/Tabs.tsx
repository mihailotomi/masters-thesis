import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { navigateTo } from "@navigation";

import styles from "./Tabs.module.scss";

export interface TabConfig {
  key: string;
  title: string;
  isHidden?: boolean;
  link?: string;
  children?: React.ReactNode;
}

type TabsProps = {
  items: TabConfig[];
};

export const Tabs: React.FC<TabsProps> = ({ items }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string | null>(items[0].key);
  const location = useLocation();

  useEffect(() => {
    const nonHiddenItems = items.filter((item) => !item.isHidden);
    const currentTab = nonHiddenItems.find((tab) => tab.key === activeTab);

    setActiveTab(currentTab?.key || (nonHiddenItems.length && nonHiddenItems[0].key) || null);
  }, [items]);

  useEffect(() => {
    const currentTab = items.find((tab) => location.pathname.includes(tab.link!));
    if (currentTab) {
      setActiveTab(currentTab.key);
    }
  }, [location.pathname, items]);

  return activeTab ? (
    <div className={styles["tabs-wrapper"]}>
      <ul className="nav nav-tabs">
        {items.map(
          (tab) =>
            !tab.isHidden &&
            (tab.link ? (
              // Tab with navigation
              <li key={tab.key} className="pb-1">
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  className={`${styles.tab} ${activeTab === tab.key ? `${styles["tab--active"]}` : ""}`}
                  key={tab.key}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.key);
                    navigateTo(tab.link!);
                  }}
                >
                  {tab.title}
                </a>
              </li>
            ) : (
              // Tab with direct children
              <li key={tab.key} className="pb-1">
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  className={`${styles.tab} ${activeTab === tab.key ? `${styles["tab--active"]}` : ""}`}
                  key={tab.key}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.key);
                  }}
                  role="tab"
                >
                  {tab.title}
                </a>
              </li>
            )),
        )}
      </ul>
      <div className={styles["tabs-content-wrapper"]}>
        {[...items].filter((tab) => tab.key === activeTab)[0]?.children || <Outlet />}
      </div>
    </div>
  ) : null;
};
