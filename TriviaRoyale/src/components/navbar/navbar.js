import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

/* Renders the navigation bar */
const Navbar = () => {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/help">How To Guide</Link></li>
                <li><Link to="/quiz">Trivia</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    )
}


export default Navbar; 
