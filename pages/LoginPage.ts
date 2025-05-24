import { Page, Locator } from "@playwright/test"; 
import { test, expect } from '@playwright/test';

export class LoginPage {

    usernameTxt: Locator;
    passwordTxt: Locator;
    loginBtn: Locator;
    applogoImg: Locator;

    constructor(page : Page)
    {
        this.usernameTxt = page.locator('#user-name');
        this.passwordTxt = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.applogoImg = page.locator('[class=app_logo]');
      
    }

    async login(username : string, password : string)
    {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
        await expect(this.applogoImg).toBeVisible({ timeout: 30_000 });
    } 

}

