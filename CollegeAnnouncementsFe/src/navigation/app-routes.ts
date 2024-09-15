export interface AppRoute {
  path: string;
  name: string;
}

export const appRoutes = {
  home: { path: "/", name: "Home" },
  code: { path: "/code", name: "code" },
  login: { path: "/login", name: "login" },
} as const;
