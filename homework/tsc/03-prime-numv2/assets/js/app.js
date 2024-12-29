var num1 = 0;
var num2 = 0;
document.getElementById("formy").addEventListener("submit", function (e) {
    e.preventDefault();
    num1 = parseInt(document.getElementById("number1").value);
    num2 = parseInt(document.getElementById("number2").value);
    init(num1, num2);
});
var init = function (num1, num2) {
    document.getElementById("content").innerHTML = "";
    var printPrimeNumber = function (number1, number2) {
        var numbers = [];
        for (var i = number1; i <= number2; i++) {
            var flag = 0;
            for (var j = 2; j < i; j++) {
                if (i % j === 0) {
                    flag = 1;
                    break;
                }
            }
            if (i > 1 && flag === 0) {
                numbers.push(i);
            }
        }
        return numbers;
    };
    if (num1 > num2) {
        var primes = printPrimeNumber(num2, num1);
    }
    else {
        var primes = printPrimeNumber(num1, num2);
    }
    for (var _i = 0, primes_1 = primes; _i < primes_1.length; _i++) {
        var num = primes_1[_i];
        document.getElementById("content").innerHTML += "<li>".concat(num, "</li>");
    }
};
