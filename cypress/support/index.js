// ***********************************************************
// Processes and loaded automatically before your test files.
// Put global configuration and behavior that modifies Cypress.
// To change the location of this file or turn off automatically 
// serving support files with the 'supportFile' configuration option.
// See: https://on.cypress.io/configuration
// ***********************************************************

/// <reference types="Cypress" />
import './commands'

const COOKIE_NAME = "CookieControl";
const COOKIE_VALUE = "ACCEPTED";

Cypress.on("window:before:load", window => {
    window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
  });

  before(() => {
    cy.visit('https://www.officeforstudents.org.uk/advice-and-guidance/teaching/tef-outcomes')
  })