Cypress.Commands.add('noticeErrorShouldBe', (message) => {
    cy.get('.notice-container', { timeout: 10000 })
        .should('be.visible')
        .find('.error p')
        .should('have.text', message)
})

Cypress.Commands.add('noticeSuccessShouldBe', (message) => {
    cy.get('.notice-container', { timeout: 10000 })
        .should('be.visible')
        .find('.success p')
        .should('have.text', message)
})