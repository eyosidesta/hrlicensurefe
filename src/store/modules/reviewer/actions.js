import ApiService from "../../../services/api.service";
import { baseUrl } from "../../../composables/baseURL";
import {
  SET_UNASSIGNED,
  SET_UNASSIGNED_SEARCHED,
  SET_ASSIGNED_TO_YOU,
  SET_ASSIGNED_TO_YOU_SEARCHED,
  SET_UNFINISHED,
  SET_UNFINISHED_SEARCHED,
  SET_UNCONFIRMED,
  SET_UNCONFIRMED_SEARCHED,
  SET_OTHERS_UNCONFIRMED,
  SET_OTHERS_UNCONFIRMED_SEARCHED,
  SET_RETURNED_TO_ME,
  SET_RETURNED_TO_ME_SEARCHED,
  SET_RETURNED_TO_OTHERS,
  SET_RETURNED_TO_OTHERS_SEARCHED,
  SET_CONFIRM_REVIEW,
  SET_CONFIRM_REVIEW_SEARCHED,
  SET_OTHERS_CONFIRM_REVIEW,
  SET_OTHERS_CONFIRM_REVIEW_SEARCHED,
  SET_EVALUATE_REVIEW,
  SET_EVALUATE_REVIEW_SEARCHED,
  SET_OTHERS_EVALAUTE_REVIEW,
  SET_OTHERS_EVALUATE_REVIEW_SEARCHED,
  SET_CONFIRMED,
  SET_CONFIRMED_SEARCHED,
  SET_TEMPORARLY_FINISHED,
  SET_TEMPORARLY_FINISHED_SEARCHED,
  SET_RECENTLY_FINISHED,
  SET_RECENTLY_FINISHED_SEARCHED,
  SET_ASSIGNED_FOR_EVERYONE,
  SET_ASSIGNED_FOR_EVERYONE_SEARCHED,
  SET_EVEYONE_UNFINISHED,
  SET_EVEYONE_UNFINISHED_SEARCHED,
  SET_ALLRECENTLY_FINISHED,
  SET_ALL_RECENTLY_FINISHED_SEARCHED,
  SET_ALL_PENDING_PAYMENTS,
  SET_ALL_PENDING_PAYMENTS_SEARCHED,
  SET_PENDING_PAYMENTS,
  SET_PENDING_PAYMENTS_SEARCHED,
  SET_ALL_FINISHED_SEARCHED,
  SET_CERTIFIED_USERS,
  SET_CERTIFIED_USERS_SEARCHED,
  SET_MY_REGION_CERTIFIED_USERS,
  SET_MY_REGION_CERTIFIED_USERS_SEARCHED,
  SET_PROFESSIONAL_TYPES,
  SET_LEGACY_DATA,
  SET_LEGACY_DATA_SEARCHED,
} from "./mutation-types";

