
import shaversPage from '../support/pages/shavers'
import catalogPage from '../support/pages/catalog'
import orderPage from '../support/pages/order'

import data from '../fixtures/order.json'

describe('pedido', () => {

    context('quando o cliente está logado', () => {

        const { customer, shaver, service } = data

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('deve poder solicitar serviços', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)

            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)

            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })
    })
})