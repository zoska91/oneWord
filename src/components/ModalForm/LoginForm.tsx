import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import { loginByEmail, singInByGoogle } from 'db/API/auth';
import { IAuth } from './formTypes';
import InputField from 'components/atoms/Inputs/InputField';
import ModalFooter from './ModalFooter';
import GoogleButton from 'components/atoms/Inputs/GoogleButton';
import { createNotification } from 'common/notifications';
import { addDefaultSettingsIfNotExistsAPI } from 'db/API/settings';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);

  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    try {
      const resp: any = await loginByEmail(email, password);

      if (resp.code === 'auth/user-not-found') {
        createNotification(t('auth.userNotFound'), 'error');
        return;
      }

      if (resp.code === 'auth/wrong-password') {
        createNotification(t('auth.wrongPassword'), 'error');
        return;
      }

      if (resp.code) {
        createNotification(t('auth.error'), 'error');
        return;
      }

      setRedirect(true);
    } catch (e) {
      console.error(e);
    }
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

export default LoginForm;
