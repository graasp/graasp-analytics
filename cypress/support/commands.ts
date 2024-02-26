/// <reference types="cypress" />
import { CookieKeys } from '@graasp/sdk';

import { buildDatabase } from '../../src/mockServer/database';
import MOCK_ITEMS from '../../src/mockServer/mockData/items';
import MOCK_MEMBERS from '../../src/mockServer/mockData/members';
import MOCK_MEMBERSHIP from '../../src/mockServer/mockData/membership';

declare global {
  interface Window {
    Cypress?: any;
    database?: any;
  }
}

Cypress.Commands.add('setUpApi', () => {
  cy.setCookie(CookieKeys.Session, 'session_key');
  // mock api and database
  Cypress.on('window:before:load', (win: Window) => {
    // eslint-disable-next-line no-param-reassign
    win.database = buildDatabase({
      currentMember: MOCK_MEMBERS[0],
      items: MOCK_ITEMS,
      itemMemberships: MOCK_MEMBERSHIP,
      members: MOCK_MEMBERS,
    });
  });
});
