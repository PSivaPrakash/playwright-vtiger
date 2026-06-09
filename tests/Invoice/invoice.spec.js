import {test, expect} from '@playwright/test'
import contactData from "../../test_data/contact.json"
import loginData from "../../test_data/login.json"
import orgData from "../../test_data/organisation.json"
import productData from "../../test_data/produts.json"
import opportunityData from "../../test_data/opportunity.json"
import quoteData from "../../test_data/quote.json"
import salesData from "../../test_data/sales.json"
import invoiceData from "../../test_data/invoice.json"
import { SignIn } from '../../pages/LoginPage.js'
import { Invoice } from '../../pages/InvoicePage.js'


test('POM Create Invoice', async ({page}) => {
    test.setTimeout(90000)
    let userLogin = new SignIn(page)
    let invoicePage = new Invoice(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await invoicePage.createInvoicePage(invoiceData[0])
    await invoicePage.salesWindow(salesData[0])
    await invoicePage.contactPopUp(contactData[0])
    await invoicePage.organisationPopUp(orgData[0])
    await invoicePage.invoiceAdditionalInformation(invoiceData[0])
    await invoicePage.invoiceBillingInformation(invoiceData[0])
    await invoicePage.invoiceShippingInformation(invoiceData[0])
    await invoicePage.invoiceDescription(invoiceData[0])
    await invoicePage.itemWindow(productData[0])
    await invoicePage.invoiceItemsDetails(invoiceData[0])
    await invoicePage.saveInvoice()
    let confirmationMessage = page.locator(".lvtHeaderText")
    await expect(confirmationMessage).toContainText(invoiceData[0].invoiceInformation.invoiceSubject)
    await userLogin.logoutUser()

    
})