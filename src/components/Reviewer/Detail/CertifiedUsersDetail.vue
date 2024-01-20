<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="certifiedUsers" />
    <span
      v-if="showLoading || showApplicationLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </span>
    <span v-else>
      <span v-if="isUserCertified && myRegion">
        <div
          class="flex justify-center items-center mb-medium"
          v-if="
            applicationStatus !== 'CANC' &&
              applicationStatus !== 'SUSP' &&
              !showActionLoading
          "
        >
          <div v-if="true">
            <button @click="downloadPdf">Download PDF</button>
          </div>
          <div
            v-if="isLicenseGenerated"
            v-for="button in buttons"
            v-bind:key="button.name"
            v-bind:value="button.id"
          >
            <button
              variant="outline"
              v-bind:class="button.class"
              @click="action(button.action)"
            >
              {{ button.name }}
            </button>
          </div>
        </div>
        <div
          v-if="showActionLoading"
          class="flex justify-center justify-items-center mt-2"
        >
          <Spinner />
        </div>
        <div
          class="w-screen bg-lightBlueB-200 flex items-center justify-center"
        >
          <div class="w-screen max-w-4xl mt-medium">
            <div
              class="flex flex-col mt-small w-full bg-white blue-box-shadow-light rounded"
            >
              <div class="mt-medium">
                <Title message="በኢትዮፕያ ፌደራላዊ ዴሞክራሲያዊ ሪፐብሊክ" />
                <Title message="Federal Democratic Republic Ethiopia" />
              </div>
              <span class="mt-1">
                <Title message="የጤና ሚኒስቴር" />
                <Title message="Ministry of Health" />
              </span>
              <form class="mx-auto max-w-3xl w-full mt-1" v-if="show">
                <div class="flex">
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <Title message="የጤና ባለሙያዎች የሙያ ምዝገባና ፈቃድ የምስከር ወረቀት" />
                  </div>
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <Title message="HEALTH PROFFESSIONALS REGISTRATION AND" />
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h4>
                      በኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ረፐብሊክ የጤና ሚንስቴር በአዋጅ ቁጥር
                      {{
                        certificateDetail.reviewer &&
                        certificateDetail.reviewer.expertLevel &&
                        certificateDetail.reviewer.expertLevel.code === "FED"
                          ? "1112/2011"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "AA"
                          ? "64/2011"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "ORO"
                          ? "661/2009"
                          : "-"
                      }}
                      አንቀጽ
                      {{
                        certificateDetail.reviewer &&
                        certificateDetail.reviewer.expertLevel &&
                        certificateDetail.reviewer.expertLevel.code === "FED"
                          ? "73"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "AA"
                          ? "44/8"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "ORO"
                          ? "3/3"
                          : "-"
                      }}
                      ስልጣን መሰረት
                    </h4>
                  </div>

                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h4>
                      Under the Federal Democratic Republic of Ethiopiathe
                      Minstry of Health by Virtue of proclamation No.
                      {{
                        certificateDetail.reviewer &&
                        certificateDetail.reviewer.expertLevel &&
                        certificateDetail.reviewer.expertLevel.code === "FED"
                          ? "1112/2019"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "AA"
                          ? "64/2019"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "ORO"
                          ? "661/2002"
                          : "-"
                      }}
                      Article
                      {{
                        certificateDetail.reviewer &&
                        certificateDetail.reviewer.expertLevel &&
                        certificateDetail.reviewer.expertLevel.code === "FED"
                          ? "73"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "AA"
                          ? "44/8"
                          : certificateDetail.reviewer &&
                            certificateDetail.reviewer.region &&
                            certificateDetail.reviewer.region.code === "ORO"
                          ? "3/3"
                          : "-"
                      }}
                      is given the authority to issue
                    </h4>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h3 class="underline">
                      <b
                        >{{
                          certifiedUser.alternativeName != null
                            ? certifiedUser.alternativeName
                            : ""
                        }}
                        {{
                          certifiedUser.alternativeFatherName != null
                            ? certifiedUser.alternativeFatherName
                            : ""
                        }}
                        {{
                          certifiedUser.alternativeGrandFatherName != null
                            ? certifiedUser.alternativeGrandFatherName
                            : ""
                        }}</b
                      >
                    </h3>
                  </div>
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <br />
                    <h3 class="underline">
                      <b
                        >{{ certifiedUser.name }}
                        {{ certifiedUser.fatherName }}
                        {{
                          certifiedUser.grandFatherName != null
                            ? certifiedUser.grandFatherName
                            : ""
                        }}</b
                      >
                    </h3>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h4>ተገቢውን መስፈርት አሟልተው ስለተገኙ ሚኒስቴር መስሪያ ቤቱ</h4>
                    <h4
                      v-if="
                        certificateDetail.professionalTypes &&
                          certificateDetail.professionalTypes[0]
                            .professionalTypes.amharicProfessionalType
                      "
                    >
                      <div
                        v-for="professions in certificateDetail.professionalTypes"
                        class="flex flex-row"
                      >
                        <b
                          >{{
                            professions.professionalTypes
                              .amharicProfessionalType === "ሌላ"
                              ? ""
                              : professions.professionalTypes
                                  .amharicProfessionalType
                          }}
                        </b>
                      </div>
                      <br />ሙያ መዝግቦ ይህን የሙያ ስራ ፈቃድ ሰጥቷል።
                    </h4>
                  </div>
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h4>
                      Having duly satisfied the requirements of the Ministry
                    </h4>
                    <h4>hereby registered and licensed as</h4>
                    <h4
                      v-if="
                        certificateDetail.professionalTypes &&
                          certificateDetail.professionalTypes[0]
                            .professionalTypes.name
                      "
                    >
                      <div
                        v-for="professions in certificateDetail.professionalTypePrefixes"
                        class="flex flex-row"
                      >
                        <b
                          >{{
                            professions.prefix
                              ? "(" + professions.prefix + ")"
                              : ""
                          }}
                          {{
                            professions.professionalTypes.code === "OTH"
                              ? certificateDetail.otherProfessionalType
                                ? certificateDetail.otherProfessionalType
                                : ""
                              : professions.professionalTypes.name
                          }}</b
                        >
                      </div>
                    </h4>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h3>
                      ይህ የሙያ የስራ ፈቃድ የሚያገለግለው
                      <b>
                        {{
                          certificateDetail.certifiedDate
                            ? toEthiopian(
                                moment(
                                  certificateDetail.certifiedDate
                                )._d.toISOString(),
                                false
                              )
                            : ""
                        }}
                        -{{
                          certificateDetail.licenseExpirationDate !== null
                            ? toEthiopian(
                                moment(
                                  certificateDetail.licenseExpirationDate
                                )._d.toISOString(),
                                false
                              )
                            : " አልተገለጸም"
                        }}
                      </b>
                    </h3>
                  </div>
                  <div class="flex flex-col mb-medium w-1/2 mr-12">
                    <h3>
                      The license is valid:<b
                        >{{
                          certificateDetail.certifiedDate
                            ? moment(certificateDetail.certifiedDate).format(
                                "MMM DD, YYYY"
                              )
                            : ""
                        }}
                        -
                        {{
                          certificateDetail.licenseExpirationDate
                            ? moment(
                                certificateDetail.licenseExpirationDate
                              ).format("MMM DD, YYYY")
                            : " Not specified"
                        }}</b
                      >
                    </h3>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </span>
      <span v-else-if="!isUserCertified && isUserFound">
        <div class="flex justify-center content-center userNotFound">
          <h1>User is not Certified</h1>
        </div>
      </span>
      <span v-else-if="!isUserFound">
        <div class="flex justify-center content-center userNotFound">
          <h1>User is not Found</h1>
        </div>
      </span>
      <span v-else-if="!myRegion">
        <div class="flex justify-center content-center userNotFound">
          <h1>You can't generate Certificate for other region</h1>
        </div>
      </span>
    </span>
  </div>
  <div v-if="showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>
