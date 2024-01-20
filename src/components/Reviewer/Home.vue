<template>
  <div>
    <ReviewerNavBar tab="Home" />
    <div class="bg-lightBlueB-200 h-full">
      <div class="flex pl-12 pt-medium">
        <div v-if="myTitleMessage">
          <Title message="My Unfinished" illustration="My Unfinished" />
        </div>
        <div v-else>
          <Title message="Unfinished" illustration="Unfinished" />
        </div>

        <div class="flex ml-small" v-if="unfinished.length >= 5">
          <router-link to="/admin/unfinished">
            <button
              class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
            >
              View All
            </button>
          </router-link>
        </div>
      </div>
      <div class="flex ml-small mt-medium rounded">
        <nothing-to-show :nothingToShow="nothingToShowUnfinished" />
        <MyUnfinished :unFinishedSearched="unFinishedSearched" />
      </div>
      <div
        v-if="showUnfinishedLoading"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>

      <div v-if="adminRole === 'ADM'">
        <div class="flex pl-12 mt-medium">
          <Title message="Others Unfinished" illustration="Others Unfinished" />
          <div class="flex ml-small" v-if="everyoneUnfinished.length >= 5">
            <router-link to="/admin/unfinishedAll">
              <button
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
              >
                View All
              </button>
            </router-link>
          </div>
        </div>
        <div class="flex ml-small mt-medium rounded">
          <nothing-to-show :nothingToShow="nothingToShowAllUnfinished" />
          <others-unfinished
            :othersUnfinished="unFinishedForEveryOneSearched"
          />
        </div>
        <!-- spelling error -->
        <div
          v-if="showAllUnfinishedLoaing"
          class="flex content-center justify-center"
        >
          <Spinner />
        </div>
      </div>

      <div class="flex pl-12 mt-medium">
        <Title message="Assigned to You" illustration="Assigned to You" />
        <div class="flex ml-small" v-if="assignedToyou.length >= 5">
          <router-link to="/admin/assignedToyou">
            <button
              class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
            >
              View All
            </button>
          </router-link>
        </div>
      </div>
      <div class="flex ml-small mt-medium rounded">
        <nothing-to-show :nothingToShow="nothingToShow" />
        <my-assigned :assignedToMe="assignedToYouSearched" />
      </div>
      <div
        v-if="showAssignedToMeLoading"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
      <div v-if="adminRole === 'ADM'">
        <div class="flex pl-12 mt-medium">
          <Title
            message="Assigned to Others"
            illustration="Assigned to Others"
          />
          <div class="flex ml-small" v-if="assignedToEveryone.length >= 5">
            <router-link to="/admin/assignedToAll">
              <button
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
              >
                View All
              </button>
            </router-link>
          </div>
        </div>

        <div class="flex ml-small mt-medium rounded">
          <nothing-to-show :nothingToShow="nothingToShowEveryoneAssigned" />
          <assigned-to-others :assidgnedToOthers="assignedToEveryOneSearched" />
        </div>
      </div>
      <div
        v-if="showAssignedToOthersLoading"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>

      <!-- <div class="flex pl-12 pt-medium">
        <div v-if="myTitleMessage">
          <Title message="My Pending Payments" />
        </div>
        <div v-else>
          <Title message="Pending Payments" />
        </div>

        <div class="flex ml-small" v-if="pending.length >= 5">
          <router-link to="/admin/pendingPayments">
            <button
              class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
            >
              View All
            </button>
          </router-link>
        </div>
      </div>
      <div class="flex ml-small mt-medium rounded">
        <nothing-to-show :nothingToShow="nothingToShowPending" />

        <my-pending-payments :myPendings="myPendingPayment" />
      </div>
      <div
        v-if="showMyPendingLoading"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>

      <div v-if="adminRole === 'ADM'">
        <div class="flex pl-12 mt-medium">
          <Title message="Other Pending Payments" />
          <div class="flex ml-small" v-if="allPendings.length >= 5">
            <router-link to="/admin/allPendingPayments">
              <button
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
              >
                View All
              </button>
            </router-link>
          </div>
        </div>
        <div class="flex ml-small mt-medium rounded">

          <nothing-to-show :nothingToShow="nothingToShowAllPengings" />
          <others-pending-payments :othersPendings="othersPendingPayment" />
          
        </div>
        <div
          v-if="showAllPendingLoading"
          class="flex content-center justify-center"
        >
          <Spinner />
        </div>
      </div> -->

      <div class="flex pl-12 mt-medium">
        <Title message="Unassigned" illustration="Unassigned" />
        <div class="flex ml-small" v-if="unassigned.length >= 5">
          <router-link to="/admin/unassigned">
            <button
              class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
            >
              View All
            </button>
          </router-link>
        </div>
      </div>

      <div class="box">
        <div class="flex ml-small mt-medium rounded">
          <nothing-to-show :nothingToShow="nothingToShowUnassigned" />
          <all-unassigned :allUnassigned="unAssignedSearched" />
        </div>
      </div>
      <div
        v-if="showUnassignedLoading"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import store from "../../store";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import MyUnfinished from "./HomeComponents/MyUnfinished.vue";
