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
        <TitleWithIllustration
          illustration="Institution"
          message="Educational Documents"
          class="mt-8"
        />
        <span class="flex justify-center">{{ this.documentMessage }}</span>
        <h3
          class="flex justify-center"
          style="color: red"
          v-if="this.fileSizeExceed"
        >
          File size must be less than {{ this.maxSizeMB }} MB
        </h3>
        <div class="flex flex-row justify-center px-8 py-4">
          <div>
            <h2
              class="flex justify-center"
              v-if="this.declinedFieldsCheck1"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h6
              style="font-weight: bold;"
              class="flex justify-center ml-4 mr-4"
              v-if="this.declinedFieldsCheck"
            >
              Remark:
              <span class="ml-2" style="color: #e63636"> {{ this.remark }}</span>
            </h6>
            <h2
              class="flex justify-center"
              v-if="this.acceptedFieldsCheck1"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.certificateFile1.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.certificate1Size }}</h2>
              </span>
              <span v-if="showCertificate1Upload">
                <label class="text-primary-700 text-lg"
                  >Upload 8th Grade Certificate:
                  <span style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="certificateFile1"
                      ref="certificateFile1"
                      v-on:change="handleCertificate1Upload()"
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

              <picture v-if="!showCertificate1Upload && isCertificate1">
                <p>
                  <a href="javascript:void(0)" @click="resetCert1()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="certificate1Preview"
                  v-show="showCertificate1Preview"
                />
              </picture>
              <div v-if="!showCertificate1Upload && isPdf1">
                <p>
                  <a href="javascript:void(0)" @click="resetCert1()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="certificate1Preview"
                  v-show="showCertificate1Preview"
                />
              </div>

              <span
                v-if="!showCertificate1Upload && !isCertificate1 && !isPdf1"
              >
                <img :src="certificate1Preview" alt="" class="preview" />
              </span>
            </div>
          </div>
          <div>
            <h2
              class="flex justify-center"
              v-if="this.declinedFieldsCheck2"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex justify-center"
              v-if="this.acceptedFieldsCheck2"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.certificateFile2.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.certificate2Size }}</h2>
              </span>
              <span v-if="showCertificate2Upload">
                <label class="text-primary-700 text-lg"
                  >Upload 10th Grade Certificate:
                  <span style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="certificateFile2"
                      ref="certificateFile2"
                      v-on:change="handleCertificate2Upload()"
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

              <picture v-if="!showCertificate2Upload && isCertificate2">
                <p>
                  <a href="javascript:void(0)" @click="resetCert2()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="certificate2Preview"
                  v-show="showCertificate2Preview"
                />
              </picture>
              <div v-if="!showCertificate2Upload && isPdf2">
                <p>
                  <a href="javascript:void(0)" @click="resetCert2()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="certificate2Preview"
                  v-show="showCertificate2Preview"
                />
              </div>

              <span
                v-if="!showCertificate2Upload && !isCertificate2 && !isPdf2"
              >
                <img :src="certificate2Preview" alt="" class="preview" />
              </span>
            </div>
          </div>
          <div>
            <h2
              class="flex justify-center"
              v-if="this.declinedFieldsCheck3"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex justify-center"
              v-if="this.acceptedFieldsCheck3"
              style="color: Green"
            >
              ACCEPTED
            </h2>

            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.certificateFile3.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.certificate3Size }}</h2>
              </span>
              <span v-if="showCertificate3Upload">
                <label class="text-primary-700 text-lg"
                  >Upload 12th Grade Certificate:<span
                    v-if="this.eduLevel !== 'diploma'"
                    style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="certificateFile3"
                      ref="certificateFile3"
                      v-on:change="handleCertificate3Upload()"
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

              <picture v-if="!showCertificate3Upload && isCertificate3">
                <p>
                  <a href="javascript:void(0)" @click="resetCert3()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="certificate3Preview"
                  v-show="showCertificate3Preview"
                />
              </picture>
              <div v-if="!showCertificate3Upload && isPdf3">
                <p>
                  <a href="javascript:void(0)" @click="resetCert3()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="certificate3Preview"
                  v-show="showCertificate3Preview"
                />
              </div>

              <span
                v-if="!showCertificate3Upload && !isCertificate3 && !isPdf3"
              >
                <img :src="certificate3Preview" alt="" class="preview" />
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-center px-8 py-4">
          <div>
            <h2
              class="flex justify-center"
              v-if="this.declinedFieldsCheck4"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex justify-center"
              v-if="this.acceptedFieldsCheck4"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.certificateFile4.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.certificate4Size }}</h2>
              </span>
              <span v-if="showCertificate4Upload">
                <label class="text-primary-700 text-lg"
                  >Upload Transcript 9-10:
                  <span style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="certificateFile4"
                      ref="certificateFile4"
                      v-on:change="handleCertificate4Upload()"
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

              <picture v-if="!showCertificate4Upload && isCertificate4">
                <p>
                  <a href="javascript:void(0)" @click="resetCert4()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="certificate4Preview"
                  v-show="showCertificate4Preview"
                />
              </picture>
              <div v-if="!showCertificate4Upload && isPdf4">
                <p>
                  <a href="javascript:void(0)" @click="resetCert4()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="certificate4Preview"
                  v-show="showCertificate4Preview"
                />
              </div>

              <span
                v-if="!showCertificate4Upload && !isCertificate4 && !isPdf4"
              >
                <img :src="certificate4Preview" alt="" class="preview" />
              </span>
            </div>
          </div>
          <div>
            <h2
              class="flex justify-center"
              v-if="this.declinedFieldsCheck5"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex justify-center"
              v-if="this.acceptedFieldsCheck5"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.certificateFile5.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.certificate5Size }}</h2>
              </span>
              <span v-if="showCertificate5Upload">
                <label class="text-primary-700 text-lg"
                  >Upload Transcript 11-12:<span
                    v-if="this.eduLevel !== 'diploma'"
                    style="color: red; font-weight: bold; font-size:16px"
                    >Required</span
                  >
                  <div class="dropbox">
                    <input
                      type="file"
                      id="certificateFile5"
                      ref="certificateFile5"
                      v-on:change="handleCertificate5Upload()"
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

              <picture v-if="!showCertificate5Upload && isCertificate5">
                <p>
                  <a href="javascript:void(0)" @click="resetCert5()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="certificate5Preview"
                  v-show="showCertificate5Preview"
                />
              </picture>
              <div v-if="!showCertificate5Upload && isPdf5">
                <p>
                  <a href="javascript:void(0)" @click="resetCert5()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="certificate5Preview"
                  v-show="showCertificate5Preview"
                />
              </div>
              <span
                v-if="!showCertificate5Upload && !isCertificate5 && !isPdf5"
              >
                <img :src="certificate5Preview" alt="" class="preview" />
              </span>
            </div>
          </div>
        </div>
        <div v-if="!showLoading">
          <div v-if="this.draftStatus == 'DRA' || !this.draftStatus">
            <div class="flex justify-center mt-4 mb-8">
              <button @click="submitBack">
                Back
              </button>
              <button @click="submit">Next</button>
              <button
                v-if="this.buttons.length < 3"
                @click="draft(this.buttons[1].action)"
                variant="outline"
              >
                {{ this.buttons[1].name }}
              </button>
              <button
                v-if="this.buttons.length > 2"
                @click="draft(this.buttons[2].action)"
                variant="outline"
              >
                {{ this.buttons[2].name }}
              </button>

              <button
                v-if="this.buttons.length > 2"
                class="withdraw"
                @click="withdraw(this.buttons[1].action)"
                variant="outline"
              >
                {{ this.buttons[1].name }}
              </button>
            </div>
          </div>
          <div
            v-if="this.draftStatus == 'SUB'"
            class="flex justify-center mt-8 pb-12"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button
              class="withdraw"
              @click="withdraw(this.buttons[1].action)"
              variant="outline"
            >
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="this.draftStatus == 'USUP'"
            class="flex justify-center mt-8 pb-12"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <button @click="draft(this.buttons[0].action)" variant="outline">
              {{ this.buttons[0]["name"] }}
            </button>
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="this.draftStatus == 'DEC' || this.draftStatus == 'CONF'"
            class="flex justify-center mt-8 pb-12"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">Next</button>
            <!-- <button @click="draft(this.buttons[0].action)" variant="outline">
            {{ this.buttons[0]["name"] }}
          </button> -->
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
        </div>
        <div v-if="showLoading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  <div class="mr-3xl" v-if="showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>

