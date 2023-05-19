function generateAdditionQuestion() {
    // Generate two random numbers between 1 and 100
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;

    // Calculate the answer
    var answer = num1 + num2;

    // Generate the question string
    var question = "Lösen Sie " + num1 + " + " + num2 + " =";

    // Return the question and the answer
    return {
        question: question,
        answer: answer
    };
}
