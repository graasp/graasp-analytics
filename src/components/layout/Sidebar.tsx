import { FC, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

import { MainMenu as GraaspMainMenu } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';
import {
  GENERAL_STATISTICS_PATH,
  HOME_PATH,
  buildAppsAnalyticsPath,
  buildExportAnalyticsPath,
  buildItemPath,
  buildItemsAnalyticsPath,
  buildUsersAnalyticsPath,
} from '@/config/paths';
import { APP_ITEM, buildSidebarListItemId } from '@/config/selectors';

import { DataContext } from '../context/DataProvider';
import LinkMenuItem from '../custom/LinkMenuItem';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();
  const { pathname } = useLocation();
  const { descendantApps } = useContext(DataContext);

  const disableMenuItem = pathname === HOME_PATH;

  return (
    <GraaspMainMenu>
      <LinkMenuItem
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL_STATISTIC')}
        to={GENERAL_STATISTICS_PATH}
      />
      <LinkMenuItem
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
        to={buildItemPath(itemId)}
        disabled={disableMenuItem}
      />
      <LinkMenuItem
        to={buildUsersAnalyticsPath(itemId)}
        disabled={disableMenuItem}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
      />
      <LinkMenuItem
        to={buildItemsAnalyticsPath(itemId)}
        disabled={disableMenuItem}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
      />

      {descendantApps.length ? (
        <LinkMenuItem
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
          id={buildSidebarListItemId(APP_ITEM)}
          to={buildAppsAnalyticsPath(itemId)}
          disabled={disableMenuItem}
        />
      ) : (
        <></>
      )}
      <LinkMenuItem
        to={buildExportAnalyticsPath(itemId)}
        disabled={disableMenuItem}
        icon={<CloudDownloadIcon />}
        text={t('TAB_EXPORT')}
      />
    </GraaspMainMenu>
  );
};

export default Sidebar;
