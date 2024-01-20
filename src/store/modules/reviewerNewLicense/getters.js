export default {
  getNewLicenseUnassigned: (state) => state.newLicenseUnassigned,
  getNewLicenseUnassignedSearched: (state) => state.newLicenseUnassignedSearched,
  getNewLicenseFromOtherRegion: (state) => state.newLicenseFromOtherRegion,
  getNewLicenseFromOtherRegionSearched: (state) => state.newLicenseFromOtherRegionSearched,

  getNewLicenseUnfinished: (state) => state.newLicenseUnfinished,
  getNewLicenseUnfinishedSearched: (state) => state.newLicenseUnfinishedSearched,
  getNewLicenseOthersUnfinished: (state) => state.newLicenseOthersUnfinished,
  getNewLicenseOthersUnfinishedSearched: (state) => state.newLicenseOthersUnfinishedSearched,

  getNewLicenseAssignedToYou: (state) => state.newLicenseAssignedToYou,
  getNewLicenseAssignedToYouSearched: (state) => state.newLicenseAssignedToYouSearched,
  getNewLicenseAssignedToOthers: (state) => state.newLicenseAssignedToOthers,
  getNewLicenseAssignedToOthersSearched: (state) => state.newLicenseAssignedToOthersSearched,

  getNewLicenseApproved: (state) => state.newLicenseApproved,
  getNewLicenseApprovedSearched: (state) => state.newLicenseApprovedSearched,
  getNewLicenseAllApproved: (state) => state.newLicenseAllApproved,
  getNewLicenseAllApprovedSearched: (state) => state.newLicenseAllApprovedSearched,

  getNewLicenseDeclined: (state) => state.newLicenseDeclined,
  getNewLicenseDeclinedSearched: (state) => state.newLicenseDeclinedSearched,
  getNewLicenseAllDeclined: (state) => state.newLicenseAllDeclined,
  getNewLicenseAllDeclinedSearched: (state) => state.newLicenseAllDeclinedSearched,

  getNewLicenseUnderSuperVision: (state) => state.newLicenseUnderSuperVision,
  getNewLicenseUnderSuperVisionSearched: (state) => state.newLicenseUnderSuperVisionSearched,
  getNewLicenseOthersUnderSuperVision: (state) => state.newLicenseOthersUnderSuperVision,
  getNewLicenseOthersUnderSuperVisionSearched: (state) => state.newLicenseOthersUnderSuperVisionSearched,

  getNewLicenseApprovedPayment: (state) => state.newLicenseApprovedPayment,
  getNewLicenseApprovedPaymentSearched: (state) => state.newLicenseApprovedPaymentSearched,
  getNewLicenseOthersApprovedPayment: (state) => state.newLicenseOthersApprovedPayment,
  getNewLicenseOthersApprovedPaymentSearched: (state) => state.newLicenseOthersApprovedPaymentSearched,

  getNewLicenseDeclinedPayment: (state) => state.newLicenseDeclinedPayment,
  getNewLicenseDeclinedPaymentSearched: (state) => state.newLicenseDeclinedPaymentSearched,
  getNewLicenseOthersDeclinedPayment: (state) => state.newLicenseOthersDeclinedPayment,
  getNewLicenseOthersDeclinedPaymentSearched: (state) => state.newLicenseOthersDeclinedPaymentSearched,

  getNewLicenseOnReview: (state) => state.newLicenseOnReview,
  getNewLicenseOnReviewSearched: (state) => state.newLicenseOnReviewSearched,
  getNewLicenseOthersOnReview: (state) => state.newLicenseOthersOnReview,
  getNewLicenseOthersOnReviewSearched: (state) => state.newLicenseOthersOnReviewSearched,

  getNewLicenseReEvaluate: (state) => state.newLicenseReEvaluate,
  getNewLicenseReEvaluateSearched: (state) => state.newLicenseReEvaluateSearched,
  getNewLicenseOthersReEvaluate: (state) => state.newLicenseOthersReEvaluate,
  getNewLicenseOthersReEvaluateSearched: (state) => state.newLicenseOthersReEvaluateSearched,

  getNewLicenseConfirmed: (state) => state.newLicenseConfirmed,
  getNewLicenseConfirmedSearched: (state) => state.newLicenseConfirmedSearched,
  getNewLicenseOthersConfirmed: (state) => state.newLicenseOthersConfirmed,
  getNewLicenseOthersConfirmedSearched: (state) => state.newLicenseOthersConfirmedSearched,

  getNewLicenseReturnedToMe: (state) => state.newLicenseReturnedToMe,
  getNewLicenseReturnedToMeSearched: (state) => state.newLicenseReturnedToMeSearched,
  getNewLicenseReturnedToOthers: (state) => state.newLicenseReturnedToOthers,
  getnewLicenseReturnedToOthersSearched: (state) => state.newLicenseReturnedToOthersSearched,

  getNewLicensePendingPayment: (state) => state.newLicensePendingPayment,
  getNewLicensePendingPaymentSearched: (state) => state.newLicensePendingPaymentSearched,
  getNewLicenseOthersPendingPayment: (state) => state.newLicenseOthersPendingPayment,
  getNewLicenseOthersPendingPaymentSearched: (state) => state.newLicenseOthersPendingPaymentSearched,

  getNewLicenseLicensed: (state) => state.newLicenseLicensed,
  getNewLicenseLicensedSearched: (state) => state.newLicenseLicensedSearched,
  getNewLicenseOthersLicensed: (state) => state.newLicenseOthersLicensed,
  getNewLicenseOthersLicensedSearched: (state) => state.newLicenseOthersLicensedSearched,

  getNewLicenseAllLicensed: (state) => state.newLicenseAllLicensed,
  getNewLicenseAllLicensedSearched: (state) => state.newLicenseAllLicensedSearched,

  getNewLicenseReApply: (state) => state.newLicenseReApply,
  getNewLicenseReApplySearched: (state) => state.newLicenseReApplySearched,
  getNewLicenseOthersReApply: (state) => state.newLicenseOthersReApply,
  getNewLicenseOthersReApplySearched: (state) => state.newLicenseOthersReApplySearched,

  getNewLicenseDeclineConfirmed: (state) => state.newLicenseDeclineConfirmed,
  getNewLicenseDeclineConfirmedSearched: (state) => state.newLicenseDeclineConfirmedSearched,
  getNewLicenseOthersDeclineConfirmed: (state) => state.newLicenseOthersDeclineConfirmed,
  getNewLicenseOthersDeclineConfirmedSearched: (state) => state.newLicenseOthersDeclineConfirmedSearched,

  getNewLicenseUnderSuperVisionConfirmed: (state) => state.newLicenseUnderSuperVisionConfirmed,
  getNewLicenseUnderSuperVisionConfirmedSearched: (state) => state.newLicenseUnderSuperVisionConfirmedSearched,
  getNewLicenseOthersUnderSuperVisionConfirmed: (state) => state.newLicenseOthersUnderSuperVisionConfirmed,
  getNewLicenseOthersUnderSuperVisionConfirmedSearched: (state) => state.newLicenseOthersUnderSuperVisionConfirmedSearched,

  getNewLicenseForSpecificUser: (state) => state.newLicenseForSpecificUser,
  getNewLicenseForSpecificUserSearched: (state) => state.newLicenseForSpecificUserSearched,

  getNewLicenseSuspended: (state) => state.newLicenseSuspended,
  getNewLicenseSuspendedSearched: (state) => state.newLicenseSuspendedSearched,
  getNewLicenseCancelled: (state) => state.newLicenseCancelled,
  getNewLicenseCancelledSearched: (state) => state.newLicenseCancelledSearched,

  getNewLicenseAllSuspended: (state) => state.newLicenseAllSuspended,
  getNewLicenseAllSuspendedSearched: (state) => state.newLicenseAllSuspendedSearched,
  getNewLicenseAllCancelled: (state) => state.newLicenseAllCancelled,
  getNewLicenseAllCancelledSearched: (state) => state.newLicenseAllCancelledSearched,
};
