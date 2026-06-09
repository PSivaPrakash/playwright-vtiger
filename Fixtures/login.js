import { test as base } from '@playwright/test'
import { SignIn } from '../pages/LoginPage.js'
import loginData from '../test_data/login.json'

export let test = base.extend({
    loginPage: async ({ page }, use) => {
        let userLogin = new SignIn(page)
        await userLogin.browserLaunch(loginData.url)
        await userLogin.loginUser(loginData)
        await use(page)
    }
})