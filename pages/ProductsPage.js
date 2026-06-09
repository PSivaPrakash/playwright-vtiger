import { generateRandomNumber } from '../Utility/getRandomNumber.js'
import {selectByText} from '../Utility/dropdown.js'

export class Products{
    constructor(page)
    {
        this.page = page;
        this.productsTabField = page.locator('//a[text()="Products"]')
        this.createProductButtonField = page.locator('//img[@title="Create Product..."]')
        this.productNameField = page.locator('//input[@name="productname"]')
        this.saveProductsField = page.locator('//input[@type="submit"]').first()
        this.ConfirmationMessageField = page.locator('.lvtHeaderText')
    }

    async createProduct(productData)
    {
        let randomNumber = generateRandomNumber()
        await this.productsTabField.click()
        await this.createProductButtonField.click()
        await this.productNameField.fill(`${productData.productInformation.productName} ${randomNumber}`)
    }

    async productAdditionalInfo(productData)
    {
        await selectByText(this.page.locator('select[name="productcategory"]'), productData.productInformation.productCategory)
        await selectByText(this.page.locator('select[name="glacct"]'), productData.productInformation.glAccount)
        await selectByText(this.page.locator('select[name="manufacturer"]'), productData.productInformation.manufacturer)
        await this.page.locator('//input[@name="productcode"]').fill(productData.productInformation.partNumber)
        await this.page.locator('//input[@name="vendor_part_no"]').fill(productData.productInformation.vendorPartNumber)
        await this.page.locator('//input[@name="mfr_part_no"]').fill(productData.productInformation.mfrPartNumber)
        await this.page.locator('//input[@name="website"]').fill(productData.productInformation.website)
        await this.page.locator('//input[@name="productsheet"]').fill(productData.productInformation.productSheet)
        await this.page.locator('//input[@name="serial_no"]').fill(productData.productInformation.serialNumber)
    }

    async pricingInformation(pricingInfo)
    {
        await this.page.locator('//input[@name="unit_price"]').fill(pricingInfo.procingInformation.unitPrice)
        await this.page.locator('//input[@name="commissionrate"]').fill(pricingInfo.procingInformation.commissionRate)
        await this.page.locator('//input[@name="tax1_check"]').click()
        await this.page.locator('//input[@name="tax2_check"]').click()
        await this.page.locator('//input[@name="tax3_check"]').click()

    }

    async stockInformation(stockInfo)
    {
        await selectByText(this.page.locator('select[name="usageunit"]'), stockInfo.stockInformation.usageUnit)
        await this.page.locator('//input[@name="qty_per_unit"]').fill(stockInfo.stockInformation.qtyUnit)
        await this.page.locator('//input[@name="qtyinstock"]').fill(stockInfo.stockInformation.qtyInStock)
        await this.page.locator('//input[@name="reorderlevel"]').fill(stockInfo.stockInformation.recorderLevel)
        await this.page.locator('//input[@name="qtyindemand"]').fill(stockInfo.stockInformation.qtyInDemand)
    }

    async productImage(imageInfo)
    {
      await this.page.locator('//input[@name="file_0"]').setInputFiles(imageInfo.productImageInformation.productImageLocation) 
    }

    async productDescription(descriptionInfo)
    {
        await this.page.locator('//textarea[@name="description"]').fill(descriptionInfo.descriptionInformation.description)
    }

    async saveProduct()
    {
        await this.saveProductsField.click()
        await this.page.waitForLoadState('networkidle')
    }
}