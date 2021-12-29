import { Dispatch, FC, SetStateAction } from 'react';
import { Redirect } from 'react-router';
import { FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import InputField from 'components/atoms/Inputs/InputField';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import useAuth from './Login.hook';
import Button from 'components/atoms/Button';
import styled from 'styled-components';

export const Title = styled.h2`
  color: ${({ theme }) => theme.colorPrimary};
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: bold;
  text-align: center;
  z-index: 3;
  padding: 0 3px;
  margin: 0;
  font-size: 2rem;
`;

interface LoginFormProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const BottomLoginForm: FC<LoginFormProps> = ({ setIsSignUp }) => {
  const { redirect, methods, handleSubmit, onSubmit, googleSubmit } = useAuth();

  return (
    <>
      {redirect ? (
        <Redirect to='/user' />
      ) : (
        <FormProvider {...methods}>
          <Title onClick={() => setIsSignUp(false)}>Login</Title>
          <GoogleButton onClick={googleSubmit} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '20px 50px 20px' }}
          >
            <Stack spacing={6}>
              <InputField name='email' required />
              <InputField name='password' required type='password' />
              <Button secondaryColor>Log in</Button>
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default BottomLoginForm;
