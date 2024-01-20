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

  SET_GOOD_STANDING_APPROVED,
  SET_GOOD_STANDING_APPROVED_SEARCHED,
  SET_GOOD_STANDING_ALL_APPROVED,
  SET_GOOD_STANDING_ALL_APPROVED_SEARCHED,

  SET_GOOD_STANDING_DECLINED,
  SET_GOOD_STANDING_DECLINED_SEARCHED,
  SET_GOOD_STANDING_ALL_DECLINED,
  SET_GOOD_STANDING_ALL_DECLINED_SEARCHED,

  SET_GOOD_STANDING_PENDING_PAYMENT,
  SET_GOOD_STANDING_PENDING_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT,
  SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT_SEARCHED,

  SET_GOOD_STANDING_DECLINED_PAYMENT,
  SET_GOOD_STANDING_DECLINED_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT,
  SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT_SEARCHED,

  SET_GOOD_STANDING_LICENSED,
  SET_GOOD_STANDING_LICENSED_SEARCHED,
  SET_GOOD_STANDING_OTHERS_LICENSED,
  SET_GOOD_STANDING_OTHERS_LICENSED_SEARCHED,

  SET_GOOD_STANDING_ALL_LICENSED,
  SET_GOOD_STANDING_ALL_LICENSED_SEARCHED,

  SET_GOOD_STANDING_RE_APPLY,
  SET_GOOD_STANDING_RE_APPLY_SEARCHED,
  SET_GOOD_STANDING_OTHERS_RE_APPLY,
  SET_GOOD_STANDING_OTHERS_RE_APPLY_SEARCHED,

} from "./mutation-types";
export default {
  [SET_GOOD_STANDING_UNASSIGNED](state, data) {
    state.goodStandingUnassigned = data;
    state.goodStandingUnassignedSearched = data;
  },

  [SET_GOOD_STANDING_UNASSIGNED_SEARCHED](state, searchedVal) {
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

  [SET_GOOD_STANDING_APPROVED](state, data) {
    state.goodStandingApproved = data;
    state.goodStandingApprovedSearched = data;
  },
  [SET_GOOD_STANDING_APPROVED_SEARCHED](state, searchedVal) {
    state.goodStandingApprovedSearched = searchedVal;
  },
  [SET_GOOD_STANDING_ALL_APPROVED](state, data) {
    state.goodStandingAllApproved = data;
    state.goodStandingAllApprovedSearched = data;
  },
  [SET_GOOD_STANDING_ALL_APPROVED_SEARCHED](state, searchedVal) {
    state.goodStandingAllApprovedSearched = searchedVal;
  },

  [SET_GOOD_STANDING_DECLINED](state, data) {
    state.goodStandingDeclined = data;
    state.goodStandingDeclinedSearched = data;
  },
  [SET_GOOD_STANDING_DECLINED_SEARCHED](state, searchedVal) {
    state.goodStandingDeclinedSearched = searchedVal;
  },
  [SET_GOOD_STANDING_ALL_DECLINED](state, data) {
    state.goodStandingAllDeclined = data;
    state.goodStandingAllDeclinedSearched = data;
  },
  [SET_GOOD_STANDING_ALL_DECLINED_SEARCHED](state, searchedVal) {
    state.goodStandingAllDeclinedSearched = searchedVal;
  },

  [SET_GOOD_STANDING_PENDING_PAYMENT](state, data) {
    state.goodStandingPendingPayment = data;
    state.goodStandingPendingPaymentSearched = data;
  },
  [SET_GOOD_STANDING_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.goodStandingPendingPaymentSearched = searchedVal;
  },
  [SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT](state, data) {
    state.goodStandingOthersPendingPayment = data;
    state.goodStandingOthersPendingPaymentSearched = data;
  },
  [SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.goodStandingOthersPendingPaymentSearched = searchedVal;
  },

  [SET_GOOD_STANDING_DECLINED_PAYMENT](state, data) {
    state.goodStandingDeclinedPayment = data;
    state.goodStandingDeclinedPaymentSearched = data;
  },
  [SET_GOOD_STANDING_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.goodStandingDeclinedPaymentSearched = searchedVal;
  },
  [SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT](state, data) {
    state.goodStandingOthersDeclinedPayment = data;
    state.goodStandingOthersDeclinedPaymentSearched = data;
  },
  [SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.goodStandingOthersDeclinedPaymentSearched = searchedVal;
  },

  [SET_GOOD_STANDING_LICENSED](state, data) {
    state.goodStandingLicensed = data;
    state.goodStandingLicensedSearched = data;
  },
  [SET_GOOD_STANDING_LICENSED_SEARCHED](state, searchedVal) {
    state.goodStandingLicensedSearched = searchedVal;
  },
  [SET_GOOD_STANDING_OTHERS_LICENSED](state, data) {
    state.goodStandingOthersLicensed = data;
    state.goodStandingOthersLicensedSearched = data;
  },
  [SET_GOOD_STANDING_OTHERS_LICENSED_SEARCHED](state, searchedVal) {
    state.goodStandingOthersLicensedSearched = searchedVal;
  },

  [SET_GOOD_STANDING_ALL_LICENSED](state, data) {
    state.goodStandingAllLicensed = data;
    state.goodStandingAllLicensedSearched = data;
  },
  [SET_GOOD_STANDING_ALL_LICENSED_SEARCHED](state, searchedVal) {
    state.goodStandingAllLicensedSearched = searchedVal;
  },

  [SET_GOOD_STANDING_RE_APPLY](state, data) {
    state.goodStandingReApply = data;
    state.goodStandingReApplySearched = data;
  },
  [SET_GOOD_STANDING_RE_APPLY_SEARCHED](state, searchedVal) {
    state.goodStandingReApplySearched = searchedVal;
  },
  [SET_GOOD_STANDING_OTHERS_RE_APPLY](state, data) {
    state.goodStandingOthersReApply = data;
    state.goodStandingOthersReApplySearched = data;
  },
  [SET_GOOD_STANDING_OTHERS_RE_APPLY_SEARCHED](state, searchedVal) {
    state.goodStandingOthersReApplySearched = searchedVal;
  },

};
