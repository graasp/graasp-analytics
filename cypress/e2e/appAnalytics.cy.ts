import { buildSidebarListItemId } from '@/config/selectors';

import { buildItemPath } from '../../src/config/paths';
import MOCK_ITEMS, {
  APP_ITEM_WITH_PARENT,
  CALC_APP_ITEM,
} from '../fixtures/items';

const visitItemPage = (item: { id: string }) => {
  cy.visit(buildItemPath(item.id));
};

const checkContainAppAnalytics = () => {
  cy.get(`#${buildSidebarListItemId('app')}`).should('exist');
  cy.get(`#apps`).should('exist');
};

describe('Check An App Item has an app analytics ', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [CALC_APP_ITEM] });
  });

  it('Check that sidebar contain apps item list and apps section for app item', () => {
    visitItemPage(CALC_APP_ITEM);
    checkContainAppAnalytics();
  });
});

describe('Check Item with descendants app has an app analytics ', () => {
  beforeEach(() => {
    cy.setUpApi({
      items: [MOCK_ITEMS[0], APP_ITEM_WITH_PARENT],
    });
  });

  it('Check that sidebar contain apps item list and apps section for parent with descendent app item', () => {
    visitItemPage(MOCK_ITEMS[0]);
    checkContainAppAnalytics();
  });
});

describe('Check Non-app has not an app analytics ', () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it('Check that app section and list is not exist', () => {
    visitItemPage(MOCK_ITEMS[1]);
    cy.get(`#${buildSidebarListItemId('app')}`).should('not.exist');
    cy.get(`#apps`).should('not.exist');
  });
});
