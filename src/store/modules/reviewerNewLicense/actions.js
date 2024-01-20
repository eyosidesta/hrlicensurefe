import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import {
  SET_NEW_LICENSE_UNASSIGNED,
  SET_NEW_LICENSE_UNASSIGNED_SEARCHED,
  SET_NEW_LICENSE_FROM_OTHER_REGION,
  SET_NEW_LICENSE_FROM_OTHER_REGION_SEARCHED,
  SET_NEW_LICENSE_UNFINISHED,
  SET_NEW_LICENSE_UNFINISHED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNFINISHED,
  SET_NEW_LICENSE_OTHERS_UNFINISHED_SEARCHED,
  SET_NEW_LICENSE_ASSIGNED_TO_YOU,
  SET_NEW_LICENSE_ASSIGNED_TO_YOU_SEARCHED,
  SET_NEW_LICENSE_ASSIGNED_TO_OTHERS,
  SET_NEW_LICENSE_ASSIGNED_TO_OTHERS_SEARCHED,
  SET_NEW_LICENSE_APPROVED,
  SET_NEW_LICENSE_APPROVED_SEARCHED,
  SET_NEW_LICENSE_ALL_APPROVED,
  SET_NEW_LICENSE_ALL_APPROVED_SEARCHED,
  SET_NEW_LICENSE_DECLINED,
  SET_NEW_LICENSE_DECLINED_SEARCHED,
  SET_NEW_LICENSE_ALL_DECLINED,
  SET_NEW_LICENSE_ALL_DECLINED_SEARCHED,
  SET_NEW_LICENSE_UNDER_SUPERVISION,
  SET_NEW_LICENSE_UNDER_SUPERVISION_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION_SEARCHED,
  SET_NEW_LICENSE_APPROVED_PAYMENT,
  SET_NEW_LICENSE_APPROVED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT,
  SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_DECLINED_PAYMENT,
  SET_NEW_LICENSE_DECLINED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT,
  SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_ON_REVIEW,
  SET_NEW_LICENSE_ON_REVIEW_SEARCHED,
  SET_NEW_LICENSE_OTHERS_ON_REVIEW,
  SET_NEW_LICENSE_OTHERS_ON_REVIEW_SEARCHED,
  SET_NEW_LICENSE_RE_EVALUATE,
  SET_NEW_LICENSE_RE_EVALUATE_SEARCHED,
  SET_NEW_LICENSE_OTHERS_RE_EVALUATE,
  SET_NEW_LICENSE_OTHERS_RE_EVALUATE_SEARCHED,
  SET_NEW_LICENSE_CONFIRMED,
  SET_NEW_LICENSE_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_RETURNED_TO_ME,
  SET_NEW_LICENSE_RETURNED_TO_ME_SEARCHED,
  SET_NEW_LICENSE_RETURNED_TO_OTHERS,
  SET_NEW_LICENSE_RETURNED_TO_OTHERS_SEARCHED,
  SET_NEW_LICENSE_PENDING_PAYMENT,
  SET_NEW_LICENSE_PENDING_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT,
  SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT_SEARCHED,
  SET_NEW_LICENSE_LICENSED,
  SET_NEW_LICENSE_LICENSED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_LICENSED,
  SET_NEW_LICENSE_OTHERS_LICENSED_SEARCHED,
  SET_NEW_LICENSE_ALL_LICENSED,
  SET_NEW_LICENSE_ALL_LICENSED_SEARCHED,
  SET_NEW_LICENSE_RE_APPLY,
  SET_NEW_LICENSE_RE_APPLY_SEARCHED,
  SET_NEW_LICENSE_OTHERS_RE_APPLY,
  SET_NEW_LICENSE_OTHERS_RE_APPLY_SEARCHED,
  SET_NEW_LICENSE_DECLINE_CONFIRMED,
  SET_NEW_LICENSE_DECLINE_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED,
  SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED,
  SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
  SET_NEW_LICENSE_FOR_SPECIFIC_USER,
  SET_NEW_LICENSE_FOR_SPECIFIC_USER_SEARCHED,
  NEW_LICENSE_REPORT,
  SET_NEW_LICENSE_SUSPENDED,
  SET_NEW_LICENSE_SUSPENDED_SEARCHED,
  SET_NEW_LICENSE_CANCELLED,
  SET_NEW_LICENSE_CANCELLED_SEARCHED,
  SET_NEW_LICENSE_ALL_Suspended,
  SET_NEW_LICENSE_ALL_Suspended_SEARCHED,
  SET_NEW_LICENSE_ALL_Cancelled,
  SET_NEW_LICENSE_ALL_Cancelled_SEARCHED,
} from "./mutation-types";

