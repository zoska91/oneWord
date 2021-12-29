import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// @ts-ignore
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { device } from 'styles/devices';

interface HomePageProps {}

const Wrapper = styled.div`
  display: none;

  .react-swipeable-view-container {
    border-radius: 20px;
  }

  @media ${device.tablet} {
    display: block;
  }
`;

const Line = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 5px;
  background-color: ${({ theme }) => theme.colorPrimary};
  border-radius: 20px;
  margin-top: 10px;
  backdrop-filter: blur(6px);
`;

const BottomMenu: FC<HomePageProps> = ({ children }) => {
  return (
    <Wrapper>
      <SwipeableBottomSheet
        overflowHeight={25}
        style={{
          zIndex: 11,
          width: '90vw',
          minWidth: '320px',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
        overlayStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
        bodyStyle={{
          borderRadius: '20px 20px 0 0 ',
          overflow: 'hidden',
          backgroundColor: 'rgba(218, 218, 218, 0.9)',
        }}
      >
        <Line />
        {children}
      </SwipeableBottomSheet>
    </Wrapper>
  );
};

export default BottomMenu;
