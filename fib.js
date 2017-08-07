// freezes when letters are entered

function fib(num) {
    if (num == 0) {
        document.getElementById('result').innerHTML += String(0) + '<br>';
        return 0;
    }
    else if (num == 1) {
        document.getElementById('result').innerHTML += String(1) + '<br>';
        return 1;
    }
    else {
        var position = 1;
        var curNum = 1;
        var prevNum = 0;
        var temp;

        while (position != num) {
            console.log(position);
            console.log(num);
            temp = prevNum;
            prevNum = curNum;
            curNum += temp;
            position += 1;
        }

        document.getElementById('result').innerHTML += String(curNum) + '<br>';
        return curNum;
    }

}

// This is pretty inefficient
// Would be better to create an array and store previously calculated numbers in it
function fibRange (num) {
    for (var i=0; i<=num; i++) {
        fib(i);
    }
}


function clearResults(num, type) {
    document.getElementById('result').innerHTML = '';

    if (type === 'single') {
        fib(num);
    }
    else {
        fibRange(num);
    }
}