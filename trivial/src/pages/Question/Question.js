import { useDispatch, useSelector } from "react-redux";
import { updateCurrQuestion } from "../../store/slices/questions";
import { useNavigate } from 'react-router-dom'
import { addAnswer } from "../../store/slices/answersSlice";
import { useState, useMemo } from "react";


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
    console.log(selectedAnswer)

    const handleNext = e => {
        e.preventDefault();

        if (curr >= questionList.length -1) {
            navigate("/results");
        } else {
            dispatch(updateCurrQuestion());
            dispatch(addAnswer(selectedAnswer));
        }
    };

    console.log("answers =", answers);


    return (
        <>
            <div>
                <p dangerouslySetInnerHTML={ { __html: questionList[curr].question } } />
            </div>
            <form onSubmit={handleNext}>
            {shuffledAnswers.map(answer => {
                return (
                    <>
                        <input type="radio" 
                               id={answer} 
                               name={`question-${curr}`} 
                               value={answer}
                               onChange={handleOnChange}
                               checked={selectedAnswer === answer}/>
                        <label htmlFor={answer}>{answer}</label><br/>
                    </>
                );})
            }
            <input type="submit" value="Next"/>
            </form>
        </>
        );
};

export default Question;