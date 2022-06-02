import React from "react";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import './Popup.css';

/* Renders a popup window when the user clicks the Cancel button on the Quiz page */
const Popup = ({title, message, setPopup, setStates}) => {
    const history = useHistory()

    const handleYes = () => {
        setStates(true)
        setPopup(false)
        history.push('/')
    } 

    const handleNo = () => {
        setPopup(false)
    }
    return (
        <div className="popup-box">
            <div className="box">
                {title}
                {message}
                <Button variant="secondary" onClick={handleNo}>No</Button>
                {'    '}
                <Button variant="primary" onClick={handleYes}>Yes</Button>
            </div>
        </div>
    )
}

export default Popup;
