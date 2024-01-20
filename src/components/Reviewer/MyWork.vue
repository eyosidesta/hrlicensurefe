<template>
  <div>
    <ReviewerNavBar tab="MyWork" />
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
        <Title message="Confirmed" />
      </div>
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="!showLoadingApproved"
      >
        <div class="pl-large w-52 h-26" v-if="nothingToShowApproved == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="(item, index) in getApproved"
          v-bind:key="index"
          v-bind:value="item.id"
        >
          <div
            class="justify-center items-center mt-8 ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @click="
                detail(
                  '/admin/finishedDetail',
                  item.applicationType,
                  item.id,
                  'approved'
                )
              "
            >
              <div class="flex content-center justify-center">
                <span
                  v-if="
                    item.applicant.profile.photo !== '' &&
                      item.applicant.profile.photo !== null
                  "
                >
                  <img
                    :src="item.applicant.profile.photo"
                    alt="profile picture"
                    class="w-20 h-12"
                  />
                </span>
                <span v-else>
                  <img
                    class="box-shadow-pop"
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                  />
                </span>
              </div>
              <h4
                class="text-lightBlueB-500 mt-tiny flex justify-center content-center"
              >
                <b>{{
                  item.applicant.profile.name +
                    " " +
                    item.applicant.profile.fatherName
                }}</b>
              </h4>
              <br />
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                {{ item.applicationType }}
              </span>
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                {{ item.newLicenseCode ? item.newLicenseCode : "-" }}
              </span>
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-end content-center"
              >
                {{ item.createdAt ? moment(item.createdAt).fromNow() : "-" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showLoadingApproved" class="flex content-center justify-center">
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="allInfo.searchByInput">
      <div class="flex pl-12 pt-tiny">
        <Title :message="'confirmed Applicants'" />
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";

import { ref, onMounted } from "vue";

import store from "../../store";
import Spinner from "@/sharedComponents/Spinner";

import filterApplication from "./ChildComponents/FilteredDatas/FilterApplication.js";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import FilteredInfo from "./ChildComponents/FilteredDatas/FilteredInfo.vue";

export default {
  components: {
    ReviewerNavBar,
    Title,
    Spinner,
    FilteredInfo,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    getApproved() {
      return store.getters["reviewer/getConfirmedSearched"];
    },
    getRecentlyFinished() {
      return store.getters["reviewer/getRecentlyFinishedSearched"];
    },
    getRejected() {
      return store.getters["reviewer/getRejectedSearched"];
    },
    getUnderSuperVision() {
      return store.getters["reviewer/getUnderSuperVisionSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let adminId = +localStorage.getItem("adminId");

    let showLoadingApproved = ref(false);
    let showLoadingRejected = ref(false);
    let showLoadingSuperVision = ref(false);

    let nothingToShowApproved = ref(false);
    let nothingToShowRejected = ref(false);
    let nothingToShowUnderSuperVision = ref(false);

    let approved = ref({});
    let rejected = ref({});
    let underSuperVision = ref({});

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

    const fetchRecentlyFinished = () => {
      showLoadingApproved.value = true;
      showLoadingRejected.value = true;
      showLoadingSuperVision.value = true;
      store.dispatch("reviewer/getConfirmed", adminId).then((res) => {
        showLoadingApproved.value = false;
        showLoadingRejected.value = false;
        showLoadingSuperVision.value = false;
        if (store.getters["reviewer/getConfirmedSearched"].length == 0) {
          nothingToShowApproved.value = true;
        } else {
          approved.value = store.getters["reviewer/getConfirmedSearched"];
          allInfo.value.assignApplication =
            store.getters["reviewer/getConfirmedSearched"];
          for (var prop in store.getters["reviewer/getConfirmedSearched"]) {
            if (approved.value[prop].applicationType == "Renewal") {
              approved.value[prop].newLicenseCode =
                approved.value[prop].renewalCode;
            }
            if (approved.value[prop].applicationType == "Good Standing") {
              approved.value[prop].newLicenseCode =
                approved.value[prop].goodStandingCode;
            }
            if (approved.value[prop].applicationType == "Verification") {
              approved.value[prop].newLicenseCode =
                approved.value[prop].verificationCode;
            }
          }
        }
      });
    };

    const detail = (data, appilcationType, appilcationId, status) => {
      const url =
        data + "/" + appilcationType + "/" + appilcationId + "/" + status;
      router.push(url);
    };

    onMounted(() => {
      fetchRecentlyFinished();
    });

    return {
      detail,
      showLoadingApproved,
      showLoadingRejected,
      showLoadingSuperVision,
      nothingToShowApproved,
      nothingToShowRejected,
      nothingToShowUnderSuperVision,
      approved,
      rejected,
      underSuperVision,
      allInfo,
      applicationTypes,
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
