import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/Button';
import { useGlobalState } from 'state';

interface AppearViewProps {}

const Word = styled.p`
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const AppearView: FC<AppearViewProps> = () => {
  const { t } = useTranslation();

  const [todaysWord] = useGlobalState('todaysWord');
  const [isAnswerShow, setIsAnswerShow] = useGlobalState('isAnswerShow');

  return (
    <>
      {isAnswerShow ? (
        <Word>{todaysWord.transWord}</Word>
      ) : (
        <Button onClick={() => setIsAnswerShow(prev => !prev)} dark>
          {t('showTranslate')}
        </Button>
      )}
    </>
  );
};

export default AppearView;
