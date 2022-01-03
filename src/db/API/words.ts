import { createNotification } from 'common/notifications';
import { getUserSettingsAPI } from './settings';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  Timestamp,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'db/config';
import { getCurrentUser } from './auth';
import { IInputsAddWord } from 'components/ModalForm/formTypes';
import { ITodayWord } from 'types/api';

export const getShuffleWordsAPI = async () => {
  const { selectLanguage } = await getUserSettingsAPI();
  const { userId } = getCurrentUser();
  const q = query(
    collection(db, 'words'),
    where('addLang', '==', selectLanguage),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(q);

  // TODO ts - problem with types from firestore
  let words: any[] = [];

  querySnapshot.forEach(doc => {
    words = [...words, { ...doc.data(), wordId: doc.id }];
  });

  const shuffleWords: any = [];

  while (shuffleWords.length < 3) {
    const randomIndex = Math.floor(Math.random() * words.length);
    if (!shuffleWords.includes(words[randomIndex]))
      shuffleWords.push(words[randomIndex]);
  }

  return shuffleWords.map((el: ITodayWord) => ({
    id: el.wordId,
    text: el.transWord,
  }));
};

export const getTodayWordAPI = async () => {
  const { userId } = getCurrentUser();

  // get today word (if exist)
  if (userId) {
    const q = query(
      collection(db, 'words'),
      where('userId', '==', userId),
      where('status', '==', 1)
    );

    const querySnapshot = await getDocs(q);

    // check if today word exist
    if (querySnapshot.size === 0) {
      const word = await getRandomWordAPI();
      return word;
    } else {
      let word = {};
      querySnapshot.forEach(doc => {
        word = { ...doc.data(), wordId: doc.id };
      });

      const shuffleWords = await getShuffleWordsAPI();
      //  @ts-ignore
      const correctAnswer = { id: word.wordId, text: word.transWord };

      return { ...word, randomWords: shuffleWords, correctAnswer };
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

  // change status to 1 - today word
  changeStatusAPI(todayWord.wordId, 1);

  const shuffleWords = await getShuffleWordsAPI();
  const correctAnswer = { id: todayWord.wordId, text: todayWord.transWord };

  return { ...todayWord, shuffleWords, correctAnswer };
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

export const changeStatusAPI = async (wordId: string, status: number) => {
  const docRef = doc(db, 'words', wordId);
  const docSnap = await getDoc(docRef);

  try {
    await updateDoc(docRef, {
      ...docSnap.data(),
      updatedDate: serverTimestamp(),
      status,
    });
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
// 2 - done
