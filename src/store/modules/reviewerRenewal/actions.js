import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import {
  SET_RENEWAL_UNASSIGNED,
  SET_RENEWAL_UNASSIGNED_SEARCHED,
  SET_RENEWAL_UNFINISHED,
  SET_RENEWAL_UNFINISHED_SEARCHED,
  SET_RENEWAL_OTHERS_UNFINISHED,
  SET_RENEWAL_OTHERS_UNFINISHED_SEARCHED,
  SET_RENEWAL_ASSIGNED_TO_YOU,
  SET_RENEWAL_ASSIGNED_TO_YOU_SEARCHED,
  SET_RENEWAL_ASSIGNED_TO_OTHERS,
  SET_RENEWAL_ASSIGNED_TO_OTHERS_SEARCHED,
  SET_RENEWAL_APPROVED,
  SET_RENEWAL_APPROVED_SEARCHED,
  SET_RENEWAL_ALL_APPROVED,
  SET_RENEWAL_ALL_APPROVED_SEARCHED,
  SET_RENEWAL_DECLINED,
  SET_RENEWAL_DECLINED_SEARCHED,
  SET_RENEWAL_ALL_DECLINED,
  SET_RENEWAL_ALL_DECLINED_SEARCHED,
  SET_RENEWAL_UNDER_SUPERVISION,
  SET_RENEWAL_UNDER_SUPERVISION_SEARCHED,
  SET_RENEWAL_OTHERS_UNDER_SUPERVISION,
  SET_RENEWAL_OTHERS_UNDER_SUPERVISION_SEARCHED,
  SET_RENEWAL_APPROVED_PAYMENT,
  SET_RENEWAL_APPROVED_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_APPROVED_PAYMENT,
  SET_RENEWAL_OTHERS_APPROVED_PAYMENT_SEARCHED,
  SET_RENEWAL_DECLINED_PAYMENT,
  SET_RENEWAL_DECLINED_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_DECLINED_PAYMENT,
  SET_RENEWAL_OTHERS_DECLINED_PAYMENT_SEARCHED,
  SET_RENEWAL_ON_REVIEW,
  SET_RENEWAL_ON_REVIEW_SEARCHED,
  SET_RENEWAL_OTHERS_ON_REVIEW,
  SET_RENEWAL_OTHERS_ON_REVIEW_SEARCHED,
  SET_RENEWAL_RE_EVALUATE,
  SET_RENEWAL_RE_EVALUATE_SEARCHED,
  SET_RENEWAL_OTHERS_RE_EVALUATE,
  SET_RENEWAL_OTHERS_RE_EVALUATE_SEARCHED,
  SET_RENEWAL_CONFIRMED,
  SET_RENEWAL_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_CONFIRMED,
  SET_RENEWAL_OTHERS_CONFIRMED_SEARCHED,

  SET_RENEWAL_RETURNED_TO_ME,
  SET_RENEWAL_RETURNED_TO_ME_SEARCHED,
  SET_RENEWAL_RETURNED_TO_OTHERS,
  SET_RENEWAL_RETURNED_TO_OTHERS_SEARCHED,

  SET_RENEWAL_PENDING_PAYMENT,
  SET_RENEWAL_PENDING_PAYMENT_SEARCHED,
  SET_RENEWAL_OTHERS_PENDING_PAYMENT,
  SET_RENEWAL_OTHERS_PENDING_PAYMENT_SEARCHED,

  SET_RENEWAL_LICENSED,
  SET_RENEWAL_LICENSED_SEARCHED,
  SET_RENEWAL_OTHERS_LICENSED,
  SET_RENEWAL_OTHERS_LICENSED_SEARCHED,

  SET_RENEWAL_ALL_LICENSED,
  SET_RENEWAL_ALL_LICENSED_SEARCHED,

  SET_RENEWAL_RE_APPLY,
  SET_RENEWAL_RE_APPLY_SEARCHED,
  SET_RENEWAL_OTHERS_RE_APPLY,
  SET_RENEWAL_OTHERS_RE_APPLY_SEARCHED,

  SET_RENEWAL_DECLINE_CONFIRMED,
  SET_RENEWAL_DECLINE_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_DECLINE_CONFIRMED,
  SET_RENEWAL_OTHERS_DECLINE_CONFIRMED_SEARCHED,

  SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED,
  SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,
  SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED,
  SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED,

  SET_RENEWAL_SUSPENDED,
  SET_RENEWAL_SUSPENDED_SEARCHED,
  SET_RENEWAL_CANCELLED,
  SET_RENEWAL_CANCELLED_SEARCHED,

  SET_RENEWAL_ALL_Suspended,
  SET_RENEWAL_ALL_Suspended_SEARCHED,
  SET_RENEWAL_ALL_Cancelled,
  SET_RENEWAL_ALL_Cancelled_SEARCHED,
} from "./mutation-types";

