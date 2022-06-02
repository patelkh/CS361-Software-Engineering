import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import TriviaCard from '../../components/Trivia/TriviaCard';
import Button from 'react-bootstrap/Button';
import ReactTooltip from "react-tooltip";
import './Quiz.css'

/* Tracks the quiz progress in the current session  */
const Quiz = ({setStates, setPopup, category, trivia, setFinalScore}) => {
    
    /* step and triviaIndex are used to trigger automatic routing */
    const [step, setStep] = useState(0) 
    const [triviaIndex, setTriviaIndex] = useState(0)
    const [questionNum, setQNum] = useState(1) 
    const [currentQuestion, setCurrentQuestion] = useState(trivia[triviaIndex])
    const [pageTitle, setPageTitle] = useState('')
    const [score, setScore] = useState(0)
    const [quote, setQuote] = useState('')
    const [isActive, setActive] = useState(false)

    const history = useHistory()

    /* Redirects to the homepage */
    const goHome = () => {
        setStates(true)
        history.push('/')
    }

    /* Triggers the getNextQuestion function when the step variable is changed */
    useEffect(() => {     
        if (currentQuestion === undefined) {
            goHome()
        } else {
            setActive(true)
            getNextQuestion()
        }
    }, [step])

    /* Pulls the current question out of the trivia object */
    const getNextQuestion = () => {
        if (triviaIndex === 0) {
            setTriviaIndex(triviaIndex+1)    
        } else if (triviaIndex !== 0) {
            setTriviaIndex(triviaIndex+1)
            setQNum(questionNum+1)
            setCurrentQuestion(trivia[triviaIndex])
        } 
        updateTitle(category)
    }

    /* Sets the pageTitle variable */
    const updateTitle = (category) => {
        if (parseInt(category) === 11) {
            setPageTitle('Film Trivia')
        } else if (parseInt(category) === 12) {
            setPageTitle('Music Trivia')
        } else if (parseInt(category) === 21) {
            setPageTitle('Sports Trivia')
        } else if (parseInt(category) === 15) {
            setPageTitle('Video Game Trivia')
        }
    }

    /* Updates the step variable when the user clicks on the 'Next' button */
    const updateStep = () => {
        if (questionNum < trivia.length) {
            setStep(step+1)
        } else if (questionNum === trivia.length) {
            showSummary()
        }
    }

     /* Sets the final score before redirecting to the Summary page */
     const showSummary = () => {
        setFinalScore(score)
        history.push('/summary')
    }

    /* Increments score by 1 when the user selects the correct answer */
    const computeScore = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            setScore(score+1)
        }      
    }

    /* Disables the warning popup window  */
    const handleCancel = () => {
        setPopup(true)
    }

    /* Gets a random motiviation quote from a third party API */
    const getQuote = async () => {
        const response = await fetch('https://motivational-quotes1.p.rapidapi.com/motivation', { 
        method: 'POST',
        headers: {
            contentType: 'application/json',
            'x-rapidapi-host': 'motivational-quotes1.p.rapidapi.com',
            'x-rapidapi-key': 'd774a9cd33msh08e6daba98bcad6p16981cjsn8aed7ec6cecb'
          }
        })
        if (response.status === 200) {
            let data = await response.text()
            setQuote(data)

        } else {
            console.log('Request failed', response.status)
        }
    }

    return (
        <> 
            <h1 className="page-title">{pageTitle}</h1>
            <div>{questionNum} of {trivia.length}</div>
            <div className="background">Score: {score}</div>
            <div>
                <p className="motivational-quote">{quote}</p>
                <Button variant="outline-secondary" data-tip='' data-for="quote" onClick={getQuote}>Inspire Me!</Button>
                <ReactTooltip id="quote" place="top" effect="solid">Need motivation to keep going? Click this button!</ReactTooltip>    
            </div>
            
            {isActive && <TriviaCard
                currentQuestion={currentQuestion}
                computeScore={computeScore}
            />}
            
            <div>
                <Button variant="outline-danger" data-tip='' data-for="danger" className="button" onClick={handleCancel}>Cancel</Button>
                <ReactTooltip id="danger" place="top" effect="solid">Clicking on Cancel takes you to the homepage!</ReactTooltip>
                <Button variant="outline-primary" className="button" onClick={updateStep}>Next</Button>
            </div>
            

        </>
    )
}

export default Quiz;
