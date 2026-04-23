const puppeteer = require('puppeteer');
const path = require('path');

async function generate(page, mode, filename) {
  await page.evaluate(m => {
    document.body.classList.remove('mode-short', 'mode-long');
    document.body.classList.add('mode-' + m);
  }, mode);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: filename,
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log('Generated', filename);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Wide enough viewport so the ≤900px responsive breakpoint never fires
  await page.setViewport({ width: 1440, height: 900 });

  const fileUrl = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  await generate(page, 'short', 'Matvii_Kovtun_CV_Quick.pdf');
  await generate(page, 'long',  'Matvii_Kovtun_CV_Full.pdf');

  await browser.close();
})();
