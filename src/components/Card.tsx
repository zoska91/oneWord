import { FC } from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixins';

const Bg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) skew(-5deg, 0);
  height: 50vh;
  width: 40vw;
  min-width: 240px;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  z-index: 5;
  border-radius: 40px;
  padding: 30px;

  transition: 0.5s;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 40vw;
  position: absolute;
  transition: 0.3s;
  z-index: 10;
  padding: 30px;

  ${flexCenter}
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
