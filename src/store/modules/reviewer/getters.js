export default {
    getUnassigned: state => state.unassigned,
    getUnassignedSearched: state => state.unassignedSearched,

    getAssignedToYou: state => state.assgnedToYou,
    getAssignedToYouSearched: state => state.assignedToYouSearched,

    getUnfinished: state => state.unfinished,
    getUnfinishedSearched: state => state.unfinishedSearched,

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
    
    getApproved: state => state.approved,
    getApprovedSearched: state => state.approvedSearched,
    
    getAllPendingPayment: state => state.allPendingPayment,
    getAllPendingPaymentSearched: state => state.allPendingPaymentSearched,

    getPendingPayments: state => state.pendingPayments,
    getPendingPaymentsSearched: state => state.pendingPaymentsSearched,

    getApprovedPendingPayments: state => state.approvedPendingPayments,
    getApprovedPendingPaymentsSearched: state => state.approvedPendingPaymentsSearched,
};