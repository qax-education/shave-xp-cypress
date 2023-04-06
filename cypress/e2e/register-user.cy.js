import registerUserPage from '../support/pages/views/register-user'

import data from '../fixtures/users-register.json'

describe('faça seu cadastro', () => {
    context('quando submeto o formulário', () => {
        it('deve cadastrar usuário com sucesso', () => {
            const user = data.success

            registerUserPage.go()

            cy.deleteUser(user)

            registerUserPage.submit(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            registerUserPage.shared.noticeSucessShouldBe(message)
        })

        it('não deve recadastrar um email que já existe', () => {
            const user = data.sameEmail

            registerUserPage.go()

            cy.createUser(user)

            registerUserPage.submit(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'
            registerUserPage.shared.noticeErrorShouldBe(message)
        })

        it('campos obrigatórios', () => {
            registerUserPage.submit()

            registerUserPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`não deve cadastrar com a senha: ${p}`, () => {
                registerUserPage.submit('Papito Rocks', 'papito@teste.com.br', p)
                registerUserPage.shared.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`não deve cadastrar com o email: ${e}`, () => {
                registerUserPage.submit('Agatha França', e, 'pwd123')
                registerUserPage.shared.alertShouldBe('Informe um email válido')
            })
        })
    })
})