import {expect, test} from '@playwright/test'
import productData from "../../test_data/produts.json"
import loginData from "../../test_data/login.json"
import {Products} from '../../pages/ProductsPage.js'
import {SignIn} from '../../pages/LoginPage.js'

// test('Products Create', async ({page}) => {
//     test.setTimeout(60000)
//     await page.goto(loginData.url)
//     await expect(page.locator('//input[@type="text"]')).toBeVisible()
//     await expect(page.locator('//input[@type="password"]')).toBeVisible()
//     await expect(page.locator('//input[@type="submit"]')).toBeEnabled()
//     await page.locator('//input[@type="text"]').fill(loginData.username)
//     await page.locator('//input[@type="password"]').fill(loginData.password)
//     await page.locator('//input[@type="submit"]').click()
//     await expect(page).toHaveURL(productData.productUrl)
//     await page.locator('//a[text()="Products"]').click() 
//     await page.locator('//img[@title="Create Product..."]').click()
//     await expect(page.locator('//INPUT[@name="productname"]')).toBeVisible()
//     await page.locator('//INPUT[@name="productname"]').fill(productData.productName)
//     await expect(page.locator('//INPUT[@name="productname"]')).toHaveValue(productData.productName)
//     await page.locator('//input[@type="submit"]').first().click()
//     let createProductConfirmationMessage = await page.locator('//span[@class="lvtHeaderText"]')
//     await expect(createProductConfirmationMessage).toContainText(productData.productName)
//     await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
//     await page.getByText('Sign Out').click()
//     await page.waitForTimeout(5000)   
// })

test('POM Create Product', async ({page}) => {
    test.setTimeout(90000)
    let productPage = new Products(page)
    let userLogin = new SignIn(page)
    await userLogin.browserLaunch(loginData.url)
    await userLogin.loginUser(loginData)
    await productPage.createProduct(productData[0])
    await productPage.productAdditionalInfo(productData[0])
    await productPage.pricingInformation(productData[0])
    await productPage.stockInformation(productData[0])
    await productPage.productImage(productData[0])
    await productPage.productDescription(productData[0])
    await productPage.saveProduct()
    let confirmMessage = page.locator('.lvtHeaderText')
    await expect(confirmMessage).toContainText(productData[0].productInformation.productName)
    await userLogin.logoutUser()
})