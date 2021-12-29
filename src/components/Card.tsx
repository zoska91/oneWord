import styled from 'styled-components';
import { FC } from 'react';
import { device } from 'styles/devices';
import { flexCenter } from 'styles/mixins';

interface styleProps {
  upper?: boolean;
}
const Bg = styled.div<styleProps>`
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
    top: ${({ upper }) => (upper ? '52%' : '55%')};
    width: 80vw;
    min-width: 280px;
    height: 55vh;
  }

  @media ${device.tablet} {
    top: ${({ upper }) => (upper ? '52%' : '55%')};
    height: ${({ upper }) => (upper ? '80vh' : '60vh')};
  }
`;

const TextWrapper = styled.div<styleProps>`
  position: fixed;
  top: ${({ upper }) => (upper ? '45%' : '55%')};
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
    width: 80vw;
    min-width: 280px;
    height: 55vh;
  }
`;

interface CardProps {
  children: JSX.Element | string;
  upper?: boolean;
}

const Card: FC<CardProps> = ({ children, upper }) => {
  return (
    <>
      <Bg upper={upper} />
      <TextWrapper upper={upper}>{children}</TextWrapper>
    </>
  );
};

export default Card;
