import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useGlobalState } from 'state';
import { device } from 'styles/devices';

interface InputViewProps {}

const WordAnswerInput = styled(TextareaAutosize)`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  width: 80%;
  min-width: 250px;
  min-height: 30px;
  font-size: 1.5rem;
  border-bottom: 5px solid ${({ theme }) => theme.colorPrimary};
  box-shadow: 0px 20px 15px -9px #ffffffda;
  text-align: center;
  color: ${({ theme }) => theme.colorPrimary};
  letter-spacing: 1px;

  @media ${device.mobileL} {
    font-size: 1rem;
  }
`;

const Word = styled.p`
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @media ${device.mobileL} {
    font-size: 1.5rem;
  }
`;

const InputView: FC<InputViewProps> = () => {
  const { t } = useTranslation();
  const [currentAnswer, setCurrentAnswer] = useGlobalState('currentAnswer');
  const [todaysWord] = useGlobalState('todaysWord');
  const [isAnswerShow] = useGlobalState('isAnswerShow');

  return (
    <>
      {isAnswerShow ? (
        <Word>{todaysWord.transWord}</Word>
      ) : (
        <WordAnswerInput
          autoFocus={true}
          placeholder={t('yourAnswer')}
          value={typeof currentAnswer === 'string' ? currentAnswer : ''}
          onChange={e => setCurrentAnswer(e.target.value)}
        />
      )}
    </>
  );
};

export default InputView;
