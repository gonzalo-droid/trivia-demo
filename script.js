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

// Inicializa el índice de pregunta actual
let currentQuestionIndex = 0;

// Función para mostrar la pregunta actual y sus alternativas
function showQuestion() {
    
    const currentQuestion = triviaData[0];
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

        optionsElement.appendChild(optionButton);
    });
}
// Función para mostrar la próxima pregunta
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < triviaData.length) {
        showQuestion(); // Mostrar la próxima pregunta
    } else {
        showAllQuestions(); // Mostrar todas las preguntas si ya no hay más
    }
}

// Función para verificar la respuesta del usuario
function checkAnswer(userAnswer) {
    const correctAnswer = triviaData[currentQuestionIndex].answer;
    if (userAnswer === correctAnswer) {
        alert("¡Respuesta correcta!");
    } else {
        alert(`Respuesta incorrecta. La respuesta correcta es: ${correctAnswer}`);
    }
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < triviaData.length) {
        showQuestion();
    } else {
        nextButton.textContent = "Terminar";
        nextButton.onclick = showAllQuestions;
    }
}

// Función para mostrar todas las preguntas y respuestas al finalizar
function showAllQuestions() {
    triviaData.forEach((questionData, index) => {
        alert(`Pregunta ${index + 1}: ${questionData.question}\nRespuesta: ${questionData.answer}`);
    });
}

// Mostrar la primera pregunta al cargar la página
showQuestion();