<script>
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import Title from "@/sharedComponents/Title";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import store from "../../../store";
import Spinner from "@/sharedComponents/Spinner";

import jsPDF from "jspdf";
import backgroundImage from "../../../assets/Federal_Certificate.jpg";
import oromiaCertificateBackground from "../../../assets/Oromia_Certificate.jpg";
import addisAbabaCertificateBackground from "../../../assets/A_A_Certificate.jpg";
import AmharicFont from "../Configurations/amharicFont.js";
import { toEthiopian } from "../Configurations/dateConvertor";
import STATIC_CERTIFICATE_URL from "../../../sharedComponents/constants/message.js";

import moment from "moment";
import router from "../../../router";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
export default {
  computed: {
    moment: () => moment,
    AmharicFont: () => AmharicFont,
    toEthiopian: () => toEthiopian,
    STATIC_CERTIFICATE_URL: () => STATIC_CERTIFICATE_URL,
    // getCertifiedUser() {
    //   return store.getters['reviewer/getUnassigned'][0]
    // }
  },
  components: {
    Title,
    ReviewerNavBar,
    Spinner,
    FlashMessage,
    ErrorFlashMessage,
  },
  setup() {
    const store = useStore();
    let route = useRoute();
    let show = ref(false);
    let certifiedUser = ref({});
    let certificateDetail = ref({});
    let renewalData = ref({
      data: {},
    });
    let showLoading = ref(false);
    let showActionLoading = ref(false);

    let showApplicationLoading = ref(false);
    let isUserCertified = ref(true);
    let isUserFound = ref(true);
    let myRegion = ref(true);
    let imageSrc = ref("");
    const adminRegionId = JSON.parse(localStorage.getItem("allAdminData"))
      .regionId;
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;

    const expertLevelCode = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevel.code;

    let buttons = ref([
      { action: "", name: "" },
      { action: "", name: "" },
    ]);
    let isLicenseGenerated = ref(false);
    let applicationTypes = route.params.applicationType;
    let applicationStatus = ref("");

    let showFlash = ref(false);
    let showErrorFlash = ref(false);

    const updateLicenseGenerated = () => {
      let req = {
        action: null,
        data: { ...certificateDetail.value, isLicenseGenerated: true },
      };
      editApplication(applicationTypes, req);
    };

    const editApplication = (applicationType, req) => {
      showActionLoading.value = true;
      if (applicationType == "New License") {
        store
          .dispatch("reviewer/editNewLicense", req)
          .then((res) => {
            showActionLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
            showErrorFlash.value = true;
            showActionLoading.value = false;
            setTimeout(() => {
              router.go();
            }, 3000);
          });
      } else if (applicationType == "Renewal") {
        store
          .dispatch("reviewer/editRenewal", req)
          .then((res) => {
            showActionLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
            showErrorFlash.value = true;
            showActionLoading.value = false;
            setTimeout(() => {
              router.go();
            }, 3000);
          });
      }
    };

    const action = (actionValue) => {
      let req = {
        action: actionValue,
        data: certificateDetail.value,
      };
      editApplication(applicationTypes, req);
    };

    const fetchCertifiedUser = () => {
      showLoading.value = true;
      store
        .dispatch("profile/getProfileByUserId", route.params.applicantId)
        .then((res) => {
          showLoading.value = false;
          certifiedUser.value = res.data.data;
          show.value = true;
        })
        .catch((error) => {
          isUserFound.value = false;
        });
    };

    const fetchQrCode = () => {
      const staticUrl = STATIC_CERTIFICATE_URL;
      const userId = route.params.applicantId;
      const applicationId = route.params.applicationId;
      const applicationType = route.params.applicationType;

      const qrParam = { url: null };

      qrParam.url =
        staticUrl + "/" + applicationType + "/" + userId + "/" + applicationId;
      store
        .dispatch("reviewer/getQrCode", qrParam)
        .then((res) => {
          imageSrc.value = res.data.data;
        })
        .catch((err) => {});
    };
    const fetchApplication = () => {
      showApplicationLoading.value = true;
      if (route.params.applicationType === "Verification") {
        store
          .dispatch(
            "reviewer/getVerificationApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            certificateDetail.value = res.data.data;
            certificateDetail.value.licenseNumber =
              certificateDetail.value.verificationCode;
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (button) => {
                return button.code == "CAN" || button.code == "SUS";
              }
            );
            applicationStatus.value = res.data.data.applicationStatus.code;
            isLicenseGenerated.value = res.data.data.isLicenseGenerated;
            if (
              route.params.applicantId != certificateDetail.value.applicantId
            ) {
              isUserCertified.value = false;
            }
            if (
              certificateDetail.value.woreda !== null &&
              certificateDetail.value.woreda.zone !== null &&
              certificateDetail.value.woreda.zone.region !== null
            ) {
              if (
                adminRegionId != certificateDetail.value.woreda.zone.region.id
              ) {
                myRegion.value = false;
              }
            } else {
              if (expertLevelId != goodStandingUser.value.expertLevelId) {
                myRegion.value = false;
              }
            }
          })
          .catch((error) => {});
      } else if (route.params.applicationType === "Good Standing") {
        store
          .dispatch(
            "reviewer/getGoodStandingApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            certificateDetail.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (button) => {
                return button.code == "CAN" || button.code == "SUS";
              }
            );
            applicationStatus.value = res.data.data.applicationStatus.code;
            isLicenseGenerated.value = res.data.data.isLicenseGenerated;
            certificateDetail.value.licenseNumber =
              certificateDetail.value.goodStandingCode;
            if (
              route.params.applicantId != certificateDetail.value.applicantId
            ) {
              isUserCertified.value = false;
            }
            if (expertLevelCode !== certificateDetail.value.expertLevels.code) {
              myRegion.value = false;
            } else {
              if (
                expertLevelCode === "REG" &&
                adminRegionId != certificateDetail.value.woreda.zone.region.id
              ) {
                myRegion.value = false;
              }
            }
          });
      } else if (route.params.applicationType === "New License") {
        store
          .dispatch(
            "reviewer/getNewLicenseApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            certificateDetail.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (button) => {
                return button.code == "CAN" || button.code == "SUS";
              }
            );
            applicationStatus.value = res.data.data.applicationStatus.code;
            isLicenseGenerated.value = res.data.data.isLicenseGenerated;
            certificateDetail.value.licenseNumber =
              certificateDetail.value.newLicenseCode;
            if (
              route.params.applicantId != certificateDetail.value.applicantId
            ) {
              isUserCertified.value = false;
            }
            if (expertLevelCode !== certificateDetail.value.expertLevels.code) {
              myRegion.value = false;
            } else {
              if (
                expertLevelCode === "REG" &&
                adminRegionId != certificateDetail.value.woreda.zone.region.id
              ) {
                myRegion.value = false;
              }
            }
          });
      } else if (route.params.applicationType === "Renewal") {
        store
          .dispatch(
            "reviewer/getRenewalApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            certificateDetail.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (button) => {
                return button.code == "CAN" || button.code == "SUS";
              }
            );
            applicationStatus.value = res.data.data.applicationStatus.code;
            isLicenseGenerated.value = res.data.data.isLicenseGenerated;
            certificateDetail.value.licenseNumber =
              certificateDetail.value.renewalCode;
            if (
              route.params.applicantId != certificateDetail.value.applicantId
            ) {
              isUserCertified.value = false;
            }
            if (expertLevelCode !== certificateDetail.value.expertLevels.code) {
              myRegion.value = false;
            } else {
              if (
                expertLevelCode === "REG" &&
                adminRegionId != certificateDetail.value.woreda.zone.region.id
              ) {
                myRegion.value = false;
              }
            }
          });
      }
    };

    const handleRegionsLayout = (
      doc,
      code,
      namePosition,
      professionPossition,
      professionListGap
    ) => {
      doc.setFontSize(17);
      doc.text(
        190,
        namePosition,
        `${certifiedUser.value.name} ${certifiedUser.value.fatherName} ${
          certifiedUser.value.grandFatherName
            ? certifiedUser.value.grandFatherName
            : ""
        }`
      );

      let changeWidth = ref(false);
      let changeWidthTooSmall = ref(false);
      let xPosition = ref(185);
      for (
        let i = 0;
        i < certificateDetail.value.professionalTypePrefixes.length;
        i++
      ) {
        let professionPrefix = `${
          certificateDetail.value.professionalTypePrefixes[i].prefix
            ? certificateDetail.value.professionalTypePrefixes[i].prefix
            : ""
        }  ${
          certificateDetail.value.professionalTypePrefixes[i].professionalTypes
            .name
        }`;
        let getLength = doc.getTextWidth(professionPrefix);
        if (getLength > 125 && getLength <= 132) {
          if (!changeWidthTooSmall.value) {
            changeWidth.value = true;
          }
        }
        if (getLength > 132) {
          changeWidthTooSmall.value = true;
          changeWidth.value = false;
        }
      }
      if (changeWidth.value) {
        doc.setFontSize(10);
        xPosition.value = 167;
      } else if (changeWidthTooSmall.value) {
        doc.setFontSize(10);
        xPosition.value = 153;
      } else {
        doc.setFontSize(14);
      }
      for (
        let i = 0;
        i < certificateDetail.value.professionalTypePrefixes.length;
        i++
      ) {
        doc.text(
          xPosition.value,
          professionPossition + i * professionListGap,
          `${
            certificateDetail.value.professionalTypes.length > 1
              ? i + 1 + ". "
              : ""
          }${
            certificateDetail.value.professionalTypePrefixes[i]
              .professionalTypes.name
              ? `${
                  certificateDetail.value.professionalTypePrefixes[i].prefix
                    ? "(" +
                      certificateDetail.value.professionalTypePrefixes[i]
                        .prefix +
                      ")"
                    : ""
                }   ${
                  certificateDetail.value.professionalTypePrefixes[i]
                    .professionalTypes.code === "OTH"
                    ? certificateDetail.value.otherProfessionalType
                      ? certificateDetail.value.otherProfessionalType
                      : ""
                    : certificateDetail.value.professionalTypePrefixes[i]
                        .professionalTypes.name
                }`
              : ""
          }`
        );
      }

      doc.setFontSize(12);
      doc.text(
        197,
        164,
        `${
          certificateDetail.value.certifiedDate
            ? moment(certificateDetail.value.certifiedDate).format(
                "MMM DD, YYYY"
              ) + " - "
            : "Not Specified"
        }`
      );
      doc.text(
        226,
        164,
        `${
          certificateDetail.value.licenseExpirationDate
            ? moment(certificateDetail.value.licenseExpirationDate).format(
                "MMM DD, YYYY"
              )
            : "Not Specified"
        }`
      );
      // License Number
      // doc.text(245, 58, `${certificateDetail.value.licenseNumber}`);
      // License Number for amharic
      doc.text(38, 58, `${certificateDetail.value.licenseNumber}`);

      // doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
      doc.addFileToVFS("Tera-Regular-normal.ttf", AmharicFont);

      doc.addFont("Tera-Regular-normal.ttf", "Tera-Regular", "normal");

      doc.setFont("Tera-Regular"); // set font

      doc.setFontSize(17);
      if (code === "AA" || code == "FED") {
        doc.text(
          60,
          namePosition - 5,
          `${
            certifiedUser.value.alternativeName
              ? certifiedUser.value.alternativeName
              : ""
          } ${
            certifiedUser.value.alternativeFatherName
              ? certifiedUser.value.alternativeFatherName
              : ""
          } ${
            certifiedUser.value.alternativeGrandFatherName
              ? certifiedUser.value.alternativeGrandFatherName
              : ""
          }`
        );
      } else {
        doc.text(
          60,
          namePosition,
          `${
            certifiedUser.value.alternativeName
              ? certifiedUser.value.alternativeName
              : ""
          } ${
            certifiedUser.value.alternativeFatherName
              ? certifiedUser.value.alternativeFatherName
              : ""
          } ${
            certifiedUser.value.alternativeGrandFatherName
              ? certifiedUser.value.alternativeGrandFatherName
              : ""
          }`
        );
      }

      if (changeWidth.value) {
        doc.setFontSize(11);
        xPosition.value = 40;
      } else if (changeWidthTooSmall.value) {
        doc.setFontSize(11);
        xPosition.value = 28;
      } else {
        doc.setFontSize(14);
        xPosition.value = 65;
      }

      for (
        let i = 0;
        i < certificateDetail.value.professionalTypes.length;
        i++
      ) {
        doc.text(
          xPosition.value,
          professionPossition + i * professionListGap,
          `${
            certificateDetail.value.professionalTypes.length > 1
              ? i + 1 + ". "
              : ""
          }${
            certificateDetail.value.professionalTypes[i].professionalTypes
              .amharicProfessionalType
              ? certificateDetail.value.professionalTypes[i].professionalTypes
                  .amharicProfessionalType === "ሌላ"
                ? ""
                : certificateDetail.value.professionalTypes[i].professionalTypes
                    .amharicProfessionalType
              : ""
          }`
        );
      }

      doc.setFontSize(12);
      // doc.text(80)
      let getAmharicLicensedDate = doc.getTextWidth(
        toEthiopian(
          moment(certificateDetail.value.certifiedDate)._d.toISOString(),
          false
        ) + " - "
      );
      doc.text(
        75,
        164,
        `${
          certificateDetail.value.certifiedDate
            ? toEthiopian(
                moment(certificateDetail.value.certifiedDate)._d.toISOString(),
                false
              ) + " - "
            : ""
        }`
      );
      doc.text(
        75 + getAmharicLicensedDate,
        164,
        `${
          certificateDetail.value.licenseExpirationDate
            ? toEthiopian(
                moment(
                  certificateDetail.value.licenseExpirationDate
                )._d.toISOString(),
                false
              )
            : " አልተገለጸም"
        }`
      );
    };

    const downloadPdf = () => {
      const doc = new jsPDF({
        orientation: "landscape",
        filters: ["ASCIIHexEncode"],
      });
      updateLicenseGenerated();
      const userImage = certifiedUser.value.photo;
      if (certificateDetail.value.reviewer.expertLevel.code === "FED") {
        doc.addImage(
          backgroundImage,
          "JPEG",
          0,
          0,
          298,
          213,
          undefined,
          "FAST"
        );
        handleRegionsLayout(doc, "FED", 100, 125, 7);
      } else if (certificateDetail.value.reviewer.region.code === "ORO") {
        doc.addImage(
          oromiaCertificateBackground,
          "JPEG",
          0,
          0,
          298,
          213,
          undefined,
          "FAST"
        );
        handleRegionsLayout(doc, "ORO", 110, 133, 4);
      } else if (certificateDetail.value.reviewer.region.code === "AA") {
        doc.addImage(
          addisAbabaCertificateBackground,
          "JPEG",
          0,
          0,
          298,
          213,
          undefined,
          "FAST"
        );
        handleRegionsLayout(doc, "AA", 110, 133, 4);
      }

      // doc.addImage(backgroundImage, "JPEG", 0, 0, 298, 213, undefined, "FAST");
      doc.addImage(imageSrc.value, "JPG", 246, 14, 35, 35);
      if (userImage !== null) {
        doc.addImage(userImage, "JPEG", 33, 20, 30, 30);
      }
      // doc.text(10, 203, `ቀን: ${toEthiopian(new Date().toISOString(), false)}`)
      doc.setFontSize(10);

      window.open(doc.output("bloburl"));
    };
    onMounted(() => {
      fetchQrCode();
      fetchCertifiedUser();
      fetchApplication();
    });
    return {
      show,
      downloadPdf,
      certifiedUser,
      showLoading,
      certificateDetail,
      isUserCertified,
      isUserFound,
      myRegion,
      buttons,
      isLicenseGenerated,
      action,
      showActionLoading,
      applicationStatus,
      showFlash,
      showErrorFlash,
    };
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  font-size: 17px;
}

.container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.container img {
  vertical-align: middle;
  opacity: 0.35;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}
.flex-container {
  /* margin-top: -500px; */
  display: flex;
  justify-content: center;
}
.flex-container > div {
  margin: 40px;
  margin-top: -690px;
  color: black;
}
.flex-center {
  padding-left: 25%;
  justify-content: center;
}
.flex-second-container {
  display: flex;
  justify-content: center;
}
.flex-second-container > div {
  margin: 40px;
  margin-top: -550px;
}
.userNotFound {
  margin-top: 10%;
}
</style>
