import { Api } from '@graasp/query-client';
import {
  AppItemType,
  CompleteMember,
  Context,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { AppItem } from '@graasp/ui';

import { API_HOST } from '@/config/env';
import { axios, hooks } from '@/config/queryClient';

export const ITEM_DEFAULT_HEIGHT = '70vh';

const AppContent = ({
  item,
  member,
}: {
  item: AppItemType;
  member?: CompleteMember | null;
}): JSX.Element => {
  const { data: memberships } = hooks.useItemMemberships(item.id);

  const userMemberships = memberships
    ?.filter((m) => m.member.id === member?.id)
    .reduce((acc: PermissionLevel[], curr) => [...acc, curr.permission], []);

  const permission =
    userMemberships && PermissionLevelCompare.getHighest(userMemberships);

  console.log(permission, 'permission');
  const contextPayload = {
    apiHost: API_HOST,
    itemId: item.id,
    memberId: member?.id,
    permission: permission || PermissionLevel.Read,
    settings: item.settings,
    lang: item.settings?.lang || member?.extra?.lang || DEFAULT_LANG,
    context: Context.Analytics,
  };
  return (
    <AppItem
      isResizable
      item={item}
      height={ITEM_DEFAULT_HEIGHT}
      requestApiAccessToken={(payload: {
        id: string;
        key: string;
        origin: string;
      }) => Api.requestApiAccessToken(payload, { API_HOST, axios })}
      contextPayload={contextPayload}
    />
  );
};

export default AppContent;
