import { Page, Locator } from "@playwright/test"; 
import { test, expect } from '@playwright/test';

export class CheckoutinfoPage{

    page : Page ;
    firstname : Locator;
    lastname : Locator;
    zipcode : Locator;
    continue : Locator;
    cancel : Locator;


    constructor(page : Page) {
        this.page = page;
        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zipcode = page.locator('#postal-code');
        this.continue = page.locator('#continue');
        this.cancel = page.locator('#cancel');
    
    }

    async submitContinue (buyerdetails : {fname : string, lname : string, zipcode : string}) {
        await this.firstname.fill(buyerdetails.fname);
        await this.lastname.fill(buyerdetails.lname);
        await this.zipcode.fill(buyerdetails.zipcode);
        await this.continue.click();
        expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    }
}