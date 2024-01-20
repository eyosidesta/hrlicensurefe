<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
            @click="verificationDDHandler('Verification')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 far fa-thumbs-up fa-x fa-light"></i>
                  <i
                    v-if="verificationDDIcon.isVerificationUp"
                    class="fas fa-chevron-circle-up float-right mt-2"
                  ></i>
                  <i
                    v-else
                    class="fas fa-chevron-circle-down float-right mt-2"
                  ></i>
                </span>
                <span class="text-lg" style="color: white; ">Verification</span>
                <!-- </span> -->
              </h3>
            </div>
          </div>

          <div
            v-if="dropdownValue.verification"
            class="dropdown-menu   mb-12 ml-4 "
            style="color: #648ea3; width: 200px;"
          >
            <ul class="block w-full shadow float-right" style="color: #648ea3;">
              <drop-down-lists
                :dropdownValue="[
                  dropdownValue.verification,
                  dropdownValue.verificationUnassigned,
                ]"
                name="Unassigned"
                dropDownHandlerValue="VerificationUnassigned"
                :dropDownMenus="[
                  'verificationUnassigned',
                  'verificationReSubmitted',
                ]"
                :isDropDownIconUp="verificationDDIcon.isUnassignedUp"
                :adminRole="adminRole"
                :yoursAndOthersApplication="['Unassigned', 'Re Submitted']"
                @dropDownHandler="dropDownHandler"
                @dropDownListHandler="dropDownListHandler"
              />

              <!-- assigned to you and assigned to others started here -->
              <div>
                <li
                  @click="verificationDDHandler('VerificationAssigned')"
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
                                v-if="verificationDDIcon.isAssignedUp"
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
                        v-if="dropdownValue.verificationAssigned"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              verificationMenuHandler('verificationAssigned')
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
                              verificationMenuHandler(
                                'verificationAssignedToOthers'
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
                  @click="verificationMenuHandler('verificationAssigned')"
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
                  @click="verificationDDHandler('VerificationUnfinished')"
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
                                v-if="verificationDDIcon.isUnfinishedUp"
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
                        v-if="dropdownValue.verificationUnfinished"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              verificationMenuHandler('verificationUnfinished')
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
                              verificationMenuHandler(
                                'verificationOthersUnfinished'
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
                  @click="verificationMenuHandler('verificationUnfinished')"
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
                  @click="verificationDDHandler('VerificationApproved')"
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
                                v-if="verificationDDIcon.isApprovedUp"
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
                        v-if="dropdownValue.verificationApproved"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              verificationMenuHandler('verificationUnconfirmed')
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
                              verificationMenuHandler(
                                'allVerificationUnconfirmed'
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
                  @click="verificationMenuHandler('verificationUnconfirmed')"
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
                  @click="verificationDDHandler('VerificationDeclined')"
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
                                v-if="verificationDDIcon.isDeclinedUp"
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
                        v-if="dropdownValue.verificationDeclined"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
                        style="color: #648ea3; width: 200px;"
                      >
                        <ul class="block w-full  shadow float-right ">
                          <li
                            @click="
                              verificationMenuHandler('verificationDeclined')
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
                              verificationMenuHandler('allVerificationDeclined')
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
              </div>
              <!-- Declined ends here -->

              <!-- <li
                class="mb-2"
              >
                <a href="https://hrdelk.sandboxaddis.com/s/hrl/app/kibana#/dashboard/9361b100-388d-11ec-9b4d-1fc6319d2633?_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:Applications),gridData:(h:7,i:'97b6d373-c1d8-4f29-93e3-36eae67d1920',w:17,x:0,y:0),id:cdd814b0-388c-11ec-9b4d-1fc6319d2633,panelIndex:'97b6d373-c1d8-4f29-93e3-36eae67d1920',title:Applications,type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Experts%20Engaged'),gridData:(h:7,i:'53e04a31-8d65-4ded-b8e9-470d3331ab8e',w:17,x:17,y:0),id:'09183b90-388d-11ec-9b4d-1fc6319d2633',panelIndex:'53e04a31-8d65-4ded-b8e9-470d3331ab8e',title:'Experts%20Engaged',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Status'),gridData:(h:15,i:'6a659c46-ec9c-4afc-a509-dafa66a91f96',w:30,x:0,y:7),id:'0821ff40-388e-11ec-9b4d-1fc6319d2633',panelIndex:'6a659c46-ec9c-4afc-a509-dafa66a91f96',title:'Application%20by%20Status',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Gender'),gridData:(h:15,i:'9e68d15f-f19d-46b6-a5e4-a900166da0e5',w:18,x:30,y:7),id:'60b6d8b0-388e-11ec-9b4d-1fc6319d2633',panelIndex:'9e68d15f-f19d-46b6-a5e4-a900166da0e5',title:'Application%20by%20Gender',type:visualization,version:'7.7.0'),(embeddableConfig:(legendOpen:!f,title:'Application%20by%20Profession',vis:(legendOpen:!t)),gridData:(h:15,i:ad2f8468-66a5-4008-8359-e2de56f94404,w:24,x:0,y:22),id:'9afe95d0-388e-11ec-9b4d-1fc6319d2633',panelIndex:ad2f8468-66a5-4008-8359-e2de56f94404,title:'Application%20by%20Profession',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Region'),gridData:(h:15,i:'86590a70-8d96-4ea0-a2c5-d36198e09518',w:24,x:24,y:22),id:f231b900-3865-11ec-9b4d-1fc6319d2633,panelIndex:'86590a70-8d96-4ea0-a2c5-d36198e09518',title:'Application%20by%20Region',type:visualization,version:'7.7.0')),query:(language:kuery,query:''),timeRestore:!f,title:verification,viewMode:view)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30d,to:now))" 
                target ="_blank" class=" text-base" style="color: white; ">
                  <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                  Dashboard
                </a>
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
  name: "VerificationSideNav",
  components: {
    DropDownLists,
  },
  props: ["dropdownValue", "adminRole"],
  setup(props, { emit }) {
    let verificationDDIcon = ref({
      isVerificationUp: false,
      isAssignedUp: false,
      isUnfinishedUp: false,
      isApprovedUp: false,
      isDeclinedUp: false,
      isUnassignedUp: false,
    });
    const verificationMenuHandler = (menu) => {
      emit("selectVerificationMenu", menu);
    };

    const dropDownHandler = (applicationValue) => {
      if (applicationValue == "VerificationUnassigned") {
        verificationDDIcon.value.isUnassignedUp = !verificationDDIcon.value
          .isUnassignedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    const dropDownListHandler = (menu) => {
      emit("selectVerificationMenu", menu);
    };

    const verificationDDHandler = (applicationValue) => {
      if (applicationValue == "Verification") {
        verificationDDIcon.value.isVerificationUp = !verificationDDIcon.value
          .isVerificationUp;
      } else if (applicationValue == "VerificationAssigned") {
        verificationDDIcon.value.isAssignedUp = !verificationDDIcon.value
          .isAssignedUp;
      } else if (applicationValue == "VerificationUnfinished") {
        verificationDDIcon.value.isUnfinishedUp = !verificationDDIcon.value
          .isUnfinishedUp;
      } else if (applicationValue == "VerificationApproved") {
        verificationDDIcon.value.isApprovedUp = !verificationDDIcon.value
          .isApprovedUp;
      } else if (applicationValue == "VerificationDeclined") {
        verificationDDIcon.value.isDeclinedUp = !verificationDDIcon.value
          .isDeclinedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    return {
      verificationDDIcon,
      verificationDDHandler,
      verificationMenuHandler,
      dropDownHandler,
      dropDownListHandler,
    };
  },
};
</script>
