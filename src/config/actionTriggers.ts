import { ActionTriggers } from '@graasp/sdk';

export const actionsDescriptionTransKeys: { [key: string]: string } = {
  [ActionTriggers.Copy]: 'COPY_ACTION_DESCRIPTION',
  [ActionTriggers.ItemDownload]: 'ITEM_DOWNLOAD_ACTION_DESCRIPTION',
  [ActionTriggers.Create]: 'CREATE_ACTION_DESCRIPTION',
  [ActionTriggers.ItemView]: 'ITEM_VIEW_ACTION_DESCRIPTION',
  [ActionTriggers.Move]: 'MOVE_ACTION_DESCRIPTION',
  [ActionTriggers.Update]: 'UPDATE_ACTION_DESCRIPTION',
  [ActionTriggers.ChatClear]: 'CHAT_CLEAR_ACTION_DESCRIPTION',
  [ActionTriggers.ChatCreate]: 'CHAT_CREATE_ACTION_DESCRIPTION',
  [ActionTriggers.ChatDelete]: 'CHAT_DELETE_ACTION_DESCRIPTION',
  [ActionTriggers.ChatUpdate]: 'CHAT_UPDATE_ACTION_DESCRIPTION',
  [ActionTriggers.CollectionView]: 'COLLECTION_VIEW_ACTION_DESCRIPTION',
  [ActionTriggers.Delete]: 'DELETE_ACTION_DESCRIPTION',
  [ActionTriggers.ItemEmbed]: 'EMBED_ITEM_DESCRIPTION',
  [ActionTriggers.ItemLike]: 'LIKE_ITEM_ACTION_DESCRIPTION',
  [ActionTriggers.ItemSearch]: 'ITEM_SEARCH_ACTION_DESCRIPTION',
  [ActionTriggers.ItemUnlike]: 'UNLIKE_ITEM_ACTION_DESCRIPTION',
  [ActionTriggers.LinkOpen]: 'OPEN_LINK_ACTION_DESCRIPTION',
};
