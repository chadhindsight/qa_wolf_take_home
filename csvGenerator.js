const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Extract CSV creation logic into its own dedicated file for increased readability 
// and better separation of concerns.
const writeArticlesToCSV = async (articles, filePath) => {
    const csvCreator = createCsvWriter({
        path: filePath,
        header: [
            { id: 'title', title: 'Title' },
            { id: 'url', title: 'URL' },
        ]
    });

    await csvCreator.writeRecords(articles);
    console.log(`Hacker News articles have been saved to ${filePath}!`);
};

module.exports = { writeArticlesToCSV };
