import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/Button';
interface ButtonsShowWordProps {
  actions: {
    iKnow: Function;
    goodToKnow: Function;
  };
}

const ButtonsShowWord: FC<ButtonsShowWordProps> = ({ actions }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={() => actions.iKnow()}>{t('iKnow')}</Button>
      <Button onClick={() => actions.goodToKnow()}>{t('goodToKnow')}</Button>
    </>
  );
};

export default ButtonsShowWord;
