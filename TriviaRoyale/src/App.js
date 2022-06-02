import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import Summary from './pages/Summary/Summary';
import Help from './pages/Help/Help'
import Navbar from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  /* Stores trivia settings and trivia data */
  const [category, setCategory] = useState(11)
  const [difficulty, setDifficulty] = useState('easy')
  const [type, setType] = useState('multiple')
  const [amount, setAmount] = useState(5)
  const [trivia, setTrivia] = useState([])
  const [finalScore, setFinalScore] = useState()
  const [isOpen, setPopup] = useState(false)
  const [reset, setStates] = useState(false)

  let openTriviaURL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`

  /* Resets the settings */
  useEffect(() => {
    if (reset === true) {
      setCategory(11)
      setDifficulty('easy')
      setType('multiple')
      setAmount(5)
      setStates(false)
    }
  }, [reset])

  /* Gets trivia from an open source API */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(openTriviaURL)
      const data = await response.json()
      const results = await generateTrivia(data)
      setTrivia(results)
    }
    fetchData()
    .catch(console.error)
  }, [openTriviaURL])

  /* Generates a simipler trivia dictionary from the returned API data  */
  async function generateTrivia(data) {
    let questions = []
    let correct = []
    let answers = []
    for (let key in data) {
        for (let obj in data[key]) {                       
            questions.push(data[key][obj].question)
            correct.push(data[key][obj].correct_answer)
            let answer=[]
            for (let i in data[key][obj].incorrect_answers) {
              answer.push(data[key][obj].incorrect_answers[i])
            }
            answer.push(data[key][obj].correct_answer)
            answer = answer.sort(() => Math.random()-0.5)
            answers.push(answer)   
        }
    }

    let triviaDictionary = []
    for (let j=0; j<questions.length; j++) {
        const triviaNode = [[questions[j]], [answers[j]], [correct[j]]]
        triviaDictionary.push(triviaNode)
    }
    return triviaDictionary
}


  return (
    <div className="App">
      <Router>
        <div className="App-header"> 
          <Navbar/>
            <div className="App-content">
              {isOpen && 
                <Popup 
                setStates={setStates}
                title={<b>Warning</b>}
                message={<p>Are you sure you want to quit?</p>}
                setPopup={setPopup}/>}

              <Route path="/" exact>
                <Home
                  setCategory={setCategory}
                  setDifficulty={setDifficulty}
                  setAmount={setAmount}
                  amount={amount}/>
              </Route>

              <Route path="/quiz">
                <Quiz
                  setStates={setStates}
                  category={category}
                  trivia={trivia}
                  setFinalScore={setFinalScore}
                  setPopup={setPopup}/>
              </Route>

              <Route path="/summary">
                <Summary
                  setStates={setStates}
                  finalScore={finalScore}
                  length={trivia.length}/>
              </Route>

              <Route path="/help">
                <Help/>
              </Route>

            </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
