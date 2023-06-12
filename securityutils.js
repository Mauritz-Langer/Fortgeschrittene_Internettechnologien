function generateAdditionQuestion() {
    // Generate two random numbers between 1 and 10
    var num1 = Math.floor(Math.random() * 10) + 1; // Erzeugt eine Zufallszahl zwischen 1 und 10
    var num2 = Math.floor(Math.random() * 10) + 1; // Erzeugt eine weitere Zufallszahl zwischen 1 und 10

    // Calculate the answer
    var answer = num1 + num2; // Berechnet die Summe der beiden Zahlen

    // Generate the question string
    var question = "Lösen Sie " + num1 + " + " + num2 + " ="; // Erzeugt den Fragetext, z.B. "Lösen Sie 3 + 5 ="

    // Return the question and the answer
    return {
        question: question, // Gibt die Fragestellung zurück
        answer: answer // Gibt die korrekte Antwort zurück
    };
}
