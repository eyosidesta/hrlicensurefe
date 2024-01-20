export default {
    getUnassigned: state => state.unassigned,
    getUnassignedSearched: state => state.unassignedSearched,

    getAssignedToYou: state => state.assgnedToYou,
    getAssignedToYouSearched: state => state.assignedToYouSearched,

    getUnfinished: state => state.unfinished,
    getUnfinishedSearched: state => state.unfinishedSearched,

    getUnconfirmed: state => state.unconfirmed,
    getUnconfirmedSearched: state => state.unconfirmedSearched,
    getOthersUnconfirmed: state => state.othersUnconfirmed,
    getOthersUnconfirmedSearched: state => state.othersUnconfirmedSearched,

    getReturnedToMe: state => state.returnedToMe,
    getReturnedToMeSearched: state => state.returnedToMeSearched,
    getReturnedToOthers: state => state.returnedToOthers,
    getRetunedToOthersSearched: state => state.retunedToOthersSearched,

    getConfirmReview: state => state.confirmReview,
    getConfirmReviewSearched: state => state.confirmReviewSearched,
    getOthersConfirmReview: state => state.othersConfirmReview,
    getOthersConfirmReviewSearched: state => state.othersConfirmReviewSearched,

    getEvaluateReviewer: state => state.evaluateReviewer,
    getEvaluateReviewerSearched: state => state.evaluateReviewerSearched,
    getOthresEvaluateReviewer: state => state.othresEvaluateReviewer,
    getOthresEvaluateReviewerSearched: state => state.othresEvaluateReviewerSearched,

    getConfirmed: state => state.confirmed,
    getConfirmedSearched: state => state.confirmedSearched,

    getRecentlyFinished: state => state.recentlyFinished,
    getRecentlyFinishedSearched: state => state.recentlyFinishedSearched,

    getAssignedForEveryOne: state => state.assignedForEveryOne,
    getAssignedForEveryOneSearched: state => state.assignedForEveryOneSearched,

    getEveryOneUnfinished: state => state.everyOneUnfinished,
    getEveryOneUnfinishedSearched: state => state.eveyOneUnfinishedSearched,

    getAllRecentlyFinished: state => state.allRecentlyFinished,
    getAllRecentlyFinishedSearched: state => state.allRecentlyFinishedSearched,

    getCertifiedUsers: state => state.certifiedUsers,
    getCertifiedUsersSearched: state => state.certifiedUsersSearched,

    getAllCertifiedUsers: state => state.allCertifiedUsers,
    getAllCertifiedUsersSearched: state => state.allCertifiedUsersSearched,

    getMyRegionCertifiedUsers: state => state.myRegionCertifiedUsers,
    getMyRegionCertifiedUsersSearched: state => state.myRegionCertifiedUsersSearched,
    
    getApproved: state => state.approved,
    getApprovedSearched: state => state.approvedSearched,
    getAllApproved: state => state.allApproved,
    getAllApprovedSearched: state => state.allApprovedSearched,
    
    getRejected: state => state.rejected,
    getRejectedSearched: state => state.rejectedSearched,
    getAllRejected: state => state.allRejected,
    getAllRejectedSearched: state => state.allRejectedSearched,

    getUnderSuperVision: state => state.underSuperVision,
    getUnderSuperVisionSearched: state => state.underSuperVisionSearched,
    getAllUnderSuperVision: state  => state.allUnderSuperVision,
    getAllUnderSuperVisionSearched: state => state.allUnderSuperVisionSearched,

    getAllPendingPayment: state => state.allPendingPayment,
    getAllPendingPaymentSearched: state => state.allPendingPaymentSearched,

    getPendingPayments: state => state.pendingPayments,
    getPendingPaymentsSearched: state => state.pendingPaymentsSearched,

    getApprovedPendingPayments: state => state.approvedPendingPayments,
    getApprovedPendingPaymentsSearched: state => state.approvedPendingPaymentsSearched,

    getLegacyData: state => state.legacyData,
    getLegacyDataSearched: state => state.legacyDataSearched,

};