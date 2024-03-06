const schedule = require('node-schedule');

const updateSearchTickerData = require('./UpdateProcedures/updateTickerData')


// const everyMinute = schedule.scheduleJob('*/1 * * * *', () => {
//     console.log('Task executed every 1 minute:', new Date().toLocaleTimeString());
//     console.log(`${new Date()} job started`)
//   });


let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = 7;
rule.minute = 0;
rule.second = 0;

var timeEverySecond = schedule.scheduleJob(rule, function () {
  updateSearchTickerData()
});