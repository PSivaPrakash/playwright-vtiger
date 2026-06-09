import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import { selectByText } from '../Utility/dropdown.js'
import { switchToPopup } from '../Utility/popup.js'

export class Quotes {
    constructor(page) {
        this.page = page;
        this.moreButtonField = page.locator('//a[text()="More"]')
        this.quoteButtonField = page.locator('//a[@name="Quotes"]')
        this.createQuoteButtonField = page.locator('//img[@title="Create Quote..."]')
        this.quoteSubjectField = page.locator('//input[@name="subject"]')
        this.produtQuantityField = page.locator('#qty1')
        this.saveQuoteField = page.locator('//input[@value="  Save  "]').last()
    }

    async createQuote(quoteData) {
        let randomNumber = generateRandomNumber()
        await this.moreButtonField.hover()
        await this.quoteButtonField.click()
        await this.createQuoteButtonField.click()
        await this.quoteSubjectField.fill(`${quoteData.quoteInformation.quoteSubject} ${randomNumber}`)
        await this.produtQuantityField.fill(quoteData.itemDetails.productQuantity)
    }

    async quoteAdditionalInformation(quoteData) {
        // await this.page.locator('input[name="shipping"]').fill(quoteData.quoteInformation.shipping)
        await selectByText(this.page.locator('input[name="quotestage"]'), quoteData.quoteInformation.quoteStage)
        await selectByText(this.page.locator('input[name="carrier"]'), quoteData.quoteInformation.carrier)
    }

    async organisationPopUp(orgSearchData) {
        const organisationWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(2).click())
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationInfo.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationInfo.organisationName).first().click()
    }

    async opportunityPopUp(oppSearchData) {
        const opportunityWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').first().click())
        await opportunityWindow.locator('#search_txt').fill(oppSearchData.opportunityInformation.opportunityName)
        await opportunityWindow.locator('//select[@class="txtBox"]').selectOption('Opportunity')
        await opportunityWindow.locator('//input[@value="  Search Now  "]').click()
        await opportunityWindow.getByText(oppSearchData.opportunityInformation.opportunityName).first().click()
    }

    async contactPopUp(contactSearchData) {
        const contactWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(1).click())
        await contactWindow.locator('#search_txt').fill(contactSearchData.contactInformation.firstName)
        await contactWindow.locator('//select[@class="txtBox"]').selectOption(contactSearchData.contactInformation.popUpDropDownOption)
        await contactWindow.locator('//input[@value="  Search Now  "]').click()
        await contactWindow.getByText(contactSearchData.contactInformation.firstName).first().click()
    }

    async itemWindow(itemSearchData) {
        const itemNameWindow = await switchToPopup(this.page, () => this.page.locator('//img[@title="Products"]').click())
        await itemNameWindow.locator('#search_txt').fill(itemSearchData.productInformation.productName)
        await itemNameWindow.locator('//select[@class="txtBox"]').selectOption(itemSearchData.productInformation.dropDownItem)
        await itemNameWindow.locator('//input[@value="  Search Now  "]').click()
        await itemNameWindow.getByText(itemSearchData.productInformation.productName).first().click()
    }

    async saveQuote() {
        await this.saveQuoteField.click()
        await this.page.waitForLoadState('networkidle')
    }

    async quoteBillingInformation(quoteBillingAddressData) {
        await this.page.locator('textarea[name="bill_street"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingAddress)
        await this.page.locator('input[name="bill_pobox"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingPoBox)
        await this.page.locator('input[name="bill_city"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingCity)
        await this.page.locator('input[name="bill_state"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingState)
        await this.page.locator('input[name="bill_code"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingPostalCode)
        await this.page.locator('input[name="bill_country"]').fill(quoteBillingAddressData.addressInfo.billingAddressSection.billingCountry)
    }

    async quoteShippingInformation(quoteShippingAddressData) {
        await this.page.locator('textarea[name="ship_street"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingAddress)
        await this.page.locator('input[name="ship_pobox"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingPoBox)
        await this.page.locator('input[name="ship_city"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingCity)
        await this.page.locator('input[name="ship_state"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingState)
        await this.page.locator('input[name="ship_code"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingPostalCode)
        await this.page.locator('input[name="ship_country"]').fill(quoteShippingAddressData.addressInfo.shippingAddressSection.shippingCountry)
    }

    async quoteDescription(descriptionInfo) {
        await this.page.locator('//textarea[@name="description"]').fill(descriptionInfo.descriptionInfo.description)
    }

    async quoteItemsDetails(itemsData) {
        await this.page.locator('//textarea[@name="comment1"]').fill(itemsData.itemDetails.comments1)
        await this.page.locator('//input[@name="shipping_handling_charge"]').fill(itemsData.itemDetails.shippingHandlingCharges)
        await selectByText(this.page.locator('select[name="adjustmentType"]'), itemsData.itemDetails.adjustmentType)
        await this.page.locator('//input[@name="adjustment"]').fill(itemsData.itemDetails.adjustment)
    }
}