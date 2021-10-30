import { FC, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Card from 'components/Card';
import Background from 'components/Background';
import { Title } from 'components/atoms/Title';
import Button from 'components/atoms/Button';
import InputView from 'components/LearnViews/InputView';

import { todayWord } from 'dummyData/words';
import { flexCenter } from 'styles/mixins';
import ShowWordView from 'components/LearnViews/showWordView';
import { learnTypes } from 'constants/constants';
import AppearView from 'components/LearnViews/AppearView';
import QuizView from 'components/LearnViews/QuizView';

interface HomePageProps {}

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
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  ${flexCenter}
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const UserPage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  const [learnType, setLearType] = useState<string>(learnTypes.QUIZ);

  return (
    <>
      <Background />
      <Title>{t('todaysWord')}</Title>
      <Card>
        <WordCard>
          <BasicWord>{todayWord.basicWord}</BasicWord>
          <TransWord>
            {learnType === learnTypes.INPUT && <InputView />}
            {learnType === learnTypes.SHOW_WORD && (
              <ShowWordView transWord={todayWord.transWord} />
            )}
            {learnType === learnTypes.APPEAR && (
              <AppearView transWord={todayWord.transWord} />
            )}
            {learnType === learnTypes.QUIZ && (
              <QuizView answerQords={todayWord.randomWords} />
            )}
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
