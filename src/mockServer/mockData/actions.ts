import { Action, ActionData, Context } from '@graasp/sdk';

import MOCK_ITEMS from './items';
import MOCK_MEMBERS from './members';
import { DAY, DUMMY_TIMESTAMP, HOUR } from './util';

const MOCK_ACTIONS: Action[] = [
  {
    id: '712427d1-258a-0004-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'create',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 11 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-0000-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 10 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-0001-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-0002-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-0003-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1111-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1112-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1113-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1114-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1115-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1116-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1117-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-1118-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-2222-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'copy',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-2223-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'copy',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-2224-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'move',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
  {
    id: '712427d1-258a-2225-926b-8b57d63042e6',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'move',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR).toISOString(),
  },
];

const MOCK_ACTION_DATA: ActionData = {
  actions: MOCK_ACTIONS,
  descendants: [],
  item: MOCK_ITEMS[2],
  itemMemberships: [],
  members: MOCK_MEMBERS,
  metadata: {
    numActionsRetrieved: 10,
    requestedSampleSize: 5000,
  },
};

export default MOCK_ACTION_DATA;
