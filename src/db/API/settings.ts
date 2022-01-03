import { defaultSettingsData } from './../../constants/constants';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'db/config';
import { getCurrentUser } from './auth';
import { IInputsPreferences } from 'components/ModalForm/formTypes';
import { createNotification } from 'common/notifications';

export const createDefaultSettingsAPI = async (userId: string) => {
  try {
    const docRef = await addDoc(collection(db, 'settings'), {
      ...defaultSettingsData,
      userId,
      createdDate: Timestamp.fromDate(new Date()),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error(e);
  }
};

export const addDefaultSettingsIfNotExistsAPI = async (userId: string) => {
  const q = query(collection(db, 'settings'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 0) createDefaultSettingsAPI(userId);
};

export const getUserSettingsAPI = async () => {
  const { userId } = getCurrentUser();
  const q = query(collection(db, 'settings'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  let data: any = [];

  try {
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      data = [...data, { ...doc.data(), id: doc.id }];
    });
    return { data: data[0], selectLanguage: data[0].selectLanguage };
  } catch (e) {
    createNotification('Something went wrong. Try again!', 'error');
    return { data: defaultSettingsData, selectLanguage: 'en' };
  }
};

export const updateUserSettings = async (
  id: string,
  dataToUpdate: IInputsPreferences
) => {
  const docRef = doc(db, 'settings', id);

  // Set the "capital" field of the city 'DC'
  try {
    await updateDoc(docRef, {
      ...dataToUpdate,
      updatedDate: serverTimestamp(),
    });
    createNotification('Setting updated!', 'success');
  } catch (e) {
    console.log(e);
    createNotification('Something went wrong. Try again!', 'error');
  }
};
