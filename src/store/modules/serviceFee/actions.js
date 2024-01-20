import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import { SET_ITEM_ID, SET_APPLICATION_TYPE } from "./mutation-types";

const userId = +localStorage.getItem("userId");

export default {
    setItemID({ commit }, id) {
        commit(SET_ITEM_ID, id);
    },
    setApplicationType({ commit }, applicationType) {
        commit(SET_APPLICATION_TYPE, applicationType);
    },
    async getApplicationStatuses() {
        try {
            const resp = await ApiService.get(baseUrl + "/applicationStatuses");
            return resp;
        } catch (error) {
            return error;
        }
    },
    async addLicense({ commit }, license) {
        if (license.appType == "newlicense") {
            try {
                const resp = await ApiService.put(
                    baseUrl + "/newLicenses/" + license.id,
                    license.save
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else if (license.appType == "renewal") {
            try {
                const resp = await ApiService.put(
                    baseUrl + "/renewals/" + license.id,
                    license.save
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else if (license.appType == "verification") {
            try {
                const resp = await ApiService.put(
                    baseUrl + "/verifications/" + license.id,
                    license.save
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else {
            try {
                const resp = await ApiService.put(
                    baseUrl + "/goodStandings/" + license.id,
                    license.save
                );
                return resp;
            } catch (error) {
                return error;
            }
        }
    },
    async uploadDocuments({ commit }, license) {
        if (license.appT == "newlicense") {
            try {
                const resp = await ApiService.post(
                    baseUrl + "/documentUploads/licenseDocument/" + license.id,
                    license.document, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else if (license.appT == "renewal") {
            try {
                const resp = await ApiService.post(
                    baseUrl + "/documentUploads/renewalDocument/" + license.id,
                    license.document, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else if (license.appT == "verification") {
            try {
                const resp = await ApiService.post(
                    baseUrl + "/documentUploads/verificationDocument/" + license.id,
                    license.document, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return resp;
            } catch (error) {
                return error;
            }
        } else {
            try {
                const resp = await ApiService.post(
                    baseUrl + "/documentUploads/goodStandingDocument/" + license.id,
                    license.document, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return resp;
            } catch (error) {
                return error;
            }
        }
    },
};