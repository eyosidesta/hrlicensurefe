<template>
  <div v-if="!allInfo.searchByInput">
    <div class="pl-12">
      <div>Filter By</div>
    </div>

    <div class="flex flex-wrap mb-medium pl-12 pt-1">
      <label class="text-primary-700">Type</label>
      <select class="max-w-3xl mr-2" v-model="allInfo.app_type">
        <option
          v-for="item in applicationTypes"
          v-bind:key="item.id"
          v-bind:value="item.name"
        >
          {{ item.name }}
        </option>
      </select>
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
      <Title message="On Review" />
    </div>
    <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
      <nothing-to-show :nothingToShow="nothingToShowonReview" />
      <confirm-review :confirmReview="getConfirmReview" />
    </div>
  </div>
  <div v-if="showLoading" class="flex justify-center justify-items-center">
    <Spinner />
  </div>
  <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
    <div class="flex pl-12 pt-tiny">
      <Title :message="'Applicants To Be Evaluated'" />
      <button @click="backClicked">back</button>
    </div>
    <filtered-info
      :filteredData="allInfo.filteredByDate"
      type="evaluateApplicationDetail"
    />
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
import { useRouter } from "vue-router";

import moment from "moment";

import Spinner from "@/sharedComponents/Spinner";

import store from "../../../../store";
import Title from "@/sharedComponents/TitleWithIllustration";
import ConfirmReview from "@/components/Reviewer/ChildComponents/ConfirmReview";
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";
import filterApplication from "../FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "../FilteredDatas/FilteredInfo.vue";

export default {
  computed: {
    moment: () => moment,
    getConfirmReview() {
      return store.getters["reviewer/getConfirmReviewSearched"];
    },
  },
  components: {
    Spinner,
    Title,
    ConfirmReview,
    NothingToShow,
    FilteredInfo,
    ErrorFlashMessage,
  },
  name: "ConfirmReviewContainer",
  setup() {
    const store = useStore();
    const router = useRouter();

    let onReview = ref({});
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowonReview = ref(false);
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

    const applicationTypes = ref([
      {
        id: 1,
        name: "",
      },
      {
        id: 2,
        name: "Verification",
      },
      {
        id: 3,
        name: "New License",
      },
      {
        id: 4,
        name: "Good Standing",
      },
      {
        id: 5,
        name: "Renewal",
      },
    ]);

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

    const fetchonReview = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getConfirmReview", adminId).then((res) => {
        showLoading.value = false;
        onReview.value = store.getters["reviewer/getConfirmReviewSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewer/getConfirmReviewSearched"];
        for (let applicant in allInfo.value.assignApplication) {
          if(allInfo.value.assignApplication[applicant].applicationType === undefined) {
            allInfo.value.assignApplication[applicant].applicationType = 
            allInfo.value.assignApplication[applicant].applicantType
          }
        }
        if (store.getters["reviewer/getConfirmReview"].length !== 0) {
          for (var prop in store.getters["reviewer/getConfirmReviewSearched"]) {
            if (onReview.value[prop].applicationType == "Renewal") {
              onReview.value[prop].newLicenseCode =
                onReview.value[prop].renewalCode;
            }
            if (onReview.value[prop].applicationType == "Good Standing") {
              onReview.value[prop].newLicenseCode =
                onReview.value[prop].goodStandingCode;
            }
            if (onReview.value[prop].applicationType == "Verification") {
              onReview.value[prop].newLicenseCode =
                onReview.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowonReview.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchonReview();
    });

    return {
      onReview,
      detail,
      nothingToShowonReview,
      allInfo,
      applicationTypes,
      showLoading,
      filterAssignedApplication,
      detail,
      backClicked,
    };
  },
};
</script>
