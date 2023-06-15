import { combineReducers } from "redux";
import counterSlice from "./slices/counterSlice";

const reducer = combineReducers({
  counter: counterSlice,
});

export default reducer;