export default {
  async getApplicationStatuses({ commit }) {
    try {
      const url = baseUrl + "/applicationStatuses";
      const resp = await ApiService.get(url);
    } catch (error) {}
  },

  async getUnfinished({ commit }, id) {
    try {
      const url = baseUrl + "/applications/unfinished/" + id;
      const resp = await ApiService.get(url);
      commit(SET_UNFINISHED, resp.data.data);
      // return resp;
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },
  getUnfinishedSearched({ commit, getters }, searchedKey) {
    if (getters.getUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getUnfinished.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchedKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchedKey.toLowerCase())
      );
    });
    commit(SET_UNFINISHED_SEARCHED, searchedVal);
  },
  async getEveryOneUnfinished({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole === "ADM") {
      try {
        const respAll = await ApiService.get(
          baseUrl + "/applications/allUnfinished",
          {}
        );
        const resp = respAll.data.data.filter(function(e) {
          return e.reviewerId === null ? "" : e.reviewerId !== adminId;
        });
        commit(SET_EVEYONE_UNFINISHED, resp);
      } catch (error) {
        const resp = error;
      }
    } else {
      return;
    }
  },
  getEveryOneUnfinishedSearched({ commit, getters }, searchKey) {
    if (getters.getEveryOneUnfinished === undefined) {
      return;
    }
    const searchedVal = getters.getEveryOneUnfinished.filter(function(e) {
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
    commit(SET_EVEYONE_UNFINISHED_SEARCHED, searchedVal);
  },

  async getConfirmed({ commit }, id) {
    try {
      // const resp = await ApiService.get("https://randomuser.me/api/?results=10");
      // const url = baseUrl + "/newLicenses/user/" + id;
      const url = baseUrl + "/applications/returnedApps/" + id;
      const resp = await ApiService.get(url);
      commit(SET_CONFIRMED, resp.data.data);
      // return resp;
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },

  // tobechanged
  async getUnconfirmed({ commit }, id) {
    try {
      // const resp = await ApiService.get("https://randomuser.me/api/?results=10");
      // const url = baseUrl + "/newLicenses/user/" + id;
      const url = baseUrl + "/applications/unconfirmedApps/" + id;
      const resp = await ApiService.get(url);
      commit(SET_UNCONFIRMED, resp.data.data);
      // return resp;
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },

  getUnconfirmedSearched({ commit, getters }, searchedKey) {
    if (getters.getUnconfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getUnconfirmed.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchedKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchedKey.toLowerCase())
      );
    });
    commit(SET_UNCONFIRMED_SEARCHED, searchedVal);
  },

  async getAllUnconfirmed({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole === "ADM") {
      try {
        const resp = await ApiService.get(
          baseUrl + "/applications/allUnconfirmedApps"
        );
        commit(SET_OTHERS_UNCONFIRMED, resp.data.data);
      } catch (error) {
        const resp = error;
      }
    } else {
      return;
    }
  },

  getOthersUnconfirmedSearched({ commit, getters }, searchKey) {
    if (getters.getOthersUnconfirmed === undefined) {
      return;
    }
    const searchedVal = getters.getOthersUnconfirmed.filter(function(e) {
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
    commit(SET_OTHERS_UNCONFIRMED_SEARCHED, searchedVal);
  },

  async getReturnedToMe({ commit }, id) {
    try {
      // const resp = await ApiService.get("https://randomuser.me/api/?results=10");
      // const url = baseUrl + "/newLicenses/user/" + id;
      const url = baseUrl + "/applications/finished/" + id;
      const resp = await ApiService.get(url);
      commit(SET_RETURNED_TO_ME, resp.data.data);
      // return resp;
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },

  getReturnedToMeSearched({ commit, getters }, searchedKey) {
    if (getters.getReturnedToMe === undefined) {
      return;
    }
    const searchedVal = getters.getReturnedToMe.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchedKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchedKey.toLowerCase())
      );
    });
    commit(SET_RETURNED_TO_ME_SEARCHED, searchedVal);
  },

  async getReturnedToOthers({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole === "ADM") {
      try {
        const respAll = await ApiService.get(
          baseUrl + "/applications/allUnfinished"
        );
        const resp = respAll.data.data.filter(function(e) {
          return e.reviewerId === null ? "" : e.reviewerId !== adminId;
        });
        commit(SET_RETURNED_TO_OTHERS, resp);
      } catch (error) {
        const resp = error;
      }
    } else {
      return;
    }
  },

  getReturnedToOthersSearched({ commit, getters }, searchKey) {
    if (getters.getReturnedToOthers === undefined) {
      return;
    }
    const searchedVal = getters.getReturnedToOthers.filter(function(e) {
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
    commit(SET_RETURNED_TO_OTHERS_SEARCHED, searchedVal);
  },

  async getEvaluateReviewer({ commit }, id) {
    try {
      const url = baseUrl + "/applications/evaluatorsApplications/" + id;
      const resp = await ApiService.get(url);
      commit(SET_EVALUATE_REVIEW, resp.data.data);
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },

  async getConfirmReview({ commit }, id) {
    try {
      // const resp = await ApiService.get("https://randomuser.me/api/?results=10");
      // const url = baseUrl + "/newLicenses/user/" + id;
      const url = baseUrl + "/applications/evaluatorAssignedApps/" + id;
      const resp = await ApiService.get(url);
      commit(SET_CONFIRM_REVIEW, resp.data.data);
      // return resp;
    } catch (error) {
      const resp = { status: "Error" };
      return resp;
    }
  },

  getConfirmReviewSearched({ commit, getters }, searchedKey) {
    if (getters.getConfirmReview === undefined) {
      return;
    }
    const searchedVal = getters.getConfirmReview.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchedKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchedKey.toLowerCase())
      );
    });
    commit(SET_CONFIRM_REVIEW_SEARCHED, searchedVal);
  },

  async getOthersConfirmReview({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole === "ADM") {
      try {
        const respAll = await ApiService.get(
          baseUrl + "/applications/allUnfinished"
        );
        const resp = respAll.data.data.filter(function(e) {
          return e.reviewerId === null ? "" : e.reviewerId !== adminId;
        });
        commit(SET_OTHERS_CONFIRM_REVIEW, resp);
      } catch (error) {
        const resp = error;
      }
    } else {
      return;
    }
  },

  getOthersConfirmReviewSearched({ commit, getters }, searchedKey) {
    if (getters.getOthersConfirmReview === undefined) {
      return;
    }
    const searchedVal = getters.getOthersConfirmReview.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchedKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchedKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchedKey.toLowerCase())
      );
    });
    commit(SET_OTHERS_CONFIRM_REVIEW_SEARCHED, searchedVal);
  },

  async getAssignedToYou({ commit }, adminId) {
    try {
      const resp = await ApiService.get(
        baseUrl + "/applications/assignedToYou/" + adminId
      );
      commit(SET_ASSIGNED_TO_YOU, resp.data.data);
    } catch (error) {
      const resp = error;
      return resp;
    }
  },
  getAssignedToYouSearched({ commit, getters }, searchKey) {
    if (getters.getAssignedToYou === undefined) {
      return;
    }
    const searchedVal = getters.getAssignedToYou.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_ASSIGNED_TO_YOU_SEARCHED, searchedVal);
  },
  async getAssignedToEveryOne({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole === "ADM") {
      try {
        const respAll = await ApiService.get(
          baseUrl + "/applications/assignedToAll"
        );
        const resp = respAll.data.data.filter(function(e) {
          return e.reviewerId === null ? "" : e.reviewerId !== adminId;
        });
        commit(SET_ASSIGNED_FOR_EVERYONE, resp);
      } catch (error) {
        const resp = error;
        return resp;
      }
    } else {
      return;
    }
  },
  getAssignedToEveryOneSearched({ commit, getters }, searchKey) {
    if (getters.getAssignedForEveryOne === undefined) {
      return;
    }
    const searchedVal = getters.getAssignedForEveryOne.filter(function(e) {
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
    commit(SET_ASSIGNED_FOR_EVERYONE_SEARCHED, searchedVal);
  },
  async getUnassigned({ commit }) {
    try {
      // const resp = await ApiService.get("https://randomuser.me/api/?results=10");
      // const resp = await ApiService.get(baseUrl + "/newLicenses/status/3");
      const resp = await ApiService.get(baseUrl + "/applications/unassigned");
      commit(SET_UNASSIGNED, resp.data.data);
    } catch (error) {
      const resp = error;
      return resp;
    }
  },
  getUnassignedSearched({ commit, getters }, searchKey) {
    if (getters.getUnassigned === undefined) {
      return;
    }
    const searchedVal = getters.getUnassigned.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_UNASSIGNED_SEARCHED, searchedVal);
  },
  // temporarly finished will come to here
  // async getTemporarlyFinished({commit}, adminId) {
  //   try {
  //     const resp = await ApiService.get(baseUrl + "/applications/finished/"+adminId)

  //     const certifiedUsers = resp.data.data.filter(function(e) {
  //       return e.certified == true;
  //     })

  //     const temporarlyApprovedUsers = resp.data.data.filter(function(e) {
  //       return e.applicationStatus.name !== null
  //               ? e.applicationStatus.name == "Approve" : ''
  //     })

  //     const temporarlyRejectedusers = resp.data.data.filter(function(e) {
  //       return e.applicationStatus.name !== null
  //                 ? e.applicationStatus.name == "Decline" : ''
  //     })

  //     const temporarlyUnderSupervionUsers = resp.data.data.filter(function(e) {
  //       return e.applicationStatus.name !== null
  //               ? e.applicationStatus.name == "Under Supervision" : ''
  //     })
  //     const finishedDatas = [resp.data.data, certifiedUsers, temporarlyApprovedUsers, temporarlyRejectedusers, temporarlyUnderSupervionUsers]
  //     commit(SET_TEMPORARLY_FINISHED, finishedDatas)
  //   } catch (error) {
  //     const resp = error;
  //     return resp;
  //   }
  // },
  async getRecentlyFinished({ commit }, adminId) {
    try {
      const resp = await ApiService.get(
        baseUrl + "/applications/finished/" + adminId
      );

      const certifiedUsers = resp.data.data.filter(function(e) {
        return e.certified == true;
      });
      // const approvedUsers = resp.data.data.filter(function(e) {
      //   return
      // })

      const approvedUsers = resp.data.data.filter(function(e) {
        return e.applicationStatus.name !== null
          ? e.applicationStatus.name == "Approve"
          : "";
      });

      const rejectedusers = resp.data.data.filter(function(e) {
        return e.applicationStatus.name !== null
          ? e.applicationStatus.name == "Decline"
          : "";
      });

      const underSupervionUsers = resp.data.data.filter(function(e) {
        return e.applicationStatus.name !== null
          ? e.applicationStatus.name == "Under Supervision"
          : "";
      });
      const finishedDatas = [
        resp.data.data,
        certifiedUsers,
        approvedUsers,
        rejectedusers,
        underSupervionUsers,
      ];
      commit(SET_RECENTLY_FINISHED, finishedDatas);
    } catch (error) {
      const resp = error;
      return resp;
    }
  },

  searchRecentlyFinished({ commit, getters }, searchKey) {
    if (getters.getApproved === undefined) {
      return;
    }
    const approvedSearched = getters.getApproved.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicationType.toLowerCase().includes(searchKey.toLowerCase())
      );
    });
    if (getters.getRejected === undefined) {
      return;
    }
    const rejectedSearched = getters.getRejected.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });

    const underSuperVisionSearched = getters.getUnderSuperVision.filter(
      function(e) {
        return (
          e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
          (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          e.applicant.profile.name
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          e.applicant.profile.fatherName
            .toLowerCase()
            .includes(searchKey.toLowerCase())
        );
      }
    );

    const searchedDatas = [
      approvedSearched,
      rejectedSearched,
      underSuperVisionSearched,
    ];
    commit(SET_RECENTLY_FINISHED_SEARCHED, searchedDatas);
  },
  getRecentlyFinishedSearched({ commit, getters }, searchKey) {
    if (getters.getRecentlyFinished === undefined) {
      return;
    }
    const searchedVal = getters.getRecentlyFinished.filter(function(e) {
      // return e.newLicenseCode
      //         .toLowerCase()
      //         .includes(searchKey.toLowerCase())
      //         ||
      return (
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    // commit(SET_RECENTLY_FINISHED_SEARCHED, searchedVal)
  },

  async getAllRecentlyFinished({ commit }, adminData) {
    const adminRole = adminData[0];
    const adminId = adminData[1];
    if (adminRole == "ADM") {
      try {
        const resp = await ApiService.get(
          baseUrl + "/applications/allFinished"
        );
        const allCertifiedUsers = resp.data.data.filter(function(e) {
          return e.certified == true;
        });
        const allApprovedUsers = resp.data.data.filter(function(e) {
          return e.reviewerId === null
            ? ""
            : e.reviewerId == adminId
            ? ""
            : e.applicationStatus.name !== null
            ? e.applicationStatus.name === "Approve"
            : "";
        });
        const allRejectedUsers = resp.data.data.filter(function(e) {
          return e.reviewerId === null
            ? ""
            : e.reviewerId == adminId
            ? ""
            : e.applicationStatus.name !== null
            ? e.applicationStatus.name === "Decline"
            : "";
        });

        const allUnderSuperVisionUsers = resp.data.data.filter(function(e) {
          return e.reviewerId === null
            ? ""
            : e.reviewerId == adminId
            ? ""
            : e.applicationStatus.name !== null
            ? e.applicationStatus.name == "Under Supervision"
            : "";
        });
        const finishedDatas = [
          resp.data.data,
          allCertifiedUsers,
          allApprovedUsers,
          allRejectedUsers,
          allUnderSuperVisionUsers,
        ];
        commit(SET_ALLRECENTLY_FINISHED, finishedDatas);
      } catch (error) {
        const resp = error;
        return resp;
      }
    } else {
      return;
    }
  },

  searchAllFinished({ commit, getters }, searchKey) {
    if (getters.getAllApproved === undefined) {
      return;
    }
    const allApprovedSearchedVal = getters.getAllApproved.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });

    if (getters.getAllRejected === undefined) {
      return;
    }
    const allRejectedSearchedVal = getters.getAllRejected.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });

    if (getters.getAllUnderSuperVision === undefined) {
      return;
    }
    const allUnderSuperVisionSearchedVal = getters.getAllUnderSuperVision.filter(
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

    const searchedDatas = [
      allApprovedSearchedVal,
      allRejectedSearchedVal,
      allUnderSuperVisionSearchedVal,
    ];
    commit(SET_ALL_FINISHED_SEARCHED, searchedDatas);
  },

  searchCertifiedUsers({ commit, getters }, searchKey) {
    if (getters.getAllCertifiedUsers === undefined) {
      return;
    }
    const seachedVal = getters.getAllCertifiedUsers.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_CERTIFIED_USERS_SEARCHED, seachedVal);
  },

  async getAllCertifiedUsers({ commit }) {
    try {
      const resp = await ApiService.get(
        baseUrl + "/applications/allUnconfirmedApps"
      );
      const certifiedUsers = resp.data.data.filter(function(e) {
        return (
          e.certified == true &&
          e.applicationType != "Good Standing" &&
          e.applicationType != "Verification"
        );
      });
      commit(SET_CERTIFIED_USERS, certifiedUsers);
    } catch (error) {
      const resp = error;
      return resp;
    }
  },

  async getMyRegionCertifiedUsers({ commit }, regionId) {
    try {
      const resp = await ApiService.get(
        baseUrl + "/applications/allUnconfirmedApps"
      );
      const certifiedUsers = resp.data.data.filter(function(e) {
        return (
          e.certified == true &&
          e.applicationType != "Good Standing" &&
          e.applicationType != "Verification"
        );
      });
      const myRegionCertifiedUsers = certifiedUsers.filter(function(e) {
        return e.woreda.zone.regionId == regionId;
      });
      commit(SET_MY_REGION_CERTIFIED_USERS, myRegionCertifiedUsers);
    } catch (error) {
      const resp = error;
      return resp;
    }
  },

  searchMyRegionCertifiedUsers({ commit, getters }, searchKey) {
    if (getters.getMyRegionCertifiedUsers === undefined) {
      return;
    }
    const seachedVal = getters.getMyRegionCertifiedUsers.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_MY_REGION_CERTIFIED_USERS_SEARCHED, seachedVal);
  },

  getAllRecentlyFinishedSearched({ commit, getters }, searchKey) {
    if (getters.getAllRecentlyFinishedSearched === undefined) {
      return;
    }
    const searchedVal = getters.getAllRecentlyFinishedSearched.filter(function(
      e
    ) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_ALL_RECENTLY_FINISHED_SEARCHED, searchedVal);
  },
  async getAllPendingPayments({ commit }) {
    const url = baseUrl + "/applications/allPendingPayments";
    const resp = await ApiService.get(url);
    commit(SET_ALL_PENDING_PAYMENTS, resp.data.data);
  },

  getAllPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getAllPendingPayment === undefined) {
      return;
    }
    const searchedVal = getters.getAllPendingPayment.filter(function(e) {
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
    commit(SET_ALL_PENDING_PAYMENTS_SEARCHED, searchedVal);
  },

  async getPendingPayments({ commit }, adminId) {
    const url = baseUrl + "/applications/adminsPendingPayments/" + adminId;
    const resp = await ApiService.get(url);
    commit(SET_PENDING_PAYMENTS, resp.data.data);
  },
  getPendingPaymentSearched({ commit, getters }, searchKey) {
    if (getters.getPendingPayments === undefined) {
      return;
    }
    const searchedVal = getters.getPendingPayments.filter(function(e) {
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
    commit(SET_PENDING_PAYMENTS_SEARCHED, searchedVal);
  },

  async updateLicenseGenerated({commit}, appInfo) {
    console.log("app data", appInfo);
    const id = parseInt(appInfo[2])
    const url = `${baseUrl}/${appInfo[1]}/${id}`
    const resp = await ApiService.put(url, appInfo[0]);
    console.log("respond", resp)
    return resp;
  },

  async getLegacyData({ commit }, parameters) {
    let url = "";
    parameters[2] ? url = baseUrl + `/legacyData?page=${parameters[0]}&size=${parameters[1]}&value=${parameters[2]}` : url = baseUrl + `/legacyData?page=${parameters[0]}&size=${parameters[1]}`;
    const resp = await ApiService.get(url);
    return resp.data.data
    // commit(SET_LEGACY_DATA, resp.data.data);
  },

  getLegacyDataSearched({ commit, getters }, searchKey) {
    if (getters.legacyData === undefined) {
      return;
    }
    const searchedVal = getters.legacyData.filter(function(e) {
      return (
        e.newLicenseCode.toLowerCase().includes(searchKey.toLowerCase()) ||
        (e.applicant.profile.name + " " + e.applicant.profile.fatherName)
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.name
          .toLowerCase()
          .includes(searchKey.toLowerCase()) ||
        e.applicant.profile.fatherName
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    });
    commit(SET_LEGACY_DATA_SEARCHED, searchedVal);
  },

  async getProfile(context, id) {
    try {
      const url = baseUrl + "/profiles/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getNewLicenseApplication(context, id) {
    try {
      const url = baseUrl + "/newLicenses/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getGoodStandingApplication(context, id) {
    try {
      const url = baseUrl + "/goodStandings/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getRenewalApplication(context, id) {
    try {
      const url = baseUrl + "/renewals/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getVerificationApplication(context, id) {
    try {
      const url = baseUrl + "/verifications/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getAdmins() {
    try {
      const url = baseUrl + "/admins";
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getAdminsByRegion(context, id) {
    try {
      const url = baseUrl + "/admins/region/" + id;
      const resp = await ApiService.get(url);

      return resp;
    } catch (err) {
      return err;
    }
  },
  async getRoles(context, userID) {
    try {
      const url = baseUrl + "/admins/" + userID;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async assignReviewer({ commit }, assign) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/licenseReviewers/assign",
        assign
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async assignRenewalReviewer({ commit }, assign) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/renewalReviewers/assign",
        assign
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async assignVerificationReviewer({ commit }, assign) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/verificationReviewers/assign",
        assign
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async assignGoodStandingReviewer({ commit }, assign) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/goodStandingReviewers/assign",
        assign
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async transferLicenseReview({ commit }, transfer) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/licenseReviewers/transfer",
        transfer
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async transferVerificationReview({ commit }, transfer) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/verificationReviewers/transfer",
        transfer
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async transferGoodStandingReview({ commit }, transfer) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/goodStandingReviewers/transfer",
        transfer
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async transferRenewalReview({ commit }, transfer) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/renewalReviewers/transfer",
        transfer
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async confirmNewLicenseReview({ commit }, confirm) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/licenseEvaluators/assign",
        confirm
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async confirmVerificationReview({ commit }, confirm) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/verificationEvaluators/assign",
        confirm
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async confirmRenewalReview({ commit }, confirm) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/renewalEvaluators/assign",
        confirm
      );
      // return;
      return resp;
    } catch (error) {
      return error;
    }
  },

  async confirmGoodStandingReview({ commit }, confirm) {
    try {
      const resp = await ApiService.post(
        baseUrl + "/goodStandingEvaluators/assign",
        confirm
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async getApplication(context, applicationId) {
    try {
      const url = baseUrl + "/newLicenses/" + applicationId;
      // const urll = baseUrl + "/newLicenses/125";
      const urll = baseUrl + "/newLicenses/49";
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getDocumentTypes() {
    try {
      const url = baseUrl + "/documentTypes";
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },

  async evaluatVerification({ commit }, license) {
    try {
      return;
      const resp = await ApiService.put(
        baseUrl + "/verificationEvaluators/" + license.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async evaluateGoodStanding({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/goodStandingEvaluators/" + license.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async evaluateRenewal({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/renewalEvaluators/" + license.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async evaluateNewLicense({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/licenseEvaluators/" + license.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async editNewLicense({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/newlicenses/" + license.data.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },

  async editVerification({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/verifications/" + license.data.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async editGoodStanding({ commit }, license) {
    try {
      const resp = await ApiService.put(
        baseUrl + "/goodStandings/" + license.data.id,
        license
      );
      return resp;
    } catch (error) {
      return error;
    }
  },
  async editRenewal({ commit }, license) {
    try {
      console.log("license is", license)
      const resp = await ApiService.put(
        baseUrl + "/renewals/" + license.data.id,
        license
      );
      // const resp = await ApiService.put(url + "newLicenses/" + license);
      return resp;
    } catch (error) {
      return error;
    }
  },
  async getProfessionalType() {
    try {
      const url = baseUrl + "/lookups/professionalTypes";
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },

  async getProfessionalTypeByDepartmentId({ commit }, id) {
    try {
      const url = baseUrl + "/lookups/professionalTypes/" + id;
      const resp = await ApiService.get(url);
      return resp;
    } catch (error) {
      return error;
    }
  },

  async getQrCode({ commit }, url) {
    try {
      const resp = await ApiService.post(baseUrl + "/generateQrCode/scan", url);
      return resp;
    } catch (err) {
      return err;
    }
  },

  async getCertifiedUserById({ commit }, id) {
    try {
      const resp = await ApiService.get(baseUrl + "/users/" + id);
      return resp;
    } catch (error) {
      return error;
    }
  },
};
