import { FC } from 'react';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import InputField from 'components/atoms/Inputs/InputField';
import useGenerateOptionsFields from 'components/ModalForm/useGenereteOptionsFields';
import SelectField from 'components/atoms/Inputs/SelectInput';
import { IInputsAddWord } from 'components/ModalForm/formTypes';
import ModalFooter from 'components/ModalForm/ModalFooter';
import useWordsList from './useWordsList';
import styled from 'styled-components';
import { device } from 'styles/devices';

interface EditWordFormProps {
  onClose: () => void;
}

const Wrapper = styled.div`
  @media ${device.tablet} {
    padding: 0 20px;
    overflow: hidden;
  }
`;

const EditWordForm: FC<EditWordFormProps> = ({ onClose }) => {
  const { addLangOptions, statusDictOptions } = useGenerateOptionsFields();
  const { saveEditingWord, editingWord: data } = useWordsList();

  const methods = useForm<IInputsAddWord>({
    defaultValues: data || {},
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IInputsAddWord> = async values => {
    if (data?.wordId) saveEditingWord(data.wordId, values);
    onClose();
  };

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} marginBottom={!onClose ? 10 : 0}>
            <InputField name='basicWord' required />
            <InputField name='transWord' required />
            <SelectField name='addLang' required options={addLangOptions} />
            <SelectField name='status' required options={statusDictOptions} />
          </Stack>
          <ModalFooter onClose={onClose} />
        </form>
      </FormProvider>
    </Wrapper>
  );
};

export default EditWordForm;
