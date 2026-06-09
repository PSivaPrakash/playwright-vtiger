import { generateRandomNumber } from "../Utility/getRandomNumber.js";
import { selectByText } from "../Utility/dropdown.js";
import { switchToPopup } from '../Utility/popup.js'

export class Opportunitys 
{
    constructor(page)
    {
        this.page = page;
        this.opportunityTabField = page.getByRole('link', { name: 'Opportunities' }).first();
        this.createOpportunityButtonField = page.locator('//img[@title="Create Opportunity..."]')
        this.opportunityNameField = page.locator('//input[@name="potentialname"]')
    }

    async createOpportunity(opportunitysData)
    {
        let randomNumber = generateRandomNumber()
        await this.opportunityTabField.click()
        await this.createOpportunityButtonField.click()
        await this.opportunityNameField.fill(`${opportunitysData.opportunityInformation.opportunityName} ${randomNumber}`)
    }

    async opportunityAdditionalInfo(opportunityData)
    {
        await this.page.locator('//input[@name="amount"]').fill(opportunityData.opportunityInformation.amount)
        await this.page.locator('//input[@name="nextstep"]').fill(opportunityData.opportunityInformation.nextStep)
        await this.page.locator('//input[@name="probability"]').fill(opportunityData.opportunityInformation.probability)
        await selectByText(this.page.locator('select[name="leadsource"]'), opportunityData.opportunityInformation.leadSource)
        await selectByText(this.page.locator('select[name="opportunity_type"]'), opportunityData.opportunityInformation.type)
        await selectByText(this.page.locator('select[name="sales_stage"]'), opportunityData.opportunityInformation.salesStage)
    }

    async opportunityDescription(opportunityDescriptionData)
    {
        await this.page.locator('//textarea[@name="description"]').fill(opportunityDescriptionData.descriptionInformation.description)
    }

    async saveOpportunity()
    {
        await this.page.locator('//input[@type="submit"]').first().click()
        await this.page.waitForLoadState('networkidle')
    }

     async organisationPopUp(orgSearchData)
    {
        const organisationWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').first().click())
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationInfo.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationInfo.organisationName).first().click()
    }
}