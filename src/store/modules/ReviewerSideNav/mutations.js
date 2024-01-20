import { SET_SELECTED_SIDE_BAR, GET_SELECTED_SIDE_BAR } from "./mutation-types";

export default {
  [SET_SELECTED_SIDE_BAR](state, menu) {
    state.selectedSideBar = menu;
  },
  [GET_SELECTED_SIDE_BAR](state, menu) {
    state.selectedSideBar = menu;
  },
};
