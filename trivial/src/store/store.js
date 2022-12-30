import {configureStore} from "@reduxjs/toolkit";
import questionReducer from "./slices/questionsSlice.js";
import answersReducer from "./slices/answersSlice";

export default configureStore({
    reducer: {
        questions: questionReducer,
        answers: answersReducer,
    }
});