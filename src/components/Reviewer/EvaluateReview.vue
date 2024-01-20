<template>
  <div>
    <ReviewerNavBar tab="Unconfirmed" />
    <div class="bg-lightBlueB-200 h-full">
      <evaluate-application-container />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import EvaluateApplicationContainer from "./ChildComponents/Containers/EvaluateApplicationContainer.vue";

export default {
  components: {
    ReviewerNavBar,
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
