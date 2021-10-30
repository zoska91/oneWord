import { FC, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import TextareaAutosize from '@mui/material/TextareaAutosize';

interface InputViewProps {}

const WordAnswerInput = styled(TextareaAutosize)`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  width: 100%;
  min-width: 250px;
  min-height: 30px;
  font-size: 1.5rem;
  border-bottom: 5px solid ${({ theme }) => theme.colorPrimary};
  box-shadow: 0px 20px 15px -9px #ffffffda;
  text-align: center;
  color: ${({ theme }) => theme.colorPrimary};
  letter-spacing: 1px;
`;

const InputView: FC<InputViewProps> = () => {
  const { t } = useTranslation();

  const [wordValue, setWordValue] = useState<string>('');

  return (
    <WordAnswerInput
      autoFocus={true}
      placeholder={t('yourAnswer')}
      value={wordValue}
      onChange={e => setWordValue(e.target.value)}
    />
  );
};

export default InputView;
