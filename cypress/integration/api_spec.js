describe('TEF Outcomes API', () => {
    const baseEndpoint = 'https://apis.officeforstudents.org.uk/TEFOutcomes/api'
 
    it('The "/providers" endpoint should return HTTP 200 OK response status code', () => {
        cy.request(`${baseEndpoint}/providers`)
            .its('status')
            .should('be.equal', 200)
    })

    it('The "/providers" endpoint should return JSON data', () => {
        cy.request(`${baseEndpoint}/providers`)
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')
    })

    describe('Spot check providers in each nation', () => {
        const nations = require('../fixtures/nations.json')

        nations.list.forEach((nation) => {
            nations[nation.toLowerCase()].providers.forEach((provider) => {
                it(`The "/providers/${provider.ukprn}" endpoint should return HTTP 200 OK response status code`, () => {
                    cy.request(`${baseEndpoint}/providers/${provider.ukprn}`)
                        .its('status')
                        .should('be.equal', 200)
                })


                it(`The "/providers/${provider.ukprn}" endpoint should return JSON data`, () => {
                    cy.request(`${baseEndpoint}/providers/${provider.ukprn}`)
                        .its('headers')
                        .its('content-type')
                        .should('include', 'application/json')
                })
            })
        })
    })
})