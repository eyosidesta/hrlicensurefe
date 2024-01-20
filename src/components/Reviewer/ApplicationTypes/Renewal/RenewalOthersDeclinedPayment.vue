<template>
  <div>
    <!-- <reviewer-nav-bar tab="othersRenewalDeclinedPayment" /> -->
    <div class="bg-lightBlueB-200 h-full" v-if="!allInfo.searchByInput">
      <div class="pl-12">
        <div>Filter By</div>
      </div>

      <div class="flex flex-wrap mb-medium pl-12 pt-1">
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
        <button @click="filterDeclinedPaymentApplication">
          Filter
        </button>
      </div>

      <div class="flex pl-12 pt-tiny">
        <Title message="Others Renewal Declined Payments" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <declined-payment-applications
          :declinedPaymentApplication="getRenewalOthersDeclinedPayments"
          app_type="Renewal"
          all_declinedPayments="true"
        />
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
        <Title
          :message="
            'Others Declined Payments Applicants on Date Range ' +
              moment(allInfo.searchFromDate).format('MMM D, YYYY') +
              ' To ' +
              moment(allInfo.searchUpToDate).format('MMM D, YYYY')
          "
        />
        <button @click="backClicked">back</button>
      </div>
      <filtered-info
        :filteredData="allInfo.filteredByDate"
        type="applicant-detail"
        app_type="Renewal"
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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";

import applicationStatus from "../../Configurations/getApplicationStatus.js";
import DeclinedPaymentApplications from "../ChildApplicationTypes/DeclinedPaymentApplications.vue";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import filterApplication from "../../ChildComponents/FilteredDatas/FilterApplication.js";
import FilteredInfo from "../../ChildComponents/FilteredDatas/FilteredInfo.vue";
import NothingToShow from "../../ChildComponents/NothingToShow.vue";
import ReviewerNavBar from "../../ReviewerNavBar.vue";
import Spinner from "@/sharedComponents/Spinner";
import store from "../../../../store";
import Title from "@/sharedComponents/TitleWithIllustration";

export default {
  computed: {
    moment: () => moment,
    getRenewalOthersDeclinedPayments() {
      return store.getters[
        "reviewerRenewal/getRenewalOthersDeclinedPaymentSearched"
      ];
    },
  },
  components: {
    ReviewerNavBar,
    ErrorFlashMessage,
    FilteredInfo,
    Spinner,
    NothingToShow,
    DeclinedPaymentApplications,
    Title,
  },
  setup() {
    const store = useStore();

    let renewalDeclinedPayments = ref([]);

    const adminId = +localStorage.getItem("adminId");

    let nothingToShow = ref(false);
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

    const filterDeclinedPaymentApplication = () => {
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

    const fetchOthersRenewalDeclinedPayment = () => {
      showLoading.value = true;
      const statusId = applicationStatus(store, 'DP');
      const adminStatus = [statusId, adminId];
      store
        .dispatch("reviewerRenewal/getRenewalOthersDeclinedPayment", adminStatus)
        .then((res) => {
          showLoading.value = false;
          renewalDeclinedPayments.value =
            store.getters[
              "reviewerRenewal/getRenewalOthersDeclinedPaymentSearched"
            ];
          allInfo.value.assignApplication =
            store.getters[
              "reviewerRenewal/getRenewalOthersDeclinedPaymentSearched"
            ];

          for (let applicant in allInfo.value.assignApplication) {
            if (
              allInfo.value.assignApplication[applicant].applicationType ===
              undefined
            ) {
              allInfo.value.assignApplication[applicant].applicationType =
                allInfo.value.assignApplication[applicant].applicantType;
            }
          }
          if (
            renewalDeclinedPayments.value.length === 0
          ) {
            nothingToShow.value = true;
          }
        });
    };
    onMounted(() => {
      fetchOthersRenewalDeclinedPayment();
    });

    return {
      nothingToShow,
      allInfo,
      showLoading,
      filterDeclinedPaymentApplication,
      backClicked,
    };
  },
};
</script>