export default {
  async getNewLicenseReport({ commit }) {
    try {
      const approved = await ApiService.get(baseUrl + "/newLicenses/status/5");
      const declined = await ApiService.get(baseUrl + "/newLicenses/status/6");
      const review = await ApiService.get(baseUrl + "/newLicenses/status/7");
      return [approved, declined, review];
    } catch (err) {
      return err;
    }
  },
  async getNewLicenseUnassigned({ commit }, statusId) {
    const url = baseUrl + "/newLicenses/status/" + statusId;
    const resp = await ApiService.get(url);
    const unassignedApplications = resp.data.data.filter((unassigned) => {
      return unassigned.transferFrom === null;
    });
    commit(SET_NEW_LICENSE_UNASSIGNED, unassignedApplications);
  },
  getNewLicenseUnassignedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseUnassigned === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseUnassigned.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_UNASSIGNED_SEARCHED, searchedVal);
  },

  async getNewLicenseFromOtherRegion({ commit }, statusId) {
    const url = baseUrl + "/newLicenses/status/" + statusId;
    const resp = await ApiService.get(url);
    const transferdApplications = resp.data.data.filter((unassigned) => {
      return unassigned.transferFrom !== null;
    });
    commit(SET_NEW_LICENSE_FROM_OTHER_REGION, transferdApplications);
  },
  getNewLicenseFromOtherRegionSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseFromOtherRegion === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseFromOtherRegion.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_FROM_OTHER_REGION_SEARCHED, searchedVal);
  },

  async getNewLicenseUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const myUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_UNFINISHED, myUnfinished);
  },

  getNewLicenseUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseUnfinished.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_UNFINISHED_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_UNFINISHED, othresUnfinished);
  },
  getNewLicenseOthersUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersUnfinished.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_UNFINISHED_SEARCHED, searchedVal);
  },

  async getNewLicenseAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const assignedToMe = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_ASSIGNED_TO_YOU, assignedToMe);
  },

  getNewLicenseAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAssignedToYou === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAssignedToYou.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ASSIGNED_TO_YOU_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_ASSIGNED_TO_OTHERS, othresUnfinished);
  },
  getNewLicenseOthersAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAssignedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAssignedToOthers.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ASSIGNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getNewLicenseApproved({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const Approved = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_APPROVED, Approved);
  },

  getNewLicenseApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseApproved === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseApproved.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_APPROVED_SEARCHED, searchedVal);
  },

  async getNewLicenseAllApproved({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    // let allApproved = resp.data.data
    const othersApproved = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    // if(allApproved === undefined) {
    //   allApproved = [];
    // }
    commit(SET_NEW_LICENSE_ALL_APPROVED, othersApproved);
  },
  getNewLicenseAllApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAllApproved === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAllApproved.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ALL_APPROVED_SEARCHED, searchedVal);
  },

  async getNewLicenseDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const declined = [];
      commit(SET_NEW_LICENSE_DECLINED, declined);
      return;
    }
    const declined = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_DECLINED, declined);
  },

  getNewLicenseDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseDeclined.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_DECLINED_SEARCHED, searchedVal);
  },

  async getNewLicenseAllDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersDeclined = [];
      commit(SET_NEW_LICENSE_ALL_DECLINED, othersDeclined);
      return;
    }
    const othersDeclined = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_ALL_DECLINED, othersDeclined);
  },
  getNewLicenseAllDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAllDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAllDeclined.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ALL_DECLINED_SEARCHED, searchedVal);
  },

  async getNewLicenseUnderSuperVision({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const underSuperVision = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_UNDER_SUPERVISION, underSuperVision);
  },

  getNewLicenseUnderSuperVisionSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseUnderSuperVision === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseUnderSuperVision.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_UNDER_SUPERVISION_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersUnderSuperVision({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersUnderSuperVision = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION, othersUnderSuperVision);
  },
  getNewLicenseOthersUnderSuperVisionSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersUnderSuperVision === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersUnderSuperVision.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_UNDER_SUPERVISION_SEARCHED, searchedVal);
  },

  async getNewLicenseApprovedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const approvedPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_APPROVED_PAYMENT, approvedPayment);
  },

  getNewLicenseApprovedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseApprovedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseApprovedPayment.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_APPROVED_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersApprovedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersApprovedPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT, othersApprovedPayments);
  },
  getNewLicenseOthersApprovedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersApprovedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersApprovedPayment.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_APPROVED_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const declinedPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_DECLINED_PAYMENT, declinedPayment);
  },

  getNewLicenseDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseDeclinedPayment.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersDeclinedPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT, othersDeclinedPayments);
  },
  getNewLicenseOthersDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersDeclinedPayment.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseOnReview({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const onReview = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_ON_REVIEW, onReview);
  },

  getNewLicenseOnReviewSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOnReview === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOnReview.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ON_REVIEW_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersOnReview({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersOnReview = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_ON_REVIEW, othersOnReview);
  },
  getNewLicenseOthersOnReviewSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersOnReview === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersOnReview.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_ON_REVIEW_SEARCHED, searchedVal);
  },

  async getNewLicenseReEvaluate({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    let evaluator = [];
    const allApplications = resp.data.data.forEach(function(e) {
      const myApplications = e.evaluators.forEach(function(ee) {
        if (ee.evaluatorId === adminStatus[1] && ee.actionEvent === null) {
          evaluator.push(e);
        }
      });
    });
    commit(SET_NEW_LICENSE_RE_EVALUATE, evaluator);
  },

  getNewLicenseReEvaluateSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseReEvaluate === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseReEvaluate.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_RE_EVALUATE_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersReEvaluate({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    // const othersReEvaluate = resp.data.data.filter(function(e) {
    //   return e.reviewerId !== adminId
    // })
    let otherEvaluators = resp.data.data;
    // const allApplications = resp.data.data.forEach(function (e) {
    //   const othersApplications = e.evaluators.forEach(function (ee) {
    //     if(ee.evaluatorId !== adminStatus[1]) {
    //       otherEvaluators.push(e);
    //     }
    //   })

    // })
    commit(SET_NEW_LICENSE_OTHERS_RE_EVALUATE, otherEvaluators);
  },
  getNewLicenseOthersReEvaluateSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersReEvaluate === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersReEvaluate.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_RE_EVALUATE_SEARCHED, searchedVal);
  },

  async getNewLicenseConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId === adminStatus[1] &&
        e.previousApplicationStatus.code === "APP"
      );
    });
    commit(SET_NEW_LICENSE_CONFIRMED, confirmed);
  },

  getNewLicenseConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseConfirmed.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_CONFIRMED_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId !== adminStatus[1] &&
        e.previousApplicationStatus.code === "APP"
      );
    });
    commit(SET_NEW_LICENSE_OTHERS_CONFIRMED, confirmed);
  },
  getNewLicenseOthersConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersConfirmed.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_CONFIRMED_SEARCHED, searchedVal);
  },

  async getNewLicenseReturnedToMe({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_RETURNED_TO_ME, confirmed);
  },

  getNewLicenseReturnedToMeSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseReturnedToMe === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseReturnedToMe.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_RETURNED_TO_ME_SEARCHED, searchedVal);
  },

  async getNewLicenseReturnedToOthers({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_RETURNED_TO_OTHERS, confirmed);
  },

  getNewLicenseReturnedToOthersSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseReturnedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseReturnedToOthers.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_RETURNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getNewLicensePendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const pendingPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_NEW_LICENSE_PENDING_PAYMENT, pendingPayment);
  },

  getNewLicensePendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicensePendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicensePendingPayment.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersPendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const AllPendingPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT, AllPendingPayments);
  },

  getNewLicenseOthersPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersPendingPayment.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getNewLicenseLicensed({ commit }, adminStatus) {
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;
    const url = baseUrl + "/newlicenses/status/" + adminStatus[1];
    const confirmedUrl = baseUrl + "/newlicenses/status/" + adminStatus[2];
    const resp = await ApiService.get(url);
    const confirmedResp = await ApiService.get(confirmedUrl);
    const licensed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    const confirmedLicensed = confirmedResp.data.data.filter(function(e) {
      return (
        e.reviewerId === adminStatus[0] &&
        e.previousApplicationStatus.code === "APP"
      );
    });
    const concateLicensedUsers = licensed.concat(confirmedLicensed);
    if (expertLevelId === 3) {
      const ApprovedUrl = baseUrl + "/newlicenses/status/" + adminStatus[3];
      const ApprovedResp = await ApiService.get(ApprovedUrl);
      const ApprovedLicensed = ApprovedResp.data.data.filter(function(e) {
        return e.reviewerId === adminStatus[0];
      });
      const concateForFederalApproved = concateLicensedUsers.concat(
        ApprovedLicensed
      );
      commit(SET_NEW_LICENSE_LICENSED, concateForFederalApproved);
      return;
    }
    commit(SET_NEW_LICENSE_LICENSED, concateLicensedUsers);
  },

  getNewLicenseLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseLicensed.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_LICENSED_SEARCHED, searchedVal);
  },

  async getNewLicenseOtherLicensed({ commit }, adminStatus) {
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;
    const url = baseUrl + "/newLicenses/status/" + adminStatus[1];
    const confirmedUrl = baseUrl + "/newLicenses/status/" + adminStatus[2];
    const resp = await ApiService.get(url);
    const confirmedResp = await ApiService.get(confirmedUrl);
    const othersLicensed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    });
    const othersConfirmedLicensed = confirmedResp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    });
    const othersConcateLicensedUsers = othersLicensed.concat(
      othersConfirmedLicensed
    );
    if (expertLevelId === 3) {
      const ApprovedUrl = baseUrl + "/newLicenses/status/" + adminStatus[3];
      const ApprovedResp = await ApiService.get(ApprovedUrl);
      const ApprovedLicensed = ApprovedResp.data.data.filter(function(e) {
        return e.reviewerId !== adminStatus[0];
      });
      const concateForFederalApproved = othersConcateLicensedUsers.concat(
        ApprovedLicensed
      );
      commit(SET_NEW_LICENSE_OTHERS_LICENSED, concateForFederalApproved);
      return;
    }
    commit(SET_NEW_LICENSE_OTHERS_LICENSED, othersConcateLicensedUsers);
  },

  getNewLicenseOthersLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersLicensed.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_LICENSED_SEARCHED, searchedVal);
  },

  async getNewLicenseAllLicensed({ commit }) {
    const url = baseUrl + "/newLicenses/all/licensed";
    const resp = await ApiService.get(url);
    const newLicenseAllLicensed = resp.data.data;
    commit(SET_NEW_LICENSE_ALL_LICENSED, newLicenseAllLicensed);
  },

  getNewLicenseAllLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAllLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAllLicensed.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ALL_LICENSED_SEARCHED, searchedVal);
  },

  async getNewLicenseSuspended({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[1];
    const resp = await ApiService.get(url);
    const suspended = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    commit(SET_NEW_LICENSE_SUSPENDED, suspended);
  },

  getNewLicenseSuspendedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseSuspended === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseSuspended.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_SUSPENDED_SEARCHED, searchedVal);
  },

  async getNewLicenseAllSuspended({ commit }, status) {
    const url = baseUrl + "/newLicenses/status/" + status;
    const resp = await ApiService.get(url);
    const newLicenseAllSuspended = resp.data.data;
    commit(SET_NEW_LICENSE_ALL_Suspended, newLicenseAllSuspended);
  },

  getNewLicenseAllSuspendedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAllSuspended === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAllSuspended.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ALL_Suspended_SEARCHED, searchedVal);
  },

  async getNewLicenseCancelled({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[1];
    const resp = await ApiService.get(url);
    const cancelled = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    commit(SET_NEW_LICENSE_CANCELLED, cancelled);
  },

  getNewLicenseCancelledSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseCancelled === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseCancelled.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_CANCELLED_SEARCHED, searchedVal);
  },

  async getNewLicenseAllCancelled({ commit }, status) {
    const url = baseUrl + "/newLicenses/status/" + status;
    const resp = await ApiService.get(url);
    const newLicenseAllCancelled = resp.data.data;
    commit(SET_NEW_LICENSE_ALL_Cancelled, newLicenseAllCancelled);
  },

  getNewLicenseAllCancelledSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseAllCancelled === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseAllCancelled.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_ALL_Cancelled_SEARCHED, searchedVal);
  },

  async getNewLicenseReApply({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const reApply = resp.data.data;
    commit(SET_NEW_LICENSE_RE_APPLY, reApply);
  },

  getNewLicenseReApplySearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseReApply === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseReApply.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_RE_APPLY_SEARCHED, searchedVal);
  },

  async getNewLicenseOtherReApply({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersReApply = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_NEW_LICENSE_OTHERS_RE_APPLY, othersReApply);
  },

  getNewLicenseOthersReApplySearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersReApply === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersReApply.filter(function(e) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_RE_APPLY_SEARCHED, searchedVal);
  },

  async getNewLicenseDeclineConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const declineConfirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId === adminStatus[1] &&
        e.previousApplicationStatus.code === "DEC"
      );
    });
    commit(SET_NEW_LICENSE_DECLINE_CONFIRMED, declineConfirmed);
  },

  getNewLicenseDeclineConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseDeclineConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseDeclineConfirmed.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_DECLINE_CONFIRMED_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersDeclineConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersDeclineConfirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId !== adminStatus[1] &&
        e.previousApplicationStatus.code === "DEC"
      );
    });
    commit(SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED, othersDeclineConfirmed);
  },

  getNewLicenseOthersDeclineConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseOthersDeclineConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersDeclineConfirmed.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_OTHERS_DECLINE_CONFIRMED_SEARCHED, searchedVal);
  },

  async getNewLicenseUnderSuperVisionConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newlicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const underSuperVisionConfirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId === adminStatus[1] &&
        e.previousApplicationStatus.code === "USUP"
      );
    });
    commit(
      SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED,
      underSuperVisionConfirmed
    );
  },

  getNewLicenseUnderSuperVisionConfirmedSearched(
    { commit, getters },
    searchKey
  ) {
    if (getters.getNewLicenseUnderSuperVisionConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseUnderSuperVisionConfirmed.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
              (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              e.applicant.profile.name
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              e.applicant.profile.fatherName
                .toLowerCase()
                .includes(searchKey.toLowerCase());
      }
    );
    commit(SET_NEW_LICENSE_UNDER_SUPER_VISION_CONFIRMED_SEARCHED, searchedVal);
  },

  async getNewLicenseOthersUnderSuperVisionConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/newLicenses/status/" + adminStatus[0];
    const resp = await ApiService.get(url);
    const othersUnderSuperVisionConfirmed = resp.data.data.filter(function(e) {
      return (
        e.reviewerId !== adminStatus[1] &&
        e.previousApplicationStatus.code === "USUP"
      );
    });
    commit(
      SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED,
      othersUnderSuperVisionConfirmed
    );
  },

  getNewLicenseOthersUnderSuperVisionConfirmedSearched(
    { commit, getters },
    searchKey
  ) {
    if (getters.getNewLicenseOthersUnderSuperVisionConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseOthersUnderSuperVisionConfirmed.filter(
      function(e) {
        return e.newLicenseCode === undefined
          ? ""
          : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(
      SET_NEW_LICENSE_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
      searchedVal
    );
  },

  async getNewLicenseForSpecificUser({ commit }, userStatus) {
    const url = baseUrl + "/newLicenses/user/" + userStatus[0];
    const resp = await ApiService.get(url);
    const getUsersNewLicense = resp.data.data.filter(function(e) {
      return e.professionalTypes.code === userStatus[1];
    });
    commit(SET_NEW_LICENSE_FOR_SPECIFIC_USER, getUsersNewLicense[0]);
  },

  getNewLicenseForSpecificUserSearched({ commit, getters }, searchKey) {
    if (getters.getNewLicenseForSpecificUser === undefined) {
      return;
    }
    const searchedVal = getters.getNewLicenseForSpecificUser.filter(function(
      e
    ) {
      return e.newLicenseCode === undefined
        ? ""
        : e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_NEW_LICENSE_FOR_SPECIFIC_USER_SEARCHED, searchedVal);
  },
};
