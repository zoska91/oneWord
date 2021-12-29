import { FC } from 'react';
import { useGlobalState } from 'state';

import * as S from './Views.css';

interface QuizViewProps {}

const colors = ['#8d6e8f', '#6d3796', '#5c1ca5'];

const QuizView: FC<QuizViewProps> = () => {
  const [todaysWord] = useGlobalState('todaysWord');
  const [currentAnswer, setCurrentAnswer] = useGlobalState('currentAnswer');

  return (
    <S.SingleAnswerWrapper>
      {todaysWord.randomWords.map((el, i) => (
        <S.SingleAnswer
          key={`${el}-${i}`}
          active={el.id === currentAnswer}
          style={{ boxShadow: `inset 7px 9px 30px -18px ${colors[i]}` }}
          onClick={() => setCurrentAnswer(el.id)}
        >
          {el.text}
        </S.SingleAnswer>
      ))}
    </S.SingleAnswerWrapper>
  );
};

export default QuizView;
