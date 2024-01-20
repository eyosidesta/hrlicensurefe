<template>
  <div
    class=" overflow-y-auto overflow-x-hidden shadow-xl  fixed lg:sticky h-screen lg:h-auto z-40 top-0 bg-gray-900 "
    style="max-width: 380px; background: #285180;"
  >
    <div class="px-8 h-screen">
      <ul class="py-1 ">
        <new-license-side-nav
          :expertLevelId="expertLevelId"
          :adminRole="adminRole"
          :dropdownValue="dropdownValue"
          @applicationTypeSelected="applicationTypeHandler"
          @selectNewLicenseMenu="selectMenu"
        />
        <renewal-side-nav
          :expertLevelId="expertLevelId"
          :adminRole="adminRole"
          :dropdownValue="dropdownValue"
          @applicationTypeSelected="applicationTypeHandler"
          @selectRenewalMenu="selectMenu"
        />
        <!-- <verification-side-nav
          :dropdownValue="dropdownValue"
          :adminRole="adminRole"
          @applicationTypeSelected="applicationTypeHandler"
          @selectVerificationMenu="selectMenu"
        /> -->
        <good-standing-side-nav
          :dropdownValue="dropdownValue"
          :adminRole="adminRole"
          @applicationTypeSelected="applicationTypeHandler"
          @selectGoodStandingMenu="selectMenu"
        />
        <all-licensed-side-nav
          :dropdownValue="dropdownValue"
          :adminRole="adminRole"
          @applicationTypeSelected="applicationTypeHandler"
          @selectAllLicensedMenu="selectMenu"
        />
        <report-side-nav @selectReportMenu="selectMenu" />

        <dashboard-side-nav @selectDashboardMenu="selectMenu" />
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import NewLicenseSideNav from "./ReviewerSideNavComponents/NewLicenseSideNav.vue";
import RenewalSideNav from "./ReviewerSideNavComponents/RenewalSideNav.vue";
import VerificationSideNav from "./ReviewerSideNavComponents/VerificationSideNav.vue";
import GoodStandingSideNav from "./ReviewerSideNavComponents/GoodStandingSideNav.vue";
import AllLicensedSideNav from "./ReviewerSideNavComponents/AllLicensedSideNav.vue";
import ReportSideNav from "./ReviewerSideNavComponents/ReportSideNav.vue";
import DashboardSideNav from "./ReviewerSideNavComponents/DashboardSideNav.vue";
import {
  dropdown,
  applicationTypeDD,
} from "./Configurations/ApplicationDetailDropDown";
export default {
  props: ["display"],
  // methods: {
  //   selectMenu(menu) {
  //     this.$emit("changeDisplay", menu);
  //   },
  // },
  components: {
    NewLicenseSideNav,
    RenewalSideNav,
    VerificationSideNav,
    GoodStandingSideNav,
    ReportSideNav,
    DashboardSideNav,
    AllLicensedSideNav,
  },
  setup(props, { emit }) {
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;
    const adminRole = localStorage.getItem("role");

    let dropdownValue = ref({
      ...dropdown,
    });

    const applicationTypeHandler = (value) => {
      applicationTypeDD(value, dropdownValue.value);
    };

    const selectMenu = (menu) => {
      emit("changeDisplay", menu);
    };

    return {
      dropdownValue,
      expertLevelId,
      adminRole,
      selectMenu,
      applicationTypeHandler,
    };
  },
};
</script>
<style>
li {
  cursor: pointer;
}
li router-link {
  color: white;
  font-size: 90px;
}
</style>
