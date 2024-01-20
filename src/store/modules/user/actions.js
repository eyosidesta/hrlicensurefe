import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import { SET_PROFILE } from "./mutation-types";

export default {
    async login({ commit }, profile) {
        try {
            const resp = await ApiService.post(baseUrl + "/login", profile, {});
            window.localStorage.setItem("token", resp.data["token"]);
            window.localStorage.setItem("userId", resp.data.data["id"]);
            commit(SET_PROFILE, resp.data);
            return resp;
        } catch (error) {}
    },

    async signUp({ commit }, profile) {
        try {
            const resp = await ApiService.post(baseUrl + "/users/add", profile, {});
            return resp;
        } catch (error) {
            return error;
        }
    },
};