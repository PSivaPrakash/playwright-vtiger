import { test, expect } from '@playwright/test'
import contactData from "../../test_data/contact.json"
import loginData from "../../test_data/login.json"
import orgData from "../../test_data/organisation.json"
import { Contacts } from '../../pages/ContactPage.js'
import { SignIn } from '../../pages/LoginPage.js'

test('POM Create Contacts', async ({ page }) => {
    test.setTimeout(90000)
    let userContacts = new Contacts(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await userContacts.createContacts(contactData[0])
    await userContacts.organisationPopUp(orgData[0])
    await userContacts.contactAdditionalInfo(contactData[0])
    await userContacts.contactMailingStreet(contactData[0])
    await userContacts.contactOtherStreet(contactData[0])
    await userContacts.contactDescription(contactData[0])
    await userContacts.saveContact()
    let confirmationMessage = await page.locator('//span[@class="dvHeaderText"]')
    await expect(confirmationMessage).toContainText(contactData[0].contactInformation.firstName)
    await userLogin.logoutUser()
})

test('POM Multi Create Contacts', async ({ page }) => {
    test.setTimeout(90000)
    let userContacts = new Contacts(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    for (let mulContact of contactData) {
        await userContacts.createContacts(mulContact)
        await userContacts.organisationPopUp(orgData[0])
        await userContacts.contactAdditionalInfo(mulContact)
        await userContacts.contactMailingStreet(mulContact)
        await userContacts.contactOtherStreet(mulContact)
        await userContacts.contactDescription(mulContact)
        await userContacts.contactImage()
        await userContacts.saveContact()
        let confirmationMessage = await page.locator('//span[@class="dvHeaderText"]')
        await expect(confirmationMessage).toContainText(mulContact.contactInformation.firstName)
    }
    await userLogin.logoutUser()
})