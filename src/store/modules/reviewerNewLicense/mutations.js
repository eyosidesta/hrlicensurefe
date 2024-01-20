import {
  SET_NEW_LICENSE_UNASSIGNED,
  SET_NEW_LICENSE_UNASSIGNED_SEARCHED,
  SET_NEW_LICENSE_FROM_OTHER_REGION,
  SET_NEW_LICENSE_FROM_OTHER_REGION_SEARCHED,

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

  SET_NEW_LICENSE_PENDING_PAYMENT,
  SET_NEW_LICENSE_PENDING_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT,
  SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT_SEARCHED,

  SET_NEW_LICENSE_LICENSED,
  SET_NEW_LICENSE_LICENSED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_LICENSED,
  SET_NEW_LICENSE_OTHERS_LICENSED_SEARCHED,

  SET_NEW_LICENSE_ALL_LICENSED,
  SET_NEW_LICENSE_ALL_LICENSED_SEARCHED,

  SET_NEW_LICENSE_RE_APPLY,
  SET_NEW_LICENSE_RE_APPLY_SEARCHED,
  SET_NEW_LICENSE_OTHERS_RE_APPLY,
  SET_NEW_LICENSE_OTHERS_RE_APPLY_SEARCHED,

  SET_NEW_LICENSE_DECLINE_CONFIRMED,
  SET_NEW_LICENSE_DECLINE_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED_SEARCHED,

  SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED,
  SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,

  SET_NEW_LICENSE_FOR_SPECIFIC_USER,
  SET_NEW_LICENSE_FOR_SPECIFIC_USER_SEARCHED,

  SET_NEW_LICENSE_SUSPENDED,
  SET_NEW_LICENSE_SUSPENDED_SEARCHED,
  SET_NEW_LICENSE_CANCELLED,
  SET_NEW_LICENSE_CANCELLED_SEARCHED,

  SET_NEW_LICENSE_ALL_Suspended,
  SET_NEW_LICENSE_ALL_Suspended_SEARCHED,
  SET_NEW_LICENSE_ALL_Cancelled,
  SET_NEW_LICENSE_ALL_Cancelled_SEARCHED,
} from "./mutation-types";

export default {
  [SET_NEW_LICENSE_UNASSIGNED](state, data) {
    state.newLicenseUnassigned = data;
    state.newLicenseUnassignedSearched = data;
  },
  [SET_NEW_LICENSE_UNASSIGNED_SEARCHED](state, searchedVal) {
    state.newLicenseUnassignedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_FROM_OTHER_REGION](state, data) {
    state.newLicenseFromOtherRegion = data;
    state.newLicenseFromOtherRegionSearched = data;
  },
  [SET_NEW_LICENSE_FROM_OTHER_REGION_SEARCHED](state, searchedVal) {
    state.newLicenseFromOtherRegionSearched = searchedVal;
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

  [SET_NEW_LICENSE_PENDING_PAYMENT](state, data) {
    state.newLicensePendingPayment = data;
    state.newLicensePendingPaymentSearched = data;
  },
  [SET_NEW_LICENSE_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicensePendingPaymentSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT](state, data) {
    state.newLicenseOthersPendingPayment = data;
    state.newLicenseOthersPendingPaymentSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT_SEARCHED](state, searchedVal) {
    state.newLicenseOthersPendingPaymentSearched = searchedVal;
  },

  [SET_NEW_LICENSE_LICENSED](state, data) {
    state.newLicenseLicensed = data;
    state.newLicenseLicensedSearched = data;
  },
  [SET_NEW_LICENSE_LICENSED_SEARCHED](state, searchedVal) {
    state.newLicenseLicensedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_LICENSED](state, data) {
    state.newLicenseOthersLicensed = data;
    state.newLicenseOthersLicensedSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_LICENSED_SEARCHED](state, searchedVal) {
    state.newLicenseOthersLicensedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_ALL_LICENSED](state, data) {
    state.newLicenseAllLicensed = data;
    state.newLicenseAllLicensedSearched = data;
  },
  [SET_NEW_LICENSE_ALL_LICENSED_SEARCHED](state, searchedVal) {
    state.newLicenseAllLicensedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_RE_APPLY](state, data) {
    state.newLicenseReApply = data;
    state.newLicenseReApplySearched = data;
  },
  [SET_NEW_LICENSE_RE_APPLY_SEARCHED](state, searchedVal) {
    state.newLicenseReApplySearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_RE_APPLY](state, data) {
    state.newLicenseOthersReApply = data;
    state.newLicenseOthersReApplySearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_RE_APPLY_SEARCHED](state, searchedVal) {
    state.newLicenseOthersReApplySearched = searchedVal;
  },

  [SET_NEW_LICENSE_DECLINE_CONFIRMED](state, data) {
    state.newLicenseDeclineConfirmed = data;
    state.newLicenseDeclineConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_DECLINE_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseDeclineConfirmedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED](state, data) {
    state.newLicenseOthersDeclineConfirmed = data;
    state.newLicenseOthersDeclineConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseOthersDeclineConfirmedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED](state, data) {
    state.newLicenseUnderSuperVisionConfirmed = data;
    state.newLicenseUnderSuperVisionConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseUnderSuperVisionConfirmedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED](state, data) {
    state.newLicenseOthersUnderSuperVisionConfirmed = data;
    state.newLicenseOthersUnderSuperVisionConfirmedSearched = data;
  },
  [SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED](state, searchedVal) {
    state.newLicenseOthersUnderSuperVisionConfirmedSearched = searchedVal;
  },

  [SET_NEW_LICENSE_FOR_SPECIFIC_USER](state, data) {
    state.newLicenseForSpecificUser = data;
    state.newLicenseForSpecificUserSearched = data;
  },
  [SET_NEW_LICENSE_FOR_SPECIFIC_USER_SEARCHED](state, searchedVal) {
    state.newLicenseForSpecificUserSearched = searchedVal;
  },

  [SET_NEW_LICENSE_SUSPENDED](state, data) {
    state.newLicenseSuspended = data;
    state.newLicenseSuspendedSearched = data;
  },
  [SET_NEW_LICENSE_SUSPENDED_SEARCHED](state, searchedVal) {
    state.newLicenseSuspendedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_CANCELLED](state, data) {
    state.newLicenseCancelled = data;
    state.newLicenseCancelledSearched = data;
  },
  [SET_NEW_LICENSE_CANCELLED_SEARCHED](state, searchedVal) {
    state.newLicenseCancelledSearched = searchedVal;
  },

  [SET_NEW_LICENSE_ALL_Suspended](state, data) {
    state.newLicenseAllSuspended = data;
    state.newLicenseAllSuspendedSearched = data;
  },
  [SET_NEW_LICENSE_ALL_Suspended_SEARCHED](state, searchedVal) {
    state.newLicenseAllSuspendedSearched = searchedVal;
  },
  [SET_NEW_LICENSE_ALL_Cancelled](state, data) {
    state.newLicenseAllCancelled = data;
    state.newLicenseAllCancelledSearched = data;
  },
  [SET_NEW_LICENSE_ALL_Cancelled_SEARCHED](state, searchedVal) {
    state.newLicenseAllCancelledSearched = searchedVal
  },
};