<script>
import TitleWithIllustration from "@/sharedComponents/TitleWithIllustration";
import { mapGetters, mapActions } from "vuex";
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
  data() {
    return {
      basePath: googleApi,

      dataChanged: false,
      showFlash: false,
      showErrorFlash: false,
      certificateFile1: "",
      showCertificate1Preview: false,
      certificate1Preview: "",
      showCertificate1Upload: true,
      isCertificate1: true,
      isPdf1: false,

      certificateFile2: "",
      showCertificate2Preview: false,
      certificate2Preview: "",
      showCertificate2Upload: true,
      isCertificate2: true,
      isPdf2: false,

      certificateFile3: "",
      showCertificate3Preview: false,
      certificate3Preview: "",
      showCertificate3Upload: true,
      isCertificate3: true,
      isPdf3: false,

      certificateFile4: "",
      showCertificate4Preview: false,
      certificate4Preview: "",
      showCertificate4Upload: true,
      isCertificate4: true,
      isPdf4: false,

      certificateFile5: "",
      showCertificate5Preview: false,
      certificate5Preview: "",
      showCertificate5Upload: true,
      isCertificate5: true,
      isPdf5: false,

      declinedFields: [],
      acceptedFields: [],
      remark: "",

      declinedFieldsCheck1: false,
      acceptedFieldsCheck1: false,

      declinedFieldsCheck2: false,
      acceptedFieldsCheck2: false,

      declinedFieldsCheck3: false,
      acceptedFieldsCheck3: false,

      declinedFieldsCheck4: false,
      acceptedFieldsCheck4: false,

      declinedFieldsCheck5: false,
      acceptedFieldsCheck5: false,

      buttons: [],
      documentSpec: [],
      licenseInfo: "",
      userId: +localStorage.getItem("userId"),

      passport: "",
      healthExamCert: "",
      coc: "",
      degree: "",
      diploma: "",
      payroll: "",
      supportLetter: "",
      transcript: "",
      workExperience: "",
      workExperience2: "",
      previousLicense: "",
      cpd: "",
      cpd2: "",
      cpd3: "",
      cpd4: "",
      cpd5: "",
      letterFromHiringOrganization: "",
      masters: "",
      mastersTranscript: "",
      phd: "",
      phdTranscript: "",

      documentMessage: "",
      maxFileSize: "",
      maxSizeMB: "",
      fileSizeExceed: "",

      draftId: "",
      draftData: "",
      draftStatus: "",

      showFlash: false,
      showErrorFlash: false,
      showLoading: false,

      certificate1Size: "",
      certificate2Size: "",
      certificate3Size: "",
      certificate4Size: "",
      certificate5Size: "",

      eduLevel: "",
    };
  },
  computed: {
    ...mapGetters({
      getPersonalDoc: "renewal/getProfessionalDocuments",
      getButtons: "renewal/getButtons",
      getLicense: "renewal/getLicense",
      getDocumentSpec: "renewal/getDocumentSpec",

      getPassport: "renewal/getPassport",
      getHealthExamCert: "renewal/getRenewalHealthExamCert",
      getCoc: "renewal/getCoc",
      getDegree: "renewal/getDegree",
      getDiploma: "renewal/getDiploma",
      getPayroll: "renewal/getPayroll",
      getSupportLetter: "renewal/getSupportLetter",
      getTranscript: "renewal/getTranscript",
      getWorkExperience: "renewal/getRenewalWorkExperience",
      getWorkExperience2: "renewal/getRenewalWorkExperience2",
      getPreviousLicense: "renewal/getPreviousLicense",
      getCpd: "renewal/getRenewalCpd",
      getCpd2: "renewal/getRenewalCpd2",
      getCpd3: "renewal/getRenewalCpd3",
      getCpd4: "renewal/getRenewalCpd4",
      getCpd5: "renewal/getRenewalCpd5",
      getLetterFromHiringInstitution: "renewal/getRenewalLicense",
      getMasters: "renewal/getMasters",
      getMastersTranscript: "renewal/getMastersTranscript",
      getPhd: "renewal/getPhd",
      getPhdTranscript: "renewal/getPhdTranscript",

      getDraftData: "renewal/getDraft",
    }),
  },
  created() {
    this.documentMessage = MESSAGE.DOC_MESSAGE;
    this.maxFileSize = MAX_FILE_SIZE.MAX_FILE_SIZE;
    this.maxSizeMB = MAX_SIZE_MB.MAX_SIZE_MB;
    this.eduLevel = localStorage.getItem("educationalLevel");
    let eduEighth = this.$store.getters["renewal/getEduEighth"];
    let eduTenth = this.$store.getters["renewal/getEduTenth"];
    let eduTwelveth = this.$store.getters["renewal/getEduTwelveth"];
    let transcript1 = this.$store.getters["renewal/getEduTranscript1"];
    let transcript2 = this.$store.getters["renewal/getEduTranscript2"];
    if (
      eduEighth &&
      eduEighth !== undefined &&
      eduEighth !== null &&
      eduEighth !== ""
    ) {
      this.showCertificate1Upload = false;
      this.certificateFile1 = eduEighth;
      let reader = new FileReader();
      let fileS = this.certificateFile1.size;
      if (fileS > 0 && fileS < 1000) {
        this.certificate1Size = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.certificate1Size = fileS / 1000 + "kB";
      } else {
        this.certificate1Size = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showCertificate1Preview = true;
          this.certificate1Preview = reader.result;
        }.bind(this),
        false
      );

      if (this.certificateFile1) {
        if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile1.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.certificateFile1);
        } else if (/\.(pdf)$/i.test(this.certificateFile1.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.certificateFile1);
        }
      }
    }
    if (
      eduTenth &&
      eduTenth !== undefined &&
      eduTenth !== null &&
      eduTenth !== ""
    ) {
      this.showCertificate2Upload = false;
      this.certificateFile2 = eduTenth;
      let reader = new FileReader();
      let fileS = this.certificateFile2.size;
      if (fileS > 0 && fileS < 1000) {
        this.certificate2Size = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.certificate2Size = fileS / 1000 + "kB";
      } else {
        this.certificate2Size = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showCertificate2Preview = true;
          this.certificate2Preview = reader.result;
        }.bind(this),
        false
      );

      if (this.certificateFile2) {
        if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile2.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.certificateFile2);
        } else if (/\.(pdf)$/i.test(this.certificateFile2.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.certificateFile2);
        }
      }
    }
    if (
      eduTwelveth &&
      eduTwelveth !== undefined &&
      eduTwelveth !== null &&
      eduTwelveth !== ""
    ) {
      this.showCertificate3Upload = false;
      this.certificateFile3 = eduTwelveth;
      let reader = new FileReader();
      let fileS = this.certificateFile3.size;
      if (fileS > 0 && fileS < 1000) {
        this.certificate3Size = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.certificate3Size = fileS / 1000 + "kB";
      } else {
        this.certificate3Size = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showCertificate3Preview = true;
          this.certificate3Preview = reader.result;
        }.bind(this),
        false
      );

      if (this.certificateFile3) {
        if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile3.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.certificateFile3);
        } else if (/\.(pdf)$/i.test(this.certificateFile3.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.certificateFile3);
        }
      }
    }
    if (
      transcript1 &&
      transcript1 !== undefined &&
      transcript1 !== null &&
      transcript1 !== ""
    ) {
      this.showCertificate4Upload = false;
      this.certificateFile4 = transcript1;
      let reader = new FileReader();
      let fileS = this.certificateFile4.size;
      if (fileS > 0 && fileS < 1000) {
        this.certificate4Size = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.certificate4Size = fileS / 1000 + "kB";
      } else {
        this.certificate4Size = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showCertificate4Preview = true;
          this.certificate4Preview = reader.result;
        }.bind(this),
        false
      );

      if (this.certificateFile4) {
        if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile4.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.certificateFile4);
        } else if (/\.(pdf)$/i.test(this.certificateFile4.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.certificateFile4);
        }
      }
    }
    if (
      transcript2 &&
      transcript2 !== undefined &&
      transcript2 !== null &&
      transcript2 !== ""
    ) {
      this.showCertificate5Upload = false;
      this.certificateFile5 = transcript2;
      let reader = new FileReader();
      let fileS = this.certificateFile5.size;
      if (fileS > 0 && fileS < 1000) {
        this.certificate5Size = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.certificate5Size = fileS / 1000 + "kB";
      } else {
        this.certificate5Size = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showCertificate5Preview = true;
          this.certificate5Preview = reader.result;
        }.bind(this),
        false
      );

      if (this.certificateFile5) {
        if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile5.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.certificateFile5);
        } else if (/\.(pdf)$/i.test(this.certificateFile5.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.certificateFile5);
        }
      }
    }

    this.draftId = this.$route.params.id;
    this.draftStatus = this.$route.params.status;
    this.declinedFields = this.getDeclinedFields;
    this.remark = this.getRemarK;
    this.acceptedFields = this.acceptedFields;
    if (this.declinedFields != null && this.declinedFields.includes("EDEGC")) {
      this.declinedFieldsCheck1 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("EDEGC")) {
      this.acceptedFieldsCheck1 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("EDTGC")) {
      this.declinedFieldsCheck2 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("EDTGC")) {
      this.acceptedFieldsCheck2 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("EDTWGC")) {
      this.declinedFieldsCheck3 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("EDTWGC")) {
      this.acceptedFieldsCheck3 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("EDHT")) {
      this.declinedFieldsCheck4 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("EDHT")) {
      this.acceptedFieldsCheck4 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("EDPT")) {
      this.declinedFieldsCheck5 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("EDPT")) {
      this.acceptedFieldsCheck5 = true;
    }
    if (this.draftId != undefined) {
      this.draftData = this.getDraftData;
      for (let i = 0; i < this.draftData.documents.length; i++) {
        if (this.draftData.documents[i].documentTypeCode == "EDEGC") {
          this.showCertificate1Upload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf1 = true;
          } else {
            this.isCertificate1 = true;
          }

          this.certificateFile1 = this.draftData.documents[i];
          this.showCertificate1Preview = true;
          this.certificate1Preview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "EDTGC") {
          this.showCertificate2Upload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf2 = true;
          } else {
            this.isCertificate2 = true;
          }

          this.certificateFile2 = this.draftData.documents[i];
          this.showCertificate2Preview = true;
          this.certificate2Preview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "EDTWGC") {
          this.showCertificate3Upload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf3 = true;
          } else {
            this.isCertificate3 = true;
          }

          this.certificateFile3 = this.draftData.documents[i];
          this.showCertificate3Preview = true;
          this.certificate3Preview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "EDHT") {
          this.showCertificate4Upload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf4 = true;
          } else {
            this.isCertificate4 = true;
          }

          this.certificateFile4 = this.draftData.documents[i];
          this.showCertificate4Preview = true;
          this.certificate4Preview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "EDPT") {
          this.showCertificate5Upload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf5 = true;
          } else {
            this.isCertificate5 = true;
          }

          this.certificateFile5 = this.draftData.documents[i];
          this.showCertificate5Preview = true;
          this.certificate5Preview =
            this.basePath + this.draftData.documents[i].filePath;
        }
      }
    }
    this.license = this.getLicense;
    this.buttons = this.getButtons;
    this.documentSpec = this.getDocumentSpec;

    this.passport = this.getPassport;
    this.healthExamCert = this.getHealthExamCert;
    this.coc = this.getCoc;
    this.degree = this.getDegree;
    this.diploma = this.getDiploma;
    this.payroll = this.getPayroll;
    this.supportLetter = this.getSupportLetter;
    this.transcript = this.getTranscript;
    this.workExperience = this.getWorkExperience;
    this.workExperience2 = this.getWorkExperience2;
    this.previousLicense = this.getPreviousLicense;
    this.cpd = this.getCpd;
    this.cpd2 = this.getCpd2;
    this.cpd3 = this.getCpd3;
    this.cpd4 = this.getCpd4;
    this.cpd5 = this.getCpd5;
    this.letterFromHiringOrganization = this.getLetterFromHiringInstitution;
    this.masters = this.getMasters;
    this.mastersTranscript = this.getMastersTranscript;
    this.phd = this.getPhd;
    this.phdTranscript = this.getPhdTranscript;
  },
  methods: {
    ...mapActions(["setProfessionalDoc"]),
    resetCert1() {
      this.showCertificate1Upload = true;
      this.showCertificate1Preview = false;
      this.certificateFile1 = "";
      this.certificate1Preview = "";
      this.isCertificate1 = true;
      this.isPdf1 = false;
      this.certificate1Size = "";
    },
    resetCert2() {
      this.showCertificate2Upload = true;
      this.showCertificate2Preview = false;
      this.certificateFile2 = "";
      this.certificate2Preview = "";
      this.isCertificate2 = true;
      this.isPdf2 = false;
      this.certificate2Size = "";
    },
    resetCert3() {
      this.showCertificate3Upload = true;
      this.showCertificate3Preview = false;
      this.certificateFile3 = "";
      this.certificate3Preview = "";
      this.isCertificate3 = true;
      this.isPdf3 = false;
      this.certificate3Size = "";
    },
    resetCert4() {
      this.showCertificate4Upload = true;
      this.showCertificate4Preview = false;
      this.certificateFile4 = "";
      this.certificate4Preview = "";
      this.isCertificate4 = true;
      this.isPdf4 = false;
      this.certificate4Size = "";
    },
    resetCert5() {
      this.showCertificate5Upload = true;
      this.showCertificate5Preview = false;
      this.certificateFile5 = "";
      this.certificate5Preview = "";
      this.isCertificate5 = true;
      this.isPdf5 = false;
      this.certificate5Size = "";
    },
    handleCertificate1Upload() {
      this.certificateFile1 = this.$refs.certificateFile1.files[0];
      let reader = new FileReader();
      let fileS = this.certificateFile1.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showCertificate1Upload = false;
        if (fileS > 0 && fileS < 1000) {
          this.certificate1Size = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.certificate1Size = fileS / 1000 + "kB";
        } else {
          this.certificate1Size = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showCertificate1Preview = true;
            this.certificate1Preview = reader.result;
          }.bind(this),
          false
        );
        if (this.certificateFile1) {
          if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile1.name)) {
            this.isCertificate1 = true;
            reader.readAsDataURL(this.certificateFile1);
          } else if (/\.(pdf)$/i.test(this.certificateFile1.name)) {
            this.isCertificate1 = false;
            this.isPdf1 = true;
            reader.readAsDataURL(this.certificateFile1);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.certificateFile1 = "";
        this.showCertificate1Upload = true;
        this.isCertificate1 = false;
      }
    },

    handleCertificate2Upload() {
      this.certificateFile2 = this.$refs.certificateFile2.files[0];
      let reader = new FileReader();
      let fileS = this.certificateFile2.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showCertificate2Upload = false;
        if (fileS > 0 && fileS < 1000) {
          this.certificate2Size = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.certificate2Size = fileS / 1000 + "kB";
        } else {
          this.certificate2Size = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showCertificate2Preview = true;
            this.certificate2Preview = reader.result;
          }.bind(this),
          false
        );
        if (this.certificateFile2) {
          if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile2.name)) {
            this.isCertificate2 = true;
            reader.readAsDataURL(this.certificateFile2);
          } else if (/\.(pdf)$/i.test(this.certificateFile2.name)) {
            this.isCertificate2 = false;
            this.isPdf2 = true;
            reader.readAsDataURL(this.certificateFile2);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.certificateFile2 = "";
        this.showCertificate2Upload = true;
        this.isCertificate2 = false;
      }
    },

    handleCertificate3Upload() {
      this.certificateFile3 = this.$refs.certificateFile3.files[0];
      let reader = new FileReader();
      let fileS = this.certificateFile3.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showCertificate3Upload = false;
        if (fileS > 0 && fileS < 1000) {
          this.certificate3Size = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.certificate3Size = fileS / 1000 + "kB";
        } else {
          this.certificate3Size = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showCertificate3Preview = true;
            this.certificate3Preview = reader.result;
          }.bind(this),
          false
        );
        if (this.certificateFile3) {
          if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile3.name)) {
            this.isCertificate3 = true;
            reader.readAsDataURL(this.certificateFile3);
          } else if (/\.(pdf)$/i.test(this.certificateFile3.name)) {
            this.isCertificate3 = false;
            this.isPdf3 = true;
            reader.readAsDataURL(this.certificateFile3);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.certificateFile3 = "";
        this.showCertificate3Upload = true;
        this.isCertificate3 = false;
      }
    },

    handleCertificate4Upload() {
      this.certificateFile4 = this.$refs.certificateFile4.files[0];
      let reader = new FileReader();
      let fileS = this.certificateFile4.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showCertificate4Upload = false;
        if (fileS > 0 && fileS < 1000) {
          this.certificate4Size = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.certificate4Size = fileS / 1000 + "kB";
        } else {
          this.certificate4Size = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showCertificate4Preview = true;
            this.certificate4Preview = reader.result;
          }.bind(this),
          false
        );
        if (this.certificateFile4) {
          if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile4.name)) {
            this.isCertificate4 = true;
            reader.readAsDataURL(this.certificateFile4);
          } else if (/\.(pdf)$/i.test(this.certificateFile4.name)) {
            this.isCertificate4 = false;
            this.isPdf4 = true;
            reader.readAsDataURL(this.certificateFile4);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.certificateFile4 = "";
        this.showCertificate4Upload = true;
        this.isCertificate4 = false;
      }
    },
    handleCertificate5Upload() {
      this.certificateFile5 = this.$refs.certificateFile5.files[0];
      let reader = new FileReader();
      let fileS = this.certificateFile5.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showCertificate5Upload = false;
        if (fileS > 0 && fileS < 1000) {
          this.certificate5Size = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.certificate5Size = fileS / 1000 + "kB";
        } else {
          this.certificate5Size = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showCertificate5Preview = true;
            this.certificate5Preview = reader.result;
          }.bind(this),
          false
        );
        if (this.certificateFile5) {
          if (/\.(jpe?g|png|gif)$/i.test(this.certificateFile5.name)) {
            this.isCertificate5 = true;
            reader.readAsDataURL(this.certificateFile5);
          } else if (/\.(pdf)$/i.test(this.certificateFile5.name)) {
            this.isCertificate5 = false;
            this.isPdf5 = true;
            reader.readAsDataURL(this.certificateFile5);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.certificateFile5 = "";
        this.showCertificate5Upload = true;
        this.isCertificate5 = false;
      }
    },
    submit() {
      this.$emit("changeActiveState");
      this.$store.dispatch("renewal/setEduEighth", this.certificateFile1);
      this.$store.dispatch("renewal/setEduTenth", this.certificateFile2);
      this.$store.dispatch("renewal/setEduTwelveth", this.certificateFile3);
      this.$store.dispatch("renewal/setEduTranscript1", this.certificateFile4);
      this.$store.dispatch("renewal/setEduTranscript2", this.certificateFile5);
      let file = [
        this.certificateFile1,
        this.certificateFile2,
        this.certificateFile3,
        this.certificateFile4,
        this.certificateFile5,
      ];
      this.$store.dispatch("renewal/setEducationalDocument", file);
    },
    submitBack() {
      this.$emit("changeActiveStateMinus");
      this.$store.dispatch("renewal/setEduEighth", this.certificateFile1);
      this.$store.dispatch("renewal/setEduTenth", this.certificateFile2);
      this.$store.dispatch("renewal/setEduTwelveth", this.certificateFile3);
      this.$store.dispatch("renewal/setEduTranscript1", this.certificateFile4);
      this.$store.dispatch("renewal/setEduTranscript2", this.certificateFile5);
      let file = [
        this.certificateFile1,
        this.certificateFile2,
        this.certificateFile3,
        this.certificateFile4,
        this.certificateFile5,
      ];
      this.$store.dispatch("renewal/setEducationalDocument", file);
    },
    draft(action) {
      this.showLoading = true;
      if (this.draftId) {
        if (
          this.certificateFile1 ||
          this.certificateFile2 ||
          this.certificateFile3 ||
          this.certificateFile4 ||
          this.certificateFile5
        ) {
        } else {
          let draftObj = {
            action: action,
            data: this.getDraftData,
          };
          let payload = {
            licenseId: this.getDraftData.id,
            draftData: draftObj,
          };
          this.$store.dispatch("renewal/updateDraft", payload).then((res) => {
            if (res.data.status == "Success") {
              this.showFlash = true;
              setTimeout(() => {
                this.$router.push({ path: "/menu" });
              }, 1500);
              this.showLoading = false;
            } else {
              this.showErrorFlash = true;
            }
          });
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: this.userId,
            applicantTypeId: this.license.applicantTypeId,
            education: {
              institutionId: this.license.education.departmentId,
              departmentId: this.license.education.institutionId,
            },
            residenceWoredaId: this.license.residenceWoredaId,
            professionalTypeIds: this.licenseInfo.professionalTypeIds,
            educationalLevelId: this.licenseInfo.educationalLevelId,
            paymentSlip: null,
            occupationTypeId: this.licenseInfo.occupationTypeId,
            nativeLanguageId: this.licenseInfo.nativeLanguageId,
            expertLevelId: this.licenseInfo.expertLevelId,
            otherEducationalInstitution: this.licenseInfo
              .otherEducationalInstitution,
            otherProfessionalType: this.licenseInfo.otherProfessionalType,
          },
        };
        this.$store
          .dispatch("renewal/addRenewalLicense", license)
          .then((res) => {
            let licenseId = res.data.data.id;
            let formData = new FormData();

            formData.append(
              this.documentSpec[0].documentType.code,
              this.passport
            );
            formData.append(
              this.documentSpec[2].documentType.code,
              this.healthExamCert
            );
            formData.append(this.documentSpec[11].documentType.code, this.coc);
            formData.append(
              this.documentSpec[24].documentType.code,
              this.degree
            );
            formData.append(
              this.documentSpec[25].documentType.code,
              this.diploma
            );
            formData.append(
              this.documentSpec[12].documentType.code,
              this.certificateFile1
            );
            formData.append(
              this.documentSpec[13].documentType.code,
              this.certificateFile2
            );
            formData.append(
              this.documentSpec[14].documentType.code,
              this.certificateFile3
            );
            formData.append(
              this.documentSpec[15].documentType.code,
              this.certificateFile4
            );
            formData.append(
              this.documentSpec[16].documentType.code,
              this.certificateFile5
            );
            formData.append(
              this.documentSpec[23].documentType.code,
              this.payroll
            );
            formData.append(
              this.documentSpec[17].documentType.code,
              this.supportLetter
            );
            formData.append(
              this.documentSpec[26].documentType.code,
              this.transcript
            );
            formData.append(
              this.documentSpec[5].documentType.code,
              this.workExperience
            );
            formData.append(
              this.documentSpec[35].documentType.code,
              this.workExperience2
            );
            formData.append(
              this.documentSpec[6].documentType.code,
              this.previousLicense
            );
            formData.append(this.documentSpec[4].documentType.code, this.cpd);
            formData.append(this.documentSpec[31].documentType.code, this.cpd2);
            formData.append(this.documentSpec[32].documentType.code, this.cpd3);
            formData.append(this.documentSpec[33].documentType.code, this.cpd4);
            formData.append(this.documentSpec[34].documentType.code, this.cpd5);
            formData.append(
              this.documentSpec[19].documentType.code,
              this.letterFromHiringOrganization
            );
            formData.append(
              this.documentSpec[27].documentType.code,
              this.masters
            );
            formData.append(
              this.documentSpec[28].documentType.code,
              this.mastersTranscript
            );
            formData.append(this.documentSpec[29].documentType.code, this.phd);
            formData.append(
              this.documentSpec[30].documentType.code,
              this.phdTranscript
            );
            let payload = { document: formData, id: licenseId };
            this.$store
              .dispatch("renewal/uploadDocuments", payload)
              .then((res) => {
                if (res) {
                  this.showFlash = true;
                  this.showLoading = false;
                  setTimeout(() => {
                    this.$router.push({ path: "/menu" });
                  }, 1500);
                } else {
                  this.showErrorFlash = true;
                }
              })
              .catch((err) => {});
          });
      }
    },
    withdraw(action) {
      this.showLoading = true;
      let withdrawObj = {
        action: action,
        data: this.getDraftData,
      };
      let payload = {
        licenseId: this.getDraftData.id,
        withdrawData: withdrawObj,
      };
      this.$store.dispatch("renewal/withdraw", payload).then((res) => {
        if (res) {
          this.showFlash = true;
          this.showLoading = false;
          setTimeout(() => {
            this.$router.push({ path: "/menu" });
          }, 1500);
        } else {
          this.showErrorFlash = true;
        }
      });
    },
  },
};
</script>
<style>
#main {
  width: auto;
}
img {
  width: 250px;
  height: 250px;
  border-radius: 0%;
}

#photoFile #diplomaFile #transcriptFile #experienceFile {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
</style>
