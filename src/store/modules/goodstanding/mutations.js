import {
    SET_APPLICATION_ID,
    SET_LICENSE,
    SET_BUTTONS,
    SET_DOCUMENT_SPEC,
    SET_DRAFT,
    SET_DECLINED_FIELDS,
    SET_ACCEPTED_FIELDS,
    SET_REMARK,
    SET_LICENSE_COPY,
    SET_GOODSTANDING_LETTER,
    SET_SERVICE_FEE,
} from "./mutation-types";

export default {
    [SET_APPLICATION_ID](state, id) {
        state.applicationId = id;
    },
    [SET_LICENSE](state, license) {
        state.license = license;
    },
    [SET_BUTTONS](state, buttons) {
        state.buttons = buttons;
    },
    [SET_DOCUMENT_SPEC](state, documentSpec) {
        state.documentSpec = documentSpec;
    },
    [SET_DRAFT](state, draft) {
        state.draft = draft;
    },
    [SET_DECLINED_FIELDS](state, field) {
        state.declinedFields = field;
    },
    [SET_ACCEPTED_FIELDS](state, field) {
        state.acceptedFields = field;
    },

    [SET_REMARK](state, remark) {
        state.remark = remark;
    },
    [SET_LICENSE_COPY](state, licenseCopy) {
        state.licenseCopy = licenseCopy;
    },

    [SET_GOODSTANDING_LETTER](state, goodStandingLetter) {
        state.goodStandingLetter = goodStandingLetter;
    },
    [SET_SERVICE_FEE](state, serviceFee) {
        state.serviceFee = serviceFee;
    },
};