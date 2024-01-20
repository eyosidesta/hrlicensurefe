import ApiService from "../../../services/api.service";
import { SET_EDUCATION_LEVEL } from "./mutation-types";
import { baseUrl } from "../../../composables/baseURL";

export default {
    setEducationalLevel({ commit }, educationalLevel) {
        commit(SET_EDUCATION_LEVEL, educationalLevel);
    },
    async getApplicantType() {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/applicantTypes");
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
    async getGovernment({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/OccupationTypes");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getNativeLanguage({ commit }, id) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/NativeLanguages");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getEducationalLevel({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/educationalLevels");
            return resp;
        } catch (error) {
            return error;
        }
    },
};