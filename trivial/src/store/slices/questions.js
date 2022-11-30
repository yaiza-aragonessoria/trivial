import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
    "fetchQuestions",
    async (payload, thunkApi) => {
        try {
            const data = await (await axios.get("https://opentdb.com/api.php?amount=5"));
            return data.data.results;
        } catch (error) {
            console.log("error: ", error);
        }
    }

);


const questions = createSlice({
  name: "questions",
  initialState: {
    list: [],
    curr: 0,
  },
  reducers: {
    updateCurrQuestion: (state, action) => {
      state.curr+=1;
      console.log("curr updated (in principle)");
    },
    resetCurr: (state, action) => {
      state.curr = 0;
    }

  },
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      console.log("Loading questions...");
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      console.log("Questions fetched. Ready to start.")
        state.list = action.payload;
    }
  }
});

export const {updateCurrQuestion, resetCurr} = questions.actions

export default questions.reducer