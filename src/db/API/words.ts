import { createNotification } from 'common/notifications';
import { getUserSettingsAPI } from './settings';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'db/config';
import { getCurrentUser } from './auth';
import { IInputsAddWord } from 'components/ModalForm/formTypes';

export const getTodayWordAPI = async () => {
  const { userId } = getCurrentUser();
  if (userId) {
    const q = query(
      collection(db, 'words'),
      where('userId', '==', userId),
      where('status', '==', 1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      const word = await getRandomWordAPI();
      return word;
    } else {
      let word = {};
      querySnapshot.forEach(doc => {
        word = { ...doc.data(), wordId: doc.id };
      });
      return word;
    }
  }
};

export const getRandomWordAPI = async () => {
  const { selectLanguage } = await getUserSettingsAPI();
  const { userId } = getCurrentUser();
  const q = query(
    collection(db, 'words'),
    where('addLang', '==', selectLanguage),
    where('userId', '==', userId),
    where('status', '==', 0)
  );

  const querySnapshot = await getDocs(q);

  // TODO ts - problem with types from firestore
  let words: any[] = [];

  querySnapshot.forEach(doc => {
    words = [...words, { ...doc.data(), wordId: doc.id }];
  });

  const randomIndex = Math.floor(Math.random() * words.length);
  const todayWord = words[randomIndex];

  updateWordAPI(todayWord.wordId, { ...todayWord, status: 1 });
  return todayWord;
};

export const addWordAPI = async (data: IInputsAddWord) => {
  const { userId } = getCurrentUser();

  try {
    const docRef = await addDoc(collection(db, 'words'), {
      ...data,
      userId,
      status: 0,
      createdDate: Timestamp.fromDate(new Date()),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error(e);
  }
};

export const updateWordAPI = async (
  id: string,
  dataToUpdate: IInputsAddWord
) => {
  const washingtonRef = doc(db, 'words', id);

  // Set the "capital" field of the city 'DC'
  try {
    await updateDoc(washingtonRef, {
      ...dataToUpdate,
      updatedDate: serverTimestamp(),
    });
    console.log('dodano');
  } catch (e) {
    createNotification('Something went wrong', 'error');
  }
};

export const deleteWordAPI = async (id: string) => {
  await deleteDoc(doc(db, 'word', id));
};

//status
// 0 - new (to learn)
// 1 - today
// 2 - known
// 3 -
