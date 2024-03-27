
let startDate = new Date()
let startDateValue = startDate.valueOf()

let minus1Year = startDate.setFullYear(startDate.getFullYear() - 1) && startDate;
let minus1YearValue =minus1Year.valueOf()

startDate = new Date()
let minus1Month = startDate.setMonth(startDate.getMonth() - 1) && startDate;
let minus1MonthValue = minus1Month.valueOf()

startDate = new Date()
let minus3Month = startDate.setMonth(startDate.getMonth() - 3) && startDate;
let minus3MonthValue = minus3Month.valueOf() 

startDate = new Date()
let minus6Month = startDate.setMonth(startDate.getMonth() - 6) && startDate;
let minus6MonthValue = minus6Month.valueOf() 

startDate = new Date()
let minus1Week = startDate.setDate(startDate.getDate() - 7) && startDate;
let minus1WeekValue = minus1Week.valueOf()

startDate = new Date()
let year = startDate.getFullYear() - 1
let ytdDate = new Date(`${year}-12-31`)
let ytdDateValue = ytdDate.valueOf()





