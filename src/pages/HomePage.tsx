import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from 'components/atoms/Title';
import Background from 'components/Background';
import Card from 'components/Card';
import Button from 'components/atoms/Button';
import ModalForm from 'components/ModalForm/ModalForm';

interface HomePageProps {}

const WelcomeCard = styled.div`
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme.colorPrimary};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const HomePage: FC<HomePageProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Background />
      <Title>
        <span>only</span> one Word <span>a day</span>
      </Title>
      <Card>
        <WelcomeCard>
          <h2>{t('welcome')}</h2>
          <h4>{t('welcome2')}</h4>
          <h4>{t('welcome3')}</h4>
          <h2>{t('welcome4')}</h2>
          <Button dark>{t('welcome5')}</Button>
        </WelcomeCard>
      </Card>
      <ModalForm type='login' top={20} />
      <ModalForm type='signin' top={38} />
    </>
  );
};

export default HomePage;
