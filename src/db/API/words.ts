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
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'db/config';
import { getCurrentUser } from './auth';
import { IInputsAddWord } from 'components/ModalForm/formTypes';
import { ITodayWord } from 'types/api';

// get options to quiz view
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

export const checkIsBreakDay = async () => {
  const { data } = await getUserSettingsAPI();
  const breakDay = data.breakDay;
  const todayDate = new Date();
  const todayDay = todayDate.getDay();
  return +breakDay === +todayDay;
};

// main function to initial get word
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

      let todayDate = new Date().toDateString();
      //  @ts-ignore
      const wordDate = word.updatedDate.toDate().toDateString();

      if (todayDate !== wordDate) {
        //  @ts-ignore
        await changeStatusAPI(word?.wordId, 2);
        getTodayWordAPI();
      }

      const shuffleWords = await getShuffleWordsAPI();
      //  @ts-ignore
      const correctAnswer = { id: word.wordId, text: word.transWord };

      return { ...word, randomWords: shuffleWords, correctAnswer };
    }
  }
};

// get word when its first time in current day
export const getRandomWordAPI = async () => {
  const { selectLanguage } = await getUserSettingsAPI();
  const { userId } = getCurrentUser();

  const q = query(
    collection(db, 'words'),
    where('addLang', '==', selectLanguage),
    where('userId', '==', userId),
    where('status', '==', '0')
  );

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  // TODO ts - problem with types from firestore
  let words: any[] = [];

  querySnapshot.forEach(doc => {
    console.log(doc);
    words = [...words, { ...doc.data(), wordId: doc.id }];
  });

  if (querySnapshot.size === 0) {
    createNotification(
      'You dont have words yet or you learned all of them. Add some new one!',
      'info'
    );
    return;
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  const todayWord = words[randomIndex];

  // change status to 1 - today word
  console.log(words, todayWord);
  await changeStatusAPI(todayWord.wordId, 1);

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
      createdDate: new Date(),
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
  const docRef = doc(db, 'words', id);

  // Set the "capital" field of the city 'DC'
  try {
    const resp = await updateDoc(docRef, {
      ...dataToUpdate,
      updatedDate: new Date(),
    });
    console.log('dodano');
    console.log(resp);
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
      updatedDate: new Date(),
      status,
    });
  } catch (e) {
    createNotification('Something went wrong', 'error');
  }
};

export const getAllWordsOfCurrentUser = async () => {
  const { userId } = getCurrentUser();
  const { selectLanguage } = await getUserSettingsAPI();

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
  return words;
};

export const deleteWordAPI = async (id: string) => {
  console.log(id);
  await deleteDoc(doc(db, 'words', id));
};

//status
// 0 - new (to learn)
// 1 - today
// 2 - done
