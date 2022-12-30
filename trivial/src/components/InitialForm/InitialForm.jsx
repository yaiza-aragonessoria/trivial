import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../store/slices/questionsSlice';
import { Link, useNavigate } from "react-router-dom";
import { resetCurr } from '../../store/slices/questionsSlice';
import "./InitialForm.css";

export default function InitialForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.questions.isLoading)
    const rejected = useSelector(state => state.questions.rejected)
    const loaded = useSelector(state => state.questions.loaded)
  
    useEffect(() => {
      if (loaded === true) navigate(`/questions/0`)
    }, [isLoading, rejected, loaded]);
  

    const [formData, setFormData] = useState({
        numberQuestions: 5,
        category: "any",
        difficulty: "any"
    })

    const handleChange = (event) => {
        const name = event.target.name

        setFormData(prevState => ({
            ...prevState,
            [name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(fetchQuestions(formData));
    }
    

  return (
    <>
    <div className='div-trivial'>
      <div className='trivial'> 
        TRIVIAL 
      </div>
      <form className="initial-form" onSubmit={handleSubmit}>
        <label className='label-numberQuesitions'>
        How many questions do you want to answer?
        </label>
          <input className='select'
                type="number" 
                name="numberQuestions"
                min="1" 
                defaultValue="5"
                onChange={handleChange}/>
        <br/>
        <label>
          Which category do you want to play with?
        </label>
        <select className='select'
                id="categories"
                name="category"
                onChange={handleChange}>
            <option value="any" defaultValue>Any category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Films</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musical & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
            <option value="29">Entertainment: Comics</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="30">Science: Gadgets</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
          </select>
          <br/>
          <label>
          Which difficulty should the questions have?
          </label>
          <select className='select'
                  id="difficulty"
                  name="difficulty"
                  onChange={handleChange}>
            <option value="any" defaultValue>Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br/>
        {isLoading? <img src= "https://acegif.com/wp-content/uploads/loading-42.gif" className='loading' /> : 
                    <input className="play-button" type="submit" value="PLAY" /> }
      </form>
      {rejected && <div className='somethingWentWrong'>Something went wrong. Please, try again.</div>}
    </div>
    </>
  )
}
