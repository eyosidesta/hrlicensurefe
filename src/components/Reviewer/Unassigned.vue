<template>
  <div>
    <ReviewerNavBar tab="Unassigned" />
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
        <button @click="filterUnassignedApplication">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="Unassigned" />
      </div>

      <div class="box">
        <div
          class="flex flex-wrap pb-medium rounded h-full"
          v-if="!showLoading"
        >
          <div
            class="container flip-box"
            v-for="item in unAssignedSearched"
            v-bind:key="item.applicationStatus.name"
            v-bind:value="item.id"
          >
            <div
              class="flex justify-center items-center ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100 flip-box-front"
            >
              <div
                class="p-4 w-48 h-64"
                @mouseover="hover = true"
                @mouseleave="hover = false"
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
                  unassigned
                </span>

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
                  <!-- {{ item.createdAt ? moment(item.createdAt).fromNow() : "-" }} -->
                </span>
              </div>
            </div>

            <div
              class="absolute inset-0 flex justify-center items-center z-10 ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100 flip-box-back"
            >
              <div
                class="p-4 w-48 h-64"
                @mouseover="hover = true"
                @mouseleave="hover = false"
                @Click="
                  detail(
                    `/admin/unassignedDetail`,
                    item.applicationType,
                    item.id,
                    item.applicant.id
                  )
                "
              >
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
                  <!-- {{ item.createdAt ? moment(item.createdAt).fromNow() : "-" }} -->
                </span>
                <div
                  class="flex ml-small w-32 pt-small justify-center content-center"
                >
                  <button
                    class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
                  >
                    Assign to
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <Title :message="'Unassigned Applicants'" />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="unassignedDetail"
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
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";

import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import FilteredInfo from "./ChildComponents/FilteredDatas/FilteredInfo.vue";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import filterApplication from "./ChildComponents/FilteredDatas/FilterApplication.js";

export default {
  components: {
    ReviewerNavBar,
    FilteredInfo,
    Title,
    Spinner,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    filterApplication: () => filterApplication,
    unAssignedSearched() {
      return store.getters["reviewer/getUnassignedSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let unassigned = ref({});
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

    const filterUnassignedApplication = () => {
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

    const fetchUnassignedApplications = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getUnassigned").then((res) => {
        showLoading.value = false;
        unassigned.value = store.getters["reviewer/getUnassignedSearched"];
        allInfo.value.assignApplication =
          store.getters["reviewer/getUnassignedSearched"];
        for (let unassignedUser in allInfo.value.assignApplication) {
          allInfo.value.assignApplication[unassignedUser].createdAt = moment(
            allInfo.value.assignApplication[unassignedUser].createdAt
          ).format("MMMM D, YYYY");
        }
        for (var prop in store.getters["reviewer/getUnassignedSearched"]) {
          if (
            store.getters["reviewer/getUnassignedSearched"][prop]
              .applicationType == "Renewal"
          ) {
            store.getters["reviewer/getUnassignedSearched"][
              prop
            ].newLicenseCode =
              store.getters["reviewer/getUnassignedSearched"][prop].renewalCode;
          }
          if (
            store.getters["reviewer/getUnassignedSearched"][prop]
              .applicationType == "Good Standing"
          ) {
            store.getters["reviewer/getUnassignedSearched"][
              prop
            ].newLicenseCode =
              store.getters["reviewer/getUnassignedSearched"][
                prop
              ].goodStandingCode;
          }
          if (
            store.getters["reviewer/getUnassignedSearched"][prop]
              .applicationType == "Verification"
          ) {
            store.getters["reviewer/getUnassignedSearched"][
              prop
            ].newLicenseCode =
              store.getters["reviewer/getUnassignedSearched"][
                prop
              ].verificationCode;
          }
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchUnassignedApplications();
    });

    return {
      unassigned,
      showLoading,
      applicationTypes,
      allInfo,
      filterUnassignedApplication,
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
.hoveredCard {
  background-color: white;
}
/* .b{
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -50%);
} */
.flip-box {
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;
}
.flip-box-front,
.flip-box-back {
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  backface-visibility: hidden;
}

.flip-box-front {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-front {
  transform: rotateY(-180deg);
  transform-style: preserve-3d;
}

.flip-box-back {
  /* position: absolute; */
  transform: rotateY(180deg);
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-back {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}
</style>
