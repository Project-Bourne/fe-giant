"use client";
import React, { useEffect, useState } from "react";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducers/authReducer";

function AppWrapper({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const authService = new AuthService();
  const { accessToken, isLoggedIn } = useSelector((state: any) => state?.auth);
  const signupPage = appProps.router.pathname.includes("/auth/signup");
  const forgotPsdPage = appProps.router.pathname.includes(
    "/auth/forgot-password",
  );

  // useEffect(() => {
  //   console.log(accessToken, "from _app null");
  //   if (accessToken) {
  //     console.log(accessToken, "from _app not null");
  //     authService
  //       .getUserViaAccessToken(accessToken)
  //       .then((res) => {
  //         if (res?.status) {
  //           console.log("user data via login", res);
  //           dispatch(setUserInfo(res?.data));
  //         }
  //       })
  //       .catch((err) => {
  //         NotificationService.error({
  //           message: "Error",
  //           addedText: "Could not fetch user data",
  //         });
  //       });
  //   }
  // }, [accessToken]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
    if (!isLoggedIn && signupPage) {
      router.push("/auth/signup");
    }
    if (!isLoggedIn && forgotPsdPage) {
      router.push("/auth/forgot-password");
    }
  }, [router, isLoggedIn]);

  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

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
