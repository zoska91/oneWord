import styled from 'styled-components';
import { FC } from 'react';

interface ShowWordViewProps {
  transWord: string;
}

const Word = styled.p`
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const ShowWordView: FC<ShowWordViewProps> = ({ transWord }) => {
  return <Word>{transWord}</Word>;
};

export default ShowWordView;
