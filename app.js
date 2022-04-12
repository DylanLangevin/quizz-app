// TROUVER UN MOYEN DE METTRE A JOUR LE SCORE A CHAQUE REP
const mainDiv = document.getElementById("main")
let score = 1
let array = []
// Base de données de quiz en attendant d'utiliser l'API
let questions = [

    "Qui est l'empereur de France le 2 décembre 1804 ?",
    "Quelle est la date d'indépendance des Etats-Unis ?",
    "La chute de l'empire Romain se situe en ?",
    "Quelle est la capitale de la Slovénie ?",
    "Combien d'habitants compte l'Irlande en 2020 ?"
]

let allAnswers = [

    ["Clovis","Abraham Lincoln","Napoleon Bonaparte"],
    ["4 juillet 1776","18 avril 1856","30 juin 1925"],
    ["15 ap. J.-C","395 ap. J.-C","-740 av. J.-C"],
    ["Ljubljana","Belgrade","Bratislava"],
    ["1,365 Million","21 Millions","4,9 Millions"],
]

let allCorrectAnswers = [

    "Napoleon Bonaparte",
    "4 juillet 1776",
    "395 ap. J.-C",
    "Ljubljana",
    "4,9 Millions"
]

let randomNumber = Math.floor(Math.random() * questions.length)

// Creation du HTML
const questionsDiv = document.createElement("div");

function createQuestionDiv(randomNumber) {

    console.log("good",allCorrectAnswers[randomNumber]);
    console.log("score :",score);
    questionsDiv.innerHTML = `
    <h4> Manche ${score} </h4>
    <form id="form-quiz">
        <div class="question-container">

            <h4 class="question">${questions[randomNumber]}</h4>

            <div class="answer-container">

                    <input type="radio" id="answer" value="${allAnswers[randomNumber][0]}" name="question-1" checked>
                    <label for="answer1">${allAnswers[randomNumber][0]}</label><br>

                    <input type="radio" id="answer" value="${allAnswers[randomNumber][1]}" name="question-1">
                    <label for="answer2">${allAnswers[randomNumber][1]}</label><br>

                    <input type="radio" id="answer" value="${allAnswers[randomNumber][2]}" name="question-1">
                    <label for="answer3">${allAnswers[randomNumber][2]}</label><br>
                    
            </div>
        </div>
    </form>

    `
    mainDiv.appendChild(questionsDiv)
    
    
}

createQuestionDiv(randomNumber)

// Déclaration de variable après création du HTML
const validateBtn = document.getElementById('validate-btn')
const form = document.getElementById('form-quiz')


validateBtn.onclick = function(e){
    // Récupération du radio button checked
    const radioButtonsChecked = document.querySelector('input[name="question-1"]:checked').value;

    console.log("notre réponse", radioButtonsChecked);
    // e.preventDefault();

    console.log(randomNumber);

    // condition si la réponse est bonne
    if (radioButtonsChecked == allCorrectAnswers[randomNumber]) {

        // Passer a la manche supérieure
        score+=1
        // array.push(true)
        randomNumber = Math.floor(Math.random() * questions.length)
        createQuestionDiv(randomNumber)

        console.log("Bonne réponse");
        
    } else {


        console.log("Mauvaise réponse");
        location.reload();
    }
}














