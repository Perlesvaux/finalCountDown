
class finalCountdown {
  constructor(dateDisplay, ...date_placeholder){

    //timer will render on HTML element parsed here
    this.dateDisplay = dateDisplay
    this.dateDisplay.style.display = 'flex'

    //insert a 4-item-nodelist so it displays
    this.dateDisplay.innerHTML = `
    <div class="deadline-container" style="display: flex; text-transform:capitalize">
      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='days' style="letter-spacing:0.25rem; line-height:1.25; margin-bottom:0.75rem; font-size:2em;"> </h4>
        <span>days</span>
      </div>

      <div class='deadline-elem' style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class="hours" style="letter-spacing:0.25rem; line-height:1.25; margin-bottom:0.75rem; font-size:2em;"> </h4>
        <span>hours</span>
      </div>

      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='mins' style="letter-spacing:0.25rem; line-height:1.25; margin-bottom:0.75rem; font-size:2em;"> </h4>
        <span>mins</span>
      </div>

      <div class="deadline-elem" style="background:hsl(209, 61%, 16%); color:#fff; margin-right:1rem; width:5rem; height:5rem; display:grid; place-items:center; text-align:center;">
        <h4 class='secs' style="letter-spacing:0.25rem; line-height:1.25; margin-bottom:0.75rem; font-size:2em;"> </h4>
        <span>secs</span>
      </div>
    </div>
    `
    this.dateContent = document.querySelectorAll('.deadline-elem h4')

    //Keeps focus of 'this' on current object instance. prevents error in showCountDown (i.e.: forEach)
    const instance = this

    // Year:2000, Month:0-11, Day:1-30, Hour:0-24, Mins:60, Secs:60
    if (date_placeholder.length == 6){
    this.futureDate = new Date(date_placeholder[0], date_placeholder[1], date_placeholder[2], date_placeholder[3], date_placeholder[4], date_placeholder[5]) }
    else if (date_placeholder.length == 3){
    this.futureDate = new Date(date_placeholder[0], date_placeholder[1], date_placeholder[2]) }

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

    //Time left in ms: calculated WHEN instance is created //Not used, really :V
    this.t =   this.futureDate - this.today

    //This string replaces timer 1-second after it reaches 0. Editable by user
    this.msg = `Time's up! ⏳🛑`

    //idea is to write a message when due date arrives!
    this.halt = function(){ if (this.p<1000) { clearInterval(this.countdown) ; setTimeout(()=>{ this.dateDisplay.innerHTML = this.msg }, 1000)}}

    //renders countdown in html output target {four_item_nodelist}
    this.showCountDown = function(){
      instance.halt()
      instance.dateContent.forEach(function(item, index){ item.innerHTML = instance.addZero(instance.time_left[index]) })
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

  //adds a '0' at the right of a number below 10
  addZero (number) { return (number<10) ? `0${number}` : `${number}` }

  //Turns the future date input into an easy to read string
  get legend(){ return `${this.weekday}, ${this.month} ${this.day}${this.nth(this.day)} ${this.year} @ ${this.addZero(this.hours)}:${this.addZero(this.mins)}:${this.addZero(this.secs)}` }

  //Returns current time in ms every time p is calculated
  get today(){ return new Date().getTime() }

  //Returns how much time is left every time time_left is calculated
  get p(){ return this.futureDate-this.today }

  //this.showCountDown accesses this property every second. It returns a list of DD HH MM SS left
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
