import {
  SET_RENEWAL_UNASSIGNED,
  SET_RENEWAL_UNASSIGNED_SEARCHED,

  SET_RENEWAL_UNFINISHED,
  SET_RENEWAL_UNFINISHED_SEARCHED,
  SET_RENEWAL_OTHERS_UNFINISHED,
  SET_RENEWAL_OTHERS_UNFINISHED_SEARCHED,

  SET_RENEWAL_ASSIGNED_TO_YOU,
  SET_RENEWAL_ASSIGNED_TO_YOU_SEARCHED,
  SET_RENEWAL_ASSIGNED_TO_OTHERS,
  SET_RENEWAL_ASSIGNED_TO_OTHERS_SEARCHED,

  SET_RENEWAL_APPROVED,
  SET_RENEWAL_APPROVED_SEARCHED,
  SET_RENEWAL_ALL_APPROVED,
  SET_RENEWAL_ALL_APPROVED_SEARCHED,

  SET_RENEWAL_DECLINED,
  SET_RENEWAL_DECLINED_SEARCHED,
  SET_RENEWAL_ALL_DECLINED,
  SET_RENEWAL_ALL_DECLINED_SEARCHED,

  SET_RENEWAL_UNDER_SUPERVISION,
  SET_RENEWAL_UNDER_SUPERVISION_SEARCHED,
  SET_RENEWAL_OTHERS_UNDER_SUPERVISION,
  SET_RENEWAL_OTHERS_UNDER_SUPERVISION_SEARCHED,

  SET_RENEWAL_APPROVED_PAYMENT,
  SET_RENEWAL_APPROVED_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_APPROVED_PAYMENT,
  SET_RENEWAL_OTHERS_APPROVED_PAYMENT_SEARCHED,

  SET_RENEWAL_DECLINED_PAYMENT,
  SET_RENEWAL_DECLINED_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_DECLINED_PAYMENT,
  SET_RENEWAL_OTHERS_DECLINED_PAYMENT_SEARCHED,

  SET_RENEWAL_ON_REVIEW,
  SET_RENEWAL_ON_REVIEW_SEARCHED,
  SET_RENEWAL_OTHERS_ON_REVIEW,
  SET_RENEWAL_OTHERS_ON_REVIEW_SEARCHED,

  SET_RENEWAL_RE_EVALUATE,
  SET_RENEWAL_RE_EVALUATE_SEARCHED,
  SET_RENEWAL_OTHERS_RE_EVALUATE,
  SET_RENEWAL_OTHERS_RE_EVALUATE_SEARCHED,

  SET_RENEWAL_CONFIRMED,
  SET_RENEWAL_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_CONFIRMED,
  SET_RENEWAL_OTHERS_CONFIRMED_SEARCHED,

  SET_RENEWAL_RETURNED_TO_ME,
  SET_RENEWAL_RETURNED_TO_ME_SEARCHED,
  SET_RENEWAL_RETURNED_TO_OTHERS,
  SET_RENEWAL_RETURNED_TO_OTHERS_SEARCHED,

  SET_RENEWAL_PENDING_PAYMENT,
  SET_RENEWAL_PENDING_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_PENDING_PAYMENT,
  SET_RENEWAL_OTHERS_PENDING_PAYMENT_SEARCHED,

  SET_RENEWAL_LICENSED,
  SET_RENEWAL_LICENSED_SEARCHED,
  SET_RENEWAL_OTHERS_LICENSED,
  SET_RENEWAL_OTHERS_LICENSED_SEARCHED,

  SET_RENEWAL_ALL_LICENSED,
  SET_RENEWAL_ALL_LICENSED_SEARCHED,

  SET_RENEWAL_RE_APPLY,
  SET_RENEWAL_RE_APPLY_SEARCHED,
  SET_RENEWAL_OTHERS_RE_APPLY,
  SET_RENEWAL_OTHERS_RE_APPLY_SEARCHED,

  SET_RENEWAL_DECLINE_CONFIRMED,
  SET_RENEWAL_DECLINE_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_DECLINE_CONFIRMED,
  SET_RENEWAL_OTHERS_DECLINE_CONFIRMED_SEARCHED,

  SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED,
  SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED,
  SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,

  SET_RENEWAL_SUSPENDED,
  SET_RENEWAL_SUSPENDED_SEARCHED,
  SET_RENEWAL_CANCELLED,
  SET_RENEWAL_CANCELLED_SEARCHED,

  SET_RENEWAL_ALL_Suspended,
  SET_RENEWAL_ALL_Suspended_SEARCHED,
  SET_RENEWAL_ALL_Cancelled,
  SET_RENEWAL_ALL_Cancelled_SEARCHED,

} from "./mutation-types";

