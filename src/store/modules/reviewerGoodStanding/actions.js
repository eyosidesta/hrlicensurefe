import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import {
  SET_GOOD_STANDING_UNASSIGNED,
  SET_GOOD_STANDING_UNASSIGNED_SEARCHED,
  SET_GOOD_STANDING_UNFINISHED,
  SET_GOOD_STANDING_UNFINISHED_SEARCHED,
  SET_GOOD_STANDING_OTHERS_UNFINISHED,
  SET_GOOD_STANDING_OTHERS_UNFINISHED_SEARCHED,
  SET_GOOD_STANDING_ASSIGNED_TO_YOU,
  SET_GOOD_STANDING_ASSIGNED_TO_YOU_SEARCHED,
  SET_GOOD_STANDING_ASSIGNED_TO_OTHERS,
  SET_GOOD_STANDING_ASSIGNED_TO_OTHERS_SEARCHED,
  SET_GOOD_STANDING_APPROVED,
  SET_GOOD_STANDING_APPROVED_SEARCHED,
  SET_GOOD_STANDING_ALL_APPROVED,
  SET_GOOD_STANDING_ALL_APPROVED_SEARCHED,
  SET_GOOD_STANDING_DECLINED,
  SET_GOOD_STANDING_DECLINED_SEARCHED,
  SET_GOOD_STANDING_ALL_DECLINED,
  SET_GOOD_STANDING_ALL_DECLINED_SEARCHED,
  SET_GOOD_STANDING_PENDING_PAYMENT,
  SET_GOOD_STANDING_PENDING_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT,
  SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_DECLINED_PAYMENT,
  SET_GOOD_STANDING_DECLINED_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT,
  SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT_SEARCHED,
  SET_GOOD_STANDING_LICENSED,
  SET_GOOD_STANDING_LICENSED_SEARCHED,
  SET_GOOD_STANDING_OTHERS_LICENSED,
  SET_GOOD_STANDING_OTHERS_LICENSED_SEARCHED,
  SET_GOOD_STANDING_ALL_LICENSED,
  SET_GOOD_STANDING_ALL_LICENSED_SEARCHED,
  SET_GOOD_STANDING_RE_APPLY,
  SET_GOOD_STANDING_RE_APPLY_SEARCHED,
  SET_GOOD_STANDING_OTHERS_RE_APPLY,
  SET_GOOD_STANDING_OTHERS_RE_APPLY_SEARCHED,
} from "./mutation-types";

