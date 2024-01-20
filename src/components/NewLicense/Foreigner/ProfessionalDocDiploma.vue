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
            message="Professional Document Diploma"
            class="mt-8"
          />
        </div>

        <div v-if="educationLevel == 'degree'">
          <TitleWithIllustration
            illustration="Certificate"
            message="Professional Document Degree"
            class="mt-8"
          />
        </div>

        <div v-if="educationLevel == 'masters'">
          <TitleWithIllustration
            illustration="Certificate"
            message="Professional Document Masters"
            class="mt-8"
          />
        </div>
        <div v-if="educationLevel == 'phd'">
          <TitleWithIllustration
            illustration="Certificate"
            message="Professional Document PhD"
            class="mt-8"
          />
        </div>
        <span class="flex justify-center">{{ documentMessage }}</span>
        <div class="ml-24">
          <button @click="addDocs()">Add Document</button>
          <button @click="removeDocs()">Remove Document</button>
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl mt-8">
          <div class="flex flex-col justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ diplomaFile.name }}</h2>
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
                      id="diplomaFile"
                      class="photoFile"
                      ref="diplomaFileP"
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
                      id="diplomaFile2"
                      class="photoFile"
                      ref="diplomaFileP2"
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
                      id="diplomaFile3"
                      class="photoFile"
                      ref="diplomaFileP3"
                      v-on:change="handleFileUpload3()"
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
                <img :src="filePreview3" alt="" class="preview" />
              </span>
            </div>
          </div>
          <div class="flex flex-col justify-center mb-4">
            <div v-if="docCount > 2">
              <span v-if="showUpload4">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="diplomaFile4"
                      class="photoFile"
                      ref="diplomaFileP4"
                      v-on:change="handleFileUpload4()"
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
              <picture v-if="!showUpload4 && isImage4">
                <p>
                  <a href="javascript:void(0)" @click="reset4()"
                    >Upload again</a
                  >
                </p>
                <img v-bind:src="filePreview4" v-show="showPreview4" />
              </picture>
              <div v-if="!showUpload4 && isPdf4">
                <p>
                  <a href="javascript:void(0)" @click="reset4()"
                    >Upload again</a
                  >
                </p>
                <embed v-bind:src="filePreview4" v-show="showPreview4" />
              </div>
              <span v-if="!showUpload4 && !isImage4 && !isPdf4">
                <img :src="filePreview4" alt="" class="preview" />
              </span>
            </div>
            <div v-if="docCount > 3">
              <span v-if="showUpload5">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="diplomaFile5"
                      class="photoFile"
                      ref="diplomaFileP5"
                      v-on:change="handleFileUpload5()"
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
              <picture v-if="!showUpload5 && isImage5">
                <p>
                  <a href="javascript:void(0)" @click="reset5()"
                    >Upload again</a
                  >
                </p>
                <img v-bind:src="filePreview5" v-show="showPreview5" />
              </picture>
              <div v-if="!showUpload5 && isPdf5">
                <p>
                  <a href="javascript:void(0)" @click="reset5()"
                    >Upload again</a
                  >
                </p>
                <embed v-bind:src="filePreview5" v-show="showPreview5" />
              </div>
              <span v-if="!showUpload5 && !isImage5 && !isPdf5">
                <img :src="filePreview5" alt="" class="preview" />
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
    let diplomaFile = ref("");
    let diplomaFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);

    let diplomaFile2 = ref("");
    let diplomaFileP2 = ref("");
    let showPreview2 = ref(false);
    let filePreview2 = ref("");
    let showUpload2 = ref(true);
    let isImage2 = ref(false);
    let isPdf2 = ref(false);

    let diplomaFile3 = ref("");
    let diplomaFileP3 = ref("");
    let showPreview3 = ref(false);
    let filePreview3 = ref("");
    let showUpload3 = ref(true);
    let isImage3 = ref(false);
    let isPdf3 = ref(false);

    let diplomaFile4 = ref("");
    let diplomaFileP4 = ref("");
    let showPreview4 = ref(false);
    let filePreview4 = ref("");
    let showUpload4 = ref(true);
    let isImage4 = ref(false);
    let isPdf4 = ref(false);

    let diplomaFile5 = ref("");
    let diplomaFileP5 = ref("");
    let showPreview5 = ref(false);
    let filePreview5 = ref("");
    let showUpload5 = ref(true);
    let isImage5 = ref(false);
    let isPdf5 = ref(false);

    let buttons = [];
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let diplomaBack = ref("");
    let diplomaBack2 = ref("");
    let diplomaBack3 = ref("");
    let diplomaBack4 = ref("");
    let diplomaBack5 = ref("");

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
    let coc = ref("");
    let educationDoc = ref([]);
    let workExperience = ref("");
    let workExperience2 = ref("");
    let professionalLicense = ref("");
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
    let requestLetterFromHiringHealthFacility = ref("");

    let professionalDocCertificate = ref("");
    let professionalDocCertificate2 = ref("");
    let professionalDocCertificate3 = ref("");
    let professionalDocCertificate4 = ref("");
    let professionalDocCertificate5 = ref("");

    let professionalDocTranscript = ref("");
    let professionalDocTranscript2 = ref("");
    let professionalDocTranscript3 = ref("");
    let professionalDocTranscript4 = ref("");
    let professionalDocTranscript5 = ref("");

    let educationLevel = localStorage.getItem("educationalLevel");

    let docCode = "";
    let docNum = 0;
    let docIdx = 0;
    let docIdx2 = 0;
    let docIdx3 = 0;
    let docIdx4 = 0;
    let docIdx5 = 0;

    if (educationLevel == "diploma") {
      docCode = "PDD";
      docIdx = 7;
      docIdx2 = 33;
      docIdx3 = 34;
      docIdx4 = 35;
      docIdx5 = 36;
    } else if (educationLevel == "degree") {
      docCode = "DEG";
      docIdx = 21;
      docIdx2 = 44;
      docIdx3 = 45;
      docIdx4 = 46;
      docIdx5 = 47;
    } else if (educationLevel == "masters") {
      docCode = "MAST";
      docIdx = 24;
      docIdx2 = 53;
      docIdx3 = 54;
      docIdx4 = 55;
      docIdx5 = 56;
    } else {
      docCode = "PHD";
      docIdx = 26;
      docIdx2 = 59;
      docIdx3 = 60;
      docIdx4 = 61;
      docIdx5 = 62;
    }

    let docCount = ref(0);

    const addDocs = () => {
      if (docCount.value < 5) {
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
      diplomaFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };

    const handleFileUpload = () => {
      diplomaFile.value = diplomaFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = diplomaFile.value.size;
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
        if (diplomaFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(diplomaFile.value);
          } else if (/\.(pdf)$/i.test(diplomaFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(diplomaFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        diplomaFile.value = "";
        isImage.value = true;
      }
    };

    const reset2 = () => {
      showUpload2.value = true;
      showPreview2.value = false;
      diplomaFile2.value = "";
      filePreview2.value = "";
      isImage2.value = true;
      isPdf2.value = false;
    };
    const handleFileUpload2 = () => {
      diplomaFile2.value = diplomaFileP2.value.files[0];
      let reader = new FileReader();
      isImage2.value = true;
      let fileS = diplomaFile2.value.size;
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
        if (diplomaFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(diplomaFile2.value);
          } else if (/\.(pdf)$/i.test(diplomaFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(diplomaFile2.value);
          }
        }
      } else {
        diplomaFile2.value = "";
        isImage2.value = true;
      }
    };

    const reset3 = () => {
      showUpload3.value = true;
      showPreview3.value = false;
      diplomaFile3.value = "";
      filePreview3.value = "";
      isImage3.value = true;
      isPdf3.value = false;
    };
    const handleFileUpload3 = () => {
      diplomaFile3.value = diplomaFileP3.value.files[0];
      let reader = new FileReader();
      isImage3.value = true;
      let fileS = diplomaFile3.value.size;
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
        if (diplomaFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(diplomaFile3.value);
          } else if (/\.(pdf)$/i.test(diplomaFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(diplomaFile3.value);
          }
        }
      } else {
        diplomaFile3.value = "";
        isImage3.value = true;
      }
    };

    const reset4 = () => {
      showUpload4.value = true;
      showPreview4.value = false;
      diplomaFile4.value = "";
      filePreview4.value = "";
      isImage4.value = true;
      isPdf4.value = false;
    };
    const handleFileUpload4 = () => {
      diplomaFile4.value = diplomaFileP4.value.files[0];
      let reader = new FileReader();
      isImage4.value = true;
      let fileS = diplomaFile4.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        showUpload4.value = false;
        reader.addEventListener(
          "load",
          function() {
            showPreview4.value = true;
            filePreview4.value = reader.result;
          },
          false
        );
        if (diplomaFile4.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile4.value.name)) {
            isImage4.value = true;
            reader.readAsDataURL(diplomaFile4.value);
          } else if (/\.(pdf)$/i.test(diplomaFile4.value.name)) {
            isImage4.value = false;
            isPdf4.value = true;
            reader.readAsDataURL(diplomaFile4.value);
          }
        }
      } else {
        diplomaFile4.value = "";
        isImage4.value = true;
      }
    };

    const reset5 = () => {
      showUpload5.value = true;
      showPreview5.value = false;
      diplomaFile5.value = "";
      filePreview5.value = "";
      isImage5.value = true;
      isPdf5.value = false;
    };
    const handleFileUpload5 = () => {
      diplomaFile5.value = diplomaFileP5.value.files[0];
      let reader = new FileReader();
      isImage5.value = true;
      let fileS = diplomaFile5.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        showUpload5.value = false;
        reader.addEventListener(
          "load",
          function() {
            showPreview5.value = true;
            filePreview5.value = reader.result;
          },
          false
        );
        if (diplomaFile5.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile5.value.name)) {
            isImage5.value = true;
            reader.readAsDataURL(diplomaFile5.value);
          } else if (/\.(pdf)$/i.test(diplomaFile5.value.name)) {
            isImage5.value = false;
            isPdf5.value = true;
            reader.readAsDataURL(diplomaFile5.value);
          }
        }
      } else {
        diplomaFile5.value = "";
        isImage5.value = true;
      }
    };

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("newlicense/setProfessionalDocDiploma", diplomaFile);
      store.dispatch("newlicense/setProfessionalDocDiploma2", diplomaFile2);
      store.dispatch("newlicense/setProfessionalDocDiploma3", diplomaFile3);
      store.dispatch("newlicense/setProfessionalDocDiploma4", diplomaFile4);
      store.dispatch("newlicense/setProfessionalDocDiploma5", diplomaFile5);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("newlicense/setProfessionalDocDiploma", diplomaFile);
      store.dispatch("newlicense/setProfessionalDocDiploma2", diplomaFile2);
      store.dispatch("newlicense/setProfessionalDocDiploma3", diplomaFile3);
      store.dispatch("newlicense/setProfessionalDocDiploma4", diplomaFile4);
      store.dispatch("newlicense/setProfessionalDocDiploma5", diplomaFile5);
    };

    buttons = store.getters["newlicense/getButtons"];
    documentSpecs = store.getters["newlicense/getDocumentSpec"];
    licenseInfo = store.getters["newlicense/getLicense"];

    passport = store.getters["newlicense/getPassport"];
    healthExamCert = store.getters["newlicense/getHealthExamCert"];
    herqa = store.getters["newlicense/getHerqa"];
    englishLanguage = store.getters["newlicense/getEnglishLanguage"];
    supportLetter = store.getters["newlicense/getSupportLetter"];
    coc = store.getters["newlicense/getCoc"];
    educationDoc = store.getters["newlicense/getEducationalDocuments"];
    workExperience = store.getters["newlicense/getWorkExperience"];
    workExperience2 = store.getters["newlicense/getWorkExperience2"];
    renewedLicense = store.getters["newlicense/getRenewedLicense"];
    professionalLicense = store.getters["newlicense/getProfessionalLicense"];
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
    requestLetterFromHiringHealthFacility =
      store.getters["getRequestLetterFromHiringHealthFacility"];

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
                documentSpecs[docIdx].documentType.code,
                diplomaFile.value
              );
              formData.append(
                documentSpecs[docIdx2].documentType.code,
                diplomaFile2.value
              );
              formData.append(
                documentSpecs[docIdx3].documentType.code,
                diplomaFile3.value
              );
              formData.append(
                documentSpecs[docIdx4].documentType.code,
                diplomaFile4.value
              );
              formData.append(
                documentSpecs[docIdx5].documentType.code,
                diplomaFile5.value
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
              diplomaFile.value
            );
            formData.append(
              documentSpecs[docIdx2].documentType.code,
              diplomaFile2.value
            );
            formData.append(
              documentSpecs[docIdx3].documentType.code,
              diplomaFile3.value
            );
            formData.append(
              documentSpecs[docIdx4].documentType.code,
              diplomaFile4.value
            );
            formData.append(
              documentSpecs[docIdx5].documentType.code,
              diplomaFile5.value
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
            formData.append(documentSpecs[26].documentType.code, phd);
            formData.append(documentSpecs[27].documentType.code, phdTranscript);
            formData.append(
              documentSpecs[63].documentType.code,
              renewedLicenseOfHealthFacility
            );
            formData.append(
              documentSpecs[65].documentType.code,
              requestLetterFromHiringHealthFacility
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
                documentSpecs[docIdx].documentType.code,
                diplomaFile.value
              );
              formData.append(
                documentSpecs[docIdx2].documentType.code,
                diplomaFile2.value
              );
              formData.append(
                documentSpecs[docIdx3].documentType.code,
                diplomaFile3.value
              );
              formData.append(
                documentSpecs[docIdx4].documentType.code,
                diplomaFile4.value
              );
              formData.append(
                documentSpecs[docIdx5].documentType.code,
                diplomaFile5.value
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
              documentSpecs[docIdx].documentType.code,
              diplomaFile.value
            );
            formData.append(
              documentSpecs[docIdx2].documentType.code,
              diplomaFile2.value
            );
            formData.append(
              documentSpecs[docIdx3].documentType.code,
              diplomaFile3.value
            );
            formData.append(
              documentSpecs[docIdx4].documentType.code,
              diplomaFile4.value
            );
            formData.append(
              documentSpecs[docIdx5].documentType.code,
              diplomaFile5.value
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
      diplomaBack = store.getters["newlicense/getProfessionalDocDiploma"];
      diplomaBack2 = store.getters["newlicense/getProfessionalDocDiploma2"];
      diplomaBack3 = store.getters["newlicense/getProfessionalDocDiploma3"];
      diplomaBack4 = store.getters["newlicense/getProfessionalDocDiploma4"];
      diplomaBack5 = store.getters["newlicense/getProfessionalDocDiploma5"];

      if (
        diplomaBack &&
        diplomaBack !== undefined &&
        diplomaBack !== null &&
        diplomaBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        diplomaFile.value = diplomaBack;
        let reader = new FileReader();
        let fileS = diplomaFile.value.size;
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
        if (diplomaFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(diplomaFile.value);
          } else if (/\.(pdf)$/i.test(diplomaFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(diplomaFile.value);
          }
        }
      }
      if (
        diplomaBack2 &&
        diplomaBack2 !== undefined &&
        diplomaBack2 !== null &&
        diplomaBack2 !== ""
      ) {
        docCount.value++;
        showUpload2.value = false;
        diplomaFile2.value = diplomaBack2;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview2.value = true;
            filePreview2.value = reader.result;
          },
          false
        );
        if (diplomaFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(diplomaFile2.value);
          } else if (/\.(pdf)$/i.test(diplomaFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(diplomaFile2.value);
          }
        }
      }
      if (
        diplomaBack3 &&
        diplomaBack3 !== undefined &&
        diplomaBack3 !== null &&
        diplomaBack3 !== ""
      ) {
        docCount.value++;
        showUpload3.value = false;
        diplomaFile3.value = diplomaBack3;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview3.value = true;
            filePreview3.value = reader.result;
          },
          false
        );
        if (diplomaFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(diplomaFile3.value);
          } else if (/\.(pdf)$/i.test(diplomaFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(diplomaFile3.value);
          }
        }
      }
      if (
        diplomaBack4 &&
        diplomaBack4 !== undefined &&
        diplomaBack4 !== null &&
        diplomaBack4 !== ""
      ) {
        docCount.value++;
        showUpload4.value = false;
        diplomaFile4.value = diplomaBack4;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview4.value = true;
            filePreview4.value = reader.result;
          },
          false
        );
        if (diplomaFile4.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile4.value.name)) {
            isImage4.value = true;
            reader.readAsDataURL(diplomaFile4.value);
          } else if (/\.(pdf)$/i.test(diplomaFile4.value.name)) {
            isImage4.value = false;
            isPdf4.value = true;
            reader.readAsDataURL(diplomaFile4.value);
          }
        }
      }
      if (
        diplomaBack5 &&
        diplomaBack5 !== undefined &&
        diplomaBack5 !== null &&
        diplomaBack5 !== ""
      ) {
        docCount.value++;
        showUpload5.value = false;
        diplomaFile5.value = diplomaBack5;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview5.value = true;
            filePreview5.value = reader.result;
          },
          false
        );
        if (diplomaFile5.value) {
          if (/\.(jpe?g|png|gif)$/i.test(diplomaFile5.value.name)) {
            isImage5.value = true;
            reader.readAsDataURL(diplomaFile5.value);
          } else if (/\.(pdf)$/i.test(diplomaFile5.value.name)) {
            isImage5.value = false;
            isPdf5.value = true;
            reader.readAsDataURL(diplomaFile5.value);
          }
        }
      }
      declinedFields = store.getters["newlicense/getDeclinedFields"];
      acceptedFields = store.getters["newlicense/getAcceptedFields"];
      if (
        declinedFields != undefined &&
        declinedFields.includes(`${docCode}`)
      ) {
        declinedFieldsCheck.value = true;
      }
      if (
        acceptedFields != undefined &&
        acceptedFields.includes(`${docCode}`)
      ) {
        acceptedFieldsCheck.value = true;
      }

      buttons = store.getters["newlicense/getButtons"];
      draftData = store.getters["newlicense/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == `${docCode}`) {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }

            diplomaFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
          if (
            draftData.documents[i].documentTypeCode == `${docCode}${docNum + 1}`
          ) {
            docCount.value++;
            showUpload2.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf2.value = true;
            } else {
              isImage2.value = true;
            }
            diplomaFile2.value = draftData.documents[i];
            showPreview2.value = true;
            filePreview2.value = googleApi + draftData.documents[i].filePath;
          }
          if (
            draftData.documents[i].documentTypeCode == `${docCode}${docNum + 2}`
          ) {
            docCount.value++;
            showUpload3.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf3.value = true;
            } else {
              isImage3.value = true;
            }
            diplomaFile3.value = draftData.documents[i];
            showPreview3.value = true;
            filePreview3.value = googleApi + draftData.documents[i].filePath;
          }
          if (
            draftData.documents[i].documentTypeCode == `${docCode}${docNum + 3}`
          ) {
            docCount.value++;
            showUpload4.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf4.value = true;
            } else {
              isImage4.value = true;
            }
            diplomaFile4.value = draftData.documents[i];
            showPreview4.value = true;
            filePreview4.value = googleApi + draftData.documents[i].filePath;
          }
          if (
            draftData.documents[i].documentTypeCode == `${docCode}${docNum + 4}`
          ) {
            docCount.value++;
            showUpload5.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf5.value = true;
            } else {
              isImage5.value = true;
            }
            diplomaFile5.value = draftData.documents[i];
            showPreview5.value = true;
            filePreview5.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    return {
      diplomaFile,
      diplomaFileP,
      diplomaBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,

      diplomaFile2,
      diplomaFileP2,
      diplomaBack2,
      showPreview2,
      filePreview2,
      showUpload2,
      isImage2,
      isPdf2,

      diplomaFile3,
      diplomaFileP3,
      diplomaBack3,
      showPreview3,
      filePreview3,
      showUpload3,
      isImage3,
      isPdf3,

      diplomaFile4,
      diplomaFileP4,
      diplomaBack4,
      showPreview4,
      filePreview4,
      showUpload4,
      isImage4,
      isPdf4,

      diplomaFile5,
      diplomaFileP5,
      diplomaBack5,
      showPreview5,
      filePreview5,
      showUpload5,
      isImage5,
      isPdf5,

      handleFileUpload,
      handleFileUpload2,
      handleFileUpload3,
      handleFileUpload4,
      handleFileUpload5,

      fileSize,

      reset,
      reset2,
      reset3,
      reset4,
      reset5,

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

      docCount,
      addDocs,
      removeDocs,

      educationLevel,
      docCode,
      docNum,
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
