import { FC, useState } from 'react';
import styled from 'styled-components';

import Button from 'components/atoms/Button';

interface AppearViewProps {
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

const AppearView: FC<AppearViewProps> = ({ transWord }) => {
  const [isVisible, setIsVIsible] = useState<boolean>(false);

  return (
    <>
      {isVisible ? (
        <Word>{transWord}</Word>
      ) : (
        <Button onClick={() => setIsVIsible(prev => !prev)} dark>
          Show translation
        </Button>
      )}
    </>
  );
};

export default AppearView;
