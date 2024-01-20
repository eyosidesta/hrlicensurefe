<template>
  <div>
    <!-- <reviewer-nav-bar tab="newLicenseAssignedToOthers" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
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
        <button @click="filterAssignedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="New License Assigned To Others" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <assigned-applications :assignedApplication="getNewLicenseAssigned" app_type="New License" assigned_to_others="true"/>
      </div>
    </div>
    <div
      v-if="showLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
      <div class="flex pl-12 pt-tiny">
        <Title
        :message="
          'Assigned Applicants on Date Range ' + moment(allInfo.searchFromDate).format('MMM D, YYYY') + ' To ' + moment(allInfo.searchUpToDate).format('MMM D, YYYY')
        "
      />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="detail"
        app_type="New License"
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
import Title from "@/sharedComponents/TitleWithIllustration";

import applicationStatus from "../../Configurations/getApplicationStatus.js";
import ReviewerNavBar from "../../ReviewerNavBar.vue";
import AssignedApplications from "../ChildApplicationTypes/AssignedApplications.vue"
import NothingToShow from "../../ChildComponents/NothingToShow.vue";
import { useStore } from "vuex";
import store from "../../../../store";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import filterApplication from "../../ChildComponents/FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "../../ChildComponents/FilteredDatas/FilteredInfo.vue";


export default {
  computed: {
    moment: () => moment,
    getNewLicenseAssigned() {
      return store.getters["reviewerNewLicense/getNewLicenseAssignedToOthersSearched"];
    },
  },
  components: {
    ReviewerNavBar,
    ErrorFlashMessage,
    FilteredInfo,
    Spinner,
    NothingToShow,
    AssignedApplications,
    Title,
  },
  setup() {
    const store = useStore();
    let newLicenseAssigned = ref([]);

    const adminId = +localStorage.getItem("adminId");

    let nothingToShow = ref(false);
    let showLoading = ref(false);

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

    const filterAssignedApplication = () => {
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

    const fetchNewLicenseAssigned = () => {
      showLoading.value = true;
      const statusId = applicationStatus(store, 'IRV');
      const adminStatus = [statusId, adminId];
      store.dispatch("reviewerNewLicense/getNewLicenseOthersAssigned", adminStatus).then((res) => {
        showLoading.value = false;
        newLicenseAssigned.value =
          store.getters["reviewerNewLicense/getNewLicenseAssignedToOthersSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewerNewLicense/getNewLicenseAssignedToOthersSearched"];

        for (let applicant in allInfo.value.assignApplication) {
          if (
            allInfo.value.assignApplication[applicant].applicationType ===
            undefined
          ) {
            allInfo.value.assignApplication[applicant].applicationType =
              allInfo.value.assignApplication[applicant].applicantType;
          }
        }
        if (store.getters["reviewerNewLicense/getNewLicenseAssignedToOthers"].length === 0) {
          nothingToShow.value = true;
        }
      });
    };
    onMounted(() => {
      fetchNewLicenseAssigned();
    });

    return {
      nothingToShow,
      allInfo,
      showLoading,
      filterAssignedApplication,
      backClicked,
    };
  },
};
</script>
