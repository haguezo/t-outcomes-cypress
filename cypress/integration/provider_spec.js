describe('Checking links for providers in each nation', () => {

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
