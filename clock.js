var secondHand;
var minuteHand;
var hourHand;

function getElements() {
    secondHand = document.getElementById('secondHand');
    minuteHand = document.getElementById('minuteHand');
    hourHand = document.getElementById('hourHand');
}


function setTime() {
    const now = new Date();

    const hourDegrees = 30 * (now.getHours() % 12 + now.getMinutes() / 60) + 90;
    const minuteDegrees = 6 * now.getMinutes() + 90;
    const secondDegrees = 6 * now.getSeconds() + 90;

    // this will stop the second hand from going all the way around the clock when it changes from 59 seconds to 0
    if (secondDegrees > 444 || secondDegrees <= 90 ) {
        secondHand.style.transition = 'all 0s';
        secondHand.style['transition-timing-function'] = 'cubic-bezier(0,0,0,0)';
    }
    else {
        secondHand.style.transition = 'all 0.05s';
        secondHand.style['transition-timing-function'] = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
    }

    secondHand.style.transform = 'rotate(' + secondDegrees + 'deg)';
    minuteHand.style.transform = 'rotate(' +  minuteDegrees + 'deg)';
    hourHand.style.transform = 'rotate(' + hourDegrees + 'deg)';
}


setInterval(setTime, 1000);

