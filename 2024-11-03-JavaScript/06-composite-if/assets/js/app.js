/*
let grade = +prompt(`enter your grade`);

if (grade >= 0 && grade <= 100) {
    if (grade === 100) {
        document.write(`perffect`);
    } else if (grade >= 0 && grade <= 59) {
        document.write(`you faild`);
    } else {
        document.write(`valid`);
    }
} else {
    document.write(`invalid`);
}*/



let num = +prompt(`enter a number bitwean 1 and 5 `);


// if (num === 1) {
//     document.write(`one`)
// } else if (num === 2) {
//     document.write(`two`)
// } else if (num === 3) {

//     document.write(`three`);
// } else if (num === 4) {

//     document.write(`four`)

// } else if (num === 5) {

//     document.write(`five`)
// } else {
//     document.write(`go kill your self`)
// }

switch (num) {
    case 1:
        document.write(`one`)
        break;
    case 2:
        document.write(`two`)
        break;
    case 3:
        document.write(`three`)
        break;
    case 4:
        document.write(`four`)
        break;
    case 5:
        document.write(`five`)
        break;
    default:
        document.write(`go kill your self`)}
