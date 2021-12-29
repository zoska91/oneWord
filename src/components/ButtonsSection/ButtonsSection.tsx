import { FC } from 'react';

import { learnTypes } from 'constants/constants';
import { useGlobalState } from 'state';
import { useButtonsActions } from './useButtonActions';
import { useTranslation } from 'react-i18next';
import Button from 'components/atoms/Button';

import { Wrapper } from './ButtonSection.css';

interface ButtonSectionProps {}

const ButtonsSection: FC<ButtonSectionProps> = () => {
  const { t } = useTranslation();

  const [learnType] = useGlobalState('learnType');
  const [currentAnswer] = useGlobalState('currentAnswer');
  const [blockSubmit] = useGlobalState('blockSubmit');

  const { submit, iKnow, showAnswer, gootToKnow } = useButtonsActions();

  return (
    <Wrapper>
      <Button onClick={iKnow}>{t('iKnow')}</Button>

      {(learnType === learnTypes.INPUT || learnType === learnTypes.QUIZ) && (
        <Button
          onClick={() => submit(learnType)}
          dark
          disabled={!currentAnswer || blockSubmit}
        >
          {t('submit')}
        </Button>
      )}

      {(learnType === learnTypes.QUIZ ||
        learnType === learnTypes.SHOW_WORD) && (
        <Button onClick={showAnswer}>{t('showAnswer')}</Button>
      )}

      <Button onClick={gootToKnow}>{t('goodToKnow')}</Button>
    </Wrapper>
  );
};

export default ButtonsSection;
