const { chromium } = require('playwright');

async function runDailySpin() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('1. Navigating to the website...');
    await page.goto('https://www.unileverfoodsolutions.be/nl/cook-save.html');

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug0.png', fullPage: true });

    // 2. Try to accept the cookie banner if it appears.
    console.log('2. Checking for cookie banner...');
    try {
      // Use a short timeout because the banner is not always present.
      await page.getByRole('button', { name: 'Ik ga akkoord' }).click({ timeout: 5000 });
      console.log('   - Cookie banner found and accepted.');
    } catch (error) {
      // If the button isn't found after 5 seconds, log it and continue on.
      console.log('   - Cookie banner not found, continuing script.');
    }

    console.log('3. Opening the login page...');
    await page.getByRole('link', { name: 'Inloggen' }).click();

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug1.png', fullPage: true });
    
    // 4. Entering credentials into the correct form fields.
    console.log('4. Entering credentials...');
    // We select the email field by its specific label, just like the password field.

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug2.png', fullPage: true });

    await page.getByLabel('Emailadres').fill(process.env.UFS_EMAIL);
    // We select the password field by its specific label.

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug3.png', fullPage: true });

    await page.getByLabel('Wachtwoord').fill(process.env.UFS_PASSWORD);

    // 5. Click the SUBMIT button (not a link) to log in.
    console.log('5. Submitting login...');
    await page.getByRole('button', { name: 'Login' }).click();

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug4.png', fullPage: true });

    console.log('6. Spinning the wheel...');
    // Playwright's auto-waiting will wait for the element to be ready before clicking,
    // so the explicit waitForSelector call is not needed.
    await page.getByRole('link', { name: 'Draai aan het rad' }).click();

    // console.log('Taking a screenshot...');
    // await page.screenshot({ path: 'debug5.png', fullPage: true });

    await page.waitForSelector('div.wheel-dialog');

    console.log('Taking a screenshot...');
    await page.screenshot({ path: 'point.png', fullPage: true });

    // console.log('7. Clicking OK...');
    // await page.getByRole('link', { name: 'OK' }).click();

    console.log('✅ Daily spin completed successfully!');

  } catch (error) {
    await page.screenshot({ path: 'error.png', fullPage: true });
    console.error('An error occurred:', error.message);

  } finally {
    await browser.close();
  }
}

runDailySpin();