class finalCountdown {
  constructor(year, month, day, hours, mins, secs, four_item_nodelist){

    ///↓↓↓↓
    const instance = this
    ///↑↑↑↑

    //Output HTML element
    this.four_item_nodelist = four_item_nodelist

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

    //Today LOL
    this.today = new Date().getTime()

    //Time left in ms
    this.t =   this.futureDate - this.today

    //idea is to write a message when due date arrives
    if (this.isOver) {
      console.log(`countdown halted!`);
      clearInterval(this.countdown)
    }

    //renders countdown in html output target {four_item_nodelist}
    this.showCountDown = function(){
      four_item_nodelist.forEach(function(item, index){item.innerHTML = instance.addZero(instance.time_left[index]) })
    }


    //this keeps updating HTML element every second //Works 10/10 #############
    this.countdown = setInterval(instance.showCountDown, 1000)
    this.gameover = setTimeout(function(){clearInterval(instance.countdown)}, instance.t-50)


    this.instance = instance
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

addZero (number) {
  return (number<10) ? `0${number}` : `${number}`
}

get isOver() {return (this.t<0) ? true : false}

//make today a getter :v



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

    return [days, hours, mins, secs]
}


get legend(){

return `${this.weekday} ${this.month} ${this.day}${this.nth(newdates.day)}, ${this.year} ${this.addZero(this.hours)}:${this.addZero(this.mins)}:${this.addZero(this.secs)}`

}


}



//Selectors
const giveaway = document.querySelector('.giveaway') // a date. i.e.:Jan 30th, 2023
const deadline_items = document.querySelectorAll('.deadline-format h4') //i.e.: days, hours, mins, secs

// let newdates = new finalCountdown(2022, 4, 13, 03, 59, 00)
let newdates = new finalCountdown(2022, 8, 3, 24, 0, 0, deadline_items)

// setInterval(newdates.showCountDown(), 1000) // very quick!!!





// ### Testing ###
console.log(newdates.weekdays); //expected 2022
console.log(newdates.time_left[3]);
console.log(newdates.isOver)
console.log(newdates.instance);





//make it a fulldate
// giveaway.textContent = `Giveaway ends on ${newdates.weekday} ${newdates.month} ${newdates.day}${newdates.nth(newdates.day)}, ${newdates.year} ${newdates.hours}:${newdates.mins}:${newdates.secs}`
giveaway.textContent = `Giveaway ends on ${newdates.legend}`



//161



// minimal example:
//

const placeholder = document.querySelectorAll('.duedate')
const label = document.querySelector('.label')

let somelist = [2023, 0, 30, 11, 00, 00]

const nextBD = new finalCountdown(2023, 0, 30, 11, 00, 00, placeholder)
label.textContent = `Chico's BD ${nextBD.legend}`
