describe('TEF Outcomes API', () => {
    const API_BASE = Cypress.env('apiBaseUrl')
 
    it('The "/providers" endpoint should return HTTP 200 OK response status code', () => {
        cy.request(`${API_BASE}/providers`)
            .its('status')
            .should('be.equal', 200)
    })

    it('The "/providers" endpoint should return JSON data', () => {
        cy.request(`${API_BASE}/providers`)
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')
    })

    describe('Spot check providers in each nation', () => {
        const nations = require('../fixtures/nations.json')

        nations.list.forEach((nation) => {
            nations[nation.toLowerCase()].providers.forEach((provider) => {
                it(`The "/providers/${provider.ukprn}" endpoint returns HTTP 200 OK response status code`, () => {
                    cy.request(`${API_BASE}/providers/${provider.ukprn}`)
                        .its('status')
                        .should('be.equal', 200)
                })


                it(`The "/providers/${provider.ukprn}" endpoint returns JSON data`, () => {
                    cy.request(`${API_BASE}/providers/${provider.ukprn}`)
                        .its('headers')
                        .its('content-type')
                        .should('include', 'application/json')
                })
            })
        })
    })
})