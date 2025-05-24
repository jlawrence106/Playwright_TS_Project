import { Page, Locator } from "@playwright/test"; 
import { test, expect } from '@playwright/test';


export class MycartPage{

    page : Page;
    qty : Locator;
    itemname : Locator;
    itemdesc : Locator;
    itemprice : Locator;
    checkoutBtn : Locator;

    constructor(page: Page) {
        this.page = page;
        this.qty = page.locator('[data-test=item-quantity]');
        this.itemname = page.locator('[data-test=inventory-item-name]');
        this.itemdesc = page.locator('[data-test=inventory-item-desc]');
        this.itemprice = page.locator('[data-test=inventory-item-price]');
        this.checkoutBtn = page.locator('#checkout');
    }

    async validatepage (itemdetails: string[]) {
    
    }

    async checkout () {
        await this.checkoutBtn.click();
        expect(await this.page.locator('[data-test=title]').textContent()).toBe('Checkout: Your Information');
    }

}