export default {
  async getUnassignedRenewal({ commit }, statusId) {
    try {
      const url = baseUrl + "/renewals/status/"+statusId;
      const resp = await ApiService.get(url);
      commit(SET_RENEWAL_UNASSIGNED, resp.data.data);
    } catch (err) {
      return error;
    }
  },
  async getRenewalReport({ commit }) {
    try {
      const approved = await ApiService.get(baseUrl + "/renewals/status/5");
      const declined = await ApiService.get(baseUrl + "/renewals/status/6");
      const review = await ApiService.get(baseUrl + "/renewals/status/7");

      return [approved, declined, review];
    } catch (err) {
      return err;
    }
  },
  getUnassignedRenewalSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalUnassigned === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalUnassigned.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_UNASSIGNED_SEARCHED, searchedVal);
  },

  async getRenewalUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const myUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_UNFINISHED, myUnfinished);
  },

  getRenewalUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalUnfinished.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_UNFINISHED_SEARCHED, searchedVal);
  },

  async getRenewalOthersUnfinished({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_UNFINISHED, othresUnfinished);
  },
  getRenewalOthersUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersUnfinished.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_UNFINISHED_SEARCHED, searchedVal);
  },

  async getRenewalAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const assignedToMe = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_ASSIGNED_TO_YOU, assignedToMe);
  },

  getRenewalAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAssignedToYou === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAssignedToYou.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ASSIGNED_TO_YOU_SEARCHED, searchedVal);
  },

  async getRenewalOthersAssigned({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othresUnfinished = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_ASSIGNED_TO_OTHERS, othresUnfinished);
  },
  getRenewalOthersAssignedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAssignedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAssignedToOthers.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ASSIGNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getRenewalApproved({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const approved = [];
      commit(SET_RENEWAL_APPROVED, approved);
      return;
    }
    const Approved = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_APPROVED, Approved);
  },

  getRenewalApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalApproved === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalApproved.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_APPROVED_SEARCHED, searchedVal);
  },

  async getRenewalAllApproved({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersApproved = [];
      commit(SET_RENEWAL_ALL_APPROVED, othersApproved);
      return
    }
    const othersApproved = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_ALL_APPROVED, othersApproved);
  },
  getRenewalAllApprovedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAllApproved === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAllApproved.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ALL_APPROVED_SEARCHED, searchedVal);
  },

  async getRenewalDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const declined = [];
      commit(SET_RENEWAL_DECLINED, declined);
      return;
    }
    const declined = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_DECLINED, declined);
  },

  getRenewalDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalDeclined.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_DECLINED_SEARCHED, searchedVal);
  },

  async getRenewalAllDeclined({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    if (resp.data.data === undefined) {
      const othersDeclined = [];
      commit(SET_RENEWAL_ALL_DECLINED, othersDeclined);
      return;
    }
    const othersDeclined = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_ALL_DECLINED, othersDeclined);
  },
  getRenewalAllDeclinedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAllDeclined === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAllDeclined.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ALL_DECLINED_SEARCHED, searchedVal);
  },

  async getRenewalUnderSuperVision({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const underSuperVision = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_UNDER_SUPERVISION, underSuperVision);
  },

  getRenewalUnderSuperVisionSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalUnderSuperVision === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalUnderSuperVision.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_UNDER_SUPERVISION_SEARCHED, searchedVal);
  },

  async getRenewalOthersUnderSuperVision({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+0;
    const resp = await ApiService.get(url);
    const othersUnderSuperVision = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_UNDER_SUPERVISION, othersUnderSuperVision);
  },
  getRenewalOthersUnderSuperVisionSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersUnderSuperVision === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersUnderSuperVision.filter(
      function(e) {
        return e.renewalCode === undefined
          ? ""
          : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_UNDER_SUPERVISION_SEARCHED, searchedVal);
  },

  async getRenewalApprovedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const approvedPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_APPROVED_PAYMENT, approvedPayment);
  },

  getRenewalApprovedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalApprovedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalApprovedPayment.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_APPROVED_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalOthersApprovedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersApprovedPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_APPROVED_PAYMENT, othersApprovedPayments);
  },
  getRenewalOthersApprovedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersApprovedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersApprovedPayment.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_APPROVED_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const declinedPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_DECLINED_PAYMENT, declinedPayment);
  },

  getRenewalDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalDeclinedPayment.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalOthersDeclinedPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersDeclinedPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_DECLINED_PAYMENT, othersDeclinedPayments);
  },
  getRenewalOthersDeclinedPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersDeclinedPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersDeclinedPayment.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_DECLINED_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalOnReview({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const onReview = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_ON_REVIEW, onReview);
  },

  getRenewalOnReviewSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOnReview === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOnReview.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ON_REVIEW_SEARCHED, searchedVal);
  },

  async getRenewalOthersOnReview({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersOnReview = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_ON_REVIEW, othersOnReview);
  },
  getRenewalOthersOnReviewSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersOnReview === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersOnReview.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_ON_REVIEW_SEARCHED, searchedVal);
  },

  async getRenewalReEvaluate({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    let evaluator = [];
    const allApplications = resp.data.data.forEach(function (e) {
      const myApplications = e.evaluators.forEach(function (ee) {
        if(ee.evaluatorId === adminStatus[1] && ee.actionEvent === null) {
          evaluator.push(e);
        }
      })
      
    })
    
    commit(SET_RENEWAL_RE_EVALUATE, evaluator);
  },

  getRenewalReEvaluateSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalReEvaluate === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalReEvaluate.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_RE_EVALUATE_SEARCHED, searchedVal);
  },

  async getRenewalOthersReEvaluate({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    let counter = 0;
    let othersReEvaluate = [];
    resp.data.data.forEach(function(e) {
      e.evaluators.forEach(function (ee) {
        if(ee.evaluatorId !== adminStatus[1]) {
          counter++;
        }
        if(counter === e.evaluators.length) {
          othersReEvaluate.push(e)
        }
      })
      counter = 0;
    });
    commit(SET_RENEWAL_OTHERS_RE_EVALUATE, othersReEvaluate);
  },
  getRenewalOthersReEvaluateSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersReEvaluate === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersReEvaluate.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_RE_EVALUATE_SEARCHED, searchedVal);
  },

  async getRenewalConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_CONFIRMED, confirmed);
  },

  getRenewalConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalConfirmed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_CONFIRMED_SEARCHED, searchedVal);
  },

  async getRenewalOthersConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_CONFIRMED, confirmed);
  },
  getRenewalOthersConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersConfirmed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_CONFIRMED_SEARCHED, searchedVal);
  },

  async getRenewalReturnedToMe({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_RETURNED_TO_ME, confirmed);
  },

  getRenewalReturnedToMeSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalReturnedToMe === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalReturnedToMe.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_RETURNED_TO_ME_SEARCHED, searchedVal);
  },

  async getRenewalReturnedToOthers({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const confirmed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1]
    })
    commit(SET_RENEWAL_RETURNED_TO_OTHERS, confirmed);
  },

  getRenewalReturnedToOthersSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalReturnedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalReturnedToOthers.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_RETURNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getRenewalPendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const pendingPayment = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1];
    });
    commit(SET_RENEWAL_PENDING_PAYMENT, pendingPayment);
  },

  getRenewalPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalPendingPayment.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalOthersPendingPayment({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const AllPendingPayments = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1]
    })
    commit(SET_RENEWAL_OTHERS_PENDING_PAYMENT, AllPendingPayments);
  },

  getRenewalOthersPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersPendingPayment.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_PENDING_PAYMENT_SEARCHED, searchedVal);
  },

  async getRenewalLicensed({ commit }, adminStatus) {
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData")).expertLevelId;
    const url = baseUrl + "/renewals/status/"+adminStatus[1];
    const confirmedUrl = baseUrl + "/renewals/status/"+adminStatus[2];
    const resp = await ApiService.get(url);
    const confirmedResp = await ApiService.get(confirmedUrl);
    const licensed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    const confirmedLicensed = confirmedResp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0] && e.previousApplicationStatus.code === "APP";
    })
    const concateLicensedUsers = licensed.concat(confirmedLicensed);
    if(expertLevelId === 3) {
      const ApprovedUrl = baseUrl + "/renewals/status/"+adminStatus[3];
      const ApprovedResp = await ApiService.get(ApprovedUrl);
      const ApprovedLicensed = ApprovedResp.data.data.filter(function(e) {
        return e.reviewerId === adminStatus[0];
      });
      const concateForFederalApproved = concateLicensedUsers.concat(ApprovedLicensed);
      commit(SET_RENEWAL_LICENSED, concateForFederalApproved);
      return;
    }
    commit(SET_RENEWAL_LICENSED, concateLicensedUsers);
  },

  getRenewalLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalLicensed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_LICENSED_SEARCHED, searchedVal);
  },

  async getRenewalOtherLicensed({ commit }, adminStatus) {
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData")).expertLevelId;
    const url = baseUrl + "/renewals/status/"+adminStatus[1];
    const confirmedUrl = baseUrl + "/renewals/status/"+adminStatus[2];
    const resp = await ApiService.get(url);
    const confirmedResp = await ApiService.get(confirmedUrl);
    const othersLicensed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    });
    const othersConfirmedLicensed = confirmedResp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[0];
    })
    const othersConcateLicensedUsers = othersLicensed.concat(othersConfirmedLicensed);
    if(expertLevelId === 3) {
      const ApprovedUrl = baseUrl + "/renewals/status/"+adminStatus[3];
      const ApprovedResp = await ApiService.get(ApprovedUrl);
      const ApprovedLicensed = ApprovedResp.data.data.filter(function(e) {
        return e.reviewerId !== adminStatus[0];
      });
      const concateForFederalApproved = othersConcateLicensedUsers.concat(ApprovedLicensed);
      commit(SET_RENEWAL_OTHERS_LICENSED, concateForFederalApproved);
      return;
    }
    commit(SET_RENEWAL_OTHERS_LICENSED, othersConcateLicensedUsers);
  },

  getRenewalOthersLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersLicensed.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_LICENSED_SEARCHED, searchedVal);
  },

  async getRenewalAllLicensed({ commit }) {
    const url = baseUrl + "/renewals/all/licensed";
    const resp = await ApiService.get(url);
    const renewalAllLicensed = resp.data.data;
    commit(SET_RENEWAL_ALL_LICENSED, renewalAllLicensed);
  },

  getRenewalAllLicensedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAllLicensed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAllLicensed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ALL_LICENSED_SEARCHED, searchedVal);
  },

  async getRenewalSuspended({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[1];
    const resp = await ApiService.get(url);
    const suspended = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    commit(SET_RENEWAL_SUSPENDED, suspended);
  },

  getRenewalSuspendedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalSuspended === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalSuspended.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_SUSPENDED_SEARCHED, searchedVal);
  },

  async getRenewalAllSuspended({commit}, status) {
    const url = baseUrl + "/renewals/status/"+ status;
    const resp = await ApiService.get(url);
    const renewalAllSuspended = resp.data.data;
    commit(SET_RENEWAL_ALL_Suspended, renewalAllSuspended);
  },

  getRenewalAllSuspendedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAllSuspended === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAllSuspended.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ALL_Suspended_SEARCHED, searchedVal);
  },

  async getRenewalCancelled({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[1];
    const resp = await ApiService.get(url);
    const cancelled = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[0];
    });
    commit(SET_RENEWAL_CANCELLED, cancelled);
  },

  getRenewalCancelledSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalCancelled === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalCancelled.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_CANCELLED_SEARCHED, searchedVal);
  },

  async getRenewalAllCancelled({commit}, status) {
    const url = baseUrl + "/renewals/status/"+ status;
    const resp = await ApiService.get(url);
    const renewalAllCancelled = resp.data.data;
    commit(SET_RENEWAL_ALL_Cancelled, renewalAllCancelled);
  },

  getRenewalAllCancelledSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalAllCancelled === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalAllCancelled.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_ALL_Cancelled_SEARCHED, searchedVal);
  },

  async getRenewalReApply({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const reApply = resp.data.data;
    commit(SET_RENEWAL_RE_APPLY, reApply);
  },

  getRenewalReApplySearched({ commit, getters }, searchKey) {
    if (getters.getRenewalReApply === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalReApply.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_RE_APPLY_SEARCHED, searchedVal);
  },

  async getRenewalOtherReApply({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersReApply = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1];
    });
    commit(SET_RENEWAL_OTHERS_RE_APPLY, othersReApply);
  },

  getRenewalOthersReApplySearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersReApply === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersReApply.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_RE_APPLY_SEARCHED, searchedVal);
  },

  async getRenewalDeclineConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const declineConfirmed = resp.data.data.filter(function(e) {
      return e.reviewerId === adminStatus[1] && e.previousApplicationStatus.code == "DEC";
    });
    commit(SET_RENEWAL_DECLINE_CONFIRMED, declineConfirmed);
  },

  getRenewalDeclineConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalDeclineConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalDeclineConfirmed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_DECLINE_CONFIRMED_SEARCHED, searchedVal);
  },

  async getRenewalOthersDeclineConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersDeclineConfirmed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1] && e.previousApplicationStatus.code === "DEC";
    });
    commit(SET_RENEWAL_OTHERS_DECLINE_CONFIRMED, othersDeclineConfirmed);
  },

  getRenewalOthersDeclineConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersDeclineConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersDeclineConfirmed.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_DECLINE_CONFIRMED_SEARCHED, searchedVal);
  },

  async getRenewalUnderSuperVisionConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const underSuperVisionConfirmed = resp.data.data.filter(function(e) {
      return (e.reviewerId === adminStatus[1] && e.previousApplicationStatus.code === "USUP");
    });
    commit(SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED, underSuperVisionConfirmed);
  },

  getRenewalUnderSuperVisionConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalUnderSuperVisionConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalUnderSuperVisionConfirmed.filter(function(e) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_UNDER_SUPER_VISION_CONFIRMED_SEARCHED, searchedVal);
  },

  async getRenewalOthersUnderSuperVisionConfirmed({ commit }, adminStatus) {
    const url = baseUrl + "/renewals/status/"+adminStatus[0];
    const resp = await ApiService.get(url);
    const othersUnderSuperVisionConfirmed = resp.data.data.filter(function(e) {
      return e.reviewerId !== adminStatus[1] && e.previousApplicationStatus.code === "USUP";
    });
    commit(SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED, othersUnderSuperVisionConfirmed);
  },

  getRenewalOthersUnderSuperVisionConfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getRenewalOthersUnderSuperVisionConfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getRenewalOthersUnderSuperVisionConfirmed.filter(function(
      e
    ) {
      return e.renewalCode === undefined
        ? ""
        : e.renewalCode.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    commit(SET_RENEWAL_OTHERS_UNDER_SUPER_VISION_CONFIRMED_SEARCHED, searchedVal);
  },
};
