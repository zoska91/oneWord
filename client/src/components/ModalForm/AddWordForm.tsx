import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Stack } from '@chakra-ui/react';

import { IInputsAddWord } from './formTypes';
import InputField from 'components/atoms/Inputs/InputField';
import SelectField from 'components/atoms/Inputs/SelectInput';
import useGenerateOptionsFields from './useGenereteOptionsFields';
import ModalFooter from './ModalFooter';
import { addWordAPI } from 'db/API/words';
import { createNotification } from 'common/notifications';

interface AddWordFormProps {
  onClose?: () => void;
}

const AddWordForm: FC<AddWordFormProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const { addLangOptions } = useGenerateOptionsFields();

  const methods = useForm<IInputsAddWord>({
    defaultValues: {
      addLang: 'en',
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<IInputsAddWord> = data => {
    addWordAPI({ ...data });
    createNotification(t(`wordCreated`), 'success');
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: !onClose ? '10px 30px' : '50px 50px 20px' }}
      >
        <Stack spacing={6} marginBottom={!onClose ? 10 : 0}>
          <InputField name='basicWord' required />
          <InputField name='transWord' required />
          <SelectField name='addLang' required options={addLangOptions} />
        </Stack>

        <ModalFooter onClose={onClose} />
      </form>
    </FormProvider>
  );
};

export default AddWordForm;
