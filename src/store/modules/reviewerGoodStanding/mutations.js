import {
  SET_GOOD_STANDING_UNASSIGNED,
  SET_GOOD_STANDING_UNASSIGNED_SEARCHED,
  
  SET_GOOD_STANDING_UNFINISHED,
  SET_GOOD_STANDING_UNFINISHED_SEARCHED,
  SET_GOOD_STANDING_OTHERS_UNFINISHED,
  SET_GOOD_STANDING_OTHERS_UNFINISHED_SEARCHED,

  SET_GOOD_STANDING_ASSIGNED_TO_YOU,
  SET_GOOD_STANDING_ASSIGNED_TO_YOU_SEARCHED,
  SET_GOOD_STANDING_ASSIGNED_TO_OTHERS,
  SET_GOOD_STANDING_ASSIGNED_TO_OTHERS_SEARCHED,
} from "./mutation-types";
export default {
  [SET_GOOD_STANDING_UNASSIGNED](state, data) {
    state.goodStandingUnassigned = data;
    state.goodStandingUnassignedSearched = data;
  },

  [SET_GOOD_STANDING_UNASSIGNED_SEARCHED](state, searchedVal) {
    console.log("searched val is ", searchedVal);
    state.goodStandingUnassignedSearched = searchedVal;
  },
  [SET_GOOD_STANDING_UNFINISHED](state, data) {
    state.goodStandingUnfinished = data;
    state.goodStandingUnfinishedSearched = data;
  },
  [SET_GOOD_STANDING_UNFINISHED_SEARCHED](state, searchedVal) {
    state.goodStandingUnfinishedSearched = searchedVal;
  },
  [SET_GOOD_STANDING_OTHERS_UNFINISHED](state, data) {
    state.goodStandingOthersUnfinished = data;
    state.goodStandingOthersUnfinishedSearched = data;
  },
  [SET_GOOD_STANDING_OTHERS_UNFINISHED_SEARCHED](state, searchedVal) {
    state.goodStandingOthersUnfinishedSearched = searchedVal;
  },

  [SET_GOOD_STANDING_ASSIGNED_TO_YOU](state, data) {
    state.goodStandingAssignedToYou = data;
    state.goodStandingAssignedToYouSearched = data;
  },
  [SET_GOOD_STANDING_ASSIGNED_TO_YOU_SEARCHED](state, searchedVal) {
    state.goodStandingAssignedToYouSearched = searchedVal;
  },
  [SET_GOOD_STANDING_ASSIGNED_TO_OTHERS](state, data) {
    state.goodStandingAssignedToOthers = data;
    state.goodStandingAssignedToOthersSearched = data;
  },
  [SET_GOOD_STANDING_ASSIGNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.goodStandingAssignedToOthersSearched = searchedVal;
  },
};
