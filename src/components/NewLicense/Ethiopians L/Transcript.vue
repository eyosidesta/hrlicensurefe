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
        <div v-if="educationLevel == 'diploma'">
          <TitleWithIllustration
            illustration="Certificate"
            message="Diploma Transcript"
            class="mt-8"
          />
        </div>
        <div v-else>
          <TitleWithIllustration
            illustration="Certificate"
            message="Degree Transcript"
            class="mt-8"
          />
        </div>
        <span class="flex justify-center">{{ documentMessage }}</span>
        <div class="ml-4">
          <button @click="addDocs()">Add Document</button>
          <button @click="removeDocs()">Remove Document</button>
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl mt-8">
          <div class="flex flex-col justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ TranscriptFile.name }}</h2>
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
                      id="TranscriptFile"
                      class="photoFile"
                      ref="TranscriptFileP"
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
            <div v-if="docCount > 0">
              <span v-if="showUpload2">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="TranscriptFile2"
                      class="photoFile"
                      ref="TranscriptFileP2"
                      v-on:change="handleFileUpload2()"
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
              <picture v-if="!showUpload2 && isImage2">
                <p>
                  <a href="javascript:void(0)" @click="reset2()"
                    >Upload again</a
                  >
                </p>
                <img v-bind:src="filePreview2" v-show="showPreview2" />
              </picture>
              <div v-if="!showUpload2 && isPdf2">
                <p>
                  <a href="javascript:void(0)" @click="reset2()"
                    >Upload again</a
                  >
                </p>
                <embed v-bind:src="filePreview2" v-show="showPreview2" />
              </div>
              <span v-if="!showUpload2 && !isImage2 && !isPdf2">
                <img :src="filePreview2" class="preview" />
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

    let TranscriptFile = ref("");
    let TranscriptFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);

    let TranscriptFile2 = ref("");
    let TranscriptFileP2 = ref("");
    let showPreview2 = ref(false);
    let filePreview2 = ref("");
    let showUpload2 = ref(true);
    let isImage2 = ref(false);
    let isPdf2 = ref(false);

    let buttons = [];
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let transcriptBack = ref("");
    let transcriptBack2 = ref("");

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
    let herqa = ref("");
    let englishLanguage = ref("");
    let supportLetter = ref("");
    let educationDoc = ref([]);
    let workExperience = ref("");
    let workExperience2 = ref("");
    let professionalLicense = ref("");
    let renewedLicense = ref("");
    let payroll = ref("");
    let coc = ref("");
    let coc2 = ref("");
    let coc3 = ref("");
    let degree = ref("");
    let diploma = ref("");
    let masters = ref("");
    let mastersTranscript = ref("");
    let mastersTranscript2 = ref("");
    let phd = ref("");
    let phdTranscript = ref("");
    let phdTranscript2 = ref("");

    let educationLevel = localStorage.getItem("educationalLevel");

    let docCount = ref(0);

    const addDocs = () => {
      if (docCount.value < 2) {
        docCount.value++;
      }
    };
    const removeDocs = () => {
      if (docCount.value > 0) {
        docCount.value--;
      }
    };

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      TranscriptFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };

    const handleFileUpload = () => {
      TranscriptFile.value = TranscriptFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = TranscriptFile.value.size;
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
        if (TranscriptFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(TranscriptFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(TranscriptFile.value);
          } else if (/\.(pdf)$/i.test(TranscriptFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(TranscriptFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        TranscriptFile.value = "";
        isImage.value = true;
      }
    };

    const reset2 = () => {
      showUpload2.value = true;
      showPreview2.value = false;
      TranscriptFile2.value = "";
      filePreview2.value = "";
      isImage2.value = true;
      isPdf2.value = false;
    };

    const handleFileUpload2 = () => {
      TranscriptFile2.value = TranscriptFileP2.value.files[0];
      let reader = new FileReader();
      isImage2.value = true;
      let fileS = TranscriptFile2.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        showUpload2.value = false;
        reader.addEventListener(
          "load",
          function() {
            showPreview2.value = true;
            filePreview2.value = reader.result;
          },
          false
        );
        if (TranscriptFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(TranscriptFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(TranscriptFile2.value);
          } else if (/\.(pdf)$/i.test(TranscriptFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(TranscriptFile2.value);
          }
        }
      } else {
        TranscriptFile2.value = "";
        isImage2.value = true;
      }
    };

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("newlicense/setTranscript", TranscriptFile);
      store.dispatch("newlicense/setTranscript2", TranscriptFile2);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("newlicense/setTranscript", TranscriptFile);
      store.dispatch("newlicense/setTranscript2", TranscriptFile2);
    };
    buttons = store.getters["newlicense/getButtons"];
    documentSpecs = store.getters["newlicense/getDocumentSpec"];
    licenseInfo = store.getters["newlicense/getLicense"];

    passport = store.getters["newlicense/getPassport"];
    englishLanguage = store.getters["newlicense/getEnglishLanguage"];
    herqa = store.getters["newlicense/getHerqa"];
    healthExamCert = store.getters["newlicense/getHealthExamCert"];
    supportLetter = store.getters["newlicense/getSupportLetter"];
    educationDoc = store.getters["newlicense/getEducationalDocuments"];
    workExperience = store.getters["newlicense/getWorkExperience"];
    workExperience2 = store.getters["newlicense/getWorkExperience2"];
    renewedLicense = store.getters["newlicense/getRenewedLicense"];
    professionalLicense = store.getters["newlicense/getProfessionalLicense"];
    payroll = store.getters["newlicense/getPayroll"];
    diploma = store.getters["newlicense/getDiploma"];
    degree = store.getters["newlicense/getDegree"];
    coc = store.getters["newlicense/getCoc"];
    coc2 = store.getters["newlicense/getCoc2"];
    coc3 = store.getters["newlicense/getCoc3"];
    masters = store.getters["newlicense/getMasters"];
    mastersTranscript = store.getters["newlicense/getMastersTranscript"];
    mastersTranscript2 = store.getters["newlicense/getMastersTranscript2"];
    phd = store.getters["newlicense/getPhd"];
    phdTranscript = store.getters["newlicense/getPhdTranscript"];
    phdTranscript2 = store.getters["newlicense/getPhdTranscript2"];
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
                documentSpecs[23].documentType.code,
                TranscriptFile.value
              );
              formData.append(
                documentSpecs[52].documentType.code,
                TranscriptFile2.value
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
            formData.append(documentSpecs[21].documentType.code, degree);
            formData.append(documentSpecs[22].documentType.code, diploma);
            formData.append(documentSpecs[9].documentType.code, coc);
            formData.append(documentSpecs[41].documentType.code, coc2);
            formData.append(documentSpecs[42].documentType.code, coc3);
            formData.append(
              documentSpecs[23].documentType.code,
              TranscriptFile.value
            );
            formData.append(
              documentSpecs[52].documentType.code,
              TranscriptFile2.value
            );
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
              documentSpecs[18].documentType.code,
              renewedLicense
            );
            formData.append(
              documentSpecs[19].documentType.code,
              professionalLicense
            );
            formData.append(documentSpecs[20].documentType.code, payroll);
            formData.append(documentSpecs[24].documentType.code, masters);
            formData.append(
              documentSpecs[25].documentType.code,
              mastersTranscript
            );
            formData.append(
              documentSpecs[57].documentType.code,
              mastersTranscript2
            );
            formData.append(documentSpecs[26].documentType.code, phd);
            formData.append(documentSpecs[27].documentType.code, phdTranscript);
            formData.append(
              documentSpecs[58].documentType.code,
              phdTranscript2
            );
            formData.append(
              documentSpecs[52].documentType.code,
              TranscriptFile2.value
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
                documentSpecs[23].documentType.code,
                TranscriptFile.value
              );
              formData.append(
                documentSpecs[52].documentType.code,
                TranscriptFile2.value
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
              documentSpecs[23].documentType.code,
              TranscriptFile.value
            );
            formData.append(
              documentSpecs[52].documentType.code,
              TranscriptFile2.value
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
      transcriptBack = store.getters["newlicense/getTranscript"];
      transcriptBack2 = store.getters["newlicense/getTranscript2"];
      if (
        transcriptBack &&
        transcriptBack !== undefined &&
        transcriptBack !== null &&
        transcriptBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        TranscriptFile.value = transcriptBack;
        let reader = new FileReader();
        let fileS = TranscriptFile.value.size;
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
        if (TranscriptFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(TranscriptFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(TranscriptFile.value);
          } else if (/\.(pdf)$/i.test(TranscriptFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(TranscriptFile.value);
          }
        }
      }
      if (
        transcriptBack2 &&
        transcriptBack2 !== undefined &&
        transcriptBack2 !== null &&
        transcriptBack2 !== ""
      ) {
        showUpload2.value = false;
        TranscriptFile2.value = transcriptBack2;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview2.value = true;
            filePreview2.value = reader.result;
          },
          false
        );
        if (TranscriptFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(TranscriptFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(TranscriptFile2.value);
          } else if (/\.(pdf)$/i.test(TranscriptFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(TranscriptFile2.value);
          }
        }
      }
      declinedFields = store.getters["newlicense/getDeclinedFields"];
      acceptedFields = store.getters["newlicense/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("TRAN")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("TRAN")) {
        acceptedFieldsCheck.value = true;
      }
      buttons = store.getters["newlicense/getButtons"];
      draftData = store.getters["newlicense/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "TRAN") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }
            TranscriptFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "TRAN1") {
            docCount.value++;
            showUpload2.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf2.value = true;
            } else {
              isImage2.value = true;
            }
            TranscriptFile2.value = draftData.documents[i];
            showPreview2.value = true;
            filePreview2.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    return {
      TranscriptFile,
      TranscriptFileP,
      transcriptBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,

      TranscriptFile2,
      TranscriptFileP2,
      transcriptBack2,
      showPreview2,
      filePreview2,
      showUpload2,
      isImage2,
      isPdf2,

      handleFileUpload,
      handleFileUpload2,

      reset,
      reset2,

      submit,
      submitBack,
      draft,
      withdraw,
      fileSize,
      buttons,
      draftData,
      draftStatus,
      update,
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
      docCount,
      addDocs,
      removeDocs,

      educationLevel,
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
