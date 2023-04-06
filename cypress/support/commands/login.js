Cypress.Commands.add('submitLogin', (email = null, password = null) => {
    cy.visit('/')

    cy.get('input[placeholder$=email]').as('email')
    cy.get('input[placeholder*=senha]').as('password')

    if (email) {
        cy.get('@email').type(email)
    }

    if (password) {
        cy.get('@password').type(password)
    }

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('userShouldBeLoggedIn', (name) => {
    const firstName = name.split(' ')[0]

    cy.get('.logged-user div a')
        .should('be.visible')
        .should('have.text', 'Olá, ' + firstName)
})

Cypress.Commands.add('requestPassword', (email) => {
    cy.visit('/forgot-password')

    // Checkpoint para garantir que estamos indo para o lugar certo
    cy.get('form h1')
        .should('have.text', 'Recuperar senha')

    cy.get('input[placeholder$=mail]')
        .type(email)

    cy.contains('button', 'Recuperar')
        .click()
})


Cypress.Commands.add('resetPassword', (token, newPass, confirmPass) => {
    cy.visit('/reset-password?token=' + token)

    cy.get('form h1')
        .should('have.text', 'Resetar senha')

    cy.get('input[placeholder="Nova senha"]')
        .type(newPass)

    cy.get('input[placeholder="Confirmação da senha"]')
        .type(confirmPass)

    cy.contains('button', 'Alterar senha')
        .click()
})

// Helper
Cypress.Commands.add('uiLogin', (user) => {
    cy.submitLogin(user.email, user.password)
    cy.userShouldBeLoggedIn(user.name)
})