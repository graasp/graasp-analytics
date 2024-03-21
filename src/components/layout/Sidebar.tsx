import { FC, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu, MenuItem } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';
import {
  buildAppsAnalyticsPath,
  buildItemPath,
  buildItemsAnalyticsPath,
  buildUsersAnalyticsPath,
} from '@/config/paths';
import { APP_ITEM, buildSidebarListItemId } from '@/config/selectors';

import { DataContext } from '../context/DataProvider';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { descendantApps } = useContext(DataContext);

  return (
    <GraaspMainMenu>
      <MenuItem
        onClick={() => navigate(buildItemPath(itemId))}
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
        selected={pathname === buildItemPath(itemId)}
      />
      <MenuItem
        onClick={() => navigate(buildUsersAnalyticsPath(itemId))}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
        selected={pathname === buildUsersAnalyticsPath(itemId)}
      />
      <MenuItem
        onClick={() => navigate(buildItemsAnalyticsPath(itemId))}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
        selected={pathname === buildItemsAnalyticsPath(itemId)}
      />
      {descendantApps.length ? (
        <MenuItem
          onClick={() => navigate(buildAppsAnalyticsPath(itemId))}
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
          id={buildSidebarListItemId(APP_ITEM)}
          selected={pathname === buildAppsAnalyticsPath(itemId)}
        />
      ) : (
        <></>
      )}
    </GraaspMainMenu>
  );
};

export default Sidebar;
