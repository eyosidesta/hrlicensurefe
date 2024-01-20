import {
    SET_LICENSE,
    SET_APPLICATION_ID,
    SET_BUTTONS,
    SET_DOCUMENT_SPEC,
    SET_DRAFT,
    SET_DECLINED_FIELDS,
    SET_ACCEPTED_FIELDS,
    SET_REMARK,
    SET_RENEWAL_HEALTH_EXAM_CERT,
    SET_RENEWAL_LETTER,
    SET_RENEWAL_WORK_EXPERIENCE,
    SET_RENEWAL_WORK_EXPERIENCE2,
    SET_RENEWAL_SERVICE_FEE,
    SET_RENEWAL_CPD,
    SET_RENEWAL_CPD2,
    SET_RENEWAL_CPD3,
    SET_RENEWAL_CPD4,
    SET_RENEWAL_CPD5,
    SET_PREVIOUS_LICEENSE,
    SET_CERTIFICATE,
    SET_DIPLOMA,
    SET_TRANSCRIPT,
    SET_PROFESSIONAL_DOCUMENT,
    SET_PAYROLL,
    SET_PASSPORT,
    SET_LANGUAGE,
    SET_HERQA,
    SET_LETTER_FROM_ORG,
    SET_PROFESSIONAL_LICENSE,
    SET_RENEWED_LICENSE,
    SET_COC,
    SET_DEGREE,
    SET_EDUCATIONAL_DOCUMENT,
    SET_EDU_EIGHTH,
    SET_EDU_TENTH,
    SET_EDU_TWELVETH,
    SET_EDU_TRANSCRIPT1,
    SET_EDU_TRANSCRIPT2,
    SET_SUPPORT_LETTER,
    SET_PRO_CERTIFICATE,
    SET_PRO_DIPLOMA,
    SET_PRO_TRANSCRIPT,
    SET_MASTERS,
    SET_MASTERS_TRANSCRIPT,
    SET_PHD,
    SET_PHD_TRANSCRIPT,
    SET_RENEWED_LICENSE_OF_HEALTH_FACILITY,
} from "./mutation-types";

export default {
    [SET_LICENSE](state, license) {
        state.license = license;
    },
    [SET_APPLICATION_ID](state, id) {
        state.applicationId = id;
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
    [SET_RENEWAL_LETTER](state, renewalLetter) {
        state.letterFromHiringInstitution = renewalLetter;
    },
    [SET_RENEWAL_HEALTH_EXAM_CERT](state, renewalHealthExamCert) {
        state.healthExamCert = renewalHealthExamCert;
    },
    [SET_PREVIOUS_LICEENSE](state, previousLicense) {
        state.previosLicense = previousLicense;
    },
    [SET_RENEWAL_SERVICE_FEE](state, renewalServiceFee) {
        state.serviceFee = renewalServiceFee;
    },
    [SET_RENEWAL_CPD](state, renewalCpd) {
        state.cpd = renewalCpd;
    },
    [SET_RENEWAL_CPD2](state, renewalCpd2) {
        state.cpd2 = renewalCpd2;
    },
    [SET_RENEWAL_CPD3](state, renewalCpd3) {
        state.cpd3 = renewalCpd3;
    },
    [SET_RENEWAL_CPD4](state, renewalCpd4) {
        state.cpd4 = renewalCpd4;
    },
    [SET_RENEWAL_CPD5](state, renewalCpd5) {
        state.cpd5 = renewalCpd5;
    },
    [SET_PROFESSIONAL_DOCUMENT](state, professionalDocuments) {
        state.professionalDocuments = professionalDocuments;
    },
    [SET_RENEWAL_WORK_EXPERIENCE](state, renewalWorkExperience) {
        state.workExperience = renewalWorkExperience;
    },
    [SET_RENEWAL_WORK_EXPERIENCE2](state, renewalWorkExperience2) {
        state.workExperience2 = renewalWorkExperience2;
    },
    [SET_CERTIFICATE](state, certificate) {
        state.certificate = certificate;
    },
    [SET_DIPLOMA](state, diploma) {
        state.diploma = diploma;
    },
    [SET_TRANSCRIPT](state, transcript) {
        state.transcript = transcript;
    },
    [SET_PAYROLL](state, payroll) {
        state.payroll = payroll;
    },
    [SET_PASSPORT](state, passport) {
        state.passport = passport;
    },
    [SET_LANGUAGE](state, englishLanguage) {
        state.englishLanguage = englishLanguage;
    },
    [SET_HERQA](state, herqa) {
        state.herqa = herqa;
    },
    [SET_LETTER_FROM_ORG](state, letter) {
        state.letterfromOrg = letter;
    },
    [SET_PROFESSIONAL_LICENSE](state, license) {
        state.professionalLicense = license;
    },
    [SET_RENEWED_LICENSE](state, license) {
        state.renewedLicense = license;
    },
    [SET_COC](state, coc) {
        state.coc = coc;
    },
    [SET_DEGREE](state, degree) {
        state.degree = degree;
    },
    [SET_EDUCATIONAL_DOCUMENT](state, educationalDocuments) {
        state.educationalDocuments = educationalDocuments;
    },
    [SET_EDU_EIGHTH](state, eduEighthGrade) {
        state.eduEighthGrade = eduEighthGrade;
    },
    [SET_EDU_TENTH](state, eduTenthGrade) {
        state.eduTenthGrade = eduTenthGrade;
    },
    [SET_EDU_TWELVETH](state, eduTwelvethGrade) {
        state.eduTwelvethGrade = eduTwelvethGrade;
    },
    [SET_EDU_TRANSCRIPT1](state, eduTranscript1) {
        state.eduTranscript1 = eduTranscript1;
    },
    [SET_EDU_TRANSCRIPT2](state, eduTranscript2) {
        state.eduTranscript2 = eduTranscript2;
    },
    [SET_SUPPORT_LETTER](state, supportLetter) {
        state.supportLetter = supportLetter;
    },
    [SET_PRO_CERTIFICATE](state, proCertificate) {
        state.proCertificate = proCertificate;
    },
    [SET_PRO_DIPLOMA](state, proDiploma) {
        state.proDiploma = proDiploma;
    },
    [SET_PRO_TRANSCRIPT](state, proTranscript) {
        state.proTranscript = proTranscript;
    },
    [SET_MASTERS](state, masters) {
        state.masters = masters;
    },
    [SET_MASTERS_TRANSCRIPT](state, mastersTranscript) {
        state.mastersTranscript = mastersTranscript;
    },
    [SET_PHD](state, phd) {
        state.phd = phd;
    },
    [SET_PHD_TRANSCRIPT](state, phdTranscript) {
        state.phdTranscript = phdTranscript;
    },
    [SET_RENEWED_LICENSE_OF_HEALTH_FACILITY](
        state,
        renewedLicenseOfHealthFacility
    ) {
        state.renewedLicenseOfHealthFacility = renewedLicenseOfHealthFacility;
    },
};