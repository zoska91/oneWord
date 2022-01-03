import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useGlobalState } from 'state';

import { logOut } from 'db/API/auth';
import { getTodayWordAPI } from 'db/API/words';
import { getUserSettingsAPI } from 'db/API/settings';
import { INotification } from 'types/api';
import { learnTypes } from 'constants/constants';

const useUserPage = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const [learnType, setLearnType] = useGlobalState('learnType');
  const [closeLearn, setCloseLearn] = useGlobalState('closeLearn');
  const [todaysWord, setTodaysWordData] = useGlobalState('todaysWord');

  const getTodayWord = async () => {
    const word = await getTodayWordAPI();
    setTodaysWordData(word);
  };

  const getCurrentLearnType = async () => {
    const { data } = await getUserSettingsAPI();

    // const times: { time: number; type: keyof typeof learnTypes }[] =
    // TODO problem with keyof typeof
    const times: { time: number; type: string }[] = data.notifications
      .map((el: INotification) => {
        const [h, min] = el.time.split(':');
        const notificationTime = Number(h) * 60 * 60 + Number(min);
        return { time: notificationTime, type: el.type };
      })
      .reverse();

    for (const noti of times) {
      const currentTime =
        Number(new Date().getHours()) * 60 * 60 +
        Number(new Date().getMinutes());

      if (currentTime > noti.time) {
        //  @ts-ignore
        setLearnType(learnTypes[noti.type]);
        break;
      }
    }
  };
  useEffect(() => {
    const auth = getAuth();
    setLoading(true);

    onAuthStateChanged(auth, user => {
      if (!user) setRedirect(true);

      getCurrentLearnType();
      getTodayWord();
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  return { redirect, handleLogout, closeLearn, todaysWord, learnType, loading };
};

export default useUserPage;
