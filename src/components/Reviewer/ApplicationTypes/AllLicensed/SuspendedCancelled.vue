<template>
  <div>
    <!-- <reviewer-nav-bar tab="renewalSuspended" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
      <div class="pl-12">
        <div style="border-bottom: 2px solid #eaeaea">
          <ul class="flex cursor-pointer">
            <li
              :class="[
                app_value == 'Suspended'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              @click="changeTab(app_type, 'Suspended')"
              :style="[
                app_value == 'Suspended'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
            >
              Suspended
            </li>
            <li
              :class="[
                app_value == 'Cancelled'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              :style="[
                app_value == 'Cancelled'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
              @click="changeTab(app_type, 'Cancelled')"
            >
              Cancelled
            </li>
            <li>
              <label class="text-primary-700">Application Type</label>
              <select
                class="max-w-7x3"
                v-model="app_type"
                @change="changeTab(app_type, app_value)"
              >
                <option
                  v-for="types in applicationTypes"
                  v-bind:key="types"
                  v-bind:value="types"
                >
                  <!-- <option> -->
                  {{ types }}
                </option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div class="pl-12 mt-4">
        <div>Filter By</div>
      </div>

      <div class="flex flex-wrap mb-medium pl-12 pt-1">
        <label class="text-primary-700 mr-2">From</label>
        <input
          class="max-w-3xl mr-5"
          type="date"
          v-model="allInfo.searchFromDate"
        />
        <label class="text-primary-700 mr-2">To</label>
        <input
          class="max-w-3xl mr-5"
          type="date"
          v-model="allInfo.searchUpToDate"
        />
        <button @click="filterAllLicensedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title :message="message" />
      </div>
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="
          selectedTab == 'New License'
            ? !showLoadingNewLicenseSuspended
            : selectedTab == 'Renewal'
            ? !showLoadingRenewalSuspended
            : !showLoadingNewLicenseCancelled
        "
      >
        <nothing-to-show
          :nothingToShow="
            selectedTab == 'New License'
              ? nothingToShowNewLicense
              : selectedTab == 'Renewal'
              ? nothingToShowRenewal
              : nothingToShowGoodStanding
          "
        />
        <all-licensed-applications
          :allLicensedApplication="
            selectedTab == 'New License Suspended'
              ? getNewLicenseSuspended
              : selectedTab == 'Renewal Suspended'
              ? getRenewalSuspended
              : selectedTab == 'New License Cancelled'
              ? getNewLicenseCancelled
              : getRenewalCancelled
          "
          :app_type="app_type"
          others_licensed="false"
        />
      </div>
    </div>
    <div
      v-if="
        selectedTab == 'New License Suspended'
          ? showLoadingNewLicenseSuspended
          : selectedTab == 'Renewal Suspended'
          ? showLoadingRenewalSuspended
          : selectedTab == 'New License Cancelled'
          ? showLoadingNewLicenseCancelled
          : showLoadingRenewalCancelled
      "
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
      <div class="flex pl-12 pt-tiny">
        <Title
          :message="
            'Applicants on Date Range ' +
              moment(allInfo.searchFromDate).format('MMM D, YYYY') +
              ' To ' +
              moment(allInfo.searchUpToDate).format('MMM D, YYYY')
          "
        />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="applicant-detail"
        :app_type="app_type"
      />
    </div>
  </div>
  <div v-if="allInfo.message.showErrorFlash">
    <ErrorFlashMessage
      message="Date Range is not valid, Please Enter Valid Date"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import AllLicensedApplications from "../ChildApplicationTypes/AllLicensedApplications.vue";
import applicationStatus from "../../Configurations/getApplicationStatus.js";

import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import filterApplication from "../../ChildComponents/FilteredDatas/FilterApplication.js";
import FilteredInfo from "../../ChildComponents/FilteredDatas/FilteredInfo.vue";
import moment from "moment";
import ReviewerNavBar from "../../ReviewerNavBar.vue";
import NothingToShow from "../../ChildComponents/NothingToShow.vue";
import Spinner from "@/sharedComponents/Spinner";
import store from "../../../../store";
import Title from "@/sharedComponents/TitleWithIllustration";

