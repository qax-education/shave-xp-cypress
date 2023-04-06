Cypress.Commands.add('selectShaver', (name) => {
    cy.contains('figcaption h3', name)
        .should('be.visible')
        .click()

    cy.get('figcaption h3')
        .should('be.visible')
        .should('have.text', name)
})

Cypress.Commands.add('selectService', (name) => {
    cy.contains('.catalog-item h3', name)
        .should('be.visible')
        .click()

    cy.get('.swal2-title')
        .should('be.visible')
        .should('have.text', name)
})

Cypress.Commands.add('confirmOrder', () => {
    cy.get('.swal2-confirm').click()
})

Cypress.Commands.add('hasOrder', () => {
    cy.get('h1')
        .should('be.visible')
        .should('have.text', 'PEDIDO RECEBIDO')

    cy.get('p')
        .should('be.visible')
        .should('have.text', 'Agora e só aguardar para ser atendido(a)!')
})