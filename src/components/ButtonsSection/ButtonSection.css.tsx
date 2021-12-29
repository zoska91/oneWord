import styled from 'styled-components';
import { device } from 'styles/devices';
import { flexCenter } from 'styles/mixins';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 0;
  right: 0;
  z-index: 10;

  ${flexCenter}

  @media ${device.tablet} {
    flex-direction: column;
    bottom: 13%;

    button {
      margin: 10px 0;
    }

    button:nth-child(1) {
      order: 1;
    }
  }
`;