export default {
  [SET_RENEWAL_UNASSIGNED](state, data) {
    state.renewalUnassigned = data;
    state.renewalUnassignedSearched = data;
  },

  [SET_RENEWAL_UNASSIGNED_SEARCHED](state, searchedVal) {
    state.renewalUnassignedSearched = searchedVal;
  },

  [SET_RENEWAL_UNFINISHED](state, data) {
    state.renewalUnfinished = data;
    state.renewalUnfinishedSearched = data;
  },
  [SET_RENEWAL_UNFINISHED_SEARCHED](state, searchedVal) {
    state.renewalUnfinishedSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_UNFINISHED](state, data) {
    state.renewalOthersUnfinished = data;
    state.renewalOthersUnfinishedSearched = data;
  },
  [SET_RENEWAL_OTHERS_UNFINISHED_SEARCHED](state, searchedVal) {
    state.renewalOthersUnfinishedSearched = searchedVal;
  },

  [SET_RENEWAL_ASSIGNED_TO_YOU](state, data) {
    state.renewalAssignedToYou = data;
    state.renewalAssignedToYouSearched = data;
  },
  [SET_RENEWAL_ASSIGNED_TO_YOU_SEARCHED](state, searchedVal) {
    state.renewalAssignedToYouSearched = searchedVal;
  },
  [SET_RENEWAL_ASSIGNED_TO_OTHERS](state, data) {
    state.renewalAssignedToOthers = data;
    state.renewalAssignedToOthersSearched = data;
  },
  [SET_RENEWAL_ASSIGNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.renewalAssignedToOthersSearched = searchedVal;
  },

  [SET_RENEWAL_APPROVED](state, data) {
    state.renewalApproved = data;
    state.renewalApprovedSearched = data;
  },
  [SET_RENEWAL_APPROVED_SEARCHED](state, searchedVal) {
    state.renewalApprovedSearched = searchedVal;
  },
  [SET_RENEWAL_ALL_APPROVED](state, data) {
    state.renewalAllApproved = data;
    state.renewalAllApprovedSearched = data;
  },
  [SET_RENEWAL_ALL_APPROVED_SEARCHED](state, searchedVal) {
    state.renewalAllApprovedSearched = searchedVal;
  },

  [SET_RENEWAL_DECLINED](state, data) {
    state.renewalDeclined = data;
    state.renewalDeclinedSearched = data;
  },
  [SET_RENEWAL_DECLINED_SEARCHED](state, searchedVal) {
    state.renewalDeclinedSearched = searchedVal;
  },
  [SET_RENEWAL_ALL_DECLINED](state, data) {
    state.renewalAllDeclined = data;
    state.renewalAllDeclinedSearched = data;
  },
  [SET_RENEWAL_ALL_DECLINED_SEARCHED](state, searchedVal) {
    state.renewalAllDeclinedSearched = searchedVal;
  },

  [SET_RENEWAL_UNDER_SUPERVISION](state, data) {
    state.renewalUnderSuperVision = data;
    state.renewalUnderSuperVisionSearched = data;
  },
  [SET_RENEWAL_UNDER_SUPERVISION_SEARCHED](state, searchedVal) {
    state.renewalUnderSuperVisionSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_UNDER_SUPERVISION](state, data) {
    state.renewalOthersUnderSuperVision = data;
    state.renewalOthersUnderSuperVisionSearched = data;
  },
  [SET_RENEWAL_OTHERS_UNDER_SUPERVISION_SEARCHED](state, searchedVal) {
    state.renewalOthersUnderSuperVisionSearched = searchedVal;
  },

  [SET_RENEWAL_APPROVED_PAYMENT](state, data) {
    state.renewalApprovedPayment = data;
    state.renewalApprovedPaymentSearched = data;
  },
  [SET_RENEWAL_APPROVED_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalApprovedPaymentSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_APPROVED_PAYMENT](state, data) {
    state.renewalOthersApprovedPayment = data;
    state.renewalOthersApprovedPaymentSearched = data;
  },
  [SET_RENEWAL_OTHERS_APPROVED_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalOthersApprovedPaymentSearched = searchedVal;
  },

  [SET_RENEWAL_DECLINED_PAYMENT](state, data) {
    state.renewalDeclinedPayment = data;
    state.renewalDeclinedPaymentSearched = data;
  },
  [SET_RENEWAL_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalDeclinedPaymentSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_DECLINED_PAYMENT](state, data) {
    state.renewalOthersDeclinedPayment = data;
    state.renewalOthersDeclinedPaymentSearched = data;
  },
  [SET_RENEWAL_OTHERS_DECLINED_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalOthersDeclinedPaymentSearched = searchedVal;
  },

  [SET_RENEWAL_ON_REVIEW](state, data) {
    state.renewalOnReview = data;
    state.renewalOnReviewSearched = data;
  },
  [SET_RENEWAL_ON_REVIEW_SEARCHED](state, searchedVal) {
    state.renewalOnReviewSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_ON_REVIEW](state, data) {
    state.renewalOthersOnReview = data;
    state.renewalOthersOnReviewSearched = data;
  },
  [SET_RENEWAL_OTHERS_ON_REVIEW_SEARCHED](state, searchedVal) {
    state.renewalOthersOnReviewSearched = searchedVal;
  },

  [SET_RENEWAL_RE_EVALUATE](state, data) {
    state.renewalReEvaluate = data;
    state.renewalReEvaluateSearched = data;
  },
  [SET_RENEWAL_RE_EVALUATE_SEARCHED](state, searchedVal) {
    state.renewalReEvaluateSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_RE_EVALUATE](state, data) {
    state.renewalOthersReEvaluate = data;
    state.renewalOthersReEvaluateSearched = data;
  },
  [SET_RENEWAL_OTHERS_RE_EVALUATE_SEARCHED](state, searchedVal) {
    state.renewalOthersReEvaluateSearched = searchedVal;
  },

  [SET_RENEWAL_CONFIRMED](state, data) {
    state.renewalConfirmed = data;
    state.renewalConfirmedSearched = data;
  },
  [SET_RENEWAL_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalConfirmedSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_CONFIRMED](state, data) {
    state.renewalOthersConfirmed = data;
    state.renewalOthersConfirmedSearched = data;
  },
  [SET_RENEWAL_OTHERS_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalOthersConfirmedSearched = searchedVal;
  },

  [SET_RENEWAL_RETURNED_TO_ME](state, data) {
    state.renewalReturnedToMe = data;
    state.renewalReturnedToMeSearched = data;
  },
  [SET_RENEWAL_RETURNED_TO_ME_SEARCHED](state, searchedVal) {
    state.renewalReturnedToMeSearched = searchedVal;
  },
  [SET_RENEWAL_RETURNED_TO_OTHERS](state, data) {
    state.renewalReturnedToOthers = data;
    state.renewalReturnedToOthersSearched = data;
  },
  [SET_RENEWAL_RETURNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.renewalReturnedToOthersSearched = searchedVal;
  },

  [SET_RENEWAL_PENDING_PAYMENT](state, data) {
    state.renewalPendingPayment = data;
    state.renewalPendingPaymentSearched = data;
  },
  [SET_RENEWAL_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalPendingPaymentSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_PENDING_PAYMENT](state, data) {
    state.renewalOthersPendingPayment = data;
    state.renewalOthersPendingPaymentSearched = data;
  },
  [SET_RENEWAL_OTHERS_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.renewalOthersPendingPaymentSearched = searchedVal;
  },

  [SET_RENEWAL_LICENSED](state, data) {
    state.renewalLicensed = data;
    state.renewalLicensedSearched = data;
  },
  [SET_RENEWAL_LICENSED_SEARCHED](state, searchedVal) {
    state.renewalLicensedSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_LICENSED](state, data) {
    state.renewalOthersLicensed = data;
    state.renewalOthersLicensedSearched = data;
  },
  [SET_RENEWAL_OTHERS_LICENSED_SEARCHED](state, searchedVal) {
    state.renewalOthersLicensedSearched = searchedVal;
  },

  [SET_RENEWAL_ALL_LICENSED](state, data) {
    state.renewalAllLicensed = data;
    state.renewalAllLicensedSearched = data;
  },
  [SET_RENEWAL_ALL_LICENSED_SEARCHED](state, searchedVal) {
    state.renewalAllLicensedSearched = searchedVal;
  },

  [SET_RENEWAL_RE_APPLY](state, data) {
    state.renewalReApply = data;
    state.renewalReApplySearched = data;
  },
  [SET_RENEWAL_RE_APPLY_SEARCHED](state, searchedVal) {
    state.renewalReApplySearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_RE_APPLY](state, data) {
    state.renewalOthersReApply = data;
    state.renewalOthersReApplySearched = data;
  },
  [SET_RENEWAL_OTHERS_RE_APPLY_SEARCHED](state, searchedVal) {
    state.renewalOthersReApplySearched = searchedVal;
  },

  [SET_RENEWAL_DECLINE_CONFIRMED](state, data) {
    state.renewalDeclineConfirmed = data;
    state.renewalDeclineConfirmedSearched = data;
  },
  [SET_RENEWAL_DECLINE_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalDeclineConfirmedSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_DECLINE_CONFIRMED](state, data) {
    state.renewalOthersDeclineConfirmed = data;
    state.renewalOthersDeclineConfirmedSearched = data;
  },
  [SET_RENEWAL_OTHERS_DECLINE_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalOthersDeclineConfirmedSearched = searchedVal;
  },

  [SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED](state, data) {
    state.renewalUnderSuperVisionConfirmed = data;
    state.renewalUnderSuperVisionConfirmedSearched = data;
  },
  [SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalUnderSuperVisionConfirmedSearched = searchedVal;
  },
  [SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED](state, data) {
    state.renewalOthersUnderSuperVisionConfirmed = data;
    state.renewalOthersUnderSuperVisionConfirmedSearched = data;
  },
  [SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED](state, searchedVal) {
    state.renewalOthersUnderSuperVisionConfirmedSearched = searchedVal;
  },

  [SET_RENEWAL_SUSPENDED](state, data) {
    state.renewalSuspended = data;
    state.renewalSuspendedSearched = data;
  },
  [SET_RENEWAL_SUSPENDED_SEARCHED](state, searchedVal) {
    state.renewalSuspendedSearched = searchedVal;
  },
  [SET_RENEWAL_CANCELLED](state, data) {
    state.renewalCancelled = data;
    state.renewalCancelledSearched = data;
  },
  [SET_RENEWAL_CANCELLED_SEARCHED](state, searchedVal) {
    state.renewalCancelledSearched = searchedVal;
  },

  [SET_RENEWAL_ALL_Suspended](state, data) {
    state.renewalAllSuspended = data;
    state.renewalAllSuspendedSearched = data;
  },
  [SET_RENEWAL_ALL_Suspended_SEARCHED](state, searchedVal) {
    state.renewalAllSuspendedSearched = searchedVal;
  },
  [SET_RENEWAL_ALL_Cancelled](state, data) {
    state.renewalAllCancelled = data;
    state.renewalAllCancelledSearched = data;
  },
  [SET_RENEWAL_ALL_Cancelled_SEARCHED](state, searchedVal) {
    state.renewalAllCancelledSearched = searchedVal
  },
};
