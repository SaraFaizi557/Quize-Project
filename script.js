const questions = [
    {
        question: "Which blood cells help in blood clotting?",
        answer: [
            { text: "Red blood cells", correct: false },
            { text: "White blood cells", correct: false },
            { text: "Platelets", correct: true },
            { text: "Plasma", correct: false },
        ]
    },
    {
        question: "Which gas is produced during respiration in humans?",
        answer: [
            { text: "Oxygen", correct: false },
            { text: "Carbon dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
        ]
    },
    {
        question: "Which organ controls reflex actions?",
        answer: [
            { text: "Brain", correct: false },
            { text: "Heart", correct: false },
            { text: "Spinal cord", correct: true },
            { text: "Liver", correct: false },
        ]
    },
    {
        question: "The atomic number of carbon is?",
        answer: [
            { text: "6", correct: true },
            { text: "8", correct: false },
            { text: "12", correct: false },
            { text: "16", correct: false },
        ]
    },
    {
        question: "Which acid is present in vinegar?",
        answer: [
            { text: "Citric acid", correct: false },
            { text: "Sulfuric acid", correct: false },
            { text: "Acetic acid", correct: true },
            { text: "Hydrochloric acid", correct: false },
        ]
    },
    {
        question: "What is the SI unit of force?",
        answer: [
            { text: "Joule", correct: false },
            { text: "Newton", correct: true },
            { text: "Pascal", correct: false },
            { text: "Watt", correct: false },
        ]
    },
    {
        question: "Which lens is used to correct short-sightedness?",
        answer: [
            { text: "Convex lens", correct: false },
            { text: "Concave lens", correct: true },
            { text: "Cylindrical lens", correct: false },
            { text: "Bifocal lens", correct: false },
        ]
    },
    {
        question: "What is the function of the kidney?",
        answer: [
            { text: "Digestion of food", correct: false },
            { text: "Filtration of blood", correct: true },
            { text: "Transport of oxygen", correct: false },
            { text: "Control of reflexes", correct: false },
        ]
    },
    {
        question: "Which gas is used in the preparation of fertilizers?",
        answer: [
            { text: "Hydrogen", correct: false },
            { text: "Nitrogen", correct: true },
            { text: "Oxygen", correct: false },
            { text: "Chlorine", correct: false },
        ]
    },
    {
        question: "Which part of the eye controls the amount of light entering?",
        answer: [
            { text: "Retina", correct: false },
            { text: "Lens", correct: false },
            { text: "Cornea", correct: false },
            { text: "Iris", correct: true },
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.
    question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();