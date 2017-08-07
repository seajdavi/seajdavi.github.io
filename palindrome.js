function isPalindrome(string) {
    var half = Math.ceil((string.length)/2);
    var negIndex = 1;
    for (var i=0; i<half; i++) {
        if (string[i] !== string[string.length -negIndex]) {
            return false;
        }
        negIndex ++;
    }
    return true;
}

// maybe change the color of something based on result
// change font type of string and 'is (not) a palindrome'
function updateHtml(string) {

    if (isPalindrome(string)) {
        document.getElementById('result').innerHTML = string + ' is a palindrome';
    }
    else {
        document.getElementById('result').innerHTML = string + ' is not a palindrome';
    }
}