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

export function login(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}
export function logout() {
  firebase.auth().signOut();
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export function onAuthStateChange(setUser) {
  return firebase.auth().onAuthStateChanged(async userAuth => {
    const userObj = await generateUserDocument(userAuth);
    console.log({userObj})
    setUser({userObj})
  });
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

