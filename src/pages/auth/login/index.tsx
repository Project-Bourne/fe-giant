import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/layout/index";
import Link from "next/link";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setAccessToken, setUserInfo } from "@/redux/reducers/authReducer";

const intialFormData = {
  email: "",
  password: "",
};

function Login() {
  const [, setCookie] = useCookies(["deep-access"]);
  const [formData, setFormData] = useState(intialFormData);
  const [errors, setErrors] = useState(intialFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authService = new AuthService();
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.email === "") {
      setErrors({ ...errors, email: "Email must not be empty!" });
      return;
    }
    if (formData.password === "") {
      setErrors({ ...errors, password: "Password must not be empty!" });
      return;
    }

    setLoading(true);
    authService
      .login(formData)
      .then((res) => {
        setLoading(false);
        if (res?.status) {
          // get user information using returned response 'res' containing userAccessToken
          console.log(res, "yyyyy");
          // localStorage.setItem("deep-access", res?.data?.accessToken);
          setCookie("deep-access", res?.data?.accessToken, { path: "/" });
          dispatch(
            setAccessToken({
              accessToken: res?.data?.accessToken,
              refreshToken: res?.data?.refreshToken,
            }),
          );

          NotificationService.success({
            message: "Login Successful!",
          });
          router.push("/dashboard");
        } else {
          NotificationService.error({
            message: "Login Failed!",
            addedText: res?.message,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("login", err);
        NotificationService.error({
          message: "Login Failed!",
          addedText: err?.message,
        });
      });
    // console.log(formData);
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
