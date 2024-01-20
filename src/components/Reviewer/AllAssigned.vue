<template>
  <div>
    <ReviewerNavBar tab="AssignedToAll" />
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
        <button @click="filterAllAssignedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="Assigned To Others" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <div class="pl-large w-52 h-26" v-if="nothingToShow == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="item in getAllassignedToOthers"
          v-bind:key="item.applicationStatus.name"
          v-bind:value="item.id"
        >
          <div
            class="flex justify-center items-center ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @Click="
                detail(
                  `/admin/detail`,
                  item.applicationType,
                  item.id,
                  item.applicant.id
                )
              "
            >
              <div class="flex content-center justify-center">
                <!-- <img class="box-shadow-pop" v-bind:src="item.picture.large" /> -->
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
                  item.applicant.profile.name
                    ? item.applicant.profile.name +
                      " " +
                      item.applicant.profile.fatherName
                    : "-"
                }}</b>
              </h4>
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                <i class="fas fa-user-cog"></i> &nbsp;
                {{ item.reviewer.name ? item.reviewer.name : "-" }}
              </span>
              <!-- <h6
                class="text-lightBlueB-500 mt-tiny flex justify-center content-center">
                {{ item.createdAt ? item.createdAt : "-" }}
              </h6> -->
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                {{ item.applicationType ? item.applicationType : "-" }}
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
        <!-- Second !-->
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
        <Title :message="'Assigned To Others Applicants'" />
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
    FilteredInfo,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    getAllassignedToOthers() {
      return store.getters["reviewer/getAssignedForEveryOneSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let assignedToOthers = ref({});
    let nothingToShow = ref(false);
    let showLoading = ref(false);
    let x = ref("");
    let userId = +localStorage.getItem("userId");
    let adminId = +localStorage.getItem("adminId");
    let adminRole = localStorage.getItem("role");

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

    const filterAllAssignedApplication = () => {
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

    const fetchassignedToOthers = () => {
      const adminData = [adminRole, adminId];
      showLoading.value = true;
      store
        .dispatch("reviewer/getAssignedToEveryOne", adminData)
        .then((res) => {
          showLoading.value = false;
          // if (res.status != "Error") {
          assignedToOthers.value =
            store.getters["reviewer/getAssignedForEveryOneSearched"];
          allInfo.value.assignApplication =
            store.getters["reviewer/getAssignedForEveryOneSearched"];
          for (let unassignedUser in allInfo.value.assignApplication) {
            allInfo.value.assignApplication[unassignedUser].createdAt = moment(
              allInfo.value.assignApplication[unassignedUser].createdAt
            ).format("MMMM D, YYYY");
          }
          if (assignedToOthers.value.length !== 0) {
            for (var prop in store.getters[
              "reviewer/getAssignedForEveryOneSearched"
            ]) {
              if (
                store.getters["reviewer/getAssignedForEveryOneSearched"][prop]
                  .applicationType == "Renewal"
              ) {
                store.getters["reviewer/getAssignedForEveryOneSearched"][
                  prop
                ].newLicenseCode =
                  store.getters["reviewer/getAssignedForEveryOneSearched"][
                    prop
                  ].renewalCode;
              }
              if (
                store.getters["reviewer/getAssignedForEveryOneSearched"][prop]
                  .applicationType == "Good Standing"
              ) {
                store.getters["reviewer/getAssignedForEveryOneSearched"][
                  prop
                ].newLicenseCode =
                  store.getters["reviewer/getAssignedForEveryOneSearched"][
                    prop
                  ].goodStandingCode;
              }
              if (
                store.getters["reviewer/getAssignedForEveryOneSearched"][prop]
                  .applicationType == "Verification"
              ) {
                store.getters["reviewer/getAssignedForEveryOneSearched"][
                  prop
                ].newLicenseCode =
                  store.getters["reviewer/getAssignedForEveryOneSearched"][
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
      fetchassignedToOthers();
    });

    return {
      assignedToOthers,
      nothingToShow,
      showLoading,
      adminRole,
      applicationTypes,
      allInfo,
      detail,
      filterAllAssignedApplication,
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
