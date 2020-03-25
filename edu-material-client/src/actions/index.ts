import { Presentation } from '../types';

export const ADD_PRESENTATION = "ADD_PRESENTATION";

export const addEvents = (presentation: Presentation) => ({
  type: ADD_PRESENTATION,
  paylod: presentation
});
