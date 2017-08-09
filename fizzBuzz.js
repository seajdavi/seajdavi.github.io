function fizzBuzz (num) {
    var result = document.getElementById('result');

    if ((isNaN(num)) || (num === '')) {
        result.innerHTML = 'Please enter a number';
        return false;
    }

    else if ((num % 5 == 0) && (num % 3 ==0)) {
        result.innerHTML += num + ': FizzBuzz<br>';
    }

    else if (num % 3 == 0){
        result.innerHTML += num + ': Fizz<br>';
    }

    else if (num % 5 == 0){
        result.innerHTML += num + ': Buzz<br>';
    }

    else {
        result.innerHTML += num + ': None<br>';
    }
}


function clearResults(num, type) {
    document.getElementById('result').innerHTML = '';

    if (type === 'single') {
        fizzBuzz(num);
    }
    else {
        fbRange(num);
    }
}


function fbRange (num) {
    for (var i=1; i<=num; i++) {
        fizzBuzz(i);
    }
}
