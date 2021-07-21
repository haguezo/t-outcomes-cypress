describe('Using fixture data from "nations.json" to test a sample of provider pages', () => {

    const nations = require('../fixtures/nations.json')

    nations.list.forEach((nation) => {

        nations[nation.toLowerCase()].providers.forEach((provider) => {

            describe(`Navigating to the provider page for ${provider.name}`, () => {

                const API_BASE = Cypress.env('apiBaseUrl')

                before(() => {
                    cy.visit(`/#/tefoutcomes/provider/${provider.ukprn}`)
                })

                after(() => {
                    cy.reload()
                })

                it(`Displays the correct titles for ${provider.name}`, () => {
                    cy.get('h1:first').contains('TEF outcomes')
                    cy.getByTestId('providerName').contains(`${provider.name}`)
                    cy.getByTestId('ukprn').contains(`${provider.ukprn}`)
                })

                it(`Displays the top and bottom "Search for another provider" buttons for ${provider.name}`, () => {
                    let buttonText = 'Search for another provider'
                    cy.getByTestId('findButtonTop')
                        .contains(buttonText)
                        .should('be.visible')
                        .should('not.be.disabled')
                    cy.getByTestId('findButtonBottom')
                        .contains(buttonText)
                        .should('be.visible')
                        .should('not.be.disabled')
                })

                it(`Displays the expected award rating component for ${provider.name}`, () => {
                    cy.fixture(`${provider.ukprn}`).then((providerJson) => {
                        cy.log(`Expected award is ${providerJson.awardRating}`)
                        cy.getByTestId(`${providerJson.awardRating}Rating`).should('be.visible')
                            .get('app-rating-component')
                            .get('div').should('have.class', providerJson.awardRating)
                        cy.get('app-duration-component').should('be.visible')
                            .get('p').should('contain', ` This award was made in ${providerJson.awardDate}.`)
                    })
                })

                it(`Displays the download list for ${provider.name}`, () => {
                    cy.get('app-downloadlist-component').should('be.visible')
                        .getByTestId('downloadHeader').contains('Further information')
                        .getByTestId('downloadList').should('be.visible')

                    cy.getByTestId('statementLink').should('be.visible')
                    cy.getByTestId('submissionLink').should('be.visible')
                    cy.getByTestId('metricsLink').should('be.visible')
                    cy.getByTestId('mapLink').should('be.visible')
                    cy.getByTestId('unistatslink').should('be.visible')
                })

                it(`Displays a valid statement link for ${provider.ukprn} and returns HTTP 200 OK response status code`, () => {

                    cy.getByTestId('statementLink')
                        .invoke('attr', 'href').should('eq', `${Cypress.env('statementBaseUrl')}${provider.ukprn}.pdf`)
                        .then(href => {
                            cy.request(href).its('status').should('eq', 200)
                        })
                })

                it(`Displays a valid submission link for ${provider.ukprn} and returns HTTP 200 OK response status code`, () => {
                    cy.getByTestId('submissionLink')
                        .invoke('attr', 'href').should('eq', `${Cypress.env('submissionBaseUrl')}${provider.ukprn}.pdf`)
                        .then(href => {
                            cy.request(href).its('status').should('eq', 200)
                        })
                })

                it(`Displays a valid metrics link for ${provider.ukprn} and returns HTTP 200 OK response status code`, () => {
                    cy.getByTestId('metricsLink')
                        .invoke('attr', 'href').should('eq', `${Cypress.env('metricsBaseUrl')}${provider.ukprn}.xlsx`)
                        .then(href => {
                            cy.request(href).its('status').should('eq', 200)
                        })
                })

                it(`Displays a valid contextual data (map) link for ${provider.ukprn} and returns HTTP 200 OK response status code`, () => {
                    cy.getByTestId('mapLink')
                        .invoke('attr', 'href').should('eq', `${Cypress.env('mapBaseUrl')}${provider.ukprn}.pdf`)
                        .then(href => {
                            cy.request(href).its('status').should('eq', 200)
                        })
                })

                it(`Displays a valid Unistats link for ${provider.ukprn} and returns HTTP 200 OK response status code`, () => {
                    cy.getByTestId('unistatslink')
                        .invoke('attr', 'href').should('eq', `${Cypress.env('unistatsBaseUrl')}${provider.ukprn}`)
                        .then(href => {
                            cy.request(href).its('status').should('eq', 200)
                        })
                })

            })
        })
    })
})