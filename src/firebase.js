import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYX1sWWUCop46YArc1QMVIGq0efpAogVE",
  authDomain: "xp-newtab.firebaseapp.com",
  projectId: "xp-newtab",
  storageBucket: "xp-newtab.appspot.com",
  messagingSenderId: "934399525438",
  appId: "1:934399525438:web:04569b05c01b849887c76f"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
