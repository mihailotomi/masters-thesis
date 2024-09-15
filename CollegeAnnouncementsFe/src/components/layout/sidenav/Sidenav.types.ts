import { ReactNode } from "react";

export type BaseLink = {
  label: string;
  path: string;
};

export type SideNavGroup = {
  kind: "group";
  label: string;
  icon: ReactNode;
  sublinks: BaseLink[];
};

export type TopLevelLink = BaseLink & { icon: ReactNode; kind: "link" };

export type SideNavLink = TopLevelLink | SideNavGroup;

export function isLinkGroup(link: SideNavLink): link is SideNavGroup {
  return link.kind === "group";
}
