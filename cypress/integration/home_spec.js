describe('Navigating to the home page for TEF Outcomes', () => {
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

  it('Displays the filter menu', () => {
    cy.getByTestId('filter').should('be.visible')
  })

  it('Displays the "Provider name" facet in the filter menu and an empty input box', () => {
    cy.getByTestId('filter').get('h4:first').contains('Provider name')
    cy.getByTestId('providerInput').should('have.value', '')
  })

  it('Displays the "Award type" facet and 4 award levels in the filter menu', () => {
    cy.getByTestId('filter').get('h4').eq(1).contains('Award type')
    cy.getByTestId('goldButton').should('be.visible')
    cy.getByTestId('silverButton').should('be.visible')
    cy.getByTestId('bronzeButton').should('be.visible')
    cy.getByTestId('provisionalButton').should('be.visible')
  })

  it('Displays the "Nation" facet and 3 nations in the filter menu', () => {
    cy.getByTestId('nationFacet').get('h4').contains('Nation')
    cy.getByTestId('englandButton').should('be.visible')
    cy.getByTestId('walesButton').should('be.visible')
    cy.getByTestId('scotlandButton').should('be.visible')
  })

  it('Displays the provider list with expected columns', () => {
    var list = cy.getByTestId('providerList')
    list.get('th').eq(0).contains('Higher education provider').should('be.visible')
    list.get('th').eq(1).contains('Award year').should('be.visible')
    list.get('th').eq(2).contains('TEF rating').should('be.visible')
  })


})