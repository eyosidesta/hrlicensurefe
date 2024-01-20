import {
  SET_VERIFICATION_UNASSIGNED,
  SET_VERIFICATION_UNASSIGNED_SEARCHED,

  SET_VERIFICATION_UNFINISHED,
  SET_VERIFICATION_UNFINISHED_SEARCHED,
  SET_VERIFICATION_OTHERS_UNFINISHED,
  SET_VERIFICATION_OTHERS_UNFINISHED_SEARCHED,

  SET_VERIFICATION_ASSIGNED_TO_YOU,
  SET_VERIFICATION_ASSIGNED_TO_YOU_SEARCHED,
  SET_VERIFICATION_ASSIGNED_TO_OTHERS,
  SET_VERIFICATION_ASSIGNED_TO_OTHERS_SEARCHED,

  SET_VERIFICATION_APPROVED,
  SET_VERIFICATION_APPROVED_SEARCHED,
  SET_VERIFICATION_ALL_APPROVED,
  SET_VERIFICATION_ALL_APPROVED_SEARCHED,

  SET_VERIFICATION_DECLINED,
  SET_VERIFICATION_DECLINED_SEARCHED,
  SET_VERIFICATION_ALL_DECLINED,
  SET_VERIFICATION_ALL_DECLINED_SEARCHED,

  SET_VERIFICATION_RE_APPLY,
  SET_VERIFICATION_RE_APPLY_SEARCHED,
  SET_VERIFICATION_OTHERS_RE_APPLY,
  SET_VERIFICATION_OTHERS_RE_APPLY_SEARCHED,

} from "./mutation-types";
export default {
  [SET_VERIFICATION_UNASSIGNED](state, data) {
    state.verificationUnassigned = data;
    state.verificationUnassignedSearched = data;
  },

  [SET_VERIFICATION_UNASSIGNED_SEARCHED](state, searchedVal) {
    state.verificationUnassignedSearched = searchedVal;
  },

  [SET_VERIFICATION_UNFINISHED](state, data) {
    state.verificationUnfinished = data;
    state.verificationUnfinishedSearched = data;
  },
  [SET_VERIFICATION_UNFINISHED_SEARCHED](state, searchedVal) {
    state.verificationUnfinishedSearched = searchedVal;
  },
  [SET_VERIFICATION_OTHERS_UNFINISHED](state, data) {
    state.verificationOthersUnfinished = data;
    state.verificationOthersUnfinishedSearched = data;
  },
  [SET_VERIFICATION_OTHERS_UNFINISHED_SEARCHED](state, searchedVal) {
    state.verificationOthersUnfinishedSearched = searchedVal;
  },

  [SET_VERIFICATION_ASSIGNED_TO_YOU](state, data) {
    state.verificationAssignedToYou = data;
    state.verificationAssignedToYouSearched = data;
  },
  [SET_VERIFICATION_ASSIGNED_TO_YOU_SEARCHED](state, searchedVal) {
    state.verificationAssignedToYouSearched = searchedVal;
  },
  [SET_VERIFICATION_ASSIGNED_TO_OTHERS](state, data) {
    state.verificationAssignedToOthers = data;
    state.verificationAssignedToOthersSearched = data;
  },
  [SET_VERIFICATION_ASSIGNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.verificationAssignedToOthersSearched = searchedVal;
  },

  [SET_VERIFICATION_APPROVED](state, data) {
    state.verificationApproved = data;
    state.verificationApprovedSearched = data;
  },
  [SET_VERIFICATION_APPROVED_SEARCHED](state, searchedVal) {
    state.verificationApprovedSearched = searchedVal;
  },
  [SET_VERIFICATION_ALL_APPROVED](state, data) {
    state.verificationAllApproved = data;
    state.verificationAllApprovedSearched = data;
  },
  [SET_VERIFICATION_ALL_APPROVED_SEARCHED](state, searchedVal) {
    state.verificationAllApprovedSearched = searchedVal;
  },

  [SET_VERIFICATION_DECLINED](state, data) {
    state.verificationDeclined = data;
    state.verificationDeclinedSearched = data;
  },
  [SET_VERIFICATION_DECLINED_SEARCHED](state, searchedVal) {
    state.verificationDeclinedSearched = searchedVal;
  },
  [SET_VERIFICATION_ALL_DECLINED](state, data) {
    state.verificationAllDeclined = data;
    state.verificationAllDeclinedSearched = data;
  },
  [SET_VERIFICATION_ALL_DECLINED_SEARCHED](state, searchedVal) {
    state.verificationAllDeclinedSearched = searchedVal;
  },

  [SET_VERIFICATION_RE_APPLY](state, data) {
    state.verificationReApply = data;
    state.verificationReApplySearched = data;
  },
  [SET_VERIFICATION_RE_APPLY_SEARCHED](state, searchedVal) {
    state.verificationReApplySearched = searchedVal;
  },
  [SET_VERIFICATION_OTHERS_RE_APPLY](state, data) {
    state.verificationOthersReApply = data;
    state.verificationOthersReApplySearched = data;
  },
  [SET_VERIFICATION_OTHERS_RE_APPLY_SEARCHED](state, searchedVal) {
    state.verificationOthersReApplySearched = searchedVal;
  },
};
