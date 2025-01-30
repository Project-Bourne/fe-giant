import React, { useEffect, useState } from "react";

import { AuthLayout } from "@/layout/index";
import { Input, Button } from "@/components/ui";
import Image from "next/image";
import NotificationService from "@/services/notification.service";
import { useRouter } from "next/router";
import custom_list_on from "../../../../../public/icons/custom-list-on.svg";
import custom_list from "../../../../../public/icons/custom-list.svg";
import { API_ROUTES } from "@/utils/api.constants";

function PasswordReset() {
  const [loading, setLoading] = useState(false);
  // password error-check states
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isMinimum, setIsMinimum] = useState(false);
  // general error handling states
  const [errors, setErrors] = useState({ password: "" });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (isSpecial && isUpperCase && isMinimum) {
      setPasswordStatus(1);
    } else {
      setPasswordStatus(0);
    }
  }, [isSpecial, isUpperCase, isMinimum]);

  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; // regex to test for special characters
  const UPPERCASE_REGEX = /[A-Z]/; // regex to test for uppercase

  // check for special character
  const checkSpecial = (arg) => {
    if (SPECIAL_CHAR_REGEX.test(arg)) {
      setIsSpecial(true);
    } else {
      setIsSpecial(false);
    }
  };
  // check for uppercase
  const checkUpperCase = (arg) => {
    if (UPPERCASE_REGEX.test(arg)) {
      setIsUpperCase(true);
    } else {
      setIsUpperCase(false);
    }
  };
  // check for minimum of 8 characters
  const checkMinimum = (arg) => {
    if (arg.length >= 8) {
      setIsMinimum(true);
    } else {
      setIsMinimum(false);
    }
  };

  const handleChange = async (e: any) => {
    const _data = e.target.value;
    checkSpecial(_data);
    checkUpperCase(_data);
    checkMinimum(_data);
    setPassword(_data);
  };

  const headers = new Headers({
    "Content-Type": "application/json", // Assuming you are sending JSON data
    "deep-token": `${id}`,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password === "") {
      setErrors({ ...errors, password: "Password field must not empty!" });
      return;
    }

    if (passwordStatus === 1) {
      setLoading(true);

      // Create the request body
      const requestBody = JSON.stringify({ password });

      // Define the fetch options
      const options = {
        method: "POST", // Change to the appropriate HTTP method
        headers,
        body: requestBody,
      };
      try {
        await fetch(`${API_ROUTES.FACT_CHECKER}/reset-password`, options)
          .then((res) => {
            setLoading(false);
            NotificationService.success({
              message: "Password Recovery Successful!",
            });
            router.replace("/auth/login");
          })
          .catch((err) => {
            setLoading(false);
            NotificationService.error({
              message: "Password Recovery Failed!",
              addedText: err?.message,
            });
          });
      } catch (error) {
        NotificationService.error({
          message: "Password Recovery Failed!",
          addedText: error?.message,
        });
      }
    }
  };

  return (
    <AuthLayout
      headerText={"Create Password"}
      subText={"Create a password to access your account"}
      isTextCenter={true}
    >
      <form
        className="mt-[3.5rem]  max-w-[370px] mx-auto pb-7"
        onSubmit={handleSubmit}
      >
        {/* password  */}
        <div className="grid gap-1 mb-3">
          <label>Password</label>
          <Input
            placeholder="*********"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          {errors.password && (
            <small className="text-sirp-primary">{errors.password}</small>
          )}
        </div>

        {/* error container  */}
        <div className="rounded-lg md:text-[14px] text-[12px] px-3 py-4 my-7 bg-gray-50">
          <p className="mb-2">
            <span className="text-gray-500 ">Password Strength:</span>{" "}
            <span
              className={`${
                passwordStatus === 0
                  ? "text-sirp-dashbordb3a"
                  : "text-sirp-success"
              } font-[500]`}
            >
              {passwordStatus === 0 ? "Weak" : "Strong"}
            </span>
          </p>
          <ul className="grid">
            <li
              className={`${
                isSpecial ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={isSpecial ? custom_list_on : custom_list}
                alt="list"
                width={15}
                height={15}
              />
              At least one special character or number
            </li>
            <li
              className={`${
                isUpperCase ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={isUpperCase ? custom_list_on : custom_list}
                alt="list"
                width={15}
                height={15}
              />
              Atleast one Uppercase
            </li>
            <li
              className={`${
                isMinimum ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={isMinimum ? custom_list_on : custom_list}
                alt="list"
                width={15}
                height={15}
              />
              Minimum of 8 characters
            </li>
          </ul>
        </div>

        {/* submit button  */}
        <Button
          value="Reset Password"
          type="submit"
          classNameStyle="text-white p-3"
          background="bg-sirp-primary"
          loading={loading}
          size="xl"
        />
      </form>
    </AuthLayout>
  );
}

export default PasswordReset;
