import { FC } from 'react';
import styled from 'styled-components';
import { device } from 'styles/devices';
import { flexCenter } from 'styles/mixins';

const Bg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 40vw;
  min-width: 650px;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  z-index: 5;
  border-radius: 40px;
  padding: 30px;

  transition: 0.5s;
  cursor: pointer;

  @media ${device.desktop} {
    top: 60%;
    width: 80vw;
    min-width: 280px;
    height: 55vh;
  }
`;

const TextWrapper = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 40vw;
  min-width: 650px;
  transition: 0.3s;
  z-index: 10;
  padding: 30px;

  ${flexCenter}

  @media ${device.tablet} {
    top: 60%;
    width: 80vw;
    min-width: 280px;
    height: 55vh;
  }
`;

interface CardProps {
  children: JSX.Element | string;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <>
      <Bg />
      <TextWrapper>{children}</TextWrapper>
    </>
  );
};

export default Card;
