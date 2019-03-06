const cron = require('node-cron');
const search = require('../actions/ups_search.js');

let temp;

const packageCron = () => {
  cron.schedule('*/5 * * * * *', async () => {
    const searchResult = await search('1Z58W4F50340368007');
    console.log(searchResult);
    if (temp === undefined) {
      // Add new current status into DB
      temp = searchResult;
      console.log('new temp')
    } else if (temp !== searchResult) {
      // Add new current status into DB
      console.log('different');
    } else {
      // Do nothing
      console.log('same')
    }
  });
}

packageCron();
