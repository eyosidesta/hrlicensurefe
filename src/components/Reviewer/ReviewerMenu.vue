<template>
  <!-- <div>
    <Navigation />
    <div class="bg-lightBlueB-200 h-screen">
      <div class="flex pl-24 pt-8">
        <div class="mt-5">
          <h2 class="text-lightBlueB-400">New Requests</h2>
        </div>
      </div>
      <div class="flex justify-center mt-8 rounded ">
        <transition name="slide-fade-to-left">
          <div
            class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 "
          >
            <div class="flex justify-center items-center w-64 h-40">
              <div class="p-1">
                <div class="flex content-center justify-center">
                  <router-link to="/newlicense">
                    <RenderIllustration illustration="SimpleCertificate" />
                  </router-link>
                </div>
                <h4 class="text-lightBlueB-500 mt-tiny">New License</h4>
              </div>
            </div>
          </div>
        </transition>
        <transition name="slide-fade-to-left">
          <div
            class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 "
          >
            <div class="flex justify-center items-center w-64 h-40">
              <div class="p-1">
                <div class="my-auto flex justify-center">
                  <router-link to="/renewal">
                    <RenderIllustration illustration="Renewal" />
                  </router-link>
                </div>
                <h4 class="text-lightBlueB-500 mt-tiny">Renewal</h4>
              </div>
            </div>
          </div>
        </transition>
        <transition name="slide-fade-to-left">
          <div
            class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 "
          >
            <div class="flex justify-center items-center w-64 h-40">
              <div class="p-1">
                <div class="flex">
                  <router-link to="/verification">
                    <RenderIllustration illustration="Verification" />
                  </router-link>
                </div>
                <h4
                  class="text-lightBlueB-500 justify-center items-center ml-2 mt-tiny"
                >
                  Verification
                </h4>
              </div>
            </div>
          </div>
        </transition>
        <transition name="slide-fade-to-left">
          <div
            class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 "
          >
            <div class="flex justify-center items-center w-64 h-40">
              <div class="p-1">
                <div class="my-auto flex justify-center">
                  <router-link to="/goodstanding">
                    <RenderIllustration illustration="GoodStanding" />
                  </router-link>
                </div>
                <h4 class="text-lightBlueB-500 mt-tiny">Good Standing</h4>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div> -->

  <div>
    <reviewer-nav-bar
      :tab="display"
      @changeSelectedSideBar="displaySet"
      @navigateToHome="displaySet"
    />
    <!-- <reviewer-nav-bar :display="menu" @changeDisplay="displaySet" /> -->
    <div style="width:100%" class="flex flex-row">
      <div class="sidenav">
        <reviewer-side-nav :display="menu" @changeDisplay="displaySet" />
      </div>
      <div class="menu">
        <div
          v-if="
            this.display == 'newLicenseUnassigned' &&
              this.isStatusFetched == true
          "
        >
          <new-license-unassigned />
        </div>
        <div v-if="this.display == 'newLicenseReSubmitted'">
          <new-license-re-applied />
        </div>
        <div v-if="this.display == 'newLicenseAssigned'">
          <new-license-assigned />
        </div>
        <div v-if="this.display == 'newLicenseAssignedToOthers'">
          <new-license-assigned-to-others />
        </div>
        <div v-if="this.display == 'newLicenseUnfinished'">
          <new-license-unfinished />
        </div>
        <div v-if="this.display == 'newLicenseOthersUnfinished'">
          <new-license-others-unfinished />
        </div>
        <div v-if="this.display == 'newLicenseUnassignedEvaluation'">
          <new-license-un-confirmed />
          <div v-if="expertLevelId != 3">
            <new-license-declined />
            <new-license-under-super-vision />
          </div>
        </div>
        <div v-if="this.display == 'newLicenseOthersUnassignedEvaluation'">
          <new-license-all-un-confirmed />
          <div v-if="expertLevelId != 3">
            <new-license-all-declined />
            <new-license-others-under-super-vision />
          </div>
        </div>
        <div v-if="this.display == 'newLicenseUnderEvaluation'">
          <new-license-on-review />
        </div>
        <div v-if="this.display == 'newLicenseOthersUnderEvaluation'">
          <new-license-others-on-review />
        </div>
        <div v-if="this.display == 'newLicenseEvaluationAssessment'">
          <new-license-re-evaluate />
        </div>
        <div v-if="this.display == 'newLicenseOthersEvaluationAssessment'">
          <new-license-others-re-evaluate />
        </div>
        <div v-if="this.display == 'newLicenseDeclined'">
          <new-license-declined />
        </div>
        <div v-if="this.display == 'newLicenseOthersDeclined'">
          <new-license-all-declined />
        </div>
        <div v-if="this.display == 'newLicenseUnderSuperVision'">
          <new-license-under-super-vision />
        </div>
        <div v-if="this.display == 'newLicenseOthersUnderSuperVision'">
          <new-license-others-under-super-vision />
        </div>
        <div v-if="this.display == 'newLicenseConfirmed'">
          <new-license-confirmed />
        </div>
        <div v-if="this.display == 'othersNewLicenseConfirmed'">
          <new-license-others-confirmed />
        </div>
        <div v-if="this.display == 'newLicenseDeclineConfirmed'">
          <new-license-decline-confirmed />
        </div>
        <div v-if="this.display == 'newLicenseOthersDeclineConfirmed'">
          <new-license-others-decline-confirmed />
        </div>
        <div v-if="this.display == 'newLicenseUnderSuperVisionConfirmed'">
          <new-license-under-super-vision-confirmed />
        </div>
        <div v-if="this.display == 'newLicenseOthersUnderSuperVisionConfirmed'">
          <new-license-others-under-super-vision-confirmed />
        </div>
        <div v-if="this.display == 'newLicenseReturnedEvaluation'">
          <new-license-returned-to-me />
        </div>
        <div v-if="this.display == 'newLicenseOthersReturnedEvaluation'">
          <new-license-returned-to-others />
        </div>
        <div v-if="this.display == 'newLicenseInReviewPayment'">
          <new-license-pending-payment />
        </div>
        <div v-if="this.display == 'othersNewLicenseInReviewPayment'">
          <new-license-others-pending-payment />
        </div>
        <div v-if="this.display == 'newLicenseDeclinedPayment'">
          <new-license-declined-payment />
        </div>
        <div v-if="this.display == 'othersNewLicenseDeclinedPayment'">
          <new-license-others-declined-payment />
        </div>
        <div v-if="this.display == 'newLicenseLicensed'">
          <new-license-licensed />
        </div>
        <div v-if="this.display == 'newLicenseOthersLicensed'">
          <new-license-others-licensed />
        </div>
        <div v-if="this.display == 'newLicenseAllLicensed'">
          <new-license-all-licensed />
        </div>

        <!-- renewal -->
        <div v-if="this.display == 'RenewalUnassigned'">
          <renewal-unassigned />
        </div>
        <div v-if="this.display == 'renewalReSubmitted'">
          <renewal-re-applied />
        </div>
        <div v-if="this.display == 'renewalAssigned'">
          <renewal-assigned />
        </div>
        <div v-if="this.display == 'renewalAssignedToOthers'">
          <renewal-assigned-to-others />
        </div>
        <div v-if="this.display == 'renewalUnfinished'">
          <renewal-unfinished />
        </div>
        <div v-if="this.display == 'renewalOthersUnfinished'">
          <renewal-others-unfinished />
        </div>
        <div v-if="this.display == 'renewalUnassignedEvaluation'">
          <renewal-unconfirmed />
          <div v-if="expertLevelId != 3">
            <renewal-declined />
            <renewal-under-super-vision />
          </div>
        </div>
        <div v-if="this.display == 'renewalOthersUnassignedEvaluation'">
          <renewal-all-unconfirmed />
          <div v-if="expertLevelId != 3">
            <renewal-all-declined />
            <renewal-others-under-super-vision />
          </div>
        </div>
        <div v-if="this.display == 'renewalUnderEvaluation'">
          <renewal-on-review />
        </div>
        <div v-if="this.display == 'renewalOthersUnderEvaluation'">
          <renewal-others-on-review />
        </div>
        <div v-if="this.display == 'renewalEvaluationAssessment'">
          <renewal-re-evaluate />
        </div>
        <div v-if="this.display == 'renewalOthersEvaluationAssessment'">
          <renewal-others-re-evaluate />
        </div>
        <div v-if="this.display == 'renewalDeclined'">
          <renewal-declined />
        </div>
        <div v-if="this.display == 'allRenewalDeclined'">
          <renewal-all-declined />
        </div>
        <div v-if="this.display == 'renewalUnderSuperVision'">
          <renewal-under-super-vision />
        </div>
        <div v-if="this.display == 'renewalOthersUnderSuperVision'">
          <renewal-others-under-super-vision />
        </div>
        <div v-if="this.display == 'renewalConfirmed'">
          <renewal-confirmed />
        </div>
        <div v-if="this.display == 'othersRenewalConfirmed'">
          <renewal-others-confirmed />
        </div>
        <div v-if="this.display == 'renewalDeclineConfirmed'">
          <renewal-decline-confirmed />
        </div>
        <div v-if="this.display == 'othersRenewalDeclineConfirmed'">
          <renewal-others-decline-confirmed />
        </div>
        <div v-if="this.display == 'renewalUnderSuperVisionConfirmed'">
          <renewal-under-super-vision-confirmed />
        </div>
        <div v-if="this.display == 'renewalOthersUnderSuperVisionConfirmed'">
          <renewal-others-under-super-vision-confirmed />
        </div>
        <div v-if="this.display == 'renewalReturnedEvaluation'">
          <renewal-returned-to-me />
        </div>
        <div v-if="this.display == 'renewalOthersReturnedEvaluation'">
          <renewal-returned-to-others />
        </div>
        <div v-if="this.display == 'renewalInReviewPayment'">
          <renewal-pending-payment />
        </div>
        <div v-if="this.display == 'othersRenewalInReviewPayment'">
          <renewal-others-pending-payment />
        </div>
        <div v-if="this.display == 'renewalDeclinedPayment'">
          <renewal-declined-payment />
        </div>
        <div v-if="this.display == 'othersRenewalDeclinedPayment'">
          <renewal-others-declined-payment />
        </div>
        <div v-if="this.display == 'renewalLicensed'">
          <renewal-licensed />
        </div>
        <div v-if="this.display == 'renewalOthersLicensed'">
          <renewal-others-licensed />
        </div>
        <div v-if="this.display == 'renewalAllLicensed'">
          <renewal-all-licensed />
        </div>

        <!-- start verification -->
        <div v-if="this.display == 'verificationUnassigned'">
          <verification-unassigned />
        </div>
        <div v-if="this.display == 'verificationReSubmitted'">
          <verification-re-applied />
        </div>
        <div v-if="this.display == 'verificationAssigned'">
          <verification-assigned />
        </div>
        <div v-if="this.display == 'verificationAssignedToOthers'">
          <verification-assigned-to-others />
        </div>
        <div v-if="this.display == 'verificationUnfinished'">
          <verification-unfinished />
        </div>
        <div v-if="this.display == 'verificationOthersUnfinished'">
          <verification-others-unfinished />
        </div>
        <div v-if="this.display == 'verificationUnconfirmed'">
          <verification-unconfirmed />
        </div>
        <div v-if="this.display == 'allVerificationUnconfirmed'">
          <verification-all-unconfirmed />
        </div>
        <div v-if="this.display == 'verificationDeclined'">
          <verification-declined />
        </div>
        <div v-if="this.display == 'allVerificationDeclined'">
          <verification-all-declined />
        </div>
        <!-- end verification -->

        <!-- start goodstanding -->
        <div v-if="this.display == 'goodStandingUnassigned'">
          <good-standing-unassigned />
        </div>
        <div v-if="this.display == 'goodStandingReSubmitted'">
          <good-standing-re-applied />
        </div>
        <div v-if="this.display == 'goodStandingAssigned'">
          <good-standing-assigned />
        </div>
        <div v-if="this.display == 'goodStandingAssignedToOthers'">
          <good-standing-assigned-to-others />
        </div>
        <div v-if="this.display == 'goodStandingUnfinished'">
          <good-standing-unfinished />
        </div>
        <div v-if="this.display == 'goodStandingOthersUnfinished'">
          <good-standing-others-unfinished />
        </div>
        <div v-if="this.display == 'goodStandingUnconfirmed'">
          <good-standing-unconfirmed />
        </div>
        <div v-if="this.display == 'allGoodStandingUnconfirmed'">
          <good-standing-all-unconfirmed />
        </div>
        <div v-if="this.display == 'goodStandingDeclined'">
          <good-standing-declined />
        </div>
        <div v-if="this.display == 'allGoodStandingDeclined'">
          <good-standing-all-declined />
        </div>
        <div v-if="this.display == 'goodStandingInReviewPayment'">
          <good-standing-pending-payment />
        </div>
        <div v-if="this.display == 'othersGoodStandingInReviewPayment'">
          <good-standing-others-pending-payment />
        </div>
        <div v-if="this.display == 'goodStandingDeclinedPayment'">
          <good-standing-declined-payment />
        </div>
        <div v-if="this.display == 'othersGoodStandingDeclinedPayment'">
          <good-standing-others-declined-payment />
        </div>
        <div v-if="this.display == 'goodStandingLicensed'">
          <good-standing-licensed />
        </div>
        <div v-if="this.display == 'goodStandingOthersLicensed'">
          <good-standing-others-licensed />
        </div>
        <div v-if="this.display == 'goodStandingAllLicensed'">
          <good-standing-all-licensed />
        </div>
        <!-- end goodstanding -->

        <div v-if="this.display == 'report'">
          <report />
        </div>

        <div v-if="this.display == 'dashboard'">
          <dashboard />
        </div>
        <div v-if="this.display == 'allLicensed'">
          <all-licensed />
        </div>
        <div v-if="this.display == 'accredited'">
          <accredited />
        </div>
        <div v-if="this.display == 'suspendedCancelled'">
          <suspended-cancelled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import newLicenseUnassigned from "./ApplicationTypes/NewLicense/newLicenseUnassigned.vue";
