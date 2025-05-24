import { test, expect, Locator } from '@playwright/test';
import {Page} from '@playwright/test';

export class ProductPage{

    page : Page;
    itemname : Locator;
    itemdesc : Locator;
    itemprice : Locator;
    addtocart : Locator;
    remove : Locator;
    carticon : Locator;
    cartbadge : Locator;
    backhome : Locator;

    constructor (page: Page) {
        this.page = page;
        this.itemname = page.locator('[data-test=inventory-item-name]');
        this.itemdesc = page.locator('[data-test=inventory-item-desc]');
        this.itemprice = page.locator('[data-test=inventory-item-price]');
        this.addtocart = page.locator('#add-to-cart');
        this.remove = page.locator('#remove');
        this.carticon = page.locator('.shopping_cart_link');
        this.cartbadge = page.locator('[data-test=shopping-cart-badge]');
        this.backhome = page.locator('#back-to-products');

    }

    async validatepageDetails(itemdetails : {productname: string, productprice: string}) {
        expect(await this.itemname.textContent()).toBe(itemdetails.productname);
       // expect(await this.itemdesc.textContent()).toBe(itemdetails.desc);
        expect(await this.itemprice.textContent()).toBe(itemdetails.productprice);
        expect(await this.carticon).toBeVisible();

    }

    async addCart () {
        await this.addtocart.click();
        expect(await this.remove).toBeVisible();
    }

    async navigateCart() {
        await this.carticon.click();
        expect(await this.page.locator('[data-test=title]').textContent()).toBe('Your Cart');
    }

    async backtohome() {
        await this.backhome.click();
        expect(this.page.getByText('Products')).toBeVisible();
    }
}
