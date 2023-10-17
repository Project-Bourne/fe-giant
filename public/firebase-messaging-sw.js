// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Scripts for firebase and firebase messaging

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBbKuKBBLRa2fOwhoDpWTlXPu0dYBuBO3w",
  authDomain: "deepsoul-60c85.firebaseapp.com",
  projectId: "deepsoul-60c85",
  storageBucket: "deepsoul-60c85.appspot.com",
  messagingSenderId: "36140021366",
  appId: "1:36140021366:web:5eb5117d98785301e05157",
  measurementId: "G-XJ8YHCT1S9",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    // console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
      body: payload?.notification?.body,
    };

    /* eslint-disable-next-line no-restricted-globals */
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

// Optionally, remove the unused getToken import if not needed
// import { getToken } from "firebase/messaging";

// // Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
//  // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// })
