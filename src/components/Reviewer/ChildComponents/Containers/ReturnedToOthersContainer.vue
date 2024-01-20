<template>
  <div class="flex pl-12 pt-tiny">
    <Title message="Returned To Others" />
  </div>
  <div class="flex flex-wrap pb-medium rounded h-full" v-if="!showLoading">
    <nothing-to-show :nothingToShow="nothingToShowUnfinished" />
    <returned-to-others :returnedToOthers="getReturnedToOthers" />
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
import ReturnedToOthers from "@/components/Reviewer/ChildComponents/ReturnedToOthers";
import NothingToShow from "@/components/Reviewer/ChildComponents/NothingToShow";

export default {
    computed: {
        moment: () => moment,
        getReturnedToOthers() {
      return store.getters["reviewer/getRetunedToOthersSearched"];
    },
    },
  components: {
      Spinner,
      Title,
    ReturnedToOthers,
    NothingToShow,
  },
  name: "ReturnedToOthersContainer",
  setup() {
    const store = useStore();
    const router = useRouter();

    let unfinished = ref({});
    let adminRole = localStorage.getItem("role");
    let adminId = +localStorage.getItem("adminId");
    let nothingToShowUnfinished = ref(false);
    let showLoading = ref(false);

    const fetchUnfinished = () => {
      showLoading.value = true;
      const adminData = [adminRole, adminId];
      store.dispatch("reviewer/getReturnedToOthers", adminData).then((res) => {
        showLoading.value = false;
        unfinished.value = store.getters["reviewer/getRetunedToOthersSearched"];
        if (store.getters["reviewer/getReturnedToOthers"].length !== 0) {
          for (var prop in store.getters["reviewer/getRetunedToOthersSearched"]) {
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
