import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = data.success
            cy.createUser(user)

            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)
        })

        it('campos obrigatórios', () => {
            cy.submitLogin()

            cy.get('.alert-error')
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })
        })
    })

    context('senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                cy.submitLogin('papito@teste.com.br', p)
                cy.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                cy.submitLogin(e, 'pwd123')
                cy.alertShouldBe('Informe um email válido')
            })
        })
    })
})