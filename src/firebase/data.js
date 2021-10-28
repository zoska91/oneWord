import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

const addWord = async ({ baseWord, transWord, language }) => {
  try {
    const docRef = await addDoc(collection(db, 'words'), {
      userId: 'Ada',
      baseWord,
      transWord,
      language,
      status: 'new',
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
