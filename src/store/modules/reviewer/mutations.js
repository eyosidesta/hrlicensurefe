import {
    SET_UNASSIGNED,
    SET_UNASSIGNED_SEARCHED,
    SET_ASSIGNED_TO_YOU,
    SET_ASSIGNED_TO_YOU_SEARCHED,
    SET_UNFINISHED,
    SET_UNFINISHED_SEARCHED,
    SET_RECENTLY_FINISHED,
    SET_RECENTLY_FINISHED_SEARCHED,
    SET_ASSIGNED_FOR_EVERYONE,
    SET_ASSIGNED_FOR_EVERYONE_SEARCHED,
    SET_EVEYONE_UNFINISHED,
    SET_EVEYONE_UNFINISHED_SEARCHED,
    SET_ALL_RECENTLY_FINISHED,
    SET_ALL_RECENTLY_FINISHED_SEARCHED,
    SET_ALL_PENDING_PAYMENTS,
    SET_ALL_PENDING_PAYMENTS_SEARCHED,
    SET_PENDING_PAYMENTS,
    SET_PENDING_PAYMENTS_SEARCHED,
} from "./mutation-types";

export default {
    [SET_UNASSIGNED] (state, data) {
        state.unassigned = data
        state.unassignedSearched = data
    },
    [SET_UNASSIGNED_SEARCHED] (state, searchedVal) {
        state.unassignedSearched = searchedVal
    },
    [SET_ASSIGNED_TO_YOU] (state, data) {
        state.assgnedToYou = data
        state.assignedToYouSearched = data
    },
    [SET_ASSIGNED_TO_YOU_SEARCHED] (state, searchedVal) {
        state.assignedToYouSearched = searchedVal
    },
    [SET_UNFINISHED] (state, data) {
      state.unfinished = data
      state.unfinishedSearched = data  
    },
    [SET_UNFINISHED_SEARCHED] (state, searchedVal) {
        state.unfinishedSearched = searchedVal
    },
    [SET_RECENTLY_FINISHED] (state, datas) {
        console.log("apppmmmm", datas[2])
        state.recentlyFinished = datas[0]
        state.recentlyFinishedSearched = datas[0]
        state.approved = datas[2]
        state.approvedSearched = datas[2]
    },
    [SET_RECENTLY_FINISHED_SEARCHED] (state, searchedVal) {
        state.recentlyFinishedSearched = searchedVal
    },
    [SET_ASSIGNED_FOR_EVERYONE] (state, data) {
        state.assignedForEveryOne = data
        state.assignedForEveryOneSearched = data
    },
    [SET_ASSIGNED_FOR_EVERYONE_SEARCHED] (state, searchedVal) {
        state.assignedForEveryOneSearched = searchedVal
    },
    [SET_EVEYONE_UNFINISHED] (state, data) {
        state.everyOneUnfinished = data
        state.eveyOneUnfinishedSearched = data
    },
    [SET_EVEYONE_UNFINISHED_SEARCHED] (state, searchedVal) {
        state.eveyOneUnfinishedSearched = searchedVal
    },
    [SET_ALL_RECENTLY_FINISHED] (state, data, certifiedUsers, approvedUsers) {
        state.allRecentlyFinished = data
        state.allRecentlyFinishedSearched = data
        state.allCertifiedUsers = certifiedUsers
        state.allCertifiedUsersSearched = certifiedUsers
    },
    [SET_ALL_RECENTLY_FINISHED_SEARCHED] (state, searchedVal) {
        state.allRecentlyFinishedSearched = searchedVal
    },
    [SET_ALL_PENDING_PAYMENTS] (state, data) {
        state.allPendingPayment = data
        state.allPendingPaymentSearched = data
    },
    [SET_ALL_PENDING_PAYMENTS_SEARCHED] (state, searchedVal) {
        state.allPendingPaymentSearched = searchedVal
    },
    [SET_PENDING_PAYMENTS] (state, data) {
        state.pendingPayments = data;
        state.pendingPaymentsSearched = data
    }
}