Cypress.Commands.add('signup', (name = null, email = null, password = null) => {
    cy.visit('/signup')

    cy.get('form h1')
        .should('have.text', 'Faça seu cadastro')

    cy.get('input[placeholder="Nome completo"]').as('name')
    cy.get('input[placeholder="Seu melhor email"]').as('email')
    cy.get('input[placeholder="Sua senha secreta"]').as('password')

    if (name) {
        cy.get('@name').type(name)
    }

    if (email) {
        cy.get('@email').type(email)
    }

    if (password) {
        cy.get('@password').type(password)
    }

    cy.contains('button', 'Cadastrar')
        .click()
})