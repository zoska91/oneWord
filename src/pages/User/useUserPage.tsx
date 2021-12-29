import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useGlobalState } from 'state';

import { logOut } from 'db/API/auth';
import { getTodayWordAPI } from 'db/API/words';

const useUserPage = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const [learnType] = useGlobalState('learnType');
  const [todaysWord] = useGlobalState('todaysWord');
  const [closeLearn] = useGlobalState('closeLearn');

  useEffect(() => {
    const auth = getAuth();
    setLoading(true);

    const getTodayWord = async () => {
      const word = await getTodayWordAPI();
      console.log(word);
    };

    onAuthStateChanged(auth, user => {
      if (!user) setRedirect(true);

      getTodayWord();
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  if (loading) return <div>loading...</div>;

  return { redirect, handleLogout, closeLearn, todaysWord, learnType };
};

export default useUserPage;
