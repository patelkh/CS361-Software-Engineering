import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Summary.css'

const Summary = ({setStates, finalScore, length}) => {
    const [message, setMessage] = useState()

    const history = useHistory()

    const goHome = () => {
        setStates(true)
        history.push('/')
    }

    useEffect(() => {
        if (finalScore === undefined) {
            goHome()
        } else { 
            showScore()
        }  
    }, [message])

    const showScore = () => {
        let pct = Math.floor(((finalScore/length)*100))
        if (pct >= 90) {
            setMessage('Wow, great job!')
        } else if (pct >= 89) {
            setMessage('Good Job!')
        } else if (pct >= 79) {
            setMessage('Nice work!')
        } else {
            setMessage('Good effort!')
        }
    }

    return (
        <>
            <div> 
                <h1 className="page-title">Trivia Summary</h1>
                <div className="background"> 
                    <p>Final Score: {finalScore} out of {length} </p>
                    <p>{message}</p>
                </div>
                <div>
                    <Button variant="outline-primary" className="button" onClick={goHome}>Home</Button>
                </div>
            </div>
        </>
    )
}

export default Summary; 
