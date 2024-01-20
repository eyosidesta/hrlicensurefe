<template>
  <div>
    <!-- <reviewer-nav-bar tab="goodStandingOthersUnfinished" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
      <div class="pl-12">
        <div>Filter By</div>
      </div>

      <div class="flex flex-wrap mb-medium pl-12 pt-1">
        <!-- <label class="text-primary-700">Type</label> -->
        <!-- <select class="max-w-3xl mr-2" v-model="allInfo.app_type">
          <option
            v-for="item in applicationTypes"
            v-bind:key="item.id"
            v-bind:value="item.name"
          >
            {{ item.name }}
          </option>
        </select> -->
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
        <Title message="Others Good Standing Unfinished" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <unfinished-applications :unfinishedApplication="getOthersGoodStandingUnfinished" app_type="Good Standing" others_unfinished="true"/>
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
          'Unfinished Applicants on Date Range ' + moment(allInfo.searchFromDate).format('MMM D, YYYY') + ' To ' + moment(allInfo.searchUpToDate).format('MMM D, YYYY')
        "
      />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="unfinishedDetail"
        app_type="Good Standing"
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
import moment from "moment";

import applicationStatus from "../../Configurations/getApplicationStatus.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import filterApplication from "../../ChildComponents/FilteredDatas/FilterApplication.js";
import FilteredInfo from "../../ChildComponents/FilteredDatas/FilteredInfo.vue";
import NothingToShow from "../../ChildComponents/NothingToShow.vue";
import ReviewerNavBar from "../../ReviewerNavBar.vue";
import Spinner from "@/sharedComponents/Spinner";
import store from "../../../../store";
import Title from "@/sharedComponents/TitleWithIllustration";
import UnfinishedApplications from "../ChildApplicationTypes/UnfinishedApplications.vue"

export default {
  computed: {
    moment: () => moment,
    getOthersGoodStandingUnfinished() {
      return store.getters["reviewerGoodStanding/getGoodStandingOthersUnfinishedSearched"];
    },
  },
  components: {
    ReviewerNavBar,
    ErrorFlashMessage,
    FilteredInfo,
    Spinner,
    NothingToShow,
    UnfinishedApplications,
    Title,
  },
  setup() {
    const store = useStore();
    let goodStandingUnfinished = ref([]);
    
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

    const fetchGoodStandingUnfinished = () => {
      showLoading.value = true;
      const statusId = applicationStatus(store, 'REVDRA');
      const adminStatus = [statusId, adminId];
      store.dispatch("reviewerGoodStanding/getGoodStandingOthersUnfinished", adminStatus).then((res) => {
        showLoading.value = false;
        goodStandingUnfinished.value =
          store.getters["reviewerGoodStanding/getGoodStandingOthersUnfinishedSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewerGoodStanding/getGoodStandingOthersUnfinishedSearched"];

        for (let applicant in allInfo.value.assignApplication) {
          if (
            allInfo.value.assignApplication[applicant].applicationType ===
            undefined
          ) {
            allInfo.value.assignApplication[applicant].applicationType =
              allInfo.value.assignApplication[applicant].applicantType;
          }
        }
        if (store.getters["reviewerGoodStanding/getGoodStandingOthersUnfinished"].length === 0) {
          nothingToShow.value = true;
        }
      });
    };
    onMounted(() => {
      fetchGoodStandingUnfinished();
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
