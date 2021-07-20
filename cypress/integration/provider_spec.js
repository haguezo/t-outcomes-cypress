describe('Navigating to a provider page', () => {

    // EXAMPLE: Using 'require' and a const for test data from a fixture
    const nations = require('../fixtures/nations.json')

    afterEach(() => {
        cy.reload()
    })

    // EXAMPLE: Nested tests
    nations.list.forEach((nation) => {

        it.only(`Clicking ${nation} displays expected count of providers `, () => {
            // act
            cy.getByTestId(`${nation}Button`).click()

            nations[nation.toLowerCase()].providers.forEach((provider) => {
                it(`Link for '${provider.name}' is displayed with correct URL containing UKPRN ${provider.ukprn} and navigates to provider page`, () => {

                    // Check a provider link is found with the name
                    cy.getByTestId('providerLink')

                    // Check the link href is correct

                    // Click the link

                    // Check new url
                })
            })

            // assert
            cy.getByTestId(`${nation}Badge`).contains(nations.totals[`${nation}`])
        })
    })
})