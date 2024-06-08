// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { writeArticlesToCSV } = require('./csvGenerator.js');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Use the '.athing' class to identify the <tr> elements needed
  const articleList = await page.$$eval('.athing', articles => {
    const topTen = articles.slice(0, 10);

    return topTen.map(article => {
      const title = article.querySelector('.title a').innerText;
      const url = article.querySelector('.title a').href;
      return { title, url };
    });
  });

  await writeArticlesToCSV(articleList, "news_articles.csv")
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
