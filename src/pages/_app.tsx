// "use client";
import React, { useEffect } from "react";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";

function AppWrapper({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const authService = new AuthService();
  const { userAccessToken, isLoggedIn } = useSelector(
    (state: any) => state?.auth,
  );

  const { uuid } = useSelector((state: any) => state?.auth?.userInfo);
  const cookies = new Cookies();

  if (typeof window !== "undefined") {
    cookies.set("uuid", uuid);
    localStorage.setItem("uuid", uuid);
  }

  // const userAccessToken = authService.getUserAccessToken();

  // const isLoggedIn = authService.isLoggedIn();

  // const loginPage = appProps.router.pathname.includes("/auth/login");

  // const signupPage = appProps.router.pathname.includes("/auth/signup");
  // const forgotPsdPage = appProps.router.pathname.includes(
  //   "/auth",
  // );

  // useEffect(() => {
  //   if (!isLoggedIn || !userAccessToken && !appProps.router.pathname.includes("/auth")) {
  //     router.push("/auth/login");
  //   }
  // }, [userAccessToken, isLoggedIn]);

  // const isLayoutNeeded = appProps.router.pathname.includes("/auth");
  const isPageNotIndex =
    appProps.router.pathname.includes("/home") ||
    appProps.router.pathname.includes("/archives") ||
    appProps.router.pathname.includes("/reports") ||
    appProps.router.pathname.includes("/training") ||
    appProps.router.pathname.includes("/settings");

  const LayoutWrapper = isPageNotIndex ? AppLayout : React.Fragment;

  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}

function App({ Component, pageProps, ...appProps }) {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
    </Provider>
  );
}

export default App;
