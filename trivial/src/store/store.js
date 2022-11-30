import {configureStore} from "@reduxjs/toolkit";
import questionReducer from "./slices/questions.js";

export default configureStore({
    reducer: {
        questions: questionReducer,
    }
});