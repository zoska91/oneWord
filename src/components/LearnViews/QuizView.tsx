import { FC } from 'react';
import { useGlobalState } from 'state';
import styled from 'styled-components';

interface QuizViewProps {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SingleAnswer = styled.button<{ active: Boolean }>`
  display: block;
  background-color: ${({ theme, active }) =>
    active ? theme.colorPrimary : 'rgba(255, 255, 255, 0.26)'};
  color: ${({ theme, active }) => (!active ? theme.colorPrimary : '#eee')};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 5%;
  width: 90%;
  font-size: 1rem;
  transform: skew(-10deg, 0);
  transition: 0.3s;
  border: 2px solid transparent;

  :hover {
    border: 2px solid ${({ theme }) => theme.colorPrimary};
    transform: scale(1.05) skew(-10deg, 0);
  }
`;

const colors = ['#8d6e8f', '#6d3796', '#5c1ca5'];

const QuizView: FC<QuizViewProps> = () => {
  const [todaysWord] = useGlobalState('todaysWord');
  const [currentAnswer, setCurrentAnswer] = useGlobalState('currentAnswer');

  return (
    <Wrapper>
      {todaysWord.randomWords.map((el, i) => (
        <SingleAnswer
          key={`${el}-${i}`}
          active={el.id === currentAnswer}
          style={{ boxShadow: `inset 7px 9px 30px -18px ${colors[i]}` }}
          onClick={() => setCurrentAnswer(el.id)}
        >
          {el.text}
        </SingleAnswer>
      ))}
    </Wrapper>
  );
};

export default QuizView;
