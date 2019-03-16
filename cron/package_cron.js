const cron = require('node-cron');
const search = require('../actions/ups_search.js');

let temp;

const packageCron = () => {
  // 30 min cron job would be '*/30 * * * *'
  cron.schedule('*/5 * * * * *', async () => {
    const searchResult = await search('1Z58W4F50340368007');
    console.log(searchResult);
    switch (true) {
      // Add new current status into DB
      case temp === undefined:
        temp = searchResult;
        console.log('new temp');
        break;
      // Add new current status into DB
      case temp !== searchResult:
        console.log('different');
        break;
      // Do nothing
      default:
        console.log('same');
        break;
    }
  });
}

packageCron();
