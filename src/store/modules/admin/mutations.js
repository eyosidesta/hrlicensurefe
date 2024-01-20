import {
    SET_ADMIN,
    ADD_ADMIN_LOADING,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_ERROR,
    SET_APPLICATION_STATUSES,
  } from "./mutation-types";
  export default {
    [SET_ADMIN](state, adminInfo) {
      state.adminInfo = adminInfo;
    },
    [ADD_ADMIN_LOADING](state) {
      state.addAdminLoading = true;
      state.addAdminSuccess = false;
      state.addAdminError = false;
    },
  
    [ADD_ADMIN_SUCCESS](state) {
      state.addAdminLoading = false;
      state.addAdminSuccess = true;
      state.addAdminError = false;
    },
  
    [ADD_ADMIN_ERROR](state) {
      state.addAdminLoading = false;
      state.addAdminSuccess = false;
      state.addAdminError = true;
    },
    [SET_APPLICATION_STATUSES](state, appStatuses) {
      state.appStatuses = appStatuses;
    }
  };