import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';

import Card from 'components/Card/Card';
import Background from 'components/atoms/Background';
import { Title } from 'components/atoms/Title';
import InputView from 'components/LearnViews/InputView';
import ShowWordView from 'components/LearnViews/ShowWordView';
import { learnTypes } from 'constants/constants';
import AppearView from 'components/LearnViews/AppearView';
import QuizView from 'components/LearnViews/QuizView';
import ButtonsSection from 'components/ButtonsSection/ButtonsSection';
// import CloseLearn from 'components/LearnViews/CloseLearn';
import ModalForm from 'components/ModalForm/ModalForm';
import AsideButton from 'components/atoms/AsideButton';
import BottomMenu from 'components/BottomMenu/BottomMenu';
import BottomMenuUser from 'components/BottomMenu/BottomMenuUser';
import Spiner from 'components/atoms/Spiner';

import useUserPage from './useUserPage';
import * as S from './UserPage.css';
import BreakDayView from 'components/LearnViews/BreakDayView';
import AsideMenu from 'components/AsideMenu/AsideMenu';

interface HomePageProps {}

const UserPage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  const {
    redirect,
    closeLearn,
    todaysWord,
    learnType,
    loading,
    breakDay,
    setRedirect,
  } = useUserPage();

  if (loading) return <Spiner color='#2e2757' />;

  return (
    <>
      {redirect ? (
        <Redirect to='/' />
      ) : (
        <>
          <Background />
          <Title>{t('todaysWord')}</Title>
          {!closeLearn && !breakDay && (
            <Card upper>
              <S.WordCard>
                <S.BasicWord>{todaysWord?.basicWord}</S.BasicWord>
                <S.TransWord>
                  {learnType === learnTypes.INPUT && <InputView />}
                  {learnType === learnTypes.SHOW_WORD && <ShowWordView />}
                  {learnType === learnTypes.APPEAR && <AppearView />}
                  {learnType === learnTypes.QUIZ && <QuizView />}
                </S.TransWord>
              </S.WordCard>
            </Card>
          )}
          {/* {!closeLearn ? <ButtonsSection /> : <CloseLearn />} */}
          {!breakDay ? <ButtonsSection /> : <BreakDayView />}

          <AsideMenu setRedirect={setRedirect} type='user' />

          <BottomMenu>
            <S.MenuBottomWrapper>
              <BottomMenuUser />
            </S.MenuBottomWrapper>
          </BottomMenu>
        </>
      )}
    </>
  );
};

export default UserPage;
