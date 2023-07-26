import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  HOME_MENU_OWN_MENUITEM_ID,
  buildBreadcrumbsItemLink,
} from '../../src/config/selectors';

describe('Breadcrumbs', () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it('Home menu layout', () => {
    cy.visit('/');

    // menuitem should not exist before clicking the dropdown button
    cy.get(`#${HOME_MENU_OWN_MENUITEM_ID}`).should('not.exist');
    cy.get(`#${HOME_MENU_DROPDOWN_BUTTON_ID}`).click();

    // menuitem should be visible after clicking the dropdown button
    cy.get(`#${buildBreadcrumbsItemLink('home')}`).should('be.visible');
  });

  
});
