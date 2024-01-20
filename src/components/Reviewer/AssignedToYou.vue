<template>
  <div>
    <ReviewerNavBar tab="AssignedToYou" />
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
        <Title message="Assigned To You" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <my-assigned :assignedToMe="getAssignedToYou" />
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
        <Title :message="'Assigned To You Applicants'" />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info :filteredData="allInfo.filteredByDate" type="detail" />
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
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";
import MyAssigned from "@/components/Reviewer/ChildComponents/MyAssigned";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
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
    NothingToShow,
    MyAssigned,
    FilteredInfo,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    getAssignedToYou() {
      return store.getters["reviewer/getAssignedToYouSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let assignedToyou = ref({});
    let nothingToShow = ref(false);
    let x = ref("");
    let userId = +localStorage.getItem("userId");
    let adminId = +localStorage.getItem("adminId");
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

    const fetchAssignedtoYou = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getAssignedToYou", adminId).then((res) => {
        showLoading.value = false;
        assignedToyou.value =
          store.getters["reviewer/getAssignedToYouSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewer/getAssignedToYouSearched"];
        if (assignedToyou.value.length !== 0) {
          for (var prop in store.getters["reviewer/getAssignedToYouSearched"]) {
            if (
              store.getters["reviewer/getAssignedToYouSearched"][prop]
                .applicationType == "Renewal"
            ) {
              store.getters["reviewer/getAssignedToYouSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getAssignedToYouSearched"][
                  prop
                ].renewalCode;
            }
            if (
              store.getters["reviewer/getAssignedToYouSearched"][prop]
                .applicationType == "Good Standing"
            ) {
              store.getters["reviewer/getAssignedToYouSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getAssignedToYouSearched"][
                  prop
                ].goodStandingCode;
            }
            if (
              store.getters["reviewer/getAssignedToYouSearched"][prop]
                .applicationType == "Verification"
            ) {
              store.getters["reviewer/getAssignedToYouSearched"][
                prop
              ].newLicenseCode =
                store.getters["reviewer/getAssignedToYouSearched"][
                  prop
                ].verificationCode;
            }
          }
        } else {
          nothingToShow.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchAssignedtoYou();
    });

    return {
      assignedToyou,
      nothingToShow,
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
