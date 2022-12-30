import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../components/Footer/Footer';
import "./Results.css";
import { v4 as uuid } from 'uuid';


function Results() {
  const points = useSelector(state => state.answers.points);
  const myAnswers = useSelector(state => state.answers.list);
  const correctAnswers = useSelector(state => state.answers.correctAnswers);
  const [message, setMessage] = useState("")
  const [moreDetails, setMoreDetails] = useState(false)

  useEffect(() => {
  if (points/myAnswers.length < 0.5) {
    setMessage(() => "It seems that you need a bit of training...")
  } else if (points/myAnswers.length < 0.75) {
    setMessage(() => "Quite good, but could be better.")
  } else {setMessage(() => "Impressive! Have you used google?")
  }})


  return (
    <>
    <div className='results-container'>
      <div className='your-score-title'>YOUR SCORE</div>
      <div className='score'> {points / myAnswers.length * 100} % </div>
      <div className='message'> {message} </div>
      {moreDetails? <button className='more-details-button' onClick={() => setMoreDetails(!moreDetails)}>Less details</button> :
                    <button className='more-details-button' onClick={() => setMoreDetails(!moreDetails)}>More details</button>
      }
    </div>
    {moreDetails && <div className='answers'>
    <div className='title-answers'> Your answers </div>
    <div className='title-answers'> Correct answers </div>
    {myAnswers.map((answer, index) => {
        return (
            <>
            <div id={uuid()} className='my-answers'> {answer} </div>
            <div id={uuid()} className='correct-answers'> {correctAnswers[index]} </div>
            </>
        );})}
   </div>}
   < Footer />
    </>
  )
}

export default Results;