import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { HistoryRouter, appRoutes, navigator } from "@navigation";
import { useThemeSubscription } from "@hooks";
import { AppLayout, AppLoader } from "@components";
import { AuthGuardProvider } from "@providers";
import LoginPage from "src/features/login/LoginPage";
import { CodeCallbackPage } from "src/features/login/CodeCallbackPage";

const AnnouncementListPage = React.lazy(() =>
  import("@feat/announcements").then((module) => ({ default: module.AnnouncementListPage })),
);

const CreateAnnouncementPage = React.lazy(() =>
  import("@feat/announcements").then((module) => ({ default: module.CreateAnnouncementPage })),
);

// ------------- REPORTS ROUTES END ------------- //

export const RootRouter: React.FC = () => {
  useThemeSubscription();
  return (
    <HistoryRouter history={navigator}>
      <Suspense
        fallback={
          <div>
            <AppLoader />
          </div>
        }
      >
        <Routes>
          <Route path={appRoutes.login.path} element={<LoginPage />} />
          <Route path={appRoutes.code.path} element={<CodeCallbackPage />} />

          <Route
            path={appRoutes.home.path}
            element={
              <AuthGuardProvider>
                <Suspense
                  fallback={
                    <div>
                      <AppLoader />
                    </div>
                  }
                >
                  <AppLayout />
                </Suspense>
              </AuthGuardProvider>
            }
          >
            <Route
              path={appRoutes.announcements.path}
              element={
                  <AnnouncementListPage />
              }
            />
            <Route
              path={appRoutes.addAnnouncement.path}
              element={
                  <CreateAnnouncementPage />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};
