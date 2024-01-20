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
          message="CPD"
          class="mt-8"
        />
        <span class="flex justify-center">{{ documentMessage }}</span>
        <div class="ml-24">
          <button @click="addDocs()">Add Document</button>
          <button @click="removeDocs()">Remove Document</button>
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl mt-8">
          <div class="flex flex-col justify-center mb-4">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ cpdFile.name }}</h2>
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
                      id="cpdFile"
                      class="photoFile"
                      ref="cpdFileP"
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
            <div v-if="docCount > 0">
              <span v-if="showUpload2">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="cpdFile2"
                      class="photoFile"
                      ref="cpdFileP2"
                      v-on:change="handleFileUpload2()"
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
                <img :src="filePreview2" alt="" class="preview" />
              </span>
            </div>
            <div v-if="docCount > 1">
              <span v-if="showUpload3">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="cpdFile3"
                      class="photoFile"
                      ref="cpdFileP3"
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
                      id="cpdFile4"
                      class="photoFile"
                      ref="cpdFileP4"
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
                      id="cpdFile5"
                      class="photoFile"
                      ref="cpdFileP5"
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
    let cpdFile = ref("");
    let cpdFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);

    let cpdFile2 = ref("");
    let cpdFileP2 = ref("");
    let showPreview2 = ref(false);
    let filePreview2 = ref("");
    let showUpload2 = ref(true);
    let isImage2 = ref(false);
    let isPdf2 = ref(false);

    let cpdFile3 = ref("");
    let cpdFileP3 = ref("");
    let showPreview3 = ref(false);
    let filePreview3 = ref("");
    let showUpload3 = ref(true);
    let isImage3 = ref(false);
    let isPdf3 = ref(false);

    let cpdFile4 = ref("");
    let cpdFileP4 = ref("");
    let showPreview4 = ref(false);
    let filePreview4 = ref("");
    let showUpload4 = ref(true);
    let isImage4 = ref(false);
    let isPdf4 = ref(false);

    let cpdFile5 = ref("");
    let cpdFileP5 = ref("");
    let showPreview5 = ref(false);
    let filePreview5 = ref("");
    let showUpload5 = ref(true);
    let isImage5 = ref(false);
    let isPdf5 = ref(false);

    let cpdBack = ref("");
    let cpdBack2 = ref("");
    let cpdBack3 = ref("");
    let cpdBack4 = ref("");
    let cpdBack5 = ref("");

    let documentMessage = ref("");
    let maxFileSize = ref("");
    let maxSizeMB = ref("");
    let fileSizeExceed = ref(false);

    let buttons = ref([]);
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let declinedFields = ref([]);
    let acceptedFields = ref([]);
    let remark = ref("");

    let declinedFieldsCheck = ref(false);
    let acceptedFieldsCheck = ref(false);

    let passport = ref("");
    let healthExamCert = ref("");
    let coc = ref("");
    let degree = ref("");
    let diploma = ref("");
    let educationDoc = [];
    let payroll = ref("");
    let supportLetter = ref("");
    let transcript = ref("");
    let workExperience = ref("");
    let workExperience2 = ref("");
    let previousLicense = ref("");
    let cpd = ref("");
    let letterFromHiringManager = ref("");
    let masters = ref("");
    let mastersTranscript = ref("");
    let phd = ref("");
    let phdTranscript = ref("");

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
      cpdFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };
    const handleFileUpload = () => {
      cpdFile.value = cpdFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = cpdFile.value.size;
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
        if (cpdFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(cpdFile.value);
          } else if (/\.(pdf)$/i.test(cpdFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(cpdFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        cpdFile.value = "";
        isImage.value = true;
      }
    };

    const reset2 = () => {
      showUpload2.value = true;
      showPreview2.value = false;
      cpdFile2.value = "";
      filePreview2.value = "";
      isImage2.value = true;
      isPdf2.value = false;
    };
    const handleFileUpload2 = () => {
      cpdFile2.value = cpdFileP2.value.files[0];
      let reader = new FileReader();
      isImage2.value = true;
      let fileS = cpdFile2.value.size;
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
        if (cpdFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(cpdFile2.value);
          } else if (/\.(pdf)$/i.test(cpdFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(cpdFile2.value);
          }
        }
      } else {
        cpdFile2.value = "";
        isImage2.value = true;
      }
    };

    const reset3 = () => {
      showUpload3.value = true;
      showPreview3.value = false;
      cpdFile3.value = "";
      filePreview3.value = "";
      isImage3.value = true;
      isPdf3.value = false;
    };
    const handleFileUpload3 = () => {
      cpdFile3.value = cpdFileP3.value.files[0];
      let reader = new FileReader();
      isImage3.value = true;
      let fileS = cpdFile3.value.size;
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
        if (cpdFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(cpdFile3.value);
          } else if (/\.(pdf)$/i.test(cpdFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(cpdFile3.value);
          }
        }
      } else {
        cpdFile3.value = "";
        isImage3.value = true;
      }
    };

    const reset4 = () => {
      showUpload4.value = true;
      showPreview4.value = false;
      cpdFile4.value = "";
      filePreview4.value = "";
      isImage4.value = true;
      isPdf4.value = false;
    };
    const handleFileUpload4 = () => {
      cpdFile4.value = cpdFileP4.value.files[0];
      let reader = new FileReader();
      isImage4.value = true;
      let fileS = cpdFile4.value.size;
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
        if (cpdFile4.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile4.value.name)) {
            isImage4.value = true;
            reader.readAsDataURL(cpdFile4.value);
          } else if (/\.(pdf)$/i.test(cpdFile4.value.name)) {
            isImage4.value = false;
            isPdf4.value = true;
            reader.readAsDataURL(cpdFile4.value);
          }
        }
      } else {
        cpdFile4.value = "";
        isImage4.value = true;
      }
    };

    const reset5 = () => {
      showUpload5.value = true;
      showPreview5.value = false;
      cpdFile5.value = "";
      filePreview5.value = "";
      isImage5.value = true;
      isPdf5.value = false;
    };
    const handleFileUpload5 = () => {
      cpdFile5.value = cpdFileP5.value.files[0];
      let reader = new FileReader();
      isImage5.value = true;
      let fileS = cpdFile5.value.size;
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
        if (cpdFile5.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile5.value.name)) {
            isImage5.value = true;
            reader.readAsDataURL(cpdFile5.value);
          } else if (/\.(pdf)$/i.test(cpdFile5.value.name)) {
            isImage5.value = false;
            isPdf5.value = true;
            reader.readAsDataURL(cpdFile5.value);
          }
        }
      } else {
        cpdFile5.value = "";
        isImage5.value = true;
      }
    };

    buttons = store.getters["renewal/getButtons"];
    documentSpecs = store.getters["renewal/getDocumentSpec"];
    licenseInfo = store.getters["renewal/getLicense"];

    passport = store.getters["renewal/getPassport"];
    healthExamCert = store.getters["renewal/getRenewalHealthExamCert"];
    coc = store.getters["renewal/getRenewalCpd"];
    degree = store.getters["renewal/getDegree"];
    diploma = store.getters["renewal/getDiploma"];
    educationDoc = store.getters["renewal/getEducationalDocuments"];
    payroll = store.getters["renewal/getPayroll"];
    supportLetter = store.getters["renewal/getSupportLetter"];
    transcript = store.getters["renewal/getTranscript"];
    workExperience = store.getters["renewal/getRenewalWorkExperience"];
    workExperience2 = store.getters["renewal/getRenewalWorkExperience2"];
    previousLicense = store.getters["renewal/getPreviousLicense"];
    cpd = store.getters["renewal/getRenewalCpd"];
    letterFromHiringManager = store.getters["renewal/getRenewalLicense"];
    masters = store.getters["renewal/getMasters"];
    mastersTranscript = store.getters["renewal/getMastersTranscript"];
    phd = store.getters["renewal/getPhd"];
    phdTranscript = store.getters["renewal/getPhdTranscript"];
    remark = store.getters["renewal/getRemark"];

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("renewal/setRenewalCpd", cpdFile);
      store.dispatch("renewal/setRenewalCpd2", cpdFile2);
      store.dispatch("renewal/setRenewalCpd3", cpdFile3);
      store.dispatch("renewal/setRenewalCpd4", cpdFile4);
      store.dispatch("renewal/setRenewalCpd5", cpdFile5);
    };
    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("renewal/setRenewalCpd", cpdFile);
      store.dispatch("renewal/setRenewalCpd2", cpdFile2);
      store.dispatch("renewal/setRenewalCpd3", cpdFile3);
      store.dispatch("renewal/setRenewalCpd4", cpdFile4);
      store.dispatch("renewal/setRenewalCpd5", cpdFile5);
    };

    onMounted(() => {
      cpdBack = store.getters["renewal/getRenewalCpd"];
      cpdBack2 = store.getters["renewal/getRenewalCpd2"];
      cpdBack3 = store.getters["renewal/getRenewalCpd3"];
      cpdBack4 = store.getters["renewal/getRenewalCpd4"];
      cpdBack5 = store.getters["renewal/getRenewalCpd5"];

      documentMessage.value = MESSAGE.DOC_MESSAGE;
      maxFileSize.value = MAX_FILE_SIZE.MAX_FILE_SIZE;
      maxSizeMB.value = MAX_SIZE_MB.MAX_SIZE_MB;
      if (
        cpdBack &&
        cpdBack !== undefined &&
        cpdBack !== null &&
        cpdBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        cpdFile.value = cpdBack;
        let reader = new FileReader();
        let fileS = cpdFile.value.size;
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
        if (cpdFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(cpdFile.value);
          } else if (/\.(pdf)$/i.test(cpdFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(cpdFile.value);
          }
        }
      }

      if (
        cpdBack2 &&
        cpdBack2 !== undefined &&
        cpdBack2 !== null &&
        cpdBack2 !== ""
      ) {
        docCount.value++;
        showUpload2.value = false;
        cpdFile2.value = cpdBack2;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview2.value = true;
            filePreview2.value = reader.result;
          },
          false
        );
        if (cpdFile2.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile2.value.name)) {
            isImage2.value = true;
            reader.readAsDataURL(cpdFile2.value);
          } else if (/\.(pdf)$/i.test(cpdFile2.value.name)) {
            isImage2.value = false;
            isPdf2.value = true;
            reader.readAsDataURL(cpdFile2.value);
          }
        }
      }

      if (
        cpdBack3 &&
        cpdBack3 !== undefined &&
        cpdBack3 !== null &&
        cpdBack3 !== ""
      ) {
        docCount.value++;
        showUpload3.value = false;
        cpdFile3.value = cpdBack3;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview3.value = true;
            filePreview3.value = reader.result;
          },
          false
        );
        if (cpdFile3.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile3.value.name)) {
            isImage3.value = true;
            reader.readAsDataURL(cpdFile3.value);
          } else if (/\.(pdf)$/i.test(cpdFile3.value.name)) {
            isImage3.value = false;
            isPdf3.value = true;
            reader.readAsDataURL(cpdFile3.value);
          }
        }
      }

      if (
        cpdBack4 &&
        cpdBack4 !== undefined &&
        cpdBack4 !== null &&
        cpdBack4 !== ""
      ) {
        docCount.value++;
        showUpload4.value = false;
        cpdFile4.value = cpdBack4;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview4.value = true;
            filePreview4.value = reader.result;
          },
          false
        );
        if (cpdFile4.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile4.value.name)) {
            isImage4.value = true;
            reader.readAsDataURL(cpdFile4.value);
          } else if (/\.(pdf)$/i.test(cpdFile4.value.name)) {
            isImage4.value = false;
            isPdf4.value = true;
            reader.readAsDataURL(cpdFile4.value);
          }
        }
      }

      if (
        cpdBack5 &&
        cpdBack5 !== undefined &&
        cpdBack5 !== null &&
        cpdBack5 !== ""
      ) {
        docCount.value += 2;
        showUpload5.value = false;
        cpdFile5.value = cpdBack5;
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            showPreview5.value = true;
            filePreview5.value = reader.result;
          },
          false
        );
        if (cpdFile5.value) {
          if (/\.(jpe?g|png|gif)$/i.test(cpdFile5.value.name)) {
            isImage5.value = true;
            reader.readAsDataURL(cpdFile5.value);
          } else if (/\.(pdf)$/i.test(cpdFile5.value.name)) {
            isImage5.value = false;
            isPdf5.value = true;
            reader.readAsDataURL(cpdFile5.value);
          }
        }
      }
      declinedFields = store.getters["renewal/getDeclinedFields"];
      acceptedFields = store.getters["renewal/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("CPD")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("CPD")) {
        acceptedFieldsCheck.value = true;
      }
      buttons = store.getters["renewal/getButtons"];
      draftData = store.getters["renewal/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "CPD") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }
            cpdFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "CPD1") {
            docCount.value++;
            showUpload2.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf2.value = true;
            } else {
              isImage2.value = true;
            }
            cpdFile2.value = draftData.documents[i];
            showPreview2.value = true;
            filePreview2.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "CPD2") {
            docCount.value++;
            showUpload3.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf3.value = true;
            } else {
              isImage3.value = true;
            }
            cpdFile3.value = draftData.documents[i];
            showPreview3.value = true;
            filePreview3.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "CPD3") {
            docCount.value++;
            showUpload4.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf4.value = true;
            } else {
              isImage4.value = true;
            }
            cpdFile4.value = draftData.documents[i];
            showPreview4.value = true;
            filePreview4.value = googleApi + draftData.documents[i].filePath;
          }
          if (draftData.documents[i].documentTypeCode == "CPD4") {
            docCount.value++;
            showUpload5.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf5.value = true;
            } else {
              isImage5.value = true;
            }
            cpdFile5.value = draftData.documents[i];
            showPreview5.value = true;
            filePreview5.value = googleApi + draftData.documents[i].filePath;
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
                documentSpecs[4].documentType.code,
                cpdFile.value
              );
              formData.append(
                documentSpecs[31].documentType.code,
                cpdFile2.value
              );
              formData.append(
                documentSpecs[32].documentType.code,
                cpdFile3.value
              );
              formData.append(
                documentSpecs[33].documentType.code,
                cpdFile4.value
              );
              formData.append(
                documentSpecs[34].documentType.code,
                cpdFile5.value
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
            formData.append(documentSpecs[2].documentType.code, healthExamCert);
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
            formData.append(documentSpecs[17].documentType.code, supportLetter);
            formData.append(documentSpecs[26].documentType.code, transcript);
            formData.append(documentSpecs[5].documentType.code, workExperience);
            formData.append(
              documentSpecs[35].documentType.code,
              workExperience2
            );
            formData.append(
              documentSpecs[6].documentType.code,
              previousLicense
            );
            formData.append(documentSpecs[4].documentType.code, cpdFile.value);
            formData.append(
              documentSpecs[31].documentType.code,
              cpdFile2.value
            );
            formData.append(
              documentSpecs[32].documentType.code,
              cpdFile3.value
            );
            formData.append(
              documentSpecs[33].documentType.code,
              cpdFile4.value
            );
            formData.append(
              documentSpecs[34].documentType.code,
              cpdFile5.value
            );
            formData.append(
              documentSpecs[19].documentType.code,
              letterFromHiringManager
            );
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
                documentSpecs[4].documentType.code,
                cpdFile.value
              );
              formData.append(
                documentSpecs[31].documentType.code,
                cpdFile2.value
              );
              formData.append(
                documentSpecs[32].documentType.code,
                cpdFile3.value
              );
              formData.append(
                documentSpecs[33].documentType.code,
                cpdFile4.value
              );
              formData.append(
                documentSpecs[34].documentType.code,
                cpdFile5.value
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
            formData.append(documentSpecs[4].documentType.code, cpdFile.value);
            formData.append(
              documentSpecs[31].documentType.code,
              cpdFile2.value
            );
            formData.append(
              documentSpecs[32].documentType.code,
              cpdFile3.value
            );
            formData.append(
              documentSpecs[33].documentType.code,
              cpdFile4.value
            );
            formData.append(
              documentSpecs[34].documentType.code,
              cpdFile5.value
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
          message.value.showLoading = !message.value.showLoading;
          message.value.showFlash = !message.value.showFlash;
          setTimeout(() => {
            router.push({ path: "/menu" });
          }, 1500);
        } else {
          message.value.showErrorFlash = !message.value.showErrorFlash;
        }
      });
    };

    return {
      cpdFile,
      cpdFileP,
      cpdBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,

      cpdFile2,
      cpdFileP2,
      showPreview2,
      filePreview2,
      showUpload2,
      isImage2,
      isPdf2,

      cpdFile3,
      cpdFileP3,
      showPreview3,
      filePreview3,
      showUpload3,
      isImage3,
      isPdf3,

      cpdFile4,
      cpdFileP4,
      showPreview4,
      filePreview4,
      showUpload4,
      isImage4,
      isPdf4,

      cpdFile5,
      cpdFileP5,
      showPreview5,
      filePreview5,
      showUpload5,
      isImage5,
      isPdf5,

      cpdBack,
      cpdBack2,
      cpdBack3,
      cpdBack4,
      cpdBack5,

      handleFileUpload,
      handleFileUpload2,
      handleFileUpload3,
      handleFileUpload4,
      handleFileUpload5,

      reset,
      reset2,
      reset3,
      reset4,
      reset5,

      submit,
      submitBack,
      draft,
      fileSize,
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
      coc,
      degree,
      diploma,
      educationDoc,
      payroll,
      supportLetter,
      transcript,
      workExperience,
      previousLicense,
      cpd,
      letterFromHiringManager,
      masters,
      mastersTranscript,
      phd,
      phdTranscript,

      documentMessage,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,

      docCount,
      addDocs,
      removeDocs,
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
