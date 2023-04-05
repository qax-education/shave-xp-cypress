
class OrderPage {

    hasOrder() {
        cy.get('h1')
            .should('be.visible')
            .should('have.text', 'PEDIDO RECEBIDO')

        cy.get('p')
            .should('be.visible')
            .should('have.text', 'Agora e só aguardar para ser atendido(a)!')
    }

}

export default new OrderPage()