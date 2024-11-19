// // const emp={
// // privetname: 'John',
// // lastname: 'Doe',
// // salary: 1000
// // };


// // for(const proparty in emp){
// //     document.write(`${proparty} : ${emp[proparty]} <br>`);
// // }

// // emp.address='USA';
// // delete emp.salary;

// // document.write(emp.salary);


// const grades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// for (const grade in grades) {
//     document.write(`${grade} : ${grades[grade]} <br>`);
// }h

document.addEventListener('DOMContentLoaded', () => {
    // Create the calculator container
    const calculator = document.createElement('div');
    calculator.id = 'calculator';

    // Add styles to the calculator
    calculator.style.background = 'white';
    calculator.style.padding = '20px';
    calculator.style.borderRadius = '10px';
    calculator.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    calculator.style.width = '220px'; // Adjusted width for better button layout
    calculator.style.textAlign = 'center';
    calculator.style.margin = 'auto';
    calculator.style.marginTop = '100px';

    // Create the display
    const display = document.createElement('input');
    display.id = 'display';
    display.disabled = true;
    display.style.width = '100%';
    display.style.height = '40px';
    display.style.textAlign = 'right';
    display.style.fontSize = '24px';
    display.style.border = '1px solid #ccc';
    display.style.borderRadius = '5px';
    display.style.padding = '5px';
    calculator.appendChild(display);

    // Functions
    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function calculateResult() {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = 'שגיאה';
        }
    }

    // Button layout
    const buttonLayout = [
        ['1', '2', '3', 'C'],
        ['4', '5', '6', '/'],
        ['7', '8', '9', '*'],
        ['+', '0', '-', '=']
    ];

    buttonLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'center';
        rowDiv.style.margin = '5px 0';

        row.forEach(button => {
            const btn = document.createElement('button');
            btn.innerText = button;
            btn.style.width = '50px';
            btn.style.height = '50px';
            btn.style.fontSize = '20px';
            btn.style.margin = '5px';
            btn.style.cursor = 'pointer';
            btn.onclick = () => {
                if (button === 'C') {
                    clearDisplay();
                } else if (button === '=') {
                    calculateResult();
                } else {
                    appendToDisplay(button);
                }
            };
            rowDiv.appendChild(btn);
        });

        calculator.appendChild(rowDiv);
    });

    // Add the calculator to the body
    document.body.appendChild(calculator);
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.backgroundColor = '#f4f4f4';
});