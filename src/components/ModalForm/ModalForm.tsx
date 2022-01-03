import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import AsideButton from '../atoms/AsideButton';
import AddWordForm from './AddWordForm';
import PreferencesForm from './PreferencesForm';
import LoginForm from '../auth/LoginForm';
import SignForm from '../auth/SignForm';

import { StyledModalContent, StyledModalHeader } from './Form.css';

interface ModalFormProps {
  type: string;
  top: number;
  modalSize?: string;
}

const ModalForm: FC<ModalFormProps> = ({ type, top, modalSize = '2xl' }) => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AsideButton label={t(`form.${type}Title`)} top={top} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
        <ModalOverlay />

        <StyledModalContent bg='rgba(255,255,255, 0.6)' borderRadius='30'>
          <StyledModalHeader fontSize='4xl'>
            {t(`form.${type}Title`)}
          </StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === 'addWord' && <AddWordForm onClose={onClose} />}
            {type === 'preferences' && <PreferencesForm onClose={onClose} />}
            {type === 'login' && <LoginForm onClose={onClose} />}
            {type === 'signin' && <SignForm onClose={onClose} />}
          </ModalBody>
        </StyledModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;
