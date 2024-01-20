<template>
  <div>
    <div class="flex flex-row justify-start h-screen">
      <div class="bg-lightBlueB-200">
        <div class="flex pl-20 pt-8">
          <div class="mt-5">
            <h2 class="text-lightBlueB-400">New Requests</h2>
          </div>
        </div>
        <div class="flex flex-wrap justify-start mt-8 rounded ml-20">
          <transition name="slide-fade-to-left">
            <div
              class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 mb-4"
            >
              <div
                @click="openModalNL()"
                class="flex justify-center items-center w-64 h-40"
              >
                <div class="p-1">
                  <div class="flex content-center justify-center">
                    <RenderIllustration illustration="SimpleCertificate" />
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
              <div
                @click="openModalR()"
                class="flex justify-center items-center w-64 h-40"
              >
                <div class="p-1">
                  <div class="my-auto flex justify-center">
                    <RenderIllustration illustration="Renewal" />
                  </div>
                  <h4 class="text-lightBlueB-500 mt-tiny">Renewal</h4>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="flex justify-start mt-8 rounded ml-20">
          <!-- <transition name="slide-fade-to-left">
            <div
              class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 "
            >
              <div
                @click="openModalV()"
                class=" flex justify-center items-center w-64 h-40"
              >
                <div class="p-1">
                  <div class="my-auto flex justify-center">
                    <RenderIllustration illustration="Verification" />
                  </div>
                  <h4
                    class="text-lightBlueB-500 justify-center items-center ml-2 mt-tiny"
                  >
                    Verification
                  </h4>
                </div>
              </div>
            </div>
          </transition> -->
          <transition name="slide-fade-to-left">
            <div
              class="container mr-12 box-shadow-pop rounded-lg bg-lightGrey-100 mb-8"
            >
              <div
                @click="openModalGS()"
                class="flex justify-center items-center w-64 h-40"
              >
                <div class="p-1">
                  <div class="my-auto flex justify-center">
                    <RenderIllustration illustration="GoodStanding" />
                  </div>
                  <h4 class="text-lightBlueB-500 mt-tiny">Good Standing</h4>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <Modal v-if="showTermsOfAgreementNL">
      <TermsOfAgreementNL
        @showTermsOfAgreementNL="showTermsOfAgreementNL = false"
      />
    </Modal>
    <Modal v-if="showTermsOfAgreementR">
      <TermsOfAgreementR
        @showTermsOfAgreementR="showTermsOfAgreementR = false"
      />
    </Modal>
    <Modal v-if="showTermsOfAgreementV">
      <TermsOfAgreementV
        @showTermsOfAgreementV="showTermsOfAgreementV = false"
      />
    </Modal>
    <Modal v-if="showTermsOfAgreementGS">
      <TermsOfAgreementGS
        @showTermsOfAgreementGS="showTermsOfAgreementGS = false"
      />
    </Modal>
  </div>
</template>

<script>
import RenderIllustration from "@/sharedComponents/RenderIllustration";
import Modal from "@/sharedComponents/Modal";
import TermsOfAgreementNL from "@/components/NewLicense/TermsOfAgreement";
import TermsOfAgreementR from "@/components/Renewal/TermsOfAgreement";
import TermsOfAgreementV from "@/components/Verification/TermsOfAgreement";
import TermsOfAgreementGS from "@/components/GoodStanding/TermsOfAgreement";
import Navigation from "@/views/Navigation";
import SideNav from "@/views/SideNav.vue";
import Draft from "@/views/Draft.vue";
import Withdrawn from "@/views/Withdraw.vue";
import Submitted from "@/views/Submitted";
import Approved from "@/views/Approved";
import Declined from "@/views/Declined";
import UnderSupervision from "@/views/UnderSupervision";

import { ref } from "vue";

export default {
  components: {
    RenderIllustration,
    Modal,
    TermsOfAgreementNL,
    TermsOfAgreementR,
    TermsOfAgreementV,
    TermsOfAgreementGS,
    Navigation,
    SideNav,
    Draft,
    Withdrawn,
    Submitted,
    Approved,
    Declined,
    UnderSupervision,
  },
  setup() {
    const showTermsOfAgreementNL = ref(false);
    const showTermsOfAgreementR = ref(false);
    const showTermsOfAgreementV = ref(false);
    const showTermsOfAgreementGS = ref(false);
    let display = 0;
    const openModalNL = () => {
      showTermsOfAgreementNL.value = true;
    };
    const openModalR = () => {
      showTermsOfAgreementR.value = true;
    };
    const openModalV = () => {
      showTermsOfAgreementV.value = true;
    };
    const openModalGS = () => {
      showTermsOfAgreementGS.value = true;
    };
    const displaySet = (menu) => {
      display = menu;
    };
    return {
      display,
      showTermsOfAgreementNL,
      showTermsOfAgreementR,
      showTermsOfAgreementV,
      showTermsOfAgreementGS,
      displaySet,
      openModalNL,
      openModalR,
      openModalV,
      openModalGS,
    };
  },
};
</script>
<style>
i {
  color: lightBlueB-400;
}
</style>
