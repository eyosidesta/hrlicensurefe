<template>
  <div>
    <ReviewerNavBar tab="AllWork" />
    <div class="bg-lightBlueB-200 h-full">
      <div class="flex pl-12 pt-tiny">
        <Title message="Approved" />
      </div>
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="!showLoadingApproved"
      >
        <div class="pl-large w-52 h-26" v-if="nothingToAllApproved == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="(item, index) in getAllApproved"
          v-bind:key="index"
          v-bind:value="item.id"
        >
          <!-- <div
            v-if="index < 5" -->
          <div
            class="justify-center items-center mt-8 ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @click="
                detail('/admin/finishedDetail', item.applicationType, item.id)
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
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                <i class="fas fa-user-cog"></i> &nbsp;
                {{ item.reviewer.name ? item.reviewer.name : "-" }}
              </span>
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
        <!-- Second !-->
      </div>
      <div
        v-if="showLoadingApproved"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="Rejected" />
      </div>
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="!showLoadingRejected"
      >
        <div class="pl-large w-52 h-26" v-if="nothingToShowAllRejected == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="(item, index) in getAllRejected"
          v-bind:key="index"
          v-bind:value="item.id"
        >
          <!-- <div
            v-if="index < 5" -->
          <div
            class="justify-center items-center mt-8 ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @click="
                detail('/admin/finishedDetail', item.applicationType, item.id)
              "
            >
              <div class="flex content-center justify-center">
                <img
                  class="box-shadow-pop"
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                />
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
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                <i class="fas fa-user-cog"></i> &nbsp;
                {{ item.reviewer.name ? item.reviewer.name : "-" }}
              </span>
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
        <!-- Second !-->
      </div>
      <div
        v-if="showLoadingRejected"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="Under SuperVision" />
      </div>
      <div
        class="flex flex-wrap pb-medium rounded h-full"
        v-if="!showLoadingSuperVision"
      >
        <div
          class="pl-large w-52 h-26"
          v-if="nothingToShowAllUnderSuperVision == true"
        >
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="(item, index) in getAllUnderSuperVision"
          v-bind:key="index"
          v-bind:value="item.id"
        >
          <!-- <div
            v-if="index < 5" -->
          <div
            class="justify-center items-center mt-8 ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @click="
                detail('/admin/finishedDetail', item.applicationType, item.id)
              "
            >
              <div class="flex content-center justify-center">
                <img
                  class="box-shadow-pop"
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                />
              </div>
              <h4
                class="text-lightBlueB-500 mt-tiny flex justify-center content-center"
              >
                <b>
                  {{
                    item.applicant.profile.name +
                      " " +
                      item.applicant.profile.fatherName
                  }}
                </b>
              </h4>
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                <i class="fas fa-user-cog"></i> &nbsp;
                {{ item.reviewer.name ? item.reviewer.name : "-" }}
              </span>
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
        <!-- Second !-->
      </div>
      <div
        v-if="showLoadingSuperVision"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
    </div>
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

export default {
  components: { ReviewerNavBar, Title, Spinner },
  computed: {
    moment: () => moment,
    getAllApproved() {
      return store.getters["reviewer/getAllApprovedSearched"];
    },
    getRecentlyFinished() {
      return store.getters["reviewer/getRecentlyFinishedSearched"];
    },
    getAllRejected() {
      return store.getters["reviewer/getAllRejectedSearched"];
    },
    getAllUnderSuperVision() {
      return store.getters["reviewer/getAllUnderSuperVisionSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let adminId = +localStorage.getItem("adminId");
    let adminRole = localStorage.getItem("role");
    let nothingToAllApproved = ref(false);
    let nothingToShowAllRejected = ref(false);
    let nothingToShowAllUnderSuperVision = ref(false);

    let showLoadingApproved = ref(false);
    let showLoadingRejected = ref(false);
    let showLoadingSuperVision = ref(false);

    let allApproved = ref({});
    let allRejected = ref({});
    let allUnderSuperVision = ref({});

    const fetchRecentlyFinished = () => {
      showLoadingApproved.value = true;
      showLoadingRejected.value = true;
      showLoadingSuperVision.value = true;
      const adminData = [adminRole, adminId];
      store
        .dispatch("reviewer/getAllRecentlyFinished", adminData)
        .then((res) => {
          if (store.getters["reviewer/getAllApprovedSearched"].length == 0) {
            nothingToAllApproved.value = true;
          } else {
            allApproved.value =
              store.getters["reviewer/getAllApprovedSearched"];
            for (var prop in store.getters["reviewer/getAllApprovedSearched"]) {
              if (allApproved.value[prop].applicationType == "Renewal") {
                allApproved.value[prop].newLicenseCode =
                  allApproved.value[prop].renewalCode;
              }
              if (allApproved.value[prop].applicationType == "Good Standing") {
                allApproved.value[prop].newLicenseCode =
                  allApproved.value[prop].goodStandingCode;
              }
              if (allApproved.value[prop].applicationType == "Verification") {
                allApproved.value[prop].newLicenseCode =
                  allApproved.value[prop].verificationCode;
              }
            }
          }
          if (store.getters["reviewer/getAllRejectedSearched"].length == 0) {
            nothingToShowAllRejected.value = true;
          } else {
            allRejected.value =
              store.getters["reviewer/getAllRejectedSearched"];
            for (var prop in store.getters["reviewer/getAllRejectedSearched"]) {
              if (allRejected.value[prop].applicationType == "Renewal") {
                allRejected.value[prop].newLicenseCode =
                  allRejected.value[prop].renewalCode;
              }
              if (allRejected.value[prop].applicationType == "Good Standing") {
                allRejected.value[prop].newLicenseCode =
                  allRejected.value[prop].goodStandingCode;
              }
              if (allRejected.value[prop].applicationType == "Verification") {
                allRejected.value[prop].newLicenseCode =
                  allRejected.value[prop].verificationCode;
              }
            }
          }
          if (
            store.getters["reviewer/getAllUnderSuperVisionSearched"].length == 0
          ) {
            nothingToShowAllUnderSuperVision.value = true;
          } else {
            allUnderSuperVision.value =
              store.getters["reviewer/getAllUnderSuperVisionSearched"];
            for (var prop in store.getters[
              "reviewer/getAllUnderSuperVisionSearched"
            ]) {
              if (
                allUnderSuperVision.value[prop].applicationType == "Renewal"
              ) {
                allUnderSuperVision.value[prop].newLicenseCode =
                  allUnderSuperVision.value[prop].renewalCode;
              }
              if (
                allUnderSuperVision.value[prop].applicationType ==
                "Good Standing"
              ) {
                allUnderSuperVision.value[prop].newLicenseCode =
                  allUnderSuperVision.value[prop].goodStandingCode;
              }
              if (
                allUnderSuperVision.value[prop].applicationType ==
                "Verification"
              ) {
                allUnderSuperVision.value[prop].newLicenseCode =
                  allUnderSuperVision.value[prop].verificationCode;
              }
            }
          }
          showLoadingApproved.value = false;
          showLoadingRejected.value = false;
          showLoadingSuperVision.value = false;
        });
    };

    const detail = (data, appilcationType, appilcationId, applicantId) => {
      const url = data + "/" + appilcationType + "/" + appilcationId;
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
      nothingToAllApproved,
      nothingToShowAllRejected,
      nothingToShowAllUnderSuperVision,
      allApproved,
      allRejected,
      allUnderSuperVision,
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
