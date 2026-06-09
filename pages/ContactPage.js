import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import { selectByText } from '../Utility/dropdown.js'
import { switchToPopup } from '../Utility/popup.js'

export class Contacts {
    constructor(page) {
        this.page = page;
        this.contactTabField = page.locator('//a[text()="Contacts"]').first();
        this.createContactButtonField = page.locator('//img[@title="Create Contact..."]');
        this.contactSalutationTypeField = page.locator('//select[@name="salutationtype"]');
        this.contactFirstNameField = page.locator('//input[@name="firstname"]');
        this.contactLastNameField = page.locator('//input[@name="lastname"]');
    }
    async createContacts(contactsData) {
        let randomNumber = generateRandomNumber()
        await this.contactTabField.click()
        await this.createContactButtonField.click()
        await selectByText(this.contactSalutationTypeField, contactsData.contactInformation.salutationType)
        await this.contactFirstNameField.fill(contactsData.contactInformation.firstName)
        await this.contactLastNameField.fill(`${contactsData.contactInformation.lastName} ${randomNumber}`)
    }

    async contactAdditionalInfo(contactData) {
        await this.page.locator("//input[@name='phone']").fill(contactData.contactInformation.officePhone)
        await this.page.locator("//input[@name='mobile']").fill(contactData.contactInformation.mobile)
        await selectByText(this.page.locator('select[name="leadsource"]'), contactData.contactInformation.leadSource)
        await this.page.locator("//input[@name='homephone']").fill(contactData.contactInformation.homePhone)
        await this.page.locator("//input[@name='title']").fill(contactData.contactInformation.title)
        await this.page.locator("//input[@name='otherphone']").fill(contactData.contactInformation.otherPhone)
        await this.page.locator("//input[@name='department']").fill(contactData.contactInformation.department)
        await this.page.locator("//input[@name='fax']").fill(contactData.contactInformation.fax)
        await this.page.locator("//input[@name='email']").fill(contactData.contactInformation.email)
        // await this.page.locator("//input[@name='birthday']").fill(contactData.contactInformation.birthday)
        await this.page.locator("//input[@name='assistant']").fill(contactData.contactInformation.assistant)
        await this.page.locator("//input[@name='assistantphone']").fill(contactData.contactInformation.assistantPhone)
        await this.page.locator("//input[@name='secondaryemail']").fill(contactData.contactInformation.secondaryEmail)
        await this.page.locator("//input[@name='emailoptout']").click()
        await this.page.locator("//input[@name='donotcall']").click()
        await this.page.locator("//input[@name='reference']").click()
        await this.page.locator("//input[@name='notify_owner']").click()
    }

    async organisationPopUp(orgSearchData) {
        const organisationWindow = await switchToPopup(this.page, () => this.page.locator('//img[@src="themes/softed/images/select.gif"]').first().click())
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationInfo.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationInfo.organisationName).first().click()
    }

    async calendarWidget() {
        await this.page.locator('img[id="jscal_trigger_birthday"]').click()
        await this.page.locator('//td[contains(@class,"today")]').last().click()
    }

    async saveContact() {
        await this.page.locator('//input[@type="submit"]').last().click()
        await this.page.waitForLoadState('networkidle')
    }

    async contactMailingStreet(mailingData) {
        await this.page.locator("//textarea[@name='mailingstreet']").fill(mailingData.addressInformation.mailingAddress.mailingStreet)
        await this.page.locator("//input[@name='mailingpobox']").fill(mailingData.addressInformation.mailingAddress.mailingPoBox)
        await this.page.locator("//input[@name='mailingcity']").fill(mailingData.addressInformation.mailingAddress.mailingCity)
        await this.page.locator("//input[@name='mailingstate']").fill(mailingData.addressInformation.mailingAddress.mailingState)
        await this.page.locator("//input[@name='mailingzip']").fill(mailingData.addressInformation.mailingAddress.mailingPostalCode)
        await this.page.locator("//input[@name='mailingcountry']").fill(mailingData.addressInformation.mailingAddress.mailingCountry)
    }

    async contactOtherStreet(otherData) {
        await this.page.locator("//textarea[@name='otherstreet']").fill(otherData.addressInformation.otherAddress.otherStreet)
        await this.page.locator("//input[@name='otherpobox']").fill(otherData.addressInformation.otherAddress.othergPoBox)
        await this.page.locator("//input[@name='othercity']").fill(otherData.addressInformation.otherAddress.otherCity)
        await this.page.locator("//input[@name='otherstate']").fill(otherData.addressInformation.otherAddress.otherState)
        await this.page.locator("//input[@name='otherzip']").fill(otherData.addressInformation.otherAddress.otherPostalCode)
        await this.page.locator("//input[@name='othercountry']").fill(otherData.addressInformation.otherAddress.otherCountry)
    }

    async contactDescription(descriptionData) {
        await this.page.locator("//textarea[@name='description']").fill(descriptionData.contactDescription.description)
    }

    async contactImage() {
        await this.page.locator("//input[@name='imagename']").setInputFiles("test_data/Images/demoImage.jpeg")
    }


}