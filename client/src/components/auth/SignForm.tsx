import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import InputField from 'components/atoms/Inputs/InputField';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import { Redirect } from 'react-router';
import ModalFooter from 'components/ModalForm/ModalFooter';
import useSign from './Sign.hooks';

interface SignFormProps {
  onClose: () => void;
}

const SignForm: FC<SignFormProps> = ({ onClose }) => {
  const { redirect, methods, handleSubmit, onSubmit, googleSubmit } = useSign();

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

export default SignForm;
