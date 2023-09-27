describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user').type('abc')
    cy.get('#pass').type('pass')
    cy.get('form').submit()
  })

  it('successfully loads', () => {
    cy.get('h2').should('contain', 'Add')
  })

  it('adds an item to the list', () => {
    cy.get('#name').type('xyz')
    cy.get('form').submit()
    cy.get('table').should('contain', 'xyz')
  })

  it('deletes an item from the list', () => {
    cy.contains('tr', 'abc').within(() => {
      cy.contains('button', 'Delete').click()
    })
    cy.get('table').should('not.contain', 'abc')
  })

  it('edits an item in the list', () => {
    cy.contains('tr', 'abc').within(() => {
      cy.contains('button', 'Edit').click()
    })
    cy.get('#editskill').clear().type('vue')
    cy.contains('button', 'Save').click()
    cy.get('table').should('contain', 'vue')
  })
})
