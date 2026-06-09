export class SignIn
{
    constructor(page)
    {
        this.page = page;
        this.userNameField = page.locator('//input[@type="text"]');
        this.passwordField = page.locator('//input[@type="password"]')
        this.loginButtonField = page.getByRole('button', {name: 'Login'})
        this.userIconField = page.locator('//img[@src="themes/softed/images/user.PNG"]');
        this.signOutField = page.getByText('Sign Out');
    }

    async browserLaunch(url)
    {
        await this.page.goto(url)
    }

    async loginUser(userDetails)
    {
        await this.userNameField.fill(userDetails.userName)
        await this.passwordField.fill(userDetails.password)
        await this.loginButtonField.click()
    }

    async logoutUser()
    {
        await this.userIconField.hover();
        await this.signOutField.click()
    }
}