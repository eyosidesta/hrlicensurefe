import {
  SET_NEW_LICENSE_UNASSIGNED,
  SET_NEW_LICENSE_UNASSIGNED_SEARCHED,

  SET_NEW_LICENSE_UNFINISHED,
  SET_NEW_LICENSE_UNFINISHED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNFINISHED,
  SET_NEW_LICENSE_OTHERS_UNFINISHED_SEARCHED,

  SET_NEW_LICENSE_ASSIGNED_TO_YOU,
  SET_NEW_LICENSE_ASSIGNED_TO_YOU_SEARCHED,
  SET_NEW_LICENSE_ASSIGNED_TO_OTHERS,
  SET_NEW_LICENSE_ASSIGNED_TO_OTHERS_SEARCHED,

  SET_NEW_LICENSE_APPROVED,
  SET_NEW_LICENSE_APPROVED_SEARCHED,
  SET_NEW_LICENSE_ALL_APPROVED,
  SET_NEW_LICENSE_ALL_APPROVED_SEARCHED,

  SET_NEW_LICENSE_DECLINED,
  SET_NEW_LICENSE_DECLINED_SEARCHED,
  SET_NEW_LICENSE_ALL_DECLINED,
  SET_NEW_LICENSE_ALL_DECLINED_SEARCHED,

  SET_NEW_LICENSE_UNDER_SUPERVISION,
  SET_NEW_LICENSE_UNDER_SUPERVISION_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION_SEARCHED,

  SET_NEW_LICENSE_APPROVED_PAYMENT,
  SET_NEW_LICENSE_APPROVED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT,
  SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT_SEARCHED,

  SET_NEW_LICENSE_DECLINED_PAYMENT,
  SET_NEW_LICENSE_DECLINED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT,
  SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT_SEARCHED,

  SET_NEW_LICENSE_ON_REVIEW,
  SET_NEW_LICENSE_ON_REVIEW_SEARCHED,
  SET_NEW_LICENSE_OTHERS_ON_REVIEW,
  SET_NEW_LICENSE_OTHERS_ON_REVIEW_SEARCHED,

  SET_NEW_LICENSE_RE_EVALUATE,
  SET_NEW_LICENSE_RE_EVALUATE_SEARCHED,
  SET_NEW_LICENSE_OTHERS_RE_EVALUATE,
  SET_NEW_LICENSE_OTHERS_RE_EVALUATE_SEARCHED,

  SET_NEW_LICENSE_CONFIRMED,
  SET_NEW_LICENSE_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_CONFIRMED_SEARCHED,

  SET_NEW_LICENSE_RETURNED_TO_ME,
  SET_NEW_LICENSE_RETURNED_TO_ME_SEARCHED,
  SET_NEW_LICENSE_RETURNED_TO_OTHERS,
  SET_NEW_LICENSE_RETURNED_TO_OTHERS_SEARCHED,
} from "./mutation-types";

