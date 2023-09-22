describe('Login page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Login')
  })

  it('shows error message when the input is invalid', () => {
    cy.visit('/')

    cy.get('#id').type('id')
    cy.get('#pass').type('pass')

    cy.get('form').submit()
    cy.get('p').should('contain', 'wrong!')
  })

  it('navigates to the home view after login', () => {
    cy.visit('/')

    cy.get('#id').type('abc')
    cy.get('#pass').type('pass')
    cy.get('form').submit()

    cy.get('h2').should('contain', 'Add Member')
  })
})
