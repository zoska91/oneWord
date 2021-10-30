import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/Button';

interface ButtonsInputProps {
  actions: {
    submit: Function;
    showAnswer: Function;
    iKnow: Function;
  };
  canSabmit: boolean;
}

const ButtonsInput: FC<ButtonsInputProps> = ({ actions, canSabmit }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={() => actions.iKnow()}>{t('iKnow')}</Button>
      <Button onClick={() => actions.submit()} dark disabled={canSabmit}>
        {t('submit')}
      </Button>
      <Button onClick={() => actions.showAnswer()}>{t('showAnswer')}</Button>
    </>
  );
};

export default ButtonsInput;
