export interface AppRoute {
  path: string;
  name: string;
}

export const appRoutes = {
  home: { path: "/", name: "Home" },
  code: { path: "/code", name: "code" },
  login: { path: "/login", name: "login" },
  announcements: {path: "/announcements", name: "announcements"},
  addAnnouncement: {path: "/announcements/add", name: "addAnnouncement"},
  announcementDetails: {path: "/announcements/:id", name: "announcementDetails"},
} as const;
