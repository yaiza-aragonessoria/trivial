import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
    "fetchQuestions",
    async (payload, thunkAPI) => {
      let url = "https://opentdb.com/api.php?";
      if ("numberQuestions" in payload) {
        url = url + "amount=" + payload.numberQuestions.toString();
      }
      if(payload.difficulty !== "any") {
        url = url + "&difficulty=" + payload.difficulty;
      }
      if(payload.category !== "any") {
        url = url + "&category=" + payload.category;
      }
        try {
            const data = await (await axios.get(url));
            return data.data.results;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }

);

const initialState = {
  list: [],
  curr: 0,
  isLoading: false,
  loaded: false,
  rejected: false
}

const questions = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    updateCurrQuestion: (state, action) => {
      state.curr+=1;
    },
    resetQuestions: (state, action) => {
      return initialState;
    }

  },
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      console.log("Loading questions...");
      state.isLoading = true;
      state.loaded = false;
      state.rejected = false;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      console.log("Questions fetched. Ready to start.")
      state.list = action.payload;
      state.isLoading = false;
      state.loaded = true;
      state.rejected = false;
    },
    [fetchQuestions.rejected]: (state) => {
      console.log("Request rejected.")
      state.isLoading = false;
      state.loaded = false;
      state.rejected = true;
    }
  }
});

export const {updateCurrQuestion, resetQuestions} = questions.actions

export default questions.reducer