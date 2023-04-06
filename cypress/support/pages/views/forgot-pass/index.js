

class ForgotPassPage {

    go() {
        cy.visit('/forgot-password')

        // Checkpoint para garantir que estamos indo para o lugar certo
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }

    submit(email) {
        cy.get('input[placeholder$=mail]')
            .type(email)

        cy.contains('button', 'Recuperar')
            .click()
    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectedText)
    }

}

export default new ForgotPassPage()