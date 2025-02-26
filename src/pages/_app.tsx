// "use client";
import React, { useEffect } from "react";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { Cookies, useCookies } from "react-cookie";
import { browser } from "process";
import "../polyfills";

function AppWrapper({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const authService = new AuthService();
  const { userAccessToken, isLoggedIn } = useSelector(
    (state: any) => state?.auth,
  );

  const [cookies] = useCookies(["deep-access", "uuid"]);
  // const signupPage = appProps.router.pathname.includes("/auth/signup");
  // const forgotPsdPage = appProps.router.pathname.includes(
  //   "/auth",
  // );

  useEffect(() => {
    console.log("data", { userAccessToken, isLoggedIn });
    if (!isLoggedIn || !userAccessToken || !cookies["deep-access"]) {
      router.replace("/auth/login");
    }
    if (!isLoggedIn && router.pathname.includes("auth/signup")) {
      router.push("/auth/signup");
    }
    if (!isLoggedIn && router.pathname.includes("auth/forgot-password")) {
      router.push("/auth/forgot-password");
    }
  }, [userAccessToken, isLoggedIn, cookies]);

  // const isLayoutNeeded = appProps.router.pathname.includes("/auth");
  const isPageNotIndex =
    appProps.router.pathname.includes("/home") ||
    appProps.router.pathname.includes("/archives") ||
    appProps.router.pathname.includes("/reports") ||
    appProps.router.pathname.includes("/training") ||
    appProps.router.pathname.includes("/settings");

  const LayoutWrapper = isPageNotIndex ? AppLayout : React.Fragment;

  return (
    <div suppressHydrationWarning>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </div>
  );
}

function App({ Component, pageProps, ...appProps }) {
  return (
    <div suppressHydrationWarning>
      <Provider store={store}>
        <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
      </Provider>
    </div>
  );
}

export default App;
