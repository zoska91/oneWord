import { FC } from 'react';

import * as S from './Card.css';

interface CardProps {
  children: JSX.Element | string;
  upper?: boolean;
}

const Card: FC<CardProps> = ({ children, upper }) => {
  return (
    <>
      <S.Bg upper={upper} />
      <S.TextWrapper upper={upper}>{children}</S.TextWrapper>
    </>
  );
};

export default Card;
