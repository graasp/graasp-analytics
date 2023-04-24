import qs from 'qs';

import { UUID } from '@graasp/sdk';

export const ITEMS_ROUTE = 'items';
export const buildGetItemRoute = (id: UUID): string => `${ITEMS_ROUTE}/${id}`;
export const buildGetChildrenRoute = (id: UUID, ordered: boolean): string =>
  `${ITEMS_ROUTE}/${id}/children${qs.stringify(
    { ordered },
    { addQueryPrefix: true },
  )}`;
