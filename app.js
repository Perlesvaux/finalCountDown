// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// const weekdays = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
//
// // Selectors
// const giveaway = document.querySelector('.giveaway') // a date. i.e.:Jan 30th, 2023
// const deadline_container = document.querySelector('.deadline') //container for countdown
// const deadline_items = document.querySelectorAll('.deadline-format h4') //i.e.: days, hours, mins, secs
//
// // Year:2000, Month:0-11, Day:1-30, Hour:0-24, Mins:60, Secs:60
// // Also, new Date() = Today! LOL
// // let futureDate = new Date(2022, 7, 23, 18, 30, 59)
//
// let futureDate = new Date(2022, 4, 12, 20, 49, 00)
//
// //futureDate pieces
// const year = futureDate.getFullYear()
// const day = futureDate.getDate()
// const hours = futureDate.getHours()
// const mins = futureDate.getMinutes()
// const secs = futureDate.getSeconds()
// //months and weekdays require a list to be displayed
// const month = months[futureDate.getMonth()]
// const weekday =weekdays[futureDate.getDay()]
// //futureDate expresed as ms since: Jan 1, 1970 00:00:00 (ECMAScript epoch)
// const future_time = futureDate.getTime()
//
//
// //adds 'st', 'nd', 'rd', 'th' depending on the last digit
// function nth (somedate){
//   const number  = somedate.toString()
//   const ordinal = {"1$":'st', "2$":'nd', "3$":'rd', "[4-9]$|0$":'th'}
//   for (var key in ordinal) if (number.match(key)!=null) return ordinal[key]
// }
//
// //adds a '0' at the left if single-digit numbers. i.e.: 9→09, 1→01
// function format (number) {
//   return (number<10) ? `0${number}` : `${number}`
// }
//
// //legend telling when countdown will end
// giveaway.textContent = `Giveaway ends on ${weekday} ${month} ${day}${nth(day.toString())}, ${year} ${hours}:${mins}:${secs}`
//
//
//
// function getRemainingTime() {
//   // 1s = 1000ms
//   // 1m = 60s
//   // 1hr = 60min
//   // 1d = 24hr
//   const today = new Date().getTime()
//   const t = future_time - today //Time left in ms
//
//   //Values in ms
//     const _day  = 24*60*60*1000
//     const _hour = 60*60*1000
//     const _min = 60*1000
//     const _sec = 1000
//
//   //calculate all values
//     let days = Math.floor(t / _day)          //Time left split in days
//     let hours = Math.floor(t % _day / _hour) //Remainder of hours left in day
//     let mins = Math.floor(t % _hour / _min)  //Remainder of mins left in hour
//     let secs = Math.floor(t % _min /  _sec)  //remainder of sec left in min
//
//     const date_parts = [days, hours, mins, secs]
//
//     deadline_items.forEach(function(item, index){
//       item.innerHTML = format(date_parts[index])
//     })
//
//     if (t < 0) {
//       clearInterval(countdown)
//       deadline_container.innerHTML = `<h4 class ='expired'> Sorry! It's expired already :v</h4>`
//     }
//
//   // return (t < 0) ? true : false
// }
//
//
// let countdown = setInterval(getRemainingTime, 1000)

// ↑↑↑↑↑↑↑↑↑↑↑↑ this code works 100% fine!






























