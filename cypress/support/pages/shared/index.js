class SharedSteps {
    noticeErrorShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    noticeSucessShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.success p')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
    }
}

export default new SharedSteps()