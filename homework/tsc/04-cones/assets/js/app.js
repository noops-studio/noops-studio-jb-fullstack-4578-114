var inputElement = document.getElementById("numberInput");
var buttonElement = document.getElementById("generateButton");
buttonElement.addEventListener("click", function () {
    var inputNumber = parseInt(inputElement.value);
    if (isNaN(inputNumber) || inputNumber <= 0) {
        alert("Please enter a positive integer.");
        return;
    }
    var stars = generateStarTriangles(inputNumber);
    var contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML += stars;
    }
});
function generateStarTriangles(n) {
    var result = "";
    for (var i = 0; i < n; i++) {
        var spaces = " ".repeat(n - i - 1);
        var stars = "* ".repeat(i + 1);
        result += "".concat(spaces).concat(stars.trim(), "<br>");
    }
    for (var i = n - 2; i >= 0; i--) {
        var spaces = " ".repeat(n - i - 1);
        var stars = "* ".repeat(i + 1);
        result += "".concat(spaces).concat(stars.trim(), "<br>");
    }
    return result;
}
