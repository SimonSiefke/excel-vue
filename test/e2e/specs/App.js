// https://docs.cypress.io/api/introduction/api.html

describe('App can fetch data', () => {
  it('renders correctly', () => {
    cy.visit(Cypress.env('VUE_DEV_SERVER_URL'))
    cy.contains('h1', 'hello')
  })
  it('can log in', () => {
    cy.server()
    cy.route('post', `**/login`).as('login')
    cy.contains('login').click()
    cy.wait('@login')
    cy.contains('login successful')
  })
  it('can fetch time entries', () => {
    cy.server()
    cy.route(`**/time`).as('getTime')
    cy.contains('get Time').click()
    cy.wait('@getTime')
    cy.contains('"user": "Marcel"')
  })
})
