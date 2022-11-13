import styled, { css } from 'styled-components';
import { flexCenter } from 'styles/mixins';
import { Text } from '@chakra-ui/react';
import { device } from 'styles/devices';

interface StylesProps {
  isAddWord?: boolean;
}

export const Wrapper = styled.div`
  display: none;

  .react-swipeable-view-container {
    border-radius: 20px;
  }

  @media ${device.tablet} {
    display: block;
  }
`;

export const Line = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 5px;
  background-color: ${({ theme }) => theme.colorPrimary};
  border-radius: 20px;
  margin-top: 10px;
  backdrop-filter: blur(6px);
`;

export const WrapperBottomMenuUser = styled.div`
  padding-top: 40px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Header = styled(Text)<StylesProps>`
  position: relative;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorPrimary};
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
  transition: 0.5s;

  .MuiSpeedDialAction-staticTooltipLabel {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colorPrimary};
    display: flex;
    width: 120px;
    flex-direction: row-reverse;
  }

  .MuiFab-root {
    width: 40px;
  }
`;

export const PreferencesContainer = styled.div<StylesProps>`
  padding-top: ${({ isAddWord }) => (isAddWord ? 0 : '20px')};
  position: absolute;
  background-color: ${({ theme, isAddWord }) =>
    isAddWord ? theme.colorSecondary : theme.colorLight};
  width: 60px;
  height: 60px;
  bottom: 0;
  right: 0;
  border-radius: 30px 5px 0 30px;
  transition: 0.4s;

  ${flexCenter}

  ${({ isAddWord }) =>
    !isAddWord &&
    css`
      display: block;
      width: 100%;
      height: 100%;
      bottom: -20px;
      border-radius: 20px 20px 0 0;
    `}
`;
