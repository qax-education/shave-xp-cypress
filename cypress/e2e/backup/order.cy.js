
import data from '../fixtures/order.json'

describe('pedido', () => {

    context('quando o cliente está logado', () => {

        const { customer, shaver, service } = data

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('deve poder solicitar serviços', () => {
            cy.selectShaver(shaver.name)
            cy.selectService(service.description)
            cy.confirmOrder()
            cy.hasOrder()
        })
    })
})