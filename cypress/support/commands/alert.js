Cypress.Commands.add('alertShouldBe', (message) => {
    cy.get('.alert-error')
        .should('be.visible')
        .should('have.text', message)
})