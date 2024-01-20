import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";

import {
  SET_LICENSE,
  SET_LICENSE_COPY,
  SET_SERVICE_FEE,
  SET_VERIFICATION_LETTER,
  SET_BUTTONS,
  SET_APPLICATION_ID,
  SET_DOCUMENT_SPEC,
  SET_DRAFT,
  SET_DECLINED_FIELDS,
  SET_REMARK,
  SET_ACCEPTED_FIELDS,
} from "./mutation-types";

const userId = +localStorage.getItem("userId");

export default {
  setLicense({ commit }, license) {
    commit(SET_LICENSE, license);
  },
  set_License_Copy({ commit }, licenseCopy) {
    commit(SET_LICENSE_COPY, licenseCopy);
  },
  set_Service_Fee({ commit }, serviceFee) {
    commit(SET_SERVICE_FEE, serviceFee);
  },
  set_Verification_Letter({ commit }, verificationLetter) {
    commit(SET_VERIFICATION_LETTER, verificationLetter);
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
  async addVerificationLicense({ commit }, license) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/verifications/add",
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async editVerificationLicense({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/verifications/" + license.id,
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
        baseUrl + "/documentUploads/verificationDocument/" + documents.id,
        documents.document,
        {
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
  async getInstitution() {
    try {
      const resp = await ApiService.get(baseUrl + "/lookups/institutions");
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

  async getVerificationLicense({ commit }) {
    try {
      const resp = await ApiService.get(
        baseUrl + "/verifications/user/" + userId
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getDraft({ commit }, id) {
    try {
      const resp = await ApiService.get(baseUrl + "/verifications/" + id);
      return resp;
    } catch (error) {
      return error;
    }
  },

  async withdraw({ commit }, payload) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/verifications/" + payload.licenseId,
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
        baseUrl + "/verifications/" + payload.licenseId,
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
  async storeDeclinedFields({ commit }, fields) {
    commit(SET_DECLINED_FIELDS, fields);
  },
  async storeAcceptedFields({ commit }, fields) {
    commit(SET_ACCEPTED_FIELDS, fields);
  },
  async storeRemark({ commit }, remark) {
    commit(SET_REMARK, remark);
  },
};
