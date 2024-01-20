import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import {
  SET_VERIFICATION_UNASSIGNED,
  SET_VERIFICATION_UNASSIGNED_SEARCHED,

  SET_VERIFICATION_UNFINISHED,
  SET_VERIFICATION_UNFINISHED_SEARCHED,
  SET_VERIFICATION_OTHERS_UNFINISHED,
  SET_VERIFICATION_OTHERS_UNFINISHED_SEARCHED,

  SET_VERIFICATION_ASSIGNED_TO_YOU,
  SET_VERIFICATION_ASSIGNED_TO_YOU_SEARCHED,
  SET_VERIFICATION_ASSIGNED_TO_OTHERS,
  SET_VERIFICATION_ASSIGNED_TO_OTHERS_SEARCHED,

  SET_VERIFICATION_APPROVED,
  SET_VERIFICATION_APPROVED_SEARCHED,
  SET_VERIFICATION_ALL_APPROVED,
  SET_VERIFICATION_ALL_APPROVED_SEARCHED,

  SET_VERIFICATION_DECLINED,
  SET_VERIFICATION_DECLINED_SEARCHED,
  SET_VERIFICATION_ALL_DECLINED,
  SET_VERIFICATION_ALL_DECLINED_SEARCHED,

  SET_VERIFICATION_RE_APPLY,
  SET_VERIFICATION_RE_APPLY_SEARCHED,
  SET_VERIFICATION_OTHERS_RE_APPLY,
  SET_VERIFICATION_OTHERS_RE_APPLY_SEARCHED,
} from "./mutation-types";

export default {
  async getUnassignedVerification({ commit }, statusId) {
    try {
      const url = baseUrl + "/verifications/status/"+statusId;
      const resp = await ApiService.get(url);
      commit(SET_VERIFICATION_UNASSIGNED, resp.data.data);
    } catch (err) {
      return error;
    }
  },
  async getVerificationReport({ commit }) {
    try {
      const approved = await ApiService.get(
        baseUrl + "/verifications/status/5"
      );
      const declined = await ApiService.get(
        baseUrl + "/verifications/status/6"
      );
      const review = await ApiService.get(baseUrl + "/verifications/status/7");
 return [approved, declined, review];     
    } catch (err) {
      return err;
    }
  },
  getUnassignedVerificationSearched({ commit, getters }, searchKey) {
    const searchedVal = getters.getVerificationUnassigned.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_UNASSIGNED_SEARCHED, searchedVal);
  },

  async getVerificationUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const myUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_VERIFICATION_UNFINISHED, myUnfinished);
  },

  getVerificationUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationUnfinished.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_UNFINISHED_SEARCHED, searchedVal);
  },

  async getVerificationOthersUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othresUnfinished = [];
      commit(SET_VERIFICATION_OTHERS_UNFINISHED, othresUnfinished);
      return;
    }
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_VERIFICATION_OTHERS_UNFINISHED, othresUnfinished);
  },
  getVerificationOthersUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationOthersUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationOthersUnfinished.filter(function(
      e
    ) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.reviewer.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_OTHERS_UNFINISHED_SEARCHED, searchedVal);
  },

  async getVerificationAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const assignedToMe = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_VERIFICATION_ASSIGNED_TO_YOU, assignedToMe);
  },

  getVerificationAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationAssignedToYou === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationAssignedToYou.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_ASSIGNED_TO_YOU_SEARCHED, searchedVal);
  },

  async getVerificationOthersAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersAssigned = [];
      commit(SET_VERIFICATION_ASSIGNED_TO_OTHERS, othersAssigned);
      return;
    }
    const othersAssigned = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_VERIFICATION_ASSIGNED_TO_OTHERS, othersAssigned);
  },
  getVerificationOthersAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationAssignedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationAssignedToOthers.filter(function(
      e
    ) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.reviewer.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_ASSIGNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getVerificationApproved({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if(resp.data.data === undefined) {
      const approved = []
      commit(SET_VERIFICATION_APPROVED, approved)
      return;
    }
    const Approved = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_VERIFICATION_APPROVED, Approved);
  },

  getVerificationApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationApproved === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationApproved.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_APPROVED_SEARCHED, searchedVal);
  },

  async getVerificationAllApproved({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if(resp.data.data === undefined) {
      const othersApproved = [];
      commit(SET_VERIFICATION_ALL_APPROVED, othersApproved);
    }
    const othersApproved = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_VERIFICATION_ALL_APPROVED, othersApproved);
  },
  getVerificationAllApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationAllApproved === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationAllApproved.filter(function(
      e
    ) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.reviewer.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_ALL_APPROVED_SEARCHED, searchedVal);
  },

  async getVerificationDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if(resp.data.data === undefined) {
      const declined = []
      commit(SET_VERIFICATION_DECLINED, declined)
      return;
    }
    const declined = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_VERIFICATION_DECLINED, declined);
  },

  getVerificationDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationDeclined.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_DECLINED_SEARCHED, searchedVal);
  },

  async getVerificationAllDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if(resp.data.data === undefined) {
      const othersDeclined = [];
      commit(SET_VERIFICATION_ALL_DECLINED, othersDeclined);
      return;
    }
    const othersDeclined = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_VERIFICATION_ALL_DECLINED, othersDeclined);
  },
  getVerificationAllDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getVerificationAllDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationAllDeclined.filter(function(
      e
    ) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.reviewer.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_ALL_DECLINED_SEARCHED, searchedVal);
  },

  async getVerificationReApply({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const reApply = resp.data.data;
    commit(SET_VERIFICATION_RE_APPLY, reApply);
  },

  getVerificationReApplySearched({ commit, getters }, searchKey) {
    if (getters.getVerificationReApply === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationReApply.filter(function(e) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_RE_APPLY_SEARCHED, searchedVal);
  },

  async getVerificationOtherReApply({ commit }, adminStatus) {
    const url = baseUrl + "/verifications/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersReApply = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_VERIFICATION_OTHERS_RE_APPLY, othersReApply);
  },

  getVerificationOthersReApplySearched({ commit, getters }, searchKey) {
    if (getters.getVerificationOthersReApply === undefined) {
      return;
    }
    const searchedVal = getters.getVerificationOthersReApply.filter(function(
      e
    ) {
      return e.verificationCode === undefined
        ? ""
        : e.verificationCode.toLowerCase().includes(searchKey.toLowerCase()) ||
            (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.applicant.profile.fatherName
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            e.reviewer.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    commit(SET_VERIFICATION_OTHERS_RE_APPLY_SEARCHED, searchedVal);
  },
};
