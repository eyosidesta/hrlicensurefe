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
          message="COC"
          class="mt-8"
        />
        <span class="flex justify-center">{{ documentMessage }}</span>
        <div class="ml-4">
          <button @click="addDocs()">Add Document</button>
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl mt-8">
          <div class="flex flex-col justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ COCFile.name }}</h2>
                <h2 v-if="!fileSizeExceed">{{ fileSize }}</h2>
                <h3 style="color: red" v-if="fileSizeExceed">
                  File size must be less than {{ maxSizeMB }} MB
                </h3>
              </span>
              <span v-if="showUpload">
                <label class="text-primary-700"
                  >Upload image:
                  <span
                    v-if="eduLevel == 'diploma'"
                    style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="COCFile"
                      class="photoFile"
                      ref="COCFileP"
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
                      id="COCFile2"
                      class="photoFile"
                      ref="COCFileP2"
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
            <div v-if="docCount > 1">
              <span v-if="showUpload3">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="COCFile3"
                      class="photoFile"
                      ref="COCFileP3"
                      v-on:change="handleFileUpload3()"
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
              <picture v-if="!showUpload3 && isImage3">
                <p>
                  <a href="javascript:void(0)" @click="reset3()"
                    >Upload again</a
                  >
                </p>
                <img v-bind:src="filePreview3" v-show="showPreview3" />
              </picture>
              <div v-if="!showUpload3 && isPdf3">
                <p>
                  <a href="javascript:void(0)" @click="reset3()"
                    >Upload again</a
                  >
                </p>
                <embed v-bind:src="filePreview3" v-show="showPreview3" />
              </div>
              <span v-if="!showUpload3 && !isImage3 && !isPdf3">
                <img :src="filePreview3" class="preview" />
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

    let COCFile = ref("");
    let COCFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);

    let COCFile2 = ref("");
    let COCFileP2 = ref("");
    let showPreview2 = ref(false);
    let filePreview2 = ref("");
    let showUpload2 = ref(true);
    let isImage2 = ref(false);
    let isPdf2 = ref(false);

    let COCFile3 = ref("");
    let COCFileP3 = ref("");
    let showPreview3 = ref(false);
    let filePreview3 = ref("");
    let showUpload3 = ref(true);
    let isImage3 = ref(false);
    let isPdf3 = ref(false);

    let buttons = [];
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let cocBack = ref("");
    let cocBack2 = ref("");
    let cocBack3 = ref("");

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
    let diploma = ref("");
    let transcript = ref("");
    let transcript2 = ref("");
    let degree = ref("");
    let masters = ref("");
    let mastersTranscript = ref("");
    let mastersTranscript2 = ref("");
    let phd = ref("");
    let phdTranscript = ref("");
    let phdTranscript2 = ref("");

    let eduLevel = ref("");

    let docCount = ref(0);

    const addDocs = () => {
      if (docCount.value < 3) {
        docCount.value++;
      }
    };

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      COCFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };

    const handleFileUpload = () => {
      COCFile.value = COCFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = COCFile.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        dataChanged.value = true;
        showUpload.value = false;
        fileSizeExceed.value = false;
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
        if (COCFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(COCFile.value);
          } else if (/\.(pdf)$/i.test(COCFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(COCFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        COCFile.value = "";
        isImage.value = true;
      }
    };
    const reset2 = () => {
      showUpload2.value = true;
      showPreview2.value = false;
      COCFile2.value = "";
      filePreview2.value = "";
      isImage2.value = true;
      isPdf2.value = false;
    };

    const handleFileUpload2 = () => {
      COCFile2.value = COCFileP2.value.files[0];
      let reader = new FileReader();
      isImage2.value = true;
      let fileS = COCFile2.value.size;
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
        if (COCFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(COCFile2.value);
          } else if (/\.(pdf)$/i.test(COCFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(COCFile2.value);
          }
        }
      } else {
        COCFile2.value = "";
        isImage2.value = true;
      }
    };

    const reset3 = () => {
      showUpload3.value = true;
      showPreview3.value = false;
      COCFile3.value = "";
      filePreview3.value = "";
      isImage3.value = true;
      isPdf3.value = false;
    };

    const handleFileUpload3 = () => {
      COCFile3.value = COCFileP3.value.files[0];
      let reader = new FileReader();
      isImage3.value = true;
      let fileS = COCFile3.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        showUpload3.value = false;
        reader.addEventListener(
          "load",
          function() {
            showPreview3.value = true;
            filePreview3.value = reader.result;
          },
          false
        );
        if (COCFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(COCFile3.value);
          } else if (/\.(pdf)$/i.test(COCFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(COCFile3.value);
          }
        }
      } else {
        COCFile3.value = "";
        isImage3.value = true;
      }
    };

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("newlicense/setCOC", COCFile);
      store.dispatch("newlicense/setCOC2", COCFile2);
      store.dispatch("newlicense/setCOC3", COCFile3);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("newlicense/setCOC", COCFile);
      store.dispatch("newlicense/setCOC2", COCFile2);
      store.dispatch("newlicense/setCOC3", COCFile3);
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
    transcript = store.getters["newlicense/getTranscript"];
    transcript2 = store.getters["newlicense/getTranscript2"];
    masters = store.getters["newlicense/getMasters"];
    mastersTranscript = store.getters["newlicense/getMastersTranscript"];
    mastersTranscript2 = store.getters["newlicense/getMastersTranscript2"];
    phd = store.getters["newlicense/getPhd"];
    phdTranscript = store.getters["newlicense/getPhdTranscript"];
    phdTranscript2 = store.getters["newlicense/getPhdTranscript2"];
    remark = store.getters["newlicense/getRemark"];

    eduLevel = localStorage.getItem("educationalLevel");

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
                documentSpecs[9].documentType.code,
                COCFile.value
              );
              formData.append(
                documentSpecs[41].documentType.code,
                COCFile2.value
              );
              formData.append(
                documentSpecs[42].documentType.code,
                COCFile3.value
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
            formData.append(documentSpecs[52].documentType.code, transcript2);
            formData.append(documentSpecs[21].documentType.code, degree);
            formData.append(documentSpecs[9].documentType.code, COCFile.value);
            formData.append(
              documentSpecs[41].documentType.code,
              COCFile2.value
            );
            formData.append(
              documentSpecs[42].documentType.code,
              COCFile3.value
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
                documentSpecs[9].documentType.code,
                COCFile.value
              );
              formData.append(
                documentSpecs[41].documentType.code,
                COCFile2.value
              );
              formData.append(
                documentSpecs[42].documentType.code,
                COCFile3.value
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
            formData.append(documentSpecs[9].documentType.code, COCFile.value);
            formData.append(
              documentSpecs[41].documentType.code,
              COCFile2.value
            );
            formData.append(
              documentSpecs[42].documentType.code,
              COCFile3.value
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
      cocBack = store.getters["newlicense/getCoc"];
      cocBack2 = store.getters["newlicense/getCoc2"];
      cocBack3 = store.getters["newlicense/getCoc3"];
      if (
        cocBack &&
        cocBack !== undefined &&
        cocBack !== null &&
        cocBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        COCFile.value = cocBack;
        let reader = new FileReader();
        let fileS = COCFile.value.size;
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
        if (COCFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(COCFile.value);
          } else if (/\.(pdf)$/i.test(COCFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(COCFile.value);
          }
        }
      }
      if (
        cocBack2 &&
        cocBack2 !== undefined &&
        cocBack2 !== null &&
        cocBack2 !== ""
      ) {
        docCount.value++;
        showUpload2.value = false;
        COCFile2.value = cocBack2;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview2.value = true;
            filePreview2.value = reader.result;
          },
          false
        );
        if (COCFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(COCFile2.value);
          } else if (/\.(pdf)$/i.test(COCFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(COCFile2.value);
          }
        }
      }
      if (
        cocBack3 &&
        cocBack3 !== undefined &&
        cocBack3 !== null &&
        cocBack3 !== ""
      ) {
        docCount.value += 2;
        showUpload3.value = false;
        COCFile3.value = cocBack3;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview3.value = true;
            filePreview3.value = reader.result;
          },
          false
        );
        if (COCFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(COCFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(COCFile3.value);
          } else if (/\.(pdf)$/i.test(COCFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(COCFile3.value);
          }
        }
      }
      declinedFields = store.getters["newlicense/getDeclinedFields"];
      acceptedFields = store.getters["newlicense/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("COC")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("COC")) {
        acceptedFieldsCheck.value = true;
      }
      buttons = store.getters["newlicense/getButtons"];
      draftData = store.getters["newlicense/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "COC") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }

            COCFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "COC1") {
            docCount.value++;
            showUpload2.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf2.value = true;
            } else {
              isImage2.value = true;
            }
            COCFile2.value = draftData.documents[i];
            showPreview2.value = true;
            filePreview2.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "COC2") {
            docCount.value += 2;
            showUpload3.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf3.value = true;
            } else {
              isImage3.value = true;
            }
            COCFile3.value = draftData.documents[i];
            showPreview3.value = true;
            filePreview3.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    return {
      COCFile,
      COCFileP,
      cocBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,

      COCFile2,
      COCFileP2,
      cocBack2,
      showPreview2,
      filePreview2,
      showUpload2,
      isImage2,
      isPdf2,

      COCFile3,
      COCFileP3,
      cocBack3,
      showPreview3,
      filePreview3,
      showUpload3,
      isImage3,
      isPdf3,

      handleFileUpload,
      handleFileUpload2,
      handleFileUpload3,

      reset,
      reset2,
      reset3,

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
      eduLevel,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,
      docCount,
      addDocs,
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
