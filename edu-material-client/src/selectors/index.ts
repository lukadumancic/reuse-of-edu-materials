import { createSelector } from "reselect";
import { Store } from "../types";
import { create } from "domain";

const state = (state: Store) => state;
const presentations = (state: Store) => state.presentations;

const stateSelector = createSelector(state, state => state);
const presentationsSelector = createSelector(
  presentations,
  presentationsState => presentationsState
);
const selectedPresentation = createSelector(
  presentations,
  presentationsState =>
    presentationsState.presentations[
      presentationsState.selectedPresentationIndex
    ]
);

export default stateSelector;
export { presentationsSelector, selectedPresentation };
