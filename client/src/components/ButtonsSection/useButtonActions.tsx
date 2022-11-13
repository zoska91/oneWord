import { createNotification } from 'common/notifications';
import { learnTypes } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from 'state';

export const useButtonsActions = () => {
  const { t } = useTranslation();
  let [currentAnswer] = useGlobalState('currentAnswer');
  const [todaysWord] = useGlobalState('todaysWord');
  const [, setBlockSubmit] = useGlobalState('blockSubmit');
  const [, setBlockShowAnswerButton] = useGlobalState('blockShowAnswerButton');
  const [, setIsAnswerShow] = useGlobalState('isAnswerShow');

  const submit = (learnType: string) => {
    const { text, id } = todaysWord.correctAnswer;
    let correctAnswer =
      learnType === learnTypes.INPUT ? text.toUpperCase() : id;
    let msg = '';

    if (currentAnswer === correctAnswer) {
      msg = t('notifications.correctAnswer');
      createNotification(msg, 'success');
      return;
    }

    msg = t('notifications.dontGiveUp');
    createNotification(msg, 'info');
    setBlockSubmit(true);
  };

  const showAnswer = () => {
    setIsAnswerShow(true);
    const msg = t('notifications.dontGiveUp');
    createNotification(msg, 'info');
    setBlockShowAnswerButton(true);
  };

  return { submit, showAnswer };
};
