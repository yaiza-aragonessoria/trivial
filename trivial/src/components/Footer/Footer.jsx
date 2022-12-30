import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetQuestions } from '../../store/slices/questionsSlice';

import "./Footer.css";
import { resetAnswers } from "../../store/slices/answersSlice";


const Footer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.questions.isLoading)
  const rejected = useSelector(state => state.questions.rejected)
  const loaded = useSelector(state => state.questions.loaded)



  const handleClick = () => {
    dispatch(resetQuestions());
    dispatch(resetAnswers());
  }

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul className="footer-ul">
          <NavLink to="/" onClick={handleClick}>New game</NavLink>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