import NewLicenseReApplied from "./ApplicationTypes/NewLicense/NewLicenseReApplied.vue";
import NewLicenseAssigned from "./ApplicationTypes/NewLicense/NewLicenseAssigned.vue";
import NewLicenseAssignedToOthers from "./ApplicationTypes/NewLicense/NewLicenseAssignedToOthers.vue";
import NewLicenseUnfinished from "./ApplicationTypes/NewLicense/NewLicenseUnfinished.vue";
import NewLicenseOthersUnfinished from "./ApplicationTypes/NewLicense/NewLicenseOthersUnfinished.vue";
import NewLicenseUnConfirmed from "./ApplicationTypes/NewLicense/NewLicenseUnConfirmed.vue";
import NewLicenseAllUnConfirmed from "./ApplicationTypes/NewLicense/NewLicenseAllUnConfirmed.vue";
import NewLicenseOnReview from "./ApplicationTypes/NewLicense/NewLicenseOnReview.vue";
import NewLicenseOthersOnReview from "./ApplicationTypes/NewLicense/NewLicenseOthersOnReview.vue";
import NewLicenseReEvaluate from "./ApplicationTypes/NewLicense/NewLicenseReEvaluate.vue";
import NewLicenseOthersReEvaluate from "./ApplicationTypes/NewLicense/NewLicenseOthersReEvaluate.vue";
import NewLicenseDeclined from "./ApplicationTypes/NewLicense/NewLicenseDeclined.vue";
import NewLicenseAllDeclined from "./ApplicationTypes/NewLicense/NewLicenseAllDeclined.vue";
import NewLicenseUnderSuperVision from "./ApplicationTypes/NewLicense/NewLicenseUnderSuperVision.vue";
import NewLicenseOthersUnderSuperVision from "./ApplicationTypes/NewLicense/NewLicenseOthersUnderSuperVision.vue";
import NewLicenseConfirmed from "./ApplicationTypes/NewLicense/NewLicenseConfirmed.vue";
import NewLicenseOthersConfirmed from "./ApplicationTypes/NewLicense/NewLicenseOthersConfirmed.vue";
import NewLicenseDeclineConfirmed from "./ApplicationTypes/NewLicense/NewLicenseDeclineConfirmed.vue";
import NewLicenseOthersDeclineConfirmed from "./ApplicationTypes/NewLicense/NewLicenseOthersDeclineConfirmed.vue";
import NewLicenseUnderSuperVisionConfirmed from "./ApplicationTypes/NewLicense/NewLicenseUnderSuperVisionConfirmed.vue";
import NewLicenseOthersUnderSuperVisionConfirmed from "./ApplicationTypes/NewLicense/NewLicenseOthersUnderSuperVisionConfirmed.vue";
import NewLicenseReturnedToMe from "./ApplicationTypes/NewLicense/NewLicenseReturnedToMe.vue";
import NewLicenseReturnedToOthers from "./ApplicationTypes/NewLicense/NewLicenseReturnedToOthers.vue";
import NewLicensePendingPayment from "./ApplicationTypes/NewLicense/NewLicensePendingPayment.vue";
import NewLicenseOthersPendingPayment from "./ApplicationTypes/NewLicense/NewLicenseOthersPendingPayment.vue";
import NewLicenseDeclinedPayment from "./ApplicationTypes/NewLicense/NewLicenseDeclinedPayment.vue";
import NewLicenseOthersDeclinedPayment from "./ApplicationTypes/NewLicense/NewLicenseOthersDeclinedPayment.vue";
import NewLicenseLicensed from "./ApplicationTypes/NewLicense/NewLicenseLicensed.vue";
import NewLicenseOthersLicensed from "./ApplicationTypes/NewLicense/NewLicenseOthersLicensed.vue";
import NewLicenseAllLicensed from "./ApplicationTypes/NewLicense/NewLicenseAllLicensed.vue";

