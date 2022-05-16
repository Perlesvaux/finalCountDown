// console.log(new Date(2022, 12, 30)); //month starts in 0, as normal...
// let lasislas = [2022, 12, 30] // ↓
// console.log(new Date(lasislas)); //month starts in 1 // MAX x3 variables

class finalCountdown {
  constructor(four_item_nodelist, ...date_placeholder){
    // const list = [...date_placeholder]

    this.date_placeholder = date_placeholder

    ///↓↓↓↓
    const instance = this
    ///↑↑↑↑

    console.log(date_placeholder.length);
    // // console.log(date_placeholder);
    // console.log(list);

    switch (date_placeholder.length) {
      case 3:
        console.log(date_placeholder, date_placeholder.length);

        break;
      case 6:
      // console.log(date_placeholder, date_placeholder.length);

      //Output HTML element
      // this.four_item_nodelist = four_item_nodelist
      console.log(four_item_nodelist);

      console.log(this.date_placeholder);
      // const bd = [2020, 1, 30]

      // Year:2000, Month:0-11, Day:1-30, Hour:0-24, Mins:60, Secs:60
      this.futureDate = new Date(date_placeholder[0], date_placeholder[1], date_placeholder[2], date_placeholder[3], date_placeholder[4], date_placeholder[5])
      console.log(this.futureDate);

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

      //Today LOL
      // this.today = new Date().getTime()

      //Time left in ms: calculated WHEN instance is created
      this.t =   this.futureDate - this.today

      //idea is to write a message when due date arrives!
      this.halt = function(){if (this.p<0) { console.log(`countdown halted!`); clearInterval(this.countdown) }}

      //renders countdown in html output target {four_item_nodelist}
      this.showCountDown = function(){
        console.log('lel');
        four_item_nodelist.forEach(function(item, index){item.innerHTML = instance.time_left[index] ; instance.halt()}) //; console.log(instance.addZero(instance.time_left[index]))
      }

      //this keeps updating HTML element every second //Works 10/10 #############
      this.countdown = setInterval(this.showCountDown, 1000)
      // this.gameover = setTimeout(function(){clearInterval(instance.countdown)}, instance.t-50)


      break;
    }
  }

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
    const ordinal = {"1$":'st', "2$":'nd', "3$":'rd', "[4-9]$|0$":'th'}
    for (var key in ordinal) if (number.match(key)!=null) return ordinal[key]
  }

  addZero (number) { return (number<10) ? `0${number}` : `${number}` }

  get isOver() { return (this.p<0) ? true : false }

  get today(){ return new Date().getTime() }

  get p(){ return this.futureDate-this.today }

  get legend(){ return `${this.weekday} ${this.month} ${this.day}, ${this.year} ${this.addZero(this.hours)}:${this.addZero(this.mins)}:${this.addZero(this.secs)}` }

  get time_left() {

      //Values in ms
        const _day  = 24*60*60*1000 // 1d = 24hr
        const _hour = 60*60*1000    // 1hr = 60min
        const _min = 60*1000        // 1m = 60s
        const _sec = 1000           // 1s = 1000ms

      //Math using constant p → futureDate - Today
        let days = Math.floor(this.p / _day)          //Time left split in days
        let hours = Math.floor(this.p % _day / _hour) //Remainder of hours left in day
        let mins = Math.floor(this.p % _hour / _min)  //Remainder of mins left in hour
        let secs = Math.floor(this.p % _min /  _sec)  //remainder of sec left in min

      return [days, hours, mins, secs]
  }
}



//Selectors
const giveaway = document.querySelector('.giveaway') // a date. i.e.:Jan 30th, 2023
const deadline_items = document.querySelectorAll('.deadline-format h4') //i.e.: days, hours, mins, secs

// const newdates = new finalCountdown(deadline_items, 2022, 5, 13, 18, 49, 00)
const newdates = new finalCountdown(deadline_items, 2022, 04, 15, 19, 29, 00)
giveaway.textContent = `Giveaway ends on ${newdates.legend}`

//### 2022, 6, 3, 22, 0, 0 si funciona
//# no funciona //2022, 6, 00, 00, 00, 00// 2022, 5, 8, 9, 00, 00//  2022, 6, 3, 0, 0, 0// 2022, 6, 3, 22, 0, 0


// minimal example:
const placeholder = document.querySelectorAll('.duedate')
const label = document.querySelector('.label')
const nextBD = new finalCountdown(placeholder, 2022, 06, 04, 23, 55, 00)
label.textContent = `Chico's BD ${nextBD.legend}`
// setInterval(newdates.showCountDown, 1000)



// ### Testing ###
// console.log(newdates.weekdays); //expected 2022
// console.log(newdates.time_left[3]);
// console.log(newdates.isOver)
// console.log(newdates.instance);

// const nextBD = new finalCountdown(placeholder, 2023, 0, 30, 11, 00, 00)






//161




//
// let somelist = [2023, 0, 30, 11, 00, 00]
//












//↓gets triggered on event
// function faceass(){
// return new object(param1, param2)
//
//
//}











// // this getter works fine a s well! #########
// get fin (){
//   const countdown = setInterval(this.showCountDown, 1000)
//   const gayover = setTimeout(function(){clearInterval(countdown)}, this.t-50)
//   console.log(this.t-100);
// }


// this.timer = function (){
//   const countdown = setInterval(instance.showCountDown, 1000)
//   const gayover = setTimeout(function(){clearInterval(countdown)}, instance.t-50)
//   console.log(instance.t-100);
// }


// newdates.timer()  // it works!! 100% // if wrapped within a func, timer. otherwise, just countdown
// newdates.fin
