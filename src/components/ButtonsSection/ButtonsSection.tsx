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
  const [blockShowAnswerButton] = useGlobalState('blockShowAnswerButton');

  const { submit, showAnswer } = useButtonsActions();

  return (
    <Wrapper>
      {(learnType === learnTypes.INPUT || learnType === learnTypes.QUIZ) && (
        <Button
          onClick={() => submit(learnType)}
          secondaryColor
          disabled={!currentAnswer || blockSubmit}
        >
          {t('submit')}
        </Button>
      )}

      {learnType === learnTypes.SHOW_WORD && (
        <Button onClick={showAnswer} disabled={blockShowAnswerButton}>
          {t('showAnswer')}
        </Button>
      )}
    </Wrapper>
  );
};

export default ButtonsSection;
