<template>
  <div>
    <ReviewerNavBar tab="certifiedUsers" />
    <div class="bg-lightBlueB-200 h-full">
      <div class="flex pl-12 pt-tiny">
        <Title message="Certified Users" />
      </div>
      <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
        <div class="pl-large w-52 h-26" v-if="nothingToShowUnfinished == true">
          <div class="flex content-center justify-center">
            <h2>Nothing To Show!</h2>
          </div>
        </div>
        <div
          class="container"
          v-for="item in certifiedUsers"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          <div
            class="flex justify-center items-center  ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
          >
            <div
              class="p-4 w-48 h-64"
              @Click="
                detail(
                  `/admin/certifiedUsersDetail`,
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
                    ? moment(item.certifiedDate).format("MMM DD, YY")
                    : "-"
                }}
              </span>
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-center content-center"
              >
                {{ item.newLicenseCode ? item.newLicenseCode : "-" }}
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
import moment from "moment";

export default {
  components: { ReviewerNavBar, Title, Spinner },
  computed: {
    moment: () => moment,
    // getCertifiedUsers() {
    // }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let certifiedUsers = ref({});
    let x = ref([]);
    let userId = +localStorage.getItem("adminId");
    let nothingToShowUnfinished = ref(false);
    let showLoading = ref(false);

    const fetchUnfinished = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getAllCertifiedUsers").then((res) => {
        showLoading.value = false;
        certifiedUsers.value = res;
        // if(store.getters['reviewer/getUnfinishedSearched'].length !== 0) {
        //   for (var prop in store.getters['reviewer/getUnfinishedSearched']) {
        //     if (store.getters['reviewer/getUnfinishedSearched'][prop].applicationType == "Renewal") {
        //       store.getters['reviewer/getUnfinishedSearched'][prop].newLicenseCode =
        //         store.getters['reviewer/getUnfinishedSearched'][prop].renewalCode;
        //     }
        //     if (store.getters['reviewer/getUnfinishedSearched'][prop].applicationType == "Good Standing") {
        //       store.getters['reviewer/getUnfinishedSearched'][prop].newLicenseCode =
        //         store.getters['reviewer/getUnfinishedSearched'][prop].goodStandingCode;
        //     }
        //     if (store.getters['reviewer/getUnfinishedSearched'][prop].applicationType == "Verification") {
        //       store.getters['reviewer/getUnfinishedSearched'][prop].newLicenseCode =
        //         store.getters['reviewer/getUnfinishedSearched'][prop].verificationCode;
        //     }
        //   }
        // } else {
        //   nothingToShowUnfinished.value = true;
        // }
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
      certifiedUsers,
      detail,
      nothingToShowUnfinished,
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
</style>
