import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../store/slices/questionsSlice';
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import { resetCurr } from '../../store/slices/questionsSlice';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.questions.loading)

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  useEffect(() => {
  }, [loading]);

  dispatch(resetCurr());
  
  console.log("loading = ", loading)

  return (
    <div className="Home">
      {loading? <button id="loading"> Loading... </button> : 
      <button id="start" onClick={() => navigate(`/questions/0`)}> Start</button>
      }
    </div>
  );
}

export default Home;
