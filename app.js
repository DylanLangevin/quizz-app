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
const labelEasy = document.getElementById('label-easy')
const labelMedium = document.getElementById('label-medium')
const labelHard = document.getElementById('label-hard')
const playBtn = document.getElementById("play-btn")
const validateBtn = document.getElementById('validate-btn')

const timerElement = document.getElementById("timer")

// Déclaration des variables
let category;
let correctAnswer;
let question;
let incorrectAnswers = [];
let allAnswers = [];
let score = 1
let themesPicked = "";
let difficultyPicked= "";
let timePassed = false;
let quizRound = false;

// Requête fetch de l'API
function fetchQuestion(){

    fetch("https://the-trivia-api.com/questions?categories=" + themesPicked.slice(0, -1) + "&limit=1&difficulty=" + difficultyPicked)
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

function answerReveal(text, backgroundColor, revealTextButton,){
    // Changement de la classe pour changer l'affichage

    // Mode question
    if( questionContainerDiv.classList.contains('reveal-container') ){
        questionContainerDiv.classList.add('question-container')
        questionContainerDiv.classList.remove('reveal-container')
        questionH4.textContent = text

    // Mode reveal
    } else if (questionContainerDiv.classList.contains('question-container')) {
        console.log("here");

        // Ajout de la class reveal-container, retrait de la classe question-container, permet d'afficher la réponse
        questionContainerDiv.classList.add('reveal-container')
        questionContainerDiv.classList.remove('question-container')
        console.log(questionContainerDiv);

        // Affiche la réponse et change la couleur du background
        questionH4.textContent = "La bonne réponse est " + correctAnswer + ".  " + text
        questionContainerDiv.style.backgroundColor = backgroundColor

        // Fait disparaître le bouton valider
        validateBtn.style.visibility = "hidden"
        validateBtn.style.position = "absolute"

        document.querySelector('.answer-container').style.visibility = "hidden"

        // Cree le bouton "Continuer" ou"recommencer" (en fonction du résultat)
        let revealButton = document.createElement('button')
        revealButton.classList.add('reveal-container-button')
        revealButton.textContent = revealTextButton
        questionContainerDiv.appendChild(revealButton)
        revealButton.style.visibility = "visible"
        revealButton.style.zIndex = "200"
        revealButton.style.alignSelf = "center"
        console.log(revealButton);


        revealButton.onclick = function(e ) {
            e.preventDefault()

            // Au click du bouton "continuer", on ajuste le contenu de la page pour que la prochaine question autre question puisse s'affiche, on effectue l'opération inverse du else if "Mode Reveal", puis on appelle la fonction fetch pour afficher la prochaien question
            if(e.target.textContent == "Continuer ?") {

                // Le score est incrémenté de 1, et on effectue une nouvelle requête
                score += 1

                document.querySelector('.answer-container').style.visibility = "visible"
                questionContainerDiv.style.backgroundColor = "white"
                questionContainerDiv.removeChild(revealButton)

                questionContainerDiv.classList.add('question-container')
                questionContainerDiv.classList.remove('reveal-container')

                // Fait disparaître le bouton valider
                validateBtn.style.visibility = "visible"
                validateBtn.style.position = "relative"
                fetchQuestion()
                timer()

            } else {
                location.reload();
            }
        }
    }
}




// Au clique du bouton play
playBtn.onclick = function(e) {
    themesPicked = "";
    quizRound = true

    difficultyPicked = document.querySelector('input[name="difficulty"]:checked').value
    const themeCheckboxChecked = document.querySelectorAll('input[type=checkbox]:checked')

    for (let i = 0; i<themeCheckboxChecked.length;i++) {

        themesPicked += themeCheckboxChecked[i].value + ","
    }

    console.log(difficultyPicked);
    console.log(themesPicked.slice(0, -1));

    // Passer de la homepage à la quizpage
    document.getElementById('homepage-phase').style.visibility = "hidden"
    document.getElementById('homepage-phase').style.position = "absolute"

    console.log(questionContainerDiv.childNodes[3]); 

    for (let i = 0; i<questionContainerDiv.childNodes.length;i++) {

    console.log(questionContainerDiv.childNodes[i]); 
    }

    console.log(document.querySelector('.difficulty-choice-div'));
    console.log(document.querySelector('.theme-choice-div'));
    console.log(document.querySelector('#play-btn'));

    // questionContainerDiv.removeChild("theme-choice-div")
    document.getElementById('quiz-phase').style.visibility = "visible"
    document.getElementById('quiz-phase').style.position = "relative"

    fetchQuestion()
    timer()
    



}


// timer de 20 sec



function revealPhase() {

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






function timer() {

    let time = 10
    let countdown = setInterval(timeDecrease, 1000)

    validateBtn.onclick = function(e) {

        clearInterval(countdown)
        revealPhase()
    }

    function timeDecrease(){

        console.log(time);
        if(time === -1) {

            clearInterval(countdown)
            revealPhase()

        } else {

            timerElement.innerText = time
            time--
        }
    }
}


 














