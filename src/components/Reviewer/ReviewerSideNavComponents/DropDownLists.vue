<template>
  <div
    v-if="dropdownValue[0]"
    class="dropdown-menu relative  shadow-md "
    style="color: #648ea3; width: 200px;"
  >
    <ul class="block w-full shadow float-right" style="color: #648ea3;">
      <li
        @click="dropDownHandler(dropDownHandlerValue)"
        class=" justify-start "
        v-if="adminRole == 'ADM'"
      >
        <div class=" justify-center items-center ">
          <div class="p-1 ">
            <h3 class="text-lightBlueB-500 mt-tiny">
              <span style="color: white;">
                <i
                  v-if="isDropDownIconUp"
                  class="fas fa-chevron-circle-up float-right mt-2"
                ></i>
                <i
                  v-else
                  class="fas fa-chevron-circle-down float-right mt-2"
                ></i>

                <i class="mr-2 far fa-address-book fa-x fa-light"></i>
              </span>
              <span class="text-base" style="color: white; ">{{ name }}</span>
            </h3>
          </div>
        </div>
        <div
          v-if="dropdownValue[1]"
          class="dropdown-menu relative  shadow-md mb-12 ml-4"
          style="color: #648ea3; width: 200px;"
        >
          <ul class="block w-full  shadow float-right ">
            <li @click="dropDownListHandler(dropDownMenus[0])" class="mb-2">
              <p class=" text-sm" style="color: white; ">
                <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                {{ yoursAndOthersApplication[0] }}
              </p>
            </li>
            <li @click="dropDownListHandler(dropDownMenus[1])">
              <p class=" text-sm" style="color: white; ">
                <i class="mr-2 far fa-id-card fa-x"></i>
                {{ yoursAndOthersApplication[1] }}
              </p>
            </li>
          </ul>
        </div>
      </li>
      <li @click="dropDownListHandler(dropDownMenus[0])" v-else>
        <div
          v-if="dropdownValue[0]"
          class="dropdown-menu relative  shadow-md"
          style="color: #648ea3; width: 200px;"
        >
          <ul class="block w-full  shadow float-right ">
            <li @click="dropDownListHandler(dropDownMenus[0])" class="mb-2">
              <p class=" text-sm" style="color: white; ">
                <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                {{ yoursAndOthersApplication[0] }}
              </p>
            </li>
          </ul>
        </div>
      </li>
      <li
        @click="dropDownListHandler(dropDownMenus[1])"
        v-if="
          adminRole != 'ADM' && yoursAndOthersApplication[1] == 'Re Submitted'
        "
      >
        <div
          v-if="dropdownValue[0]"
          class="dropdown-menu relative  shadow-md"
          style="color: #648ea3; width: 200px;"
        >
          <ul class="block w-full  shadow float-right ">
            <li @click="dropDownListHandler(dropDownMenus[1])" class="mb-2">
              <p class=" text-sm" style="color: white; ">
                <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                {{ yoursAndOthersApplication[1] }}
              </p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "DropDownLists",
  props: [
    "dropdownValue",
    "name",
    "isDropDownIconUp",
    "adminRole",
    "dropDownHandlerValue",
    "dropDownMenus",
    "yoursAndOthersApplication",
  ],

  setup(props, { emit }) {
    const dropDownHandler = (applicationValue) => {
      emit("dropDownHandler", applicationValue);
    };
    const dropDownListHandler = (menu) => {
      emit("dropDownListHandler", menu);
    };
    return {
      dropDownHandler,
      dropDownListHandler,
    };
  },
};
</script>
<style></style>
