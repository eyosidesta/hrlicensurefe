<template>
  <div class="flex justify-center">
    <div class="bg-lightBlueB-200 w-screen h-screen max-w-4xl">
      <div
        class="
          flex flex-col
          pt-large
          w-full
          bg-white
          blue-box-shadow-light
          rounded
        "
      >
        <h2
          class="flex justify-center"
          v-if="declinedFieldsCheck"
          style="color: #e63636"
        >
          REJECTED
        </h2>
        <h6
          style="font-weight: bold;"
          class="flex justify-center ml-4 mr-4"
          v-if="declinedFieldsCheck"
        >
          Remark: <span class="ml-2" style="color: #e63636"> {{ remark }}</span>
        </h6>
        <h2
          class="flex justify-center"
          v-if="acceptedFieldsCheck"
          style="color: Green"
        >
          ACCEPTED
        </h2>
        <div>
          <TitleWithIllustration
            illustration="Certificate"
            message="Request Letter from Hiring Health Facility"
            class="mt-8"
          />
        </div>
        <span class="flex justify-center">{{ documentMessage }}</span>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-8">
          <div class="flex justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ requestLetterFile.name }}</h2>
                <h2 v-if="!fileSizeExceed">{{ fileSize }}</h2>
                <h3 style="color: red" v-if="fileSizeExceed">
                  File size must be less than {{ maxSizeMB }} MB
                </h3>
              </span>
              <span v-if="showUpload">
                <label class="text-primary-700"
                  >Upload image:
                  <span style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="requestLetterFile"
                      class="photoFile"
                      ref="requestLetterFileP"
                      v-on:change="handleFileUpload()"
                      style="margin-bottom: 15px !important"
                      accept=".jpeg, .png, .gif, .jpg, .pdf, .webp, .tiff , .svg"
                    />
                    <p>
                      Drag your file(s) here to begin<br />
                      or click to browse
                    </p>
                  </div>
                </label>
              </span>

              <picture v-if="!showUpload && isImage">
                <p>
                  <a href="javascript:void(0)" @click="reset()">Upload again</a>
                </p>
                <img v-bind:src="filePreview" v-show="showPreview" />
              </picture>
              <div v-if="!showUpload && isPdf">
                <p>
                  <a href="javascript:void(0)" @click="reset()">Upload again</a>
                </p>
                <embed v-bind:src="filePreview" v-show="showPreview" />
              </div>
              <span v-if="!showUpload && !isImage && !isPdf">
                <img :src="filePreview" alt="" class="preview" />
              </span>
            </div>
          </div>
        </form>
        <div v-if="!message.showLoading">
          <div v-if="buttons && !draftStatus" class="flex justify-center mb-8">
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button @click="draft(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'DRA'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button @click="draft(buttons[2].action)" variant="outline">
              {{ buttons[2]["name"] }}
            </button>
            <button
              class="withdraw"
              @click="withdraw(buttons[1].action)"
              variant="outline"
            >
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'SUB'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button
              class="withdraw"
              @click="withdraw(buttons[1].action)"
              variant="outline"
            >
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'USUP'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button @click="draft(buttons[0].action)" variant="outline">
              {{ buttons[0]["name"] }}
            </button>
            <button @click="update(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'DEC'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <!-- <button @click="draft(buttons[0].action)" variant="outline">
            {{ buttons[0]["name"] }}
          </button> -->
            <button @click="update(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
        </div>
        <div v-if="message.showLoading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  <div class="mr-3xl" v-if="message.showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TitleWithIllustration from "@/sharedComponents/TitleWithIllustration";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import MESSAGE from "../../../composables/documentMessage";
import MAX_FILE_SIZE from "../../../composables/documentMessage";
import MAX_SIZE_MB from "../../../composables/documentMessage";
import { googleApi } from "@/composables/baseURL";

