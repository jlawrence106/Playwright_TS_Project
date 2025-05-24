import { Page, Locator } from "@playwright/test"; 
import { test, expect } from '@playwright/test';


export class HomePage
{
    page : Page;
    menu : Locator;
    products : Locator;
    addtocartBtn : Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.menu = page.locator('[class=bm-item-list] a');
        this.products = page.locator('[class=inventory_list]  [class=inventory_item]');
        this.addtocartBtn = page.getByText("Add to cart");

    }

async menuValidate(menuitemsArr : {name: string, length : number}) {

        const itemcount = await this.menu.count();
        const allitems = await this.menu.allInnerTexts();
        console.log(`element lenght ${allitems}`);
        expect(itemcount).toBe(menuitemsArr.length);
        for (let i = 0; i < itemcount; i++) {
            expect(allitems[i]).toBe(menuitemsArr[i].name);
        }
}

async productValidate(productitemsArr : {productname : string, productdesc : string, productprice : string, length : number }) {
    
        const itemcount = await this.products.count();
        expect(itemcount).toBe(productitemsArr.length);
        for (let i = 0; i < itemcount; i++) {
           expect (await this.products.locator('.inventory_item_name').nth(i).textContent()).toBe(productitemsArr[i].productname);
           expect (await this.products.locator('.inventory_item_desc').nth(i).textContent()).toBe(productitemsArr[i].productdesc);
           expect (await this.products.locator('.inventory_item_price').nth(i).textContent()).toBe(productitemsArr[i].productprice);
        }
    }

async getProduct(itemname : string) {
    var pos : number = 0;

    const itemcount = await this.products.count();
    
    for (let i = 0; i < itemcount; i++) {
        let nameextract = await this.products.locator('.inventory_item_name').nth(i).textContent();
        console.log(`Name Extract ${nameextract}`);
        if (nameextract == itemname){
            pos = i;
            console.log(`pos value ${pos}`);
        }
    }
    return pos;
    }

    async addtoCart(itemname : string) {

        const pos : any  = this.getProduct(itemname);
        await this.products.getByText('Add to cart').nth(pos).click();
        expect (await this.products.nth(pos).getByText('Remove')).toBeVisible();
    }

async openProduct(itemname : string) {
    console.log(`Item Name ${itemname}`);
        const pos = await this.getProduct(itemname);
        console.log(`op pos value ${pos}`);
        await this.products.locator('.inventory_item_name').nth(pos).click();
        expect ( await this.page.getByText('Back to products')).toBeVisible(); 
    }

}
