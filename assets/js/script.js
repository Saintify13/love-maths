//Wait for the DOM to finish loading before running game//
//Get the button elements and the event listener to them//

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }       
        })
    }

    this.doctype.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Create two numbers between 1 and 25//
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw`unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in 
 * the retured calcultedCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculedAnswer[0];
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore()
    } else {
        alert(`Awwww....You answered ${userAnswer}. The correct answer was ${calculedAnswer[0]}!`);
        incrementWrongAnswer()
    }

    runGame(calculedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operators (plus, minus etc)
 * directly from the dom, and return the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`unimplemented operator ${operator}`)
        throw `unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Get the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parse(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}

/**
 * Get the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parse(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;


}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}

function displayDivideQuestion() {
    
}