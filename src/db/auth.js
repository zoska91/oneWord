import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const provider = new GoogleAuthProvider();

export const singInByGoogle = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { token, user };
    })
    .catch(error => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      throw error;
    });
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

export const logOut = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      return 'success';
    })
    .catch(error => {
      throw error;
    });
};

export const getCurrentUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      // const uid = user.uid;
      return user;
    } else {
      return null;
    }
  });
};
