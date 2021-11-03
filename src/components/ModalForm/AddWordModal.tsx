import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import AsideButton from '../atoms/AsideButton';
import AddWordForm from './AddWordForm';
import PreferencesForm from './PreferencesForm';

interface AddWordModalProps {
  type: string;
}

const StyledModalContent = styled(ModalContent)`
  backdrop-filter: blur(6px);
  padding: 50px;
  border-radius: 20px;
`;

const StyledModalHeader = styled(ModalHeader)`
  text-transform: uppercase;
`;

const AddWordModal: FC<AddWordModalProps> = ({ type }) => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AsideButton
        label={t(`${type}Button`)}
        top={type === 'addWord' ? 20 : 45}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
        <ModalOverlay />

        <StyledModalContent bg='rgba(255,255,255, 0.6)' borderRadius='30'>
          <StyledModalHeader fontSize='3xl'>
            {t('addNewWord')}
          </StyledModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === 'addWord' && <AddWordForm onClose={onClose} />}
            {type === 'preferences' && <PreferencesForm onClose={onClose} />}
          </ModalBody>
        </StyledModalContent>
      </Modal>
    </>
  );
};

export default AddWordModal;
