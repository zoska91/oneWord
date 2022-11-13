import { FC } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { StyledModalContent, StyledModalHeader } from '../ModalForm/Form.css';
import { ITodayWord } from 'types/api';
import EditWordForm from './EditWordForm';

interface ModalEditWordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditWord: FC<ModalEditWordProps> = ({ onClose, isOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <ModalOverlay />

      <StyledModalContent bg='rgba(255,255,255, 0.6)' borderRadius='30'>
        <StyledModalHeader fontSize='4xl'>
          {t(`form.editWordTitle`)}
        </StyledModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditWordForm onClose={onClose} />
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default ModalEditWord;
