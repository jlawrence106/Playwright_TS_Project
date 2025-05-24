//RUN TEST $env:ENVIRONMENT="uat"; npx playwright test --debug

//Import Packages
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import {MycartPage} from '../pages/MycartPage';
import {ProductPage} from '../pages/ProductPage';
import {CheckoutinfoPage} from '../pages/CheckoutinfoPage';
import {CheckoutoverviewPage} from '../pages/CheckoutoverviewPage';
import {CheckoutcompletePage} from '../pages/CheckoutcompletePage';
import * as utils from '../utils/commonUtils';
import * as envdetails from '../env-config/envdetails';

//Import Data
const menuItems = JSON.parse(JSON.stringify(require("../test-data/menu-item.json")));
const homeproductItems = JSON.parse(JSON.stringify(require("../test-data/home-products.json")));
const custdetails = JSON.parse(JSON.stringify(require("../test-data/cust-details.json")));
const baseurl : string = envdetails.baseurl();
const username : string = envdetails.username();
const password : string = envdetails.password();

test.describe('JIRA01 - Saucetest Smoke Test Validations', () => {


  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto(baseurl);
    const loginObj = new LoginPage(page);
    await loginObj.login(username, password);  
  });

  test('TEST01 - Validate Menu Items', { tag: ['@bvt'] }, async ({ page }) => {
    const homepageObj = new HomePage(page);
    await homepageObj.menuValidate(menuItems);
  });

  test('TEST02 - Validate Product Items', { tag: ['@bvt'] }, async ({ page }) => {
  const homepageObj = new HomePage(page);
  await homepageObj.productValidate(homeproductItems);
  });

  test('TEST03 - Validate Product Pages', { tag: ['@bvt'] }, async ({ page }) => {
    
    //Home Page
    const homepageObj = new HomePage(page);
    await homepageObj.openProduct(homeproductItems[0].productname);
    
    //Product Page
    const productpageObj = new ProductPage(page);
    await productpageObj.validatepageDetails(homeproductItems[0]);
  });

  for (const product of homeproductItems) {

test(`TEST04 - End-to-end Checkout Single Item - ${product.productname}`, { tag: ['@smoke'] }, async ({ page }) => {
    
test.slow();
  //Home Page
  const homepageObj = new HomePage(page);
  await homepageObj.openProduct(product.productname);
  
  //Product Page
  const productpageObj = new ProductPage(page);
  await productpageObj.validatepageDetails(product);
  await productpageObj.addCart();
  await productpageObj.navigateCart();

  //Your Cart Page
  const yourcartObj = new MycartPage(page);
  await yourcartObj.checkout();

  //Check Out Info Page
  const yourinfoObj = new CheckoutinfoPage(page);
  await yourinfoObj.submitContinue(custdetails[0]);
  
  //Check Out Overview
  const youroverviewObj = new CheckoutoverviewPage(page);

  //Validate Order Price, Tax and Total
  await youroverviewObj.checkpriceoneproduct(product);
  await youroverviewObj.completeorder();
  ;
  //Check Out Confirmation
  const orderconfirmObj = new CheckoutcompletePage(page);
  await orderconfirmObj.backhomepage();

});

}

test('TEST05 - End-to-end Checkout Multiple Item', { tag: ['@smoke'] }, async ({ page }) => {

    test.slow();
  
  let rndindex = utils.getRndIndex(homeproductItems);

  if (rndindex == 0) {
    rndindex++;
  }

  console.log(`Random Index ${rndindex}`);

  const homepageObj = new HomePage(page);
  const productpageObj = new ProductPage(page);

  for (let i=0; i < rndindex; i++){
  
  await homepageObj.openProduct(homeproductItems[i].productname);
  
  //Product Page
  
  await productpageObj.validatepageDetails(homeproductItems[i]);
  await productpageObj.addCart();
  await productpageObj.backtohome();

  }
  
  await productpageObj.navigateCart();

  //Your Cart Page
  const yourcartObj = new MycartPage(page);
  await yourcartObj.checkout();

  //Check Out Info Page
  const yourinfoObj = new CheckoutinfoPage(page);
  await yourinfoObj.submitContinue(custdetails[0]);
  
  //Check Out Overview
  const youroverviewObj = new CheckoutoverviewPage(page);

  //Validate Order Price, Tax and Total
  await youroverviewObj.checkpricemultiproduct(homeproductItems, rndindex);
  await youroverviewObj.completeorder();
  await page.screenshot({ path: `test-screenshots/confirmpage_${utils.getNow()}.png` });
  //Check Out Confirmation
  const orderconfirmObj = new CheckoutcompletePage(page);
  await orderconfirmObj.backhomepage();

});

});
