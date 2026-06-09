import { test } from '../Fixtures/crm.js'
import { expect } from '@playwright/test'
import orgData from "../test_data/organisation.json"
import contactData from "../test_data/contact.json"
import productData from '../test_data/produts.json'
import opportunityData from "../test_data/opportunity.json"

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


test.only('Opportunity Fixture', async ({ OpportunityCreates }) => {
    test.slow()
    await OpportunityCreates.createOpportunity(opportunityData[0])
    await OpportunityCreates.organisationPopUp(orgData[0])
    await OpportunityCreates.opportunityAdditionalInfo(opportunityData[0])
    await OpportunityCreates.opportunityDescription(opportunityData[0])
    await OpportunityCreates.saveOpportunity()
})


