import { createNotification } from 'common/notifications';
import { learnTypes } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from 'state';

export const useButtonsActions = () => {
  const { t } = useTranslation();
  const [currentAnswer] = useGlobalState('currentAnswer');
  const [todaysWord] = useGlobalState('todaysWord');
  const [, setBlockSubmit] = useGlobalState('blockSubmit');
  const [, setCloseLearn] = useGlobalState('closeLearn');

  const submit = (learnType: string) => {
    const { text, id } = todaysWord.correntAnswer;
    const correntAnswer = learnType === learnTypes.INPUT ? text : id;
    let msg = '';

    if (currentAnswer === correntAnswer) {
      msg = t('notifications.correctAnswer');
      createNotification(msg, 'success');
      return;
    }

    msg = t('notifications.dontGiveUp');
    createNotification(msg, 'info');
    setBlockSubmit(true);
  };

  const showAnswer = () => {
    const msg = t('notifications.dontGiveUp');
    createNotification(msg, 'info');
    setCloseLearn(true);
  };

  const gootToKnow = () => {
    const msg = t('notifications.goodToKnow');
    createNotification(msg, 'success');
    setCloseLearn(true);
  };

  const iKnow = () => {
    const msg = t('notifications.iKnow');
    createNotification(msg, 'success');
    setCloseLearn(true);
  };

  return { submit, iKnow, showAnswer, gootToKnow };
};
