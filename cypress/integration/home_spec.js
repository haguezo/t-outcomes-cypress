describe('Navigating to the home page for TEF Outcomes', () => {

  before(() => {
    cy.visit('/#')
  })

  it.skip('Is valid HTML', () => {
    cy.htmlvalidate()
  })

  it('Displays the correct titles and default filter message', () => {
    cy.get('h1:first').contains('TEF outcomes')
    cy.getByTestId('pagetitle').contains('Search current TEF awards')
    cy.getByTestId('filterMessage').contains('Showing all results')
  })

  it('Displays the download button', () => {
    cy.getByTestId('downloadButton')
      .contains('Download all TEF results')
      .should('be.visible')
      .should('not.be.disabled')
  })

  it('Displays the provider list with expected columns', () => {
    cy.getByTestId('providerList')
      .get('th').eq(0).contains('Higher education provider').should('be.visible')
      .get('th').eq(1).contains('Award year').should('be.visible')
      .get('th').eq(2).contains('TEF rating').should('be.visible')
  })

  // EXAMPLE: Using 'require' and a const for test data from a fixture
  const nations = require('../fixtures/nations.json')

  nations.list.forEach((nation) => {

    nations[nation.toLowerCase()].providers.forEach((provider) => {
      it(`Link for '${provider.name}' in ${nation} is displayed with correct URL for UKPRN ${provider.ukprn} and request for href returns 200`, () => {

        // act
        cy.getByTestId(`${nation}Button`).click()

        // EXAMPLE: Testing link including making an HTTP request to ensure it is valid and returning expected status 
        cy.get(`a:contains(${provider.name})`)
          .should('be.visible')
          .invoke('attr', 'href')
          .should('eq', `#/tefoutcomes/provider/${provider.ukprn}`)
          .then(href => {
            cy.request(href).its('status').should('eq', 200)
          })

        cy.reload()
      })
    })
  })
})