import { test, expect } from '@playwright/test'
import loginData from '../../test_data/login.json'
import leads from "../../test_data/leads.json"
import { SignIn } from '../../pages/LoginPage.js';
import { Leads } from '../../pages/LeadsPage.js';

// test('Lead Create', async ({ page }) => {
//     test.setTimeout(60000)
//     await page.goto(login.url)
//     await expect(page).toHaveURL("http://localhost:8888")
//     await page.locator('//input[@type="text"]').fill(login.username)
//     await page.locator('//input[@type="password"]').fill(login.password)
//     await page.locator('//input[@type="submit"]').click()
//     await page.locator('//a[text()="Leads"]').click()
//     await page.locator('//img[@title="Create Lead..."]').click()
//     await page.locator('//select[@name="salutationtype"]').selectOption(leads.salutationType)
//     await page.locator('//input[@name="firstname"]').fill(leads.leadFirstName)
//     await page.locator('//input[@name="lastname"]').fill(leads.leadLastName)
//     await page.locator('//input[@name="company"]').fill(leads.leadCompanyName)
//     await page.locator('//input[@type="submit"]').first().click()
//     await page.waitForLoadState('networkidle')
//     await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
//     await page.getByText('Sign Out').click()
//     await page.waitForTimeout(5000)


// })

// test('Lead Create with assertions', async ({ page }) => {
//     test.setTimeout(60000)
//     await page.goto(login.url)
//     await expect(page).toHaveURL("http://localhost:8888")
//     await expect(page.locator('//input[@type="text"]')).toBeVisible()
//     await expect(page.locator('//input[@type="password"]')).toBeVisible()
//     await expect(page.locator('//input[@type="submit"]')).toBeEnabled()
//     await page.locator('//input[@type="text"]').fill(login.username)
//     await page.locator('//input[@type="password"]').fill(login.password)
//     await page.locator('//input[@type="submit"]').click()
//     await expect(page).toHaveURL("http://localhost:8888/index.php?action=index&module=Home")
//     await page.locator('//a[text()="Leads"]').click()
//     await page.locator('//img[@title="Create Lead..."]').click()
//     await page.locator('//select[@name="salutationtype"]').selectOption('Mr.')
//     await page.locator('//input[@name="firstname"]').fill(leads.leadFirstName)
//     await page.locator('//input[@name="lastname"]').fill(leads.leadLastName)
//     await page.locator('//input[@name="company"]').fill(leads.leadCompanyName)
//     await expect(page.locator('//input[@name="firstname"]')).toHaveValue(leads.leadFirstName)
//     await expect(page.locator('//input[@name="lastname"]')).toHaveValue(leads.leadLastName)
//     await expect(page.locator('//input[@name="company"]')).toHaveValue(leads.leadCompanyName)
//     await expect(page.locator('//input[@type="submit"]').first()).toBeEnabled()
//     await page.locator('//input[@type="submit"]').first().click()
//     await page.waitForLoadState('networkidle')
//     await expect(page.locator('//span[@id="dtlview_Company"]')).toContainText(leads.leadCompanyName)
//     await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
//     await expect(page.getByText('Sign Out')).toBeVisible()
//     await page.getByText('Sign Out').click()
//     await page.waitForTimeout(5000)


// })

test('POM', async ({ page }) => {
    test.setTimeout(90000)
    let leadsPage = new Leads(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await leadsPage.createLead(leads[0])
    await leadsPage.leadsOptionalData(leads[0])
    await leadsPage.saveLead()
    const confirmationMessage = page.locator('//span[@id="dtlview_Company"]')
    await expect(confirmationMessage).toContainText(leads[0].leadInformation.leadCompanyName)
    await userLogin.logoutUser()
})

test('POM Multiple Leads Creation', async ({ page }) => {
    test.setTimeout(90000)
    let leadsPage = new Leads(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    for (let leadsMulData of leads) {
        await leadsPage.createLead(leadsMulData)
        await leadsPage.leadsOptionalData(leadsMulData)
        await leadsPage.leadAddressData(leadsMulData)
        await leadsPage.leadDescriptionData(leadsMulData)
        await leadsPage.saveLead()
        const confirmationMessage = page.locator('//span[@id="dtlview_Company"]')
    await expect(confirmationMessage).toContainText(leadsMulData.leadInformation.leadCompanyName)
    }
    await userLogin.logoutUser()
})