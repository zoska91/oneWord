import { FC } from 'react';
import { useGlobalState } from 'state';

import * as S from './Views.css';

interface ShowWordViewProps {}

const ShowWordView: FC<ShowWordViewProps> = () => {
  const [todaysWord] = useGlobalState('todaysWord');
  const [isAnswerShow] = useGlobalState('isAnswerShow');

  return <S.Word>{isAnswerShow && todaysWord.transWord}</S.Word>;
};

export default ShowWordView;
