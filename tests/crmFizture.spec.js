import { test } from '../Fixtures/crm.js'
import { expect } from '@playwright/test'
import orgData from "../test_data/organisation.json"
import contactData from "../test_data/contact.json"
import productData from '../test_data/produts.json'
import opportunityData from "../test_data/opportunity.json"
import leads from '../test_data/leads.json'
import quoteData from '../test_data/quote.json'

test('Organisation Fixture Test', async ({ organisationPage }) => {
    test.slow()
    await organisationPage.createOrganisation(orgData[0])
    await organisationPage.organisationAdditionaInformation(orgData[0])
    await organisationPage.organisationBillingInformation(orgData[0])
    await organisationPage.organisationShippingInformation(orgData[0])
    await organisationPage.organisationDescriptionInformation(orgData[0])
    await organisationPage.saveOrganisation()
})

test('Contacts Fixture Test', async ({ contactsPage }) => {
    test.slow()
    await contactsPage.createContacts(contactData[0])
    await contactsPage.organisationPopUp(orgData[0])
    await contactsPage.contactAdditionalInfo(contactData[0])
    await contactsPage.contactMailingStreet(contactData[0])
    await contactsPage.contactOtherStreet(contactData[0])
    await contactsPage.contactDescription(contactData[0])
    await contactsPage.contactImage(contactData[0])
    await contactsPage.saveContact()

})

test('Products Fixture', async ({ productPage }) => {
    test.slow()
    await productPage.createProduct(productData[0])
    await productPage.productAdditionalInfo(productData[0])
    await productPage.pricingInformation(productData[0])
    await productPage.stockInformation(productData[0])
    await productPage.productImage(productData[0])
    await productPage.productDescription(productData[0])
    await productPage.saveProduct()
    await expect(productPage.ConfirmationMessageField).toContainText(productData[0].productInformation.productName)
})


test('Opportunity Fixture', async ({ OpportunityCreates }) => {
    test.slow()
    await OpportunityCreates.createOpportunity(opportunityData[0])
    await OpportunityCreates.organisationPopUp(orgData[0])
    await OpportunityCreates.opportunityAdditionalInfo(opportunityData[0])
    await OpportunityCreates.opportunityDescription(opportunityData[0])
    await OpportunityCreates.saveOpportunity()
})


test('Leads Fixture', async ({ leadsPage }) => {
    test.setTimeout(90000)
    await leadsPage.createLead(leads[0])
    await leadsPage.leadsOptionalData(leads[0])
    await leadsPage.saveLead()
})


test.only('Quote Fixture', async ({quotePage}) => {
    test.setTimeout(90000)
    await quotePage.createQuote(quoteData[0])
    await quotePage.opportunityPopUp(opportunityData[0])
    await quotePage.contactPopUp(contactData[0])
    await quotePage.organisationPopUp(orgData[0])
    await quotePage.itemWindow(productData[0])
    await quotePage.quoteBillingInformation(quoteData[0])
    await quotePage.quoteShippingInformation(quoteData[0])
    await quotePage.quoteDescription(quoteData[0])
    await quotePage.quoteItemsDetails(quoteData[0])
    await quotePage.saveQuote()   
})