// import renewal components
import RenewalUnassigned from "./ApplicationTypes/Renewal/RenewalUnassigned.vue";
import RenewalReApplied from "./ApplicationTypes/Renewal/RenewalReApplied.vue";
import RenewalAssigned from "./ApplicationTypes/Renewal/RenewalAssigned.vue";
import RenewalAssignedToOthers from "./ApplicationTypes/Renewal/RenewalAssignedToOthers.vue";
import RenewalUnfinished from "./ApplicationTypes/Renewal/RenewalUnfinished.vue";
import RenewalOthersUnfinished from "./ApplicationTypes/Renewal/RenewalOthersUnfinished.vue";
import RenewalUnconfirmed from "./ApplicationTypes/Renewal/RenewalUnconfirmed.vue";
import RenewalAllUnconfirmed from "./ApplicationTypes/Renewal/RenewalAllUnconfirmed.vue";
import RenewalOnReview from "./ApplicationTypes/Renewal/RenewalOnReview.vue";
import RenewalOthersOnReview from "./ApplicationTypes/Renewal/RenewalOthersOnReview.vue";
import RenewalReEvaluate from "./ApplicationTypes/Renewal/RenewalReEvaluate.vue";
import RenewalOthersReEvaluate from "./ApplicationTypes/Renewal/RenewalOthersReEvaluate.vue";
import RenewalDeclined from "./ApplicationTypes/Renewal/RenewalDeclined.vue";
import RenewalAllDeclined from "./ApplicationTypes/Renewal/RenewalAllDeclined.vue";
import RenewalUnderSuperVision from "./ApplicationTypes/Renewal/RenewalUnderSuperVision.vue";
import RenewalOthersUnderSuperVision from "./ApplicationTypes/Renewal/RenewalOthersUnderSuperVision.vue";
import RenewalConfirmed from "./ApplicationTypes/Renewal/RenewalConfirmed.vue";
import RenewalOthersConfirmed from "./ApplicationTypes/Renewal/RenewalOthersConfirmed.vue";
import RenewalDeclineConfirmed from "./ApplicationTypes/Renewal/RenewalDeclineConfirmed.vue";
import RenewalOthersDeclineConfirmed from "./ApplicationTypes/Renewal/RenewalOthersDeclineConfirmed.vue";
import RenewalUnderSuperVisionConfirmed from "./ApplicationTypes/Renewal/RenewalUnderSuperVisionConfirmed.vue";
import RenewalOthersUnderSuperVisionConfirmed from "./ApplicationTypes/Renewal/RenewalOthersUnderSuperVisionConfirmed.vue";
import RenewalReturnedToMe from "./ApplicationTypes/Renewal/RenewalReturnedToMe.vue";
import RenewalReturnedToOthers from "./ApplicationTypes/Renewal/RenewalReturnedToOthers.vue";
import RenewalPendingPayment from "./ApplicationTypes/Renewal/RenewalPendingPayment.vue";
import RenewalOthersPendingPayment from "./ApplicationTypes/Renewal/RenewalOthersPendingPayment.vue";
import RenewalDeclinedPayment from "./ApplicationTypes/Renewal/RenewalDeclinedPayment.vue";
import RenewalOthersDeclinedPayment from "./ApplicationTypes/Renewal/RenewalOthersDeclinedPayment.vue";
import RenewalLicensed from "./ApplicationTypes/Renewal/RenewalLicensed.vue";
import RenewalOthersLicensed from "./ApplicationTypes/Renewal/RenewalOthersLicensed.vue";
import RenewalAllLicensed from "./ApplicationTypes/Renewal/RenewalAllLicensed.vue";

