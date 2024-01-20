import { SET_SELECTED_SIDE_BAR, GET_SELECTED_SIDE_BAR } from "./mutation-types";
export default {
  assignSelectedSideBar({ commit }, menu) {
    commit(SET_SELECTED_SIDE_BAR, menu);
    // return menu;
  },
  getSelectedSideBar({ commit, getters }) {
    commit(GET_SELECTED_SIDE_BAR, "newLicenseUnassigned");
  },
};
