describe('app', () => {
  it('deve estar online', () => {
    cy.visit('http://localhost:3000')
  })
})