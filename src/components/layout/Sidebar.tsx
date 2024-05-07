import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  ItemType,
  PermissionLevel,
  PermissionLevelCompare,
  getLinkExtra,
  getMimetype,
} from '@graasp/sdk';
import { MainMenu as GraaspMainMenu, ItemIcon, Thumbnail } from '@graasp/ui';

import truncate from 'lodash.truncate';

import { ITEM_NAME_MAX_LENGTH } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';
import {
  GENERAL_STATISTICS_PATH,
  buildAppsAnalyticsPath,
  buildExportAnalyticsPath,
  buildItemPath,
  buildItemsAnalyticsPath,
  buildUsersAnalyticsPath,
} from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  APP_ITEM,
  MENU_ITEM_ID,
  buildSidebarListItemId,
} from '@/config/selectors';

import { DataContext } from '../context/DataProvider';
import LinkMenuItem from '../custom/LinkMenuItem';

const Sidebar: FC = () => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();
  const { descendantApps } = useContext(DataContext);

  const { data: item } = hooks.useItem(itemId);

  const menuItems = [
    <LinkMenuItem
      icon={<BarChartIcon />}
      text={t('TAB_GENERAL_STATISTIC')}
      to={GENERAL_STATISTICS_PATH}
    />,
  ];
  const { data: thumbnailUrl, isLoading } = hooks.useItemThumbnailUrl({
    id: item?.id,
  });

  if (item) {
    const linkExtra =
      item?.type === ItemType.LINK ? getLinkExtra(item.extra) : undefined;

    const iconSrc = linkExtra?.icons?.[0];
    const thumbnailSrc = linkExtra?.thumbnails?.[0];

    const defaultValueComponent = (
      <ItemIcon
        type={item.type}
        iconSrc={iconSrc}
        alt={item.name}
        mimetype={getMimetype(item.extra)}
      />
    );

    const itemMenuOptions = [
      <LinkMenuItem
        icon={<BarChartIcon />}
        text={t('TAB_GENERAL')}
        to={buildItemPath(itemId)}
        key={'TAB_GENERAL'}
      />,
      <LinkMenuItem
        to={buildUsersAnalyticsPath(itemId)}
        icon={<PersonIcon />}
        text={t('TAB_USERS')}
        key={'TAB_USERS'}
      />,
      <LinkMenuItem
        to={buildItemsAnalyticsPath(itemId)}
        icon={<FolderIcon />}
        text={t('TAB_ITEMS')}
        key={'TAB_ITEMS'}
      />,
    ];
    if (descendantApps.length) {
      itemMenuOptions.push(
        <LinkMenuItem
          icon={<AppsIcon />}
          text={t('TAB_APPS')}
          id={buildSidebarListItemId(APP_ITEM)}
          to={buildAppsAnalyticsPath(itemId)}
          key={'TAB_APPS'}
        />,
      );
    }

    // read access users don't have permission over export actions
    if (
      item?.permission &&
      PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
    ) {
      itemMenuOptions.push(
        <LinkMenuItem
          to={buildExportAnalyticsPath(itemId)}
          icon={<CloudDownloadIcon />}
          text={t('TAB_EXPORT')}
          key={'TAB_EXPORT'}
        />,
      );
    }

    const ItemMenu = () => (
      <List>
        <ListItemButton sx={{ paddingY: 0 }}>
          <ListItemIcon>
            <Thumbnail
              url={thumbnailUrl ?? thumbnailSrc}
              maxWidth={30}
              maxHeight={30}
              alt={item.name}
              isLoading={isLoading}
              defaultComponent={defaultValueComponent}
            />
          </ListItemIcon>
          <ListItemText
            primary={truncate(item.name, { length: ITEM_NAME_MAX_LENGTH })}
          />
        </ListItemButton>
        <List
          component="div"
          sx={{
            pl: 2,
            pt: 0,
            [`#${MENU_ITEM_ID} div`]: { paddingTop: 0, paddingBottom: 0.5 },
          }}
        >
          {itemMenuOptions}
        </List>
      </List>
    );
    menuItems.push(<ItemMenu />);
  }

  return <GraaspMainMenu>{menuItems}</GraaspMainMenu>;
};

export default Sidebar;
