import {
  SET_PROFILE,
  SET_PERSONAL_INFO,
  SET_ADDRESS,
  SET_PHOTO,
  SET_MARITAL_STATUS,
  SET_NATIONALITY,
} from "./mutation-types";

export default {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
  },

  [SET_PERSONAL_INFO](state, personalInfo) {
    state.personalInfo = personalInfo;
  },

  [SET_ADDRESS](state, address) {
    state.address = address;
  },

  [SET_PHOTO](state, photo) {
    state.photo = photo;
  },
  [SET_NATIONALITY](state, nationality) {
    state.nationality = nationality;
  },
  [SET_MARITAL_STATUS](state, maritalStatus) {
    state.maritalStatus = maritalStatus;
  },
};
