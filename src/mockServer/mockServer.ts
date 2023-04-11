import { Model, RestSerializer, createServer } from 'miragejs';

import { API_ROUTES } from '@graasp/query-client';

import { Item, Member } from './types';

const {
  buildGetItemRoute,
  GET_CURRENT_MEMBER_ROUTE,
  GET_OWN_ITEMS_ROUTE,
  SHARED_ITEM_WITH_ROUTE,
} = API_ROUTES;

type Database = {
  currentMember?: Member;
  items?: Item[];
  // itemMemberships?: ItemMembership[];
  members?: Member[];
};

const ApplicationSerializer = RestSerializer.extend({
  root: false,
  embed: true,
});

export const buildDatabase = ({
  currentMember,
  items = [],
  members,
}: Partial<Database> = {}) => ({
  currentMember,
  items,
  members: members ?? [currentMember],
});

export const mockServer = ({
  urlPrefix,
  database = buildDatabase(),
  externalUrls = [],
}: {
  urlPrefix?: string;
  database?: Database;
  externalUrls?: string[];
} = {}) => {
  const { items, members } = database;
  const [currentMember] = members;

  return createServer({
    // environment
    urlPrefix,
    models: {
      item: Model,
      member: Model,
    },

    serializers: {
      item: ApplicationSerializer,
      member: ApplicationSerializer,
    },
    seeds(server) {
      members?.forEach((m) => {
        server.create('member', m);
      });
      items?.forEach((i) => {
        server.create('item', i);
      });
    },
    routes() {
      // get current member
      this.get(`/${GET_CURRENT_MEMBER_ROUTE}`, () => currentMember);

      // get item
      this.get(`/${buildGetItemRoute(':id')}`, (schema, request) => {
        const itemId = request.url.split('/').at(-1);
        return schema.find('item', itemId);
      });

      // get children
      this.get(`/items/:id/children`, (schema, request) => {
        const itemId = request.url.split('/').at(-2);
        return schema
          .all('item')
          .filter(({ id, path }) =>
            path.includes(
              `${itemId.replace(/-/g, '_')}.${id.replace(/-/g, '_')}`,
            ),
          );
      });

      // get own item
      this.get(`/${GET_OWN_ITEMS_ROUTE}`, (schema) =>
        schema
          .all('item')
          .filter(
            ({ id, creator, path }) =>
              creator === currentMember.id && id === path.replace(/_/g, '-'),
          ),
      );

      // get shared item
      this.get(`/${SHARED_ITEM_WITH_ROUTE}`, () => []);

      // passthrough external urls
      externalUrls.forEach((url) => {
        this.passthrough(url);
      });
    },
  });
};

export default mockServer;
