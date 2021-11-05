import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Stack, ModalFooter } from '@chakra-ui/react';

import { IInputsAddWord } from './formTypes';
import Button from 'components/atoms/Button';
import InputField from 'components/atoms/Inputs/InputField';
import SelectField from 'components/atoms/Inputs/SelectInput';
import useGenerateOptionsFields from './useGenereteOptionsFields';

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: '50px 50px 20px' }}
      >
        <Stack spacing={6}>
          <InputField name='basicWord' required />
          <InputField name='transWord' required />
          <SelectField name='addLang' required options={addLangOptions} />
        </Stack>

        <ModalFooter
          justifyContent='space-between'
          style={{ paddingTop: '80px' }}
        >
          <Button small onClick={onClose}>
            Close
          </Button>
          <Button dark small type='submit'>
            zapisz
          </Button>
        </ModalFooter>
      </form>
    </FormProvider>
  );
};

export default AddWordForm;
