<template>
  <div class="flex pl-12 pt-tiny">
    <Title message="Returned To Me" />
  </div>
  <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
    <nothing-to-show :nothingToShow="nothingToShowUnfinished" />
    <returned-to-me :returnedToMe="getReturnedToMe" />
  </div>
  <div v-if="showLoading" class="flex justify-center justify-items-center">
        <Spinner />
      </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import moment from "moment";

import Spinner from "@/sharedComponents/Spinner";

import store from "../../../../store";
import Title from "@/sharedComponents/TitleWithIllustration";
import ReturnedToMe from "@/components/Reviewer/ChildComponents/ReturnedToMe";
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";

export default {
    computed: {
        moment: () => moment,
        getReturnedToMe() {
      return store.getters["reviewer/getReturnedToMeSearched"];
    },
    },
  components: {
      Spinner,
      Title,
    NothingToShow,
    ReturnedToMe,
  },
  name: "ReturnedToMeContainer",
  setup() {
    const store = useStore();
    const router = useRouter();

    let unfinished = ref({});
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowUnfinished = ref(false);
    let showLoading = ref(false);

    const fetchUnfinished = () => {
      showLoading.value = true;
      store.dispatch("reviewer/getReturnedToMe", adminId).then((res) => {
        showLoading.value = false;
        unfinished.value = store.getters["reviewer/getReturnedToMeSearched"];
        if (store.getters["reviewer/getReturnedToMe"].length !== 0) {
          for (var prop in store.getters["reviewer/getReturnedToMeSearched"]) {
            if (unfinished.value[prop].applicationType == "Renewal") {
              unfinished.value[prop].newLicenseCode =
                unfinished.value[prop].renewalCode;
            }
            if (unfinished.value[prop].applicationType == "Good Standing") {
              unfinished.value[prop].newLicenseCode =
                unfinished.value[prop].goodStandingCode;
            }
            if (unfinished.value[prop].applicationType == "Verification") {
              unfinished.value[prop].newLicenseCode =
                unfinished.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowUnfinished.value = true;
        }
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
      unfinished,
      detail,
      nothingToShowUnfinished,
      showLoading,
    };
  },
};
</script>
