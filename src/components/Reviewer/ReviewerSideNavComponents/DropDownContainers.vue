<template>
  <div
    class="dropdown-menu relative  shadow-md mb-12 ml-4"
    style="color: #648ea3; width: 200px;"
  >
    <!-- <h3
      class="text-lightBlueB-500 mt-tiny"
      @click="newlicenseDDHandler('NewLicenseUnderReview')"
    > -->
    <h3 class="text-lightBlueB-500 mt-tiny">
      <span style="color: white;">
        <!-- <i
          v-if="newLicenseDDIcon.isUnderReviewUp"
          class="fas fa-chevron-circle-up float-right mt-2"
        ></i> -->
        <i class="fas fa-chevron-circle-down float-right mt-2"></i>

        <i class="mr-2 far fa-address-book fa-x fa-light"></i>
      </span>
      <span class="text-base" style="color: white; ">Under Review </span>
    </h3>
  </div>
  <!-- <drop-down-lists
    :dropdownValue="[true, true]"
    name="In Review"
    dropDownHandlerValue="NewLicenseAssigned"
    :dropDownMenus="['newLicenseAssigned', 'newLicenseAssignedToOthers']"
    :isDropDownIconUp="true"
    :adminRole="adminRole"
    :yoursAndOthersApplication="['Assigned To You', 'Assigned To Others']"
    @dropDownHandler="dropDownHandler"
    @dropDownListHandler="dropDownListHandler"
  /> -->
</template>
<script>
// import DropDownLists from "./DropDownLists.vue";

export default {
  //   components: {
  //       DropDownLists,
  //   },
  name: "DropDownContainers",

  setup() {
    const dropDownHandler = (applicationValue) => {};

    const dropDownListHandler = (menu) => {};

    return {
      dropDownHandler,
      dropDownListHandler,
    };
  },
};
</script>

<style scoped></style>
