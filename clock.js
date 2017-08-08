// const secondHand = document.querySelector('.secondHand');
// const test = document.getElementById('test');
// console.log(test);
var secondHand;
var minuteHand;
var hourHand;

function getElements() {
    secondHand = document.getElementById('secondHand');
    console.log(secondHand);
    minuteHand = document.getElementById('minuteHand');
    hourHand = document.getElementById('hourHand');
}


function setTime() {
    const now = new Date();
    const second = now.getSeconds();
    const secondDegrees = ((second/60) * 360) + 90;

    // if (secondDegrees >= 444) {
    //     secondHand.style.transition = 'all 0s';
    //     secondHand.style['transition-timing-function'] = 'cubic-bezier(0,0,0,0)';
    //
    // }
    //
    // else {
    //     secondHand.style.transition = 'all 0.05s';
    //     secondHand.style['transition-timing-function'] = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
    // }


    secondHand.style.transform = 'rotate(' + secondDegrees + 'deg)';

    const minute = now.getMinutes();
    const minuteDegrees = ((minute/60) * 360) + 90;
    minuteHand.style.transform = 'rotate(' + minuteDegrees + 'deg)';

    const hour = now.getHours();
    const hourDegrees = ((hour/12) * 360) + 90;
    hourHand.style.transform = 'rotate(' + hourDegrees + 'deg)';
    hourHand.style.transform = 'translate(125%,-50%)';

}


setInterval(setTime, 1000);