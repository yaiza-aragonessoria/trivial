import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    correctAnswers: [],
    points: 0,
}

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
        state.list.push(action.payload);
    },

    addCorrectAnswer: (state, action) => {
      state.correctAnswers.push(action.payload);
    
    },

    countPoints: (state, action) => {
      if (action.payload[0] === action.payload[1]) {
        state.points = state.points + 1
      }
    },

    resetAnswers: (state, action) => {
      return initialState;
    }
  }
});

export const { addAnswer, addCorrectAnswer, countPoints, resetAnswers } = answersSlice.actions

export default answersSlice.reducer