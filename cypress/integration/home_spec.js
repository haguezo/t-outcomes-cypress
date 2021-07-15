describe('Navigating to the home page for TEF Outcomes', () => {

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
})