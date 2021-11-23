import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const provider = new GoogleAuthProvider();

export const singInByGoogle = async () => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return { token, user };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const loginByEmail = async (email, password) => {
  const auth = getAuth();

  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    const user = resp.user;
    return user;
  } catch (e) {
    return { code: e.code, message: e.message };
  }
};

export const logOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    return 'success';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    console.log(user);
  });
};
