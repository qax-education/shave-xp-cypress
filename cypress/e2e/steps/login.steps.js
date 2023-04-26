import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

let user;

Given("que tenho o seguinte usuário:", function (userDataTable) {
    user = userDataTable.rowsHash()
    cy.createUser(user)
});

Given("que esse usuário tem senha incorreta", function () {
    user.password = 'abc123'
});

Given("que acesso o totem", function () {
    cy.visit('/')
});

When("submeto essas credenciais", function () {
    cy.submitLogin(user.email, user.password)
});

Then("sou autenticado autenticado com sucesso", function () {
    cy.userShouldBeLoggedIn(user.name)
});

Then("devo ver a mensagem de alerta {string}", function (message) {
    cy.noticeErrorShouldBe(message)
});
