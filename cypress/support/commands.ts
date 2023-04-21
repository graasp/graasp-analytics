/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { COOKIE_KEYS } from '@graasp/sdk';

import MOCK_ITEMS from '../../src/mockServer/mockData/items';
import MOCK_MEMBERS from '../../src/mockServer/mockData/members';
import MOCK_MEMBERSHIP from '../../src/mockServer/mockData/membership';
import { buildDatabase } from '../../src/mockServer/mockServer';

Cypress.Commands.add('setUpApi', () => {
  cy.setCookie(COOKIE_KEYS.SESSION_KEY, 'session_key');
  // mock api and database
  Cypress.on('window:before:load', (win) => {
    // eslint-disable-next-line no-param-reassign
    win.database = buildDatabase({
      currentMember: MOCK_MEMBERS[0],
      items: MOCK_ITEMS,
      itemMemberships: MOCK_MEMBERSHIP,
      members: MOCK_MEMBERS,
    });
  });
});
