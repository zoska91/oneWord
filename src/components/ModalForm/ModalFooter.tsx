import { FC } from 'react';
import { ModalFooter as ModalFooterComponent } from '@chakra-ui/react';
import Button from 'components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: FC<ModalFooterProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <ModalFooterComponent justifyContent='space-between' style={{ paddingTop: '80px' }}>
      <Button small onClick={onClose}>
        {t('buttons.close')}
      </Button>
      <Button dark small type='submit'>
        {t('buttons.submit')}
      </Button>
    </ModalFooterComponent>
  );
};

export default ModalFooter;
