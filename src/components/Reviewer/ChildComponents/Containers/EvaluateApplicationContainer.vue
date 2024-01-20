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
      <Title message="Evaluate Review" />
    </div>
    <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
      <nothing-to-show :nothingToShow="nothingToShowevaluateApplication" />
      <evaluate-application :evaluateReview="getEvalauteReview" />
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
import EvaluateApplication from "@/components/Reviewer/ChildComponents/EvaluateApplication";
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";
import filterApplication from "../FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "../FilteredDatas/FilteredInfo.vue";

export default {
  computed: {
    moment: () => moment,
    getEvalauteReview() {
      return store.getters["reviewer/getEvaluateReviewerSearched"];
    },
  },
  components: {
    Spinner,
    Title,
    EvaluateApplication,
    NothingToShow,
    FilteredInfo,
    ErrorFlashMessage,
  },
  name: "EvaluateApplicationContainer",
  setup() {
    const store = useStore();
    const router = useRouter();

    let evaluateApplication = ref({});
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowevaluateApplication = ref(false);
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

    const fetchevaluateApplication = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getEvaluateReviewer", adminId).then((res) => {
        showLoading.value = false;
        evaluateApplication.value =
          store.getters["reviewer/getEvaluateReviewerSearched"];

        allInfo.value.assignApplication =
          store.getters["reviewer/getEvaluateReviewerSearched"];
        for (let applicant in allInfo.value.assignApplication) {
          if(allInfo.value.assignApplication[applicant].applicationType === undefined) {
            allInfo.value.assignApplication[applicant].applicationType = 
            allInfo.value.assignApplication[applicant].applicantType
          }
        }
        if (
          store.getters["reviewer/getEvaluateReviewerSearched"].length !== 0
        ) {
          for (var prop in store.getters[
            "reviewer/getEvaluateReviewerSearched"
          ]) {
            if (evaluateApplication.value[prop].applicationType == "Renewal") {
              evaluateApplication.value[prop].newLicenseCode =
                evaluateApplication.value[prop].renewalCode;
            }
            if (
              evaluateApplication.value[prop].applicationType == "Good Standing"
            ) {
              evaluateApplication.value[prop].newLicenseCode =
                evaluateApplication.value[prop].goodStandingCode;
            }
            if (
              evaluateApplication.value[prop].applicationType == "Verification"
            ) {
              evaluateApplication.value[prop].newLicenseCode =
                evaluateApplication.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowevaluateApplication.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchevaluateApplication();
    });

    return {
      evaluateApplication,
      nothingToShowevaluateApplication,
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