class finalCountdown {
  constructor(year, month, day, hours, mins, secs){

    // Year:2000, Month:0-11, Day:1-30, Hour:0-24, Mins:60, Secs:60
    this.futureDate = new Date(year, month, day, hours, mins, secs)

    //futureDate pieces
    this.year = this.futureDate.getFullYear()
    this.day = this.futureDate.getDate()
    this.hours = this.futureDate.getHours()
    this.mins = this.futureDate.getMinutes()
    this.secs = this.futureDate.getSeconds()

    //months and weekdays require a list to be displayed
    this.month = this.months[this.futureDate.getMonth()]
    this.weekday = this.weekdays[this.futureDate.getDay()]

    //futureDate expresed as ms since: Jan 1, 1970 00:00:00 (ECMAScript epoch)
    this.future_time = this.futureDate.getTime()

    //Once 'true', it halts the countdown
    this.isOver = false

    this.countdown = setInterval(this.time_left, 1000)
    if (this.isOver) {
      console.log(`countdown halted!`);
      clearInterval(this.countdown)
    }


  }

// isOver = false

months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

//adds 'st', 'nd', 'rd', 'th' depending on the last digit
nth (somedate){
  const number  = somedate.toString()
  console.log(number);
  const ordinal = {"1$":'st', "2$":'nd', "3$":'rd', "[4-9]$|0$":'th'}
  for (var key in ordinal) if (number.match(key)!=null) return ordinal[key]
}

//adds a '0' at the left if single-digit numbers. i.e.: 9→09, 1→01
addZero (number) {
  return (number<10) ? `0${number}` : `${number}`
}

get time_left() {
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr
    const today = new Date().getTime()
    const t =   this.futureDate - today //Time left in ms

  //Values in ms
    const _day  = 24*60*60*1000
    const _hour = 60*60*1000
    const _min = 60*1000
    const _sec = 1000

  //calculate all values
    let days = Math.floor(t / _day)          //Time left split in days
    let hours = Math.floor(t % _day / _hour) //Remainder of hours left in day
    let mins = Math.floor(t % _hour / _min)  //Remainder of mins left in hour
    let secs = Math.floor(t % _min /  _sec)  //remainder of sec left in min

    // const date_parts = [days, hours, mins, secs]

    //return a [days, hours, mins, secs] list
    // deadline_items.forEach(function(item, index){
    //   item.innerHTML = format(date_parts[index])
    // })

    // if (t < 0) {
    //   clearInterval(countdown)
    //   deadline_container.innerHTML = `<h4 class ='expired'> Sorry! It's expired already :v</h4>`
    // }


  if (t < 0) {this.isOver = true} else {this.isOver = false}
   // if (t < 0) this.countdown_stop()
  console.log(days, hours, mins, secs);
  return [days, hours, mins, secs]
}





//add a getter for this ↓ so that it updates automatically

//get countdown() {
//   if (!this.isOver) {
//
//     const span = setInterval(this.time_left, 1000)
// return 'on'
//   }
//
//   else {
//
//     clearInterval(span)
//     return 'off'
//   }

// return setInterval(this.time_left, 1000)}


//
// countdown_stop(){
//   console.log('works!')
//   clearInterval(countdown)}
//
//


}





let newdates = new finalCountdown(2022, 4, 12, 23, 39, 00)

console.log(newdates.weekdays); //expected 2022
console.log(newdates.year, newdates.month, newdates.day, newdates.hours, newdates.mins, newdates.secs);
console.log(newdates.isOver);

// console.log(newdates.countdown);
console.log(newdates.time_left[3]);
// console.log(newdates.countdown);

console.log(newdates.isOver)


const giveaway = document.querySelector('.giveaway') // a date. i.e.:Jan 30th, 2023
const deadline_items = document.querySelectorAll('.deadline-format h4') //i.e.: days, hours, mins, secs



//make it a fulldate
giveaway.textContent = `Giveaway ends on ${newdates.weekday} ${newdates.month} ${newdates.day}${newdates.nth(newdates.day)}, ${newdates.year} ${newdates.hours}:${newdates.mins}:${newdates.secs}`

//pass args: {HTML output for DD HH MM SS} & {Message to output once timer ends}
function somefunc (){
setInterval(()=> {deadline_items.forEach(function(item, index){
  item.innerHTML = newdates.addZero(newdates.time_left[index])
}), 1000}
)
}

somefunc()
// deadline_items.forEach(function(item, index){
//   item.innerHTML = newdates.addZero(newdates.time_left[index])
// })























// Selectors
// const giveaway = document.querySelector('.giveaway') // a date. i.e.:Jan 30th, 2023
// const deadline_container = document.querySelector('.deadline') //container for countdown
// const deadline_items = document.querySelectorAll('.deadline-format h4') //i.e.: days, hours, mins, secs

// //legend telling when countdown will end
// giveaway.textContent = `Giveaway ends on ${weekday} ${month} ${day}${nth(day.toString())}, ${year} ${hours}:${mins}:${secs}`
