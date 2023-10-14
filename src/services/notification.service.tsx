import CustomToast, { ToastModel } from "@/components/ui/CustomToast";
import React from "react";
import ReactDOM from "react-dom";

interface Props {
  message: any;
  addedText?: any;
  position?:
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  delay?: number;
}

class NotificationService {
  static showCustomToast({
    type,
    message,
    addedText,
    position,
    delay,
  }: ToastModel) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const toastDelay = delay || 3000;

    ReactDOM.render(
      <CustomToast
        type={type}
        message={message}
        addedText={addedText}
        position={position}
      />,
      container,
    );

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }, toastDelay);
  }

  static success({ message, addedText, position, delay }: Props) {
    this.showCustomToast({
      type: "success",
      message,
      addedText,
      position,
      delay,
    });
  }

  static error({ message, addedText, position, delay }: Props) {
    this.showCustomToast({
      type: "error",
      message,
      addedText,
      position,
      delay,
    });
  }

  static warn({ message, addedText, position, delay }: Props) {
    this.showCustomToast({
      type: "warn",
      message,
      addedText,
      position,
      delay,
    });
  }

  // static info(message: any, addedText?: any) {
  //       this.showCustomToast({
  // type: 'warn',
  // message,
  // addedText,
  // position
  // })
  // }
}

export default NotificationService;
