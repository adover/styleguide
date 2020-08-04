const puppeteer = require('puppeteer');
const path = require('path');
const devices = require('../../viewports');

const currentEnvironment = 'local';

const folder = `./shots/${currentEnvironment}/`;

const domains = {
  prod: 'https://shop.countdown.co.nz',
  local: 'http://localhost:55520',
};

const filePath = f =>
  f
    .replace('/shop/', '')
    .replace(/\//g, '_')
    .replace('?name=', '')
    .replace('&name=', '')
    .replace('?stockcode=', '')
    .replace('?', '')
    .toLowerCase();

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen'],
  });

  console.log('Do screenshots');

  for (let p of pages) {
    Object.keys(devices).forEach(async device => {
      console.log(`\n\r Starting for file ${p} on device ${device}`);
      try {
        const page = await browser.newPage();
        console.log(`Navigating to page ${domains[currentEnvironment]}${p}`);

        await page.setViewport(devices[device]);

        const qs = p.indexOf('?') > -1 ? '&mode=pluto' : '?mode=pluto';

        await page.goto(`${domains[currentEnvironment]}${p}`, {
          timeout: 10500000,
          waitUntil: 'networkidle0',
        });

        console.log('Taking screenshot');
        await page.screenshot({
          path: path.join(__dirname, `${folder}${device}_${filePath(p)}.png`),
          fullPage: true,
        });

        console.log(`Screenshot taken ${domains[currentEnvironment]}${p} \n\r`);
      } catch (e) {
        console.log(e);
      }
    });
  }

  // await browser.close();
})();
