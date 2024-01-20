import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";

import {
    SET_LICENSE,
    SET_BUTTONS,
    SET_APPLICATION_ID,
    SET_DOCUMENT_SPEC,
    SET_DRAFT,
    SET_DECLINED_FIELDS,
    SET_ACCEPTED_FIELDS,
    SET_REMARK,
    SET_PASSPORT,
    SET_HEALTH_EXAM_CERT,
    SET_LANGUAGE,
    SET_PROFESSIONAL_DOC_CERTIFICATE,
    SET_PROFESSIONAL_DOC_CERTIFICATE2,
    SET_PROFESSIONAL_DOC_CERTIFICATE3,
    SET_PROFESSIONAL_DOC_CERTIFICATE4,
    SET_PROFESSIONAL_DOC_CERTIFICATE5,
    SET_PROFESSIONAL_DOC_DIPLOMA,
    SET_PROFESSIONAL_DOC_DIPLOMA2,
    SET_PROFESSIONAL_DOC_DIPLOMA3,
    SET_PROFESSIONAL_DOC_DIPLOMA4,
    SET_PROFESSIONAL_DOC_DIPLOMA5,
    SET_PROFESSIONAL_DOC_TRANSCRIPT,
    SET_PROFESSIONAL_DOC_TRANSCRIPT2,
    SET_PROFESSIONAL_DOC_TRANSCRIPT3,
    SET_PROFESSIONAL_DOC_TRANSCRIPT4,
    SET_PROFESSIONAL_DOC_TRANSCRIPT5,
    SET_HERQA,
    SET_SUPPORT_LETTER,
    SET_COC,
    SET_COC2,
    SET_COC3,
    SET_EDUCATIONAL_DOCUMENT,
    SET_WORK_EXPERIENCE,
    SET_WORK_EXPERIENCE2,
    SET_SERVICE_FEE,
    SET_RENEWED_LICENSE,
    SET_PROFESSIONAL_LICENSE,
    SET_PROFESSIONAL_LICENSE2,
    SET_PAYROLL,
    SET_DEGREE,
    SET_TRANSCRIPT,
    SET_TRANSCRIPT2,
    SET_DIPLOMA,
    SET_PRO_CERTIFICATE,
    SET_PRO_DIPLOMA,
    SET_PRO_TRANSCRIPT,
    SET_EDU_EIGHTH,
    SET_EDU_TENTH,
    SET_EDU_TWELVETH,
    SET_EDU_TRANSCRIPT1,
    SET_EDU_TRANSCRIPT2,
    SET_MASTERS,
    SET_MASTERS_TRANSCRIPT,
    SET_MASTERS_TRANSCRIPT2,
    SET_PHD,
    SET_PHD_TRANSCRIPT,
    SET_PHD_TRANSCRIPT2,
    SET_RENEWED_LICENSE_OF_HEALTH_FACILITY,
    SET_REQUEST_LETTER_FROM_HIRING_HEALTH_FACILITY,
} from "./mutation-types";

const userId = +localStorage.getItem("userId");

