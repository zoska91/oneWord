import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from 'components/atoms/Title';
import Background from 'components/atoms/Background';
import Card from 'components/Card/Card';
import Button from 'components/atoms/Button';
import BottomMenu from 'components/BottomMenu/BottomMenu';
import BottomMenuAuth from 'components/BottomMenu/BottomMenuAuth';

import * as S from './HomePage.css';
import AsideMenu from 'components/AsideMenu/AsideMenu';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Background />
      <Title>
        <span>only</span> one Word <span>a day</span>
      </Title>
      <Card>
        <S.WelcomeCard>
          <h2>{t('welcome')}</h2>
          <h4>{t('welcome2')}</h4>
          <h4>{t('welcome3')}</h4>
          <h2>{t('welcome4')}</h2>
          <Button dark>{t('welcome5')}</Button>
        </S.WelcomeCard>
      </Card>

      <AsideMenu type='home' />

      <BottomMenu>
        <S.MenuBottomWrapper>
          <BottomMenuAuth />
        </S.MenuBottomWrapper>
      </BottomMenu>
    </>
  );
};

export default HomePage;
