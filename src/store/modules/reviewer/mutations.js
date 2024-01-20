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
  SET_ALL_RECENTLY_FINISHED_SEARCHED,
  SET_ALL_PENDING_PAYMENTS,
  SET_ALL_PENDING_PAYMENTS_SEARCHED,
  SET_PENDING_PAYMENTS,
  SET_ALLRECENTLY_FINISHED,
  SET_PENDING_PAYMENTS_SEARCHED,
  SET_ALL_FINISHED_SEARCHED,
  SET_CERTIFIED_USERS,
  SET_CERTIFIED_USERS_SEARCHED,
  SET_MY_REGION_CERTIFIED_USERS,
  SET_MY_REGION_CERTIFIED_USERS_SEARCHED,

  SET_ALL_LICENSED,
  SET_ALL_LICENSED_SEARCHED,

  SET_LEGACY_DATA,
  SET_LEGACY_DATA_SEARCHED,
} from "./mutation-types";

export default {
  [SET_UNASSIGNED](state, data) {
    state.unassigned = data;
    state.unassignedSearched = data;
  },
  [SET_UNASSIGNED_SEARCHED](state, searchedVal) {
    state.unassignedSearched = searchedVal;
  },
  [SET_ASSIGNED_TO_YOU](state, data) {
    state.assgnedToYou = data;
    state.assignedToYouSearched = data;
  },
  [SET_ASSIGNED_TO_YOU_SEARCHED](state, searchedVal) {
    state.assignedToYouSearched = searchedVal;
  },
  [SET_UNFINISHED](state, data) {
    state.unfinished = data;
    state.unfinishedSearched = data;
  },
  [SET_UNFINISHED_SEARCHED](state, searchedVal) {
    state.unfinishedSearched = searchedVal;
  },

  [SET_UNCONFIRMED](state, data) {
    state.unconfirmed = data;
    state.unconfirmedSearched = data;
  },

  [SET_UNCONFIRMED_SEARCHED](state, searchedVal) {
    state.unconfirmedSearched = searchedVal;
  },
  [SET_OTHERS_UNCONFIRMED](state, data) {
    state.othersUnconfirmed = data;
    state.othersUnconfirmedSearched = data;
  },
  [SET_OTHERS_UNCONFIRMED_SEARCHED](state, data) {
    state.othersUnconfirmedSearched = data;
  },

  [SET_RETURNED_TO_ME](state, data) {
    state.returnedToMe = data;
    state.returnedToMeSearched = data;
  },
  [SET_RETURNED_TO_ME_SEARCHED](state, searchedVal) {
    state.returnedToMeSearched = searchedVal;
  },
  [SET_RETURNED_TO_OTHERS](state, data) {
    state.returnedToOthers = data;
    state.retunedToOthersSearched = data;
  },
  [SET_RETURNED_TO_OTHERS_SEARCHED](state, searchedVal) {
    state.retunedToOthersSearched = searchedVal;
  },

  [SET_CONFIRM_REVIEW](state, data) {
    state.confirmReview = data;
    state.confirmReviewSearched = data;
  },
  [SET_CONFIRM_REVIEW_SEARCHED](state, searchedVal) {
    state.confirmReviewSearched = searchedVal;
  },
  [SET_OTHERS_CONFIRM_REVIEW](state, data) {
    state.othersConfirmReview = data;
    state.othersConfirmReviewSearched = data;
  },
  [SET_OTHERS_CONFIRM_REVIEW_SEARCHED](state, searchedVal) {
    state.othersConfirmReviewSearched = searchedVal;
  },
  [SET_EVALUATE_REVIEW](state, data) {
    state.evaluateReviewer = data;
    state.evaluateReviewerSearched = data;
  },
  [SET_CONFIRMED](state, data) {
    state.confirmed = data;
    state.confirmedSearched = data;
  },
  [SET_CONFIRMED_SEARCHED](state, searchedVal) {
    state.confirmedSearched = searchedVal;
  },

  // SET_TEMPORARLY_FINISHED,
  // SET_TEMPORARLY_FINISHED_SEARCHED,

  [SET_RECENTLY_FINISHED](state, datas) {
    state.recentlyFinished = datas[0];
    state.recentlyFinishedSearched = datas[0];
    state.approved = datas[2];
    state.approvedSearched = datas[2];
    state.rejected = datas[3];
    state.rejectedSearched = datas[3];
    state.underSuperVision = datas[4];
    state.underSuperVisionSearched = datas[4];
  },
  [SET_ALLRECENTLY_FINISHED](state, datas) {
    state.allRecentlyFinished = datas[0];
    state.allRecentlyFinishedSearched = datas[0];
    state.allApproved = datas[2];
    state.allApprovedSearched = datas[2];
    state.allRejected = datas[3];
    state.allRejectedSearched = datas[3];
    state.allUnderSuperVision = datas[4];
    state.allUnderSuperVisionSearched = datas[4];
  },
  [SET_CERTIFIED_USERS](state, data) {
    state.allCertifiedUsers = data;
    state.allCertifiedUsersSearched = data;
  },
  [SET_CERTIFIED_USERS_SEARCHED](state, searchedVal) {
    state.allCertifiedUsersSearched = searchedVal;
  },

  [SET_MY_REGION_CERTIFIED_USERS](state, data) {
    state.myRegionCertifiedUsers = data;
    state.myRegionCertifiedUsersSearched = data;
  },
  [SET_MY_REGION_CERTIFIED_USERS_SEARCHED](state, searchedVal) {
    state.myRegionCertifiedUsersSearched = searchedVal;
  },
  [SET_ALL_FINISHED_SEARCHED](state, datas) {
    state.allApprovedSearched = datas[0];
    state.allRejectedSearched = datas[1];
    state.allUnderSuperVisionSearched = datas[2];
  },
  [SET_RECENTLY_FINISHED_SEARCHED](state, datas) {
    state.approvedSearched = datas[0];
    state.rejectedSearched = datas[0];
    state.underSuperVisionSearched = datas[0];
  },
  [SET_ASSIGNED_FOR_EVERYONE](state, data) {
    state.assignedForEveryOne = data;
    state.assignedForEveryOneSearched = data;
  },
  [SET_ASSIGNED_FOR_EVERYONE_SEARCHED](state, searchedVal) {
    state.assignedForEveryOneSearched = searchedVal;
  },
  [SET_EVEYONE_UNFINISHED](state, data) {
    state.everyOneUnfinished = data;
    state.eveyOneUnfinishedSearched = data;
  },
  [SET_EVEYONE_UNFINISHED_SEARCHED](state, searchedVal) {
    state.eveyOneUnfinishedSearched = searchedVal;
  },
  [SET_ALL_RECENTLY_FINISHED_SEARCHED](state, searchedVal) {
    state.allRecentlyFinishedSearched = searchedVal;
  },
  [SET_ALL_PENDING_PAYMENTS](state, data) {
    state.allPendingPayment = data;
    state.allPendingPaymentSearched = data;
  },
  [SET_ALL_PENDING_PAYMENTS_SEARCHED](state, searchedVal) {
    state.allPendingPaymentSearched = searchedVal;
  },
  [SET_PENDING_PAYMENTS](state, data) {
    state.pendingPayments = data;
    state.pendingPaymentsSearched = data;
  },
  [SET_PENDING_PAYMENTS_SEARCHED](state, searchedVal) {
    state.pendingPaymentsSearched = searchedVal;
  },

  [SET_ALL_LICENSED](state, data) {
    state.allLicensed = data;
    state.allLicensedSearched = data;
  },
  [SET_ALL_LICENSED_SEARCHED](state, searchedVal) {
    state.allLicensedSearched = searchedVal;
  },
  [SET_LEGACY_DATA](state, data) {
    state.legacyData = data;
    state.legacyDataSearched = data;
  },
  [SET_LEGACY_DATA_SEARCHED](state, searchedVal) {
    state.legacyDataSearched = searchedVal;
  },
};
