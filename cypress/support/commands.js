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