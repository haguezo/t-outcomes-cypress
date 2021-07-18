describe('Filtering results', () => {

    it('Displays the filter menu with search box', () => {
        cy.getByTestId('filter').should('be.visible')
            .get('h4:first').contains('Provider name')
            .getByTestId('providerInput').should('have.value', '')
    })

    it('Displays the "Award type" facet and 4 award levels in the filter menu', () => {
        cy.getByTestId('filter').get('h4').eq(1).contains('Award type')
            .getByTestId('goldButton').should('be.visible')
            .getByTestId('silverButton').should('be.visible')
            .getByTestId('bronzeButton').should('be.visible')
            .getByTestId('provisionalButton').should('be.visible')
    })

    it('Displays the "Nation" facet and 3 nations in the filter menu', () => {
        cy.getByTestId('nationFacet').get('h4').contains('Nation')
        cy.getByTestId('englandButton').should('be.visible')
        cy.getByTestId('walesButton').should('be.visible')
        cy.getByTestId('scotlandButton').should('be.visible')
    })

    describe('Using the "Provider name" facet', () => {

        const WHITESPACE = '      '

        beforeEach(() => {
            cy.fixture("awards").as('awards')
            cy.fixture("nations").as('nations')
        })

        afterEach(() => {
            cy.reload()
        })

        it('Filter does nothing when whitespace is entered', function () {
            // act
            cy.getByTestId('providerInput').type(`${WHITESPACE}{enter}`)

            // assert - displays correct filter message
            cy.getByTestId('filterMessage').contains('Showing all results')

            // assert - displays all "Award type" buttons and badges
            cy.getByTestId('goldButton').contains('Gold').should('be.visible')
            cy.getByTestId('silverButton').contains('Silver').should('be.visible')
            cy.getByTestId('bronzeButton').contains('Bronze').should('be.visible')
            cy.getByTestId('provisionalButton').contains('Provisional').should('be.visible')
            cy.getByTestId('goldBadge').contains(this.awards.totals.gold).should('be.visible')
            cy.getByTestId('silverBadge').contains(this.awards.totals.silver).should('be.visible')
            cy.getByTestId('bronzeBadge').contains(this.awards.totals.bronze).should('be.visible')
            cy.getByTestId('provisionalBadge').contains(this.awards.totals.provisional).should('be.visible')

            // assert - displays all "Nation" buttons and badges
            cy.getByTestId('englandButton').contains('England').should('be.visible')
            cy.getByTestId('walesButton').contains('Wales').should('be.visible')
            cy.getByTestId('scotlandButton').contains('Scotland').should('be.visible')
            cy.getByTestId('englandBadge').contains(this.nations.totals.england).should('be.visible')
            cy.getByTestId('walesBadge').contains(this.nations.totals.wales).should('be.visible')
            cy.getByTestId('scotlandBadge').contains(this.nations.totals.scotland).should('be.visible')
        })

        it('Trims filter criteria of whitespace, displays correct filter message and filters results', () => {
            const FILTER_TERM = 'abertay'

            // act - add some whitespace before the filter term
            cy.getByTestId('providerInput').type(`${WHITESPACE}${FILTER_TERM}{enter}`)

            // assert - filter term should be trimmed
            cy.getByTestId('filterMessage').contains('Showing results for:')
            cy.getByTestId('filteredProvider').contains(FILTER_TERM).should('be.visible')
            cy.getByTestId('clearAll').contains('Clear filter').should('be.visible')

            // assert - single row is returned (Silver award, Scotland)
            cy.get('tr.providerName').should('have.length', 1)
                .contains('University of Abertay Dundee')
                .get('app-rating-component').get('div').should('have.class', 'Silver')
            cy.getByTestId('silverButton').should('be.visible')
            cy.getByTestId('silverBadge').contains(1).should('be.visible')
            cy.getByTestId('scotlandButton').should('be.visible')
            cy.getByTestId('scotlandBadge').contains(1).should('be.visible')
        })

    })

    describe('Using the "Award type" facet', () => {

        beforeEach(() => {
            cy.fixture("awards").as('awards')
        })

        afterEach(() => {
            cy.reload()
        })

        function checkFilteredAwards(award) {
            // assert - all rating components match "award"
            cy.get('app-rating-component')
                .get('div').should('have.class', award)

            // assert - filter message is displayed correctly
            cy.getByTestId('filterMessage').contains('Showing results for:')
                .getByTestId('filteredAward').contains(award)
                .getByTestId('clearAll').contains('Clear filter')
        }

        it('Clicking the Gold award type displays only Gold results and correct filter message', () => {
            // arrange
            cy.fixture("awards").then((awards) => {
                // act
                cy.getByTestId('goldButton').should('be.visible').click()

                // assert - award and nation badges contain correct values from fixture data
                cy.getByTestId('goldBadge').contains(awards.gold.total)
                cy.getByTestId('englandBadge').contains(awards.gold.england)
                cy.getByTestId('walesBadge').contains(awards.gold.wales)
                cy.getByTestId('scotlandBadge').contains(awards.gold.scotland)

                // assert - other award buttons do not exist
                cy.getByTestId('silverButton').should('not.exist')
                cy.getByTestId('bronzeButton').should('not.exist')
                cy.getByTestId('provisionalButton').should('not.exist')

                // assert - awards are filtered correctly
                checkFilteredAwards('Gold')
            })
        })

        it('Clicking the Silver award type displays only Silver results and correct filter message', () => {
            // arrange
            cy.fixture("awards").then((awards) => {
                // act
                cy.getByTestId('silverButton').should('be.visible').click()

                // assert - award and nation badges contain correct values from fixture data
                cy.getByTestId('silverBadge').contains(awards.silver.total)
                cy.getByTestId('englandBadge').contains(awards.silver.england)
                cy.getByTestId('walesBadge').contains(awards.silver.wales)
                cy.getByTestId('scotlandBadge').contains(awards.silver.scotland)

                // assert - other award buttons do not exist
                cy.getByTestId('goldButton').should('not.exist')
                cy.getByTestId('bronzeButton').should('not.exist')
                cy.getByTestId('provisionalButton').should('not.exist')

                // assert - awards are filtered correctly
                checkFilteredAwards('Silver')
            })
        })

        it('Clicking the Bronze award type displays only Bronze results and correct filter message', () => {
            // arrange
            cy.fixture("awards").then((awards) => {
                // act
                cy.getByTestId('bronzeButton').should('be.visible').click()

                // assert - award and nation badges contain correct values from fixture data
                cy.getByTestId('bronzeBadge').contains(awards.bronze.total)
                cy.getByTestId('englandBadge').contains(awards.bronze.england)
                cy.getByTestId('walesBadge').should('not.exist')
                cy.getByTestId('scotlandBadge').should('not.exist')

                // assert - other award buttons do not exist
                cy.getByTestId('goldButton').should('not.exist')
                cy.getByTestId('silverButton').should('not.exist')
                cy.getByTestId('provisionalButton').should('not.exist')

                // assert - awards are filtered correctly
                checkFilteredAwards('Bronze')
            })
        })

        it('Clicking the Provisional award type displays only Provisional results and correct filter message', () => {
            // arrange
            cy.fixture("awards").then((awards) => {
                // act
                cy.getByTestId('provisionalButton').should('be.visible').click()

                // assert - award and nation badges contain correct values from fixture data
                cy.getByTestId('provisionalBadge').contains(awards.provisional.total)
                cy.getByTestId('englandBadge').contains(awards.provisional.england)
                cy.getByTestId('walesBadge').should('not.exist')
                cy.getByTestId('scotlandBadge').should('not.exist')

                // assert - other award buttons do not exist
                cy.getByTestId('goldButton').should('not.exist')
                cy.getByTestId('silverButton').should('not.exist')
                cy.getByTestId('bronzeButton').should('not.exist')

                // assert - awards are filtered correctly
                checkFilteredAwards('Provisional')
            })
        })
    })

    describe('Using the "Nation" facet', () => {

        beforeEach(() => {
            cy.fixture("nations").as('nations')
        })

        afterEach(() => {
            cy.reload()
        })

        function checkFilteredNations(nation) {
            // assert - spot check provider "nation"
            cy.fixture("nations").then(nations => {
                nations[nation.toLowerCase()].providers.forEach((provider) => {
                    cy.getByTestId("providerList")
                        .contains('a', provider.name)
                        .should("have.attr", "href", `#/tefoutcomes/provider/${provider.ukprn}`)
                })
            })

            // assert - filter message is displayed correctly
            cy.getByTestId('filterMessage').contains('Showing results for:')
                .getByTestId('filteredNation').contains(nation)
                .getByTestId('clearAll').contains('Clear filter')
        }

        it('Clicking the England nation displays english providers and the correct filter', function () {
            // act
            cy.getByTestId('englandButton').click()

            // assert - other nation buttons do not exist
            cy.getByTestId('walesButton').should('not.exist')
            cy.getByTestId('scotlandButton').should('not.exist')

            // assert - nation and award badges contain correct values from fixture data
            cy.getByTestId('englandBadge').contains(this.nations.totals.england)
            cy.getByTestId('goldBadge').contains(this.nations.england.gold)
            cy.getByTestId('silverBadge').contains(this.nations.england.silver)
            cy.getByTestId('bronzeBadge').contains(this.nations.england.bronze)
            cy.getByTestId('provisionalBadge').contains(this.nations.england.provisional)

            // assert - results are correctly filtered by nation
            checkFilteredNations('England')
        })

        it('Clicking the Wales nation displays welsh providers and the correct filter', function () {
            // act
            cy.getByTestId('walesButton').click()

            // assert - other nation buttons do not exist
            cy.getByTestId('englandButton').should('not.exist')
            cy.getByTestId('scotlandButton').should('not.exist')

            // assert - nation and award badges contain correct values from fixture data            
            cy.getByTestId('walesBadge').contains(this.nations.totals.wales)
            cy.getByTestId('goldBadge').contains(this.nations.wales.gold)
            cy.getByTestId('silverBadge').contains(this.nations.wales.silver)
            cy.getByTestId('bronzeBadge').should('not.exist')
            cy.getByTestId('provisionalBadge').should('not.exist')

            // assert - results are correctly filtered by nation
            checkFilteredNations('Wales')
        })

        it('Clicking the Scotland nation displays scottish providers and the correct filter', function () {
            // act
            cy.getByTestId('scotlandButton').click()

            // assert - other nation buttons do not exist
            cy.getByTestId('englandButton').should('not.exist')
            cy.getByTestId('walesButton').should('not.exist')

            // assert - nation and award badges contain correct values from fixture data
            cy.getByTestId('scotlandBadge').contains(this.nations.totals.scotland)
            cy.getByTestId('goldBadge').contains(this.nations.scotland.gold)
            cy.getByTestId('silverBadge').contains(this.nations.scotland.silver)
            cy.getByTestId('bronzeBadge').should('not.exist')
            cy.getByTestId('provisionalBadge').should('not.exist')

            // assert - results are correctly filtered by nation
            checkFilteredNations('Scotland')
        })

    })

    describe('Using both facets', () => {

        beforeEach(() => {
            cy.fixture("awards").as('awards')
            cy.fixture("nations").as('nations')
        })

        afterEach(() => {
            cy.reload()
        })

        it('Clicking an award and a nation displays the correct badges', function () {
            // Loop through each award
            this.awards.list.forEach((award) => {

                // Loop through each nation
                this.nations.list.forEach((nation) => {

                    // act - click an Award button
                    cy.getByTestId(`${award}Button`).click()

                    // act - if this nation has awards of this type...   
                    var awardValue = this.awards[`${award}`][`${nation}`]
                    if (awardValue > 0) {
                        // act - click the Nation button
                        cy.getByTestId(`${nation}Button`).click()

                        // assert - check the badge values match
                        cy.getByTestId(`${award}Badge`).contains(awardValue)
                        cy.getByTestId(`${nation}Badge`).contains(awardValue)
                    }

                    cy.getByTestId('clearAll').click()
                })
            })

        })

        it('Clicking the Bronze award does not display Wales or Scotland nations because the count is zero', () => {
            // act
            cy.getByTestId('bronzeButton').click()

            // assert
            cy.getByTestId('walesButton').should('not.exist')
            cy.getByTestId('scotlandButton').should('not.exist')
        })

        it('Clicking the Provisional award does not display Wales or Scotland nations because the count is zero', () => {
            // act
            cy.getByTestId('provisionalButton').click()

            // assert
            cy.getByTestId('walesButton').should('not.exist')
            cy.getByTestId('scotlandButton').should('not.exist')
        })
    })
})