export default {
  components: {
    TitleWithIllustration,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  props: ["activeState"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let message = ref({
      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
    });

    let fileSize = ref("");

    let dataChanged = ref(false);
    let requestLetterFile = ref("");
    let requestLetterFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);
    let buttons = [];
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let requestLetterBack = ref("");

    let declinedFields = ref([]);
    let acceptedFields = ref([]);
    let remark = ref("");

    let documentMessage = ref("");
    let maxFileSize = ref("");
    let maxSizeMB = ref("");
    let fileSizeExceed = ref(false);

    let declinedFieldsCheck = ref(false);
    let acceptedFieldsCheck = ref(false);

    let passport = ref("");
    let healthExamCert = ref("");
    let professionalDoc = ref([]);
    let herqa = ref("");
    let englishLanguage = ref("");
    let supportLetter = ref("");
    let coc = ref("");
    let educationDoc = ref([]);
    let workExperience = ref("");
    let workExperience2 = ref("");
    let professionalLicense = ref("");
    let professionalLicense2 = ref("");
    let renewedLicense = ref("");
    let payroll = ref("");
    let diploma = ref("");
    let transcript = ref("");
    let degree = ref("");
    let masters = ref("");
    let mastersTranscript = ref("");
    let phd = ref("");
    let phdTranscript = ref("");
    let renewedLicenseOfHealthFacility = ref("");

    let professionalDocCertificate = ref("");
    let professionalDocCertificate2 = ref("");
    let professionalDocCertificate3 = ref("");
    let professionalDocCertificate4 = ref("");
    let professionalDocCertificate5 = ref("");

    let professionalDocDiploma = ref("");
    let professionalDocDiploma2 = ref("");
    let professionalDocDiploma3 = ref("");
    let professionalDocDiploma4 = ref("");
    let professionalDocDiploma5 = ref("");

    let professionalDocTranscript = ref("");
    let professionalDocTranscript2 = ref("");
    let professionalDocTranscript3 = ref("");
    let professionalDocTranscript4 = ref("");
    let professionalDocTranscript5 = ref("");

    let educationLevel = localStorage.getItem("educationalLevel");

    let docIdx = 0;
    let docIdx2 = 0;
    let docIdx3 = 0;
    let docIdx4 = 0;
    let docIdx5 = 0;

    if (educationLevel == "diploma") {
      docIdx = 7;
      docIdx2 = 33;
      docIdx3 = 34;
      docIdx4 = 35;
      docIdx5 = 36;
    } else if (educationLevel == "degree") {
      docIdx = 21;
      docIdx2 = 44;
      docIdx3 = 45;
      docIdx4 = 46;
      docIdx5 = 47;
    } else if (educationLevel == "masters") {
      docIdx = 24;
      docIdx2 = 53;
      docIdx3 = 54;
      docIdx4 = 55;
      docIdx5 = 56;
    } else {
      docIdx = 26;
      docIdx2 = 59;
      docIdx3 = 60;
      docIdx4 = 61;
      docIdx5 = 62;
    }

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      requestLetterFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };

    const handleFileUpload = () => {
      requestLetterFile.value = requestLetterFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = requestLetterFile.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        fileSizeExceed.value = false;
        dataChanged.value = true;
        showUpload.value = false;
        if (fileS > 0 && fileS < 1000) {
          fileSize.value += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          fileSize.value = fileS / 1000 + "kB";
        } else {
          fileSize.value = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            showPreview.value = true;
            filePreview.value = reader.result;
          },
          false
        );
        if (requestLetterFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(requestLetterFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(requestLetterFile.value);
          } else if (/\.(pdf)$/i.test(requestLetterFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(requestLetterFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        requestLetterFile.value = "";
        isImage.value = true;
      }
    };
    const submit = () => {
      emit("changeActiveState");
      store.dispatch(
        "newlicense/setRequestLetterFromHiringHealthFacility",
        requestLetterFile
      );
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch(
        "newlicense/setRequestLetterFromHiringHealthFacility",
        requestLetterFile
      );
    };
    buttons = store.getters["newlicense/getButtons"];
    documentSpecs = store.getters["newlicense/getDocumentSpec"];
    licenseInfo = store.getters["newlicense/getLicense"];

    passport = store.getters["newlicense/getPassport"];
    healthExamCert = store.getters["newlicense/getHealthExamCert"];
    professionalDoc = store.getters["newlicense/getProfessionalDocuments"];
    englishLanguage = store.getters["newlicense/getEnglishLanguage"];
    supportLetter = store.getters["newlicense/getSupportLetter"];
    coc = store.getters["newlicense/getCoc"];
    herqa = store.getters["newlicense/getHerqa"];
    educationDoc = store.getters["newlicense/getEducationalDocuments"];
    workExperience = store.getters["newlicense/getWorkExperience"];
    workExperience2 = store.getters["newlicense/getWorkExperience2"];
    renewedLicense = store.getters["newlicense/getRenewedLicense"];
    professionalLicense = store.getters["newlicense/getProfessionalLicense"];
    professionalLicense2 = store.getters["newlicense/getProfessionalLicense2"];
    payroll = store.getters["newlicense/getPayroll"];
    diploma = store.getters["newlicense/getDiploma"];
    degree = store.getters["newlicense/getDegree"];
    transcript = store.getters["newlicense/getTranscript"];
    masters = store.getters["newlicense/getMasters"];
    mastersTranscript = store.getters["newlicense/getMastersTranscript"];
    phd = store.getters["newlicense/getPhd"];
    phdTranscript = store.getters["newlicense/getPhdTranscript"];
    renewedLicenseOfHealthFacility =
      store.getters["newlicense/getRenewedLicenseOfHealthFacility"];

    professionalDocCertificate =
      store.getters["newlicense/getProfessionalDocCertificate"];
    professionalDocCertificate2 =
      store.getters["newlicense/getProfessionalDocCertificate2"];
    professionalDocCertificate3 =
      store.getters["newlicense/getProfessionalDocCertificate3"];
    professionalDocCertificate4 =
      store.getters["newlicense/getProfessionalDocCertificate4"];
    professionalDocCertificate5 =
      store.getters["newlicense/getProfessionalDocCertificate5"];

    professionalDocDiploma =
      store.getters["newlicense/getProfessionalDocDiploma"];
    professionalDocDiploma2 =
      store.getters["newlicense/getProfessionalDocDiploma2"];
    professionalDocDiploma3 =
      store.getters["newlicense/getProfessionalDocDiploma3"];
    professionalDocDiploma4 =
      store.getters["newlicense/getProfessionalDocDiploma4"];
    professionalDocDiploma5 =
      store.getters["newlicense/getProfessionalDocDiploma5"];

    professionalDocTranscript =
      store.getters["newlicense/getProfessionalDocTranscript"];
    professionalDocTranscript2 =
      store.getters["newlicense/getProfessionalDocTranscript2"];
    professionalDocTranscript3 =
      store.getters["newlicense/getProfessionalDocTranscript3"];
    professionalDocTranscript4 =
      store.getters["newlicense/getProfessionalDocTranscript4"];
    professionalDocTranscript5 =
      store.getters["newlicense/getProfessionalDocTranscript5"];

    remark = store.getters["newlicense/getRemark"];

    const draft = (action) => {
      message.value.showLoading = true;
      if (route.params.id) {
        if (dataChanged.value) {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store.dispatch("newlicense/editNewLicense", license).then((res) => {
            if (res.data.status == "Success") {
              let licenseId = route.params.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[65].documentType.code,
                requestLetterFile.value
              );
              let payload = { document: formData, id: licenseId };
              store
                .dispatch("newlicense/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    message.value.showFlash = !message.value.showFlash;
                    message.value.showLoading = false;
                    setTimeout(() => {
                      router.push({ path: "/menu" });
                    }, 1500);
                  } else {
                    message.value.showErrorFlash = !message.value
                      .showErrorFlash;
                  }
                })
                .catch((err) => {});
            }
          });
        } else {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store.dispatch("newlicense/editNewLicense", license).then((res) => {
            if (res.data.status == "Success") {
              message.value.showFlash = !message.value.showFlash;
              message.value.showLoading = false;
              setTimeout(() => {
                router.push({ path: "/menu" });
              }, 1500);
            } else {
              message.value.showErrorFlash = !message.value.showErrorFlash;
            }
          });
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: userId,
            applicantTypeId: licenseInfo.applicantTypeId,
            education: {
              departmentId: licenseInfo.education.departmentId,
              institutionId: licenseInfo.education.institutionId,
            },
            professionalTypeIds: licenseInfo.professionalTypeIds,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            paymentSlip: null,
            occupationTypeId: licenseInfo.occupationTypeId,
            nativeLanguageId: licenseInfo.nativeLanguageId,
            expertLevelId: licenseInfo.expertLevelId,
            otherEducationalInstitution:
              licenseInfo.otherEducationalInstitution,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store.dispatch("newlicense/addNewLicense", license).then((res) => {
          if (res.data.status == "Success") {
            let licenseId = res.data.data.id;
            let formData = new FormData();
            formData.append(documentSpecs[1].documentType.code, passport);
            formData.append(documentSpecs[2].documentType.code, healthExamCert);
            formData.append(documentSpecs[4].documentType.code, workExperience);
            formData.append(
              documentSpecs[28].documentType.code,
              workExperience2
            );
            formData.append(
              documentSpecs[5].documentType.code,
              englishLanguage
            );
            formData.append(documentSpecs[22].documentType.code, diploma);
            formData.append(documentSpecs[23].documentType.code, transcript);
            formData.append(documentSpecs[21].documentType.code, degree);
            formData.append(
              documentSpecs[6].documentType.code,
              professionalDocCertificate
            );
            formData.append(
              documentSpecs[29].documentType.code,
              professionalDocCertificate2
            );
            formData.append(
              documentSpecs[30].documentType.code,
              professionalDocCertificate3
            );
            formData.append(
              documentSpecs[31].documentType.code,
              professionalDocCertificate4
            );
            formData.append(
              documentSpecs[32].documentType.code,
              professionalDocCertificate5
            );
            formData.append(
              documentSpecs[docIdx].documentType.code,
              professionalDocDiploma
            );
            formData.append(
              documentSpecs[docIdx2].documentType.code,
              professionalDocDiploma2
            );
            formData.append(
              documentSpecs[docIdx3].documentType.code,
              professionalDocDiploma3
            );
            formData.append(
              documentSpecs[docIdx4].documentType.code,
              professionalDocDiploma4
            );
            formData.append(
              documentSpecs[docIdx5].documentType.code,
              professionalDocDiploma5
            );
            formData.append(
              documentSpecs[8].documentType.code,
              professionalDocTranscript
            );
            formData.append(
              documentSpecs[37].documentType.code,
              professionalDocTranscript2
            );
            formData.append(
              documentSpecs[38].documentType.code,
              professionalDocTranscript3
            );
            formData.append(
              documentSpecs[39].documentType.code,
              professionalDocTranscript4
            );
            formData.append(
              documentSpecs[40].documentType.code,
              professionalDocTranscript5
            );
            formData.append(documentSpecs[9].documentType.code, coc);
            if (educationDoc != undefined) {
              formData.append(
                documentSpecs[10].documentType.code,
                educationDoc[0]
              );
              formData.append(
                documentSpecs[11].documentType.code,
                educationDoc[1]
              );
              formData.append(
                documentSpecs[12].documentType.code,
                educationDoc[2]
              );
              formData.append(
                documentSpecs[13].documentType.code,
                educationDoc[3]
              );
              formData.append(
                documentSpecs[14].documentType.code,
                educationDoc[4]
              );
            }
            formData.append(documentSpecs[15].documentType.code, supportLetter);
            formData.append(documentSpecs[16].documentType.code, herqa);
            formData.append(
              documentSpecs[65].documentType.code,
              requestLetterFile.value
            );
            formData.append(
              documentSpecs[18].documentType.code,
              renewedLicense
            );
            formData.append(
              documentSpecs[19].documentType.code,
              professionalLicense
            );
            formData.append(
              documentSpecs[52].documentType.code,
              professionalLicense2
            );
            formData.append(documentSpecs[20].documentType.code, payroll);
            formData.append(documentSpecs[24].documentType.code, masters);
            formData.append(
              documentSpecs[25].documentType.code,
              mastersTranscript
            );
            formData.append(documentSpecs[26].documentType.code, phd);
            formData.append(documentSpecs[27].documentType.code, phdTranscript);
            formData.append(
              documentSpecs[63].documentType.code,
              renewedLicenseOfHealthFacility
            );

            let payload = { document: formData, id: licenseId };
            store
              .dispatch("newlicense/uploadDocuments", payload)
              .then((res) => {
                if (res.status == 200) {
                  message.value.showFlash = !message.value.showFlash;
                  message.value.showLoading = false;
                  setTimeout(() => {
                    router.push({ path: "/menu" });
                  }, 1500);
                } else {
                  message.value.showErrorFlash = !message.value.showErrorFlash;
                }
              })
              .catch((err) => {});
          }
        });
      }
    };
    const update = (action) => {
      message.value.showLoading = true;
      if (route.params.id) {
        if (dataChanged.value) {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store.dispatch("newlicense/editNewLicense", license).then((res) => {
            if (res.data.status == "Success") {
              let licenseId = route.params.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[65].documentType.code,
                requestLetterFile.value
              );
              let payload = { document: formData, id: licenseId };
              store
                .dispatch("newlicense/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    message.value.showFlash = !message.value.showFlash;
                    message.value.showLoading = false;
                    setTimeout(() => {
                      router.push({ path: "/menu" });
                    }, 1500);
                  } else {
                    message.value.showErrorFlash = !message.value
                      .showErrorFlash;
                  }
                })
                .catch((err) => {});
            }
          });
        } else {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store.dispatch("newlicense/editNewLicense", license).then((res) => {
            if (res.data.status == "Success") {
              message.value.showFlash = !message.value.showFlash;
              message.value.showLoading = false;
              setTimeout(() => {
                router.push({ path: "/menu" });
              }, 1500);
            } else {
              message.value.showErrorFlash = !message.value.showErrorFlash;
            }
          });
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: userId,
            applicantTypeId: licenseInfo.applicantTypeId,
            education: {
              departmentId: licenseInfo.education.departmentId,
              institutionId: licenseInfo.education.institutionId,
            },
            professionalTypeIds: licenseInfo.professionalTypeIds,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            educationalLevelId: licenseInfo.educationalLevelId,
            paymentSlip: null,
            occupationTypeId: licenseInfo.occupationTypeId,
            nativeLanguageId: licenseInfo.nativeLanguageId,
            expertLevelId: licenseInfo.expertLevelId,
            otherEducationalInstitution:
              licenseInfo.otherEducationalInstitution,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store.dispatch("newlicense/addNewLicense", license).then((res) => {
          if (res.data.status == "Success") {
            let licenseId = res.data.data.id;
            let formData = new FormData();
            formData.append(
              documentSpecs[65].documentType.code,
              requestLetterFile.value
            );
            let payload = { document: formData, id: licenseId };
            store
              .dispatch("newlicense/uploadDocuments", payload)
              .then((res) => {
                if (res.status == 200) {
                  message.value.showFlash = !message.value.showFlash;
                  message.value.showLoading = false;
                  setTimeout(() => {
                    router.push({ path: "/menu" });
                  }, 1500);
                } else {
                  message.value.showErrorFlash = !message.value.showErrorFlash;
                }
              })
              .catch((err) => {});
          }
        });
      }
    };

    const withdraw = (action) => {
      message.value.showLoading = !message.value.showLoading;
      let withdrawObj = {
        action: action,
        data: draftData,
      };
      let payload = {
        licenseId: draftData.id,
        withdrawData: withdrawObj,
      };
      store.dispatch("newlicense/withdraw", payload).then((res) => {
        if (res) {
          message.value.showFlash = !message.value.showFlash;
          message.value.showLoading = false;
          setTimeout(() => {
            router.push({ path: "/menu" });
          }, 1500);
        } else {
          message.value.showErrorFlash = !message.value.showErrorFlash;
        }
      });
    };

    onMounted(() => {
      documentMessage.value = MESSAGE.DOC_MESSAGE;
      maxFileSize.value = MAX_FILE_SIZE.MAX_FILE_SIZE;
      maxSizeMB.value = MAX_SIZE_MB.MAX_SIZE_MB;
      requestLetterBack =
        store.getters["newlicense/getRequestLetterFromHiringHealthFacility"];
      if (
        requestLetterBack &&
        requestLetterBack !== undefined &&
        requestLetterBack !== null &&
        requestLetterBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        requestLetterFile.value = requestLetterBack;
        let reader = new FileReader();
        let fileS = requestLetterFile.value.size;
        if (fileS > 0 && fileS < 1000) {
          fileSize.value += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          fileSize.value = fileS / 1000 + "kB";
        } else {
          fileSize.value = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            showPreview.value = true;
            filePreview.value = reader.result;
          },
          false
        );
        if (requestLetterFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(requestLetterFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(requestLetterFile.value);
          } else if (/\.(pdf)$/i.test(requestLetterFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(requestLetterFile.value);
          }
        }
      }
      declinedFields = store.getters["newlicense/getDeclinedFields"];
      acceptedFields = store.getters["newlicense/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("RLFHHF")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("RLFHHF")) {
        acceptedFieldsCheck.value = true;
      }

      buttons = store.getters["newlicense/getButtons"];
      draftData = store.getters["newlicense/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "RLFHHF") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }

            requestLetterFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    return {
      requestLetterFile,
      requestLetterFileP,
      requestLetterBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,
      handleFileUpload,
      fileSize,
      reset,
      submit,
      submitBack,
      draft,
      withdraw,
      buttons,
      draftStatus,
      update,
      draftData,
      googleApi,
      message,
      dataChanged,
      acceptedFields,
      declinedFields,
      remark,
      declinedFieldsCheck,
      acceptedFieldsCheck,
      documentMessage,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,

      docIdx,
      docIdx2,
      docIdx3,
      docIdx4,
      docIdx5,
    };
  },
};
</script>
<style>
@import "../../../styles/document-upload.css";
img {
  width: 250px;
  height: 250px;
  border-radius: 0%;
}
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
</style>
