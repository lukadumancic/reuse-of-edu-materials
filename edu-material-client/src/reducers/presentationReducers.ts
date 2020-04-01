import { PresentationsState } from "../types";
import {
  ADD_PRESENTATION,
  DELETE_PRESENTATION,
  SET_SELECTED_PRESENTATION_INDEX,
  ADD_SCREENS
} from "../actions";

const presentationsState: PresentationsState = {
  presentations: [],
  selectedPresentationIndex: -1
};

const eventReducer = (state = presentationsState, action: any) => {
  switch (action.type) {
    case ADD_PRESENTATION:
      state.presentations.push(action.payload);
      return {
        ...state
      };
    case DELETE_PRESENTATION:
      state.presentations.splice(action.payload, 1);
      return {
        ...state
      };
    case SET_SELECTED_PRESENTATION_INDEX:
      return {
        ...state,
        selectedPresentationIndex: action.payload
      };
    case ADD_SCREENS:
      state.presentations[state.selectedPresentationIndex].screens =
        action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default eventReducer;
