// ***********************************************************
// Processes and loaded automatically before your test files.
// Put global configuration and behavior that modifies Cypress.
// To change the location of this file or turn off automatically 
// serving support files with the 'supportFile' configuration option.
// See: https://on.cypress.io/configuration
// ***********************************************************

/// <reference types="Cypress" />
import './commands'
import 'cypress-html-validate/dist/commands'

Cypress.on("window:before:load", window => {
  window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`
})

beforeEach(() => {
  Cypress.Cookies.preserveOnce(COOKIE_NAME)
})

const COOKIE_NAME = "CookieControl"
const COOKIE_VALUE = "ACCEPTED"