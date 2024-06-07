// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Use the '.athing' class to identify the <tr> els needed
  const articleList = await page.$$eval('.athing', articles => {
    return articles.slice(0, 10).map(article => {
      const title = article.querySelector('.title a').innerText;
      const url = article.querySelector('.title a').href;
      return { title, url };
    });
  });

  // Old solution left for reference
  // const articleList = await page.evaluate(() => {
  //   const articles = document.querySelectorAll('.athing');
  //   return Array.from(articles)
  //     .slice(0, 10)
  //     .map(article => {
  //       const titleElement = article.querySelector('.title a');
  //       return {
  //         title: titleElement.innerText,
  //         url: titleElement.href
  //       };
  //     });
  // });

  // write the articleList to a CSV file
  const writeToCSV = createCsvWriter({
    path: 'news_articles.csv',
    header: [
      { id: 'title', title: 'Title' },
      { id: 'url', title: 'URL' },
    ]
  });
  await writeToCSV.writeRecords(articleList);
  console.log('Top 10 articles have been saved to hacker_news_articles.csv');

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
