import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/Button';

interface ButtonsQuizProps {
  actions: {
    submit: Function;
    showAnswer: Function;
  };
  canSabmit: boolean;
}

const ButtonsQuiz: FC<ButtonsQuizProps> = ({ actions, canSabmit }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={() => actions.submit()} dark disabled={!canSabmit}>
        {t('submit')}
      </Button>
      <Button onClick={() => actions.showAnswer()}>{t('showAnswer')}</Button>
    </div>
  );
};

export default ButtonsQuiz;
