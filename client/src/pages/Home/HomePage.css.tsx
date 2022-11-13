import styled from 'styled-components';
import { device } from 'styles/devices';

export const WelcomeCard = styled.div`
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

  @media ${device.tablet} {
    width: 80vw;
    min-width: 280px;
    height: 55vh;
    padding: 20px;
  }
`;

export const MenuBottomWrapper = styled.div`
  height: 80vh;

  @media (max-height: 650px) {
    height: 90vh;
  }
`;
