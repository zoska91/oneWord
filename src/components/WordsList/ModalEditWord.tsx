import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { StyledModalContent, StyledModalHeader } from '../ModalForm/Form.css';
import { ITodayWord } from 'types/api';
import InputField from 'components/atoms/Inputs/InputField';
import useGenerateOptionsFields from 'components/ModalForm/useGenereteOptionsFields';
import SelectField from 'components/atoms/Inputs/SelectInput';
import { IInputsAddWord } from 'components/ModalForm/formTypes';
import ModalFooter from 'components/ModalForm/ModalFooter';
import useWordsList from './useWordsList';

interface ModalEditWordProps {
  isOpen: boolean;
  onClose: () => void;
  data: ITodayWord;
}

const ModalEditWord: FC<ModalEditWordProps> = ({ onClose, isOpen, data }) => {
  const { t } = useTranslation();
  const { addLangOptions, statusDictOptions } = useGenerateOptionsFields();
  const { saveEditingWord } = useWordsList();

  const methods = useForm<IInputsAddWord>({
    defaultValues: data,
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IInputsAddWord> = async values => {
    if (data.wordId) saveEditingWord(data.wordId, values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <ModalOverlay />

      <StyledModalContent bg='rgba(255,255,255, 0.6)' borderRadius='30'>
        <StyledModalHeader fontSize='4xl'>
          {t(`form.editWordTitle`)}
        </StyledModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6} marginBottom={!onClose ? 10 : 0}>
                <InputField name='basicWord' required />
                <InputField name='transWord' required />
                <SelectField name='addLang' required options={addLangOptions} />
                <SelectField
                  name='status'
                  required
                  options={statusDictOptions}
                />
              </Stack>
              <ModalFooter onClose={onClose} />
            </form>
          </FormProvider>
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default ModalEditWord;
