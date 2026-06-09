import { expect, test } from '@playwright/test'
import opportunityData from "../../test_data/opportunity.json"
import loginData from "../../test_data/login.json"
import orgData from "../../test_data/organisation.json"
import { Opportunitys } from '../../pages/OpportunityPage.js'
import { SignIn } from '../../pages/LoginPage.js'


test('POM Create Opportunity', async ({ page }) => {
    test.setTimeout(90000)
    let OpportunityCreates = new Opportunitys(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await OpportunityCreates.createOpportunity(opportunityData[0])
    await OpportunityCreates.organisationPopUp(orgData[0])
    await OpportunityCreates.opportunityAdditionalInfo(opportunityData[0])
    await OpportunityCreates.opportunityDescription(opportunityData[0])
    await OpportunityCreates.saveOpportunity()
    let confirmationMessage = await page.locator('.dvHeaderText')
    await expect(confirmationMessage).toContainText(opportunityData[0].opportunityInformation.opportunityName)
    await userLogin.logoutUser()

})

test('POM Create Multiple Opportunity', async ({ page }) => {
    test.setTimeout(90000)
    let OpportunityCreates = new Opportunitys(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    for (let opportunityMul of opportunityData) {
        await OpportunityCreates.createOpportunity(opportunityMul)
        await OpportunityCreates.organisationPopUp(orgData[0])
        await OpportunityCreates.opportunityAdditionalInfo(opportunityMul)
        await OpportunityCreates.opportunityDescription(opportunityMul)
        await OpportunityCreates.saveOpportunity()
        let confirmationMessage = await page.locator('.dvHeaderText')
        await expect(confirmationMessage).toContainText(opportunityMul.opportunityInformation.opportunityName)
    }
    await userLogin.logoutUser()

})