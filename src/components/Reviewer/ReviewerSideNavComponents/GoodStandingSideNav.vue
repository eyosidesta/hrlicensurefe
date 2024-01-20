<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
            @click="goodStandingDDHandler('GoodStanding')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 far fa-thumbs-up fa-x fa-light"></i>
                  <i
                    v-if="goodStandingDDIcon.isGoodStandingUp"
                    class="fas fa-chevron-circle-up float-right mt-2"
                  ></i>
                  <i
                    v-else
                    class="fas fa-chevron-circle-down float-right mt-2"
                  ></i>
                </span>
                <span class="text-lg" style="color: white; "
                  >Good Standing</span
                >
              </h3>
            </div>
          </div>

          <div
            v-if="dropdownValue.goodStanding"
            class="dropdown-menu   mb-12 ml-4 "
            style="color: #648ea3; width: 200px;"
          >
            <ul class="block w-full shadow float-right" style="color: #648ea3;">
              <drop-down-lists
                :dropdownValue="[
                  dropdownValue.goodStanding,
                  dropdownValue.goodStandingUnassigned,
                ]"
                name="Unassigned"
                dropDownHandlerValue="GoodStandingUnassigned"
                :dropDownMenus="[
                  'goodStandingUnassigned',
                  'goodStandingReSubmitted',
                ]"
                :isDropDownIconUp="goodStandingDDIcon.isUnassignedUp"
                :adminRole="adminRole"
                :yoursAndOthersApplication="['Unassigned', 'Re Submitted']"
                @dropDownHandler="dropDownHandler"
                @dropDownListHandler="dropDownListHandler"
              />

              <!-- assigned to you and assigned to others started here -->
              <div>
                <li
                  @click="goodStandingDDHandler('GoodStandingAssigned')"
                  class=" justify-start "
                  v-if="adminRole == 'ADM'"
                >
                  <transition name="slide-fade-to-left">
                    <div class="">
                      <div class=" justify-center items-center ">
                        <div class="p-1 ">
                          <h3 class="text-lightBlueB-500 mt-tiny">
                            <span style="color: white;">
                              <i
                                v-if="goodStandingDDIcon.isAssignedUp"
                                class="fas fa-chevron-circle-up float-right mt-2"
                              ></i>
                              <i
                                v-else
                                class="fas fa-chevron-circle-down float-right mt-2"
                              ></i>

                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                            </span>
                            <span class="text-base" style="color: white; "
                              >Assigned</span
                            >
                          </h3>
                        </div>
                      </div>
                      <div
                        v-if="dropdownValue.goodStandingAssigned"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              goodStandingMenuHandler('goodStandingAssigned')
                            "
                            class="mb-2"
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                              Assigned To You
                            </p>
                          </li>
                          <li
                            @click="
                              goodStandingMenuHandler(
                                'goodStandingAssignedToOthers'
                              )
                            "
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i class="mr-2 far fa-id-card fa-x"></i>
                              Assigned To Others
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </li>
                <li
                  @click="goodStandingMenuHandler('goodStandingAssigned')"
                  class="mb-2"
                  v-else
                >
                  <!-- <span style="color: #648ea3;"> -->
                  <p class=" text-sm" style="color: white; ">
                    <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                    Assigned To You
                  </p>
                </li>
              </div>
              <!-- assigned to you and assigned to others ends here -->

              <!-- unfinished started here -->
              <div>
                <li
                  @click="goodStandingDDHandler('GoodStandingUnfinished')"
                  class=" justify-start "
                  v-if="adminRole == 'ADM'"
                >
                  <transition name="slide-fade-to-left">
                    <div class="">
                      <div class=" justify-center items-center ">
                        <div class="p-1 ">
                          <h3 class="text-lightBlueB-500 mt-tiny">
                            <span style="color: white;">
                              <i
                                v-if="goodStandingDDIcon.isUnfinishedUp"
                                class="fas fa-chevron-circle-up float-right mt-2"
                              ></i>
                              <i
                                v-else
                                class="fas fa-chevron-circle-down float-right mt-2"
                              ></i>

                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                            </span>
                            <span class="text-base" style="color: white; "
                              >Unfinished</span
                            >
                          </h3>
                        </div>
                      </div>
                      <div
                        v-if="dropdownValue.goodStandingUnfinished"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              goodStandingMenuHandler('goodStandingUnfinished')
                            "
                            class="mb-2"
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                              My Unfinished
                            </p>
                          </li>
                          <li
                            @click="
                              goodStandingMenuHandler(
                                'goodStandingOthersUnfinished'
                              )
                            "
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i class="mr-2 far fa-id-card fa-x"></i>
                              Others Unfinished
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </li>
                <li
                  @click="goodStandingMenuHandler('goodStandingUnfinished')"
                  class="mb-2"
                  v-else
                >
                  <!-- <span style="color: #648ea3;"> -->
                  <p class=" text-sm" style="color: white; ">
                    <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                    Unfinished
                  </p>
                </li>
              </div>
              <!-- unfinished ends here -->

              <!-- Approved start here -->
              <div>
                <li
                  @click="goodStandingDDHandler('GoodStandingApproved')"
                  class=" justify-start "
                  v-if="adminRole == 'ADM'"
                >
                  <transition name="slide-fade-to-left">
                    <div class="">
                      <div class=" justify-center items-center ">
                        <div class="p-1 ">
                          <h3 class="text-lightBlueB-500 mt-tiny">
                            <span style="color: white;">
                              <i
                                v-if="goodStandingDDIcon.isApprovedUp"
                                class="fas fa-chevron-circle-up float-right mt-2"
                              ></i>
                              <i
                                v-else
                                class="fas fa-chevron-circle-down float-right mt-2"
                              ></i>

                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                            </span>
                            <span class="text-base" style="color: white; "
                              >Approved</span
                            >
                          </h3>
                        </div>
                      </div>
                      <div
                        v-if="dropdownValue.goodStandingApproved"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              goodStandingMenuHandler('goodStandingUnconfirmed')
                            "
                            class="mb-2"
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                              My Approved
                            </p>
                          </li>
                          <li
                            @click="
                              goodStandingMenuHandler(
                                'allGoodStandingUnconfirmed'
                              )
                            "
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i class="mr-2 far fa-id-card fa-x"></i>
                              Others Approved
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </li>
                <li
                  @click="goodStandingMenuHandler('goodStandingUnconfirmed')"
                  class="mb-2"
                  v-else
                >
                  <!-- <span style="color: #648ea3;"> -->
                  <p class=" text-sm" style="color: white; ">
                    <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                    Approved
                  </p>
                </li>
              </div>
              <!-- Approved ends here -->

              <!-- Declined start here -->
              <div>
                <li
                  @click="goodStandingDDHandler('GoodStandingDeclined')"
                  class=" justify-start "
                  v-if="adminRole == 'ADM'"
                >
                  <transition name="slide-fade-to-left">
                    <div class="">
                      <div class=" justify-center items-center ">
                        <div class="p-1 ">
                          <h3 class="text-lightBlueB-500 mt-tiny">
                            <span style="color: white;">
                              <i
                                v-if="goodStandingDDIcon.isDeclinedUp"
                                class="fas fa-chevron-circle-up float-right mt-2"
                              ></i>
                              <i
                                v-else
                                class="fas fa-chevron-circle-down float-right mt-2"
                              ></i>

                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                            </span>
                            <span class="text-base" style="color: white; "
                              >Declined</span
                            >
                          </h3>
                        </div>
                      </div>
                      <div
                        v-if="dropdownValue.goodStandingDeclined"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              goodStandingMenuHandler('goodStandingDeclined')
                            "
                            class="mb-2"
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i
                                class="mr-2 far fa-address-book fa-x fa-light"
                              ></i>
                              My Declined
                            </p>
                          </li>
                          <li
                            @click="
                              goodStandingMenuHandler('allGoodStandingDeclined')
                            "
                          >
                            <!-- <span style="color: #648ea3;"> -->
                            <p class=" text-sm" style="color: white; ">
                              <i class="mr-2 far fa-id-card fa-x"></i>
                              Others Declined
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </li>
                <li
                  @click="goodStandingMenuHandler('goodStandingDeclined')"
                  class="mb-2"
                  v-else
                >
                  <!-- <span style="color: #648ea3;"> -->
                  <p class=" text-sm" style="color: white; ">
                    <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                    Declined
                  </p>
                </li>
              </div>
              <!-- Declined ends here -->
              <!-- Pending Payment starts here -->
              <!-- <div
                v-if="dropdownValue.goodStanding"
                class="dropdown-menu relative  shadow-md mb-12"
                style="color: #648ea3; width: 200px;"
              >
                <ul
                  class="block w-full shadow float-right"
                  style="color: #648ea3;"
                >
                  <li class=" justify-start ">
                    <div class=" justify-center items-center ">
                      <div class="p-1 ">
                        <h3
                          class="text-lightBlueB-500 mt-tiny"
                          @click="
                            goodStandingDDHandler('GoodStandingPaymentReview')
                          "
                        >
                          <span style="color: white;">
                            <i
                              v-if="goodStandingDDIcon.isPaymentReviewnUp"
                              class="fas fa-chevron-circle-up float-right mt-2"
                            ></i>
                            <i
                              v-else
                              class="fas fa-chevron-circle-down float-right mt-2"
                            ></i>

                            <i
                              class="mr-2 far fa-address-book fa-x fa-light"
                            ></i>
                          </span>
                          <span class="text-base" style="color: white; "
                            >Payment Review</span
                          >
                        </h3>
                        <div
                          v-if="dropdownValue.goodStandingPaymentReview"
                          class="dropdown-menu relative  shadow-md mb-12 ml-4"
                          style="color: #648ea3; width: 200px;"
                        >
                          <drop-down-lists
                            :dropdownValue="[
                              dropdownValue.goodStandingPaymentReview,
                              dropdownValue.goodStandingInReviewPayment,
                            ]"
                            name="In Review"
                            dropDownHandlerValue="GoodStandingInReviewPayment"
                            :dropDownMenus="[
                              'goodStandingInReviewPayment',
                              'othersGoodStandingInReviewPayment',
                            ]"
                            :isDropDownIconUp="
                              goodStandingDDIcon.isInReviewPaymentUp
                            "
                            :adminRole="adminRole"
                            :yoursAndOthersApplication="[
                              'My In Review Payment',
                              'Others In Review Payment',
                            ]"
                            @dropDownHandler="dropDownHandler"
                            @dropDownListHandler="dropDownListHandler"
                          />
                          <drop-down-lists
                            :dropdownValue="[
                              dropdownValue.goodStandingPaymentReview,
                              dropdownValue.goodStandingDeclinedPayment,
                            ]"
                            name="Declined Payment"
                            dropDownHandlerValue="GoodStandingDeclinedPayment"
                            :dropDownMenus="[
                              'goodStandingDeclinedPayment',
                              'othersGoodStandingDeclinedPayment',
                            ]"
                            :isDropDownIconUp="
                              goodStandingDDIcon.isDeclinedPaymentUp
                            "
                            :adminRole="adminRole"
                            :yoursAndOthersApplication="[
                              'My Declined Payment',
                              'Others Declined Payment',
                            ]"
                            @dropDownHandler="dropDownHandler"
                            @dropDownListHandler="dropDownListHandler"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> -->
              <!-- Pending Payment Ends here -->
              <drop-down-lists
                :dropdownValue="[
                  dropdownValue.goodStanding,
                  dropdownValue.goodStandingLicensed,
                ]"
                name="Letter"
                dropDownHandlerValue="GoodStandingLicensed"
                :dropDownMenus="[
                  'goodStandingLicensed',
                  'goodStandingOthersLicensed',
                ]"
                :isDropDownIconUp="goodStandingDDIcon.isLicensedUp"
                :adminRole="adminRole"
                :yoursAndOthersApplication="['Letter', 'Others Letter']"
                @dropDownHandler="dropDownHandler"
                @dropDownListHandler="dropDownListHandler"
              />

              <!-- <li
                class="mb-2"
              >
                <a href="https://hrdelk.sandboxaddis.com/s/hrl/app/kibana#/dashboard/68d0dcc0-388f-11ec-9b4d-1fc6319d2633?_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:'Applications%20'),gridData:(h:7,i:'8fc21afc-1a94-403f-8bcd-4d15ae519476',w:16,x:0,y:0),id:'94615bd0-388f-11ec-9b4d-1fc6319d2633',panelIndex:'8fc21afc-1a94-403f-8bcd-4d15ae519476',title:'Applications%20',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Experts%20Engaged'),gridData:(h:7,i:'5db0f6df-f913-458f-a68d-30f7de85b289',w:16,x:16,y:0),id:c1b66e40-388f-11ec-9b4d-1fc6319d2633,panelIndex:'5db0f6df-f913-458f-a68d-30f7de85b289',title:'Experts%20Engaged',type:visualization,version:'7.7.0'),(embeddableConfig:(),gridData:(h:15,i:'1e044244-3873-495d-89f3-2a878d180356',w:27,x:0,y:7),id:'127b3300-3891-11ec-9b4d-1fc6319d2633',panelIndex:'1e044244-3873-495d-89f3-2a878d180356',type:visualization,version:'7.7.0'),(embeddableConfig:(),gridData:(h:15,i:fc0ffdec-9390-441f-a625-9acecd0413f4,w:21,x:27,y:7),id:'52bb1b10-3891-11ec-9b4d-1fc6319d2633',panelIndex:fc0ffdec-9390-441f-a625-9acecd0413f4,type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Profession'),gridData:(h:15,i:a9cc645b-e836-4e56-890d-d86ed6553326,w:25,x:0,y:22),id:d8497970-3891-11ec-9b4d-1fc6319d2633,panelIndex:a9cc645b-e836-4e56-890d-d86ed6553326,title:'Application%20by%20Profession',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Region'),gridData:(h:15,i:'60525430-455c-481b-a083-d8df9e6d905d',w:23,x:25,y:22),id:'62ba1800-3868-11ec-9b4d-1fc6319d2633',panelIndex:'60525430-455c-481b-a083-d8df9e6d905d',title:'Application%20by%20Region',type:visualization,version:'7.7.0')),query:(language:kuery,query:''),timeRestore:!f,title:'good%20standing',viewMode:view)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30d,to:now))" 
                target ="_blank" class=" text-base" style="color: white; ">
                  <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                  Dashboard
                </a>
              </li> -->

              <!-- All Licensed Applications starts here -->

              <!-- <li
                @click="goodStandingMenuHandler('goodStandingAllLicensed')"
                class="mb-2"
              >
                <div class=" text-base" style="color: white; ">
                  All Letter
                </div>
              </li> -->
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
  name: "GoodStandingSideNav",
  components: {
    DropDownLists,
  },
  props: ["dropdownValue", "adminRole"],
  setup(props, { emit }) {
    let goodStandingDDIcon = ref({
      isGoodStandingUp: false,
      isAssignedUp: false,
      isUnfinishedUp: false,
      isApprovedUp: false,
      isDeclinedUp: false,
      isPaymentReviewnUp: false,
      isInReviewPaymentUp: false,
      isDeclinedPaymentUp: false,
      isLicensedUp: false,
      isUnassignedUp: false,
    });
    const goodStandingMenuHandler = (menu) => {
      emit("selectGoodStandingMenu", menu);
    };

    const dropDownHandler = (applicationValue) => {
      if (applicationValue == "GoodStandingLicensed") {
        goodStandingDDIcon.value.isLicensedUp = !goodStandingDDIcon.value
          .isLicensedUp;
      } else if (applicationValue == "GoodStandingInReviewPayment") {
        goodStandingDDIcon.value.isInReviewPaymentUp = !goodStandingDDIcon.value
          .isInReviewPaymentUp;
      } else if (applicationValue == "GoodStandingDeclinedPayment") {
        goodStandingDDIcon.value.isDeclinedPaymentUp = !goodStandingDDIcon.value
          .isDeclinedPaymentUp;
      }
      if (applicationValue == "GoodStandingUnassigned") {
        goodStandingDDIcon.value.isUnassignedUp = !goodStandingDDIcon.value
          .isUnassignedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };

    const dropDownListHandler = (menu) => {
      emit("selectGoodStandingMenu", menu);
    };

    const goodStandingDDHandler = (applicationValue) => {
      if (applicationValue == "GoodStanding") {
        goodStandingDDIcon.value.isGoodStandingUp = !goodStandingDDIcon.value
          .isGoodStandingUp;
      } else if (applicationValue == "GoodStandingAssigned") {
        goodStandingDDIcon.value.isAssignedUp = !goodStandingDDIcon.value
          .isAssignedUp;
      } else if (applicationValue == "GoodStandingUnfinished") {
        goodStandingDDIcon.value.isUnfinishedUp = !goodStandingDDIcon.value
          .isUnfinishedUp;
      } else if (applicationValue == "GoodStandingApproved") {
        goodStandingDDIcon.value.isApprovedUp = !goodStandingDDIcon.value
          .isApprovedUp;
      } else if (applicationValue == "GoodStandingDeclined") {
        goodStandingDDIcon.value.isDeclinedUp = !goodStandingDDIcon.value
          .isDeclinedUp;
      } else if (applicationValue == "GoodStandingPaymentReview") {
        goodStandingDDIcon.value.isPaymentReviewnUp = !goodStandingDDIcon.value
          .isPaymentReviewnUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    return {
      goodStandingDDIcon,
      goodStandingDDHandler,
      goodStandingMenuHandler,
      dropDownHandler,
      dropDownListHandler,
    };
  },
};
</script>
