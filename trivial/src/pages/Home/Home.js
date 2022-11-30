import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../store/slices/questions';
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import { resetCurr } from '../../store/slices/questions';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  dispatch(resetCurr());

  return (
    <div className="Home">
      <button onClick={() => navigate(`/questions/0`)}>Start</button>
    </div>
  );
}

export default Home;
