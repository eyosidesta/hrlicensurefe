<template>
  <div>
    <ReviewerNavBar tab="myPendings" />
    <div class="bg-lightBlueB-200 h-full">
      <div class="flex pl-12 pt-tiny pendingsMargin">
        <Title message="Pending Payments" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <div class="pl-large w-52 h-26" v-if="nothingToShowPending == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <my-pending-payments :myPendings="getPending" />
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
import MyPendingPayments from "./HomeComponents/MyPendingPayments.vue";
import moment from "moment";

export default {
  components: { ReviewerNavBar, Title, Spinner, MyPendingPayments },
  computed: {
    moment: () => moment,
    getPending() {
      return store.getters["reviewer/getPendingPayments"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let pending = ref({});
    let x = ref([]);
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowPending = ref(false);
    let showLoading = ref(false);

    const fetchPendings = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getPendingPayments", adminId).then((res) => {
        showLoading.value = false;
        pending.value = store.getters["reviewer/getPendingPayments"];
        if (store.getters["reviewer/getPendingPayments"].length !== 0) {
          for (var prop in store.getters["reviewer/getPendingPayments"]) {
            if (pending.value[prop].applicationType == "Renewal") {
              pending.value[prop].newLicenseCode =
                pending.value[prop].renewalCode;
            }
            if (pending.value[prop].applicationType == "Good Standing") {
              pending.value[prop].newLicenseCode =
                pending.value[prop].goodStandingCode;
            }
            if (pending.value[prop].applicationType == "Verification") {
              pending.value[prop].newLicenseCode =
                pending.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowPending.value = true;
        }
      });
    };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchPendings();
    });

    return {
      pending,
      detail,
      nothingToShowPending,
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
