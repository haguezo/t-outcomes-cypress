describe('Navigating to a provider page', () => {

    // Using require to retrieve test data from fixture
    const nations = require('../fixtures/nations.json')

    afterEach(() => {
        cy.reload()
    })

    nations.list.forEach((nation) => {

        it(`Clicking ${nation} displays expected count of providers `, () => {
            // act
            cy.getByTestId(`${nation}Button`).click()

            nations[nation.toLowerCase()].providers.forEach((provider) => {
                it('', () => {

                })
            })

            // assert
            cy.getByTestId(`${nation}Badge`).contains(nations.totals[`${nation}`])
        })
    })
})