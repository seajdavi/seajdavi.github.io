// const secondHand = document.querySelector('.secondHand');
// const test = document.getElementById('test');
// console.log(test);
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
    const second = now.getSeconds();
    const secondDegrees = ((second/60) * 360) + 90;

    h = 30 * (now.getHours() % 12 + now.getMinutes() / 60) + 90;
    m = 6 * now.getMinutes() + 90;
    s = 6 * now.getSeconds() + 90;

    if (secondDegrees > 444 || secondDegrees <= 90 ) {
        secondHand.style.transition = 'all 0s';
        secondHand.style['transition-timing-function'] = 'cubic-bezier(0,0,0,0)';

    }
    else {
        secondHand.style.transition = 'all 0.05s';
        secondHand.style['transition-timing-function'] = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
    }

    secondHand.style.transform = 'rotate(' + s + 'deg)';

    const minute = now.getMinutes();
    const minuteDegrees = ((minute/60) * 360) + 90;
    minuteHand.style.transform = 'rotate(' + m + 'deg)';

    const hour = now.getHours();
    const hourDegrees = ((hour/12) * 360) + 90;
    hourHand.style.transform = 'rotate(' + h + 'deg)';
    // hourHand.style.transform = 'translate(125%,-50%)';

    // console.log(['hours',now.getHours(), hourDegrees, h]);
    // console.log(['minutes', now.getMinutes(), minuteDegrees, m]);
    // console.log(['seconds',now.getSeconds(), secondDegrees, s]);




    // console.log([hourDegrees, h]);
    // console.log([secondDegrees, s]);
    // console.log([minuteDegrees, m]);



}


setInterval(setTime, 1000);