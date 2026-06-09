
export class PopUps
{
    constructor(page)
    {
        this.page = page
    }
    async organisationPopUp(orgSearchData)
    {
        let [organisationWindow] = await Promise.all([
        this.page.waitForEvent('popup') ,
        this.page.locator('//img[@src="themes/softed/images/select.gif"]').first().click()
    ])
        await organisationWindow.locator('#search_txt').fill(orgSearchData.organisationName)
        await organisationWindow.locator('//input[@type="button"]').click()
        await organisationWindow.getByText(orgSearchData.organisationName).click()
    }

    async opportunityPopUp(oppSearchData)
    {
        let [opportunityWindow] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(0).click()
    ])
    await opportunityWindow.locator('#search_txt').fill(oppSearchData.opportunityName)
    await opportunityWindow.locator('//select[@class="txtBox"]').selectOption('Opportunity')
    await opportunityWindow.locator('//input[@value="  Search Now  "]').click()
    await opportunityWindow.getByText(oppSearchData.opportunityName).click()
    }

    async quotePopUp(quoteSearchData)
    {
        let [quoteWindow] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(1).click()
    ])
    await quoteWindow.locator('#search_txt').fill(quoteSearchData.quoteSubject)
    await quoteWindow.locator('//select[@class="txtBox"]').selectOption('Subject')
    await quoteWindow.locator('//input[@value="  Search Now  "]').click()
    await quoteWindow.getByText(quoteSearchData.quoteSubject).click()
    }

    async contactPopUp(contactSearchData)
    {
        let [contactWindow] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(2).click()
    ])
    await contactWindow.locator('#search_txt').fill(contactSearchData.firstName)
    await contactWindow.locator('//select[@class="txtBox"]').selectOption(contactSearchData.dropDownOption)
    await contactWindow.locator('//input[@value="  Search Now  "]').click()
    await contactWindow.getByText(contactSearchData.firstName).click()
    }

    async itemWindow(itemSearchData)
    {
        let [itemNameWindow] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.locator('//img[@title="Products"]').click()
    ])
    await itemNameWindow.locator('#search_txt').fill(itemSearchData.productName)
    await itemNameWindow.locator('//select[@class="txtBox"]').selectOption(itemSearchData.dropDownItem)
    await itemNameWindow.locator('//input[@value="  Search Now  "]').click()
    await itemNameWindow.getByText(itemSearchData.productName).click()
    }

    async salesWindow(saleSearchData)
    {
        let [salesWindow] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.locator('//img[@src="themes/softed/images/select.gif"]').nth(0).click()
    ])
    await salesWindow.locator('#search_txt').fill(saleSearchData.saleSubject)
    await salesWindow.locator('//select[@class="txtBox"]').selectOption(saleSearchData.dropDownOption)
    await salesWindow.locator('//input[@value="  Search Now  "]').click()
    await salesWindow.getByText(saleSearchData.saleSubject).click()
    }
}