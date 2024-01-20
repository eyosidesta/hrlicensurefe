<template>
  <div>
    <!-- <reviewer-nav-bar tab="renewalAllLicensed" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
      <div class="pl-12">
        <div style="border-bottom: 2px solid #eaeaea">
          <ul class="flex cursor-pointer">
            <li
              :class="[
                selectedTab == 'New License'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              @click="changeTab('New License')"
              :style="[
                selectedTab == 'New License'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
            >
              New License
            </li>
            <li
              :class="[
                selectedTab == 'Renewal'
                  ? selectedTabClass
                  : notSelectedTabClass,
              ]"
              :style="[
                selectedTab == 'Renewal'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
              @click="changeTab('Renewal')"
            >
              Renewal
            </li>
            <li
              :class="[
                selectedTab == 'Good Standing'
                  ? selectedTabClass
                  : notSelectedTabClass,
                'tabColor',
              ]"
              :style="[
                selectedTab == 'Good Standing'
                  ? 'background-color: white'
                  : 'background-color: #C3DBD9',
              ]"
              @click="changeTab('Good Standing')"
            >
              Good Standing
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
            ? !showLoadingNewLicense
            : selectedTab == 'Renewal'
            ? !showLoadingRenewal
            : !showLoadingGoodStanding
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
            selectedTab == 'New License'
              ? getNewLicenseAllLicensed
              : selectedTab == 'Renewal'
              ? getRenewalAllLicensed
              : getGoodStandingAllLicensed
          "
          :app_type="app_type"
          others_licensed="false"
        />
      </div>
    </div>
    <div
      v-if="
        selectedTab == 'New License'
          ? showLoadingNewLicense
          : selectedTab == 'Renewal'
          ? showLoadingRenewal
          : showLoadingGoodStanding
      "
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
      <div class="flex pl-12 pt-tiny">
        <Title
          :message="
            'All Licensed Applicants on Date Range ' +
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
    getNewLicenseAllLicensed() {
      return store.getters[
        "reviewerNewLicense/getNewLicenseAllLicensedSearched"
      ];
    },
    getRenewalAllLicensed() {
      return store.getters["reviewerRenewal/getRenewalAllLicensedSearched"];
    },
    getGoodStandingAllLicensed() {
      return store.getters[
        "reviewerGoodStanding/getGoodStandingAllLicensedSearched"
      ];
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
    let renewalAllLicensed = ref([]);
    let newLicenseAllLicensed = ref([]);
    let goodStandingAllLicensed = ref([]);

    let selectedTabClass = "py-2 px-6 bg-white rounded-t-lg mr-4";
    let notSelectedTabClass = "py-2 px-6 rounded-t-lg mr-4";

    let selectedTab = ref("New License");
    let message = ref("New License All Licensed");
    let app_type = ref("New License");

    let nothingToShowNewLicense = ref(false);
    let nothingToShowRenewal = ref(false);
    let nothingToShowGoodStanding = ref(false);

    let showLoadingNewLicense = ref(false);
    let showLoadingRenewal = ref(false);
    let showLoadingGoodStanding = ref(false);

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
      message.value = `${type} All Licensed`;
      app_type.value = type;
      type == "New License"
        ? (allInfo.value.assignApplication = newLicenseAllLicensed.value)
        : type == "Renewal"
        ? (allInfo.value.assignApplication = renewalAllLicensed.value)
        : (allInfo.value.assignApplication = goodStandingAllLicensed.value);

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

    const fetchNewLicenseAllLicensed = () => {
      showLoadingNewLicense.value = true;
      store
        .dispatch("reviewerNewLicense/getNewLicenseAllLicensed")
        .then((res) => {
          showLoadingNewLicense.value = false;
          newLicenseAllLicensed.value =
            store.getters[
              "reviewerNewLicense/getNewLicenseAllLicensedSearched"
            ];
          allInfo.value.assignApplication =
            store.getters[
              "reviewerNewLicense/getNewLicenseAllLicensedSearched"
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
          if (newLicenseAllLicensed.value.length === 0) {
            nothingToShowNewLicense.value = true;
          }
        });
    };

    const fetchRenewalAllLicensed = () => {
      showLoadingRenewal.value = true;
      store.dispatch("reviewerRenewal/getRenewalAllLicensed").then((res) => {
        showLoadingRenewal.value = false;
        renewalAllLicensed.value =
          store.getters["reviewerRenewal/getRenewalAllLicensedSearched"];
        if (renewalAllLicensed.value.length === 0) {
          nothingToShowRenewal.value = true;
        }
      });
    };

    const fetchGoodStandingAllLicensed = () => {
      showLoadingGoodStanding.value = true;
      store
        .dispatch("reviewerGoodStanding/getGoodStandingAllLicensed")
        .then((res) => {
          showLoadingGoodStanding.value = false;
          goodStandingAllLicensed.value =
            store.getters[
              "reviewerGoodStanding/getGoodStandingAllLicensedSearched"
            ];
          if (goodStandingAllLicensed.value.length === 0) {
            nothingToShowGoodStanding.value = true;
          }
        });
    };
    onMounted(() => {
      fetchRenewalAllLicensed();
      fetchNewLicenseAllLicensed();
      fetchGoodStandingAllLicensed();
    });

    return {
      nothingToShowNewLicense,
      nothingToShowRenewal,
      nothingToShowGoodStanding,
      allInfo,
      showLoadingNewLicense,
      showLoadingRenewal,
      showLoadingGoodStanding,
      filterAllLicensedApplication,
      backClicked,
      selectedTab,
      selectedTabClass,
      notSelectedTabClass,
      newLicenseAllLicensed,
      renewalAllLicensed,
      goodStandingAllLicensed,
      changeTab,
      message,
      app_type,
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
