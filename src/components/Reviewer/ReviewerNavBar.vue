<template>
  <header class="px-10 py-3.5 inset-box-shadow bg-lightBlueB-100">
    <nav class="">
      <main class="flex items-center justify-between">
        <div class="flex items-center">
          <a @click="navigateToHomePage()">
            <RenderIllustration
              class=""
              illustration="Logo"
              message="Address"
            />
          </a>
          <h3 class="ml-tiny font-AtkinsonHyperlegibleBold">HRIS - Lisence</h3>
          <div
            class="flex flex-col items-center justify-between ml-medium width-64 bg-gray-800"
          >
            <div class="relative text-gray-600 focus-within:text-gray-400">
              <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                <div class="p-1 focus:outline-none focus:shadow-outline">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                    class="width-8 height-8 text-primary-500"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </span>
              <input
                type="search"
                name="search"
                class="py-2 text-sm text-black bg-gray-900 width-548 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search requests by Name or Order ID"
                autocomplete="off"
                v-model="search"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <div class="mr-4" style="color: #2081f8; font-size: 20px">
            {{ adminName }}
          </div>
          <div class="relative inline-block text-left">
            <a
              class="focus:outline-none bg-lightBlueB-300 text-lightBlueB-400 hover:text-gray-800 w-7 h-7 rounded-full flex items-center justify-center"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
              href="#"
              v-on:click="showDropDown()"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-8 h-8 px-1 py-1"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M3,21 h18 C 21,12 3,12 3,21" />
              </svg>
            </a>
            <div
              v-if="showDD == true"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  @click="logout()"
                  class="block px-4 py-2 text-sm text-blue-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  id="logout"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </nav>
  </header>
</template>

<script scoped>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Title from "@/sharedComponents/Title";
import RenderIllustration from "@/sharedComponents/RenderIllustration";

