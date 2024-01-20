<template>
  <div>
    <ReviewerNavBar tab="Unconfirmed" />
    <div v-if="isSuperAdmin">
      <div class="bg-lightBlueB-200 h-full">
        <others-unconfirmed-container />
      </div>
    </div>
    <div v-else>
      <div class="bg-lightBlueB-200 h-full">
        <unconfirmed-container />
      </div>
    </div>
    <div class="bg-lightBlueB-200 h-full">
      <returned-to-me-container />
    </div>
    <div class="bg-lightBlueB-200 h-full">
      <returned-to-others-container />
    </div>
    <!-- <div class="bg-lightBlueB-200 h-full">
      <confirm-review-container />
    </div> -->
    <!-- <div v-if="isSuperAdmin">
      <div class="bg-lightBlueB-200 h-full">
        <others-confirm-review-container />
      </div>
    </div> -->
    <!-- <div class="bg-lightBlueB-200 h-full">
      <evaluate-application-container />
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import UnconfirmedContainer from "./ChildComponents/Containers/UnconfirmedContainer.vue";
import ReturnedToMeContainer from "./ChildComponents/Containers/ReturnedToMeContainer.vue";
import ReturnedToOthersContainer from "./ChildComponents/Containers/ReturnedToOthersContainer.vue";
import ConfirmReviewContainer from "./ChildComponents/Containers/ConfirmReviewContainer.vue";
import OthersUnconfirmedContainer from "./ChildComponents/Containers/OthersUnconfirmedContainer.vue";
import OthersConfirmReviewContainer from "./ChildComponents/Containers/OthersConfirmReviewContainer.vue";
import EvaluateApplicationContainer from "./ChildComponents/Containers/EvaluateApplicationContainer.vue";

export default {
  components: {
    ReviewerNavBar,
    UnconfirmedContainer,
    ReturnedToMeContainer,
    ConfirmReviewContainer,
    OthersUnconfirmedContainer,
    OthersConfirmReviewContainer,
    ReturnedToOthersContainer,
    EvaluateApplicationContainer,
  },
  computed: {
    moment: () => moment,
    getUnfinished() {
      return store.getters["reviewer/getUnfinishedSearched"];
    },
  },
  setup() {
    const role = localStorage.getItem("role");

    let isSuperAdmin = ref(false);
    const superAdminStatus = () => {
      if (role == "ADM") {
        isSuperAdmin.value = true;
      }
    };

    onMounted(() => {
      superAdminStatus();
    });

    return {
      role,
      isSuperAdmin,
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
