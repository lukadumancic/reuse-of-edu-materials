import { Screen } from "../types";

export const ADD_PRESENTATION = "ADD_PRESENTATION";
export const DELETE_PRESENTATION = "DELETE_PRESENTATION";
export const SET_SELECTED_PRESENTATION_INDEX =
  "SET_SELECTED_PRESENTATION_INDEX";
export const ADD_SCREENS = "ADD_SCREENS";
export const DELETE_SCREEN = "DELETE_SCREEN";

export const addPresentation = (
  presentationName: string,
  presentationId: string
) => ({
  type: ADD_PRESENTATION,
  payload: {
    id: presentationId,
    title: presentationName,
    date: new Date(),
    screens: [],
  },
});

export const deletePresentation = (index: number) => ({
  type: DELETE_PRESENTATION,
  paylod: index,
});

export const setSelectedPresentationIndex = (index: number) => ({
  type: SET_SELECTED_PRESENTATION_INDEX,
  payload: index,
});

export const addScreens = (screens: Screen[]) => ({
  type: ADD_SCREENS,
  payload: screens,
});

export const deleteScreen = (screenIndex: number) => ({
  type: DELETE_SCREEN,
  payload: screenIndex,
});
