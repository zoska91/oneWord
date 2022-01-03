import { FC } from 'react';
import { css } from '@emotion/react';
import styled from 'styled-components';

interface SpinerProps {
  color?: string;
}

const Wrapper = styled.div<SpinerProps>`
  margin: 0 auto;
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 100px;

  div {
    position: absolute;
    border: 4px solid ${({ color }) => color || '#fff'};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const Spiner: FC<SpinerProps> = ({ color = '000' }) => {
  return (
    <Wrapper color={color}>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

export default Spiner;
