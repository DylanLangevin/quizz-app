// https://the-trivia-api.com/docs/

let category;
let correctAnswer;
let question;
let incorrectAnswers = [];
let allAnswers = [];


const mainDiv = document.getElementById("main")

//  catégorie dans l'api
// https://the-trivia-api.com/categories

function fetchQuestion(){

    fetch("https://the-trivia-api.com/questions?categories=arts_and_literature,film_and_tv,food_and_drink,general_knowledge,geography,history,music,science,society_and_culture,sport_and_leisure&limit=1")
    .then(reponse => reponse.json())
    .then((quiz) => {
        console.log(quiz);
        fetchQuestionComplet(quiz)
        createQuestionDiv()
    })


}

function fetchQuestionComplet(quiz) {

    incorrectAnswers = [];
    allAnswers = []

    category = quiz[0].category
    correctAnswer = quiz[0].correctAnswer
    question = quiz[0].question

    for (let i = 0; i<2; i++){

        incorrectAnswers.push(quiz[0].incorrectAnswers[i])
    }
    allAnswers = incorrectAnswers
   
    allAnswers.push(correctAnswer)


    


    // Melanger la liste de réponse
    allAnswers.sort()
    console.log(allAnswers);
    console.log(correctAnswer);
    



}





let score = 1
let array = []
// Base de données de quiz en attendant d'utiliser l'API


// Creation du HTML
const questionsDiv = document.createElement("div");

function createQuestionDiv() {
    


    console.log("score :",score);
    questionsDiv.innerHTML = `
    <h4> Manche ${score} </h4>
    <form id="form-quiz">
        <div class="question-container">

            <h4 class="question">${question}</h4>

            <div class="answer-container">

                    <input type="radio" id="answer" value="${allAnswers[0]}" name="question-1" checked>
                    <label for="answer1">${allAnswers[0]}</label><br>

                    <input type="radio" id="answer" value="${allAnswers[1]}" name="question-1">
                    <label for="answer2">${allAnswers[1]}</label><br>

                    <input type="radio" id="answer" value="${allAnswers[2]}" name="question-1">
                    <label for="answer3">${allAnswers[2]}</label><br>
                    
            </div>
        </div>
    </form>

    `
    mainDiv.appendChild(questionsDiv)
    
    
}


fetchQuestion()

// Déclaration de variable après création du HTML
const validateBtn = document.getElementById('validate-btn')
const form = document.getElementById('form-quiz')


validateBtn.onclick = function(e){
    // Récupération du radio button checked
    const radioButtonsChecked = document.querySelector('input[name="question-1"]:checked').value;

    console.log("notre réponse", radioButtonsChecked);
    // e.preventDefault();

    // condition si la réponse est bonne
    if (radioButtonsChecked == correctAnswer) {

        // Passer a la manche supérieure
        score+=1
        // array.push(true)
        fetchQuestion()
        console.log("Bonne réponse");
        
    } else {


        console.log("Mauvaise réponse");
        location.reload();
    }
}














