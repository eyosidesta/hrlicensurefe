<template>
  <div>
    <ReviewerNavBar tab="Unfinished" />
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
        <button @click="filterAssignedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="Unfinished" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShowUnfinished" />
        <my-unfinished :unFinishedSearched="getUnfinished" />
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
        <Title :message="'Unfinished Applicants'" />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="unfinishedDetail"
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
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import MyUnfinished from "./HomeComponents/MyUnfinished.vue";
import NothingToShow from "./ChildComponents/NothingToShow.vue";
import { useStore } from "vuex";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import store from "../../store";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import filterApplication from "./ChildComponents/FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "./ChildComponents/FilteredDatas/FilteredInfo.vue";

export default {
  components: {
    ReviewerNavBar,
    Title,
    Spinner,
    MyUnfinished,
    NothingToShow,
    FilteredInfo,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    getUnfinished() {
      return store.getters["reviewer/getUnfinishedSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let unfinished = ref({});
    let x = ref([]);
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowUnfinished = ref(false);
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

    const fetchUnfinished = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getUnfinished", adminId).then((res) => {
        showLoading.value = false;
        unfinished.value = store.getters["reviewer/getUnfinishedSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewer/getUnfinishedSearched"];
        if (store.getters["reviewer/getUnfinished"].length !== 0) {
          for (var prop in store.getters["reviewer/getUnfinishedSearched"]) {
            if (
              store.getters["reviewer/getUnfinishedSearched"][prop]
                .applicationType == "Renewal"
            ) {
              store.getters["reviewer/getUnfinishedSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getUnfinishedSearched"][
                  prop
                ].renewalCode;
            }
            if (
              store.getters["reviewer/getUnfinishedSearched"][prop]
                .applicationType == "Good Standing"
            ) {
              store.getters["reviewer/getUnfinishedSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getUnfinishedSearched"][
                  prop
                ].goodStandingCode;
            }
            if (
              store.getters["reviewer/getUnfinishedSearched"][prop]
                .applicationType == "Verification"
            ) {
              store.getters["reviewer/getUnfinishedSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getUnfinishedSearched"][
                  prop
                ].verificationCode;
            }
          }
        } else {
          nothingToShowUnfinished.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchUnfinished();
    });

    return {
      unfinished,
      nothingToShowUnfinished,
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
<style scoped>
img {
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  border-color: steelblue;
  background-color: steelblue;
}
.container {
  cursor: pointer;
}
</style>
