import { Action, ActionData, Context } from '@graasp/sdk';

import MOCK_ITEMS from './items';
import MOCK_MEMBERS from './members';
import { DAY, DUMMY_TIMESTAMP, HOUR } from './util';

const MOCK_ACTIONS: Action[] = [
  {
    id: '1234',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'create',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 11 * HOUR),
  },
  {
    id: '12342',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 10 * HOUR),
  },
  {
    id: '12344',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR),
  },
  {
    id: '12345',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR),
  },
  {
    id: '12346',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[0],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - DAY + 11 * HOUR),
  },
  {
    id: 'sss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
  },

  {
    id: 'asss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
  },

  {
    id: 'aasss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'aaasss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'aaaassss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'aaaaasssss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'aaaaaaasssssss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'aaaaaaasssssss',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[1],
    view: Context.Builder,
    type: 'update',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP + 12 * HOUR),
  },

  {
    id: 'ddd',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'copy',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
  },
  {
    id: 'dddd',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'copy',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
  },
  {
    id: 'ddddd',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'move',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
  },
  {
    id: 'dddddd',
    item: MOCK_ITEMS[2],
    member: MOCK_MEMBERS[2],
    view: Context.Builder,
    type: 'move',
    extra: {},
    createdAt: new Date(DUMMY_TIMESTAMP - 2 * DAY + 12 * HOUR),
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
