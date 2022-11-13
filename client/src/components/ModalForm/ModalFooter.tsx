import { FC } from 'react';
import { Center, ModalFooter as ModalFooterComponent } from '@chakra-ui/react';
import Button from 'components/atoms/Button';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'common/useResizeWindows';

interface ModalFooterProps {
  onClose?: () => void;
}

const ModalFooter: FC<ModalFooterProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  return (
    <>
      {onClose ? (
        <Center
          justifyContent='space-between'
          style={{
            paddingTop: width > 768 ? '80px' : '40px',
            paddingBottom: 20,
          }}
        >
          <Button small={width < 768} onClick={onClose}>
            {t('buttons.close')}
          </Button>
          <Button dark small={width < 768} type='submit'>
            {t('buttons.submit')}
          </Button>
        </Center>
      ) : (
        <Center>
          <Button dark type='submit'>
            {t('buttons.submit')}
          </Button>
        </Center>
      )}
    </>
  );
};

export default ModalFooter;
