//github api test
describe('GitHub Login Test', () => {
  it('Should log in to GitHub', () => {
    cy.visit('https://github.com/login');

    // Enter username and ensure password field is enabled
    cy.get('#login_field').type('#username').trigger('input');
    cy.wait(500);
    
    // Ensure password field is enabled before typing
    cy.get('#password', { timeout: 10000 })
      .should('not.be.disabled')
      .type('#password', { log: false });

    // Click login button
    cy.get('input[name="commit"]').click();

     // Verify successful login
     // Verify successful login by checking URL contains 'github.com'
cy.url({ timeout: 15000 }).should('include', 'github.com');

// Click on the profile avatar to open the dropdown
cy.get('.Button-label > .avatar')
  .click();


// Click "Your repositories" when it appears
cy.contains('Your repositories', { timeout: 5000 }).click();

// Verify the repositories page is loaded
// Scroll down until the repository link is found
cy.get('body').then(($body) => {
  if ($body.find(':nth-child(12) > .col-10 > .d-inline-block > .wb-break-all > a').length) {
    // If repository is found, click on it
    cy.get(':nth-child(12) > .col-10 > .d-inline-block > .wb-break-all > a')
      .should('be.visible')
      .click();
  } else {
    // Scroll and retry if not found
    cy.scrollTo('bottom');
    cy.wait(2000); // Allow time for repositories to load
    cy.get(':nth-child(12) > .col-10 > .d-inline-block > .wb-break-all > a')
      .should('be.visible')
      .click();
  }
});
cy.get('[data-content="Actions"]').click(); // Click on the Actions tab
cy.get('#check_suite_32334615764 > .d-table > .v-align-top > .d-flex > .h4').click(); // Click on the latest workflow run
cy.get('.d-block > a')
  .should('be.visible') // Ensure element is visible
  .click(); // Click the latest workflow run


// // Verify successful navigation to the repository
// cy.url().should('include', 'github.com/your_username/');
// cy.get('strong a').should('be.visible'); // Check if repository name is visible


  });
});