// import verification components
import VerificationUnassigned from "./ApplicationTypes/Verification/VerificationUnassigned.vue";
import VerificationReApplied from "./ApplicationTypes/Verification/VerificationReApplied.vue";
import VerificationAssigned from "./ApplicationTypes/Verification/VerificationAssigned.vue";
import VerificationAssignedToOthers from "./ApplicationTypes/Verification/VerificationAssignedToOthers.vue";
import VerificationUnfinished from "./ApplicationTypes/Verification/VerificationUnfinished.vue";
import VerificationOthersUnfinished from "./ApplicationTypes/Verification/VerificationOthersUnfinished.vue";
import VerificationUnconfirmed from "./ApplicationTypes/Verification/VerificationUnconfirmed.vue";
import VerificationAllUnconfirmed from "./ApplicationTypes/Verification/VerificationUnconfirmed.vue";
import VerificationDeclined from "./ApplicationTypes/Verification/VerificationDeclined.vue";
import VerificationAllDeclined from "./ApplicationTypes/Verification/VerificationAllDeclined.vue";

// import goodstanding components
import GoodStandingUnassigned from "./ApplicationTypes/GoodStanding/GoodStandingUnassigned.vue";
import GoodStandingReApplied from "./ApplicationTypes/GoodStanding/GoodStandingReApplied.vue";
import GoodStandingAssigned from "./ApplicationTypes/GoodStanding/GoodStandingAssigned.vue";
import GoodStandingAssignedToOthers from "./ApplicationTypes/GoodStanding/GoodStandingAssignedToOthers.vue";
import GoodStandingUnfinished from "./ApplicationTypes/GoodStanding/GoodStandingUnfinished.vue";
import GoodStandingOthersUnfinished from "./ApplicationTypes/GoodStanding/GoodStandingOthersUnfinished.vue";
import GoodStandingUnconfirmed from "./ApplicationTypes/GoodStanding/GoodStandingUnconfirmed.vue";
import GoodStandingAllUnconfirmed from "./ApplicationTypes/GoodStanding/GoodStandingAllUnconfirmed.vue";
import GoodStandingDeclined from "./ApplicationTypes/GoodStanding/GoodStandingDeclined.vue";
import GoodStandingAllDeclined from "./ApplicationTypes/GoodStanding/GoodStandingAllDeclined.vue";
import GoodStandingPendingPayment from "./ApplicationTypes/GoodStanding/GoodStandingPendingPayment.vue";
import GoodStandingOthersPendingPayment from "./ApplicationTypes/GoodStanding/GoodStandingOthersPendingPayment.vue";
import GoodStandingDeclinedPayment from "./ApplicationTypes/GoodStanding/GoodStandingDeclinedPayment.vue";
import GoodStandingOthersDeclinedPayment from "./ApplicationTypes/GoodStanding/GoodStandingOthersDeclinedPayment.vue";
import GoodStandingLicensed from "./ApplicationTypes/GoodStanding/GoodStandingLicensed.vue";
import GoodStandingOthersLicensed from "./ApplicationTypes/GoodStanding/GoodStandingOthersLicensed.vue";
import GoodStandingAllLicensed from "./ApplicationTypes/GoodStanding/GoodStandingAllLicensed.vue";

