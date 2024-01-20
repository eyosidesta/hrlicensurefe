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
        <TitleWithIllustration
          illustration="Certificate"
          message="Medical Certificate"
          class="mt-8"
        />
        <span class="flex justify-center">{{ documentMessage }}</span>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-8">
          <div class="flex justify-center mb-10">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ healthExamCertFile.name }}</h2>
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
                      id="healthExamCertFile"
                      class="photoFile"
                      ref="healthExamCertFileP"
                      v-on:change="handleFileUpload()"
                      style="margin-bottom: 15px !important;"
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
            <button @click="submit">
              Next
            </button>
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
            <button @click="submit">
              Next
            </button>
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
            <button @click="submit">
              Next
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
            v-if="buttons && draftStatus == 'USUP'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <button @click="draft(buttons[0].action)" variant="outline">
              {{ buttons[0]["name"] }}
            </button>
            <button @click="update(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && (draftStatus == 'DEC' || draftStatus == 'CONF')"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
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
import MESSAGE from "../../composables/documentMessage";
import MAX_FILE_SIZE from "../../composables/documentMessage";
import MAX_SIZE_MB from "../../composables/documentMessage";
import { googleApi } from "@/composables/baseURL";

export default {
  props: ["activeState"],
  components: {
    TitleWithIllustration,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
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
    let healthExamCertFile = ref("");
    let healthExamCertFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);
    let draftStatus = ref("");

    let healthExamBack = ref("");

    let buttons = [];
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");

    let declinedFields = ref([]);
    let acceptedFields = ref([]);
    let remark = ref("");

    let declinedFieldsCheck = ref(false);
    let acceptedFieldsCheck = ref(false);

    let documentMessage = ref("");
    let maxFileSize = ref("");
    let maxSizeMB = ref("");
    let fileSizeExceed = ref(false);

    let passport = ref("");
    let professionalDoc = [];
    let workExperience = ref("");
    let workExperience2 = ref("");
    let cpd = ref("");
    let cpd2 = ref("");
    let cpd3 = ref("");
    let cpd4 = ref("");
    let cpd5 = ref("");
    let herqa = ref("");
    let previousLicense = ref("");
    let supportLetter = ref("");
    let coc = ref("");
    let degree = ref("");
    let diploma = ref("");
    let educationDoc = [];
    let payroll = ref("");
    let transcript = ref("");
    let englishLanguage = ref("");
    let letterFromOrg = ref("");
    let professionalLicense = ref("");
    let renewedLicense = ref("");
    let renewedLicenseOfHealthFacility = ref("");
    let letterOrg = ref("");
    let masters = ref("");
    let mastersTranscript = ref("");
    let phd = ref("");
    let phdTranscript = ref("");

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      healthExamCertFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };
    const handleFileUpload = () => {
      healthExamCertFile.value = healthExamCertFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = healthExamCertFile.value.size;
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
        if (healthExamCertFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(healthExamCertFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(healthExamCertFile.value);
          } else if (/\.(pdf)$/i.test(healthExamCertFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(healthExamCertFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        healthExamCertFile.value = "";
        isImage.value = true;
      }
    };
    buttons = store.getters["renewal/getButtons"];
    documentSpecs = store.getters["renewal/getDocumentSpec"];
    licenseInfo = store.getters["renewal/getLicense"];

    passport = store.getters["renewal/getPassport"];
    professionalDoc = store.getters["renewal/getProfessionalDocuments"];
    workExperience = store.getters["renewal/getRenewalWorkExperience"];
    workExperience2 = store.getters["renewal/getRenewalWorkExperience2"];
    cpd = store.getters["renewal/getRenewalCpd"];
    cpd2 = store.getters["renewal/getRenewalCpd2"];
    cpd3 = store.getters["renewal/getRenewalCpd3"];
    cpd4 = store.getters["renewal/getRenewalCpd4"];
    cpd5 = store.getters["renewal/getRenewalCpd5"];
    herqa = store.getters["renewal/getHerqa"];
    previousLicense = store.getters["renewal/getPreviousLicense"];
    supportLetter = store.getters["renewal/getSupportLetter"];
    coc = store.getters["renewal/getCoc"];
    degree = store.getters["renewal/getDegree"];
    diploma = store.getters["renewal/getDiploma"];
    educationDoc = store.getters["renewal/getEducationalDocuments"];
    payroll = store.getters["renewal/getPayroll"];
    transcript = store.getters["renewal/getTranscript"];
    englishLanguage = store.getters["renewal/getEnglishLanguage"];
    letterFromOrg = store.getters["renewal/getRenewalLicense"];
    professionalLicense = store.getters["renewal/getProfessionalLicense"];
    renewedLicense = store.getters["renewal/getRenewedLicense"];
    renewedLicenseOfHealthFacility =
      store.getters["renewal/getRenewedLicenseOfHealthFacility"];
    letterOrg = store.getters["renewal/getLetterfromOrg"];
    masters = store.getters["renewal/getMasters"];
    mastersTranscript = store.getters["renewal/getMastersTranscript"];
    phd = store.getters["renewal/getPhd"];
    phdTranscript = store.getters["renewal/getPhdTranscript"];
    remark = store.getters["renewal/getRemark"];

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("renewal/setRenewalHealthExamCert", healthExamCertFile);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("renewal/setRenewalHealthExamCert", healthExamCertFile);
    };

    onMounted(() => {
      documentMessage.value = MESSAGE.DOC_MESSAGE;
      maxFileSize.value = MAX_FILE_SIZE.MAX_FILE_SIZE;
      maxSizeMB.value = MAX_SIZE_MB.MAX_SIZE_MB;
      healthExamBack = store.getters["renewal/getRenewalHealthExamCert"];
      if (
        healthExamBack &&
        healthExamBack !== undefined &&
        healthExamBack !== null &&
        healthExamBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        healthExamCertFile.value = healthExamBack;
        let reader = new FileReader();
        let fileS = healthExamCertFile.value.size;
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
        if (healthExamCertFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(healthExamCertFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(healthExamCertFile.value);
          } else if (/\.(pdf)$/i.test(healthExamCertFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(healthExamCertFile.value);
          }
        }
      }
      declinedFields = store.getters["renewal/getDeclinedFields"];
      acceptedFields = store.getters["renewal/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("HEC")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("HEC")) {
        acceptedFieldsCheck.value = true;
      }
      buttons = store.getters["renewal/getButtons"];
      draftData = store.getters["renewal/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "HEC") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }

            healthExamCertFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
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
          store.dispatch("renewal/editRenewalLicense", license).then((res) => {
            if (res.data.status == "Success") {
              let licenseId = route.params.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[2].documentType.code,
                healthExamCertFile.value
              );

              let payload = { document: formData, id: licenseId };
              store
                .dispatch("renewal/uploadDocuments", payload)
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
          store.dispatch("renewal/editRenewalLicense", license).then((res) => {
            if (res.data.status == "Success") {
              message.value.showFlash = !message.value.showFlash;
              message.value.showLoading = false;
              setTimeout(() => {
                router.push({ path: "/menu" });
              }, 1500);

              router.push({ path: "/menu" });
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
            educationalLevelId: licenseInfo.educationalLevelId,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            paymentSlip: null,
            occupationTypeId: licenseInfo.occupationTypeId,
            expertLevelId: licenseInfo.expertLevelId,
            otherEducationalInstitution:
              licenseInfo.otherEducationalInstitution,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store.dispatch("renewal/addRenewalLicense", license).then((res) => {
          if (res.data.status == "Success") {
            let licenseId = res.data.data.id;
            let formData = new FormData();

            formData.append(documentSpecs[0].documentType.code, passport);
            formData.append(
              documentSpecs[2].documentType.code,
              healthExamCertFile.value
            );
            if (professionalDoc != undefined) {
              formData.append(
                documentSpecs[8].documentType.code,
                professionalDoc[0]
              );
              formData.append(
                documentSpecs[9].documentType.code,
                professionalDoc[1]
              );
              formData.append(
                documentSpecs[10].documentType.code,
                professionalDoc[2]
              );
            }
            formData.append(documentSpecs[5].documentType.code, workExperience);
            formData.append(
              documentSpecs[35].documentType.code,
              workExperience2
            );
            formData.append(documentSpecs[4].documentType.code, cpd);
            formData.append(documentSpecs[31].documentType.code, cpd2);
            formData.append(documentSpecs[32].documentType.code, cpd3);
            formData.append(documentSpecs[33].documentType.code, cpd4);
            formData.append(documentSpecs[34].documentType.code, cpd5);
            formData.append(documentSpecs[18].documentType.code, herqa);
            formData.append(
              documentSpecs[6].documentType.code,
              previousLicense
            );
            formData.append(documentSpecs[17].documentType.code, supportLetter);
            formData.append(documentSpecs[11].documentType.code, coc);
            formData.append(documentSpecs[24].documentType.code, degree);
            formData.append(documentSpecs[25].documentType.code, diploma);
            if (educationDoc != undefined) {
              formData.append(
                documentSpecs[12].documentType.code,
                educationDoc[0]
              );
              formData.append(
                documentSpecs[13].documentType.code,
                educationDoc[1]
              );
              formData.append(
                documentSpecs[14].documentType.code,
                educationDoc[2]
              );
              formData.append(
                documentSpecs[15].documentType.code,
                educationDoc[3]
              );
              formData.append(
                documentSpecs[16].documentType.code,
                educationDoc[4]
              );
            }
            formData.append(documentSpecs[23].documentType.code, payroll);
            formData.append(documentSpecs[26].documentType.code, transcript);
            formData.append(
              documentSpecs[7].documentType.code,
              englishLanguage
            );
            formData.append(documentSpecs[19].documentType.code, letterFromOrg);
            formData.append(
              documentSpecs[22].documentType.code,
              professionalLicense
            );
            formData.append(
              documentSpecs[21].documentType.code,
              renewedLicense
            );
            formData.append(
              documentSpecs[36].documentType.code,
              renewedLicenseOfHealthFacility
            );
            formData.append(documentSpecs[20].documentType.code, letterOrg);
            formData.append(documentSpecs[27].documentType.code, masters);
            formData.append(
              documentSpecs[28].documentType.code,
              mastersTranscript
            );
            formData.append(documentSpecs[29].documentType.code, phd);
            formData.append(documentSpecs[30].documentType.code, phdTranscript);

            let payload = { document: formData, id: licenseId };
            store
              .dispatch("renewal/uploadDocuments", payload)
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
          store.dispatch("renewal/editRenewalLicense", license).then((res) => {
            if (res.data.status == "Success") {
              let licenseId = route.params.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[2].documentType.code,
                healthExamCertFile.value
              );
              let payload = { document: formData, id: licenseId };
              store
                .dispatch("renewal/uploadDocuments", payload)
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
          store.dispatch("renewal/editRenewalLicense", license).then((res) => {
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
            educationalLevelId: licenseInfo.educationalLevelId,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            paymentSlip: null,
            occupationTypeId: licenseInfo.occupationTypeId,
            expertLevelId: licenseInfo.expertLevelId,
            otherEducationalInstitution:
              licenseInfo.otherEducationalInstitution,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store.dispatch("renewal/addRenewalLicense", license).then((res) => {
          if (res.data.status == "Success") {
            let licenseId = res.data.data.id;
            let formData = new FormData();
            formData.append(
              documentSpecs[2].documentType.code,
              healthExamCertFile.value
            );
            let payload = { document: formData, id: licenseId };
            store
              .dispatch("renewal/uploadDocuments", payload)
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
      store.dispatch("renewal/withdraw", payload).then((res) => {
        if (res.data.status == "Success") {
          message.value.showFlash = !message.value.showFlash;
          message.value.showLoading = !message.value.showLoading;
          setTimeout(() => {
            router.push({ path: "/menu" });
          }, 1500);
        } else {
          message.value.showErrorFlash = !message.value.showErrorFlash;
        }
      });
    };
    return {
      healthExamCertFile,
      healthExamCertFileP,
      healthExamBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,
      handleFileUpload,
      reset,
      submit,
      submitBack,
      draft,
      withdraw,
      fileSize,
      buttons,
      draftData,
      googleApi,
      draftStatus,
      update,
      message,
      dataChanged,
      acceptedFields,
      declinedFields,
      remark,
      declinedFieldsCheck,
      acceptedFieldsCheck,

      passport,
      professionalDoc,
      workExperience,
      cpd,
      herqa,
      previousLicense,
      supportLetter,
      coc,
      degree,
      diploma,
      educationDoc,
      payroll,
      transcript,
      englishLanguage,
      letterFromOrg,
      professionalLicense,
      renewedLicense,
      renewedLicenseOfHealthFacility,
      letterOrg,
      masters,
      mastersTranscript,
      phd,
      phdTranscript,

      documentMessage,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,
    };
  },
};
</script>
<style>
@import "../../styles/document-upload.css";
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
