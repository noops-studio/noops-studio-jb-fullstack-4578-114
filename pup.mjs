import puppeteer from 'puppeteer';
import fs from 'fs';
 
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Set cookies for authentication
    const cookies = [
        { name: "_gcl_au", value: "1.1.1452690353.1728302490", domain: "cloud.dreamvps.com" },
        { name: "first_visit", value: "1728302490", domain: "cloud.dreamvps.com" },
        { name: "anonymous_id", value: "1987:1ce0c71f0106a6284cb0d51901df6b", domain: "cloud.dreamvps.com" },
        { name: "_ga", value: "GA1.2.488960405.1728302490", domain: "cloud.dreamvps.com" },
        { name: "_fbp", value: "fb.1.1728302490508.994677483474049324", domain: "cloud.dreamvps.com" },
        { name: "__stripe_mid", value: "36cab73b-707b-4994-8148-2d75d754dd8b37928d", domain: "cloud.dreamvps.com" },
        { name: "_gid", value: "GA1.2.1724520415.1731143236", domain: "cloud.dreamvps.com" },
        { name: "flashy_attribution", value: "[\"direct x 4\"]", domain: "cloud.dreamvps.com" },
        { name: "cf_clearance", value: "GbI9zlNnj3mV8og6d7lWLyJ_RUSrJ0ioXYOPp50.jXo-1731143236-1.2.1.1-Y4auhdF.9yseovD8LLnugMNqO7PmeqBi8yv0rxUPRAPo0ho8lTF3vUIZEOo9chxNhNKoo9po62QFOxLS7jqkteXGAm7kj5bm91J.yycMPVbaNYsPpCR7ti70RAA4jIa.POgH.MbDxIdgGSJQdF5jGsmyd3YduBKMBf0D3ASoDdSUxAORE2cqi32Xacs1SnxLAh7Uj575cinHVnZSNKN1jSp249qvEr_Jpo_BzcrxkkVN0NwN.cZ8rUZjlq_D_kUr44DwtJBa9uCb0o.Hojnf7dIEYKfmqM68inCbzfV0McZSlSRzO4z3cXUTW3jaMzJql.J2q0TfzWQ44qakAzI5Ydwg8capkJS3PnAZzq5cRvMVBZ6LKV6G7ALYaCGn7diu", domain: "cloud.dreamvps.com" },
        { name: "_ga_KNVXNY4MPN", value: "GS1.2.1731143236.6.0.1731143236.60.0.0", domain: "cloud.dreamvps.com" },
        { name: "cloud-session", value: "s%3AdvVZrF_EuNKtModR_4yUiThQx1NcCYQI.b38J5ishspHH0Ioe5g9c18UAzvuEgtes5AM92dTBiCg", domain: "cloud.dreamvps.com" }
    ];

    await page.setCookie(...cookies);

    // Set viewport
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to the initial page
    await page.goto('https://cloud.dreamvps.com/en/my-cloud/servers', { waitUntil: 'load' });

    // Navigate to reach the target element (these steps simulate navigation through clicks as needed)
    await page.waitForSelector('div._actions_1dh6m_15 a');
    await page.click('div._actions_1dh6m_15 a');

    await page.waitForSelector('div._pageContentWrapper_zfiwg_58 > div > div:nth-of-type(1) path:nth-of-type(1)');
    await page.click('div._pageContentWrapper_zfiwg_58 > div > div:nth-of-type(1) path:nth-of-type(1)');

    await page.waitForSelector('#root > div > div > button div');
    await page.click('#root > div > div > button div');

    await page.waitForSelector('div:nth-of-type(6)');
    await page.click('div:nth-of-type(6)');

    await page.waitForSelector('div:nth-of-type(6) button:nth-of-type(1)');
    await page.click('div:nth-of-type(6) button:nth-of-type(1)');

    await page.waitForSelector('button > svg');
    await page.click('button > svg');

    // Target selector for the specific element
    const targetSelector = "#root > div > div > div._pageContentWrapper_zfiwg_58 > div._planWrapper_1y5a3_1._padding_1y5a3_7";

    // Extract CSS selector and computed styles for the element
    const result = await page.evaluate((targetSelector) => {
        const element = document.querySelector(targetSelector);

        if (!element) return { selectorPath: '', computedStyles: '' };

        // Use the selector provided
        const selectorPath = targetSelector; 

        // Get computed styles
        const computedStyles = window.getComputedStyle(element);
        let stylesText = '';
        for (let i = 0; i < computedStyles.length; i++) {
            const propertyName = computedStyles[i];
            const propertyValue = computedStyles.getPropertyValue(propertyName);
            stylesText += `    ${propertyName}: ${propertyValue};\n`;
        }

        return { selectorPath, computedStyles: stylesText };
    }, targetSelector);

    // Write the extracted selector and styles to a file in CSS format
    const cssFileContent = `${result.selectorPath} {\n${result.computedStyles}}\n`;
    fs.writeFileSync('element_styles.css', cssFileContent);
    console.log("CSS file 'element_styles.css' has been created with the selector and computed styles of the specified element.");

    await browser.close();
})();
 