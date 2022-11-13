import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface CloseLearnProps {}

const Wrapper = styled.div`
  position: fixed;
  bottom: 10vh;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.349);
  color: ${({ theme }) => theme.colorPrimary};
  padding: 10px 20px;
  border-radius: 10px;
  width: 50vw;
  font-size: 1.2rem;
  transform: skew(-10deg, 0) translateX(-50%);
  border: 2px solid transparent;
  text-transform: uppercase;
  text-align: center;
  box-shadow: inset 7px 9px 30px -18px ${({ theme }) => theme.colorPrimary};
`;

const CloseLearn: FC<CloseLearnProps> = () => {
  const { t } = useTranslation();

  return <Wrapper>{t('closeLearn')}</Wrapper>;
};

export default CloseLearn;
