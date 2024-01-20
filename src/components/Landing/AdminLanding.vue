<template>
  <div class="overflow-x-hidden">
    <AdminLandingTopNav @setShowLogin="showLogin = true" />
    <AdminGetCertifiedSection />
    <NewLicenseSection />
    <RenewalSection />
    <VerificationSection />
    <GoodStandingSection />
    <DeviceAccessibilitySection />
    <MinistryOfHealthSection />
    <FooterSection />
    <transition name="slide-fade-to-left">
      <Modal v-if="showLogin">
        <AdminLogin
          @closeModal="showLogin = false"
          @redirectToSignup="redirectToSignup"
        />
      </Modal>
    </transition>
  </div>
</template>
<script>
import { ref } from "vue";
import AdminLandingTopNav from "./sections/AdminLandingTopNav";
import AdminGetCertifiedSection from "./sections/AdminGetCertifiedSection";
import NewLicenseSection from "./sections/NewLicenseSection";
import RenewalSection from "./sections/RenewalSection";
import VerificationSection from "./sections/VerificationSection";
import GoodStandingSection from "./sections/GoodStandingSection";
import DeviceAccessibilitySection from "./sections/DeviceAccessibilitySection";
import MinistryOfHealthSection from "./sections/MinistryOfHealthSection";
import FooterSection from "./sections/FooterSection";
import Modal from "@/sharedComponents/Modal";
import AdminLogin from "@/components/Login/AdminLogin";

export default {
  components: {
    AdminLandingTopNav,
    AdminGetCertifiedSection,
    NewLicenseSection,
    RenewalSection,
    VerificationSection,
    GoodStandingSection,
    DeviceAccessibilitySection,
    MinistryOfHealthSection,
    FooterSection,
    Modal,
    AdminLogin,
  },
  setup() {
    const showLogin = ref(false);

    const redirectToLogin = () => {
      showLogin.value = true;
    };

    return {
      showLogin,
      redirectToLogin,
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
