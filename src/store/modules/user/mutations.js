import { SET_PROFILE } from "./mutation-types";
export default {
  [SET_PROFILE](state, userInfo) {
    state.userInfo = userInfo;
  },
};
