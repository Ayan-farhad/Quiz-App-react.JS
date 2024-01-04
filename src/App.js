 import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inpValue , setInpValue] = useState('');
  const [score , setScore] = useState(0);
  const [radio , setRadio ] = useState(false);

  useEffect(function () {
    getDataFromAPI()
  }, [])

  function getDataFromAPI() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => {
        setQuestions(res)
        res.map(function (item) {
          item.options = [...item.incorrectAnswers, item.correctAnswer]
          item.options = shuffle(item.options)
        })
        console.log(res);
      })

  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function nextBtn() {
    if(inpValue === ''){
      return alert("Please select any option");  
    }
    setCurrentIndex(currentIndex + 1)
    if(questions[currentIndex].correctAnswer === inpValue ){
      setScore(score + 10)
    }
    setInpValue("");
  
  }

  function restartBtn(){
    setCurrentIndex(0)
  }

  function target(e){
    const inp = e.target.value
    setInpValue(inp)

  }

  if(!questions.length){
    return <h2>Loading....</h2>
  }



  const quizend = currentIndex === questions.length

  return (
    <div className="App">
      {!quizend ?

        <div className='App-header'>
          <h1>Quiz app</h1>

          <h2>Q{currentIndex + 1} : {questions[currentIndex].question.text} </h2>

          {questions[currentIndex].options.map(function (item) {
            return <div>
              <input onChange={target} name='q' type='radio' value={item} checked={inpValue === item} /> {item}
            </div>
          })}

          <button onClick={nextBtn} >next</button>

        </div> : <div>
          <h2>Your score: {score} </h2>
          <button onClick={restartBtn}>Restart</button>
        </div>
        
        }
    </div>
  )
}

export default App;