import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';

import AsideButton from 'components/atoms/AsideButton';
import ModalForm from 'components/ModalForm/ModalForm';
import { logOut } from 'db/API/auth';
import { useTranslation } from 'react-i18next';

interface AsideMenuProps {
  setRedirect?: Dispatch<SetStateAction<boolean>>;
  type: string;
}

const Wrapper = styled.div`
  z-index: 20;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
`;

const AsideMenu: FC<AsideMenuProps> = ({ setRedirect, type }) => {
  const { t } = useTranslation();

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success' && setRedirect) setRedirect(true);
  };

  return (
    <Wrapper>
      {type === 'user' && (
        <>
          <ModalForm type='addWord' />
          <ModalForm type='preferences' modalSize='4xl' />
          <ModalForm type='wordsList' modalSize='4xl' />
          <AsideButton small label={t(`logout`)} onClick={handleLogout} />
        </>
      )}
      {type === 'home' && (
        <>
          <ModalForm type='login' />
          <ModalForm type='signin' />
        </>
      )}
    </Wrapper>
  );
};

export default AsideMenu;
