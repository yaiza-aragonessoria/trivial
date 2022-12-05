import {configureStore} from "@reduxjs/toolkit";
import questionReducer from "./slices/questions.js";
import answersReducer from "./slices/answersSlice";

export default configureStore({
    reducer: {
        questions: questionReducer,
        answers: answersReducer,
    }
});