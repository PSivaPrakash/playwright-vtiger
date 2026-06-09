import {test, expect} from '@playwright/test'
import contactData from "../../test_data/contact.json"
import loginData from "../../test_data/login.json"
import orgData from "../../test_data/organisation.json"
import productData from "../../test_data/produts.json"
import opportunityData from "../../test_data/opportunity.json"
import quoteData from "../../test_data/quote.json"
import salesData from "../../test_data/sales.json"
import { SignIn} from '../../pages/LoginPage.js'
import {SalesOrder} from '../../pages/SalesOrderPage.js'


test('POM Sales Create', async ({page}) => {
    test.setTimeout(90000)
    let userLogin = new SignIn(page)
    let salesPage = new SalesOrder(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await salesPage.createSalesOrderPage(salesData[0])
    await salesPage.opportunityPopUp(opportunityData[0])
    await salesPage.quotePopUp(quoteData[0])
    await salesPage.contactPopUp(contactData[0])
    await salesPage.organisationPopUp(orgData[0])
    await salesPage.itemWindow(productData[0])
    await salesPage.additionalInformation(salesData[0])
    await salesPage.salesBillingInformation(salesData[0])
    await salesPage.salesShippingInformation(salesData[0])
    await salesPage.salesDescription(salesData[0])
    await salesPage.saveSalesOrder()
    let confirmationMessage = page.locator(".lvtHeaderText")
    await expect(confirmationMessage).toContainText(salesData[0].salesInformation.saleSubject)
    await userLogin.logoutUser()
    
})