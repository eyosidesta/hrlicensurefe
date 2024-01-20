export default {
    getRenewalUnassigned: state => state.renewalUnassigned,
    getRenewalUnassignedSearched: state => state.renewalUnassignedSearched,

    getRenewalUnfinished: state => state.renewalUnfinished,
    getRenewalUnfinishedSearched: state => state.renewalUnfinishedSearched,
    getRenewalOthersUnfinished: state => state.renewalOthersUnfinished,
    getRenewalOthersUnfinishedSearched: state => state.renewalOthersUnfinishedSearched,

    getRenewalAssignedToYou: state => state.renewalAssignedToYou,
    getRenewalAssignedToYouSearched: state => state.renewalAssignedToYouSearched,
    getRenewalAssignedToOthers: state => state.renewalAssignedToOthers,
    getRenewalAssignedToOthersSearched: state => state.renewalAssignedToOthersSearched,

    getRenewalApproved: (state) => state.renewalApproved,
    getRenewalApprovedSearched: (state) => state.renewalApprovedSearched,
    getRenewalAllApproved: (state) => state.renewalAllApproved,
    getRenewalAllApprovedSearched: (state) => state.renewalAllApprovedSearched,

    getRenewalDeclined: (state) => state.renewalDeclined,
    getRenewalDeclinedSearched: (state) => state.renewalDeclinedSearched,
    getRenewalAllDeclined: (state) => state.renewalAllDeclined,
    getRenewalAllDeclinedSearched: (state) => state.renewalAllDeclinedSearched,

    getRenewalUnderSuperVision: (state) => state.renewalUnderSuperVision,
    getRenewalUnderSuperVisionSearched: (state) => state.renewalUnderSuperVisionSearched,
    getRenewalOthersUnderSuperVision: (state) => state.renewalOthersUnderSuperVision,
    getRenewalOthersUnderSuperVisionSearched: (state) => state.renewalOthersUnderSuperVisionSearched,

    getRenewalApprovedPayment: (state) => state.renewalApprovedPayment,
    getRenewalApprovedPaymentSearched: (state) => state.renewalApprovedPaymentSearched,
    getRenewalOthersApprovedPayment: (state) => state.renewalOthersApprovedPayment,
    getRenewalOthersApprovedPaymentSearched: (state) => state.renewalOthersApprovedPaymentSearched,

    getRenewalDeclinedPayment: (state) => state.renewalDeclinedPayment,
    getRenewalDeclinedPaymentSearched: (state) => state.renewalDeclinedPaymentSearched,
    getRenewalOthersDeclinedPayment: (state) => state.renewalOthersDeclinedPayment,
    getRenewalOthersDeclinedPaymentSearched: (state) => state.renewalOthersDeclinedPaymentSearched,

    getRenewalOnReview: (state) => state.renewalOnReview,
    getRenewalOnReviewSearched: (state) => state.renewalOnReviewSearched,
    getRenewalOthersOnReview: (state) => state.renewalOthersOnReview,
    getRenewalOthersOnReviewSearched: (state) => state.renewalOthersOnReviewSearched,
    
    getRenewalReEvaluate: (state) => state.renewalReEvaluate,
    getRenewalReEvaluateSearched: (state) => state.renewalReEvaluateSearched,
    getRenewalOthersReEvaluate: (state) => state.renewalOthersReEvaluate,
    getRenewalOthersReEvaluateSearched: (state) => state.renewalOthersReEvaluateSearched,

    getRenewalConfirmed: (state) => state.renewalConfirmed,
    getRenewalConfirmedSearched: (state) => state.renewalConfirmedSearched,
    getRenewalOthersConfirmed: (state) => state.renewalOthersConfirmed,
    getRenewalOthersConfirmedSearched: (state) => state.renewalOthersConfirmedSearched,

    getRenewalReturnedToMe: (state) => state.renewalReturnedToMe,
    getRenewalReturnedToMeSearched: (state) => state.renewalReturnedToMeSearched,
    getRenewalReturnedToOthers: (state) => state.renewalReturnedToOthers,
    getRenewalReturnedToOthersSearched: (state) => state.renewalReturnedToOthersSearched,

    getRenewalPendingPayment: (state) => state.renewalPendingPayment,
    getRenewalPendingPaymentSearched: (state) => state.renewalPendingPaymentSearched,
    getRenewalOthersPendingPayment: (state) => state.renewalOthersPendingPayment,
    getRenewalOthersPendingPaymentSearched: (state) => state.renewalOthersPendingPaymentSearched,

    getRenewalLicensed: (state) => state.renewalLicensed,
    getRenewalLicensedSearched: (state) => state.renewalLicensedSearched,
    getRenewalOthersLicensed: (state) => state.renewalOthersLicensed,
    getRenewalOthersLicensedSearched: (state) => state.renewalOthersLicensedSearched,

    getRenewalAllLicensed: (state) => state.renewalAllLicensed,
    getRenewalAllLicensedSearched: (state) => state.renewalAllLicensedSearched,

    getRenewalReApply: (state) => state.renewalReApply,
    getRenewalReApplySearched: (state) => state.renewalReApplySearched,
    getRenewalOthersReApply: (state) => state.renewalOthersReApply,
    getRenewalOthersReApplySearched: (state) => state.renewalOthersReApplySearched,

    getRenewalDeclineConfirmed: (state) => state.renewalDeclineConfirmed,
    getRenewalDeclineConfirmedSearched: (state) => state.renewalDeclineConfirmedSearched,
    getRenewalOthersDeclineConfirmed: (state) => state.renewalOthersDeclineConfirmed,
    getRenewalOthersDeclineConfirmedSearched: (state) => state.renewalOthersDeclineConfirmedSearched,
  
    getRenewalUnderSuperVisionConfirmed: (state) => state.renewalUnderSuperVisionConfirmed,
    getRenewalUnderSuperVisionConfirmedSearched: (state) => state.renewalUnderSuperVisionConfirmedSearched,
    getRenewalOthersUnderSuperVisionConfirmed: (state) => state.renewalOthersUnderSuperVisionConfirmed,
    getRenewalOthersUnderSuperVisionConfirmedSearched: (state) => state.renewalOthersUnderSuperVisionConfirmedSearched,

    getRenewalSuspended: (state) => state.renewalSuspended,
    getRenewalSuspendedSearched: (state) => state.renewalSuspendedSearched,
    getRenewalCancelled: (state) => state.renewalCancelled,
    getRenewalCancelledSearched: (state) => state.renewalCancelledSearched,

    getRenewalAllSuspended: (state) => state.renewalAllSuspended,
    getRenewalAllSuspendedSearched: (state) => state.renewalAllSuspendedSearched,
    getRenewalAllCancelled: (state) => state.renewalAllCancelled,
    getRenewalAllCancelledSearched: (state) => state.renewalAllCancelledSearched,
}