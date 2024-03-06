import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';

const Sidebar = ({ isContainApp }: { isContainApp: boolean }): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <GraaspMainMenu>
      <MenuItem
        onClick={() => scrollTo('general')}
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
      />
      <MenuItem
        onClick={() => scrollTo('users')}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
      />
      <MenuItem
        onClick={() => scrollTo('items')}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
      />
      {isContainApp ? (
        <MenuItem
          onClick={() => scrollTo('apps')}
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
        />
      ) : (
        <></>
      )}
    </GraaspMainMenu>
  );
};

export default Sidebar;
