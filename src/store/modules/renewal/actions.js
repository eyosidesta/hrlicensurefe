import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";

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

const userId = +localStorage.getItem("userId");
export default {
    setLicense({ commit }, license) {
        commit(SET_LICENSE, license);
    },
    setApplicationId({ commit }, id) {
        commit(SET_APPLICATION_ID, id);
    },
    setButtons({ commit }, buttons) {
        commit(SET_BUTTONS, buttons);
    },
    setDocumentSpecs({ commit }, documentSpecs) {
        commit(SET_DOCUMENT_SPEC, documentSpecs);
    },
    setDraft({ commit }, draft) {
        commit(SET_DRAFT, draft);
    },
    async storeDeclinedFields({ commit }, fields) {
        commit(SET_DECLINED_FIELDS, fields);
    },
    async storeAcceptedFields({ commit }, fields) {
        commit(SET_ACCEPTED_FIELDS, fields);
    },
    async storeRemark({ commit }, remark) {
        commit(SET_REMARK, remark);
    },
    setRenewalHealthExamCert({ commit }, renewalHealthExamCert) {
        commit(SET_RENEWAL_HEALTH_EXAM_CERT, renewalHealthExamCert);
    },
    setRenewalLetter({ commit }, renewalLetter) {
        commit(SET_RENEWAL_LETTER, renewalLetter);
    },
    setRenewalServiceFee({ commit }, renewalServiceFee) {
        commit(SET_RENEWAL_SERVICE_FEE, renewalServiceFee);
    },
    setRenewalCpd({ commit }, renewalCpd) {
        commit(SET_RENEWAL_CPD, renewalCpd);
    },
    setRenewalCpd2({ commit }, renewalCpd2) {
        commit(SET_RENEWAL_CPD2, renewalCpd2);
    },
    setRenewalCpd3({ commit }, renewalCpd3) {
        commit(SET_RENEWAL_CPD3, renewalCpd3);
    },
    setRenewalCpd4({ commit }, renewalCpd4) {
        commit(SET_RENEWAL_CPD4, renewalCpd4);
    },
    setRenewalCpd5({ commit }, renewalCpd5) {
        commit(SET_RENEWAL_CPD5, renewalCpd5);
    },
    setProfessionalDoc({ commit }, professionalDoc) {
        commit(SET_PROFESSIONAL_DOCUMENT, professionalDoc);
    },
    setRenewalWorkExperience({ commit }, renewalWorkExperience) {
        commit(SET_RENEWAL_WORK_EXPERIENCE, renewalWorkExperience);
    },
    setRenewalWorkExperience2({ commit }, renewalWorkExperience2) {
        commit(SET_RENEWAL_WORK_EXPERIENCE2, renewalWorkExperience2);
    },
    setPreviousLicense({ commit }, license) {
        commit(SET_PREVIOUS_LICEENSE, license);
    },
    setCertificate({ commit }, certificate) {
        commit(SET_CERTIFICATE, certificate);
    },
    setDiploma({ commit }, diploma) {
        commit(SET_DIPLOMA, diploma);
    },
    setTranscript({ commit }, transcript) {
        commit(SET_TRANSCRIPT, transcript);
    },
    setPayroll({ commit }, payroll) {
        commit(SET_PAYROLL, payroll);
    },
    setPassport({ commit }, passport) {
        commit(SET_PASSPORT, passport);
    },
    setLanguage({ commit }, language) {
        commit(SET_LANGUAGE, language);
    },
    setHerqa({ commit }, herqa) {
        commit(SET_HERQA, herqa);
    },
    setLetterfromOrg({ commit }, letter) {
        commit(SET_LETTER_FROM_ORG, letter);
    },
    setProfessionalLicense({ commit }, license) {
        commit(SET_PROFESSIONAL_LICENSE, license);
    },
    setRenewedLicense({ commit }, license) {
        commit(SET_RENEWED_LICENSE, license);
    },
    setCOC({ commit }, coc) {
        commit(SET_COC, coc);
    },
    setDegree({ commit }, degree) {
        commit(SET_DEGREE, degree);
    },
    setEducationalDocument({ commit }, educationalDoc) {
        commit(SET_EDUCATIONAL_DOCUMENT, educationalDoc);
    },
    setEduEighth({ commit }, eduEighth) {
        commit(SET_EDU_EIGHTH, eduEighth);
    },
    setEduTenth({ commit }, eduTenth) {
        commit(SET_EDU_TENTH, eduTenth);
    },
    setEduTwelveth({ commit }, eduTwelveth) {
        commit(SET_EDU_TWELVETH, eduTwelveth);
    },
    setEduTranscript1({ commit }, eduTranscript1) {
        commit(SET_EDU_TRANSCRIPT1, eduTranscript1);
    },
    setEduTranscript2({ commit }, eduTranscript2) {
        commit(SET_EDU_TRANSCRIPT2, eduTranscript2);
    },
    setSupportLetter({ commit }, letter) {
        commit(SET_SUPPORT_LETTER, letter);
    },
    setProCertificate({ commit }, proCertificate) {
        commit(SET_PRO_CERTIFICATE, proCertificate);
    },
    setProDiploma({ commit }, proDiploma) {
        commit(SET_PRO_DIPLOMA, proDiploma);
    },
    setProTranscript({ commit }, proTranscript) {
        commit(SET_PRO_TRANSCRIPT, proTranscript);
    },
    setMasters({ commit }, masters) {
        commit(SET_MASTERS, masters);
    },
    setMastersTranscript({ commit }, mastersTranscript) {
        commit(SET_MASTERS_TRANSCRIPT, mastersTranscript);
    },
    setPhd({ commit }, phd) {
        commit(SET_PHD, phd);
    },
    setPhdTranscript({ commit }, phdTranscript) {
        commit(SET_PHD_TRANSCRIPT, phdTranscript);
    },
    setRenewedLicenseOfHealthFacility({ commit },
        renewedLicenseOfHealthFacility
    ) {
        commit(
            SET_RENEWED_LICENSE_OF_HEALTH_FACILITY,
            renewedLicenseOfHealthFacility
        );
    },
    async addRenewalLicense({ commit }, license) {
        try {
            const resp = await ApiService.post(baseUrl + "/renewals/add", license);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async editRenewalLicense({ commit }, license) {
        try {
            const resp = await ApiService.put(
                baseUrl + "/renewals/" + license.id,
                license.data
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async uploadDocuments({ commit }, documents) {
        try {
            const resp = await ApiService.post(
                baseUrl + "/documentUploads/renewalDocument/" + documents.id,
                documents.document, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getApplicantType() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/applicantTypes");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getInstitution({ commit }, value) {
        try {
            const resp = await ApiService.get(
                baseUrl + "/lookups/appTypeInstitutions/" + value
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getDepartmentType() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/departments");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getProfile({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/profiles/user/" + id);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getApplicationStatuses() {
        try {
            const resp = await ApiService.get(baseUrl + "/applicationStatuses");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getApplicationCategories() {
        try {
            const resp = await ApiService.get(baseUrl + "/applicationCategories");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getDocumentSpecs({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/documentSpecs/" + id);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getRenewalLicense({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/renewals/user/" + userId);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getDraft({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/renewals/" + id);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async withdraw({ commit }, payload) {
        try {
            const resp = await ApiService.put(
                baseUrl + "/renewals/" + payload.licenseId,
                payload.withdrawData
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async updateDraft({ commit }, payload) {
        try {
            const resp = await ApiService.put(
                baseUrl + "/renewals/" + payload.licenseId,
                payload.draftData
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getRegions() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/regions");
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getWoredas(context, zoneId) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/woredas/" + zoneId);
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getZones(context, regionId) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/zones/" + regionId);
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getExpertLevel() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/expertLevels");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getProfessionalTypes(context, deptId) {
        try {
            const resp = await ApiService.get(
                baseUrl + "/lookups/professionalTypes/" + deptId
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async searchNewLicense({ commit }, id) {
        try {
            const resp = await ApiService.get(
                baseUrl + "/newLicenses/search/applicant"
            );
            return resp;
        } catch (error) {
            return resp;
        }
    },
    async searchProfessionalType({ commit }, profTypes) {
        try {
            const resp = await ApiService.post(
                baseUrl + "/renewals/search/professionalType",
                profTypes
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
};