import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { flexCenter } from 'styles/mixins';
import Card from 'components/Card';
import Background from 'components/Background';
import { Title } from 'components/atoms/Title';
import InputView from 'components/LearnViews/InputView';
import ShowWordView from 'components/LearnViews/ShowWordView';
import { learnTypes } from 'constants/constants';
import AppearView from 'components/LearnViews/AppearView';
import QuizView from 'components/LearnViews/QuizView';
import ButtonsSection from 'components/ButtonsSection/ButtonsSection';
import { useGlobalState } from 'state';
import CloseLearn from 'components/CloseLearn';
import AddWordModal from 'components/ModalForm/ModalForm';

import { getCurrentUser } from 'db/auth';

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

const UserPage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  const [learnType] = useGlobalState('learnType');
  const [todaysWord] = useGlobalState('todaysWord');
  const [closeLearn] = useGlobalState('closeLearn');

  useEffect(() => {
    try {
      const resp = getCurrentUser();
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <Background />
      <Title>{t('todaysWord')}</Title>
      <Card>
        {!closeLearn ? (
          <WordCard>
            <BasicWord>{todaysWord.basicWord}</BasicWord>
            <TransWord>
              {learnType === learnTypes.INPUT && <InputView />}
              {learnType === learnTypes.SHOW_WORD && <ShowWordView />}
              {learnType === learnTypes.APPEAR && <AppearView />}
              {learnType === learnTypes.QUIZ && <QuizView />}
            </TransWord>
          </WordCard>
        ) : (
          <ShowWordView />
        )}
      </Card>
      {!closeLearn ? <ButtonsSection /> : <CloseLearn />}

      <AddWordModal type='addWord' top={20} />
      <AddWordModal type='preferences' top={45} modalSize='4xl' />
    </>
  );
};

export default UserPage;
