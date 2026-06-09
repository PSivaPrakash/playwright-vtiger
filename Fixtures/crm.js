import { test as base } from './login.js'
import { Organisations } from '../pages/OrganisationPage.js'
import { Contacts } from '../pages/ContactPage.js'
import { Products } from '../pages/ProductsPage.js'
import {Opportunitys} from '../pages/OpportunityPage.js'

export let test = base.extend({
    organisationPage: async ({ loginPage }, use) => {
        let OrganisationObj = new Organisations(loginPage)
        await use(OrganisationObj)
    },
    contactsPage: async ({ loginPage }, use) => {
        let userContacts = new Contacts(loginPage)
        await use(userContacts)
    },

    productPage: async ({ loginPage }, use) => {
        let productPage = new Products(loginPage)
        await use(productPage)

    },
    OpportunityCreates: async ({ loginPage }, use) => {
        let OpportunityCreates = new Opportunitys(loginPage)
        await use(OpportunityCreates)

    }


})

