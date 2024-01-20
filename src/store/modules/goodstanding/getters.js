export default {
    getApplicationId: (state) => state.applicationId,
    getLicense: (state) => state.license,
    getButtons: (state) => state.buttons,
    getDocumentSpec: (state) => state.documentSpec,
    getDraft: (state) => state.draft,
    getDeclinedFields: (state) => state.declinedFields,
    getAcceptedFields: (state) => state.acceptedFields,
    getRemark: (state) => state.remark,
    getLicenseCopy: (state) => state.licenseCopy,
    getGoodStandingLetter: (state) => state.goodStandingLetter,
    getServiceFee: (state) => state.serviceFee,
};