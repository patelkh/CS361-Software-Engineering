import React from "react";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Help.css'

function Help() {
    let history = useHistory();

    const gohome = () => {
        history.push('/')
    }

    return(
        <>
            <div className="instructions">
                <h1>How to Play</h1>
                <br></br>
                1. Select a category.<br></br>
                2. Adjust difficulty based on your level of expertise in the selected category.<br></br>
                3. Optional: Click the 'Generate Number' button to change the number of questions.<br></br>
                4. Click on the 'Start' button when you are ready to take the quiz. <br></br>
                5. Read and answer each trivia question.<br></br><br></br>
                Notes: <br></br>
                Once you select an answer, it can't be undone.<br></br>
                You can cancel the quiz at any time.<br></br>
                A correct answer increases the score by 1 point. <br></br>
                <br></br>
                Goodluck! <br></br>
                <br></br>
                <Button variant="outline-primary" onClick={gohome}>Close</Button>
            </div>
        </>
    )
}

export default Help; 
