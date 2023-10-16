// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbKuKBBLRa2fOwhoDpWTlXPu0dYBuBO3w",
  authDomain: "deepsoul-60c85.firebaseapp.com",
  projectId: "deepsoul-60c85",
  storageBucket: "deepsoul-60c85.appspot.com",
  messagingSenderId: "36140021366",
  appId: "1:36140021366:web:5eb5117d98785301e05157",
  measurementId: "G-XJ8YHCT1S9",
};

// Check if Firebase app is already initialized to avoid duplicate initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

const VAPID_KEY =
  "BNo0hLxW1RzYSpuS1GonIcvGRRpCPu0i68KXt-6QDiIfjiP7rhbCyeUAsJzrAdD3KChVZGsAqNl0W-fx3zyOZ74";

export const requestForToken = () => getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        //   console.log('current token for client: ', currentToken);
        return currentToken;
        // Perform any other neccessary action with the token
      }
      return null;
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
