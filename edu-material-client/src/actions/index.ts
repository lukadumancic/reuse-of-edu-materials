export const ADD_PRESENTATION = "ADD_PRESENTATION";
export const DELETE_PRESENTATION = "DELETE_PRESENTATION";
export const SET_SELECTED_PRESENTATION_INDEX =
  "SET_SELECTED_PRESENTATION_INDEX";

export const addPresentation = (presentationName: string) => ({
  type: ADD_PRESENTATION,
  payload: {
    title: presentationName,
    date: new Date(),
    screens: []
  }
});

export const deletePresentation = (index: number) => ({
  type: DELETE_PRESENTATION,
  paylod: index
});

export const setSelectedPresentationIndex = (index: number) => ({
  type: SET_SELECTED_PRESENTATION_INDEX,
  payload: index
});
