<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
            @click="newlicenseDDHandler('NewLicense')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 far fa-thumbs-up fa-x fa-light"></i>
                  <i
                    v-if="newLicenseDDIcon.isNewLicenseUp"
                    class="fas fa-chevron-circle-up float-right mt-2"
                  ></i>
                  <i
                    v-else
                    class="fas fa-chevron-circle-down float-right mt-2"
                  ></i>
                </span>
                <span class="text-lg" style="color: white; ">New License</span>
              </h3>
            </div>
          </div>

          <div
            v-if="dropdownValue.newLicense"
            class="dropdown-menu   mb-12 ml-4 "
            style="color: #648ea3; width: 200px;"
          >
            <ul class="block w-full shadow float-right" style="color: #648ea3;">
              <drop-down-lists
                :dropdownValue="[
                  dropdownValue.newLicense,
                  dropdownValue.newLicenseUnassigned,
                ]"
                name="Unassigned"
                dropDownHandlerValue="NewLicenseUnassigned"
                :dropDownMenus="[
                  'newLicenseUnassigned',
                  'newLicenseReSubmitted',
                ]"
                :isDropDownIconUp="newLicenseDDIcon.isUnassignedUp"
                :adminRole="adminRole"
                :yoursAndOthersApplication="['Unassigned', 'Re Submitted']"
                @dropDownHandler="dropDownHandler"
                @dropDownListHandler="dropDownListHandler"
              />

              <!-- under review started here -->
              <div v-if="expertLevelId == 4">
                <li class=" justify-start ">
                  <transition name="slide-fade-to-left">
                    <div class="">
                      <div class=" justify-center items-center ">
                        <div class="p-1 ">
                          <h3
                            class="text-lightBlueB-500 mt-tiny"
                            @click="
                              newlicenseDDHandler('NewLicenseUnderReview')
                            "
                          >
                            <span style="color: white;">
                              <i
                                v-if="newLicenseDDIcon.isUnderReviewUp"
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
                              >Under Review</span
                            >
                          </h3>
                        </div>
                      </div>
                      <div class="ml-4">
                        <drop-down-lists
                          :dropdownValue="[
                            dropdownValue.newLicenseUnderReview,
                            dropdownValue.newLicenseAssigned,
                          ]"
                          name="Assigned"
                          dropDownHandlerValue="NewLicenseAssigned"
                          :dropDownMenus="[
                            'newLicenseAssigned',
                            'newLicenseAssignedToOthers',
                          ]"
                          :isDropDownIconUp="newLicenseDDIcon.isAssignedUp"
                          :adminRole="adminRole"
                          :yoursAndOthersApplication="[
                            'Assigned To You',
                            'Assigned To Others',
                          ]"
                          @dropDownHandler="dropDownHandler"
                          @dropDownListHandler="dropDownListHandler"
                        />
                      </div>
                      <div class="ml-4">
                        <drop-down-lists
                          :dropdownValue="[
                            dropdownValue.newLicenseUnderReview,
                            dropdownValue.newLicenseUnfinished,
                          ]"
                          name="Draft"
                          dropDownHandlerValue="NewLicenseUnfinished"
                          :dropDownMenus="[
                            'newLicenseUnfinished',
                            'newLicenseOthersUnfinished',
                          ]"
                          :isDropDownIconUp="newLicenseDDIcon.isUnfinishedUp"
                          :adminRole="adminRole"
                          :yoursAndOthersApplication="[
                            'My Draft',
                            'Others Draft',
                          ]"
                          @dropDownHandler="dropDownHandler"
                          @dropDownListHandler="dropDownListHandler"
                        />
                      </div>
                      <div
                        v-if="dropdownValue.newLicenseUnderReview"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
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
                                    newlicenseDDHandler('NewLicenseEvaluation')
                                  "
                                >
                                  <span style="color: white;">
                                    <i
                                      v-if="newLicenseDDIcon.isEvaluationUp"
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
                                    >Evaluation</span
                                  >
                                </h3>
                                <div
                                  v-if="dropdownValue.newLicenseEvaluation"
                                  class="dropdown-menu relative  shadow-md mb-12 ml-4"
                                  style="color: #648ea3; width: 200px;"
                                >
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseEvaluation,
                                      dropdownValue.newLicenseUnassignedEvaluation,
                                    ]"
                                    name="Unassigned Evaluation"
                                    dropDownHandlerValue="NewLicenseUnassignedEvaluation"
                                    :dropDownMenus="[
                                      'newLicenseUnassignedEvaluation',
                                      'newLicenseOthersUnassignedEvaluation',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isUnassignedEvaluationUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Unassigned Evaluation',
                                      'Others Unassigned Evaluation',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseEvaluation,
                                      dropdownValue.newLicenseUnderEvaluation,
                                    ]"
                                    name="Under Evaluation"
                                    dropDownHandlerValue="NewLicenseUnderEvaluation"
                                    :dropDownMenus="[
                                      'newLicenseUnderEvaluation',
                                      'newLicenseOthersUnderEvaluation',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isUnderEvaluationUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Under Evaluation',
                                      'Others Under Evaluation',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseEvaluation,
                                      dropdownValue.newLicenseEvaluationAssessment,
                                    ]"
                                    name="Assessments"
                                    dropDownHandlerValue="NewLicenseEvaluationAssessment"
                                    :dropDownMenus="[
                                      'newLicenseEvaluationAssessment',
                                      'newLicenseOthersEvaluationAssessment',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isUnderEvaluationUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Assessments',
                                      'Others Assessments',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseEvaluation,
                                      dropdownValue.newLicenseReturnedEvaluation,
                                    ]"
                                    name="Returned Evaluation"
                                    dropDownHandlerValue="NewLicenseReturnedEvaluation"
                                    :dropDownMenus="[
                                      'newLicenseReturnedEvaluation',
                                      'newLicenseOthersReturnedEvaluation',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isReturnedEvaluationUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Returned Evaluation',
                                      'Others Returned Evaluation',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        v-if="dropdownValue.newLicenseUnderReview"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
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
                                    newlicenseDDHandler(
                                      'NewLicenseConfirmedEvaluation'
                                    )
                                  "
                                >
                                  <span style="color: white;">
                                    <i
                                      v-if="
                                        newLicenseDDIcon.isConfirmedEvaluationUp
                                      "
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
                                    >Confirmed</span
                                  >
                                </h3>
                                <div
                                  v-if="
                                    dropdownValue.newLicenseConfirmedEvaluation
                                  "
                                  class="dropdown-menu relative  shadow-md mb-12 ml-4"
                                  style="color: #648ea3; width: 200px;"
                                >
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseConfirmedEvaluation,
                                      dropdownValue.newLicenseConfirmed,
                                    ]"
                                    name="Approved"
                                    dropDownHandlerValue="NewLicenseConfirmed"
                                    :dropDownMenus="[
                                      'newLicenseConfirmed',
                                      'othersNewLicenseConfirmed',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isConfirmedUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Approved',
                                      'Others Approved',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseConfirmedEvaluation,
                                      dropdownValue.newLicenseDeclineConfirmed,
                                    ]"
                                    name="Declined"
                                    dropDownHandlerValue="NewLicenseDeclineConfirmed"
                                    :dropDownMenus="[
                                      'newLicenseDeclineConfirmed',
                                      'newLicenseOthersDeclineConfirmed',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isDeclineConfirmedUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Declined',
                                      'Others Declined',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicenseConfirmedEvaluation,
                                      dropdownValue.newLicenseUnderSuperVisionConfirmed,
                                    ]"
                                    name="Under Super Vision"
                                    dropDownHandlerValue="NewLicenseUnderSuperVisionConfirmed"
                                    :dropDownMenus="[
                                      'newLicenseUnderSuperVisionConfirmed',
                                      'newLicenseOthersUnderSuperVisionConfirmed',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isUnderSuperVisionConfirmedUp
                                    "
                                    :adminRole="adminRole"
                                    :yoursAndOthersApplication="[
                                      'My Under Super Vision',
                                      'Others Under Super Vision',
                                    ]"
                                    @dropDownHandler="dropDownHandler"
                                    @dropDownListHandler="dropDownListHandler"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!-- <div
                        v-if="dropdownValue.newLicenseUnderReview"
                        class="dropdown-menu relative  shadow-md mb-12 ml-4"
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
                                    newlicenseDDHandler(
                                      'NewLicensePaymentReview'
                                    )
                                  "
                                >
                                  <span style="color: white;">
                                    <i
                                      v-if="newLicenseDDIcon.isPaymentReviewnUp"
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
                                  v-if="dropdownValue.newLicensePaymentReview"
                                  class="dropdown-menu relative  shadow-md mb-12 ml-4"
                                  style="color: #648ea3; width: 200px;"
                                >
                                  <drop-down-lists
                                    :dropdownValue="[
                                      dropdownValue.newLicensePaymentReview,
                                      dropdownValue.newLicenseInReviewPayment,
                                    ]"
                                    name="In Review"
                                    dropDownHandlerValue="NewLicenseInReviewPayment"
                                    :dropDownMenus="[
                                      'newLicenseInReviewPayment',
                                      'othersNewLicenseInReviewPayment',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isInReviewPaymentUp
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
                                      dropdownValue.newLicensePaymentReview,
                                      dropdownValue.newLicenseDeclinedPayment,
                                    ]"
                                    name="Declined Payment"
                                    dropDownHandlerValue="NewLicenseDeclinedPayment"
                                    :dropDownMenus="[
                                      'newLicenseDeclinedPayment',
                                      'othersNewLicenseDeclinedPayment',
                                    ]"
                                    :isDropDownIconUp="
                                      newLicenseDDIcon.isDeclinedPaymentUp
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
                    </div>
                  </transition>
                </li>
              </div>
              <!-- Expert sidenav starts here -->

              <div v-if="expertLevelId == 3">
                <drop-down-lists
                  :dropdownValue="[
                    dropdownValue.newLicense,
                    dropdownValue.newLicenseAssigned,
                  ]"
                  name="In Review"
                  dropDownHandlerValue="NewLicenseAssigned"
                  :dropDownMenus="[
                    'newLicenseAssigned',
                    'newLicenseAssignedToOthers',
                  ]"
                  :isDropDownIconUp="newLicenseDDIcon.isAssignedUp"
                  :adminRole="adminRole"
                  :yoursAndOthersApplication="[
                    'Assigned To You',
                    'Assigned To Others',
                  ]"
                  @dropDownHandler="dropDownHandler"
                  @dropDownListHandler="dropDownListHandler"
                />
              </div>
              <div v-if="expertLevelId == 3">
                <drop-down-lists
                  :dropdownValue="[
                    dropdownValue.newLicense,
                    dropdownValue.newLicenseUnfinished,
                  ]"
                  name="Draft"
                  dropDownHandlerValue="NewLicenseUnfinished"
                  :dropDownMenus="[
                    'newLicenseUnfinished',
                    'newLicenseOthersUnfinished',
                  ]"
                  :isDropDownIconUp="newLicenseDDIcon.isUnfinishedUp"
                  :adminRole="adminRole"
                  :yoursAndOthersApplication="[
                    'Unfinished',
                    'Others Unfinished',
                  ]"
                  @dropDownHandler="dropDownHandler"
                  @dropDownListHandler="dropDownListHandler"
                />
              </div>
              <div v-if="expertLevelId == 3">
                <drop-down-lists
                  :dropdownValue="[
                    dropdownValue.newLicense,
                    dropdownValue.newLicenseUnassignedEvaluation,
                  ]"
                  name="Approved"
                  dropDownHandlerValue="NewLicenseUnassignedEvaluation"
                  :dropDownMenus="[
                    'newLicenseUnassignedEvaluation',
                    'newLicenseOthersUnassignedEvaluation',
                  ]"
                  :isDropDownIconUp="newLicenseDDIcon.isUnconfirmedUp"
                  :adminRole="adminRole"
                  :yoursAndOthersApplication="[
                    'My Approved',
                    'Others Approved',
                  ]"
                  @dropDownHandler="dropDownHandler"
                  @dropDownListHandler="dropDownListHandler"
                />
              </div>
              <div v-if="expertLevelId == 3">
                <drop-down-lists
                  :dropdownValue="[
                    dropdownValue.newLicense,
                    dropdownValue.newLicenseDeclined,
                  ]"
                  name="Declined"
                  dropDownHandlerValue="NewLicenseDeclined"
                  :dropDownMenus="[
                    'newLicenseDeclined',
                    'newLicenseOthersDeclined',
                  ]"
                  :isDropDownIconUp="newLicenseDDIcon.isDeclinedUp"
                  :adminRole="adminRole"
                  :yoursAndOthersApplication="[
                    'My Declined',
                    'Others Declined',
                  ]"
                  @dropDownHandler="dropDownHandler"
                  @dropDownListHandler="dropDownListHandler"
                />
              </div>
              <div v-if="expertLevelId == 3">
                <drop-down-lists
                  :dropdownValue="[
                    dropdownValue.newLicense,
                    dropdownValue.newLicenseUnderSuperVision,
                  ]"
                  name="Under Super Vision"
                  dropDownHandlerValue="NewLicenseUnderSuperVision"
                  :dropDownMenus="[
                    'newLicenseUnderSuperVision',
                    'newLicenseOthersUnderSuperVision',
                  ]"
                  :isDropDownIconUp="newLicenseDDIcon.isUnderSuperVisionUp"
                  :adminRole="adminRole"
                  :yoursAndOthersApplication="[
                    'My Under Super Vision',
                    'Others Under Super Vision',
                  ]"
                  @dropDownHandler="dropDownHandler"
                  @dropDownListHandler="dropDownListHandler"
                />
              </div>
              <!-- <div
                v-if="dropdownValue.newLicense && expertLevelId == 3"
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
                            newlicenseDDHandler('NewLicensePaymentReview')
                          "
                        >
                          <span style="color: white;">
                            <i
                              v-if="newLicenseDDIcon.isPaymentReviewnUp"
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
                          v-if="dropdownValue.newLicensePaymentReview"
                          class="dropdown-menu relative  shadow-md mb-12 ml-4"
                          style="color: #648ea3; width: 200px;"
                        >
                          <drop-down-lists
                            :dropdownValue="[
                              dropdownValue.newLicensePaymentReview,
                              dropdownValue.newLicenseInReviewPayment,
                            ]"
                            name="In Review"
                            dropDownHandlerValue="NewLicenseInReviewPayment"
                            :dropDownMenus="[
                              'newLicenseInReviewPayment',
                              'othersNewLicenseInReviewPayment',
                            ]"
                            :isDropDownIconUp="
                              newLicenseDDIcon.isInReviewPaymentUp
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
                              dropdownValue.newLicensePaymentReview,
                              dropdownValue.newLicenseDeclinedPayment,
                            ]"
                            name="Declined Payment"
                            dropDownHandlerValue="NewLicenseDeclinedPayment"
                            :dropDownMenus="[
                              'newLicenseDeclinedPayment',
                              'othersNewLicenseDeclinedPayment',
                            ]"
                            :isDropDownIconUp="
                              newLicenseDDIcon.isDeclinedPaymentUp
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
              <!-- Expert Sidenav ends here -->
              <!-- under review end here -->
              <drop-down-lists
                :dropdownValue="[
                  dropdownValue.newLicense,
                  dropdownValue.newLicenseLicensed,
                ]"
                name="Licensed"
                dropDownHandlerValue="NewLicenseLicensed"
                :dropDownMenus="[
                  'newLicenseLicensed',
                  'newLicenseOthersLicensed',
                ]"
                :isDropDownIconUp="newLicenseDDIcon.isLicensedUp"
                :adminRole="adminRole"
                :yoursAndOthersApplication="['Licensed', 'Others Licensed']"
                @dropDownHandler="dropDownHandler"
                @dropDownListHandler="dropDownListHandler"
              />

              <!-- <li
                class="mb-2"
              >
                <a href="https://hrdelk.sandboxaddis.com/s/hrl/app/kibana#/dashboard/c2450830-3817-11ec-9b4d-1fc6319d2633?_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:Applications),gridData:(h:7,i:'5f577b01-6de1-44c3-b436-539b2fdeccf7',w:15,x:0,y:0),id:'2650de40-3817-11ec-9b4d-1fc6319d2633',panelIndex:'5f577b01-6de1-44c3-b436-539b2fdeccf7',title:Applications,type:visualization,version:'7.7.0'),(embeddableConfig:(),gridData:(h:7,i:c0aec5b5-af7f-4a6a-96f5-943150bef92c,w:15,x:15,y:0),id:fc1221a0-3818-11ec-9b4d-1fc6319d2633,panelIndex:c0aec5b5-af7f-4a6a-96f5-943150bef92c,type:visualization,version:'7.7.0'),(embeddableConfig:(colors:(Approve:%2399440A,'Approve%20Payment':%23E0752D,'In%20Review':%23447EBC),title:'Application!'s%20Status',vis:(colors:(Approve:%2399440A,'Approve%20Payment':%23E0752D,'In%20Review':%232F575E))),gridData:(h:15,i:f8a85674-fe98-4dcf-b06c-19f0e1ecbb7a,w:28,x:0,y:7),id:'41a1a8e0-3877-11ec-9b4d-1fc6319d2633',panelIndex:f8a85674-fe98-4dcf-b06c-19f0e1ecbb7a,title:'Application!'s%20Status',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Applications%20By%20Gender'),gridData:(h:15,i:'561b576c-ad39-4187-a493-898e735a0936',w:20,x:28,y:7),id:d5b3bcc0-3878-11ec-9b4d-1fc6319d2633,panelIndex:'561b576c-ad39-4187-a493-898e735a0936',title:'Applications%20By%20Gender',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Applications%20by%20Profession'),gridData:(h:15,i:'126f4a65-8275-4277-a32d-b5cc7f0608bf',w:25,x:0,y:22),id:'301a9710-3879-11ec-9b4d-1fc6319d2633',panelIndex:'126f4a65-8275-4277-a32d-b5cc7f0608bf',title:'Applications%20by%20Profession',type:visualization,version:'7.7.0'),(embeddableConfig:(title:'Application%20by%20Region',vis:(legendOpen:!f)),gridData:(h:15,i:f8d3a450-6f27-49c8-bc04-31f8ee387e0e,w:23,x:25,y:22),id:'77ebe950-3819-11ec-9b4d-1fc6319d2633',panelIndex:f8d3a450-6f27-49c8-bc04-31f8ee387e0e,title:'Application%20by%20Region',type:visualization,version:'7.7.0')),query:(language:kuery,query:''),timeRestore:!f,title:'new%20license',viewMode:view)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30d,to:now))" 
                target ="_blank" class=" text-base" style="color: white; ">
                  <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                  Dashboard
                </a>
              </li> -->

              <!-- All Licensed Applications starts here -->

              <!-- <li
                @click="newLicenseMenuHandler('newLicenseAllLicensed')"
                class="mb-2"
              >
                <div class=" text-base" style="color: white; ">
                  <i class="mr-2 far fa-address-book fa-x fa-light"></i>
                  All Licensed
                </div>
              </li> -->

              <!-- All Licensed Appilcations ends here -->
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
import { useRouter } from 'vue-router';

