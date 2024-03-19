// Define las preguntas y las alternativas
const triviaData = [
    {
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPDvzmsXaOQWK3hUVvccmkR-uRvuVRAdG0jA&usqp=CAU",
        question: "¿Cuál es el animal más rápido del mundo?",
        options: ["Guepardo", "Leopardo", "León", "Tigre"],
        answer: "Guepardo"
    },
    {
        imagen: "https://i.blogs.es/cfa26e/rickandmortycabecera/1366_2000.jpg",
        question: "¿En qué año comenzó la Primera Guerra Mundial?",
        options: ["1914", "1918", "1939", "1945"],
        answer: "1914"
    },
    {
        imagen: "https://i.blogs.es/cfa26e/rickandmortycabecera/1366_2000.jpg",
        question: "¿Cuál es la capital de Francia?",
        options: ["Londres", "Roma", "París", "Madrid"],
        answer: "París"
    },
    {
        imagen: "https://i.blogs.es/cfa26e/rickandmortycabecera/1366_2000.jpg",
        question: "¿Quién escribió la novela 'Cien años de soledad'?",
        options: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa", "Isabel Allende"],
        answer: "Gabriel García Márquez"
    }
];

// Obtén referencias a los elementos HTML
const imageContainer = document.getElementById("imageContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");

let correctCount = 0;
let incorrectCount = 0;
const totalQuestions = triviaData.length
const incorrectAnswers = []; 

// Inicializa el índice de pregunta actual
let currentQuestionIndex = 0;

// Función para mostrar la pregunta actual y sus alternativas
function showQuestion() {
    
    const currentQuestion = triviaData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    imageContainer.innerHTML = `<img src="${currentQuestion.imagen}" width=800  alt="Imagen de la trivia">`;

    optionsElement.innerHTML = ""; // Limpiar opciones anteriores

    // Crear botones para las opciones de respuesta
    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        
        optionButton.onclick = () => {
            checkAnswer(option); // Verificar la respuesta
            showNextQuestion(); // Mostrar la próxima pregunta después de verificar
        };

        optionsElement.appendChild(optionButton); // agrega las opciones a la lista de opciones
    });
}
// Función para mostrar la próxima pregunta
function showNextQuestion() {
    currentQuestionIndex++; // aumenta el index en 1
    if (currentQuestionIndex < triviaData.length) { // valida si hay más preguntas
        showQuestion(); // Mostrar la próxima pregunta
    } else {
        showResult(); // Mostrar todas las preguntas si ya no hay más
    }
}

// Función para verificar la respuesta del usuario
function checkAnswer(userAnswer) {
    const correctAnswer = triviaData[currentQuestionIndex].answer;
    if (userAnswer === correctAnswer) {
        // Incrementar el contador de respuestas corrcetas
        correctCount++; 
    } else {
        // Incrementar el contador de respuestas incorrectas
        incorrectCount++
        incorrectAnswers.push({
            question: triviaData[currentQuestionIndex].question,
            correctAnswer: correctAnswer,
            userAnswer: userAnswer
        });
    }
}


// Función para mostrar el resultado final en la tarjeta
function showResult() {
    const resultContent = document.getElementById("resultContent");
    resultContent.innerHTML = `Total de preguntas correctas: ${correctCount}<br>`;
    resultContent.innerHTML += `Total de preguntas incorrectas: ${incorrectCount}<br><br>`;
    resultContent.innerHTML += "Lista de todas las preguntas con las respuestas correctas e incorrectas:<br><br>";

    triviaData.forEach((questionData, index) => {
        const question = questionData.question;
        const correctAnswer = questionData.answer;
        const userAnswer = incorrectAnswers[index] ? incorrectAnswers[index].userAnswer : "No respondida";
        resultContent.innerHTML += `<strong>Pregunta ${index + 1}:</strong> ${question}<br>`;
        resultContent.innerHTML += `Respuesta correcta: ${correctAnswer}<br>`;
        resultContent.innerHTML += `Respuesta del usuario: ${userAnswer}<br><br>`;
    });

    // remove cardGame
    // Mostrar la tarjeta de resultados
    const gameCard = document.getElementById("gameCard");
    gameCard.classList.add("hidden");

    // Mostrar la tarjeta de resultados
    const resultCard = document.getElementById("resultCard");
    resultCard.classList.remove("hidden");
}

// Evento clic del botón "Reiniciar"
document.getElementById("restartButton").addEventListener("click", function() {
    // Restaurar valores predeterminados
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    incorrectAnswers.length = 0;
    
    // Ocultar la tarjeta de resultados
    const resultCard = document.getElementById("resultCard");
    resultCard.classList.add("hidden");

    // Mostrar la primera pregunta
    const gameCard = document.getElementById("gameCard");
    gameCard.classList.remove("hidden");

    showQuestion();
});


// Mostrar la primera pregunta al cargar la página
showQuestion();

