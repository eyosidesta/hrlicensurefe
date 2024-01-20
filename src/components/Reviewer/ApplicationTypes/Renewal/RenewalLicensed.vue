<template>
  <div>
    <!-- <reviewer-nav-bar tab="renewalLicensed" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
      <div class="pl-12">
        <div style="border-bottom: 2px solid #eaeaea">
          <ul class="flex cursor-pointer">
            <li
              :class="[
                selectedTab == 'Licensed'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              @click="changeTab('Licensed')"
              :style="[
                selectedTab == 'Licensed'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
            >
              Licensed
            </li>
            <li
              :class="[
                selectedTab == 'Suspended'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              :style="[
                selectedTab == 'Suspended'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
              @click="changeTab('Suspended')"
            >
              Suspended
            </li>
            <li
              :class="[
                selectedTab == 'Cancelled'
                  ? selectedTabClass
                  : notSelectedTabClass,
                'tabColor',
              ]"
              :style="[
                selectedTab == 'Cancelled'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
              @click="changeTab('Cancelled')"
            >
              Cancelled
            </li>
          </ul>
        </div>
      </div>
      <div class="pl-12">
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
        <button @click="filterLicensedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title :message="message" />
      </div>
      <!-- <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <licensed-applications :licensedApplication="getRenewalLicensed" app_type="Renewal" others_licensed="false"/>
      </div> -->
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="
          selectedTab == 'Licensed'
            ? !showLoadingLicensed
            : selectedTab == 'Suspended'
            ? !showLoadingSuspended
            : !showLoadingCancelled
        "
      >
        <nothing-to-show
          :nothingToShow="
            selectedTab == 'Licensed'
              ? nothingToShowLicensed
              : selectedTab == 'Suspended'
              ? nothingToShowSuspended
              : nothingToShowCancelled
          "
        />
        <licensed-applications
          :licensedApplication="
            selectedTab == 'Licensed'
              ? getRenewalLicensed
              : selectedTab == 'Suspended'
              ? getRenewalSuspended
              : getRenewalCancelled
          "
          app_type="Renewal"
          others_licensed="false"
        />
      </div>
    </div>
    <div
      v-if="
        selectedTab == 'Licensed'
          ? showLoadingLicensed
          : selectedTab == 'Suspended'
          ? showLoadingSuspended
          : showLoadingCancelled
      "
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
      <div class="flex pl-12 pt-tiny">
        <Title
        :message="
          'Licensed Applicants on Date Range ' + moment(allInfo.searchFromDate).format('MMM D, YYYY') + ' To ' + moment(allInfo.searchUpToDate).format('MMM D, YYYY')
        "
      />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="detail"
        app_type="Renewal"
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

import applicationStatus from "../../Configurations/getApplicationStatus.js";
import LicensedApplications from "../ChildApplicationTypes/LicensedApplications.vue"
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
    getRenewalLicensed() {
      return store.getters["reviewerRenewal/getRenewalLicensedSearched"];
    },
    getRenewalSuspended() {
      return store.getters["reviewerRenewal/getRenewalSuspendedSearched"];
    },
    getRenewalCancelled() {
      return store.getters["reviewerRenewal/getRenewalCancelledSearched"];
    },
  },
  components: {
    ReviewerNavBar,
    ErrorFlashMessage,
    FilteredInfo,
    Spinner,
    NothingToShow,
    LicensedApplications,
    Title,
  },
  setup() {
    const store = useStore();
    let renewalLicensed = ref([]);
    let renewalSuspended = ref([]);
    let renewalCancelled = ref([]);

    const adminId = +localStorage.getItem("adminId");

    let selectedTabClass = "py-2 px-6 bg-white rounded-t-lg mr-4";
    let notSelectedTabClass = "py-2 px-6 rounded-t-lg mr-4";

    let selectedTab = ref("Licensed");
    let message = ref("Renewal Licensed");

    let nothingToShowLicensed = ref(false);
    let nothingToShowSuspended = ref(false);
    let nothingToShowCancelled = ref(false);
    let showLoadingLicensed = ref(false);
    let showLoadingSuspended = ref(false);
    let showLoadingCancelled = ref(false);

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

    const changeTab = (type) => {
      selectedTab.value = type;
      message.value = `Renewal ${type}`;
      type == "Licensed"
        ? (allInfo.value.assignApplication = renewalLicensed.value)
        : type == "Suspended"
        ? (allInfo.value.assignApplication = renewalSuspended.value)
        : (allInfo.value.assignApplication = renewalCancelled.value);

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

    const filterLicensedApplication = () => {
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

    const fetchRenewalLicensed = () => {
      showLoadingLicensed.value = true;
      const approvedPaymentStatus = applicationStatus(store, "AP");
      const confirmedStatus = applicationStatus(store, "CONF");

      const approvedStatus = applicationStatus(store, "APP");
      const adminStatus = [
        adminId,
        approvedPaymentStatus,
        confirmedStatus,
        approvedStatus,
      ];
      store
        .dispatch("reviewerRenewal/getRenewalLicensed", adminStatus)
        .then((res) => {
          showLoadingLicensed.value = false;
          renewalLicensed.value =
            store.getters["reviewerRenewal/getRenewalLicensedSearched"];
          allInfo.value.assignApplication =
            store.getters["reviewerRenewal/getRenewalLicensedSearched"];
          for (let applicant in allInfo.value.assignApplication) {
            if (
              allInfo.value.assignApplication[applicant].applicationType ===
              undefined
            ) {
              allInfo.value.assignApplication[applicant].applicationType =
                allInfo.value.assignApplication[applicant].applicantType;
            }
          }
          if (renewalLicensed.value.length === 0) {
            nothingToShowLicensed.value = true;
          }
        });
    };

    const fetchRenewalSuspended = () => {
      showLoadingSuspended.value = true;

      const suspendedStatus = applicationStatus(store, "SUSP");
      const adminStatus = [
        adminId,
        suspendedStatus,
      ];
      store
        .dispatch("reviewerRenewal/getRenewalSuspended", adminStatus)
        .then((res) => {
          showLoadingSuspended.value = false;
          renewalSuspended.value =
            store.getters["reviewerRenewal/getRenewalSuspendedSearched"];
          if (renewalSuspended.value.length === 0) {
            nothingToShowSuspended.value = true;
          }
        });
    };

    const fetchRenewalCancelled = () => {
      showLoadingCancelled.value = true;

      const cancelledStatus = applicationStatus(store, "CANC");
      const adminStatus = [
        adminId,
        cancelledStatus,
      ];
      store
        .dispatch("reviewerRenewal/getRenewalCancelled", adminStatus)
        .then((res) => {
          showLoadingCancelled.value = false;
          renewalCancelled.value =
            store.getters["reviewerRenewal/getRenewalCancelledSearched"];
          if (renewalCancelled.value.length === 0) {
            nothingToShowCancelled.value = true;
          }
        });
    };
    onMounted(() => {
      fetchRenewalLicensed();
      fetchRenewalSuspended();
      fetchRenewalCancelled();
    });

    return {
      nothingToShowLicensed,
      nothingToShowSuspended,
      nothingToShowCancelled,
      allInfo,
      showLoadingLicensed,
      showLoadingSuspended,
      showLoadingCancelled,
      filterLicensedApplication,
      backClicked,
      selectedTabClass,
      selectedTab,
      notSelectedTabClass,
      message,
      changeTab,
    };
  },
};
</script>