export default {
  computed: {
    moment: () => moment,
    getNewLicenseSuspended() {
      return store.getters[
        "reviewerNewLicense/getNewLicenseAllSuspendedSearched"
      ];
    },
    getNewLicenseCancelled() {
      return store.getters[
        "reviewerNewLicense/getNewLicenseAllCancelledSearched"
      ];
    },
    getRenewalSuspended() {
      return store.getters["reviewerRenewal/getRenewalAllSuspendedSearched"];
    },
    getRenewalCancelled() {
      return store.getters["reviewerRenewal/getRenewalAllCancelledSearched"];
    },
  },
  components: {
    ReviewerNavBar,
    ErrorFlashMessage,
    FilteredInfo,
    Spinner,
    NothingToShow,
    AllLicensedApplications,
    Title,
  },
  setup() {
    const store = useStore();
    let renewalSuspended = ref([]);
    let newLicenseSuspended = ref([]);
    let newLicenseCancelled = ref([]);
    let renewalCancelled = ref([]);

    let selectedTabClass = "py-2 px-6 bg-white rounded-t-lg mr-4";
    let notSelectedTabClass = "py-2 px-6 rounded-t-lg mr-4";

    let selectedTab = ref("New License");
    let message = ref("New License Suspended");
    let app_type = ref("New License");
    let app_value = ref("Suspended");

    let nothingToShowNewLicense = ref(false);
    let nothingToShowRenewal = ref(false);
    let nothingToShowGoodStanding = ref(false);

    let showLoadingNewLicenseSuspended = ref(false);
    let showLoadingRenewalSuspended = ref(false);
    let showLoadingNewLicenseCancelled = ref(false);
    let showLoadingRenewalCancelled = ref(false);
    let applicationTypes = ["New License", "Renewal"];

    let allInfo = ref({
      alreadyPushed: false,
      searchByInput: false,
      assignApplication: [],
      message: {
        showErrorFlash: false,
      },
      filteredByDate: [],
      searchFromDate: "",
      searchUpToDate: "",
      app_type: "",
    });

    const changeTab = (type, value) => {
      selectedTab.value = type + " " + value;
      message.value = `${type} ${value}`;
      app_type.value = type;
      app_value.value = value;
      type == "New License"
        ? (allInfo.value.assignApplication = newLicenseSuspended.value)
        : type == "Renewal"
        ? (allInfo.value.assignApplication = renewalSuspended.value)
        : (allInfo.value.assignApplication = newLicenseCancelled.value);

      for (let applicant in allInfo.value.assignApplication) {
        if (
          allInfo.value.assignApplication[applicant].applicationType ===
          undefined
        ) {
          allInfo.value.assignApplication[applicant].applicationType =
            allInfo.value.assignApplication[applicant].applicantType;
        }
      }
    };

    const filterAllLicensedApplication = () => {
      filterApplication(moment, allInfo.value);
    };

    const backClicked = () => {
      allInfo.value.searchByInput = false;
      allInfo.value.filteredByDate = [];
      allInfo.value.alreadyPushed = false;
      allInfo.value.searchFromDate = "";
      allInfo.value.searchUpToDate = "";
      allInfo.value.app_type = "";
    };

    const fetchNewLicenseSuspended = () => {
      showLoadingNewLicenseSuspended.value = true;
      const suspendedStatus = applicationStatus(store, "SUSP");
      store
        .dispatch(
          "reviewerNewLicense/getNewLicenseAllSuspended",
          suspendedStatus
        )
        .then((res) => {
          showLoadingNewLicenseSuspended.value = false;
          newLicenseSuspended.value =
            store.getters[
              "reviewerNewLicense/getNewLicenseAllSuspendedSearched"
            ];
          allInfo.value.assignApplication =
            store.getters[
              "reviewerNewLicense/getNewLicenseAllSuspendedSearched"
            ];

          for (let applicant in allInfo.value.assignApplication) {
            if (
              allInfo.value.assignApplication[applicant].applicationType ===
              undefined
            ) {
              allInfo.value.assignApplication[applicant].applicationType =
                allInfo.value.assignApplication[applicant].applicantType;
            }
          }
          if (newLicenseSuspended.value.length === 0) {
            nothingToShowNewLicense.value = true;
          }
        });
    };

    const fetchNewLicenseCancelled = () => {
      showLoadingNewLicenseCancelled.value = true;
      const cancelledStatus = applicationStatus(store, "CANC");
      store
        .dispatch(
          "reviewerNewLicense/getNewLicenseAllCancelled",
          cancelledStatus
        )
        .then((res) => {
          showLoadingNewLicenseCancelled.value = false;
          newLicenseCancelled.value =
            store.getters[
              "reviewerNewLicense/getNewLicenseAllCancelledSearched"
            ];
          if (newLicenseCancelled.value.length === 0) {
            nothingToShowGoodStanding.value = true;
          }
        });
    };

    const fetchRenewalSuspended = () => {
      showLoadingRenewalSuspended.value = true;
      const suspendedStatus = applicationStatus(store, "SUSP");
      store
        .dispatch("reviewerRenewal/getRenewalAllSuspended", suspendedStatus)
        .then((res) => {
          showLoadingRenewalSuspended.value = false;
          renewalSuspended.value =
            store.getters["reviewerRenewal/getRenewalAllSuspendedSearched"];
          if (renewalSuspended.value.length === 0) {
            nothingToShowRenewal.value = true;
          }
        });
    };

    const fetchRenewalCancelled = () => {
      showLoadingRenewalCancelled.value = true;
      const cancelledStatus = applicationStatus(store, "CANC");
      store
        .dispatch("reviewerRenewal/getRenewalAllCancelled", cancelledStatus)
        .then((res) => {
          showLoadingRenewalCancelled.value = false;
          renewalCancelled.value =
            store.getters[
              "reviewerGoodStanding/getRenewalAllCancelledSearched"
            ];
          if (renewalCancelled.value.length === 0) {
            nothingToShowGoodStanding.value = true;
          }
        });
    };
    onMounted(() => {
      fetchRenewalSuspended();
      fetchNewLicenseCancelled();
      fetchNewLicenseSuspended();
      fetchRenewalCancelled();
    });

    return {
      nothingToShowNewLicense,
      nothingToShowRenewal,
      nothingToShowGoodStanding,
      allInfo,
      showLoadingNewLicenseSuspended,
      showLoadingRenewalSuspended,
      showLoadingNewLicenseCancelled,
      showLoadingRenewalCancelled,
      filterAllLicensedApplication,
      backClicked,
      selectedTab,
      selectedTabClass,
      notSelectedTabClass,
      newLicenseSuspended,
      renewalSuspended,
      newLicenseCancelled,
      renewalCancelled,
      changeTab,
      message,
      app_type,
      app_value,
      applicationTypes,
    };
  },
};
</script>
<style scoped>
.tabColor {
  background-color: "red";
  color: "red";
}
</style>
