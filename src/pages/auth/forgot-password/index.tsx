import React, { useState } from "react";

import { AuthLayout } from "@/layout/index";
import { Input, Button } from "@/components/ui";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // general error handling states
  const [errors, setErrors] = useState({ email: "" });
  const authService = new AuthService();

  const handleSubmit = (e: any) => {
    setLoading(true);
    authService
      .forgotPassword(email)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        NotificationService.error({
          message: "Password Recovery Failed!",
          addedText: err?.message,
        });
      });
  };

  // const email = 'example@example.com'; // Replace with the actual email you want to send

  // Define the request headers
  const headers = new Headers({
    "Content-Type": "application/json", // Assuming you are sending JSON data
  });

  // Create the request body
  const requestBody = JSON.stringify({ email });

  // Define the fetch options
  const options = {
    method: "POST", // Change to the appropriate HTTP method
    headers,
    body: requestBody,
  };

  // Make the fetch request
  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    if (email === "") {
      setErrors({ ...errors, email: "Email field must not empty!" });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "http://192.81.213.226:81/80/forgot-password",
        options,
      );
      setLoading(false);

      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
        NotificationService.error({
          message: "HTTP Error!",
          addedText: response?.status,
        });
      }

      NotificationService.success({
        message: "Check your mail!",
        addedText:
          "A password recovery link has been sent to your email address",
      });
    } catch (error) {
      // Handle any errors that occurred during the fetch
      setLoading(false);
      NotificationService.error({
        message: "Fetch Error!",
        addedText: error?.message,
      });
    }
  };

  return (
    <AuthLayout
      headerText={"Create Password"}
      subText={"Kindly provide your email address in the field below"}
      isTextCenter={true}
    >
      <form
        className="mt-[3.5rem]  max-w-[370px] mx-auto pb-7"
        // onSubmit={handleSubmit}
        onSubmit={handleForgotPassword}
      >
        {/* email  */}
        <div className="mb-7 grid gap-1">
          <label>Email</label>
          <Input
            placeholder="debra.holt@example.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <small className="text-sirp-primary">{errors.email}</small>
          )}
        </div>

        {/* submit button  */}
        <Button
          value="Submit"
          type="submit"
          classNameStyle="text-white p-3 mt-7"
          background="bg-sirp-primary"
          loading={loading}
          size="xl"
        />
      </form>
    </AuthLayout>
  );
}

export default PasswordRecovery;
