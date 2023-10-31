// "use client";
import React, { useEffect } from "react";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.service";

function AppWrapper({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const authService = new AuthService();
  const { userAccessToken, isLoggedIn } = useSelector(
    (state: any) => state?.auth,
  );
  // const signupPage = appProps.router.pathname.includes("/auth/signup");
  // const forgotPsdPage = appProps.router.pathname.includes(
  //   "/auth/forgot-password",
  // );

  // useEffect(() => {
  // console.log('data', { accessToken, isLoggedIn });
  // if (!isLoggedIn || !userAccessToken) {
  //   router.push("/auth/login");
  // }
  // if (!isLoggedIn && signupPage) {
  //   router.push("/auth/signup");
  // }
  // if (!isLoggedIn && forgotPsdPage) {
  //   router.push("/auth/forgot-password");
  // }
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
