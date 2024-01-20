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
        <div class="tooltip">
          <TitleWithIllustration
            illustration="Certificate"
            message="Higher Education Relevance and Quality Agency(HERQA)"
            class="mt-8"
          />
          <span class="tooltiptext ml-4">R Equivalence letter </span>
        </div>

        <span class="flex justify-center">{{ documentMessage }}</span>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-8">
          <div class="flex justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ herqaFile.name }}</h2>
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
                      id="herqaFile"
                      class="photoFile"
                      ref="herqaFileP"
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
            v-if="buttons && (draftStatus == 'DEC' || draftStatus == 'CONF')"
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
    let herqaFile = ref("");
    let herqaFileP = ref("");
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

    let herqaBack = ref("");

    let documentMessage = ref("");
    let maxFileSize = ref("");
    let maxSizeMB = ref("");
    let fileSizeExceed = ref(false);

    let declinedFields = ref([]);
    let acceptedFields = ref([]);
    let remark = ref("");

    let declinedFieldsCheck = ref(false);
    let acceptedFieldsCheck = ref(false);

    let passport = ref("");
    let healthExamCert = ref("");
    let herqa = ref("");
    let professionalDoc = ref([]);
    let supportLetter = ref("");
    let previousLicense = ref("");
    let cpd = ref("");
    let cpd2 = ref("");
    let cpd3 = ref("");
    let cpd4 = ref("");
    let cpd5 = ref("");
    let letterFromHiringManager = ref("");
    let workExperience = ref("");
    let workExperience2 = ref("");

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      herqaFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };

    const handleFileUpload = () => {
      herqaFile.value = herqaFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = herqaFile.value.size;
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
        if (herqaFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(herqaFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(herqaFile.value);
          } else if (/\.(pdf)$/i.test(herqaFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(herqaFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        herqaFile.value = "";
        isImage.value = true;
      }
    };
    const submit = () => {
      emit("changeActiveState");
      store.dispatch("renewal/setHerqa", herqaFile);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("renewal/setHerqa", herqaFile);
    };
    buttons = store.getters["renewal/getButtons"];
    documentSpecs = store.getters["renewal/getDocumentSpec"];
    licenseInfo = store.getters["renewal/getLicense"];

    passport = store.getters["renewal/getPassport"];
    healthExamCert = store.getters["renewal/getRenewalHealthExamCert"];
    herqa = store.getters["renewal/getHerqa"];
    professionalDoc = store.getters["renewal/getProfessionalDocuments"];
    supportLetter = store.getters["renewal/getSupportLetter"];
    previousLicense = store.getters["renewal/getPreviousLicense"];
    cpd = store.getters["renewal/getRenewalCpd"];
    cpd2 = store.getters["renewal/getRenewalCpd2"];
    cpd3 = store.getters["renewal/getRenewalCpd3"];
    cpd4 = store.getters["renewal/getRenewalCpd4"];
    cpd5 = store.getters["renewal/getRenewalCpd5"];

    letterFromHiringManager = store.getters["renewal/getRenewalLicense"];
    workExperience = store.getters["renewal/getRenewalWorkExperience"];
    workExperience2 = store.getters["renewal/getRenewalWorkExperience2"];
    remark = store.getters["renewal/getRemark"];

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
                documentSpecs[18].documentType.code,
                herqaFile.value
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
            nativeLanguageId: licenseInfo.nativeLanguageId,
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
            formData.append(documentSpecs[0].documentTypeCode, passport);
            formData.append(documentSpecs[2].documentType.code, healthExamCert);
            formData.append(
              documentSpecs[18].documentTypeCode,
              herqaFile.value
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
            formData.append(documentSpecs[17].documentTypeCode, supportLetter);
            formData.append(
              documentSpecs[6].documentType.code,
              previousLicense
            );
            formData.append(documentSpecs[4].documentType.code, cpd);
            formData.append(documentSpecs[31].documentType.code, cpd2);
            formData.append(documentSpecs[32].documentType.code, cpd3);
            formData.append(documentSpecs[33].documentType.code, cpd4);
            formData.append(documentSpecs[34].documentType.code, cpd5);
            formData.append(
              documentSpecs[7].documentType.code,
              letterFromHiringManager
            );
            formData.append(documentSpecs[5].documentType.code, workExperience);
            formData.append(
              documentSpecs[35].documentType.code,
              workExperience2
            );
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
                documentSpecs[18].documentType.code,
                herqaFile.value
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
            nativeLanguageId: licenseInfo.nativeLanguageId,
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
              documentSpecs[18].documentType.code,
              herqaFile.value
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
      herqaBack = store.getters["renewal/getHerqa"];
      if (
        herqaBack &&
        herqaBack !== undefined &&
        herqaBack !== null &&
        herqaBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        herqaFile.value = herqaBack;
        let reader = new FileReader();
        let fileS = herqaFile.value.size;
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
        if (herqaFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(herqaFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(herqaFile.value);
          } else if (/\.(pdf)$/i.test(herqaFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(herqaFile.value);
          }
        }
      }
      declinedFields = store.getters["renewal/getDeclinedFields"];
      acceptedFields = store.getters["renewal/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("HERQA")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("HERQA")) {
        acceptedFieldsCheck.value = true;
      }

      buttons = store.getters["renewal/getButtons"];
      draftData = store.getters["renewal/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "HERQA") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }

            herqaFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    return {
      herqaFile,
      herqaFileP,
      herqaBack,
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

      passport,
      healthExamCert,
      herqa,
      professionalDoc,
      supportLetter,
      previousLicense,
      cpd,
      letterFromHiringManager,
      workExperience,

      documentMessage,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,
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
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #1e40af82;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted white; /* If you want dots under the hoverable text */
}
</style>
