import { FC } from 'react';
// @ts-ignore
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import * as S from './BottomMenu.css';
interface HomePageProps {}

const BottomMenu: FC<HomePageProps> = ({ children }) => {
  return (
    <S.Wrapper>
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
        <S.Line />
        {children}
      </SwipeableBottomSheet>
    </S.Wrapper>
  );
};

export default BottomMenu;
