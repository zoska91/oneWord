import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

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
import ModalForm from 'components/ModalForm/ModalForm';

import { logOut } from 'db/API/auth';
import AsideButton from 'components/atoms/AsideButton';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getTodayWordAPI } from 'db/API/words';
import { device } from 'styles/devices';
import BottomMenu from 'components/BottomMenu/BottomMenu';
import BottomMenuUser from 'components/BottomMenu/BottomMenuUser';

interface HomePageProps {}

const WordCard = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px;

  @media ${device.tablet} {
    width: 80vw;
    min-width: 280px;
    height: 55vh;
    padding: 20px;
  }
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

  @media ${device.tablet} {
    font-size: 1.5rem;
  }
`;

const TransWord = styled.div`
  width: 100%;
  min-height: 50%;
  margin: 0 auto;
  flex: 1 0 auto;

  ${flexCenter}

  @media ${device.tablet} {
    min-height: 30%;
  }
`;

export const MenuBottomWrapper = styled.div`
  height: 94vh;

  @media (max-height: 650px) {
    height: 98vh;
  }
`;

const UserPage: FC<HomePageProps> = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { t } = useTranslation();

  const [learnType] = useGlobalState('learnType');
  const [todaysWord] = useGlobalState('todaysWord');
  const [closeLearn] = useGlobalState('closeLearn');

  useEffect(() => {
    const auth = getAuth();
    setLoading(true);

    const getTodayWord = async () => {
      const word = await getTodayWordAPI();
      console.log(word);
    };

    onAuthStateChanged(auth, user => {
      if (!user) setRedirect(true);

      getTodayWord();
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      {redirect ? (
        <Redirect to='/' />
      ) : (
        <>
          <Background />
          <Title>{t('todaysWord')}</Title>
          <Card upper>
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

          <ModalForm type='addWord' top={20} />
          <ModalForm type='preferences' top={45} modalSize='4xl' />
          <AsideButton
            small
            label={t(`logout`)}
            top={80}
            onClick={handleLogout}
          />

          <BottomMenu>
            <MenuBottomWrapper>
              <BottomMenuUser />
            </MenuBottomWrapper>
          </BottomMenu>
        </>
      )}
    </>
  );
};

export default UserPage;
