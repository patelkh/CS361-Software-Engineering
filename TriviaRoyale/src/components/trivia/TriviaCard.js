import React, {useState, useEffect} from 'react';
import {MdCheckCircleOutline, MdClose} from 'react-icons/md'
import './TriviaCard.css'

/* Displays trivia data one question at a time */
const TriviaCard = ({computeScore, currentQuestion}) => {
    let [selected, setSelected] = useState('') //Captures the answer selected by the user
    let [isDisable, setIsDisable] = useState(false) // Used to disable answer options after one is selected
    let [isSelected, setIsSelected] = useState(false) // Used to enable result

    let question = currentQuestion[0][0].replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
    let options = currentQuestion[1]
    let answer = currentQuestion[2][0]

    /* Clears out state variables when options and answer variables are changed */
    useEffect(() => {
        const clearStates = () => {
            setSelected('')
            setIsDisable(false)
            setIsSelected(false)
        }
        clearStates()
    },[options, answer])

    /* Stores the selected answer in the state variable and calls subsequent functions */
    const updateSelected = (e) => {
        setSelected(e.target.value)
        disableButton()
        Result()
    }
    
    /* Disables the answer options */
    const disableButton = () => {
        setIsDisable(true)
    }

    /* Displays whether the selected answer is correct or incorrect */
    const Result = () => {
        setIsSelected(true)
        if (selected == answer) { 
            return(<p className="correct"><MdCheckCircleOutline/><i>Yes, the correct answer is {answer}!</i></p>)
        } else {
            return(<p className="incorrect"><MdClose/><i>Incorrect! 
                    The correct answer is {answer}.</i>
                    </p>)
        }
    }    


    return (
        <>
            <div>
                <h4 className="trivia-question">{question}</h4>
                <hr></hr>
            </div>
        
            <div >
                <div className="choice"><p key={options[0][0]}>
                    <input disabled={isDisable} key={options[0][0]} type="radio" name="answer" value={options[0][0]} onChange={e => 
                        {updateSelected(e); computeScore(e.target.value, answer);
                        }}/>{'  '}{options[0][0]}</p>
                </div>

                <div className="choice"><p key={options[0][1]}>
                    <input disabled={isDisable} key={options[0][1]} type="radio" name="answer" value={options[0][1]} onChange={e => 
                        {updateSelected(e); computeScore(e.target.value, answer);
                        }}/>{'  '}{options[0][1]}</p>
                </div>

                <div className="choice"><p key={options[0][2]}>
                    <input disabled={isDisable} key={options[0][2]} type="radio" name="answer" value={options[0][2]} onChange={e => 
                        {updateSelected(e); computeScore(e.target.value, answer);
                        }}/>{'  '}{options[0][2]}</p>
                </div>

                <div className="choice"><p key={options[0][3]}>
                    <input disabled={isDisable} key={options[0][3]} type="radio" name="answer" value={options[0][3]} onChange={e => 
                        {updateSelected(e); computeScore(e.target.value, answer); 
                        }}/>{'  '}{options[0][3]}</p>
                </div>
                <div>
                    {isSelected && <Result/>}
                </div>
                <hr></hr>
            </div>
        </>
    )
}

export default TriviaCard; 
