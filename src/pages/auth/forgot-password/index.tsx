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
    e.preventDefault();
    if (email === "") {
      setErrors({ ...errors, email: "Email field must not empty!" });
      return;
    }

    setLoading(true);
    authService
      .forgotPassword(email)
      .then((res) => {
        setLoading(false);
        NotificationService.success({
          message: "Check your mail!",
          addedText:
            "A password recovery link has been sent to your email address",
        });
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        NotificationService.error({
          message: "Password Recovery Failed!",
          addedText: err?.message,
        });
      });
  };

  return (
    <AuthLayout
      headerText={"Create Password"}
      subText={"Kindly provide your email address in the field below"}
      isTextCenter={true}
    >
      <form
        className="mt-[3.5rem]  max-w-[370px] mx-auto pb-7"
        onSubmit={handleSubmit}
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
