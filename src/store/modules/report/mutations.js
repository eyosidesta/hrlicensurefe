import { SET_REPORT } from "./mutation-types";
export default {
  [SET_REPORT](state, report) {
    state.report = report;
  },
};
