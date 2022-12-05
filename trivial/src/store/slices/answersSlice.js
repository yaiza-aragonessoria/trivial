import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
        state.list.push(action.payload);
    }
  }
});

export const { addAnswer } = answersSlice.actions

export default answersSlice.reducer