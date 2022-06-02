import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReactTooltip from "react-tooltip";
import './Home.css'

/* Renders the homepage with default trivia settings */
function Home({setCategory, setDifficulty, setAmount, amount}) {

    const history = useHistory(); 

    /* Gets a random number between 5 and 20 from a teammates microservice */
    const generateRN = async () => {
        const response = await fetch('http://localhost:8080/', {
            crossDomain: true,
            method: 'GET'}) 
            if (response.status === 200) {
                let data = await response.json()
                console.log(data)
                setAmount(parseInt(data.rng))
            } else {
                console.error('Request failed', response.status)
            } 
    }

    /* Updates the trivia category to the given value */
    const updateCategory = (value) => {
        setCategory(value)
    }

    /* Updates the trivia difficulty to the given value */
    const updateDifficulty = (value) => {
        setDifficulty(value)
    }

    /* Redirects to the Quiz page */
    const startHandler = () => {        
        history.push('/quiz')
        
    }

    return (
        <>
            <div>
                <h1 className="app-title">Trivia Royale</h1>

                <div>

                    <p className="info-background">Configure your settings then click <b>Start</b> to play!</p>

                    <div> 
                        <label className="labels">Category:</label>
                    </div>

                    <div>
                        <select 
                            className="input-field" 
                            type="number" 
                            onChange={e => updateCategory(e.target.value)}>
                            <option value='11'>Film</option>
                            <option value='12'>Music</option>
                            <option value='21'>Sports</option>
                            <option value='15'>Video Games</option>
                        </select>
                    </div>

                    <div>
                        <label className="labels">Difficulty:</label>
                    </div>

                    <div>
                        <select 
                            className="input-field"  
                            onChange={e => updateDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label className="labels">Quiz Type:</label>
                    </div>

                    <div>
                        <select 
                            disabled 
                            className="disabled-field">
                            <option value="multiple">Multiple Choice</option>
                        </select>
                    </div>

                    <div>
                        <label className="labels">Number of Questions:</label> 
                    </div>

                    <div>
                        <input 
                            className="disabled-field" 
                            type="number" value={amount} 
                            required="required">
                        </input><br></br>

                        <Button 
                            data-tip='' 
                            data-for="rngTip" 
                            variant="outline-primary" 
                            className="rng-button" 
                            onClick={generateRN}>
                                Generate Number
                        </Button> 

                        <ReactTooltip 
                            id="rngTip" 
                            place="top" 
                            effect="solid">
                                Click here to generate a number between 5 and 20
                        </ReactTooltip>    
                    </div>

                    <hr></hr>

                </div>

                <div>
                    <Button 
                        variant="outline-primary" 
                        className="start-button"  
                        onClick={startHandler}>
                            Start
                    </Button>   
                </div>

            </div>
        </>
    )
}


export default Home;
