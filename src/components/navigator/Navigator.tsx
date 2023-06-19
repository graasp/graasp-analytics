import { useTranslation } from 'react-i18next';
import { useLocation, useMatch } from 'react-router-dom';

import { ItemRecord } from '@graasp/sdk/frontend';
import { HomeMenu, ItemMenu, Navigation } from '@graasp/ui';

import {
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  BREADCRUMBS_NAVIGATOR_ID,
  buildBreadcrumbsItemLink,
} from '../../config/selectors';

const {
  useItem,
  useParents,
  useCurrentMember,
  useChildren,
  useOwnItems,
  useSharedItems,
} = hooks;

const Navigator = (): JSX.Element => {
  const { t } = useTranslation();
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const currentMemberId = currentMember?.id;
  const { data: item, isLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const { data: parents, isLoading: areParentsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  const isParentOwned =
    (item?.creator?.id ?? parents?.first()?.creator?.id) === currentMemberId;

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const buildToItemPath = (id) => buildItemPath(id);

  const menu = [
    { name: t('Home'), id: 'home', to: HOME_PATH },
    { name: t('Shared Items'), id: 'shared', to: SHARED_ITEMS_PATH },
  ];

  const renderRoot = (thisItem?: ItemRecord) => {
    if (!thisItem) {
      return null;
    }

    return (
      <>
        <HomeMenu selected={menu[0]} elements={menu} />
        <ItemMenu
          itemId={thisItem.id}
          useChildren={
            isParentOwned ? (useOwnItems as any) : (useSharedItems as any)
          }
          buildToItemPath={buildToItemPath}
        />
      </>
    );
  };

  if (
    item === undefined &&
    pathname !== SHARED_ITEMS_PATH &&
    pathname !== HOME_PATH
  ) {
    return null;
  }

  return (
    <Navigation
      id={BREADCRUMBS_NAVIGATOR_ID}
      sx={{ marginLeft: 2 }}
      item={item}
      buildToItemPath={buildToItemPath}
      parents={parents}
      renderRoot={renderRoot}
      buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLink}
      useChildren={useChildren}
    />
  );
};

export default Navigator;
