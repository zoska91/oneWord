import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const singInByGoogle = async () => {
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    return { token, user };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const loginByEmail = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    const user = resp.user;
    return user;
  } catch (e) {
    // @ts-ignore
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
  const user = auth.currentUser;
  const userId = user?.uid;

  return { userId, user };
};
