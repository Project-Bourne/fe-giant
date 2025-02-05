import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AuthLayout } from "@/layout/index";
import { Input, Button, Dropdown, DropdownWithFlag } from "@/components/ui";
// import { UserRoles } from "@/utils/constants";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/reducers/authReducer";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: ["Nigeria"],
  password: "",
  roleUuid: "6",
};

function SignUp() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const authService = new AuthService();
  const router = useRouter();
  const dispatch = useDispatch();

  // get user roles
  // useEffect(() => {
  //   authService
  //     .getRoles()
  //     .then((res) => {
  //       if (res?.status) {
  //         setUserRoles(res?.data);
  //         setFormData({ ...formData, roleUuid: res?.data[6]?.uuid }); // default analyst role
  //       }
  //     })
  //     .catch((err) => {});
  // }, []);

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSetCountry = (data: any) => {
    const res = [];
    res.push(data);
    setFormData({ ...formData, country: res });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.firstName === "") {
      setErrors({ ...errors, first_name: "First name must not be empty!" });
      return;
    }
    if (formData.lastName === "") {
      setErrors({ ...errors, last_name: "Last name must not be empty!" });
      return;
    }
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
      .signUp(formData)
      .then((res: any) => {
        setLoading(false);

        if (res?.status === true) {
          dispatch(setUserInfo(res?.data));
          NotificationService.success({
            message: "Registration Successful!",
          });
          router.replace("/auth/login");
        } else {
          NotificationService.error({
            message: "Registration Failed!",
            addedText: res?.message,
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        NotificationService.error({
          message: "Registration Failed!",
          addedText: err?.message,
          position: "top-center",
        });
        setLoading(false);
      });
  };

  return (
    <AuthLayout
      headerText={"Create Account"}
      subText={
        "Please enter your work email and create a password to get started"
      }
      isTextCenter={false}
    >
      <form className="mt-[1.5rem] pb-7" onSubmit={handleSubmit}>
        {/* first name  */}
        <div className="mb-3 grid gap-1">
          <label>First Name</label>
          <Input
            placeholder="first name"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.first_name && (
            <small className="text-sirp-primary">{errors.first_name}</small>
          )}
        </div>
        {/* last name  */}
        <div className="mb-3 grid gap-1">
          <label>Last Name</label>
          <Input
            placeholder="last name"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.last_name && (
            <small className="text-sirp-primary">{errors.last_name}</small>
          )}
        </div>

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
            <small className="text-sirp-primary">{errors.email}</small>
          )}
        </div>

        {/* user role  
        <div className="mb-3 grid gap-1">
          <label>User role</label>
          <Dropdown
            data={userRoles}
            onChange={(e) =>
              setFormData({ ...formData, roleUuid: e.target.value })
            }
          />
        </div> */}

        {/* country  */}
        <div className="mb-3 grid gap-1">
          <label>Country</label>
          <DropdownWithFlag selectItem={handleSetCountry} />
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
            <small className="text-sirp-primary">{errors.password}</small>
          )}
        </div>

        {/* forgot password  */}
        <div className="w-full mb-[30px]">
          <div className="flex gap-1">
            <input type="checkbox" id="rememberMe" />
            <label className="font-light text-[13px]" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>

        {/* submit button  */}
        <Button
          value="Create account"
          type="submit"
          loading={loading}
          classNameStyle="text-white p-3"
          background="bg-sirp-primary"
          size="xl"
          onClick={handleSubmit}
        />
        {/* don't have account  */}
        <p className="text-center font-light mt-3">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className=" text-sirp-primary cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUp;
