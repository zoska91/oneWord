import { FC } from 'react';
import { Redirect } from 'react-router';
import { FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import InputField from 'components/atoms/Inputs/InputField';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import useAuth from './Login.hook';
import ModalFooter from 'components/ModalForm/ModalFooter';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const { redirect, methods, handleSubmit, onSubmit, googleSubmit } = useAuth();

  return (
    <>
      {redirect ? (
        <Redirect to='/user' />
      ) : (
        <FormProvider {...methods}>
          <GoogleButton onClick={googleSubmit} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '50px 50px 20px' }}
          >
            <Stack spacing={6}>
              <InputField name='email' required />
              <InputField name='password' required type='password' />
            </Stack>

            <ModalFooter onClose={onClose} />
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default LoginForm;
