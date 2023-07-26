import { Navigation, ItemMenu, HomeMenu } from '@graasp/ui';

import { useLocation, useMatch } from 'react-router-dom';

import {
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  ROOT_MENU_ID,
  buildBreadcrumbsItemLink,
} from '../../config/selectors';

const { useItem, useParents, useCurrentMember, useSharedItems, useOwnItems, useChildren } = hooks;


const Navigator = (): JSX.Element => {
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const { data: item, isLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const { data: parents, isLoading: areParentsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  const isParentOwned =
    (item?.creator?.id ?? parents?.first()?.creator?.id) === currentMember?.id;

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const buildToItemPath = (id: string) => buildItemPath(id);

  const menu = [
    {
      name: 'My Items',
      id: 'home',
      to: HOME_PATH,
    },
    {
      name: 'Shared Items',
      id: 'shared',
      to: SHARED_ITEMS_PATH,
    },
  ];

  const renderRoot = () => {
    // no access to root if signed out
    if (!currentMember) {
      return null;
    }

    const selected =
      isParentOwned || pathname === HOME_PATH ? menu[0] : menu[1];

    return (
      <>
        <HomeMenu
          selected={selected}
          elements={menu}
          homeDropdownId={HOME_MENU_DROPDOWN_BUTTON_ID}
          buildMenuItemId={buildBreadcrumbsItemLink}
        />
        <ItemMenu
          itemId="root"
          useChildren={
            isParentOwned || pathname === HOME_PATH
              ? (useOwnItems as any)
              : useSharedItems  as any
          }
          buildToItemPath={buildToItemPath}
        />
      </>
    );
  };

  if (
    !item &&
    pathname !== SHARED_ITEMS_PATH &&
    pathname !== HOME_PATH
  ) {
    return null;
  }

  return (
    <Navigation
      id={ROOT_MENU_ID}
      sx={{ paddingLeft: 2 }}
      item={item}
      buildToItemPath={buildToItemPath}
      parents={parents}
      renderRoot={renderRoot}
      buildMenuItemId={buildBreadcrumbsItemLink}
      useChildren={useChildren as any}
    />
  );
};

export default Navigator;
