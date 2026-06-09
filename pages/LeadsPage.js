import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import {selectByText} from '../Utility/dropdown.js'

export class Leads{
    constructor(page)
    {
        this.page = page;
        this.leadsTabField = page.getByRole('link', { name: 'Leads' }).first();
        this.createLeadButtonField = page.locator('//img[@title="Create Lead..."]');
        this.salutationTypeField = page.locator('//select[@name="salutationtype"]');
        this.firstNameField = page.locator('//input[@name="firstname"]');
        this.lastNameField = page.locator('//input[@name="lastname"]');
        this.companyNameField = page.locator('//input[@name="company"]');
        this.saveButtonField = page.locator('//input[@type="submit"]').last();

    }
    async createLead(leadData)
    {
        let randomNumber = generateRandomNumber()
        await this.leadsTabField.click()
        await this.createLeadButtonField.click()
        await this.salutationTypeField.selectOption(leadData.leadInformation.salutationType)
        await this.firstNameField.fill(leadData.leadInformation.leadFirstName)
        await this.lastNameField.fill(`${leadData.leadInformation.leadLastName} ${randomNumber}`);
        await this.companyNameField.fill(leadData.leadInformation.leadCompanyName)
    }

    async leadsOptionalData(leadsData)
    {
        await selectByText(this.page.locator('select[name="industry"]'), leadsData.leadInformation.industryType)
        await selectByText(this.page.locator('select[name="leadsource"]'), leadsData.leadInformation.leadSource)
        await selectByText(this.page.locator('select[name="leadstatus"]'), leadsData.leadInformation.leadStatus)
        await selectByText(this.page.locator('select[name="rating"]'), leadsData.leadInformation.rating)
        await this.page.locator('input[name="phone"]').fill(leadsData.leadInformation.phone)
        await this.page.locator('input[name="mobile"]').fill(leadsData.leadInformation.mobile)
        await this.page.locator('input[name="designation"]').fill(leadsData.leadInformation.title)
        await this.page.locator('input[name="fax"]').fill(leadsData.leadInformation.fax)
        await this.page.locator('input[name="email"]').fill(leadsData.leadInformation.email)
        await this.page.locator('input[name="website"]').fill(leadsData.leadInformation.website)
        await this.page.locator('input[name="annualrevenue"]').fill(leadsData.leadInformation.annualRevenue)
        await this.page.locator('input[name="noofemployees"]').fill(leadsData.leadInformation.employees)
        await this.page.locator('input[name="secondaryemail"]').fill(leadsData.leadInformation.secondaryEmail)
    }

    async leadAddressData(leadsData)
    {
        await this.page.locator('textarea[name="lane"]').fill(leadsData.addressInformation.street)
        await this.page.locator('input[name="pobox"]').fill(leadsData.addressInformation.poBox)
        await this.page.locator('input[name="code"]').fill(leadsData.addressInformation.postalCode)
        await this.page.locator('input[name="city"]').fill(leadsData.addressInformation.city)
        await this.page.locator('input[name="state"]').fill(leadsData.addressInformation.state)
        await this.page.locator('input[name="country"]').fill(leadsData.addressInformation.country)
    }

    async leadDescriptionData(leadsData)
    {
        await this.page.locator('textarea[name="description"]').fill(leadsData.descriptionInformation.description)
    }

    async saveLead()
    {
        await this.saveButtonField.click()
        await this.page.waitForLoadState('networkidle')
    }
}