export default {
  name: "NewLicenseSideNav",
  components: {
    DropDownLists,
  },
  props: ["dropdownValue", "expertLevelId", "adminRole"],
  setup(props, { emit }) {
    const router = useRouter();

    let newLicenseDDIcon = ref({
      isNewLicenseUp: false,
      isUnderReviewUp: false,
      isAssignedUp: false,
      isUnfinishedUp: false,
      isUnconfirmedUp: false,
      isOnReivewUp: false,
      isReEvaluateUp: false,
      isDeclinedUp: false,
      isDeclineConfirmedUp: false,
      isUnderSuperVisionUp: false,
      isUnderSuperVisionConfirmedUp: false,
      isConfirmedUp: false,
      isReturned: false,
      isFederalApprovedUp: false,
      isEvaluationUp: false,
      isUnassignedEvaluationUp: false,
      isUnderEvaluationUp: false,
      isReturnedEvaluationUp: false,
      isConfirmedEvaluationUp: false,
      isPaymentReviewnUp: false,
      isFinishedUp: false,
      isLicensedUp: false,
      isUnassignedUp: false,
    });
    const newLicenseMenuHandler = (menu) => {
      emit("selectNewLicenseMenu", menu);
    };

    const dropDownHandler = (applicationValue) => {
      if (applicationValue == "NewLicenseUnfinished") {
        newLicenseDDIcon.value.isUnfinishedUp = !newLicenseDDIcon.value
          .isUnfinishedUp;
      } else if (applicationValue == "NewLicenseUnassignedEvaluation") {
        newLicenseDDIcon.value.isUnassignedEvaluationUp = !newLicenseDDIcon
          .value.isUnassignedEvaluationUp;
      } else if (applicationValue == "NewLicenseUnderEvaluation") {
        newLicenseDDIcon.value.isUnderEvaluationUp = !newLicenseDDIcon.value
          .isUnderEvaluationUp;
      } else if (applicationValue == "NewLicenseReturnedEvaluation") {
        newLicenseDDIcon.value.isReturnedEvaluationUp = !newLicenseDDIcon.value
          .isReturnedEvaluationUp;
      } else if (applicationValue == "NewLicenseConfirmedEvaluation") {
        newLicenseDDIcon.value.isConfirmedEvaluationUp = !newLicenseDDIcon.value
          .isConfirmedEvaluationUp;
      } else if (applicationValue == "NewLicenseDeclined") {
        newLicenseDDIcon.value.isDeclinedUp = !newLicenseDDIcon.value
          .isDeclinedUp;
      } else if (applicationValue == "NewLicenseDeclineConfirmed") {
        newLicenseDDIcon.value.isDeclineConfirmedUp = !newLicenseDDIcon.value
          .isDeclineConfirmedUp;
      } else if (applicationValue == "NewLicenseUnderSuperVisionConfirmed") {
        newLicenseDDIcon.value.isUnderSuperVisionConfirmedUp = !newLicenseDDIcon
          .value.isUnderSuperVisionConfirmedUp;
      } else if (applicationValue == "NewLicensePaymentReview") {
        newLicenseDDIcon.value.isPaymentReviewnUp = !newLicenseDDIcon.value
          .isPaymentReviewnUp;
      } else if (applicationValue == "NewLicenseInReviewPayment") {
        newLicenseDDIcon.value.isInReviewPaymentUp = !newLicenseDDIcon.value
          .isInReviewPaymentUp;
      } else if (applicationValue == "NewLicenseLicensed") {
        newLicenseDDIcon.value.isLicensedUp = !newLicenseDDIcon.value
          .isLicensedUp;
      } else if (applicationValue == "NewLicenseUnassigned") {
        newLicenseDDIcon.value.isUnassignedUp = !newLicenseDDIcon.value
          .isUnassignedUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    const dropDownListHandler = (menu) => {
      emit("selectNewLicenseMenu", menu);
    };

    const newlicenseDDHandler = (applicationValue) => {
      if (applicationValue == "NewLicense") {
        newLicenseDDIcon.value.isNewLicenseUp = !newLicenseDDIcon.value
          .isNewLicenseUp;
      } else if (applicationValue == "NewLicenseUnderReview") {
        newLicenseDDIcon.value.isUnderReviewUp = !newLicenseDDIcon.value
          .isUnderReviewUp;
      } else if (applicationValue == "NewLicenseFinished") {
        newLicenseDDIcon.value.isFinishedUp = !newLicenseDDIcon.value
          .isFinishedUp;
      } else if (applicationValue == "NewLicenseAssigned") {
        newLicenseDDIcon.value.isAssignedUp = !newLicenseDDIcon.value
          .isAssignedUp;
      } else if (applicationValue == "NewLicenseUnfinished") {
        newLicenseDDIcon.value.isUnfinishedUp = !newLicenseDDIcon.value
          .isUnfinishedUp;
      } else if (applicationValue == "NewLicenseUnconfirmed") {
        newLicenseDDIcon.value.isUnconfirmedUp = !newLicenseDDIcon.value
          .isUnconfirmedUp;
      } else if (applicationValue == "NewLicenseOnReview") {
        newLicenseDDIcon.value.isOnReivewUp = !newLicenseDDIcon.value
          .isOnReivewUp;
      } else if (applicationValue == "NewLicenseReEvaluate") {
        newLicenseDDIcon.value.isReEvaluateUp = !newLicenseDDIcon.value
          .isReEvaluateUp;
      } else if (applicationValue == "NewLicenseUnderSuperVision") {
        newLicenseDDIcon.value.isUnderSuperVisionUp = !newLicenseDDIcon.value
          .isUnderSuperVisionUp;
      } else if (applicationValue == "NewLicenseConfirmed") {
        newLicenseDDIcon.value.isConfirmedUp = !newLicenseDDIcon.value
          .isConfirmedUp;
      } else if (applicationValue == "NewLicenseReturned") {
        newLicenseDDIcon.value.isReturnedUp = !newLicenseDDIcon.value
          .isReturnedUp;
      } else if (applicationValue == "NewLicenseFederalApproved") {
        newLicenseDDIcon.value.isFederalApprovedUp = !newLicenseDDIcon.value
          .isFederalApprovedUp;
      } else if (applicationValue == "NewLicenseEvaluation") {
        newLicenseDDIcon.value.isEvaluationUp = !newLicenseDDIcon.value
          .isEvaluationUp;
      }
      emit("applicationTypeSelected", applicationValue);
    };
    return {
      newLicenseDDIcon,
      dropDownHandler,
      dropDownListHandler,
      newlicenseDDHandler,
      newLicenseMenuHandler,
    };
  },
};
</script>
