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
  padding: 40px;
  border-radius: 20px;
`;

const StyledModalHeader = styled(ModalHeader)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorPrimary};
  text-shadow: 1px 1px 5px #ffffffae;
  font-family: 'Josefin Sans', sans-serif;
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={type === 'addWord' ? '2xl' : '4xl'}
      >
        <ModalOverlay />

        <StyledModalContent bg='rgba(255,255,255, 0.6)' borderRadius='30'>
          <StyledModalHeader fontSize='4xl'>
            {t(
              type === 'addWord' ? 'addNewWordTitle' : 'preferencesForm.title'
            )}
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
