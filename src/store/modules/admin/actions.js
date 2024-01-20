import ApiService from "../../../services/api.service";
import {
  SET_ADMIN,
  ADD_ADMIN_LOADING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  SET_APPLICATION_STATUSES,
} from "./mutation-types";
const url = "https://hrlicensurebe.dev.k8s.sandboxaddis.com/api/";
export default {
  async login({ commit }, admin) {
    commit(ADD_ADMIN_LOADING);
    try {
      const resp = await ApiService.post(url + "admins/login", admin, {});
      window.localStorage.setItem("token", resp.data["token"]);
      window.localStorage.setItem("adminId", resp.data.data["id"]);
      window.localStorage.setItem("role", resp.data.data["role"]["code"]);
      window.localStorage.setItem("adminEmail", resp.data.data["email"]);
      window.localStorage.setItem("allAdminData", JSON.stringify(resp.data.data))
      commit(SET_ADMIN, resp.data.data);
      commit(ADD_ADMIN_SUCCESS);
      return resp;
    } catch (error) {
      commit(ADD_ADMIN_ERROR);
    }
  },

  logout({commit}) {
    commit(SET_ADMIN, undefined);
  },
  async getApplicationStatus({commit}) {
    try {
      const AppStatuses = await ApiService.get(url+"applicationStatuses");
      commit(SET_APPLICATION_STATUSES, AppStatuses.data.data)
    } catch(error) {
    }
  },
  async getRole({ commit }) {
    // commit(ADD_ADMIN_LOADING);
    try {
      const resp = await ApiService.get(url + "roles");
      return resp;
    } catch (error) {
      const resp = error;
      return resp;
    }
  },
  async registerAdmin({ commit }, admin) {
    commit(ADD_ADMIN_LOADING);
    try {
      const resp = await ApiService.post(url + "admins/register", admin, {});
      commit(ADD_ADMIN_SUCCESS);
      return resp;
    } catch (error) {
      commit(ADD_ADMIN_ERROR);
      return error;
    }
  },
  async getExpertLevels() {
    try {
      const resp = await ApiService.get(url + "lookups/expertLevels");
      return resp;
    } catch (error) {
      const resp = error;
      return resp;
    }
  },
  async getRegions() {
    try {
      const resp = await ApiService.get(url + "lookups/regions");
      return resp;
    } catch (error) {
      const resp = error;
      return resp;
    }
  },
  async changePassword({ commit }, newPassword) {
    try {
      const resp = await ApiService.post(url+"admins/changePassword", newPassword)
      return resp;
    } catch(error) {
      return error;
    }
  }
};