import AllLicensed from "./ApplicationTypes/AllLicensed/AllLicensed.vue";
import Accredited from "./ApplicationTypes/AllLicensed/Accredited.vue";
import SuspendedCancelled from "./ApplicationTypes/AllLicensed/SuspendedCancelled.vue"
// import AllLicensed from "./ApplicationTypes/AllLicensed/AllLicensed.vue";
// import Accredited from "./ApplicationTypes/AllLicensed/Accredited.vue";

import Report from "../Report/Report.vue";
import Dashboard from "./Dashboard.vue";

import ReviewerNavBar from "./ReviewerNavBar.vue";
import ReviewerSideNav from "./ReviewerSideNav.vue";

export default {
  components: {
    newLicenseUnassigned,
    NewLicenseReApplied,
    ReviewerNavBar,
    ReviewerSideNav,
    NewLicenseAssigned,
    NewLicenseAssignedToOthers,
    NewLicenseUnfinished,
    NewLicenseOthersUnfinished,
    NewLicenseUnConfirmed,
    NewLicenseAllUnConfirmed,
    NewLicenseOnReview,
    NewLicenseOthersOnReview,
    NewLicenseReEvaluate,
    NewLicenseOthersReEvaluate,
    NewLicenseDeclined,
    NewLicenseAllDeclined,
    NewLicenseUnderSuperVision,
    NewLicenseOthersUnderSuperVision,
    NewLicenseConfirmed,
    NewLicenseOthersConfirmed,
    NewLicenseDeclineConfirmed,
    NewLicenseUnderSuperVisionConfirmed,
    NewLicenseOthersUnderSuperVisionConfirmed,
    NewLicenseOthersDeclineConfirmed,
    NewLicenseReturnedToMe,
    NewLicenseReturnedToOthers,
    NewLicensePendingPayment,
    NewLicenseOthersPendingPayment,
    NewLicenseDeclinedPayment,
    NewLicenseOthersDeclinedPayment,
    NewLicenseLicensed,
    NewLicenseOthersLicensed,
    NewLicenseAllLicensed,

    RenewalUnassigned,
    RenewalReApplied,
    RenewalAssigned,
    RenewalAssignedToOthers,
    RenewalUnfinished,
    RenewalOthersUnfinished,
    RenewalUnconfirmed,
    RenewalAllUnconfirmed,
    RenewalOnReview,
    RenewalOthersOnReview,
    RenewalReEvaluate,
    RenewalOthersReEvaluate,
    RenewalDeclined,
    RenewalAllDeclined,
    RenewalUnderSuperVision,
    RenewalOthersUnderSuperVision,
    RenewalConfirmed,
    RenewalOthersConfirmed,
    RenewalDeclineConfirmed,
    RenewalOthersDeclineConfirmed,
    RenewalUnderSuperVisionConfirmed,
    RenewalOthersUnderSuperVisionConfirmed,
    RenewalReturnedToMe,
    RenewalReturnedToOthers,
    RenewalPendingPayment,
    RenewalOthersPendingPayment,
    RenewalDeclinedPayment,
    RenewalOthersDeclinedPayment,
    RenewalLicensed,
    RenewalOthersLicensed,
    RenewalAllLicensed,

    VerificationUnassigned,
    VerificationReApplied,
    VerificationAssigned,
    VerificationAssignedToOthers,
    VerificationUnfinished,
    VerificationOthersUnfinished,
    VerificationUnconfirmed,
    VerificationAllUnconfirmed,
    VerificationDeclined,
    VerificationAllDeclined,

    GoodStandingUnassigned,
    GoodStandingReApplied,
    GoodStandingAssigned,
    GoodStandingAssignedToOthers,
    GoodStandingUnfinished,
    GoodStandingOthersUnfinished,
    GoodStandingUnconfirmed,
    GoodStandingAllUnconfirmed,
    GoodStandingDeclined,
    GoodStandingAllDeclined,
    GoodStandingPendingPayment,
    GoodStandingDeclinedPayment,
    GoodStandingOthersPendingPayment,
    GoodStandingOthersDeclinedPayment,
    GoodStandingLicensed,
    GoodStandingOthersLicensed,
    GoodStandingAllLicensed,

    AllLicensed,
    Accredited,
    SuspendedCancelled,

    Dashboard,
    Report,
  },
  setup() {
    const store = useStore();

    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;
    let display = ref("newLicenseUnassigned");
    let selectedValue = ref("");

    const displaySet = (menu) => {
      display.value = menu;
    };

    let isStatusFetched = ref(false);

    const fetchApplicationStatus = () => {
      store.dispatch("admin/getApplicationStatus").then((res) => {
        isStatusFetched.value = true;
      });
    };

    onMounted(() => {
      fetchApplicationStatus();
    });

    return {
      displaySet,
      display,
      isStatusFetched,
      selectedValue,
      expertLevelId,
    };
  },
};
</script>
<style>
.menu {
  width: 80%;
}
.sidenav {
  width: 20%;
}
</style>
