import { useDispatch, useSelector } from "react-redux";
import { updateCurrQuestion } from "../../store/slices/questions";
import { useNavigate } from 'react-router-dom'


const Question = () => {
    const dispatch = useDispatch();
    const curr = useSelector(state => state.questions.curr);
    const questionList = useSelector(state => state.questions.list);
    const navigate = useNavigate();
    const currQuestion = questionList[curr];
    const shuffle = (incorrect_answers, correct_answer) => {
        const rand = Math.floor(Math.random()*questionList.length);
        return incorrect_answers.slice(0, rand).concat([correct_answer]).concat(incorrect_answers.slice(rand,incorrect_answers.length));
    }
    const shuffledAnswers = shuffle(currQuestion.incorrect_answers, currQuestion.correct_answer);
    
    const handleNext = e => {
        e.preventDefault();

        if (curr >= questionList.length -1) {
            navigate("/results");
        } else {
            dispatch(updateCurrQuestion());
            console.log("curr =", curr);
            navigate(`/questions/${curr+1}`);
        }
        
    };

    console.log("curr =", curr);

    return (
        <>
            <div>
                <p dangerouslySetInnerHTML={ { __html: questionList[curr].question } } />
            </div>
            {shuffledAnswers.map(answer => {
                return (
                    <>
                        <input type="radio" id={answer} name={`question-${curr}`} value={answer}/>
                        <label for={answer}>{answer}</label><br/>
                    </>
                );})
            }
            <button onClick={e => handleNext(e)}>Next</button>
        </>
        );
};

export default Question;