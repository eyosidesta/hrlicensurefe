<template>
  <div class="overflow-x-hidden">
    <LandingTopNav @setShowLogin="showLogin = true" />
    <GetCertifiedSection @setShowSignup="showSignUp = true" />
    <NewLicenseSection />
    <RenewalSection />
    <VerificationSection />
    <GoodStandingSection />
    <DeviceAccessibilitySection />
    <MinistryOfHealthSection />
    <FooterSection />
    <transition name="slide-fade-to-left">
      <Modal v-if="showLogin">
        <Login
          @closeModal="showLogin = false"
          @redirectToSignup="redirectToSignup"
          @forgotPassword="forgotPassword"
        />
      </Modal>
    </transition>
    <transition name="slide-fade-to-left">
      <Modal v-if="showSignUp">
        <Signup
          @closeModal="showSignUp = false"
          @redirectToLogin="redirectToLogin"
        />
      </Modal>
    </transition>
    <Modal v-if="showSendEmail">
      <SendEmail @closeModal="showSendEmail = false" />
    </Modal>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import LandingTopNav from "./sections/LandingTopNav";
import GetCertifiedSection from "./sections/GetCertifiedSection";
import NewLicenseSection from "./sections/NewLicenseSection";
import RenewalSection from "./sections/RenewalSection";
import VerificationSection from "./sections/VerificationSection";
import GoodStandingSection from "./sections/GoodStandingSection";
import DeviceAccessibilitySection from "./sections/DeviceAccessibilitySection";
import MinistryOfHealthSection from "./sections/MinistryOfHealthSection";
import FooterSection from "./sections/FooterSection";
import SendEmail from "@/components/Signup/SendEmail";
import Modal from "@/sharedComponents/Modal";
import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";

export default {
  components: {
    LandingTopNav,
    GetCertifiedSection,
    NewLicenseSection,
    RenewalSection,
    VerificationSection,
    GoodStandingSection,
    DeviceAccessibilitySection,
    MinistryOfHealthSection,
    FooterSection,
    Modal,
    Login,
    Signup,
    SendEmail,
  },
  setup() {
    onMounted(() => {});
    const showLogin = ref(false);
    const showSignUp = ref(false);
    const showSendEmail = ref(false);
    const redirectToSignup = () => {
      showLogin.value = false;
      showSignUp.value = true;
    };
    const redirectToLogin = () => {
      showLogin.value = true;
      showSignUp.value = false;
    };
    const forgotPassword = () => {
      showLogin.value = false;
      showSignUp.value = false;
      showSendEmail.value = true;
    };
    return {
      showLogin,
      showSignUp,
      redirectToSignup,
      redirectToLogin,
      forgotPassword,
      showSendEmail,
    };
  },
};
</script>
<style lang="postcss">
.blue-gradient {
  background-image: linear-gradient(to bottom, #285180, #162b43);
}

.separator {
  height: 13px;
  border-radius: 12px;
  height: 10px;
  width: 144px;
}

.separator-large {
  width: 250px;
}

.glow {
  box-shadow: 0px 3px 6px #fde68a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-to-top-enter-active,
.slide-fade-to-right-enter-active,
.slide-fade-to-left-enter-active {
  transition: all 0.8s ease-in;
}

.slide-fade-to-top-leave-active,
.slide-fade-to-right-leave-active,
.slide-fade-to-left-leave-active {
  transition: all 0.3s all-ease;
}

.slide-fade-to-top-enter-from,
.slide-fade-to-top-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.slide-fade-to-right-enter-from,
.slide-fade-to-right-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-fade-to-left-enter-from,
.slide-fade-to-left-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
