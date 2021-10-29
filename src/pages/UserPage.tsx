import { FC, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import SignIn from 'components/SignUp';
import Card from 'components/Card';
import Background from 'components/Background';
import { Title } from 'components/atoms/Title';

import { todayWord } from 'dummyData/words';
import { flexCenter } from 'styles/mixins';
import Button from 'components/atoms/Button';

interface HomePageProps {}

const BgUser = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 3;
`;

const WordCard = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px;
`;

const BasicWord = styled.p`
  position: relative;
  color: ${({ theme }) => theme.colorPrimary};
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  margin: 0;
  height: 50%;
  text-shadow: 2px 2px 0px #fff;

  ${flexCenter}
`;

const TransWord = styled.div`
  height: 50%;
  width: 80%;
  margin: 0 auto;
  overflow-x: hidden;

  ${flexCenter}
`;
const WordAnswerInput = styled(TextareaAutosize)`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  width: 100%;
  min-width: 250px;
  min-height: 50px;
  font-size: 1.5rem;
  border-bottom: 5px solid ${({ theme }) => theme.colorPrimary};
  box-shadow: 0px 20px 15px -9px #ffffffda;
  text-align: center;
  color: ${({ theme }) => theme.colorPrimary};
  letter-spacing: 1px;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const UserPage: FC<HomePageProps> = () => {
  const [wordValue, setWordValue] = useState<string>('');
  const { t } = useTranslation();

  return (
    <>
      <Background />
      <BgUser />
      <Title>{t('todaysWord')}</Title>
      <Card>
        <WordCard>
          <BasicWord>{todayWord.basicLang}</BasicWord>
          <TransWord>
            <WordAnswerInput autoFocus={true} placeholder={t('yourAnswer')} />
          </TransWord>
        </WordCard>
      </Card>
      <Buttons>
        <Button onClick={() => {}}>{t('submit')}</Button>
        <Button onClick={() => {}}>{t('iKnow')}</Button>
        <Button onClick={() => {}}>{t('showAnswer')}</Button>
      </Buttons>
    </>
  );
};

export default UserPage;
