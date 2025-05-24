import { Page, Locator } from "@playwright/test"; 
import { test, expect } from '@playwright/test';

export class CheckoutcompletePage {

    page : Page;
    backhome : Locator;


    constructor (page : Page) {
        this.page = page;
        this.backhome = page.locator('#back-to-products');
    }

    async backhomepage () {

        await this.backhome.click();
        expect(this.page.getByText('Products')).toBeVisible();
    }

}
