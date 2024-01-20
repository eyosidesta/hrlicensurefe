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
          illustration="Certificate"
          message="Professional Documents"
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
              class="flex"
              v-if="this.declinedFieldsCheck1"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex"
              v-if="this.acceptedFieldsCheck1"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">{{ this.photoFile.name }}</h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.photoFileSize }}</h2>
              </span>
              <span v-if="showUpload">
                <label class="text-primary-700 text-lg"
                  >Authenticated Professional Document Certificate:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="photoFile"
                      ref="photoFile"
                      v-on:change="handleCertificateUpload()"
                      style="margin-bottom: 15px !important;"
                      accept=".jpeg, .png, .gif, .jpg, .pdf, .tiff , .svg"
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
          <div>
            <h2
              class="flex"
              v-if="this.declinedFieldsCheck2"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex"
              v-if="this.acceptedFieldsCheck2"
              style="color: Green"
            >
              ACCEPTED
            </h2>

            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">{{ this.diplomaFile.name }}</h2>
                <h2 v-if="!this.fileSizeExceed">{{ this.diplomaFileSize }}</h2>
              </span>
              <span v-if="showDiplomaUpload">
                <label class="text-primary-700 text-lg"
                  >Authenticated Professional Document Diploma:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="diplomaFile"
                      ref="diplomaFile"
                      v-on:change="handleDiplomaUpload()"
                      style="margin-bottom: 15px !important;"
                      accept=".jpeg, .png, .gif, .jpg, .pdf, .tiff , .svg"
                    />
                    <p>
                      Drag your file(s) here to begin<br />
                      or click to browse
                    </p>
                  </div>
                </label>
              </span>

              <picture v-if="!showDiplomaUpload && isDiplomaImage">
                <p>
                  <a href="javascript:void(0)" @click="resetDiploma()"
                    >Upload again</a
                  >
                </p>
                <img v-bind:src="diplomaPreview" v-show="showDiplomaPreview" />
              </picture>
              <div v-if="!showDiplomaUpload && isUDPdf">
                <p>
                  <a href="javascript:void(0)" @click="resetDiploma()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="diplomaPreview"
                  v-show="showDiplomaPreview"
                />
              </div>
              <span v-if="!showDiplomaUpload && !isDiplomaImage && !isUDPdf">
                <img :src="diplomaPreview" alt="" class="preview" />
              </span>
            </div>
          </div>
          <div>
            <h2
              class="flex"
              v-if="this.declinedFieldsCheck3"
              style="color: #e63636"
            >
              REJECTED
            </h2>
            <h2
              class="flex"
              v-if="this.acceptedFieldsCheck3"
              style="color: Green"
            >
              ACCEPTED
            </h2>
            <div class="ml-4" style="width: 250px">
              <span>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.transcriptFile.name }}
                </h2>
                <h2 v-if="!this.fileSizeExceed">
                  {{ this.transcriptFileSize }}
                </h2>
              </span>
              <span v-if="showTranscriptUpload">
                <label class="text-primary-700 text-lg"
                  >Authenticated Professional Document Transcript:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="transcriptFile"
                      ref="transcriptFile"
                      v-on:change="handleTranscriptUpload()"
                      style="margin-bottom: 15px !important;"
                      accept=".jpeg, .png, .gif, .jpg, .pdf, .tiff , .svg"
                    />
                    <p>
                      Drag your file(s) here to begin<br />
                      or click to browse
                    </p>
                  </div>
                </label>
              </span>

              <picture v-if="!showTranscriptUpload && isTranscriptImage">
                <p>
                  <a href="javascript:void(0)" @click="resetTranscript()"
                    >Upload again</a
                  >
                </p>
                <img
                  v-bind:src="transcriptPreview"
                  v-show="showTranscriptPreview"
                />
              </picture>
              <div v-if="!showTranscriptUpload && isUTPdf">
                <p>
                  <a href="javascript:void(0)" @click="resetTranscript()"
                    >Upload again</a
                  >
                </p>
                <embed
                  v-bind:src="transcriptPreview"
                  v-show="showTranscriptPreview"
                />
              </div>
              <span
                v-if="!showTranscriptUpload && !isTranscriptImage && !isUTPdf"
              >
                <img :src="transcriptPreview" alt="" class="preview" />
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
import MESSAGE from "../../composables/documentMessage";
import MAX_FILE_SIZE from "../../composables/documentMessage";
import MAX_SIZE_MB from "../../composables/documentMessage";
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
      photoFile: "",
      showPreview: false,
      filePreview: "",
      showUpload: true,
      isImage: false,
      isPdf: false,
      isUTPdf: false,
      isUDPdf: false,
      diplomaFile: "",
      showDiplomaPreview: false,
      diplomaPreview: "",
      showDiplomaUpload: true,
      isDiplomaImage: true,

      photoFileSize: "",
      transcriptFileSize: "",
      diplomaFileSize: "",

      transcriptFile: "",
      showTranscriptPreview: false,
      transcriptPreview: "",
      showTranscriptUpload: true,
      isTranscriptImage: true,

      photoFileBack: "",
      transcriptFileBack: "",
      diplomaFileBack: "",

      buttons: [],
      showButtons: false,
      documentSpec: [],
      licenseInfo: "",
      userId: +localStorage.getItem("userId"),

      passport: "",
      healthExamCert: "",
      workExperience: "",
      workExperience2: "",
      cpd: "",
      cpd2: "",
      cpd3: "",
      cpd4: "",
      cpd5: "",
      herqa: "",
      previousLicense: "",
      supportLetter: "",
      coc: "",
      degree: "",
      diploma: "",
      educationalDocs: "",
      payroll: "",
      transcript: "",
      englishLanguage: "",
      letterFromOrg: "",
      professionalLicense: "",
      renewedLicense: "",
      letterOrg: "",
      masters: "",
      mastersTranscript: "",
      phd: "",
      phdTranscript: "",

      declinedFields: [],
      acceptedFields: [],
      remark: "",

      documentMessage: "",
      maxFileSize: "",
      maxSizeMB: "",
      fileSizeExceed: "",

      declinedFieldsCheck1: false,
      acceptedFieldsCheck1: false,

      declinedFieldsCheck2: false,
      acceptedFieldsCheck2: false,

      declinedFieldsCheck3: false,
      acceptedFieldsCheck3: false,

      draftId: "",
      draftStatus: "",
      draftData: "",

      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
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
      getWorkExperience: "renewal/getRenewalWorkExperience",
      getWorkExperience2: "renewal/getRenewalWorkExperience2",
      getcpd: "renewal/getRenewalCpd",
      getcpd2: "renewal/getRenewalCpd2",
      getcpd3: "renewal/getRenewalCpd3",
      getcpd4: "renewal/getRenewalCpd4",
      getcpd5: "renewal/getRenewalCpd5",
      getHerqa: "renewal/getHerqa",
      getPreviousLicense: "renewal/getPreviousLicense",
      getSupportLetter: "renewal/getSupportLetter",
      getCoc: "renewal/getCoc",
      getDegree: "renewal/getDegree",
      getDiploma: "renewal/getDiploma",
      getEducationalDocuments: "renewal/getEducationalDocuments",
      getPayroll: "renewal/getPayroll",
      getTranscript: "renewal/getTranscript",
      getEnglishLanguage: "renewal/getEnglishLanguage",
      getLetterFromHiringInstitution: "renewal/getRenewalLicense",
      getProfessionalLicense: "renewal/getProfessionalLicense",
      getRenewedLicense: "renewal/getPreviousLicense",
      getLetterFromOrg: "renewal/getLetterfromOrg",
      getMasters: "renewal/getMasters",
      getMastersTranscript: "renewal/getMastersTranscript",
      getPhd: "renewal/getPhd",
      getPhdTranscript: "renewal/getPhdTranscript",

      getDraftData: "renewal/getDraft",
      getDeclinedFields: "renewal/getDeclinedFields",
      getAcceptedFields: "renewal/getAcceptedFields",
      getRemarK: "renewal/getRemark",
    }),
  },
  created() {
    this.documentMessage = MESSAGE.DOC_MESSAGE;
    this.maxFileSize = MAX_FILE_SIZE.MAX_FILE_SIZE;
    this.maxSizeMB = MAX_SIZE_MB.MAX_SIZE_MB;
    let certificate = this.$store.getters["renewal/getCertificate"];
    let diploma = this.$store.getters["renewal/getDiploma"];
    let transcript = this.$store.getters["renewal/getTranscript"];
    if (
      certificate &&
      certificate !== undefined &&
      certificate !== null &&
      certificate !== ""
    ) {
      this.showUpload = false;
      this.photoFile = certificate;
      let reader = new FileReader();
      let fileS = this.photoFile.size;
      if (fileS > 0 && fileS < 1000) {
        this.photoFileSize = fileS + " " + "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.photoFileSize = fileS / 1000 + "kB";
      } else {
        this.photoFileSize = fileS / 1000000 + "MB";
      }
      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.filePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.photoFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.photoFile.name)) {
          this.isImage = true;
          reader.readAsDataURL(this.photoFile);
        } else if (/\.(pdf)$/i.test(this.photoFile.name)) {
          this.isImage = false;
          this.isPdf = true;
          reader.readAsDataURL(this.photoFile);
        }
      }
    }
    if (
      diploma &&
      diploma !== undefined &&
      diploma !== null &&
      diploma !== ""
    ) {
      this.showDiplomaUpload = false;
      this.diplomaFile = diploma;
      let reader = new FileReader();
      let fileS = this.diplomaFile.size;
      if (fileS > 0 && fileS < 1000) {
        this.diplomaFileSize += "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.diplomaFileSize = fileS / 1000 + "kB";
      } else {
        this.diplomaFileSize = fileS / 1000000 + "MB";
      }

      reader.addEventListener(
        "load",
        function() {
          this.showDiplomaPreview = true;
          this.diplomaPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.diplomaFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.diplomaFile.name)) {
          this.isDiplomaImage = true;
          reader.readAsDataURL(this.diplomaFile);
        } else if (/\.(pdf)$/i.test(this.diplomaFile.name)) {
          this.isDiplomaImage = false;
          this.isUDPdf = true;
          reader.readAsDataURL(this.diplomaFile);
        }
      }
    }
    if (
      transcript &&
      transcript !== undefined &&
      transcript !== null &&
      transcript !== ""
    ) {
      this.showTranscriptUpload = false;
      this.transcriptFile = transcript;
      let reader = new FileReader();
      let fileS = this.transcriptFile.size;
      if (fileS > 0 && fileS < 1000) {
        this.transcriptFileSize += "B";
      } else if (fileS > 1000 && fileS < 1000000) {
        this.transcriptFileSize = fileS / 1000 + "kB";
      } else {
        this.transcriptFileSize = fileS / 1000000 + "MB";
      }

      reader.addEventListener(
        "load",
        function() {
          this.showTranscriptPreview = true;
          this.transcriptPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.transcriptFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.transcriptFile.name)) {
          this.isTranscriptImage = true;
          reader.readAsDataURL(this.transcriptFile);
        } else if (/\.(pdf)$/i.test(this.transcriptFile.name)) {
          this.isTranscriptImage = false;
          this.isUTPdf = true;
          reader.readAsDataURL(this.transcriptFile);
        }
      }
    }

    this.draftId = this.$route.params.id;
    this.draftStatus = this.$route.params.status;
    this.declinedFields = this.getDeclinedFields;
    this.remark = this.getRemarK;
    this.acceptedFields = this.acceptedFields;

    if (this.declinedFields != null && this.declinedFields.includes("PDC")) {
      this.declinedFieldsCheck1 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("PDC")) {
      this.acceptedFieldsCheck1 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("PDD")) {
      this.declinedFieldsCheck2 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("PDD")) {
      this.acceptedFieldsCheck2 = true;
    }
    if (this.declinedFields != null && this.declinedFields.includes("PDT")) {
      this.declinedFieldsCheck3 = true;
    }
    if (this.acceptedFields != null && this.acceptedFields.includes("PDT")) {
      this.acceptedFieldsCheck3 = true;
    }
    if (this.draftId != undefined) {
      this.draftData = this.getDraftData;
      for (let i = 0; i < this.draftData.documents.length; i++) {
        if (this.draftData.documents[i].documentTypeCode == "PDC") {
          this.showUpload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isPdf = true;
          } else {
            this.isImage = true;
          }

          this.photoFile = this.draftData.documents[i];
          this.showPreview = true;
          this.filePreview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "PDD") {
          this.showDiplomaUpload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isUDPdf = true;
          } else {
            this.isDiplomaImage = true;
          }
          this.diplomaFile = this.draftData.documents[i];
          this.showDiplomaPreview = true;
          this.diplomaPreview =
            this.basePath + this.draftData.documents[i].filePath;
        }
        if (this.draftData.documents[i].documentTypeCode == "PDT") {
          this.showTranscriptUpload = false;
          if (this.draftData.documents[i].fileName.split(".")[1] == "pdf") {
            this.isUTPdf = true;
          } else {
            this.isTranscriptImage = true;
          }

          this.transcriptFile = this.draftData.documents[i];
          this.showTranscriptPreview = true;
          this.transcriptPreview =
            this.basePath + this.draftData.documents[i].filePath;
        }
      }
    }
    this.license = this.getLicense;
    this.buttons = this.getButtons;
    this.documentSpec = this.getDocumentSpec;

    this.passport = this.getPassport;
    this.healthExamCert = this.getHealthExamCert;
    this.workExperience = this.getWorkExperience;
    this.workExperience2 = this.getWorkExperience2;
    this.cpd = this.getcpd;
    this.cpd2 = this.getcpd2;
    this.cpd3 = this.getcpd3;
    this.cpd4 = this.getcpd4;
    this.cpd5 = this.getcpd5;
    this.herqa = this.getHerqa;
    this.previousLicense = this.getPreviousLicense;
    this.supportLetter = this.getSupportLetter;
    this.coc = this.getCoc;
    this.degree = this.getDegree;
    this.diploma = this.getDiploma;
    this.educationalDocs = this.getEducationalDocuments;
    this.payroll = this.getPayroll;
    this.transcript = this.getTranscript;
    this.englishLanguage = this.getEnglishLanguage;
    this.letterFromOrg = this.getLetterFromHiringInstitution;
    this.professionalLicense = this.getProfessionalLicense;
    this.renewedLicense = this.getRenewedLicense;
    this.letterOrg = this.getLetterFromOrg;
    this.masters = this.getMasters;
    this.mastersTranscript = this.getMastersTranscript;
    this.phd = this.getPhd;
    this.phdTranscript = this.getPhdTranscript;
  },
  methods: {
    ...mapActions(["setProfessionalDoc"]),
    reset() {
      this.showUpload = true;
      this.showPreview = false;
      this.photoFile = "";
      this.filePreview = "";
      this.isImage = true;
      this.isPdf = false;
      this.photoFileSize = "";
    },
    resetDiploma() {
      this.showDiplomaUpload = true;
      this.showDiplomaPreview = false;
      this.diplomaFile = "";
      this.diplomaPreview = "";
      this.isDiplomaImage = true;
      this.isUDPdf = false;
      this.diplomaFileSize = "";
    },
    resetTranscript() {
      this.showTranscriptUpload = true;
      this.showTranscriptPreview = false;
      this.transcriptFile = "";
      this.transcriptPreview = "";
      this.isTranscriptImage = true;
      this.isUTPdf = false;
      this.transcriptFileSize = "";
    },
    handleCertificateUpload() {
      this.photoFile = this.$refs.photoFile.files[0];
      let reader = new FileReader();
      let fileS = this.photoFile.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.showUpload = false;
        this.fileSizeExceed = false;
        if (fileS > 0 && fileS < 1000) {
          this.photoFileSize = fileS + " " + "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.photoFileSize = fileS / 1000 + "kB";
        } else {
          this.photoFileSize = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showPreview = true;
            this.filePreview = reader.result;
          }.bind(this),
          false
        );
        if (this.photoFile) {
          if (/\.(jpe?g|png|gif)$/i.test(this.photoFile.name)) {
            this.isImage = true;
            reader.readAsDataURL(this.photoFile);
          } else if (/\.(pdf)$/i.test(this.photoFile.name)) {
            this.isImage = false;
            this.isPdf = true;
            reader.readAsDataURL(this.photoFile);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.photoFile = "";
        this.showUpload = true;
        this.isImage = false;
      }
    },
    handleDiplomaUpload() {
      this.diplomaFile = this.$refs.diplomaFile.files[0];
      let reader = new FileReader();
      let fileS = this.diplomaFile.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showDiplomaUpload = false;
        if (fileS > 0 && fileS < 1000) {
          this.diplomaFileSize += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.diplomaFileSize = fileS / 1000 + "kB";
        } else {
          this.diplomaFileSize = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showDiplomaPreview = true;
            this.diplomaPreview = reader.result;
          }.bind(this),
          false
        );
        if (this.diplomaFile) {
          if (/\.(jpe?g|png|gif)$/i.test(this.diplomaFile.name)) {
            this.isDiplomaImage = true;
            reader.readAsDataURL(this.diplomaFile);
          } else if (/\.(pdf)$/i.test(this.diplomaFile.name)) {
            this.isDiplomaImage = false;
            this.isUDPdf = true;
            reader.readAsDataURL(this.diplomaFile);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.diplomaFile = "";
        this.showDiplomaUpload = true;
        this.isDiplomaImage = false;
      }
    },
    handleTranscriptUpload() {
      this.showTranscriptUpload = false;
      this.transcriptFile = this.$refs.transcriptFile.files[0];
      let reader = new FileReader();
      let fileS = this.transcriptFile.size;
      if (fileS <= this.maxFileSize / 1000) {
        this.fileSizeExceed = false;
        this.showTranscriptUpload = false;
        if (fileS > 0 && fileS < 1000) {
          this.transcriptFileSize += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          this.transcriptFileSize = fileS / 1000 + "kB";
        } else {
          this.transcriptFileSize = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            this.showTranscriptPreview = true;
            this.transcriptPreview = reader.result;
          }.bind(this),
          false
        );
        if (this.transcriptFile) {
          if (/\.(jpe?g|png|gif)$/i.test(this.transcriptFile.name)) {
            this.isTranscriptImage = true;
            reader.readAsDataURL(this.transcriptFile);
          } else if (/\.(pdf)$/i.test(this.transcriptFile.name)) {
            this.isTranscriptImage = false;
            this.isUTPdf = true;
            reader.readAsDataURL(this.transcriptFile);
          }
        }
      } else {
        this.fileSizeExceed = true;
        this.transcriptFile = "";
        this.showTranscriptUpload = true;
        this.isTranscriptImage = false;
      }
    },
    submit() {
      this.$emit("changeActiveState");
      this.$store.dispatch("renewal/setCertificate", this.photoFile);
      this.$store.dispatch("renewal/setDiploma", this.diplomaFile);
      this.$store.dispatch("renewal/setTranscript", this.transcriptFile);
      let file = [this.photoFile, this.diplomaFile, this.transcriptFile];
      this.$store.dispatch("renewal/setProfessionalDoc", file);
    },
    submitBack() {
      this.$emit("changeActiveStateMinus");
      this.$store.dispatch("renewal/setCertificate", this.photoFile);
      this.$store.dispatch("renewal/setDiploma", this.diplomaFile);
      this.$store.dispatch("renewal/setTranscript", this.transcriptFile);
      let file = [this.photoFile, this.diplomaFile, this.transcriptFile];
      this.$store.dispatch("renewal/setProfessionalDoc", file);
    },

    draft(action) {
      this.showLoading = true;
      if (this.draftId) {
        if (this.photoFile || this.diplomaFile || this.transcriptFile) {
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
            formData.append(
              this.documentSpec[8].documentType.code,
              this.photoFile
            );

            formData.append(
              this.documentSpec[9].documentType.code,
              this.diplomaFile
            );
            formData.append(
              this.documentSpec[10].documentType.code,
              this.transcriptFile
            );
            formData.append(
              this.documentSpec[5].documentType.code,
              this.workExperience
            );
              formData.append(
              this.documentSpec[35].documentType.code,
              this.workExperience2
            );
            formData.append(this.documentSpec[4].documentType.code, this.cpd);
            formData.append(this.documentSpec[31].documentType.code, this.cpd2);
            formData.append(this.documentSpec[32].documentType.code, this.cpd3);
            formData.append(this.documentSpec[33].documentType.code, this.cpd4);
            formData.append(this.documentSpec[34].documentType.code, this.cpd5);
            formData.append(this.documentSpec[18].documentTypeCode, this.herqa);
            formData.append(
              this.documentSpec[6].documentTypeCode,
              this.previousLicense
            );
            formData.append(
              this.documentSpec[17].documentTypeCode,
              this.supportLetter
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
            if (this.educationalDocs != undefined) {
              formData.append(
                this.documentSpec[12].documentType.code,
                this.educationalDocs[0]
              );
              formData.append(
                this.documentSpec[13].documentType.code,
                this.educationalDocs[1]
              );
              formData.append(
                this.documentSpec[14].documentType.code,
                this.educationalDocs[2]
              );
              formData.append(
                this.documentSpec[15].documentType.code,
                this.educationalDocs[3]
              );
              formData.append(
                this.documentSpec[16].documentType.code,
                this.educationalDocs[4]
              );
            }
            formData.append(
              this.documentSpec[23].documentType.code,
              this.payroll
            );
            formData.append(
              this.documentSpec[26].documentType.code,
              this.transcript
            );
            formData.append(
              this.documentSpec[7].documentType.code,
              this.englishLanguage
            );
            formData.append(
              this.documentSpec[19].documentType.code,
              this.letterFromOrg
            );
            formData.append(
              this.documentSpec[22].documentType.code,
              this.professionalLicense
            );
            formData.append(
              this.documentSpec[21].documentType.code,
              this.renewedLicense
            );
            formData.append(
              this.documentSpec[20].documentType.code,
              this.letterOrg
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