export default {
  components: { Title, RenderIllustration },
  props: {
    tab: {
      type: String,
      required: true,
      default: "No title",
    },
  },

  computed: {
    changeSelectedSideBar(menu) {
      return menu;
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    let showDD = ref(false);
    let showUnfinishedDD = ref(false);
    let showAssignedDD = ref(false);
    let showFinishedDD = ref(false);
    let showLicensedDD = ref(false);
    let search = ref("");
    let primaryText = ref("");
    let isUserManager = ref(false);
    const adminName = JSON.parse(localStorage.getItem("allAdminData")).name;
    const adminRole = JSON.parse(localStorage.getItem("allAdminData")).role
      .code;

    const navigateToHomePage = () => {
      if(loggedInAdminRole === "UM") {
        return;
      }
      if (router.currentRoute._value.path === "/admin/review") {
        emit("navigateToHome", "newLicenseUnassigned");
      } else {
        router.push("/admin/review");
      }
    };

    watch(search, () => {
      if (props.tab === "Unassigned") {
        store.dispatch("reviewer/getUnassignedSearched", search.value);
      }
      if (props.tab === "AssignedToYou") {
        store.dispatch("reviewer/getAssignedToYouSearched", search.value);
      }
      if (props.tab === "Unfinished") {
        store.dispatch("reviewer/getUnfinishedSearched", search.value);
      }
      if (props.tab === "AllUnfinished") {
        store.dispatch("reviewer/getEveryOneUnfinishedSearched", search.value);
      }
      if (props.tab === "AssignedToAll") {
        store.dispatch("reviewer/getAssignedToEveryOneSearched", search.value);
      }
      if (props.tab === "MyWork") {
        store.dispatch("reviewer/searchRecentlyFinished", search.value);
      }
      if (props.tab === "AllWork") {
        store.dispatch("reviewer/searchAllFinished", search.value);
      }
      if (props.tab === "allCertifiedUsers") {
        store.dispatch("reviewer/searchCertifiedUsers", search.value);
      }
      if (props.tab === "myRegionCertifiedUsers") {
        store.dispatch("reviewer/searchMyRegionCertifiedUsers", search.value);
      }
      // if (props.tab === "AllWork") {
      //   store.dispatch("reviewer/getAllRecentlyFinishedSearched", search.value)
      // }
      if (props.tab === "AllPendigs") {
        store.dispatch("reviewer/getAllPendingPaymentSearched", search.value);
      }

      if (props.tab === "Unconfirmed") {
        store.dispatch("reviewer/getUnconfirmedSearched", search.value);
        store.dispatch("reviewer/getOthersUnconfirmedSearched", search.value);
        store.dispatch("reviewer/getConfirmReviewSearched", search.value);
        store.dispatch("reviewer/getOthersConfirmReviewSearched", search.value);
        store.dispatch("reviewer/getReturnedToMeSearched", search.value);
        store.dispatch("reviewer/getReturnedToOthersSearched", search.value);
      }
      if (props.tab === "Home") {
        store.dispatch("reviewer/getAssignedToYouSearched", search.value);
        store.dispatch("reviewer/getUnfinishedSearched", search.value);
        store.dispatch("reviewer/getUnassignedSearched", search.value);
        store.dispatch("reviewer/getAssignedToEveryOneSearched", search.value);
        store.dispatch("reviewer/getEveryOneUnfinishedSearched", search.value);
        store.dispatch("reviewer/getAllPendingPaymentSearched", search.value);
        store.dispatch("reviewer/getPendingPaymentSearched", search.value);
      }
      if (props.tab === "RenewalUnassigned") {
        store.dispatch(
          "reviewerRenewal/getUnassignedRenewalSearched",
          search.value
        );
      }
      if (props.tab === "renewalUnfinished") {
        store.dispatch(
          "reviewerRenewal/getRenewalUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "renewalOthersUnfinished") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "renewalAssigned") {
        store.dispatch(
          "reviewerRenewal/getRenewalAssignedSearched",
          search.value
        );
      }
      if (props.tab === "renewalAssignedToOthers") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersAssignedSearched",
          search.value
        );
      }
      if (props.tab === "renewalUnconfirmed") {
        store.dispatch(
          "reviewerRenewal/getRenewalApprovedSearched",
          search.value
        );
      }
      if (props.tab === "allRenewalUnconfirmed") {
        store.dispatch(
          "reviewerRenewal/getRenewalAllApprovedSearched",
          search.value
        );
      }
      if (props.tab === "renewalDeclined") {
        store.dispatch(
          "reviewerRenewal/getRenewalDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "allRenewalDeclined") {
        store.dispatch(
          "reviewerRenewal/getRenewalAllDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "renewalUnderSuperVision") {
        store.dispatch(
          "reviewerRenewal/getRenewalUnderSuperVisionSearched",
          search.value
        );
      }
      if (props.tab === "renewalOthersUnderSuperVision") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersUnderSuperVisionSearched",
          search.value
        );
      }
      if (props.tab === "renewalApprovedPayment") {
        store.dispatch(
          "reviewerRenewal/getRenewalApprovedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "othersRenewalApprovedPayment") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersApprovedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "renewalDeclinedPayment") {
        store.dispatch(
          "reviewerRenewal/getRenewalDeclinedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "othersRenewalDeclinedPayment") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersDeclinedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "renewalOnReview") {
        store.dispatch(
          "reviewerRenewal/getRenewalOnReviewSearched",
          search.value
        );
      }
      if (props.tab === "othersRenewalOnReview") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersOnReviewSearched",
          search.value
        );
      }
      if (props.tab === "renewalReEvaluate") {
        store.dispatch(
          "reviewerRenewal/getRenewalReEvaluateSearched",
          search.value
        );
      }
      if (props.tab === "othersRenewalReEvaluate") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersReEvaluateSearched",
          search.value
        );
      }
      if (props.tab === "renewalConfirmed") {
        store.dispatch(
          "reviewerRenewal/getRenewalConfirmedSearched",
          search.value
        );
      }
      if (props.tab === "othersRenewalConfirmed") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersConfirmedSearched",
          search.value
        );
      }
      if (props.tab === "renewalReturnedToMe") {
        store.dispatch(
          "reviewerRenewal/getRenewalReturnedToMeSearched",
          search.value
        );
      }
      if (props.tab === "renewalReturnedToOthers") {
        store.dispatch(
          "reviewerRenewal/getRenewalReturnedToOthersSearched",
          search.value
        );
      }
      if (props.tab === "renewalUnassignedEvaluation") {
        store.dispatch(
          "reviewerRenewal/getRenewalApprovedSearched",
          search.value
        )
      }
      if (props.tab === "renewalLicensed") {
        store.dispatch(
          "reviewerRenewal/getRenewalLicensedSearched",
          search.value
        )
      }
      if (props.tab === "renewalOthersLicensed") {
        store.dispatch(
          "reviewerRenewal/getRenewalOthersLicensedSearched",
          search.value
        )
      }

      if (props.tab === "newLicenseUnassigned") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseUnassignedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseUnfinished") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseOthersUnfinished") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseAssigned") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseAssignedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseAssignedToOthers") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersAssignedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseUnconfirmed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseApprovedSearched",
          search.value
        );
      }
      if (props.tab === "allNewLicenseUnconfirmed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseAllApprovedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseDeclined") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "allNewLicenseDeclined") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseAllDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseUnderSuperVision") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseUnderSuperVisionSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseUnassignedEvaluation") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseApprovedSearched",
          search.value
        )
      }
      if (props.tab === "othersNewLicenseUnderSuperVision") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersUnderSuperVisionSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseApprovedPayment") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseApprovedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "othersNewLicenseApprovedPayment") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersApprovedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseDeclinedPayment") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseDeclinedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "othersNewLicenseDeclinedPayment") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersDeclinedPaymentSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseOnReview") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOnReviewSearched",
          search.value
        );
      }
      if (props.tab === "othersNewLicenseOnReview") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersOnReviewSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseReEvaluate") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseReEvaluateSearched",
          search.value
        );
      }
      if (props.tab === "othersNewLicenseReEvaluate") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersReEvaluateSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseConfirmed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseConfirmedSearched",
          search.value
        );
      }
      if (props.tab === "othersNewLicenseConfirmed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseOthersConfirmedSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseReturnedToMe") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseReturnedToMeSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseReturnedToOthers") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseReturnedToOthersSearched",
          search.value
        );
      }
      if (props.tab === "newLicenseLicensed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseLicensedSearched",
          search.value
        )
      }

      if (props.tab === "verificationUnassigned") {
        store.dispatch(
          "reviewerVerification/getUnassignedVerificationSearched",
          search.value
        );
      }
      if (props.tab === "verificationUnfinished") {
        store.dispatch(
          "reviewerVerification/getVerificationUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "verificationOthersUnfinished") {
        store.dispatch(
          "reviewerVerification/getVerificationOthersUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "verificationAssigned") {
        store.dispatch(
          "reviewerVerification/getVerificationAssignedSearched",
          search.value
        );
      }
      if (props.tab === "verificationAssignedToOthers") {
        store.dispatch(
          "reviewerVerification/getVerificationOthersAssignedSearched",
          search.value
        );
      }
      if (props.tab === "verificationUnconfirmed") {
        store.dispatch(
          "reviewerVerification/getVerificationApprovedSearched",
          search.value
        );
      }
      if (props.tab === "allVerificationUnconfirmed") {
        store.dispatch(
          "reviewerVerification/getVerificationAllApprovedSearched",
          search.value
        );
      }
      if (props.tab === "verificationDeclined") {
        store.dispatch(
          "reviewerVerification/getVerificationDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "allVerificationDeclined") {
        store.dispatch(
          "reviewerVerification/getVerificationAllDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingUnassigned") {
        store.dispatch(
          "reviewerGoodStanding/getUnassignedGoodStandingSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingUnfinished") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingOthersUnfinished") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingOthersUnfinishedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingAssigned") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingAssignedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingAssignedToOthers") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingOthersAssignedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingUnconfirmed") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingApprovedSearched",
          search.value
        );
      }
      if (props.tab === "allGoodStandingUnconfirmed") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingAllApprovedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingDeclined") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "allGoodStandingDeclined") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingAllDeclinedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingLicensed") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingLicensedSearched",
          search.value
        );
      }
      if (props.tab === "goodStandingOthersLicensed") {
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingOthersLicensedSearched",
          search.value
        );
      }

      if (props.tab === "allLicensed") {
        store.dispatch(
          "reviewerNewLicense/getNewLicenseAllLicensedSearched",
          search.value
        );
        store.dispatch(
          "reviewerRenewal/getRenewalAllLicensedSearched",
          search.value
        );
        store.dispatch(
          "reviewerGoodStanding/getGoodStandingAllLicensedSearched",
          search.value
        );
      }

    });
    let showAdminCreate = false;
    let isSuperAdmin = ref(false);
    const loggedInAdminRole = localStorage.getItem("role");
    loggedInAdminRole === "UM"
      ? (showAdminCreate = true)
      : (showAdminCreate = false);

    loggedInAdminRole === "ADM"
      ? (isSuperAdmin.value = true)
      : (isSuperAdmin.value = false);

    if (isSuperAdmin == false) {
      primaryText.value = "text-primary-300";
    }
    const showDropDown = () => {
      showDD.value = !showDD.value;
      showUnfinishedDD.value = false;
      showAssignedDD.value = false;
      showFinishedDD.value = false;
      showLicensedDD.value = false;
    };

    const showUnfinishedDropDown = () => {
      showUnfinishedDD.value = !showUnfinishedDD.value;
      showDD.value = false;
      showAssignedDD.value = false;
      showFinishedDD.value = false;
      showLicensedDD.value = false;
    };
    const showAssignedDropDown = () => {
      showAssignedDD.value = !showAssignedDD.value;
      showDD.value = false;
      showUnfinishedDD.value = false;
      showFinishedDD.value = false;
      showLicensedDD.value = false;
    };

    const showFinishedDropDown = () => {
      showFinishedDD.value = !showFinishedDD.value;
      showAssignedDD.value = false;
      showDD.value = false;
      showUnfinishedDD.value = false;
      showLicensedDD.value = false;
    };
    const showLicensedDropDown = () => {
      showLicensedDD.value = !showLicensedDD.value;
      showAssignedDD.value = false;
      showDD.value = false;
      showUnfinishedDD.value = false;
      showFinishedDD.value = false;
    };
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("allAdminData");
      localStorage.removeItem("adminId");
      localStorage.removeItem("role");
      store.dispatch("admin/logout");
      router.push({ path: "/admin" });
    };
    return {
      showDD,
      showDropDown,
      showUnfinishedDD,
      showAssignedDD,
      showFinishedDD,
      showLicensedDD,
      showUnfinishedDropDown,
      showAssignedDropDown,
      showFinishedDropDown,
      showLicensedDropDown,
      search,
      logout,
      showAdminCreate,
      isSuperAdmin,
      primaryText,
      adminName,
      isUserManager,
      navigateToHomePage,
    };
  },
};
</script>
<style lang="postcss" scoped>
#logout {
  cursor: pointer;
}
.width-548 {
  width: 548px;
}
.width-8 {
  width: 22px;
}
.width-small {
  width: 8px;
}
.height-8 {
  height: 22px;
}
h3 {
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  background: linear-gradient(-85deg, #3674b9, #b5b173);
  -webkit-background-clip: text;
}
hr {
  width: 32px;
  height: 3px;
  border-radius: 3px;
}
a {
  cursor: pointer;
}
</style>
