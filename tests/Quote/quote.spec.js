import {test, expect} from '@playwright/test'
import contactData from "../../test_data/contact.json"
import loginData from "../../test_data/login.json"
import orgData from "../../test_data/organisation.json"
import productData from "../../test_data/produts.json"
import opportunityData from "../../test_data/opportunity.json"
import quoteData from "../../test_data/quote.json"
import { PopUps } from '../../pages/PopUps.js'
import {SignIn} from '../../pages/LoginPage.js'
import { Quotes } from '../../pages/QuotePage.js'

// test('Quote Create', async ({page}) => {
//     test.setTimeout(60000)
//     await page.goto(loginData.url)
//     await page.locator('//input[@type="text"]').fill(loginData.username)
//     await page.locator('//input[@type="password"]').fill(loginData.password)
//     await page.locator('//input[@type="submit"]').click()
//     await page.locator('//a[text()="More"]').hover()
//     await page.locator('//a[@name="Quotes"]').click()
//     await page.locator('//img[@title="Create Quote..."]').click()
//     await page.locator('//input[@name="subject"]').fill(quoteData.quoteSubject)

//     let [opportunityWindow] = await Promise.all([
//         page.waitForEvent('popup'),
//         page.locator('//img[@src="themes/softed/images/select.gif"]').first().click()
//     ])
//     await opportunityWindow.locator('#search_txt').fill(opportunityData.opportunityName)
//     await opportunityWindow.locator('//select[@class="txtBox"]').selectOption('Opportunity')
//     await opportunityWindow.locator('//input[@value="  Search Now  "]').click()
//     await opportunityWindow.getByText(opportunityData.opportunityName).click()



//      let [contactWindow] = await Promise.all([
//         page.waitForEvent('popup'),
//         page.locator('//img[@src="themes/softed/images/select.gif"]').nth(1).click()
//     ])
//     await contactWindow.locator('#search_txt').fill(contactData.firstName)
//     await contactWindow.locator('//select[@class="txtBox"]').selectOption('First Name')
//     await contactWindow.locator('//input[@value="  Search Now  "]').click()
//     await contactWindow.getByText(contactData.firstName).click()

//     let [organisationWindow] = await Promise.all([
//         page.waitForEvent('popup'),
//         page.locator('//img[@src="themes/softed/images/select.gif"]').nth(2).click()
//     ])
//     await organisationWindow.locator('#search_txt').fill(orgData.organisationName)
//     await organisationWindow.locator('//select[@class="txtBox"]').selectOption("Organization Name")
//     await organisationWindow.locator('//input[@value="  Search Now  "]').click()
//     await organisationWindow.getByText(orgData.organisationName).click()

//     await page.locator('//textarea[@name="bill_street"]').fill(quoteData.billingAddress)
//     await page.locator('//textarea[@name="ship_street"]').fill(quoteData.shippingAddress)

//     let [itemNameWindow] = await Promise.all([
//         page.waitForEvent('popup'),
//         page.locator('//img[@title="Products"]').click()
//     ])
//     await itemNameWindow.locator('#search_txt').fill(productData.productName)
//     await itemNameWindow.locator('//select[@class="txtBox"]').selectOption("Product Name")
//     await itemNameWindow.locator('//input[@value="  Search Now  "]').click()
//     await itemNameWindow.getByText(productData.productName).click()

//     await page.locator('#qty1').fill(productData.productQuantity)
//     await page.locator('//input[@value="  Save  "]').last().click()
//     await page.waitForLoadState('networkidle')

//     await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
//     await page.getByText('Sign Out').click()
//     await page.waitForTimeout(3000)
    
// })

test('POM Create Quote', async ({page}) => {
    test.setTimeout(90000)
    let userLogin = new SignIn(page)
    let quoteCreation = new Quotes(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await quoteCreation.createQuote(quoteData[0])
    await quoteCreation.opportunityPopUp(opportunityData[0])
    await quoteCreation.contactPopUp(contactData[0])
    await quoteCreation.organisationPopUp(orgData[0])
    await quoteCreation.itemWindow(productData[0])
    await quoteCreation.quoteBillingInformation(quoteData[0])
    await quoteCreation.quoteShippingInformation(quoteData[0])
    await quoteCreation.quoteDescription(quoteData[0])
    await quoteCreation.quoteItemsDetails(quoteData[0])
    await quoteCreation.saveQuote()
    let confirmationMessage = page.locator(".lvtHeaderText")
    await expect(confirmationMessage).toContainText(quoteData[0].quoteInformation.quoteSubject)
    await userLogin.logoutUser()   
})