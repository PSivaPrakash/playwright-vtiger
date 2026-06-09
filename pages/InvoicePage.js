import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import { selectByText } from '../Utility/dropdown.js'
import { switchToPopup } from '../Utility/popup.js'

export class Invoice {
    constructor(page) {
        this.page = page;
        this.moreButtonField = page.locator('//a[text()="More"]')
        this.invoiceTabButtonField = page.locator('//a[@name="Invoice"]')
        this.createButtonField = page.locator('//img[@title="Create Invoice..."]')
        this.invoiceSubjectField = page.locator('//input[@name="subject"]')
        this.saveInvoiceField = page.locator('//input[@value="  Save  "]').last()
        this.productQunatityField = page.locator('#qty1')
    }

    async createInvoicePage(invoiceData) {
        let randomNumber = generateRandomNumber()
        await this.moreButtonField.hover()
        await this.invoiceTabButtonField.click()
        await this.createButtonField.click()
        await this.invoiceSubjectField.fill(`${invoiceData.invoiceInformation.invoiceSubject} ${randomNumber}`)
    }

    async salesWindow(saleSearchData) {
        const salesWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(0).click())
        await salesWindow.locator('#search_txt').fill(saleSearchData.salesInformation.saleSubject)
        await salesWindow.locator('//select[@class="txtBox"]').selectOption(saleSearchData.salesInformation.dropDownOption)
        await salesWindow.locator('//input[@value="  Search Now  "]').click()
        await salesWindow.getByText(saleSearchData.salesInformation.saleSubject).first().click()
    }

    async contactPopUp(contactSearchData) {
        const contactWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(1).click())
        await contactWindow.locator('#search_txt').fill(contactSearchData.contactInformation.firstName)
        await contactWindow.locator('//select[@class="txtBox"]').selectOption(contactSearchData.contactInformation.popUpDropDownOption)
        await contactWindow.locator('//input[@value="  Search Now  "]').click()
        await contactWindow.getByText(contactSearchData.contactInformation.firstName).first().click()
    }

    async organisationPopUp(orgSearchData) {
        const organisationWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(2).click())
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationInfo.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationInfo.organisationName).first().click()
    }

    async itemWindow(itemSearchData) {
        const itemNameWindow = await switchToPopup(this.page, () => this.page.locator('//img[@title="Products"]').click())
        await itemNameWindow.locator('#search_txt').fill(itemSearchData.productInformation.productName)
        await itemNameWindow.locator('//select[@class="txtBox"]').selectOption(itemSearchData.productInformation.dropDownItem)
        await itemNameWindow.locator('//input[@value="  Search Now  "]').click()
        await itemNameWindow.getByText(itemSearchData.productInformation.productName).nth(1).click()
    }

    async invoiceAdditionalInformation(additionalDetails) {
        await selectByText(this.page.locator('select[name="invoicestatus"]'), additionalDetails.invoiceInformation.invoicestatus)
        await this.page.locator('input[name="customerno"]').fill(additionalDetails.invoiceInformation.customerNumber)
        await this.page.locator('input[name="invoicedate"]').fill(additionalDetails.invoiceInformation.invoiceDate)
        await this.page.locator('input[name="vtiger_purchaseorder"]').fill(additionalDetails.invoiceInformation.purchaseOrder)
        await this.page.locator('input[name="exciseduty"]').fill(additionalDetails.invoiceInformation.exciseDuty)
        await this.page.locator('input[name="salescommission"]').fill(additionalDetails.invoiceInformation.salesCommission)
    }

    async invoiceBillingInformation(invoiceBillingAddressData) {
        await this.page.locator('textarea[name="bill_street"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingAddress)
        await this.page.locator('input[name="bill_pobox"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingPoBox)
        await this.page.locator('input[name="bill_city"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingCity)
        await this.page.locator('input[name="bill_state"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingState)
        await this.page.locator('input[name="bill_code"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingPostalCode)
        await this.page.locator('input[name="bill_country"]').fill(invoiceBillingAddressData.addressInfo.billingAddressSection.billingCountry)
    }

    async invoiceShippingInformation(invoiceShippingAddressData) {
        await this.page.locator('textarea[name="ship_street"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingAddress)
        await this.page.locator('input[name="ship_pobox"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingPoBox)
        await this.page.locator('input[name="ship_city"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingCity)
        await this.page.locator('input[name="ship_state"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingState)
        await this.page.locator('input[name="ship_code"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingPostalCode)
        await this.page.locator('input[name="ship_country"]').fill(invoiceShippingAddressData.addressInfo.shippingAddressSection.shippingCountry)
    }

    async invoiceDescription(descriptionInfo) {
        await this.page.locator('//textarea[@name="description"]').fill(descriptionInfo.descriptionInfo.description)
    }

    async invoiceItemsDetails(itemsData) {
        await this.page.locator('//textarea[@name="comment1"]').fill(itemsData.itemDetails.comments1)
        await this.page.locator('//input[@name="shipping_handling_charge"]').fill(itemsData.itemDetails.shippingHandlingCharges)
        await selectByText(this.page.locator('select[name="adjustmentType"]'), itemsData.itemDetails.adjustmentType)
        await this.page.locator('//input[@name="adjustment"]').fill(itemsData.itemDetails.adjustment)
    }

    async saveInvoice() {
        await this.saveInvoiceField.click()
        await this.page.waitForLoadState('networkidle')
    }
}