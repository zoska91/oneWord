import AddWordForm from 'components/ModalForm/AddWordForm';
import { Grid, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { SettingsIcon } from '@chakra-ui/icons';
import { flexCenter } from 'styles/mixins';
import { logOut } from 'db/API/auth';
import { Redirect } from 'react-router';
import PreferencesFormBottom from 'components/ModalForm/PreferencesFormBottom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

interface BottomMenuUserProps {}

interface StylesProps {
  isAddWord?: boolean;
}

const Wrapper = styled.div`
  padding-top: 40px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Header = styled(Text)<StylesProps>`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorPrimary};
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
  transition: 0.5s;
`;

const PreferencesContainer = styled.div<StylesProps>`
  padding-top: ${({ isAddWord }) => (isAddWord ? 0 : '20px')};
  position: absolute;
  background-color: ${({ theme, isAddWord }) =>
    isAddWord ? theme.colorSecondary : theme.colorLight};
  width: 60px;
  height: 60px;
  bottom: 0;
  right: 0;
  border-radius: 30px 5px 0 30px;
  transition: 0.4s;

  ${flexCenter}

  ${({ isAddWord }) =>
    !isAddWord &&
    css`
      display: block;
      width: 100%;
      height: 100%;
      bottom: -20px;
      border-radius: 20px 20px 0 0;
    `}
`;

const ActionButton = styled.button<StylesProps>`
  display: block;
  background-color: ${({ theme }) => theme.colorPrimary};
  padding: 7px 13px;
  color: ${({ theme }) => theme.colorLight};
  border-radius: 20px;
  font-weight: bold;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;

  ${flexCenter}
`;

const BottomMenuUser: FC<BottomMenuUserProps> = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isAddWord, setIsAddWord] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  // const actions = [
  //   {
  //     icon: <AddBoxIcon />,
  //     name: 'add word',
  //     onClick: () => {
  //       setIsAddWord(true);
  //     },
  //   },
  //   {
  //     icon: <ViewListIcon />,
  //     name: 'words list',
  //     onClick: () => {
  //       console.log('tu będzie lista');
  //     },
  //   },
  //   { icon: <LogoutIcon />, name: 'logout', onClick: () => handleLogout() },
  // ];

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  return (
    <>
      {redirect ? (
        <Redirect to='/' />
      ) : (
        <Wrapper>
          <Header fontSize='3xl'>{t(`form.addWordTitle`)}</Header>
          <AddWordForm />
          <PreferencesContainer isAddWord={isAddWord}>
            {!isAddWord && (
              <>
                <Header fontSize='3xl'>
                  {t(`form.preferencesTitle`)}

                  <Box
                    sx={{
                      height: 320,
                      transform: 'translateZ(0px)',
                      flexGrow: 1,
                    }}
                  >
                    <SpeedDial
                      ariaLabel='SpeedDial openIcon example'
                      sx={{ position: 'absolute', bottom: 16, right: 16 }}
                      icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    >
                      {actions.map(action => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                  {/* <SpeedDial
                    ariaLabel='Menu'
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    onClose={() => setOpenMenu(false)}
                    onOpen={() => setOpenMenu(true)}
                    open={openMenu}
                  >
                    {actions.map(action => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                          // action.onClick();
                          setOpenMenu(false);
                        }}
                      />
                    ))}
                  </SpeedDial> */}
                </Header>
                <PreferencesFormBottom />
                <Grid templateColumns='repeat(3, 1fr)' gap={1} p={2}></Grid>
              </>
            )}

            {isAddWord && (
              <button onClick={() => setIsAddWord(false)}>
                <SettingsIcon w={6} h={6} color='#ffffffae' />
              </button>
            )}
          </PreferencesContainer>
        </Wrapper>
      )}
    </>
  );
};

export default BottomMenuUser;
