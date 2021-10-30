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
import ShowWordView from 'components/LearnViews/ShowWordView';
import { learnTypes } from 'constants/constants';
import AppearView from 'components/LearnViews/AppearView';
import QuizView from 'components/LearnViews/QuizView';
import ButtonsShowWord from 'components/ButtonsSection/ButtonsShowWord';
import ButtonsInput from 'components/ButtonsSection/ButtonsInput';
import ButtonsAppear from 'components/ButtonsSection/ButtonsAppear';
import ButtonsQuiz from 'components/ButtonsSection/ButtonsQuiz';

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
  min-height: 30%;
  text-shadow: 2px 2px 0px #fff;

  ${flexCenter}
`;

const TransWord = styled.div`
  width: 100%;
  min-height: 50%;
  margin: 0 auto;
  flex: 1 0 auto;

  ${flexCenter}
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  z-index: 10;

  ${flexCenter}
`;

const UserPage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  const [learnType, setLearType] = useState<string>(learnTypes.APPEAR);
  const [canSabmit, setCanSubmit] = useState<boolean>(false);

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
        {learnType === learnTypes.INPUT && (
          <ButtonsInput
            canSabmit={canSabmit}
            actions={{
              submit: () => {},
              showAnswer: () => {},
              iKnow: () => {},
            }}
          />
        )}
        {learnType === learnTypes.SHOW_WORD && (
          <ButtonsShowWord
            actions={{
              iKnow: () => {},
              goodToKnow: () => {},
            }}
          />
        )}
        {learnType === learnTypes.APPEAR && (
          <ButtonsAppear
            actions={{
              iKnow: () => {},
              goodToKnow: () => {},
            }}
          />
        )}
        {learnType === learnTypes.QUIZ && (
          <ButtonsQuiz
            canSabmit={canSabmit}
            actions={{
              submit: () => {},
              showAnswer: () => {},
            }}
          />
        )}
      </Buttons>
    </>
  );
};

export default UserPage;
