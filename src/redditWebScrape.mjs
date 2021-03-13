import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://www.reddit.com/r/scraping/');
await page.waitForSelector('body');

const posts = await page.evaluate(() => {
  const allPosts = document.body.querySelectorAll('.Post');

  return Array.from(allPosts).map(elem => ({
    postTitle: elem.querySelector('h3')?.innerText ?? '',
    postDescription: elem.querySelector('p')?.innerText ?? '',
  }));
});

console.log(posts);

await browser.close();
