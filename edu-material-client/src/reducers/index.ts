import { combineReducers } from "redux";
import presentationReducers from "./presentationReducers";

export default combineReducers({
  presentations: presentationReducers
});
