import { createSelector } from "reselect";
import { Store } from "../types";

const state = (state: Store) => state;
const presentations = (state: Store) => state.presentations;

const stateSelector = createSelector(state, state => state);
const presentationsSelector = createSelector(presentations, presentationsState => presentationsState);

export default stateSelector;
export { presentationsSelector };
