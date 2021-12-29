import { Dispatch, FC, SetStateAction } from 'react';
import { FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import InputField from 'components/atoms/Inputs/InputField';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import { Redirect } from 'react-router';
import useSign from './Sign.hooks';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

interface wrapperStylesProps {
  isSignUp?: boolean;
}

const Wrapper = styled.div<wrapperStylesProps>`
  position: absolute;
  top: ${({ isSignUp }) => (isSignUp ? '65px' : 'calc(80vh - 80px)')};
  background-color: #2e2757;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  padding-bottom: 30px;
  border-radius: 90% 90% 0% 0%/ 11% 11% 50% 50%;
  transition: 0.3s;

  @media (max-height: 650px) {
    top: ${({ isSignUp }) => (isSignUp ? '65px' : 'calc(90vh - 80px)')};
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colorLight};
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: bold;
  text-align: center;
  z-index: 3;
  padding: 0 3px;
  margin: 0;
  font-size: 2rem;
`;

interface SignFormProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean;
}

const BottomSignForm: FC<SignFormProps> = ({ setIsSignUp, isSignUp }) => {
  const { redirect, methods, handleSubmit, onSubmit, googleSubmit } = useSign();

  return (
    <>
      {redirect ? (
        <Redirect to='/user' />
      ) : (
        <Wrapper isSignUp={isSignUp}>
          <FormProvider {...methods}>
            <Title onClick={() => setIsSignUp(true)}>Sign In</Title>
            <GoogleButton onClick={googleSubmit} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ padding: '20px 60px 20px' }}
            >
              <Stack spacing={6}>
                <InputField name='email' required />
                <InputField name='password' required type='password' />
                <Button secondaryColor>Sign in</Button>
              </Stack>
            </form>
          </FormProvider>
        </Wrapper>
      )}
    </>
  );
};

export default BottomSignForm;
