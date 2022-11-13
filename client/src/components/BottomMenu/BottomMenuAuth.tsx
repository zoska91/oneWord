import BottomLoginForm from 'components/auth/BottomLogin';
import BottomSignForm from 'components/auth/BottomSign';
import { FC, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 20px;
  position: relative;
`;

interface BottomMenuAuthProps {}

const BottomMenuAuth: FC<BottomMenuAuthProps> = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <Wrapper>
      <BottomLoginForm setIsSignUp={setIsSignUp} />
      <BottomSignForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </Wrapper>
  );
};

export default BottomMenuAuth;
