export const HOME_PATH = '/';
export const ITEMS_PATH = '/items';
export const buildItemPath = (id = ':itemId'): string => `${ITEMS_PATH}/${id}`;
export const SHARED_ITEMS_PATH = '/shared';