export default {
    setLicense({ commit }, license) {
        commit(SET_LICENSE, license);
    },
    setButtons({ commit }, buttons) {
        commit(SET_BUTTONS, buttons);
    },
    setApplicationId({ commit }, id) {
        commit(SET_APPLICATION_ID, id);
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
    setPassport({ commit }, passport) {
        commit(SET_PASSPORT, passport);
    },
    setHealthExamCert({ commit }, healthExamCert) {
        commit(SET_HEALTH_EXAM_CERT, healthExamCert);
    },
    setLanguage({ commit }, language) {
        commit(SET_LANGUAGE, language);
    },
    setProfessionalDocCertificate({ commit }, professionalDocCertificate) {
        commit(SET_PROFESSIONAL_DOC_CERTIFICATE, professionalDocCertificate);
    },
    setProfessionalDocCertificate2({ commit }, professionalDocCertificate2) {
        commit(SET_PROFESSIONAL_DOC_CERTIFICATE2, professionalDocCertificate2);
    },
    setProfessionalDocCertificate3({ commit }, professionalDocCertificate3) {
        commit(SET_PROFESSIONAL_DOC_CERTIFICATE3, professionalDocCertificate3);
    },
    setProfessionalDocCertificate4({ commit }, professionalDocCertificate4) {
        commit(SET_PROFESSIONAL_DOC_CERTIFICATE4, professionalDocCertificate4);
    },
    setProfessionalDocCertificate5({ commit }, professionalDocCertificate5) {
        commit(SET_PROFESSIONAL_DOC_CERTIFICATE5, professionalDocCertificate5);
    },
    setProfessionalDocDiploma({ commit }, professionalDocDiploma) {
        commit(SET_PROFESSIONAL_DOC_DIPLOMA, professionalDocDiploma);
    },
    setProfessionalDocDiploma2({ commit }, professionalDocDiploma2) {
        commit(SET_PROFESSIONAL_DOC_DIPLOMA2, professionalDocDiploma2);
    },
    setProfessionalDocDiploma3({ commit }, professionalDocDiploma3) {
        commit(SET_PROFESSIONAL_DOC_DIPLOMA3, professionalDocDiploma3);
    },
    setProfessionalDocDiploma4({ commit }, professionalDocDiploma4) {
        commit(SET_PROFESSIONAL_DOC_DIPLOMA4, professionalDocDiploma4);
    },
    setProfessionalDocDiploma5({ commit }, professionalDocDiploma5) {
        commit(SET_PROFESSIONAL_DOC_DIPLOMA5, professionalDocDiploma5);
    },
    setProfessionalDocTranscript({ commit }, professionalDocTranscript) {
        commit(SET_PROFESSIONAL_DOC_TRANSCRIPT, professionalDocTranscript);
    },
    setProfessionalDocTranscript2({ commit }, professionalDocTranscript2) {
        commit(SET_PROFESSIONAL_DOC_TRANSCRIPT2, professionalDocTranscript2);
    },
    setProfessionalDocTranscript3({ commit }, professionalDocTranscript3) {
        commit(SET_PROFESSIONAL_DOC_TRANSCRIPT3, professionalDocTranscript3);
    },
    setProfessionalDocTranscript4({ commit }, professionalDocTranscript4) {
        commit(SET_PROFESSIONAL_DOC_TRANSCRIPT4, professionalDocTranscript4);
    },
    setProfessionalDocTranscript5({ commit }, professionalDocTranscript5) {
        commit(SET_PROFESSIONAL_DOC_TRANSCRIPT5, professionalDocTranscript5);
    },
    setHerqa({ commit }, herqa) {
        commit(SET_HERQA, herqa);
    },
    setSupportLetter({ commit }, letter) {
        commit(SET_SUPPORT_LETTER, letter);
    },
    setCOC({ commit }, coc) {
        commit(SET_COC, coc);
    },
    setCOC2({ commit }, coc2) {
        commit(SET_COC2, coc2);
    },
    setCOC3({ commit }, coc3) {
        commit(SET_COC3, coc3);
    },
    setEducationalDocument({ commit }, educationalDoc) {
        commit(SET_EDUCATIONAL_DOCUMENT, educationalDoc);
    },
    setWorkExperience({ commit }, workExperience) {
        commit(SET_WORK_EXPERIENCE, workExperience);
    },
    setWorkExperience2({ commit }, workExperience2) {
        commit(SET_WORK_EXPERIENCE2, workExperience2);
    },
    setServiceFee({ commit }, serviceFee) {
        commit(SET_SERVICE_FEE, serviceFee);
    },
    setRenewedLicense({ commit }, license) {
        commit(SET_RENEWED_LICENSE, license);
    },
    setProfessionalLicense({ commit }, license) {
        commit(SET_PROFESSIONAL_LICENSE, license);
    },
    setProfessionalLicense2({ commit }, license2) {
        commit(SET_PROFESSIONAL_LICENSE2, license2);
    },
    setPayroll({ commit }, payroll) {
        commit(SET_PAYROLL, payroll);
    },
    setDegree({ commit }, degree) {
        commit(SET_DEGREE, degree);
    },
    setTranscript({ commit }, transcript) {
        commit(SET_TRANSCRIPT, transcript);
    },
    setTranscript2({ commit }, transcript2) {
        commit(SET_TRANSCRIPT2, transcript2);
    },
    setDiploma({ commit }, diploma) {
        commit(SET_DIPLOMA, diploma);
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
    setMasters({ commit }, masters) {
        commit(SET_MASTERS, masters);
    },
    setMastersTranscript({ commit }, mastersTranscript) {
        commit(SET_MASTERS_TRANSCRIPT, mastersTranscript);
    },
    setMastersTranscript2({ commit }, mastersTranscript2) {
        commit(SET_MASTERS_TRANSCRIPT2, mastersTranscript2);
    },
    setPhd({ commit }, phd) {
        commit(SET_PHD, phd);
    },
    setPhdTranscript({ commit }, phdTranscript) {
        commit(SET_PHD_TRANSCRIPT, phdTranscript);
    },
    setPhdTranscript2({ commit }, phdTranscript2) {
        commit(SET_PHD_TRANSCRIPT2, phdTranscript2);
    },
    setRenewedLicenseOfHealthFacility({ commit },
        renewedLicenseOfHealthFacility
    ) {
        commit(
            SET_RENEWED_LICENSE_OF_HEALTH_FACILITY,
            renewedLicenseOfHealthFacility
        );
    },
    setRequestLetterFromHiringHealthFacility({ commit },
        requestLetterFromHiringHealthFacility
    ) {
        commit(
            SET_REQUEST_LETTER_FROM_HIRING_HEALTH_FACILITY,
            requestLetterFromHiringHealthFacility
        );
    },
    async addNewLicense({ commit }, license) {
        try {
            const resp = await ApiService.post(baseUrl + "/newLicenses/add", license);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async editNewLicense({ commit }, license) {
        try {
            const resp = await ApiService.put(
                baseUrl + "/newLicenses/" + license.id,
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
                baseUrl + "/documentUploads/licenseDocument/" + documents.id,
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
    async getNewLicense({ commit }) {
        try {
            const resp = await ApiService.get(
                baseUrl + "/newLicenses/user/" + userId
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getDraft({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/newLicenses/" + id);
            return resp;
        } catch (error) {
            return error;
        }
    },
    async withdraw({ commit }, payload) {
        try {
            const resp = await ApiService.put(
                baseUrl + "/newLicenses/" + payload.licenseId,
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
                baseUrl + "/newLicenses/" + payload.licenseId,
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
    async getExpertLevel() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/expertLevels");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async searchProfessionalType({ commit }, profTypes) {
        try {
            const resp = await ApiService.post(
                baseUrl + "/newLicenses/search/professionalType",
                profTypes
            );
            return resp;
        } catch (error) {
            return error;
        }
    },
};