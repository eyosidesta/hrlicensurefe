<template>
  <div>
    <ReviewerNavBar tab="AllPendigs" />
    <div class="bg-lightBlueB-200 h-full">
      <div class="flex pl-12 pt-tiny pendingsMargin">
        <Title message="Others Penging Payments" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <div class="pl-large w-52 h-26" v-if="nothingToShowAllPengings == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <others-pending-payments :othersPendings="getAllPendingPayments" />
      </div>
    </div>
    <div
      v-if="showLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
  </div>
</template>

<script>
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { useStore } from "vuex";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import store from "../../store";
import Spinner from "@/sharedComponents/Spinner";

import OthersPendingPayments from "./HomeComponents/OthersPendingPayments";

import moment from "moment";

export default {
  components: { ReviewerNavBar, Title, Spinner, OthersPendingPayments },
  computed: {
    moment: () => moment,
    getAllPendingPayments() {
      return store.getters["reviewer/getAllPendingPaymentSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let allPendings = ref({});
    let x = ref([]);
    let userId = +localStorage.getItem("adminId");
    let nothingToShowAllPengings = ref(false);
    let showLoading = ref(false);

    const fetchAllPendings = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getAllPendingPayments", userId).then((res) => {
        showLoading.value = false;
        allPendings.value =
          store.getters["reviewer/getAllPendingPaymentSearched"];
        if (
          store.getters["reviewer/getAllPendingPaymentSearched"].length !== 0
        ) {
          for (var prop in store.getters[
            "reviewer/getAllPendingPaymentSearched"
          ]) {
            if (allPendings.value[prop].applicationType == "Renewal") {
              allPendings.value[prop].newLicenseCode =
                allPendings.value[prop].renewalCode;
            }
            if (allPendings.value[prop].applicationType == "Good Standing") {
              allPendings.value[prop].newLicenseCode =
                allPendings.value[prop].goodStandingCode;
            }
            if (allPendings.value[prop].applicationType == "Verification") {
              allPendings.value[prop].newLicenseCode =
                allPendings.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowAllPengings.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchAllPendings();
    });

    return {
      allPendings,
      detail,
      nothingToShowAllPengings,
      showLoading,
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
.pendingsMargin {
  margin-bottom: 2rem;
}
</style>
