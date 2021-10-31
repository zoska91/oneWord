import styled from 'styled-components';
import { FC } from 'react';
import { useGlobalState } from 'state';

interface ShowWordViewProps {}

const Word = styled.p`
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const ShowWordView: FC<ShowWordViewProps> = () => {
  const [todaysWord] = useGlobalState('todaysWord');

  return <Word>{todaysWord.transWord}</Word>;
};

export default ShowWordView;