import MyAssigned from "./ChildComponents/MyAssigned.vue";
import NothingToShow from "./ChildComponents/NothingToShow.vue";
import MyPendingPayments from "./HomeComponents/MyPendingPayments.vue";
import OthersPendingPayments from "./HomeComponents/OthersPendingPayments.vue";
import OthersUnfinished from "./ChildComponents/OthersUnfinished.vue";
import AssignedToOthers from "./ChildComponents/AssignedToOthers.vue";
import AllUnassigned from "./ChildComponents/AllUnassigned.vue";

export default {
  components: {
    ReviewerNavBar,
    Title,
    Spinner,
    MyUnfinished,
    NothingToShow,
    MyAssigned,
    MyPendingPayments,
    OthersPendingPayments,
    OthersUnfinished,
    AssignedToOthers,
    AllUnassigned,
  },
  computed: {
    moment: () => moment,
    unAssignedSearched() {
      return store.getters["reviewer/getUnassignedSearched"];
    },
    unFinishedSearched() {
      return store.getters["reviewer/getUnfinishedSearched"];
    },
    assignedToYouSearched() {
      return store.getters["reviewer/getAssignedToYouSearched"];
    },
    unFinishedForEveryOneSearched() {
      return store.getters["reviewer/getEveryOneUnfinishedSearched"];
    },
    assignedToEveryOneSearched() {
      return store.getters["reviewer/getAssignedForEveryOneSearched"];
    },
    myPendingPayment() {
      return store.getters["reviewer/getPendingPaymentsSearched"];
    },
    othersPendingPayment() {
      return store.getters["reviewer/getAllPendingPaymentSearched"];
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let unfinished = ref({
      applicant: { profile: { name: "", fatherName: "" } },
      applicationStatus: { name: "" },
      profilePic: "",
    });
    let assignedToyou = ref({
      applicationStatus: { name: "" },
      profilePic: "",
    });
    let unassigned = ref({ applicationStatus: { name: "" }, profilePic: "" });
    let pending = ref({});
    let allPendings = ref({});
    let recentlyFinished = ref({});
    let assignedToEveryone = ref({ profilePic: "" });
    let everyoneUnfinished = ref({ profilePic: "" });
    let hover = ref(false);
    let adminId = +localStorage.getItem("adminId");
    let adminRole = localStorage.getItem("role");
    let x = ref([]);
    let activeFilters = ref([]);
    let nothingToShow = ref(false);
    let nothingToShowUnassigned = ref(false);
    let nothingToShowEveryoneAssigned = ref(false);
    let nothingToShowAllUnfinished = ref(false);
    let nothingToShowPending = ref(false);
    let nothingToShowAllPengings = ref(false);

    let nothingToShowUnfinished = ref(false);

    let myTitleMessage = ref(false);

    let showUnfinishedLoading = ref(false);
    let showAllUnfinishedLoaing = ref(false);
    let showAssignedToMeLoading = ref(false);
    let showAssignedToOthersLoading = ref(false);
    let showUnassignedLoading = ref(false);
    let showMyPendingLoading = ref(false);
    let showAllPendingLoading = ref(false);

    adminRole === "ADM"
      ? (myTitleMessage.value = true)
      : (myTitleMessage.value = false);
    const fetchUnfinished = () => {
      showUnfinishedLoading.value = true;
      store.dispatch("reviewer/getUnfinished", adminId).then((res) => {
        showUnfinishedLoading.value = false;

        if (store.getters["reviewer/getUnfinishedSearched"].length !== 0) {
          unfinished.value = store.getters["reviewer/getUnfinishedSearched"];
          for (var prop in store.getters["reviewer/getUnfinishedSearched"]) {
            if (unfinished.value[prop].documents !== null) {
              for (var psp in unfinished.value[prop].documents) {
                if (
                  unfinished.value[prop].documents[psp].documentTypeCode ===
                  "LHI"
                ) {
                  unfinished.value[prop].profilePic =
                    unfinished.value[prop].documents[psp].filePath;
                  // store.getters["reviewer/getUnfinishedSearched"]
                  break;
                }
              }
            }

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

    const fetchMyPendingPayment = () => {
      showMyPendingLoading.value = true;
      store.dispatch("reviewer/getPendingPayments", adminId).then((res) => {
        showMyPendingLoading.value = false;
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

    const fetchOthersPendingPayment = () => {
      showAllPendingLoading.value = true;
      store.dispatch("reviewer/getAllPendingPayments", adminId).then((res) => {
        showAllPendingLoading.value = false;
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

    const fetchAssignedtoYou = () => {
      showAssignedToMeLoading.value = true;
      store.dispatch("reviewer/getAssignedToYou", adminId).then((res) => {
        showAssignedToMeLoading.value = false;
        if (store.getters["reviewer/getAssignedToYouSearched"].length !== 0) {
          assignedToyou.value =
            store.getters["reviewer/getAssignedToYouSearched"];
          for (var prop in store.getters["reviewer/getAssignedToYouSearched"]) {
            if (assignedToyou.value[prop].documents !== null) {
              for (var psp in assignedToyou.value[prop].documents) {
                if (
                  assignedToyou.value[prop].documents[psp].documentTypeCode ===
                  "PSP"
                ) {
                  assignedToyou.value[prop].profilePic =
                    assignedToyou.value[prop].documents[psp].filePath;
                  // store.getters["reviewer/getUnfinishedSearched"]
                  break;
                }
              }
            }

            if (assignedToyou.value[prop].applicationType == "Renewal") {
              assignedToyou.value[prop].newLicenseCode =
                assignedToyou.value[prop].renewalCode;
            }
            if (assignedToyou.value[prop].applicationType == "Good Standing") {
              assignedToyou.value[prop].newLicenseCode =
                assignedToyou.value[prop].goodStandingCode;
            }
            if (assignedToyou.value[prop].applicationType == "Verification") {
              assignedToyou.value[prop].newLicenseCode =
                assignedToyou.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShow.value = true;
        }
      });
    };

    const fetchAssignedToEveryone = () => {
      const adminData = [adminRole, adminId];
      showAssignedToOthersLoading.value = true;
      store
        .dispatch("reviewer/getAssignedToEveryOne", adminData)
        .then((res) => {
          showAssignedToOthersLoading.value = false;
          assignedToEveryone.value =
            store.getters["reviewer/getAssignedForEveryOneSearched"];
          if (
            store.getters["reviewer/getAssignedForEveryOneSearched"].length !==
            0
          ) {
            // do some logic to manipulate data
            for (var prop in store.getters[
              "reviewer/getAssignedForEveryOneSearched"
            ]) {
              if (assignedToEveryone.value[prop].documents !== null) {
                for (var psp in assignedToEveryone.value[prop].documents) {
                  if (
                    assignedToEveryone.value[prop].documents[psp]
                      .documentTypeCode === "PSP"
                  ) {
                    assignedToEveryone.value[prop].profilePic =
                      assignedToEveryone.value[prop].documents[psp].filePath;
                    // store.getters["reviewer/getUnfinishedSearched"]
                    break;
                  }
                }
              }

              if (assignedToEveryone.value[prop].applicationType == "Renewal") {
                assignedToEveryone.value[prop].newLicenseCode =
                  assignedToEveryone.value[prop].renewalCode;
              }
              if (
                assignedToEveryone.value[prop].applicationType ==
                "Good Standing"
              ) {
                assignedToEveryone.value[prop].newLicenseCode =
                  assignedToEveryone.value[prop].goodStandingCode;
              }
              if (
                assignedToEveryone.value[prop].applicationType == "Verification"
              ) {
                assignedToEveryone.value[prop].newLicenseCode =
                  assignedToEveryone.value[prop].verificationCode;
              }
            }
          } else {
            nothingToShowEveryoneAssigned.value = true;
          }
        });
    };

    const fetchEveryOneUnfinished = () => {
      const adminData = [adminRole, adminId];
      showAllUnfinishedLoaing.value = true;
      store
        .dispatch("reviewer/getEveryOneUnfinished", adminData)
        .then((res) => {
          showAllUnfinishedLoaing.value = false;
          everyoneUnfinished.value =
            store.getters["reviewer/getEveryOneUnfinishedSearched"];

          if (
            store.getters["reviewer/getEveryOneUnfinishedSearched"].length !== 0
          ) {
            for (var prop in store.getters[
              "reviewer/getEveryOneUnfinishedSearched"
            ]) {
              if (everyoneUnfinished.value[prop].documents !== null) {
                for (var psp in everyoneUnfinished.value[prop].documents) {
                  if (
                    everyoneUnfinished.value[prop].documents[psp]
                      .documentTypeCode === "PSP"
                  ) {
                    everyoneUnfinished.value[prop].profilePic =
                      everyoneUnfinished.value[prop].documents[psp].filePath;
                    // store.getters["reviewer/getUnfinishedSearched"]
                    break;
                  }
                }
              }
              if (everyoneUnfinished.value[prop].applicationType == "Renewal") {
                everyoneUnfinished.value[prop].newLicenseCode =
                  everyoneUnfinished.value[prop].renewalCode;
              }
              if (
                everyoneUnfinished.value[prop].applicationType ==
                "Good Standing"
              ) {
                everyoneUnfinished.value[prop].newLicenseCode =
                  everyoneUnfinished.value[prop].goodStandingCode;
              }
              if (
                everyoneUnfinished.value[prop].applicationType == "Verification"
              ) {
                everyoneUnfinished.value[prop].newLicenseCode =
                  everyoneUnfinished.value[prop].verificationCode;
              }
            }
            // do some logic to manipulate data
          } else {
            nothingToShowAllUnfinished.value = true;
          }
        });
    };

    const fetchUnassignedApplications = () => {
      showUnassignedLoading.value = true;
      store.dispatch("reviewer/getUnassigned").then((res) => {
        showUnassignedLoading.value = false;
        unassigned.value = store.getters["reviewer/getUnassignedSearched"];
        if (store.getters["reviewer/getUnassignedSearched"].length !== 0) {
          for (var prop in store.getters["reviewer/getUnassignedSearched"]) {
            if (unassigned.value[prop].documents !== null) {
              for (var psp in unassigned.value[prop].documents) {
                if (
                  unassigned.value[prop].documents[psp].documentTypeCode ===
                  "PSP"
                ) {
                  unassigned.value[prop].profilePic =
                    unassigned.value[prop].documents[psp].filePath;
                  // store.getters["reviewer/getUnfinishedSearched"]
                  break;
                }
              }
            }

            if (unassigned.value[prop].applicationType == "Renewal") {
              unassigned.value[prop].newLicenseCode =
                unassigned.value[prop].renewalCode;
            }
            if (unassigned.value[prop].applicationType == "Good Standing") {
              unassigned.value[prop].newLicenseCode =
                unassigned.value[prop].goodStandingCode;
            }
            if (unassigned.value[prop].applicationType == "Verification") {
              unassigned.value[prop].newLicenseCode =
                unassigned.value[prop].verificationCode;
            }
          }
        } else {
          nothingToShowUnassigned.value = true;
        }
      });
    };

    // const fetchRecentlyFinished = () => {
    //   store.dispatch("reviewer/getRecentlyFinished").then((res) => {
    //     // recentlyFinished.value = res.data.results;
    //   });
    // };

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
      fetchUnfinished();
      // fetchAssignedtoYou();
      fetchUnassignedApplications();
      // fetchRecentlyFinished();
      fetchAssignedtoYou();
      if (adminRole === "ADM") {
        fetchAssignedToEveryone();
        fetchEveryOneUnfinished();
        fetchOthersPendingPayment();
      }
      fetchMyPendingPayment();
    });

    return {
      adminId,
      adminRole,
      unfinished,
      assignedToyou,
      assignedToEveryone,
      unassigned,
      recentlyFinished,
      everyoneUnfinished,
      hover,
      nothingToShow,
      nothingToShowUnfinished,
      nothingToShowUnassigned,
      nothingToShowEveryoneAssigned,
      nothingToShowAllUnfinished,
      nothingToShowPending,
      nothingToShowAllPengings,
      detail,
      activeFilters,
      pending,
      allPendings,
      myTitleMessage,
      showUnfinishedLoading,
      showAllUnfinishedLoaing,
      showAssignedToMeLoading,
      showAssignedToOthersLoading,
      showUnassignedLoading,
      showMyPendingLoading,
      showAllPendingLoading,
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

.flip-box .inner {
  /* position:absolute;
  perspective: inherit;
  z-index: 2;
  transform: translateY(-50%)translateZ(60px) scale(.94); */
}
/* .box {
  position: relative;
} */

.b {
  /* position: absolute; */
}
</style>
