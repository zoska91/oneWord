import { FC } from 'react';
import { useGlobalState } from 'state';

import * as S from './Views.css';

interface ShowWordViewProps {}

const ShowWordView: FC<ShowWordViewProps> = () => {
  const [todaysWord] = useGlobalState('todaysWord');

  return <S.Word>{todaysWord.transWord}</S.Word>;
};

export default ShowWordView;
