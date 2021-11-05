import { FC } from 'react';
import styled from 'styled-components';

import { learnTypes } from 'constants/constants';
import { flexCenter } from 'styles/mixins';
import { useGlobalState } from 'state';
import { useButtonsActions } from './useButtonActions';
import Button from 'components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface ButtonSectionProps {}

const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 0;
  right: 0;
  z-index: 10;

  ${flexCenter}
`;

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
        <Button onClick={() => submit(learnType)} dark disabled={!currentAnswer || blockSubmit}>
          {t('submit')}
        </Button>
      )}

      {(learnType === learnTypes.QUIZ || learnType === learnTypes.SHOW_WORD) && (
        <Button onClick={showAnswer}>{t('showAnswer')}</Button>
      )}

      <Button onClick={gootToKnow}>{t('goodToKnow')}</Button>
    </Wrapper>
  );
};

export default ButtonsSection;
