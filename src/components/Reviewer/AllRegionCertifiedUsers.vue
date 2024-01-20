<template>
  <div>
    <ReviewerNavBar tab="allCertifiedUsers" />
    <div class="bg-lightBlueB-200 h-full" v-if="!searchedByDate">
      <div class="pl-12">
        <div>Filter By Date Range</div>
      </div>
      <div class="flex mb-medium w-1/6 pl-12 pt-1">
        <label class="text-primary-700 mr-2">From</label>
        <input
          class="max-w-3xl mr-5"
          type="date"
          v-model="searchCertifiedFrom"
        />
        <label class="text-primary-700 mr-2">To</label>
        <input class="max-w-3xl mr-5" type="date" v-model="searchCertifiedTo" />
        <button @click="filterCertifiedsByDateRange">
          Filter
        </button>
      </div>
      <div class="flex pl-12 pt-tiny">
        <Title message="All Region Licensed Users" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <div
          class="pl-large w-52 h-26"
          v-if="nothingToShowAllCertified == true"
        >
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="item in getAllCertifiedUsers"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          <div
            class="flex justify-center items-center ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @Click="
                detail(
                  `/admin/applicant-detail`,
                  item.applicationType,
                  item.id,
                  item.applicant.id
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
                On
                {{
                  item.certifiedDate
                    ? moment(item.certifiedDate).format("MMM Do YY")
                    : "-"
                }}
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
    <div
      v-if="showLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
    <div class="bg-lightBlueB-200 h-full" v-if="searchedByDate">
      <div class="flex pl-12 pt-tiny">
        <Title
          :message="
            'All Region Licensed Applicants on Date Range ' +
              moment(searchCertifiedFrom).format('MMM D, YYYY') +
              ' To ' +
              moment(searchCertifiedTo).format('MMM D, YYYY')
          "
        />
        <button @click="backClicked">back</button>
      </div>
      <all-region-certified-users-by-date
        :allRegionLicensedByDate="filteredByDate"
      />
    </div>
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage
      message="Date Range is not valid, Please Enter Valid Date"
    />
  </div>
</template>

<script>
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import AllRegionCertifiedUsersByDate from "./ChildComponents/AllRegionCertifiedUsersByDate.vue";
import { useStore } from "vuex";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import store from "../../store";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";

export default {
  components: {
    ReviewerNavBar,
    AllRegionCertifiedUsersByDate,
    Title,
    Spinner,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
    getAllCertifiedUsers() {
      return store.getters["reviewer/getAllCertifiedUsersSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let message = ref({
      showErrorFlash: false,
    });

    let searchedByDate = ref(false);

    let allCertified = ref({});
    let filteredByDate = ref([]);
    let assignAllCertified = ref([]);
    let searchCertifiedFrom = ref("");
    let searchCertifiedTo = ref("");
    let x = ref([]);
    let adminId = +localStorage.getItem("adminId");
    let adminRole = localStorage.getItem("role");
    let nothingToShowAllCertified = ref(false);
    let showLoading = ref(false);
    let alreadyPushed = ref(false);

    const filterCertifiedsByDateRange = () => {
      if (searchCertifiedFrom.value === "" || searchCertifiedTo.value === "") {
        message.value.showErrorFlash = true;
        setTimeout(() => {
          message.value.showErrorFlash = false;
        }, 4000);
      } else if (
        moment(searchCertifiedFrom.value).isAfter(searchCertifiedTo.value)
      ) {
        message.value.showErrorFlash = true;
        setTimeout(() => {
          message.value.showErrorFlash = false;
        }, 4000);
      } else {
        searchedByDate.value = true;
        for (let certifiedUser in assignAllCertified.value) {
          if (
            !moment(searchCertifiedFrom.value).isAfter(
              assignAllCertified.value[certifiedUser].certifiedDate
            ) &&
            moment(searchCertifiedTo.value).isAfter(
              assignAllCertified.value[certifiedUser].certifiedDate
            )
          ) {
            if (!alreadyPushed.value) {
              filteredByDate.value.push(
                assignAllCertified.value[certifiedUser]
              );
            }
          }
        }
        alreadyPushed.value = true;
      }
    };

    const backClicked = () => {
      searchedByDate.value = false;
      filteredByDate.value = [];
      alreadyPushed.value = false;
      searchCertifiedFrom.value = "";
      searchCertifiedTo.value = "";
    };

    const fetchAllCertified = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getAllCertifiedUsers").then((res) => {
        showLoading.value = false;
        allCertified.value =
          store.getters["reviewer/getAllCertifiedUsersSearched"];
        assignAllCertified.value =
          store.getters["reviewer/getAllCertifiedUsers"];
        // assignAllCertified.value = assignAllCertified.value.map(certifiedUser => {
        //   return certifiedUser.certifiedDate = moment(certifiedUser.certifiedDate).format("MMMM D, YYYY")
        // })
        for (let certifiedUser in assignAllCertified.value) {
          assignAllCertified.value[certifiedUser].certifiedDate = moment(
            assignAllCertified.value[certifiedUser].certifiedDate
          ).format("MMMM D, YYYY");
        }
        if (
          store.getters["reviewer/getAllCertifiedUsersSearched"].length !== 0
        ) {
          for (var prop in store.getters[
            "reviewer/getAllCertifiedUsersSearched"
          ]) {
            if (allCertified.value[prop].applicationType == "Renewal") {
              allCertified.value[prop].newLicenseCode =
                allCertified.value[prop].renewalCode;
            }
            if (allCertified.value[prop].applicationType == "Good Standing") {
              allCertified.value[prop].newLicenseCode =
                allCertified.value[prop].goodStandingCode;
            }
            if (allCertified.value[prop].applicationType == "Verification") {
              allCertified.value[prop].newLicenseCode =
                allCertified.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowAllCertified.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchAllCertified();
    });

    return {
      allCertified,
      assignAllCertified,
      searchCertifiedFrom,
      searchCertifiedTo,
      nothingToShowAllCertified,
      showLoading,
      adminId,
      message,
      filteredByDate,
      searchedByDate,
      detail,
      filterCertifiedsByDateRange,
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
