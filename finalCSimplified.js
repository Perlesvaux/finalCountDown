
class finalCountdown {
  constructor(dateDisplay, ...date_placeholder){
    this.dateDisplay = dateDisplay
    this.dateDisplay.style.display = 'flex'
    dateDisplay.innerHTML = `
    <div class="deadline-container" style="display: flex;">
      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='days' style="font-size: 0.875rem;"> </h4>
        <spa>days</span>
      </div>

      <div class='deadline-elem' style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class="hours" style="font-size: 0.875rem;"> </h4>
        <span>hours</span>
      </div>

      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='mins' style="font-size: 0.875rem;"> </h4>
        <span>mins</span>
      </div>

      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='secs' style="font-size: 0.875rem;"> </h4>
        <span>secs</span>
      </div>
    </div>
    `
    this.dateContent = document.querySelectorAll('.deadline-elem h4')

    ///↓↓↓↓
    const instance = this
    ///↑↑↑↑

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

    //Time left in ms: calculated WHEN instance is created
    this.t =   this.futureDate - this.today

    //idea is to write a message when due date arrives!
    this.halt = function(){ if (this.p<1000) { console.log(`countdown halted!`); clearInterval(this.countdown) }}

    //renders countdown in html output target {four_item_nodelist}
    this.showCountDown = function(){
      instance.dateContent.forEach(function(item, index){ instance.halt(); item.innerHTML = instance.addZero(instance.time_left[index]) })
    }

    //this keeps updating HTML element every second //Works 10/10 #############
    this.countdown = setInterval(this.showCountDown, 1000)
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
    const ordinal = {"[^1]1$|^1$":'st', "[^1]2$|^2$":'nd', "[^1]3$|^3$":'rd', "[0-9]|0$":'th'}
    for (var key in ordinal) if (number.match(key)!=null) {return ordinal[key]}
  }

  addZero (number) { return (number<10) ? `0${number}` : `${number}` }

  get isOver() { return (this.p<0) ? true : false }

  get today(){ return new Date().getTime() }

  get p(){ return this.futureDate-this.today }

  get legend(){ return `${this.weekday}, ${this.month} ${this.day}${this.nth(this.day)} ${this.year} @ ${this.addZero(this.hours)}:${this.addZero(this.mins)}:${this.addZero(this.secs)}` }

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

// minimal example
const dateDisplay = document.getElementById('test')
const future = new finalCountdown(dateDisplay, 2022, 04, 17, 00, 39, 00)

const duedate = document.getElementById('duedate')
duedate.textContent = future.legend
//#### try to add selection of 3 or 6 args <<
//### try to add a 'gameover' string that user can customise >> set a default

console.log(future.nth(1))
console.log(future.nth(2))
console.log(future.nth(3))
console.log(future.nth(11))//th
console.log(future.nth(12))//th
console.log(future.nth(13))//th
console.log(future.nth(21))
console.log(future.nth(22))
console.log(future.nth(23))
console.log(future.nth(31))
console.log(future.nth(32))
console.log(future.nth(33))
console.log(future.nth(14));
// dateDisplay.style.display = 'flex'
// dateDisplay.innerHTML = `
// <div class="deadline-container" style="display: flex;">
//   <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='days' style="font-size: 0.875rem;"> </h4>
//     <spa>days</span>
//   </div>
//
//   <div class='deadline-elem' style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class="hours" style="font-size: 0.875rem;"> </h4>
//     <span>hours</span>
//   </div>
//
//   <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='mins' style="font-size: 0.875rem;"> </h4>
//     <span>mins</span>
//   </div>
//
//   <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='secs' style="font-size: 0.875rem;"> </h4>
//     <span>secs</span>
//   </div>
// </div>
// `
// const dateContent = document.querySelectorAll('.deadline-elem')
//
// console.log(dateContent);





// select a div. add to it 4-divs already styled.
// genericDiv.style.display = 'flex'


//
// <div class="deadline" style="display: flex;">
//
//   <div class="deadline-format" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='days' style="font-size: 0.875rem;"> </h4>
//     <spa>days</span>
//   </div>
//
//   <div class='deadline-format' style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class="hours" style="font-size: 0.875rem;"> </h4>
//     <span>hours</span>
//   </div>
//
//   <div class="deadline-format" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='mins' style="font-size: 0.875rem;"> </h4>
//     <span>mins</span>
//   </div>
//
//   <div class="deadline-format" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
//     <h4 class='secs' style="font-size: 0.875rem;"> </h4>
//     <span>secs</span>
//   </div>
// </div>
