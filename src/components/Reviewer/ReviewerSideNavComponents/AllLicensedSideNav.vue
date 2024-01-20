<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
            @click="allLicensedDDHandler('AllLicensed')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 far fa-thumbs-up fa-x fa-light"></i>
                  <i
                    v-if="allLicensedDDIcon.isAllLicensedUp"
                    class="fas fa-chevron-circle-up float-right mt-2"
                  ></i>
                  <i
                    v-else
                    class="fas fa-chevron-circle-down float-right mt-2"
                  ></i>
                </span>
                <span class="text-lg" style="color: white; ">All Licensed</span>
              </h3>
            </div>
          </div>

          <div
            v-if="dropdownValue.allLicensed"
            class="dropdown-menu   mb-12 ml-4 "
            style="color: #648ea3; width: 200px;"
          >
            <ul class="block w-full shadow float-right" style="color: #648ea3;">
              <li @click="AllLicensedMenuHandler('allLicensed')" class="mb-2">
                <div class=" text-base" style="color: white; ">
                  <!-- <i class="far fa-thumbs-up fa-x fa-light mt-4"></i> -->
                  All Licensed
                </div>
              </li>

              <li @click="AllLicensedMenuHandler('accredited')" class="mb-2">
                <div class=" text-base" style="color: white; ">
                  <!-- <i class="far fa-thumbs-up fa-x fa-light mt-4"></i> -->
                  Legacy data
                </div>
              </li>
              <li @click="AllLicensedMenuHandler('suspendedCancelled')" class="mb-2">
                <div class=" text-base" style="color: white; ">
                  <!-- <i class="far fa-thumbs-up fa-x fa-light mt-4"></i> -->
                  Suspended / Cancelled
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </li>
  </div>
</template>
<script>
import { ref } from "vue";
import DropDownLists from "./DropDownLists.vue";
export default {
  name: "AllLicensedSideNav",
  components: {
    DropDownLists,
  },
  props: ["dropdownValue", "adminRole"],
  setup(props, { emit }) {
    let allLicensedDDIcon = ref({
      isAllLicensedUp: false,
    });
    const AllLicensedMenuHandler = (menu) => {
      emit("selectAllLicensedMenu", menu);
    };

    const dropDownHandler = (applicationValue) => {
      if (applicationValue == "GoodStandingLicensed") {
        allLicensedDDIcon.value.isLicensedUp = !allLicensedDDIcon.value
          .isLicensedUp;
      } else if (applicationValue == "GoodStandingInReviewPayment") {
        allLicensedDDIcon.value.isInReviewPaymentUp = !allLicensedDDIcon.value
          .isInReviewPaymentUp;
      } else if (applicationValue == "GoodStandingDeclinedPayment") {
        allLicensedDDIcon.value.isDeclinedPaymentUp = !allLicensedDDIcon.value
          .isDeclinedPaymentUp;
      }
      if (applicationValue == "GoodStandingUnassigned") {
        allLicensedDDIcon.value.isUnassignedUp = !allLicensedDDIcon.value
          .isUnassignedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };

    const dropDownListHandler = (menu) => {
      emit("selectAllLicensedMenu", menu);
    };

    const allLicensedDDHandler = (applicationValue) => {
      if (applicationValue == "AllLicensed") {
        allLicensedDDIcon.value.isAllLicensedUp = !allLicensedDDIcon.value
          .isAllLicensedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    return {
      allLicensedDDIcon,
      allLicensedDDHandler,
      AllLicensedMenuHandler,
      dropDownHandler,
      dropDownListHandler,
    };
  },
};
</script>
