import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 1,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state, action) => {
      state.counter = state.counter + 1;
    },
  },
});

export const { increase } = counterSlice.actions;
export default counterSlice.reducer;
