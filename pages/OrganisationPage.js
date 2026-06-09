import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import { selectByText } from '../Utility/dropdown.js'
export class Organisations {
    constructor(page) {
        this.page = page;
        this.organisationTabField = page.getByRole('link', { name: 'Organizations' }).first();
        this.createOrganisationButtonField = page.locator('//img[@title="Create Organization..."]');
        this.organisationNameField = page.locator('//input[@name="accountname"]');
        this.saveOrganisationField = page.locator('//input[@value="  Save  "]').last()
        this.orgConfirmationMessage = page.locator('.dvHeaderText')

    }
    async createOrganisation(orgCreationData) {
        let randomNumber = generateRandomNumber()
        await this.organisationTabField.click()
        await this.createOrganisationButtonField.click();
        await this.organisationNameField.fill(`${orgCreationData.organisationInfo.organisationName} ${randomNumber}`)
    }

    async saveOrganisation() {
        await this.saveOrganisationField.click()
        await this.page.waitForLoadState('networkidle')
    }

    async organisationAdditionaInformation(orgInformationData) {
        await this.page.locator('input[name="website"]').fill(orgInformationData.organisationInfo.website)
        await this.page.locator('input[name="phone"]').fill(orgInformationData.organisationInfo.phone)
      //  await this.page.locator('input[name="tickersymbol"]').fill(orgInformationData.organisationInfo.ticketSymbol)
        await this.page.locator('input[name="fax"]').fill(orgInformationData.organisationInfo.fax)
        await this.page.locator('input[name="employees"]').fill(orgInformationData.organisationInfo.employees)
        await this.page.locator('input[name="otherphone"]').fill(orgInformationData.organisationInfo.otherPhone)
        await this.page.locator('input[name="email1"]').fill(orgInformationData.organisationInfo.email)
        await this.page.locator('input[name="email2"]').fill(orgInformationData.organisationInfo.otherEmail)
        await this.page.locator('input[name="ownership"]').fill(orgInformationData.organisationInfo.ownership)
        await selectByText(this.page.locator('//select[@name="industry"]'), orgInformationData.organisationInfo.industryType)
        await selectByText(this.page.locator('//select[@name="rating"]'), orgInformationData.organisationInfo.rating)
        await selectByText(this.page.locator('//select[@name="accounttype"]'), orgInformationData.organisationInfo.accountType)
        await this.page.locator('input[name="siccode"]').fill(orgInformationData.organisationInfo.sicCode)
        await this.page.locator('input[name="annual_revenue"]').fill(orgInformationData.organisationInfo.annualRevenue)
        await this.page.locator('input[name="emailoptout"]').click()
        await this.page.locator('input[name="notify_owner"]').click()
    }

    async organisationBillingInformation(orgBillingAddressData) {
        await this.page.locator('textarea[name="bill_street"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingAddress)
        await this.page.locator('input[name="bill_pobox"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingPoBox)
        await this.page.locator('input[name="bill_city"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingCity)
        await this.page.locator('input[name="bill_state"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingState)
        await this.page.locator('input[name="bill_code"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingPostalCode)
        await this.page.locator('input[name="bill_country"]').fill(orgBillingAddressData.addressInfo.billingAddressSection.billingCountry)
    }

    async organisationShippingInformation(orgShippingAddressData) {
        await this.page.locator('textarea[name="ship_street"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingAddress)
        await this.page.locator('input[name="ship_pobox"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingPoBox)
        await this.page.locator('input[name="ship_city"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingCity)
        await this.page.locator('input[name="ship_state"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingState)
        await this.page.locator('input[name="ship_code"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingPostalCode)
        await this.page.locator('input[name="ship_country"]').fill(orgShippingAddressData.addressInfo.shippingAddressSection.shippingCountry)
    }

    async organisationDescriptionInformation(organisationDescriptionData) {
        await this.page.locator('textarea[name="description"]').fill(organisationDescriptionData.descriptionInfo.description)
    }
}