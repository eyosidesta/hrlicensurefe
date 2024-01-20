<template>
  <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
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
      <button @click="filterUnconfirmedApplication">
        Filter
      </button>
    </div>
    <div class="flex pl-12 pt-tiny">
      <Title message="All Unconfirmed" />
    </div>
    <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
      <nothing-to-show :nothingToShow="nothingToShowunconfirmed" />
      <others-unconfirmed :othersUnconfirmed="getunconfirmed" />
    </div>
  </div>
  <div v-if="showLoading" class="flex justify-center justify-items-center">
    <Spinner />
  </div>
  <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
    <div class="flex pl-12 pt-tiny">
      <Title :message="'Unconfirmed Applicants'" />
      <button @click="backClicked">back</button>
    </div>
    <filtered-info :filteredData="allInfo.filteredByDate" type="othersUnconfirmedDetail" />
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
import OthersUnconfirmed from "@/components/Reviewer/ChildComponents/OthersUnconfirmed";
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";
import filterApplication from "../FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "../FilteredDatas/FilteredInfo.vue";

export default {
  computed: {
    moment: () => moment,
    getunconfirmed() {
      return store.getters["reviewer/getOthersUnconfirmedSearched"];
    },
  },
  components: {
    Spinner,
    Title,
    OthersUnconfirmed,
    NothingToShow,
    ErrorFlashMessage,
    FilteredInfo,
  },
  name: "OthersUnconfirmedContainer",
  setup() {
    const store = useStore();
    const router = useRouter();

    let unconfirmed = ref({});
    let adminRole = localStorage.getItem("role");
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowunconfirmed = ref(false);
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

    const filterUnconfirmedApplication = () => {
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

    const fetchunconfirmed = () => {
      showLoading.value = true;
      const adminData = [adminRole, adminId];
      store.dispatch("reviewer/getAllUnconfirmed", adminData).then((res) => {
        showLoading.value = false;
        unconfirmed.value =
          store.getters["reviewer/getOthersUnconfirmedSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewer/getOthersUnconfirmedSearched"];
        for (let unconfirmedUser in allInfo.value.assignApplication) {
          allInfo.value.assignApplication[unconfirmedUser].createdAt = moment(
            allInfo.value.assignApplication[unconfirmedUser].createdAt
          ).format("MMMM D, YYYY");
        }
        if (store.getters["reviewer/getOthersUnconfirmed"].length !== 0) {
          for (var prop in store.getters[
            "reviewer/getOthersUnconfirmedSearched"
          ]) {
            if (unconfirmed.value[prop].applicationType == "Renewal") {
              unconfirmed.value[prop].newLicenseCode =
                unconfirmed.value[prop].renewalCode;
            }
            if (unconfirmed.value[prop].applicationType == "Good Standing") {
              unconfirmed.value[prop].newLicenseCode =
                unconfirmed.value[prop].goodStandingCode;
            }
            if (unconfirmed.value[prop].applicationType == "Verification") {
              unconfirmed.value[prop].newLicenseCode =
                unconfirmed.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowunconfirmed.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchunconfirmed();
    });

    return {
      unconfirmed,
      nothingToShowunconfirmed,
      allInfo,
      applicationTypes,
      showLoading,
      filterUnconfirmedApplication,
      detail,
      backClicked,
    };
  },
};
</script>
