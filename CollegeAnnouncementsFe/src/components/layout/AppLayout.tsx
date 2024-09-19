import { Outlet } from "react-router-dom";


import { Navbar } from "./navbar/Navbar";
import { SideNav } from "./sidenav/Sidenav";
import { AppLoader } from "../base";

import styles from "./Layout.module.scss";

export function AppLayout() {
  // const currentUser = useAppSelector(({ auth }) => auth.currentUser);
  // const dispatch = useAppDispatch();
  // const [getMe, { isFetching: getMeLoading, error: getMeError }] = useLazyGetCurrentUserQuery();

  // useEffect(() => {
  //   if (currentUser && currentUser.token) {
  //     getMe({ id: currentUser.id, token: currentUser.token })
  //   } else {
  //     dispatch(authActions.setCurrentUser(null));
  //     navigateTo(appRoutes.login.path);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (getMeError) {
  //     dispatch(authActions.setCurrentUser(null));
  //     navigateTo(appRoutes.login.path);
  //   }
  // }, [getMeError]);

  return false ? (
    <AppLoader />
  ) : (
    <>
      <Navbar />
      <div className={styles.layoutContainer}>
        <SideNav />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
