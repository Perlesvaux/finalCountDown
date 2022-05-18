# finalCSimplified.js
Easy to use fire-and-forget countdown class.

# Setup
## parameters
1. an HTML element
2. a future date.

## Selectors
1. An empty **div**
>This will render the *Days*, *Hours*, *Mins* & *Secs* left (required)

2. Another empty **div**
>This will display the *due date* (optional)

## Future date format
-it can be entered as 3-comma-separated-numbers
>2030, 0, 30 //2030, Jan 30th.

-or, as 6-comma-separated-numbers
>2030, 0, 30, 18, 45, 0 //2030, Jan 30th @ 6:45:00pm

Year:2000, Month:0-11, Day:1-30, Hour:0-24, Mins:60, Secs:60

### Minimal example
in <HTML>:
```
<div id="timer"></div>
<div id="duedate"></div>
```

in JS (Required)
```
const display = document.getElementById('timer')
const timeLeft = new finalCountdown(display, 2030, 08, 22, 4, 20, 00) //triggering countdown. Renders on *timer* element
```

In JS (Optional)
```
const birthday = document.getElementById('duedate')
duedate.textContent = timeLeft.legend //displaying deadline on *duedate* element
timeLeft.msg = `HBD!🎂🎊🎉` //Customizing message that pops up when time is over.
```
