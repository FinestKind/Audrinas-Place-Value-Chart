// Function to perform the selected operation and display the result
function performOperation(operation) {
    const num1 = parseInt(document.getElementById("numberInput1").value);
    const num2 = parseInt(document.getElementById("numberInput2").value);
    const ledger1Container = document.getElementById("ledger1");
    const ledger2Container = document.getElementById("ledger2");
    const resultContainer = document.getElementById("operationResult");

    // Input validation
    if (isNaN(num1) || isNaN(num2)) {
        resultContainer.innerHTML = "<p>Please enter valid numbers for both inputs.</p>";
        return;
    }

    let result;
    let operationSymbol;

    // Perform the operation based on user selection
    switch (operation) {
        case 'add':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                resultContainer.innerHTML = "<p>Cannot divide by zero.</p>";
                return;
            }
            result = Math.floor(num1 / num2);
            operationSymbol = '÷';
            break;
    }

    // Display the place value ledger for each input number
    displayLedger(num1, ledger1Container, "Number 1");
    displayLedger(num2, ledger2Container, "Number 2");

    // Display the result in place value format
    resultContainer.innerHTML = `<p>Result (${num1} ${operationSymbol} ${num2} = ${result}):</p>`;
    displayLedger(result, resultContainer);
}

// Function to display the T-chart place value ledger with headers at the top
function displayLedger(number, container, label = "Result") {
    const numberStr = number.toString().padStart(4, '0'); // Pad to include thousands place if needed
    const placeValues = ["Thousands", "Hundreds", "Tens", "Ones"];
    const isThousandsNeeded = numberStr.length > 3 && numberStr[0] !== '0';

    // Adjust place values based on whether thousands are needed
    const activePlaceValues = isThousandsNeeded ? placeValues : placeValues.slice(1);

    // Create the T-chart header row
    let ledger = `<p><strong>${label}:</strong></p>`;
    ledger += `<div class="t-chart">`;
    activePlaceValues.forEach(place => {
        ledger += `<div class="header">${place}</div>`;
    });
    ledger += `</div><div class="t-chart">`;

    // Create columns of dots below each header
    for (let i = numberStr.length - activePlaceValues.length; i < numberStr.length; i++) {
        const digit = parseInt(numberStr[i]);
        let dots = '●'.repeat(digit) || '0';

        // Split dots into rows of 5
        let dotRows = "<div class='dot-column'>";
        while (dots.length > 5) {
            dotRows += dots.slice(0, 5) + "<br>"; // Take 5 dots and add a line break
            dots = dots.slice(5);
        }
        dotRows += dots + "</div>"; // Add remaining dots

        // Add each column to the ledger
        ledger += `<div class="dot-column">${dotRows}</div>`;
    }
    ledger += `</div>`;

    container.innerHTML = ledger;
}
