import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import { selectByText } from '../Utility/dropdown.js'
import { switchToPopup } from '../Utility/popup.js'

export class SalesOrder {
    constructor(page) {
        this.page = page;
        this.moreButtonField = page.locator('//a[text()="More"]')
        this.salesOrderButtonField = page.locator('//a[@name="Sales Order"]')
        this.createSalesOrderField = page.locator('//img[@title="Create Sales Order..."]')
        this.salesSubjectField = page.locator('//input[@name="subject"]')
        this.produtQuantityField = page.locator('#qty1')
        this.saveSalesOrderField = page.locator('//input[@value="  Save  "]').last()
    }

    async createSalesOrderPage(salesOrderData) {
        let randomNumber = generateRandomNumber()
        await this.moreButtonField.click()
        await this.salesOrderButtonField.click()
        await this.createSalesOrderField.click()
        await this.salesSubjectField.fill(`${salesOrderData.salesInformation.saleSubject} ${randomNumber}`)
        await this.produtQuantityField.fill(salesOrderData.itemDetails.productQuantity)
    }

    async saveSalesOrder() {
        await this.saveSalesOrderField.click()
        await this.page.waitForLoadState('networkidle')
    }

    async opportunityPopUp(oppSearchData) {
        const opportunityWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(0).click())
        await opportunityWindow.locator('#search_txt').fill(oppSearchData.opportunityInformation.opportunityName)
        await opportunityWindow.locator('//select[@class="txtBox"]').selectOption('Opportunity')
        await opportunityWindow.locator('//input[@value="  Search Now  "]').click()
        await opportunityWindow.getByText(oppSearchData.opportunityInformation.opportunityName).first().click()
    }

    async quotePopUp(quoteSearchData) {
        const quoteWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(1).click())
        await quoteWindow.locator('#search_txt').fill(quoteSearchData.quoteInformation.quoteSubject)
        await quoteWindow.locator('//select[@class="txtBox"]').selectOption('Subject')
        await quoteWindow.locator('//input[@value="  Search Now  "]').click()
        await quoteWindow.getByText(quoteSearchData.quoteInformation.quoteSubject).first().click()
    }

    async contactPopUp(contactSearchData) {
        const contactWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(2).click())
        await contactWindow.locator('#search_txt').fill(contactSearchData.contactInformation.firstName)
        await contactWindow.locator('//select[@class="txtBox"]').selectOption(contactSearchData.contactInformation.popUpDropDownOption)
        await contactWindow.locator('//input[@value="  Search Now  "]').click()
        await contactWindow.getByText(contactSearchData.contactInformation.firstName).first().click()
    }

    async organisationPopUp(orgSearchData) {
        const organisationWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(3).click())
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationInfo.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationInfo.organisationName).first().click()
    }

    async itemWindow(itemSearchData) {
        const itemNameWindow = await switchToPopup(this.page, () => this.page.locator('//img[@title="Products"]').click())
        await itemNameWindow.locator('#search_txt').fill(itemSearchData.productInformation.productName)
        await itemNameWindow.locator('//select[@class="txtBox"]').selectOption(itemSearchData.productInformation.dropDownItem)
        await itemNameWindow.locator('//input[@value="  Search Now  "]').click()
        await itemNameWindow.getByText(itemSearchData.productInformation.productName).nth(2).click()
    }

    async additionalInformation(additionalDetails) {
        await selectByText(this.page.locator('select[name="carrier"]'), additionalDetails.salesInformation.carrier)
        await selectByText(this.page.locator('select[name="sostatus"]'), additionalDetails.salesInformation.status)
        await this.page.locator('input[name="customerno"]').fill(additionalDetails.salesInformation.customerNumber)
        await this.page.locator('input[name="vtiger_purchaseorder"]').fill(additionalDetails.salesInformation.purchaseOrder)
        await this.page.locator('input[name="pending"]').fill(additionalDetails.salesInformation.pending)
        await this.page.locator('input[name="salescommission"]').fill(additionalDetails.salesInformation.salesCommission)
        await this.page.locator('input[name="exciseduty"]').fill(additionalDetails.salesInformation.exciseDuty)
    }
    async salesBillingInformation(salesBillingAddressData) {
        await this.page.locator('textarea[name="bill_street"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingAddress)
        await this.page.locator('input[name="bill_pobox"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingPoBox)
        await this.page.locator('input[name="bill_city"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingCity)
        await this.page.locator('input[name="bill_state"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingState)
        await this.page.locator('input[name="bill_code"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingPostalCode)
        await this.page.locator('input[name="bill_country"]').fill(salesBillingAddressData.addressInfo.billingAddressSection.billingCountry)
    }

    async salesShippingInformation(salesShippingAddressData) {
        await this.page.locator('textarea[name="ship_street"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingAddress)
        await this.page.locator('input[name="ship_pobox"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingPoBox)
        await this.page.locator('input[name="ship_city"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingCity)
        await this.page.locator('input[name="ship_state"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingState)
        await this.page.locator('input[name="ship_code"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingPostalCode)
        await this.page.locator('input[name="ship_country"]').fill(salesShippingAddressData.addressInfo.shippingAddressSection.shippingCountry)
    }

    async salesDescription(descriptionInfo) {
        await this.page.locator('//textarea[@name="description"]').fill(descriptionInfo.descriptionInfo.description)
    }

    async salesItemsDetails(itemsData) {
        await this.page.locator('//textarea[@name="comment1"]').fill(itemsData.itemDetails.comments1)
        await this.page.locator('//input[@name="shipping_handling_charge"]').fill(itemsData.itemDetails.shippingHandlingCharges)
        await selectByText(this.page.locator('select[name="adjustmentType"]'), itemsData.itemDetails.adjustmentType)
        await this.page.locator('//input[@name="adjustment"]').fill(itemsData.itemDetails.adjustment)
    }
}