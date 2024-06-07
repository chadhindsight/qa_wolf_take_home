// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Use the '.athing' class to identify the <tr> el needed
  const articleList = await page.$$eval('.athing', articles => {
    return articles.slice(0, 10).map(article => {
      const title = article.querySelector('.title a').innerText;
      const url = article.querySelector('.title a').href;
      return { title, url };
    })
  })

  // write the articleList to a CSV file
  const csvWriter = createCsvWriter({
    path: 'hacker_news_articles.csv',
    header: [
      { id: 'title', title: 'Title' },
      { id: 'url', title: 'URL' },
    ]
  });
}

(async () => {
  await saveHackerNewsArticles();
})();
