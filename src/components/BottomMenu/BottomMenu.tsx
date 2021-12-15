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
  width: 80%;
  margin: 0 auto;
  height: 5px;
  background-color: #9a9ae1;
  border-radius: 20px;
  margin-top: 10px;
  backdrop-filter: blur(6px);
`;

const BottomMenu: FC<HomePageProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <SwipeableBottomSheet
        overflowHeight={25}
        style={{
          zIndex: 11,
          width: '80vw',
          minWidth: '280px',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
        overlayStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
        bodyStyle={{
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <Line />
        {children}
      </SwipeableBottomSheet>
    </Wrapper>
  );
};

export default BottomMenu;
