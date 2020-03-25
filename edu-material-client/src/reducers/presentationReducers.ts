import { PresentationsState } from "../types";
import { ADD_PRESENTATION } from "../actions";

const presentationsState: PresentationsState = {
  presentations: []
};

const eventReducer = (state = presentationsState, action: any) => {
  switch (action.type) {
    case ADD_PRESENTATION:
      state.presentations.push(action.payload);
      return {
        ...state
      };
    default:
      return state;
  }
};

export default eventReducer;
