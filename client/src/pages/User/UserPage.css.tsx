import styled from 'styled-components';
import { device } from 'styles/devices';
import { flexCenter } from 'styles/mixins';

export const WordCard = styled.div`
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

export const BasicWord = styled.p`
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

export const TransWord = styled.div`
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
