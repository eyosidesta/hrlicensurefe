import { SET_EDUCATION_LEVEL } from "./mutation-types";
export default {
  [SET_EDUCATION_LEVEL](state, educationalLevel) {
    state.educationalLevel = educationalLevel;
  },
};
