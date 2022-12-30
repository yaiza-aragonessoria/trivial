import { useDispatch, useSelector } from "react-redux";
import { updateCurrQuestion } from "../../store/slices/questionsSlice";
import { useNavigate } from 'react-router-dom'
import { addAnswer, addCorrectAnswer, countPoints } from "../../store/slices/answersSlice";
import { useState, useMemo } from "react";
import { v4 as uuid } from 'uuid';
import "./Question.css";
import Footer from "../../components/Footer/Footer";


const Question = () => {
    const dispatch = useDispatch();
    const answers = useSelector(state => state.answers.list);
    const [selectedAnswer, setSelectedAnswer] = useState(undefined);
    const curr = useSelector(state => state.questions.curr);
    const questionList = useSelector(state => state.questions.list);
    const navigate = useNavigate();
    const currQuestion = questionList[curr];

    
    const shuffle = (incorrect_answers, correct_answer) => {
        const rand = Math.floor(Math.random()*questionList.length);
        return incorrect_answers.slice(0, rand).concat([correct_answer]).concat(incorrect_answers.slice(rand,incorrect_answers.length));
    }
    const shuffledAnswers = useMemo(() => shuffle(currQuestion.incorrect_answers, currQuestion.correct_answer), [currQuestion.incorrect_answers]);
    
    const handleOnChange = e => {        
        setSelectedAnswer(e.target.value);
    }

    const handleNext = e => {
        e.preventDefault();

        if(selectedAnswer !== undefined) {
            dispatch(updateCurrQuestion());
            dispatch(addAnswer(selectedAnswer));
            dispatch(addCorrectAnswer(currQuestion.correct_answer));
            dispatch(countPoints([selectedAnswer, currQuestion.correct_answer]));
        }

        if (curr >= questionList.length -1) {
            navigate("/results");
        }         
        
    };


    return (
        <>
        <div className="question-container">
            <div className="question-title">
                QUESTION {curr+1}
            </div>
            <form className="question-form" onSubmit={handleNext}>
            <div className="question">
                <p dangerouslySetInnerHTML={ { __html: questionList[curr].question } } />
            </div>
            {shuffledAnswers.map((answer, index) => {
                let id = uuid();
                return (
                    <>
                    <label htmlFor={id} className="answer-label">
                        <input key={id} className="answer-input" type="radio"
                               name={`question-${curr}`} 
                               value={answer}
                               onChange={handleOnChange}
                               checked={selectedAnswer === answer}/>
                        {answer}
                    </label><br/>
                    </>
                );})
            }
            <input className="next-button "type="submit" value="NEXT"/>
            </form>
        </div>
        < Footer />
        </>
        );
};

export default Question;