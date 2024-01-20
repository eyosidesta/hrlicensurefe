import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import { SET_REPORT } from "./mutation-types";

export default {
    setReport({ commit }, report) {
        commit(SET_REPORT, report);
    },
    async getReport({ commit }, AppId, RId, date) {
        try {
            const approved = await ApiService.get(baseUrl + "/renewals/add");
            const declined = await ApiService.get(baseUrl + "/renewals/add");
            const underReview = await ApiService.get(baseUrl + "/renewals/add");

            return [approved, declined, underReview];
        } catch (error) {
            return error;
        }
    },
    async getNewLicenseReport({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/newLicenseReport");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getRenewalReport({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/renewalReport");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getVerificationReport({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/verificationReport");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getGoodstandingReport({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/goodstandingReport");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async getRegions({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/regions");
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getZones({ commit }, regionID) {
        try {
            const baseUrl = baseUrl + "/lookups/zones/" + regionID;
            const resp = await ApiService.get(baseUrl);
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getWoredas({ commit }, zoneID) {
        try {
            const baseUrl = baseUrl + "/lookups/woredas/" + zoneID;
            const resp = await ApiService.get(baseUrl);
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getapplicationStatuses({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/applicationStatuses");
            return resp;
        } catch (error) {
            const resp = error;
            return resp;
        }
    },
    async getProfessionalTypes({ commit }) {
        try {
            const resp = await ApiService.get(baseUrl + "/lookups/professionalTypes");
            return resp;
        } catch (error) {
            return error;
        }
    },
};