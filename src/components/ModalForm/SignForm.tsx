import { FC, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Stack } from '@chakra-ui/react';

import { IAuth } from './formTypes';
import InputField from 'components/atoms/Inputs/InputField';
import ModalFooter from './ModalFooter';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import { loginByEmail, singInByGoogle } from 'db/API/auth';
import { createNotification } from 'common/notifications';
import { Redirect } from 'react-router';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { addDefaultSettingsIfNotExistsAPI } from 'db/API/settings';

interface SignFormProps {
  onClose: () => void;
}

const SignForm: FC<SignFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user.uid) {
          loginByEmail(email, password);
          addDefaultSettingsIfNotExistsAPI(user.uid);
        }
      })
      .catch(error => {
        if (error.code === 'auth/weak-password')
          createNotification(t('api.weakPassword'), 'error');

        if (error.code === 'auth/email-already-in-use')
          createNotification(t('api.existsMail'), 'error');

        throw { code: error.code, error: error.message };
      });
  };

  const googleSubmit = async () => {
    const result = await singInByGoogle();
    if (result.token && result.user) {
      setRedirect(true);
      addDefaultSettingsIfNotExistsAPI(result.user.uid);
    }
  };

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