export default {
  async getUnassignedGoodStanding({ commit }, statusId) {
    try {
      const url = baseUrl + "/goodStandings/status/" + statusId;
      const resp = await ApiService.get(url);
      commit(SET_GOOD_STANDING_UNASSIGNED, resp.data.data);
    } catch (err) {
      return error;
    }
  },
  async getGoodstandingReport({ commit }) {
    try {
      const approved = await ApiService.get(
        baseUrl + "/goodStandings/status/5"
      );
      const declined = await ApiService.get(
        baseUrl + "/goodStandings/status/6"
      );
      const review = await ApiService.get(baseUrl + "/goodStandings/status/7");

      return [approved, declined, review];
    } catch (err) {
      return err;
    }
  },

  getUnassignedGoodStandingSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingUnassigned === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingUnassigned.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_UNASSIGNED_SEARCHED, searchedVal);
  },

  async getGoodStandingUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const myUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_UNFINISHED, myUnfinished);
  },

  getGoodStandingUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingUnfinished.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_UNFINISHED_SEARCHED, searchedVal);
  },

  async getGoodStandingOthersUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_OTHERS_UNFINISHED, othresUnfinished);
  },
  getGoodStandingOthersUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingOthersUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingOthersUnfinished.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_OTHERS_UNFINISHED_SEARCHED, searchedVal);
  },

  async getGoodStandingAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const assignedToMe = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_ASSIGNED_TO_YOU, assignedToMe);
  },

  getGoodStandingAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingAssignedToYou === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingAssignedToYou.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_ASSIGNED_TO_YOU_SEARCHED, searchedVal);
  },

  async getGoodStandingOthersAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_ASSIGNED_TO_OTHERS, othresUnfinished);
  },
  getGoodStandingOthersAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingAssignedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingAssignedToOthers.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_ASSIGNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getGoodStandingApproved({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const myApproved = [];
      commit(SET_GOOD_STANDING_APPROVED, myApproved);
      return;
    }
    const myApproved = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_APPROVED, myApproved);
  },

  getGoodStandingApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingApproved === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingApproved.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_APPROVED_SEARCHED, searchedVal);
  },

  async getGoodStandingAllApproved({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersApproved = [];
      commit(SET_GOOD_STANDING_ALL_APPROVED, othersApproved);
      return;
    }
    const othersApproved = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_ALL_APPROVED, othersApproved);
  },
  getGoodStandingAllApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingAllApproved === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingAllApproved.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_ALL_APPROVED_SEARCHED, searchedVal);
  },

  async getGoodStandingDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const declined = [];
      commit(SET_GOOD_STANDING_DECLINED, declined);
      return;
    }
    const declined = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_DECLINED, declined);
  },

  getGoodStandingDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingDeclined.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_DECLINED_SEARCHED, searchedVal);
  },

  async getGoodStandingAllDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersDeclined = [];
      commit(SET_GOOD_STANDING_ALL_DECLINED, othersDeclined);
      return;
    }
    const othersDeclined = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_ALL_DECLINED, othersDeclined);
  },
  getGoodStandingAllDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingAllDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingAllDeclined.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_ALL_DECLINED_SEARCHED, searchedVal);
  },

  async getGoodStandingPendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const pendingPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_PENDING_PAYMENT, pendingPayment);
  },

  getGoodStandingPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingPendingPayment.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getGoodStandingOthersPendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const AllPendingPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT, AllPendingPayments);
  },

  getGoodStandingOthersPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingOthersPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingOthersPendingPayment.filter(
      function(e) {
        return e.goodStandingCode === undefined
          ? ""
          : e.goodStandingCode
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
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
      }
    );
    commit(SET_GOOD_STANDING_OTHERS_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getGoodStandingDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const declinedPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_GOOD_STANDING_DECLINED_PAYMENT, declinedPayment);
  },

  getGoodStandingDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingDeclinedPayment.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getGoodStandingOthersDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersDeclinedPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT, othersDeclinedPayments);
  },
  getGoodStandingOthersDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingOthersDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingOthersDeclinedPayment.filter(
      function(e) {
        return e.goodStandingCode === undefined
          ? ""
          : e.goodStandingCode
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
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
      }
    );
    commit(SET_GOOD_STANDING_OTHERS_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getGoodStandingLicensed({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[1];
    const approvedURL = baseUrl + "/goodstandings/status/" + adminStatus[2];
    const resp = await ApiService.get(url);
    const approvedResp = await ApiService.get(approvedURL);
    const licensed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    const approvedLicensed = approvedResp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    const concateLicensedUsers = licensed.concat(approvedLicensed)
    commit(SET_GOOD_STANDING_LICENSED, concateLicensedUsers);
  },

  getGoodStandingLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingLicensed.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_LICENSED_SEARCHED, searchedVal);
  },

  async getGoodStandingOtherLicensed({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[1];
    const approvedURL = baseUrl + "/goodstandings/status/" + adminStatus[2];
    const resp = await ApiService.get(url);
    const approvedResp = await ApiService.get(approvedURL);
    const othersLicensed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    });
    const othersApprovedLicensed = approvedResp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    });
    const othersConcateLicensedUsers = othersLicensed.concat(othersApprovedLicensed)
    commit(SET_GOOD_STANDING_OTHERS_LICENSED, othersConcateLicensedUsers);
  },

  getGoodStandingOthersLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingOthersLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingOthersLicensed.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_OTHERS_LICENSED_SEARCHED, searchedVal);
  },

  async getGoodStandingAllLicensed({ commit }) {
    const url = baseUrl + "/goodStandings/all/licensed";
    const resp = await ApiService.get(url);
    const goodStandingAllLicensed = resp.data.data;
    commit(SET_GOOD_STANDING_ALL_LICENSED, goodStandingAllLicensed);
  },

  getGoodStandingAllLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingAllLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingAllLicensed.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_ALL_LICENSED_SEARCHED, searchedVal);
  },

  async getGoodStandingReApply({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const reApply = resp.data.data;
    commit(SET_GOOD_STANDING_RE_APPLY, reApply);
  },

  getGoodStandingReApplySearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingReApply === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingReApply.filter(function(e) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_RE_APPLY_SEARCHED, searchedVal);
  },

  async getGoodStandingOtherReApply({ commit }, adminStatus) {
    const url = baseUrl + "/goodstandings/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersReApply = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_GOOD_STANDING_OTHERS_RE_APPLY, othersReApply);
  },

  getGoodStandingOthersReApplySearched({ commit, getters }, searchKey) {
    if (getters.getGoodStandingOthersReApply === undefined) {
      return;
    }
    const searchedVal = getters.getGoodStandingOthersReApply.filter(function(
      e
    ) {
      return e.goodStandingCode === undefined
        ? ""
        : e.goodStandingCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_GOOD_STANDING_OTHERS_RE_APPLY_SEARCHED, searchedVal);
  },
};
