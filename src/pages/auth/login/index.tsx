import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/layout/index";
import Link from "next/link";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setAccessToken, setUserInfo } from "@/redux/reducers/authReducer";
import { messaging, requestForToken } from "@/utils/firebase";
import {
  setAnalyzedTotal,
  setCollabTotal,
  setDeepChatTotal,
  setFactsTotal,
  setInterrogatedTotal,
  setSummarizedTotal,
  setTranslatedTotal,
} from "@/redux/reducers/documentReducer";

const intialFormData = {
  email: "",
  password: "",
  deviceToken: null,
};

function Login() {
  const [, setCookie] = useCookies(["deep-access"]);
  const [formData, setFormData] = useState(intialFormData);
  const [errors, setErrors] = useState(intialFormData);
  const [loading, setLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState<any>(null);
  const router = useRouter();
  const authService = new AuthService();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (formData.email === "") {
      setErrors({ ...errors, email: "Email must not be empty!" });
      return;
    }
    if (formData.password === "") {
      setErrors({ ...errors, password: "Password must not be empty!" });
      return;
    }

    setLoading(true);
    try {
      authService
        .login(formData)
        .then((res) => {
          if (res?.status) {
            setCookie("deep-access", res?.data?.accessToken, { path: "/" });
            dispatch(
              setAccessToken({
                accessToken: res?.data?.accessToken,
                refreshToken: res?.data?.refreshToken,
              }),
            );
            getUserInfo(res?.data?.accessToken);
            getTotalFactsDoc(res?.data?.accessToken);
            getTotalSummarisedDoc(res?.data?.accessToken);
            getTotalTranslatedDoc(res?.data?.accessToken);
            getTotalAnalyzedDoc(res?.data?.accessToken);
            getTotalChats(res?.data?.accessToken);
            getTotalInterrogatedDoc(res?.data?.accessToken);

            NotificationService.success({
              message: "Login Successful!",
            });
            router.replace("/");
          } else {
            NotificationService.error({
              message: "Login Failed!",
              addedText: res?.message,
              delay: 7000,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          NotificationService.error({
            message: "Login Failed!",
            addedText: err?.message,
            delay: 7000,
          });

          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      NotificationService.error({
        message: "Login Failed!",
        addedText: err?.message,
        delay: 7000,
      });
    }
  };

  const getUserInfo = async (token) => {
    setLoading(true);
    try {
      const response: any = await fetch(
        "http://192.81.213.226:81/80/token/user",
        {
          method: "GET",
          headers: {
            "deep-token": token,
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(false);
      if (response?.ok) {
        const data = await response.json();
        dispatch(setUserInfo(data?.data));
        getTotalCollabDoc(data?.data?.uuid, token);
      } else {
        const data = await response.json();
        NotificationService.error({
          message: "Error: failed to fetch user data",
          addedText: data?.message,
          position: "top-center",
        });
      }
    } catch (err) {
      setLoading(false);
      NotificationService.error({
        message: "Error: failed to fetch user data ",
        addedText: err?.message,
        position: "top-center",
      });
    }
  };

  const BASE_URL = "http://192.81.213.226:81";

  const apiRequest = async (url, token) => {
    if (token) {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "deep-token": token,
          "Content-Type": "application/json",
        },
      });

      return res;
    }
  };

  const getTotalFactsDoc = async (token) => {
    try {
      const response: any = await apiRequest(`${BASE_URL}/84/fact/user`, token);
      if (response?.status) {
        const data = await response.json();
        dispatch(setFactsTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalAnalyzedDoc = async (token) => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/81/analysis/user`,
        token,
      );
      if (response?.status) {
        const data = await response.json();
        dispatch(setAnalyzedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalSummarisedDoc = async (token) => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/82/summary/user`,
        token,
      );
      if (response?.status) {
        const data = await response.json();
        dispatch(setSummarizedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalCollabDoc = async (id, token) => {
    try {
      const response: any = await apiRequest(
        `http://192.81.213.226:86/api/v1/doc/docs/${id}`,
        token,
      );
      if (response?.ok) {
        const data = await response.json();
        dispatch(setCollabTotal(data?.data?.totalDocuments));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalInterrogatedDoc = async (token) => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/87/interrogation`,
        token,
      );
      if (response?.status) {
        const data = await response.json();
        dispatch(setInterrogatedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalChats = async (token) => {
    try {
      const response: any = await apiRequest(`${BASE_URL}/85/deepchat`, token);
      if (response?.status) {
        const data = await response.json();
        dispatch(setDeepChatTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  const getTotalTranslatedDoc = async (token) => {
    try {
      const response: any = await apiRequest(
        `${BASE_URL}/83/translation/user`,
        token,
      );
      if (response?.status) {
        const data = await response.json();
        dispatch(setTranslatedTotal(data?.data?.totalItems));
      }
    } catch (err) {
      // throw new Error(err);
    }
  };

  return (
    <>
      <AuthLayout
        headerText={"Log In"}
        subText={"Please fill your detail to access your account"}
        isTextCenter={false}
      >
        <form className="mt-[3rem]" onSubmit={handleSubmit}>
          {/* email  */}
          <div className="mb-3 grid gap-1">
            <label>Email</label>
            <Input
              placeholder="debra.holt@example.com"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <small className="text-[#B22735]">{errors.email}</small>
            )}
          </div>

          {/* password  */}
          <div className="grid gap-1 mb-3">
            <label>Password</label>
            <Input
              placeholder="*********"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <small className="text-[#B22735]">{errors.password}</small>
            )}
          </div>

          {/* forgot password  */}
          <div className="w-full mb-[50px] flex flex-wrap justify-between">
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="rememberMe" />
              <label className="font-light text-[13px]" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div>
              <Link
                href="/auth/forgot-password"
                className="font-light text-sirp-primary text-[15px] cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {/* submit button  */}
          <Button
            value="Sign in"
            type="submit"
            loading={loading}
            classNameStyle="text-white p-3"
            background="bg-sirp-primary"
            size="xl"
          />
          {/* don't have account  */}
          <p className="text-center font-light mt-5">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className=" text-sirp-primary cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
}

export default Login;
