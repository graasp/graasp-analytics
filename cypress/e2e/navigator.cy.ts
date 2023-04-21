import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  HOME_MENU_OWN_MENUITEM_ID,
  ROOT_MENU_DROPDOWN_BUTTON_ID,
  ROOT_MENU_ID,
  buildBreadcrumbsItemLink,
  buildMenuDropdownButton,
  buildMenuItem,
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
    cy.get(`#${HOME_MENU_OWN_MENUITEM_ID}`).should('be.visible');
  });

  it('Navigate own items', () => {
    // The testing file structure is in the following
    // - My Items
    //  - folder1
    //    - folder2
    //      - document2
    //  - document1
    const FOLDER1_ID = '1111-bbbb';
    const FOLDER2_ID = '2222-bbbb';
    const DOCUMENT1_ID = '1234-abcd';
    const DOCUMENT2_ID = '5678-abcd';

    // Navigate to the folder1 by the dropdown menu
    cy.visit('/');
    cy.get(`#${ROOT_MENU_DROPDOWN_BUTTON_ID}`).click();
    cy.get(`#${buildMenuItem(FOLDER1_ID, ROOT_MENU_ID)}`)
      .should('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER1_ID)}`).should('be.visible');
    cy.get(`#${buildMenuDropdownButton(FOLDER1_ID)}`).should('be.visible');
    cy.url().should('include', `${FOLDER1_ID}`);

    // Navigate to the folder2 by the dropdown menu
    cy.get(`#${buildMenuDropdownButton(FOLDER1_ID)}`).click();
    cy.get(`#${buildMenuItem(FOLDER2_ID, FOLDER1_ID)}`)
      .should('exist')
      .and('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER2_ID)}`).should('be.visible');
    cy.get(`#${buildMenuDropdownButton(FOLDER2_ID)}`).should('be.visible');
    cy.url().should('include', `${FOLDER2_ID}`);

    // Navigate to the document2 by the dropdown menu
    cy.get(`#${buildMenuDropdownButton(FOLDER2_ID)}`).click();
    cy.get(`#${buildMenuItem(DOCUMENT2_ID, FOLDER2_ID)}`)
      .should('exist')
      .and('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER1_ID)}`).should('be.visible');
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER2_ID)}`).should('be.visible');
    cy.get(`#${buildBreadcrumbsItemLink(DOCUMENT2_ID)}`).should('be.visible');
    cy.get(`#${buildMenuDropdownButton(DOCUMENT2_ID)}`).should('not.exist');
    cy.url().should('include', `${DOCUMENT2_ID}`);

    // Navigate back to the folder2 by the breadcrumbs item
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER2_ID)}`).click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER1_ID)}`).should('be.visible');
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER2_ID)}`).should('be.visible');
    cy.get(`#${buildBreadcrumbsItemLink(DOCUMENT2_ID)}`).should('not.exist');
    cy.url().should('include', `${FOLDER2_ID}`);

    // Navigate to the document1 by the dropdown menu
    cy.get(`#${ROOT_MENU_DROPDOWN_BUTTON_ID}`).click();
    cy.get(`#${buildMenuItem(DOCUMENT1_ID, ROOT_MENU_ID)}`)
      .should('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(DOCUMENT1_ID)}`).should('be.visible');
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER1_ID)}`).should('not.exist');
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER2_ID)}`).should('not.exist');
    cy.get(`#${buildBreadcrumbsItemLink(DOCUMENT2_ID)}`).should('not.exist');
    cy.url().should('include', `${DOCUMENT1_ID}`);
  });

  it('Navigate shared items', () => {
    // The testing file structure is in the following
    // - Shared Items
    //  - folder3
    //    - sharedFolder1
    //      - sharedDocument1
    const FOLDER3_ID = '1111-kkkk';
    const SHARED_FOLDER1_ID = '1234-kkkk';
    const SHARED_DOCUMENT1_ID = '5678-kkkk';

    // Navigate to the shared folder1 by the dropdown menu
    cy.visit('/shared');
    cy.get(`#${ROOT_MENU_DROPDOWN_BUTTON_ID}`).click();
    cy.get(`#${buildMenuItem(SHARED_FOLDER1_ID, ROOT_MENU_ID)}`)
      .should('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER3_ID)}`).should('not.exist');
    cy.get(`#${buildBreadcrumbsItemLink(SHARED_FOLDER1_ID)}`).should(
      'be.visible',
    );
    cy.url().should('include', `${SHARED_FOLDER1_ID}`);

    // Navigate to the shared document1 by the dropdown menu
    cy.get(`#${buildMenuDropdownButton(SHARED_FOLDER1_ID)}`).click();
    cy.get(`#${buildMenuItem(SHARED_DOCUMENT1_ID, SHARED_FOLDER1_ID)}`)
      .should('exist')
      .and('be.visible')
      .click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER3_ID)}`).should('not.exist');
    cy.get(`#${buildBreadcrumbsItemLink(SHARED_FOLDER1_ID)}`).should(
      'be.visible',
    );
    cy.get(`#${buildBreadcrumbsItemLink(SHARED_DOCUMENT1_ID)}`).should(
      'be.visible',
    );
    cy.url().should('include', `${SHARED_DOCUMENT1_ID}`);

    // Navigate to the shared folder1 by the breadcrumbs item
    cy.get(`#${buildBreadcrumbsItemLink(SHARED_FOLDER1_ID)}`).click();
    cy.wait(2000);
    // Check the layout and the url
    cy.get(`#${buildBreadcrumbsItemLink(FOLDER3_ID)}`).should('not.exist');
    cy.get(`#${buildBreadcrumbsItemLink(SHARED_FOLDER1_ID)}`).should(
      'be.visible',
    );
    cy.url().should('include', `${SHARED_FOLDER1_ID}`);
  });
});
