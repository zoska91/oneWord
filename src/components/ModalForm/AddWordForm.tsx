import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import { IInputsAddWord } from './formTypes';
import InputField from 'components/atoms/Inputs/InputField';
import SelectField from 'components/atoms/Inputs/SelectInput';
import useGenerateOptionsFields from './useGenereteOptionsFields';
import ModalFooter from './ModalFooter';

interface AddWordFormProps {
  onClose: () => void;
}

const AddWordForm: FC<AddWordFormProps> = ({ onClose }) => {
  const { addLangOptions } = useGenerateOptionsFields();

  const methods = useForm<IInputsAddWord>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IInputsAddWord> = data => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '50px 50px 20px' }}>
        <Stack spacing={6}>
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
