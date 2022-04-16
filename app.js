// REFLECHIR A LA SUITE DU PROJET



// API que j'utilise
// https://the-trivia-api.com/docs/

//  catégorie dans l'api
// https://the-trivia-api.com/categories

// Récupération des balises HTML
const mainDiv = document.getElementById("main")
const roundNumber = document.getElementById("round")
const questionContainerDiv = document.getElementById('box-container')
const questionH4 = document.getElementById("question")

const answer1 = document.getElementById("answer-1")
const answer2 = document.getElementById("answer-2")
const answer3 = document.getElementById("answer-3")

const label1 = document.getElementById("label-1")
const label2 = document.getElementById("label-2")
const label3 = document.getElementById("label-3")


const validateBtn = document.getElementById('validate-btn')


// Déclaration des variables
let category;
let correctAnswer;
let question;
let incorrectAnswers = [];
let allAnswers = [];
let score = 1

// Requête fetch de l'API
function fetchQuestion(){

    fetch("https://the-trivia-api.com/questions?categories=arts_and_literature,film_and_tv,food_and_drink,general_knowledge,geography,history,music,science,society_and_culture,sport_and_leisure&limit=1")
    .then(reponse => reponse.json())
    .then((quiz) => {
        fetchQuestionComplet(quiz)
        createQuestionDiv()
    })
}

// Récupération des propiétés de l'objet
function fetchQuestionComplet(quiz) {

    // Réinitialisation de ces listes
    incorrectAnswers = [];
    allAnswers = [];

    // Attribution des propriétés de l'objet dans des variables pour les utiliser
    category = quiz[0].category
    correctAnswer = quiz[0].correctAnswer
    question = quiz[0].question
    difficulty = quiz[0].difficulty
    tags = quiz[0].tags

    console.log(quiz);
    console.log(tags);
    console.log(difficulty);
    console.log(category);
    console.log(question);
    console.log(correctAnswer);

    // Injection des mauvaises réponses d'abord
    for (let i = 0; i<2; i++){
        incorrectAnswers.push(quiz[0].incorrectAnswers[i])
    }

    // Puis injection de la bonne réponse
    allAnswers = incorrectAnswers
    allAnswers.push(correctAnswer)

    // Melange la liste de réponses
    allAnswers.sort()
}

// Injection du contenu dans les balises
function createQuestionDiv() {
    
    // Injection du score
    roundNumber.textContent = "Manche " + score;

    // Injection de la question
    questionH4.textContent = String(question);

    // Injection des réponses
    answer1.value = String(allAnswers[0])
    label1.textContent = String(allAnswers[0])

    answer2.value = String(allAnswers[1])
    label2.textContent = String(allAnswers[1])

    answer3.value = String(allAnswers[2])
    label3.textContent = String(allAnswers[2])
}

function answerReveal(text, backgroundColor, revealTextButton){
    // Changement de la classe pour changer l'affichage

    // Mode question
    if( questionContainerDiv.classList.contains('reveal-container') ){
        questionContainerDiv.classList.add('question-container')
        questionContainerDiv.classList.remove('reveal-container')
        questionH4.textContent = text


    // Mode reveal
    } else if (questionContainerDiv.classList.contains('question-container')) {

        // Ajout de la class reveal-container, retrait de la classe question-container, permet d'afficher la réponse
        questionContainerDiv.classList.add('reveal-container')
        questionContainerDiv.classList.remove('question-container')

        // Affiche la réponse et change la couleur du background
        questionH4.textContent = "La bonne réponse est " + correctAnswer + ".  " + text
        questionContainerDiv.style.backgroundColor = backgroundColor

        // Centre le H4
        // questionContainerDiv.style.justifyContent = "space-around"

        // Fait disparaître le bouton valider
        validateBtn.style.visibility = "hidden"
        document.querySelector('.answer-container').style.visibility = "hidden"


        // Cree le bouton "Continuer" ou"recommencer" (en fonction du résultat)
        let revealButton = document.createElement('button')
        revealButton.classList.add('reveal-container-button')
        revealButton.textContent = revealTextButton
        questionContainerDiv.appendChild(revealButton)


        revealButton.onclick = function(e) {
            e.preventDefault()

            // Au click du bouton "continuer", on ajuste le contenu de la page pour que la prochaine question autre question puisse s'affiche, on effectue l'opération inverse du else if "Mode Reveal", puis on appelle la fonction fetch pour afficher la prochaien question
            if(e.target.textContent == "Continuer ?") {

                // Le score est incrémenté de 1, et on effectue une nouvelle requête
                score += 1
                validateBtn.style.visibility = "visible"
                document.querySelector('.answer-container').style.visibility = "visible"
                questionContainerDiv.style.backgroundColor = "white"
                questionContainerDiv.removeChild(revealButton)

                questionContainerDiv.classList.add('question-container')
                questionContainerDiv.classList.remove('reveal-container')
                fetchQuestion()

            } else {
                location.reload();
            }
            
        }

    }

}

fetchQuestion()


// Au clique du bouton
validateBtn.onclick = function(e){
    // Récupération de la valeur du bouton radio coché
    const radioButtonsChecked = document.querySelector('input[name="question-1"]:checked').value;

    // Entrée de la condition : si la valeur du bouton radio coché est égale à la bonne réponse
    if (radioButtonsChecked == correctAnswer) {

        // Affichage du résultat en cas de bonne réponse
        answerReveal("Bien joué ! " ,"rgba(0,255,0,0.6)", "Continuer ?")

        
    } else {

        // Affichage du résultat en cas de mauvaise réponse
        answerReveal("Dommage ! ", "rgba(255,0,0,0.6)", "Recommencer ?")
    }

}