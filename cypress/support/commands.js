// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

Cypress.Commands.add('createUser', (user) => {

    // cy.request({
    //     method: 'DELETE',
    //     url: 'http://localhost:5000/user/' + user.email
    // }).then(function (response) {
    //     expect(response.status).to.eq(204)
    // })

    cy.log(JSON.stringify(user))

    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/user',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('recoveryPass', (email) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/password/forgot',
        body: { email: email }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:5000/token/' + email
    }).then(result => {
        expect(result.status).to.eql(200)
        cy.log(result.body.token)
        Cypress.env('passToken', result.body.token)
    })
})

Cypress.Commands.add('uiLogin', (user) => {
    loginPage.submit(user.email, user.password)
    shaversPage.header.userShouldBeLoggedIn(user.name)
})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: { email: user.email, password: user.password }
    }).then(response => {
        expect(response.status).to.eql(200)

        const {user, token} = response.body

        window.localStorage.setItem('@ShaveXP:token', token)
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })
    cy.visit('/')
})