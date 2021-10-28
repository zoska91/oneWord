import { FC } from 'react';
import styled from 'styled-components';
import { logOut, singIn } from '../firebase/auth';
import Button from './atoms/Button';

interface SignInProps {}

const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
`;

const SignIn: FC<SignInProps> = () => {
  return (
    <Wrapper>
      <Button onClick={singIn}>sign in</Button>
      <Button onClick={logOut}>sign out</Button>
    </Wrapper>
  );
};

export default SignIn;
