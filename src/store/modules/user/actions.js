import ApiService from "../../../services/api.service";
import { SET_PROFILE } from "./mutation-types";
const url = "https://hrlicensurebe.dev.k8s.sandboxaddis.com/api/";
export default {
  async login({ commit }, profile) {
    try {
      const resp = await ApiService.post(url + "login", profile, {});
      window.localStorage.setItem("token", resp.data["token"]);
      window.localStorage.setItem("userId", resp.data.data["id"]);
      commit(SET_PROFILE, resp.data);
      commit(ADD_PROFILE_SUCCESS);
      return resp;
    } catch (error) {}
  },

  async signUp({ commit }, profile) {
    try {
      const resp = await ApiService.post(url + "users/add", profile, {});
      return resp;
    } catch (error) {
      return error;
    }
  },
};
