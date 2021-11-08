import { FC } from 'react';
import Img from 'assets/img/Google__G__Logo.svg';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface GoogleButtonProps {
  onClick: () => void;
}

const Wrapper = styled.button`
  background-color: #ffffffa0;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 20px 50px 0;
  width: calc(100% - 100px);
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  text-shadow: 1px 1px 5px #ffffffae;
  cursor: pointer;
  transition: 0.3s;

  border: 2px solid ${({ theme }) => theme.colorPrimary};
  transform: scale(1.1);
  box-shadow: 7px 5px 15px -1px ${({ theme }) => theme.colorPrimary};

  :hover {
    transform: skew(-10deg, 0) scale(1.15);
    background-color: white;
  }

  img {
    margin-right: 20px;
  }

  span {
    font-family: 'Josefin Sans', sans-serif;
    margin-right: auto;
    font-size: 1.3rem;
  }
`;

const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Wrapper onClick={onClick} type='button'>
      <img src={Img} />
      <span>{t(`buttons.withGoogle`)}</span>
    </Wrapper>
  );
};

export default GoogleButton;
