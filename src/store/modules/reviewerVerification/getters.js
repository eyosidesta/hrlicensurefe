export default {
    getVerificationUnassigned: state => state.verificationUnassigned,
    getVerificationUnassignedSearched: state => state.verificationUnassignedSearched,

    getVerificationUnfinished: state => state.verificationUnfinished,
    getVerificationUnfinishedSearched: state => state.verificationUnfinishedSearched,
    getVerificationOthersUnfinished: state => state.verificationOthersUnfinished,
    getVerificationOthersUnfinishedSearched: state => state.verificationOthersUnfinishedSearched,

    getVerificationAssignedToYou: state => state.verificationAssignedToYou,
    getVerificationAssignedToYouSearched: state => state.verificationAssignedToYouSearched,
    getVerificationAssignedToOthers: state => state.verificationAssignedToOthers,
    getVerificationAssignedToOthersSearched: state => state.verificationAssignedToOthersSearched,

    getVerificationApproved: (state) => state.verificationApproved,
    getVerificationApprovedSearched: (state) => state.verificationApprovedSearched,
    getVerificationAllApproved: (state) => state.verificationAllApproved,
    getVerificationAllApprovedSearched: (state) => state.verificationAllApprovedSearched,

    getVerificationDeclined: (state) => state.verificationDeclined,
    getVerificationDeclinedSearched: (state) => state.verificationDeclinedSearched,
    getVerificationAllDeclined: (state) => state.verificationAllDeclined,
    getVerificationAllDeclinedSearched: (state) => state.verificationAllDeclinedSearched,

    getVerificationReApply: (state) => state.verificationReApply,
    getVerificationReApplySearched: (state) => state.verificationReApplySearched,
    getVerificationOthersReApply: (state) => state.verificationOthersReApply,
    getVerificationOthersReApplySearched: (state) => state.verificationOthersReApplySearched,

}