import React from 'react'
import { useEffect } from 'react';


export default function Menu() {


    function lauchingGame(){
        console.log("yes");

        // Récupere les balises cochée (themes picked et difficulty picked)

        // Call API avec ces variables

        // Creation des questions et reponses pour le jeu

        // Afficher la quiz phase

        // Comparer les réponses

    };


    

  return (
    <div id="homepage-phase">
        <div id="box-container" className="question-container">

            <h4>Difficulty</h4>

            <div className="difficulty-choice-div">
                <div className="flex-input" >
                    <input type="radio" id="input-easy" value="easy" name="difficulty"  checked />
                    <label id="label-easy" for="easy">Easy</label>
                </div>

                    
                <div className="flex-input" > 
                    <input type="radio" id="input-easy" value="medium"
                    name="difficulty" />
                    <label id="label-medium" for="medium">Medium</label>
                </div>

                    
                <div className="flex-input" >
                    <input type="radio" id="input-easy" value="hard" name="difficulty" />
                    <label id="label-hard" for="hard">Hard</label>
                </div>
            </div>
    
            <h4>Themes</h4>

            <div className="theme-choice-div">
                <div className="flex-input">
                    <input type="checkbox" id="arts_and_literature" value="arts_and_literature"/>
                    <label id="label-art-and-literature" for="answer1">Arts & Literature</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="film_and_tv" value="film_and_tv"/>
                    <label id="label-film-and-tv" for="answer2">Film & TV</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="food_and_drink" value="food_and_drink"/>
                    <label id="label-food-and-drink" for="answer3">Food & Drink</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="general_knowledge" value="general_knowledge"/>
                    <label id="label-general-knowledge" for="answer1">General Knowledge</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="geography" value="geography"/>
                    <label id="label-geography" for="answer2">Geography</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="history" value="history"/>
                    <label id="label-history" for="answer3">History</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="music" value="music"/>
                    <label id="label-music" for="answer1">Music</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="science" value="science"/>
                    <label id="label-science" for="answer2">Science</label>
                </div>

                <div className="flex-input">
                    <input type="checkbox" id="society_and_culture" value="society_and_culture"/>
                    <label id="label-society-and-culture" for="answer3">Society & Culture</label>
                </div>

                <div className="flex-input">
                    
                    <input type="checkbox" id="sport_and_leisure" value="sport_and_leisure"/>
                    <label id="label-sport-and-leisure" for="answer1">Sport & Leisure</label>
                </div>


            
                <button 
                id="play-btn"
                onClick={lauchingGame}
                >Let's go</button>
            </div>   

        </div>

    </div>
  )
}
