function isPrime (num) {
    var result = document.getElementById('result');


    if ((isNaN(num)) || (num === '')) {
        result.innerHTML = 'Please enter a number';
        return false;
    }

    else if (num == 1 || num ==0) {
    result.innerText = num + ' can not be a prime number';
    return false;
    }

    else if (num < 0) {
      result.innerHTML = 'Negative numbers can not be prime';
      return false;
    }

    else if (num % 1 !== 0) {
    result.innerHTML = 'Please enter a whole number';
    return false;
    }




  else {
      for(var i=2; i<num; i++) {
        if (num % i == 0) {
          result.innerHTML += num + ' is not prime<br>';
          return false;
        }
      }
    result.innerHTML += num + ' is prime<br>';
    return true;
  }
}


function clearResults(num, type) {
    document.getElementById('result').innerHTML = '';

    if (type === 'single') {
        isPrime(num);
    }
    else {
        primeRange(num);
    }
}


function primeRange (num) {
    for (var i=2; i<=num; i++) {
        isPrime(i);
    }
}