export default {
  [SET_NEW_LICENSE_UNASSIGNED](state, data) {
    state.newLicenseUnassigned = data;
    state.newLicenseUnassignedSearched = data;
  },
  [SET_NEW_LICENSE_UNASSIGNED_SEARCHED](state, searchedVal) {
    state.newLicenseUnassignedSearched = searchedVal;
  },


  [SET_NEW_LICENSE_UNFINISHED](state, data) {
    state.newLicenseUnfinished = data;
    state.newLicenseUnfinishedSearched = data;
  },
  [SET_NEW_LICENSE_UNFINISHED_SEARCHED](state, searchedVal) {
    state.newLicenseUnfinishedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_UNFINISHED](state, data) {
    state.newLicenseOthersUnfinished = data;
    state.newLicenseOthersUnfinishedSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_UNFINISHED_SEARCHED](state, searchedVal) {
    state.newLicenseOthersUnfinishedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_ASSIGNED_TO_YOU](state, data) {
    state.newLicenseAssignedToYou = data;
    state.newLicenseAssignedToYouSearched = data;
  },
  [SET_NEW_LICENSE_ASSIGNED_TO_YOU_SEARCHED](state, searchedVal) {
    state.newLicenseAssignedToYouSearched = searchedVal;
  },
  [SET_NEW_LICENSE_ASSIGNED_TO_OTHERS](state, data) {
    state.newLicenseAssignedToOthers = data;
    state.newLicenseAssignedToOthersSearched = data;
  },
  [SET_NEW_LICENSE_ASSIGNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.newLicenseAssignedToOthersSearched = searchedVal;
  },

  [SET_NEW_LICENSE_APPROVED](state, data) {
    state.newLicenseApproved = data;
    state.newLicenseApprovedSearched = data;
  },
  [SET_NEW_LICENSE_APPROVED_SEARCHED](state, searchedVal) {
    state.newLicenseApprovedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_ALL_APPROVED](state, data) {
    state.newLicenseAllApproved = data;
    state.newLicenseAllApprovedSearched = data;
  },
  [SET_NEW_LICENSE_ALL_APPROVED_SEARCHED](state, searchedVal) {
    state.newLicenseAllApprovedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_DECLINED](state, data) {
    state.newLicenseDeclined = data;
    state.newLicenseDeclinedSearched = data;
  },
  [SET_NEW_LICENSE_DECLINED_SEARCHED](state, searchedVal) {
    state.newLicenseDeclinedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_ALL_DECLINED](state, data) {
    state.newLicenseAllDeclined = data;
    state.newLicenseAllDeclinedSearched = data;
  },
  [SET_NEW_LICENSE_ALL_DECLINED_SEARCHED](state, searchedVal) {
    state.newLicenseAllDeclinedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_UNDER_SUPERVISION](state, data) {
    state.newLicenseUnderSuperVision = data;
    state.newLicenseUnderSuperVisionSearched = data;
  },
  [SET_NEW_LICENSE_UNDER_SUPERVISION_SEARCHED](state, searchedVal) {
    state.newLicenseUnderSuperVisionSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION](state, data) {
    state.newLicenseOthersUnderSuperVision = data;
    state.newLicenseOthersUnderSuperVisionSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION_SEARCHED](state, searchedVal) {
    state.newLicenseOthersUnderSuperVisionSearched = searchedVal;
  },

  [SET_NEW_LICENSE_APPROVED_PAYMENT](state, data) {
    state.newLicenseApprovedPayment = data;
    state.newLicenseApprovedPaymentSearched = data;
  },
  [SET_NEW_LICENSE_APPROVED_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicenseApprovedPaymentSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT](state, data) {
    state.newLicenseOthersApprovedPayment = data;
    state.newLicenseOthersApprovedPaymentSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicenseOthersApprovedPaymentSearched = searchedVal;
  },

  [SET_NEW_LICENSE_DECLINED_PAYMENT](state, data) {
    state.newLicenseDeclinedPayment = data;
    state.newLicenseDeclinedPaymentSearched = data;
  },
  [SET_NEW_LICENSE_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicenseDeclinedPaymentSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT](state, data) {
    state.newLicenseOthersDeclinedPayment = data;
    state.newLicenseOthersDeclinedPaymentSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicenseOthersDeclinedPaymentSearched = searchedVal;
  },

  [SET_NEW_LICENSE_ON_REVIEW](state, data) {
    state.newLicenseOnReview = data;
    state.newLicenseOnReviewSearched = data;
  },
  [SET_NEW_LICENSE_ON_REVIEW_SEARCHED](state, searchedVal) {
    state.newLicenseOnReviewSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_ON_REVIEW](state, data) {
    state.newLicenseOthersOnReview = data;
    state.newLicenseOthersOnReviewSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_ON_REVIEW_SEARCHED](state, searchedVal) {
    state.newLicenseOthersOnReviewSearched = searchedVal;
  },

  [SET_NEW_LICENSE_RE_EVALUATE](state, data) {
    state.newLicenseReEvaluate = data;
    state.newLicenseReEvaluateSearched = data;
  },
  [SET_NEW_LICENSE_RE_EVALUATE_SEARCHED](state, searchedVal) {
    state.newLicenseReEvaluateSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_RE_EVALUATE](state, data) {
    state.newLicenseOthersReEvaluate = data;
    state.newLicenseOthersReEvaluateSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_RE_EVALUATE_SEARCHED](state, searchedVal) {
    state.newLicenseOthersReEvaluateSearched = searchedVal;
  },

  [SET_NEW_LICENSE_CONFIRMED](state, data) {
    state.newLicenseConfirmed = data;
    state.newLicenseConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseConfirmedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_CONFIRMED](state, data) {
    state.newLicenseOthersConfirmed = data;
    state.newLicenseOthersConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseOthersConfirmedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_RETURNED_TO_ME](state, data) {
    state.newLicenseReturnedToMe = data;
    state.newLicenseReturnedToMeSearched = data;
  },
  [SET_NEW_LICENSE_RETURNED_TO_ME_SEARCHED](state, searchedVal) {
    state.newLicenseReturnedToMeSearched = searchedVal;
  },
  [SET_NEW_LICENSE_RETURNED_TO_OTHERS](state, data) {
    state.newLicenseReturnedToOthers = data;
    state.newLicenseReturnedToOthersSearched = data;
  },
  [SET_NEW_LICENSE_RETURNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.newLicenseReturnedToOthersSearched = searchedVal;
  },
};
