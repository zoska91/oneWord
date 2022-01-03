import { useState } from 'react';
import { logOut } from 'db/API/auth';

import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useTranslation } from 'react-i18next';

const useBottomMenuUser = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isAddWord, setIsAddWord] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  const actions = [
    {
      icon: <PlaylistAddOutlinedIcon />,
      name: t('actionsBottomMenu.addWord'),
      onClick: () => {
        setIsAddWord(true);
      },
    },
    {
      icon: <FormatListBulletedOutlinedIcon />,
      name: t('actionsBottomMenu.wordsList'),
      onClick: () => {
        console.log('tu będzie lista');
      },
    },
    {
      icon: <ExitToAppOutlinedIcon />,
      name: t('actionsBottomMenu.logout'),
      onClick: () => handleLogout(),
    },
  ];

  return { redirect, isAddWord, openMenu, actions, setOpenMenu, setIsAddWord };
};

export default useBottomMenuUser;
