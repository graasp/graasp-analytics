import { Api } from '@graasp/query-client';
import {
  // AppItemType,
  CompleteMember,
  Context,
  DEFAULT_LANG,
  PermissionLevel,
} from '@graasp/sdk';
import { AppItem } from '@graasp/ui';

import { API_HOST } from '@/config/env';
import { axios } from '@/config/queryClient';

export const ITEM_DEFAULT_HEIGHT = '70vh';

const AppContent = ({
  item,
  member,
  permission = PermissionLevel.Read,
}: {
  item: any;
  member?: CompleteMember | null;
  permission?: PermissionLevel;
}): JSX.Element => (
  <AppItem
    isResizable
    item={item}
    height={ITEM_DEFAULT_HEIGHT}
    requestApiAccessToken={(payload: {
      id: string;
      key: string;
      origin: string;
    }) => Api.requestApiAccessToken(payload, { API_HOST, axios })}
    contextPayload={{
      apiHost: API_HOST,
      itemId: item.id,
      memberId: member?.id,
      permission,
      settings: item.settings,
      lang: item.settings?.lang || member?.extra?.lang || DEFAULT_LANG,
      context: Context.Analytics,
    }}
  />
);

export default AppContent;
