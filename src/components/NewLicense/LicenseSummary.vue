<template>
  <div
    v-if="this.showLoading2"
    class="bg-lightBlueB-200 w-screen h-screen max-w-4xl"
  >
    <Spinner class="bg-lightBlueB-200" />
  </div>
  <div class="bg-white mb-large rounded pl-4 pt-4 pr-4 pb-4">
    <div v-if="this.show && !this.showLoading2">
      <div class="flex justify-center"><Title message="Summary" /></div>
      <div class="flex justify-start">
        <Title message="Personal Information" />
      </div>
      <div class="flex flex-row">
        <div
          :class="[this.profileInfo.name === null ? errorClass : activeClass]"
        >
          <label class="ml-4 text-primary-300"> Full Name</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.name +
                " " +
                this.profileInfo.fatherName +
                " " +
                this.profileInfo.grandFatherName
            }}
          </h5>
        </div>
        <div>
          <label class="ml-8 text-primary-300"> Full Alternative Name</label>
          <h5 class="ml-8">
            {{
              this.profileInfo.alternativeName +
                " " +
                this.profileInfo.alternativeFatherName +
                " " +
                this.profileInfo.alternativeGrandFatherName
            }}
          </h5>
        </div>
        <div
          :class="[this.profileInfo.gender === null ? errorClass : activeClass]"
        >
          <label class="ml-4 text-primary-300"> Gender</label>
          <h5 class="ml-4">
            {{ this.profileInfo.gender ? this.profileInfo["gender"] : "-" }}
          </h5>
        </div>
        <div
          :class="[
            this.profileInfo.nationality === null ? errorClass : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Nationality</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.nationality
                ? this.profileInfo.nationality.name
                : "-"
            }}
          </h5>
        </div>
        <div
          :class="[
            this.profileInfo.dateOfBirth === null ? errorClass : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Date of Birth</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.dateOfBirth
                ? moment(this.profileInfo.dateOfBirth).format("MMM D, YYYY")
                : "-"
            }}
          </h5>
        </div>
        <div
          :class="[
            this.profileInfo.maritalStatus.name === null
              ? errorClass
              : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Marital Status</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.maritalStatus.name
                ? this.profileInfo.maritalStatus.name
                : "-"
            }}
          </h5>
        </div>
      </div>

      <div class="flex justify-start">
        <Title message="Address" />
      </div>
      <div>
        <label class="ml-8 text-primary-300"> PO Box</label>
        <h5 class="ml-8">{{ this.profileInfo.poBox }}</h5>
      </div>
      <div class="flex justify-start">
        <Title message="Contact" />
      </div>
      <div class="flex flex-row">
        <div
          :class="[
            this.profileInfo.user.phoneNumber === null
              ? errorClass
              : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Mobile Number</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.user.phoneNumber
                ? this.profileInfo.user.phoneNumber
                : "-"
            }}
          </h5>
        </div>

        <div
          :class="[
            this.profileInfo.user.emailAddress === null
              ? errorClass
              : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Email</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.user.emailAddress
                ? this.profileInfo.user.emailAddress
                : "-"
            }}
          </h5>
        </div>
      </div>
      <label
        style="font-size: 20px"
        v-if="docList.length != 0"
        class="flex justify-center text-primary-300"
      >
        Newly Attached Documents</label
      >
      <div class="flex justify-start flex-wrap">
        <div v-for="i in docList.length" v-bind:key="i">
          <div
            class="mr-4"
            v-for="item in docList.slice((i - 1) * 1, i * 1)"
            v-bind="item"
            v-bind:value="item"
          >
            <Title class="" :message="item.title" />
            <picture>
              <img :src="item.docFile" />
            </picture>
          </div>
        </div>
      </div>
      <label
        style="font-size: 20px"
        v-if="documentsArray.length != 0"
        class="flex justify-center text-primary-300"
      >
        Draft Documents</label
      >
      <div v-if="draftId != undefined" class="flex justify-start flex-wrap">
        <div v-for="i in draftData.documents.length" v-bind:key="i">
          <div
            class="mr-4"
            v-for="item in draftData.documents.slice((i - 1) * 1, i * 1)"
            v-bind="item"
            v-bind:value="item"
          >
            <Title class="" :message="item.documentType.name" />
            <picture>
              <img :src="this.basePath + item.filePath" />
            </picture>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8" v-show="showCheckBox">
        <label class="inline-flex items-center">
          <input @change="checkBox()" type="checkbox" class="form-checkbox" />
          <span style="font-size: 16px" class="ml-2"
            >This is to verify that all the attached documents are legitimate
            and not forgery.</span
          >
        </label>
        <br />
      </div>
      <div class="flex justify-center mt-8">
        <span
          v-if="showAllAttachements"
          style="font-size: 16px; color: red"
          class="ml-2"
          >Please attach all required documents.</span
        >
      </div>
      <div v-if="!showLoading">
        <div v-if="this.draftStatus == 'DRA' || !this.draftStatus">
          <div class="mt-12 flex justify-center">
            <div>
              <button @click="submitBack">
                Back
              </button>
              <button
                id="subButton"
                style="opacity: 0.3"
                :disabled="this.checkBoxValue == true"
                v-if="this.buttons.length < 3"
                @click="submitRequest(this.buttons[0].action)"
              >
                {{ this.buttons[0].name }}
              </button>
              <button
                id="subButton"
                style="opacity: 0.3"
                :disabled="this.checkBoxValue == true"
                v-if="this.buttons.length > 2"
                @click="submitRequest(this.buttons[0].action)"
              >
                {{ this.buttons[0].name }}
              </button>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <h6>
              You need to check the box to be able to submit.
            </h6>
          </div>
          <div class="flex justify-center mt-4 mb-8">
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
          <button
            id="reapplyButton"
            @click="draft('UpdateEvent')"
            variant="outline"
          >
            Re-apply
          </button>
          <button @click="update(this.buttons[1].action)" variant="outline">
            {{ this.buttons[1]["name"] }}
          </button>
        </div>
      </div>
      <div
        class="flex justify-center justify-items-center mt-8 pb-8"
        v-if="showLoading"
      >
        <Spinner />
      </div>
    </div>
  </div>

  <div v-if="showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>

<script>
import Title from "@/sharedComponents/Title";
import { mapGetters } from "vuex";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import { googleApi } from "@/composables/baseURL";

export default {
  props: ["activeState"],
  components: {
    Title,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  async created() {
    this.basePath = googleApi;
    this.showCheckBox = true;
    this.userId = +localStorage.getItem("userId");
    this.draftId = this.$route.params.id;
    this.draftStatus = this.$route.params.status;
    if (this.draftId != undefined) {
      setTimeout(() => {
        this.draftData = this.getDraftData;
        this.documentsArray = this.draftData.documents;
      }, 3500);
      if (this.draftStatus == "SUB") {
        this.showCheckBox = false;
      }
    }
    this.passport = this.getPassport;
    this.healthExamCert = this.getHealthExamCert;
    this.englishLanguage = this.getEnglishLanguage;
    this.professionalDocCertificate = this.getProfessionalDocCertificate;
    this.professionalDocDiploma = this.getProfessionalDocDiploma;
    this.professionalDocTranscript = this.getProfessionalDocTranscript;

    this.proCertificate = this.getProfessionalDocCertificate;
    this.proCertificate2 = this.getProfessionalDocCertificate2;
    this.proCertificate3 = this.getProfessionalDocCertificate3;
    this.proCertificate4 = this.getProfessionalDocCertificate4;
    this.proCertificate5 = this.getProfessionalDocCertificate5;

    this.proDiploma = this.getProfessionalDocDiploma;
    this.proDiploma2 = this.getProfessionalDocDiploma2;
    this.proDiploma3 = this.getProfessionalDocDiploma3;
    this.proDiploma4 = this.getProfessionalDocDiploma4;
    this.proDiploma5 = this.getProfessionalDocDiploma5;

    this.proTranscript = this.getProfessionalDocTranscript;
    this.proTranscript2 = this.getProfessionalDocTranscript2;
    this.proTranscript3 = this.getProfessionalDocTranscript3;
    this.proTranscript4 = this.getProfessionalDocTranscript4;
    this.proTranscript5 = this.getProfessionalDocTranscript5;

    this.eduEighth = this.getEduEighth;
    this.eduTenth = this.getEduTenth;
    this.eduTwelveth = this.getEduTwelveth;
    this.eduTranscript1 = this.getEduTranscript1;
    this.eduTranscript2 = this.getEduTranscript2;

    this.herqa = this.getHerqa;
    this.supportLetter = this.getSupportLetter;
    this.coc = this.getCoc;
    this.coc3 = this.getCoc2;
    this.coc2 = this.getCoc3;
    this.educationalDocs = this.getEducationalDocuments;
    this.workExperience = this.getWorkExperience;
    this.workExperience2 = this.getWorkExperience2;
    this.serviceFee = this.getServiceFee;
    this.renewedLicense = this.getRenewedLicense;
    this.professionalLicense = this.getProfessionalLicense;
    this.professionalLicense2 = this.getProfessionalLicense2;
    this.diploma = this.getDiploma;
    this.transcript = this.getTranscript;
    this.transcript2 = this.getTranscript2;
    this.degree = this.getDegree;
    this.payroll = this.getPayroll;

    this.masters = this.getMasters;
    this.mastersTranscript = this.getMastersTranscript;
    this.mastersTranscript2 = this.getMastersTranscript2;
    this.phd = this.getPhd;
    this.phdTranscript = this.getPhdTranscript;
    this.phdTranscript2 = this.getPhdTranscript2;
    this.renewedLicenseFromHealthFacility = this.getRenewedLicenseOfHealthFacility;
    this.requestLetterFromHiringHealthFacility = this.getRequestLetterFromHiringHealthFacility;

    this.buttons = this.getButtons;
    this.fetchProfileInfo();
    this.setDocs();
    this.getDocumentSpecs();
    this.license = this.getLicense;
    this.applicantId = this.license.applicantId;
    this.applicantTypeId = this.license.applicantTypeId;
    this.education.departmentId = this.license.education.departmentId;
    this.education.institutionId = this.license.education.institutionId;
    this.residenceWoredaId = this.license.residenceWoredaId;
    this.professionalTypeIds = this.license.professionalTypeIds;
    this.occupationTypeId = this.license.occupationTypeId;
    this.educationalLevelId = this.license.educationalLevelId;
    this.nativeLanguageId = this.license.nativeLanguageId;
    this.expertLevelId = this.license.expertLevelId;
    this.otherEducationalInstitution = this.license.otherEducationalInstitution;
    this.otherProfessionalType = this.license.otherProfessionalType;

    if (this.levelOfEducation == "diploma") {
      this.docCode = "PDD";
      this.docIdx = 7;
      this.docIdx2 = 33;
      this.docIdx3 = 34;
      this.docIdx4 = 35;
      this.docIdx5 = 36;
    } else if (this.levelOfEducation == "degree") {
      this.docCode = "DEG";
      this.docIdx = 21;
      this.docIdx2 = 44;
      this.docIdx3 = 45;
      this.docIdx4 = 46;
      this.docIdx5 = 47;
    } else if (this.levelOfEducation == "masters") {
      this.docCode = "MAST";
      this.docIdx = 24;
      this.docIdx2 = 53;
      this.docIdx3 = 54;
      this.docIdx4 = 55;
      this.docIdx5 = 56;
    } else {
      this.docCode = "PHD";
      this.docIdx = 26;
      this.docIdx2 = 59;
      this.docIdx3 = 60;
      this.docIdx4 = 61;
      this.docIdx5 = 62;
    }

    if (this.passport != "" && this.passport != undefined) {
      if ("name" in this.passport) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PSP"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.passport);
        this.passport.docFile = filePreview;
        this.passport.title = "Passport";
        this.docList.push(this.passport);
      }
    }
    if (this.healthExamCert != "" && this.healthExamCert != undefined) {
      if ("name" in this.healthExamCert) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "HEC"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.healthExamCert);
        this.healthExamCert.docFile = filePreview;
        this.healthExamCert.title = "Medical Certificate";
        this.docList.push(this.healthExamCert);
      }
    }
    if (this.englishLanguage != "" && this.englishLanguage != undefined) {
      if ("name" in this.englishLanguage) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "ELPC"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.englishLanguage);
        this.englishLanguage.docFile = filePreview;
        this.englishLanguage.title = "English Language Certificated";
        this.docList.push(this.englishLanguage);
      }
    }
    if (this.proCertificate != "" && this.proCertificate != undefined) {
      if ("name" in this.proCertificate) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDC"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proCertificate);
        this.proCertificate.docFile = filePreview;
        this.proCertificate.title = "Professional Certificate";
        this.docList.push(this.proCertificate);
      }
    }
    if (this.proCertificate2 != "" && this.proCertificate2 != undefined) {
      if ("name" in this.proCertificate2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDC1"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proCertificate2);
        this.proCertificate2.docFile = filePreview;
        this.proCertificate2.title = "Professional Certificate 2";
        this.docList.push(this.proCertificate2);
      }
    }
    if (this.proCertificate3 != "" && this.proCertificate3 != undefined) {
      if ("name" in this.proCertificate3) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDC2"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proCertificate3);
        this.proCertificate3.docFile = filePreview;
        this.proCertificate3.title = "Professional Certificate 3";
        this.docList.push(this.proCertificate3);
      }
    }
    if (this.proCertificate4 != "" && this.proCertificate4 != undefined) {
      if ("name" in this.proCertificate4) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDC3"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proCertificate4);
        this.proCertificate4.docFile = filePreview;
        this.proCertificate4.title = "Professional Certificate 4";
        this.docList.push(this.proCertificate4);
      }
    }
    if (this.proCertificate5 != "" && this.proCertificate5 != undefined) {
      if ("name" in this.proCertificate5) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDC4"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proCertificate5);
        this.proCertificate5.docFile = filePreview;
        this.proCertificate5.title = "Professional Certificate 5";
        this.docList.push(this.proCertificate5);
      }
    }
    if (this.proDiploma != "" && this.proDiploma != undefined) {
      if ("name" in this.proDiploma) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === `${this.docCode}`
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proDiploma);
        this.proDiploma.docFile = filePreview;
        if (this.levelOfEducation == "diploma") {
          this.proDiploma.title = "Professional Diploma";
        } else if (this.levelOfEducation == "degree") {
          this.proDiploma.title = "Professional Degree";
        } else if (this.levelOfEducation == "masters") {
          this.proDiploma.title = "Professional Masters";
        } else {
          this.proDiploma.title = "Professional PhD";
        }
        this.docList.push(this.proDiploma);
      }
    }
    if (this.proDiploma2 != "" && this.proDiploma2 != undefined) {
      if ("name" in this.proDiploma2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === `${this.docCode}${this.docNum + 1}`
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proDiploma2);
        this.proDiploma2.docFile = filePreview;
        if (this.levelOfEducation == "diploma") {
          this.proDiploma2.title = "Professional Diploma 2";
        } else if (this.levelOfEducation == "degree") {
          this.proDiploma2.title = "Professional Degree 2";
        } else if (this.levelOfEducation == "masters") {
          this.proDiploma2.title = "Professional Masters 2";
        } else {
          this.proDiploma2.title = "Professional PhD 2";
        }
        this.docList.push(this.proDiploma2);
      }
    }
    if (this.proDiploma3 != "" && this.proDiploma3 != undefined) {
      if ("name" in this.proDiploma3) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === `${this.docCode}${this.docNum + 2}`
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proDiploma3);
        this.proDiploma3.docFile = filePreview;
        if (this.levelOfEducation == "diploma") {
          this.proDiploma3.title = "Professional Diploma 3";
        } else if (this.levelOfEducation == "degree") {
          this.proDiploma3.title = "Professional Degree 3";
        } else if (this.levelOfEducation == "masters") {
          this.proDiploma3.title = "Professional Masters 3";
        } else {
          this.proDiploma3.title = "Professional PhD 3";
        }
        this.docList.push(this.proDiploma3);
      }
    }
    if (this.proDiploma4 != "" && this.proDiploma4 != undefined) {
      if ("name" in this.proDiploma4) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === `${this.docCode}${this.docNum + 3}`
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proDiploma4);
        this.proDiploma4.docFile = filePreview;
        if (this.levelOfEducation == "diploma") {
          this.proDiploma4.title = "Professional Diploma 4";
        } else if (this.levelOfEducation == "degree") {
          this.proDiploma4.title = "Professional Degree 4";
        } else if (this.levelOfEducation == "masters") {
          this.proDiploma4.title = "Professional Masters 4";
        } else {
          this.proDiploma4.title = "Professional PhD 4";
        }
        this.docList.push(this.proDiploma4);
      }
    }
    if (this.proDiploma5 != "" && this.proDiploma5 != undefined) {
      if ("name" in this.proDiploma5) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === `${this.docCode}${this.docNum + 4}`
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proDiploma5);
        this.proDiploma5.docFile = filePreview;
        if (this.levelOfEducation == "diploma") {
          this.proDiploma5.title = "Professional Diploma 5";
        } else if (this.levelOfEducation == "degree") {
          this.proDiploma5.title = "Professional Degree 5";
        } else if (this.levelOfEducation == "masters") {
          this.proDiploma5.title = "Professional Masters 5";
        } else {
          this.proDiploma5.title = "Professional PhD 5";
        }
        this.docList.push(this.proDiploma5);
      }
    }
    if (this.proTranscript != "" && this.proTranscript != undefined) {
      if ("name" in this.proTranscript) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDT"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proTranscript);
        this.proTranscript.docFile = filePreview;
        this.proTranscript.title = "Professional Transcript";
        this.docList.push(this.proTranscript);
      }
    }
    if (this.proTranscript2 != "" && this.proTranscript2 != undefined) {
      if ("name" in this.proTranscript2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDT1"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proTranscript2);
        this.proTranscript2.docFile = filePreview;
        this.proTranscript2.title = "Professional Transcript 2";
        this.docList.push(this.proTranscript2);
      }
    }
    if (this.proTranscript3 != "" && this.proTranscript3 != undefined) {
      if ("name" in this.proTranscript3) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDT2"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proTranscript3);
        this.proTranscript3.docFile = filePreview;
        this.proTranscript3.title = "Professional Transcript 3";
        this.docList.push(this.proTranscript3);
      }
    }
    if (this.proTranscript4 != "" && this.proTranscript4 != undefined) {
      if ("name" in this.proTranscript4) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDT3"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proTranscript4);
        this.proTranscript4.docFile = filePreview;
        this.proTranscript4.title = "Professional Transcript 4";
        this.docList.push(this.proTranscript4);
      }
    }
    if (this.proTranscript5 != "" && this.proTranscript5 != undefined) {
      if ("name" in this.proTranscript5) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDT4"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.proTranscript5);
        this.proTranscript5.docFile = filePreview;
        this.proTranscript5.title = "Professional Transcript 5";
        this.docList.push(this.proTranscript5);
      }
    }
    if (this.eduEighth != "" && this.eduEighth != undefined) {
      if ("name" in this.eduEighth) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "EDEGC"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.eduEighth);
        this.eduEighth.docFile = filePreview;
        this.eduEighth.title = "Eighth Grade Certificate";
        this.docList.push(this.eduEighth);
      }
    }
    if (this.eduTenth != "" && this.eduTenth != undefined) {
      if ("name" in this.eduTenth) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "EDTGC"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.eduTenth);
        this.eduTenth.docFile = filePreview;
        this.eduTenth.title = "Tenth Grade Certificate";
        this.docList.push(this.eduTenth);
      }
    }
    if (this.eduTwelveth != "" && this.eduTwelveth != undefined) {
      if ("name" in this.eduTwelveth) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "EDTWGC"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.eduTwelveth);
        this.eduTwelveth.docFile = filePreview;
        this.eduTwelveth.title = "Twelveth Grade Certificate";
        this.docList.push(this.eduTwelveth);
      }
    }
    if (this.eduTranscript1 != "" && this.eduTranscript1 != undefined) {
      if ("name" in this.eduTranscript1) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "EDHT"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.eduTranscript1);
        this.eduTranscript1.docFile = filePreview;
        this.eduTranscript1.title = "Education Transcript 1";
        this.docList.push(this.eduTranscript1);
      }
    }
    if (this.eduTranscript2 != "" && this.eduTranscript2 != undefined) {
      if ("name" in this.eduTranscript2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "EDPT"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.eduTranscript2);
        this.eduTranscript2.docFile = filePreview;
        this.eduTranscript2.title = "Education Transcript 2";
        this.docList.push(this.eduTranscript2);
      }
    }
    if (this.herqa != "" && this.herqa != undefined) {
      if ("name" in this.herqa) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "HERQA"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.herqa);
        this.herqa.docFile = filePreview;
        this.herqa.title = "HERQA";
        this.docList.push(this.herqa);
      }
    }
    if (this.applicantTypeId == 1) {
      if (this.supportLetter != "" && this.supportLetter != undefined) {
        if ("name" in this.supportLetter) {
          if (this.draftId != undefined) {
            this.documentsArray.splice(
              this.documentsArray.findIndex((e) => e.documentTypeCode === "SL"),
              1
            );
          }
          var filePreview = await this.blobToBase64(this.supportLetter);
          this.supportLetter.docFile = filePreview;
          this.supportLetter.title = "Support Letter";
          this.docList.push(this.supportLetter);
        }
      }
    }
    if (this.applicantTypeId == 3) {
      if (this.supportLetter != "" && this.supportLetter != undefined) {
        if ("name" in this.supportLetter) {
          if (this.draftId != undefined) {
            this.documentsArray.splice(
              this.documentsArray.findIndex(
                (e) => e.documentTypeCode === "SLFSI"
              ),
              1
            );
          }
          var filePreview = await this.blobToBase64(this.supportLetter);
          this.supportLetter.docFile = filePreview;
          this.supportLetter.title =
            "Support Letter From Sponsored Institution";
          this.docList.push(this.supportLetter);
        }
      }
    }

    if (this.coc != "" && this.coc != undefined) {
      if ("name" in this.coc) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "COC"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.coc);
        this.coc.docFile = filePreview;
        this.coc.title = "COC";
        this.docList.push(this.coc);
      }
    }
    if (this.coc2 != "" && this.coc2 != undefined) {
      if ("name" in this.coc2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "COC 2"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.coc2);
        this.coc2.docFile = filePreview;
        this.coc2.title = "COC 2";
        this.docList.push(this.coc2);
      }
    }
    if (this.coc3 != "" && this.coc3 != undefined) {
      if ("name" in this.coc3) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "COC 3"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.coc3);
        this.coc3.docFile = filePreview;
        this.coc3.title = "COC 3";
        this.docList.push(this.coc3);
      }
    }
    if (this.workExperience != "" && this.workExperience != undefined) {
      if ("name" in this.workExperience) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "WE"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.workExperience);
        this.workExperience.docFile = filePreview;
        this.workExperience.title = "Work Experience";
        this.docList.push(this.workExperience);
      }
    }
    if (this.workExperience2 != "" && this.workExperience2 != undefined) {
      if ("name" in this.workExperience2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "WE2"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.workExperience2);
        this.workExperience2.docFile = filePreview;
        this.workExperience2.title = "Work Experience 2";
        this.docList.push(this.workExperience2);
      }
    }
    if (this.serviceFee != "" && this.serviceFee != undefined) {
      if ("name" in this.serviceFee) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "SF"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.serviceFee);
        this.serviceFee.docFile = filePreview;
        this.serviceFee.title = "Service Fee";
        this.docList.push(this.serviceFee);
      }
    }
    if (this.renewedLicense != "" && this.renewedLicense != undefined) {
      if ("name" in this.renewedLicense) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "RLOTO"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.renewedLicense);
        this.renewedLicense.docFile = filePreview;
        this.renewedLicense.title = "Renewed License";
        this.docList.push(this.renewedLicense);
      }
    }
    if (
      this.professionalLicense != "" &&
      this.professionalLicense != undefined
    ) {
      if ("name" in this.professionalLicense) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "APLFCO"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.professionalLicense);
        this.professionalLicense.docFile = filePreview;
        this.professionalLicense.title = "Authenticated Professional License";
        this.docList.push(this.professionalLicense);
      }
    }
    if (
      this.professionalLicense2 != "" &&
      this.professionalLicense2 != undefined
    ) {
      if ("name" in this.professionalLicense2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "APLFCO1"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.professionalLicense2);
        this.professionalLicense2.docFile = filePreview;
        this.professionalLicense2.title =
          "Authenticated Professional License 2";
        this.docList.push(this.professionalLicense2);
      }
    }
    if (this.diploma != "" && this.diploma != undefined) {
      if ("name" in this.diploma) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PDD"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.diploma);
        this.diploma.docFile = filePreview;
        this.diploma.title = "Diploma";
        this.docList.push(this.diploma);
      }
    }
    if (this.transcript != "" && this.transcript != undefined) {
      if ("name" in this.transcript) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "TRAN"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.transcript);
        this.transcript.docFile = filePreview;
        this.transcript.title = "Degree Transcript";
        this.docList.push(this.transcript);
      }
    }
    if (this.transcript2 != "" && this.transcript2 != undefined) {
      if ("name" in this.transcript2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "TRAN1"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.transcript2);
        this.transcript2.docFile = filePreview;
        this.transcript2.title = "Degree Transcript 2";
        this.docList.push(this.transcript2);
      }
    }
    if (this.degree != "" && this.degree != undefined) {
      if ("name" in this.degree) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "DEG"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.degree);
        this.degree.docFile = filePreview;
        this.degree.title = "Degree";
        this.docList.push(this.degree);
      }
    }
    if (this.payroll != "" && this.payroll != undefined) {
      if ("name" in this.payroll) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PAYR"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.payroll);
        this.payroll.docFile = filePreview;
        this.payroll.title = "Payroll";
        this.docList.push(this.payroll);
      }
    }
    if (this.masters != "" && this.masters != undefined) {
      if ("name" in this.masters) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "MAST"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.masters);
        this.masters.docFile = filePreview;
        this.masters.title = "Masters";
        this.docList.push(this.masters);
      }
    }
    if (this.mastersTranscript != "" && this.mastersTranscript != undefined) {
      if ("name" in this.mastersTranscript) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "MASTRAN"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.mastersTranscript);
        this.mastersTranscript.docFile = filePreview;
        this.mastersTranscript.title = "Masters Transcript";
        this.docList.push(this.mastersTranscript);
      }
    }
    if (this.mastersTranscript2 != "" && this.mastersTranscript2 != undefined) {
      if ("name" in this.mastersTranscript2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "MASTRAN1"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.mastersTranscript2);
        this.mastersTranscript2.docFile = filePreview;
        this.mastersTranscript2.title = "Masters Transcript 2";
        this.docList.push(this.mastersTranscript2);
      }
    }
    if (this.phd != "" && this.phd != undefined) {
      if ("name" in this.phd) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "PHD"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.phd);
        this.phd.docFile = filePreview;
        this.phd.title = "PhD";
        this.docList.push(this.phd);
      }
    }
    if (this.phdTranscript != "" && this.phdTranscript != undefined) {
      if ("name" in this.phdTranscript) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "PHDTRAN"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.phdTranscript);
        this.phdTranscript.docFile = filePreview;
        this.phdTranscript.title = "PhD Transcript";
        this.docList.push(this.phdTranscript);
      }
    }
    if (this.phdTranscript2 != "" && this.phdTranscript2 != undefined) {
      if ("name" in this.phdTranscript2) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "PHDTRAN1"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.phdTranscript2);
        this.phdTranscript2.docFile = filePreview;
        this.phdTranscript2.title = "PhD Transcript 2";
        this.docList.push(this.phdTranscript2);
      }
    }
    if (
      this.renewedLicenseFromHealthFacility != "" &&
      this.renewedLicenseFromHealthFacility != undefined
    ) {
      if ("name" in this.renewedLicenseFromHealthFacility) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "RLHFO"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(
          this.renewedLicenseFromHealthFacility
        );
        this.renewedLicenseFromHealthFacility.docFile = filePreview;
        this.renewedLicenseFromHealthFacility.title =
          "Renewed License of Health Facility";
        this.docList.push(this.renewedLicenseFromHealthFacility);
      }
    }
    if (
      this.requestLetterFromHiringHealthFacility != "" &&
      this.requestLetterFromHiringHealthFacility != undefined
    ) {
      if ("name" in this.requestLetterFromHiringHealthFacility) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex(
              (e) => e.documentTypeCode === "RLFHHF"
            ),
            1
          );
        }
        var filePreview = await this.blobToBase64(
          this.requestLetterFromHiringHealthFacility
        );
        this.requestLetterFromHiringHealthFacility.docFile = filePreview;
        this.requestLetterFromHiringHealthFacility.title =
          "Request Letter from Hiring Health Facility";
        this.docList.push(this.requestLetterFromHiringHealthFacility);
      }
    }
  },

  data: () => ({
    basePath: "",
    docList: [],
    documentsArray: [],
    show: false,
    profileInfo: {},
    applicantId: null,
    applicantTypeId: null,
    education: {
      departmentId: null,
      institutionId: null,
    },
    residenceWoredaId: null,
    professionalTypeIds: [],
    nativeLanguageId: null,
    expertLevelId: null,
    occupationTypeId: null,
    educationalLevelId: null,
    otherEducationalInstitution: null,
    otherProfessionalType: null,
    draftId: "",
    draftData: "",
    draftStatus: "",
    activeClass: "active",
    errorClass: "text-danger",
    showFlash: false,
    showErrorFlash: false,
    showLoading: false,
    showLoading2: false,

    passport: "",
    healthExamCert: "",
    englishLanguage: "",
    professionalDocCertificate: "",
    professionalDocDiploma: "",
    professionalDocTranscript: "",
    herqa: "",
    supportLetter: "",
    coc: "",
    coc2: "",
    coc3: "",
    educationalDocs: [],
    workExperience: "",
    workExperience2: "",
    renewedLicense: "",
    professionalLicense: "",
    professionalLicense2: "",
    degree: "",
    diploma: "",
    transcript: "",
    transcript2: "",
    payroll: "",
    masters: "",
    mastersTranscript: "",
    mastersTranscript2: "",
    phd: "",
    phdTranscript: "",
    phdTranscript2: "",
    renewedLicenseFromHealthFacility: "",
    requestLetterFromHiringHealthFacility: "",

    eduEighth: "",
    eduTenth: "",
    eduTwelveth: "",
    eduTranscript1: "",
    eduTranscript2: "",

    proCertificate: "",
    proCertificate2: "",
    proCertificate3: "",
    proCertificate4: "",
    proCertificate5: "",

    proDiploma: "",
    proDiploma2: "",
    proDiploma3: "",
    proDiploma4: "",
    proDiploma5: "",

    proTranscript: "",
    proTranscript2: "",
    proTranscript3: "",
    proTranscript4: "",
    proTranscript5: "",

    applicationId: "",
    buttons: [],
    documentTypes: [],
    docs: [],

    showCheckBox: false,

    checkBoxValue: true,
    showAllAttachements: false,
    levelOfEducation: localStorage.getItem("educationalLevel"),

    docCode: "",
    docNum: 0,
    docIdx: 0,
    docIdx2: 0,
    docIdx3: 0,
    docIdx4: 0,
    docIdx5: 0,
  }),
  computed: {
    ...mapGetters({
      getLicense: "newlicense/getLicense",
      getPassport: "newlicense/getPassport",
      getHealthExamCert: "newlicense/getHealthExamCert",
      getEnglishLanguage: "newlicense/getEnglishLanguage",

      getProfessionalDocCertificate: "newlicense/getProfessionalDocCertificate",
      getProfessionalDocCertificate2:
        "newlicense/getProfessionalDocCertificate2",
      getProfessionalDocCertificate3:
        "newlicense/getProfessionalDocCertificate3",
      getProfessionalDocCertificate4:
        "newlicense/getProfessionalDocCertificate4",
      getProfessionalDocCertificate5:
        "newlicense/getProfessionalDocCertificate5",

      getProfessionalDocDiploma: "newlicense/getProfessionalDocDiploma",
      getProfessionalDocDiploma2: "newlicense/getProfessionalDocDiploma2",
      getProfessionalDocDiploma3: "newlicense/getProfessionalDocDiploma3",
      getProfessionalDocDiploma4: "newlicense/getProfessionalDocDiploma4",
      getProfessionalDocDiploma5: "newlicense/getProfessionalDocDiploma5",

      getProfessionalDocTranscript: "newlicense/getProfessionalDocTranscript",
      getProfessionalDocTranscript2: "newlicense/getProfessionalDocTranscript2",
      getProfessionalDocTranscript3: "newlicense/getProfessionalDocTranscript3",
      getProfessionalDocTranscript4: "newlicense/getProfessionalDocTranscript4",
      getProfessionalDocTranscript5: "newlicense/getProfessionalDocTranscript5",

      getEduEighth: "newlicense/getEduEighth",
      getEduTenth: "newlicense/getEduTenth",
      getEduTwelveth: "newlicense/getEduTwelveth",
      getEduTranscript1: "newlicense/getEduTranscript1",
      getEduTranscript2: "newlicense/getEduTranscript2",

      getHerqa: "newlicense/getHerqa",
      getSupportLetter: "newlicense/getSupportLetter",
      getCoc: "newlicense/getCoc",
      getCoc2: "newlicense/getCoc2",
      getCoc3: "newlicense/getCoc3",
      getEducationalDocuments: "newlicense/getEducationalDocuments",
      getWorkExperience: "newlicense/getWorkExperience",
      getWorkExperience2: "newlicense/getWorkExperience2",
      getMasters: "newlicense/getMasters",
      getMastersTranscript: "newlicense/getMastersTranscript",
      getMastersTranscript2: "newlicense/getMastersTranscript2",

      getPhd: "newlicense/getPhd",
      getPhdTranscript: "newlicense/getPhdTranscript",
      getPhdTranscript2: "newlicense/getPhdTranscript2",

      getRenewedLicenseOfHealthFacility:
        "newlicense/getRenewedLicenseOfHealthFacility",
      getRequestLetterFromHiringHealthFacility:
        "newlicense/getRequestLetterFromHiringHealthFacility",

      getButtons: "newlicense/getButtons",
      getApplicationId: "newlicense/getApplicationId",
      getDraftData: "newlicense/getDraft",
      getLetterfromOrg: "newlicense/getLetterfromOrg",
      getRenewedLicense: "newlicense/getRenewedLicense",
      getProfessionalLicense: "newlicense/getProfessionalLicense",
      getProfessionalLicense2: "newlicense/getProfessionalLicense2",
      getDiploma: "newlicense/getDiploma",
      getTranscript: "newlicense/getTranscript",
      getTranscript2: "newlicense/getTranscript2",
      getDegree: "newlicense/getDegree",
      getPayroll: "newlicense/getPayroll",
    }),
  },
  methods: {
    checkBox: function() {
      this.checkBoxValue = !this.checkBoxValue;
      if (this.draftStatus == "DEC" || this.draftStatus == "CONF") {
        if (this.checkBoxValue) {
          var element = document.getElementById("reapplyButton");
          element.style.opacity = 0.3;
        } else {
          var element = document.getElementById("reapplyButton");
          element.style.opacity = 1;
        }
      } else {
        if (this.checkBoxValue) {
          var element = document.getElementById("subButton");
          element.style.opacity = 0.3;
        } else {
          var element = document.getElementById("subButton");
          element.style.opacity = 1;
        }
      }
    },
    moment: function(date) {
      return moment(date);
    },
    fetchProfileInfo() {
      this.showLoading2 = true;
      this.$store.dispatch("newlicense/getProfile", this.userId).then((res) => {
        setTimeout(() => {
          this.profileInfo = res.data.data;
          this.show = true;
          this.showLoading2 = false;
        }, 3000);
      });
    },
    blobToBase64(blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    setDocs() {
      this.docs.push(this.passport);
      this.docs.push(this.healthExamCert);
      this.docs.push(this.englishLanguage);
      this.docs.push(this.herqa);
      this.docs.push(this.supportLetter);
      this.docs.push(this.coc);
      this.docs.push(this.educationalDoc);
      this.docs.push(this.workExperience);
      this.docs.push(this.serviceFeeFile);
    },

    getDocumentSpecs() {
      const applicationId = this.getApplicationId;
      this.$store
        .dispatch("newlicense/getDocumentSpecs", applicationId)
        .then((res) => {
          this.documentTypes = res.data.data;
        });
    },
    submitBack() {
      this.$emit("changeActiveStateMinus");
    },
    checkRequiredDocs(id, educationLevel, payroll, language) {
      if (
        educationLevel == "diploma" &&
        id == 1 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.coc !== "" &&
        this.educationalDocs[0] !== "" &&
        this.educationalDocs[1] !== "" &&
        this.educationalDocs[3] !== "" &&
        this.transcript !== "" &&
        this.diploma !== ""
      ) {
        if (payroll == "payroll" && this.payroll !== "") {
          return true;
        }
        if (payroll == "payroll" && this.payroll == "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "degree" &&
        id == 1 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.educationalDocs[0] !== "" &&
        this.educationalDocs[1] !== "" &&
        this.educationalDocs[2] !== "" &&
        this.educationalDocs[3] !== "" &&
        this.educationalDocs[4] !== "" &&
        this.degree !== "" &&
        this.transcript !== ""
      ) {
        if (payroll == "payroll" && this.payroll !== "") {
          return true;
        }
        if (payroll == "payroll" && this.payroll == "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "masters" &&
        id == 1 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.educationalDocs[0] !== "" &&
        this.educationalDocs[1] !== "" &&
        this.educationalDocs[2] !== "" &&
        this.educationalDocs[3] !== "" &&
        this.educationalDocs[4] !== "" &&
        this.degree !== "" &&
        this.transcript !== "" &&
        this.masters !== "" &&
        this.mastersTranscript !== ""
      ) {
        if (payroll == "payroll" && this.payroll !== "") {
          return true;
        }
        if (payroll == "payroll" && this.payroll == "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "phd" &&
        id == 1 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.educationalDocs[0] !== "" &&
        this.educationalDocs[1] !== "" &&
        this.educationalDocs[2] !== "" &&
        this.educationalDocs[3] !== "" &&
        this.educationalDocs[4] !== "" &&
        this.degree !== "" &&
        this.transcript !== "" &&
        this.masters !== "" &&
        this.mastersTranscript !== "" &&
        this.phd !== "" &&
        this.phdTranscript !== ""
      ) {
        if (payroll == "payroll" && this.payroll !== "") {
          return true;
        }
        if (payroll == "payroll" && this.payroll == "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "diploma" &&
        id == 2 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== "" &&
        this.renewedLicenseFromHealthFacility !== "" &&
        this.requestLetterFromHiringHealthFacility !== ""
      ) {
        if (language == "english" && this.englishLanguage !== "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "degree" &&
        id == 2 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== "" &&
        this.renewedLicenseFromHealthFacility !== "" &&
        this.requestLetterFromHiringHealthFacility !== ""
      ) {
        if (language == "english" && this.englishLanguage !== "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "masters" &&
        id == 2 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== "" &&
        this.renewedLicenseFromHealthFacility !== "" &&
        this.requestLetterFromHiringHealthFacility !== ""
      ) {
        if (language == "english" && this.englishLanguage !== "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "phd" &&
        id == 2 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== "" &&
        this.renewedLicenseFromHealthFacility !== "" &&
        this.requestLetterFromHiringHealthFacility !== ""
      ) {
        if (language == "english" && this.englishLanguage !== "") {
          return false;
        }
        return true;
      } else if (
        educationLevel == "diploma" &&
        id == 3 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== ""
      ) {
        return true;
      } else if (
        educationLevel == "degree" &&
        id == 3 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== ""
      ) {
        return true;
      } else if (
        educationLevel == "masters" &&
        id == 3 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== ""
      ) {
        return true;
      } else if (
        educationLevel == "phd" &&
        id == 3 &&
        this.passport !== "" &&
        this.healthExamCert !== "" &&
        this.herqa !== "" &&
        this.proCertificate !== "" &&
        this.proDiploma !== "" &&
        this.proTranscript !== "" &&
        this.professionalLicense !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    async submitRequest(act) {
      let educationLevel = localStorage.getItem("educationalLevel");
      let payroll = localStorage.getItem("payroll");
      let language = localStorage.getItem("language");
      let action = act;
      this.showLoading = true;
      if (this.draftId != null) {
        if (
          !this.checkRequiredDocs(
            this.applicantTypeId,
            educationLevel,
            language,
            payroll
          )
        ) {
          this.showLoading = false;
          this.showAllAttachements = true;
        } else {
          let license = {
            data: {
              action: action,
              data: this.draftData,
            },
            id: this.draftId,
          };
          this.$store
            .dispatch("newlicense/editNewLicense", license)
            .then((res) => {
              if (res.data.status == "Success") {
                let licenseId = this.draftId;
                let formData = new FormData();

                formData.append(
                  this.documentTypes[1].documentType.code,
                  this.passport
                );
                formData.append(
                  this.documentTypes[2].documentType.code,
                  this.healthExamCert
                );
                formData.append(
                  this.documentTypes[4].documentType.code,
                  this.workExperience
                );
                formData.append(
                  this.documentTypes[28].documentType.code,
                  this.workExperience2
                );
                formData.append(
                  this.documentTypes[5].documentType.code,
                  this.englishLanguage
                );
                formData.append(
                  this.documentTypes[23].documentType.code,
                  this.transcript
                );
                formData.append(
                  this.documentTypes[52].documentType.code,
                  this.transcript2
                );
                formData.append(
                  this.documentTypes[20].documentType.code,
                  this.payroll
                );
                formData.append(
                  this.documentTypes[21].documentType.code,
                  this.degree
                );
                formData.append(
                  this.documentTypes[6].documentType.code,
                  this.proCertificate
                );
                formData.append(
                  this.documentTypes[29].documentType.code,
                  this.proCertificate2
                );
                formData.append(
                  this.documentTypes[30].documentType.code,
                  this.proCertificate3
                );
                formData.append(
                  this.documentTypes[31].documentType.code,
                  this.proCertificate4
                );
                formData.append(
                  this.documentTypes[32].documentType.code,
                  this.proCertificate5
                );
                formData.append(
                  this.documentTypes[this.docIdx].documentType.code,
                  this.proDiploma
                );
                formData.append(
                  this.documentTypes[this.docIdx2].documentType.code,
                  this.proDiploma2
                );
                formData.append(
                  this.documentTypes[this.docIdx3].documentType.code,
                  this.proDiploma3
                );
                formData.append(
                  this.documentTypes[this.docIdx4].documentType.code,
                  this.proDiploma4
                );
                formData.append(
                  this.documentTypes[this.docIdx5].documentType.code,
                  this.proDiploma5
                );
                formData.append(
                  this.documentTypes[8].documentType.code,
                  this.proTranscript
                );
                formData.append(
                  this.documentTypes[37].documentType.code,
                  this.proTranscript2
                );
                formData.append(
                  this.documentTypes[38].documentType.code,
                  this.proTranscript3
                );
                formData.append(
                  this.documentTypes[39].documentType.code,
                  this.proTranscript4
                );
                formData.append(
                  this.documentTypes[40].documentType.code,
                  this.proTranscript5
                );
                formData.append(
                  this.documentTypes[9].documentType.code,
                  this.coc
                );
                formData.append(
                  this.documentTypes[41].documentType.code,
                  this.coc2
                );
                formData.append(
                  this.documentTypes[42].documentType.code,
                  this.coc3
                );
                if (this.educationalDocs != undefined) {
                  formData.append(
                    this.documentTypes[10].documentType.code,
                    this.educationalDocs[0]
                  );
                  formData.append(
                    this.documentTypes[11].documentType.code,
                    this.educationalDocs[1]
                  );
                  formData.append(
                    this.documentTypes[12].documentType.code,
                    this.educationalDocs[2]
                  );
                  formData.append(
                    this.documentTypes[13].documentType.code,
                    this.educationalDocs[3]
                  );
                  formData.append(
                    this.documentTypes[14].documentType.code,
                    this.educationalDocs[4]
                  );
                }
                if (this.applicantTypeId == 1) {
                  formData.append(
                    this.documentTypes[15].documentType.code,
                    this.supportLetter
                  );
                }
                if (this.applicantTypeId == 3) {
                  formData.append(
                    this.documentTypes[64].documentType.code,
                    this.supportLetter
                  );
                }
                formData.append(
                  this.documentTypes[16].documentType.code,
                  this.herqa
                );
                formData.append(
                  this.documentTypes[18].documentType.code,
                  this.renewedLicense
                );
                formData.append(
                  this.documentTypes[19].documentType.code,
                  this.professionalLicense
                );
                formData.append(
                  this.documentTypes[52].documentType.code,
                  this.professionalLicense2
                );
                formData.append(
                  this.documentTypes[24].documentType.code,
                  this.masters
                );
                formData.append(
                  this.documentTypes[25].documentType.code,
                  this.mastersTranscript
                );
                formData.append(
                  this.documentTypes[57].documentType.code,
                  this.mastersTranscript2
                );
                formData.append(
                  this.documentTypes[26].documentType.code,
                  this.phd
                );
                formData.append(
                  this.documentTypes[27].documentType.code,
                  this.phdTranscript
                );
                formData.append(
                  this.documentTypes[58].documentType.code,
                  this.phdTranscript2
                );
                formData.append(
                  this.documentTypes[63].documentType.code,
                  this.renewedLicenseFromHealthFacility
                );
                formData.append(
                  this.documentTypes[65].documentType.code,
                  this.requestLetterFromHiringHealthFacility
                );
                let payload = { document: formData, id: licenseId };

                this.$store
                  .dispatch("newlicense/uploadDocuments", payload)
                  .then((res) => {
                    if (res.status == 200) {
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
              }
            });
        }
      } else {
        let formData = new FormData();
        formData.append(this.documentTypes[1].documentType.code, this.passport);
        formData.append(
          this.documentTypes[2].documentType.code,
          this.healthExamCert
        );
        formData.append(
          this.documentTypes[4].documentType.code,
          this.workExperience
        );
        formData.append(
          this.documentTypes[28].documentType.code,
          this.workExperience2
        );
        formData.append(
          this.documentTypes[5].documentType.code,
          this.englishLanguage
        );
        formData.append(
          this.documentTypes[23].documentType.code,
          this.transcript
        );
        formData.append(
          this.documentTypes[52].documentType.code,
          this.transcript2
        );
        formData.append(this.documentTypes[20].documentType.code, this.payroll);
        formData.append(this.documentTypes[21].documentType.code, this.degree);
        formData.append(
          this.documentTypes[6].documentType.code,
          this.proCertificate
        );
        formData.append(
          this.documentTypes[29].documentType.code,
          this.proCertificate2
        );
        formData.append(
          this.documentTypes[30].documentType.code,
          this.proCertificate3
        );
        formData.append(
          this.documentTypes[31].documentType.code,
          this.proCertificate4
        );
        formData.append(
          this.documentTypes[32].documentType.code,
          this.proCertificate5
        );
        formData.append(
          this.documentTypes[this.docIdx].documentType.code,
          this.proDiploma
        );
        formData.append(
          this.documentTypes[this.docIdx2].documentType.code,
          this.proDiploma2
        );
        formData.append(
          this.documentTypes[this.docIdx3].documentType.code,
          this.proDiploma3
        );
        formData.append(
          this.documentTypes[this.docIdx4].documentType.code,
          this.proDiploma4
        );
        formData.append(
          this.documentTypes[this.docIdx5].documentType.code,
          this.proDiploma5
        );
        formData.append(
          this.documentTypes[8].documentType.code,
          this.proTranscript
        );
        formData.append(
          this.documentTypes[37].documentType.code,
          this.proTranscript2
        );
        formData.append(
          this.documentTypes[38].documentType.code,
          this.proTranscript3
        );
        formData.append(
          this.documentTypes[39].documentType.code,
          this.proTranscript4
        );
        formData.append(
          this.documentTypes[40].documentType.code,
          this.proTranscript5
        );
        formData.append(this.documentTypes[9].documentType.code, this.coc);
        formData.append(this.documentTypes[41].documentType.code, this.coc2);
        formData.append(this.documentTypes[42].documentType.code, this.coc3);
        if (this.educationalDocs != undefined) {
          formData.append(
            this.documentTypes[10].documentType.code,
            this.educationalDocs[0]
          );
          formData.append(
            this.documentTypes[11].documentType.code,
            this.educationalDocs[1]
          );
          formData.append(
            this.documentTypes[12].documentType.code,
            this.educationalDocs[2]
          );
          formData.append(
            this.documentTypes[13].documentType.code,
            this.educationalDocs[3]
          );
          formData.append(
            this.documentTypes[14].documentType.code,
            this.educationalDocs[4]
          );
        }

        if (this.applicantTypeId == 1) {
          formData.append(
            this.documentTypes[15].documentType.code,
            this.supportLetter
          );
        }
        if (this.applicantTypeId == 3) {
          formData.append(
            this.documentTypes[64].documentType.code,
            this.supportLetter
          );
        }
        formData.append(this.documentTypes[16].documentType.code, this.herqa);
        formData.append(
          this.documentTypes[18].documentType.code,
          this.renewedLicense
        );
        formData.append(
          this.documentTypes[19].documentType.code,
          this.professionalLicense
        );
        formData.append(
          this.documentTypes[52].documentType.code,
          this.professionalLicense2
        );
        formData.append(this.documentTypes[24].documentType.code, this.masters);
        formData.append(
          this.documentTypes[25].documentType.code,
          this.mastersTranscript
        );
        formData.append(
          this.documentTypes[57].documentType.code,
          this.mastersTranscript2
        );
        formData.append(this.documentTypes[26].documentType.code, this.phd);
        formData.append(
          this.documentTypes[27].documentType.code,
          this.phdTranscript
        );
        formData.append(
          this.documentTypes[58].documentType.code,
          this.phdTranscript2
        );
        formData.append(
          this.documentTypes[63].documentType.code,
          this.renewedLicenseFromHealthFacility
        );
        formData.append(
          this.documentTypes[65].documentType.code,
          this.requestLetterFromHiringHealthFacility
        );
        let license = {
          action: action,
          data: {
            applicantId: this.userId,
            applicantTypeId: this.applicantTypeId,
            education: {
              institutionId: this.education.institutionId,
              departmentId: this.education.departmentId,
            },
            residenceWoredaId: this.residenceWoredaId,
            professionalTypeIds: this.professionalTypeIds,
            paymentSlip: null,
            occupationTypeId: this.occupationTypeId,
            educationalLevelId: this.educationalLevelId,
            nativeLanguageId: this.nativeLanguageId,
            expertLevelId: this.expertLevelId,
            isLegal: this.checkBoxValue,
            otherEducationalInstitution: this.otherEducationalInstitution,
            otherProfessionalType: this.otherProfessionalType,
          },
        };
        let educationLevel = localStorage.getItem("educationalLevel");
        let payroll = localStorage.getItem("payroll");
        let language = localStorage.getItem("language");
        if (
          !this.checkRequiredDocs(
            license.data.applicantTypeId,
            educationLevel,
            payroll,
            language
          )
        ) {
          this.showLoading = false;
          this.showAllAttachements = true;
        } else {
          this.$store
            .dispatch("newlicense/addNewLicense", license)
            .then((res) => {
              let licenseId = res.data.data.id;
              let payload = { document: formData, id: licenseId };
              this.$store
                .dispatch("newlicense/uploadDocuments", payload)
                .then((res) => {
                  this.showLoading = false;
                  if (res.data.status == "Success") {
                    this.showFlash = true;
                    setTimeout(() => {
                      this.$router.push({ path: "/menu" });
                    }, 1500);
                  } else {
                    this.showErrorFlash = true;
                  }
                })
                .catch((err) => {
                  this.showErrorFlash = true;
                });
            });
        }
      }
    },
    async draft(act) {
      let action = act;
      this.showLoading = true;
      if (this.draftId != null) {
        let license = {
          data: {
            action: action,
            data: this.draftData,
          },
          id: this.draftId,
        };
        this.$store
          .dispatch("newlicense/editNewLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              let licenseId = this.draftId;
              let formData = new FormData();

              formData.append(
                this.documentTypes[1].documentType.code,
                this.passport
              );
              formData.append(
                this.documentTypes[2].documentType.code,
                this.healthExamCert
              );

              formData.append(
                this.documentTypes[4].documentType.code,
                this.workExperience
              );
              formData.append(
                this.documentTypes[28].documentType.code,
                this.workExperience2
              );
              formData.append(
                this.documentTypes[5].documentType.code,
                this.englishLanguage
              );
              formData.append(
                this.documentTypes[23].documentType.code,
                this.transcript
              );
              formData.append(
                this.documentTypes[52].documentType.code,
                this.transcript2
              );
              formData.append(
                this.documentTypes[20].documentType.code,
                this.payroll
              );
              formData.append(
                this.documentTypes[21].documentType.code,
                this.degree
              );
              formData.append(
                this.documentTypes[6].documentType.code,
                this.proCertificate
              );
              formData.append(
                this.documentTypes[29].documentType.code,
                this.proCertificate2
              );
              formData.append(
                this.documentTypes[30].documentType.code,
                this.proCertificate3
              );
              formData.append(
                this.documentTypes[31].documentType.code,
                this.proCertificate4
              );
              formData.append(
                this.documentTypes[32].documentType.code,
                this.proCertificate5
              );
              formData.append(
                this.documentTypes[this.docIdx].documentType.code,
                this.proDiploma
              );
              formData.append(
                this.documentTypes[this.docIdx2].documentType.code,
                this.proDiploma2
              );
              formData.append(
                this.documentTypes[this.docIdx3].documentType.code,
                this.proDiploma3
              );
              formData.append(
                this.documentTypes[this.docIdx4].documentType.code,
                this.proDiploma4
              );
              formData.append(
                this.documentTypes[this.docIdx5].documentType.code,
                this.proDiploma5
              );
              formData.append(
                this.documentTypes[8].documentType.code,
                this.proTranscript
              );
              formData.append(
                this.documentTypes[37].documentType.code,
                this.proTranscript2
              );
              formData.append(
                this.documentTypes[38].documentType.code,
                this.proTranscript3
              );
              formData.append(
                this.documentTypes[39].documentType.code,
                this.proTranscript4
              );
              formData.append(
                this.documentTypes[40].documentType.code,
                this.proTranscript5
              );
              formData.append(
                this.documentTypes[9].documentType.code,
                this.coc
              );
              formData.append(
                this.documentTypes[41].documentType.code,
                this.coc2
              );
              formData.append(
                this.documentTypes[42].documentType.code,
                this.coc3
              );
              if (this.educationalDocs != undefined) {
                formData.append(
                  this.documentTypes[10].documentType.code,
                  this.educationalDocs[0]
                );
                formData.append(
                  this.documentTypes[11].documentType.code,
                  this.educationalDocs[1]
                );
                formData.append(
                  this.documentTypes[12].documentType.code,
                  this.educationalDocs[2]
                );
                formData.append(
                  this.documentTypes[13].documentType.code,
                  this.educationalDocs[3]
                );
                formData.append(
                  this.documentTypes[14].documentType.code,
                  this.educationalDocs[4]
                );
              }

              if (this.applicantTypeId == 1) {
                formData.append(
                  this.documentTypes[15].documentType.code,
                  this.supportLetter
                );
              }
              if (this.applicantTypeId == 3) {
                formData.append(
                  this.documentTypes[64].documentType.code,
                  this.supportLetter
                );
              }
              formData.append(
                this.documentTypes[16].documentType.code,
                this.herqa
              );
              formData.append(
                this.documentTypes[18].documentType.code,
                this.renewedLicense
              );
              formData.append(
                this.documentTypes[19].documentType.code,
                this.professionalLicense
              );
              formData.append(
                this.documentTypes[52].documentType.code,
                this.professionalLicense2
              );
              formData.append(
                this.documentTypes[24].documentType.code,
                this.masters
              );
              formData.append(
                this.documentTypes[25].documentType.code,
                this.mastersTranscript
              );
              formData.append(
                this.documentTypes[57].documentType.code,
                this.mastersTranscript2
              );
              formData.append(
                this.documentTypes[26].documentType.code,
                this.phd
              );
              formData.append(
                this.documentTypes[27].documentType.code,
                this.phdTranscript
              );
              formData.append(
                this.documentTypes[58].documentType.code,
                this.phdTranscript2
              );
              formData.append(
                this.documentTypes[63].documentType.code,
                this.renewedLicenseFromHealthFacility
              );
              formData.append(
                this.documentTypes[65].documentType.code,
                this.requestLetterFromHiringHealthFacility
              );
              let payload = { document: formData, id: licenseId };
              this.$store
                .dispatch("newlicense/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
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
            }
          });
      } else {
        let formData = new FormData();
        formData.append(this.documentTypes[1].documentType.code, this.passport);
        formData.append(
          this.documentTypes[2].documentType.code,
          this.healthExamCert
        );

        formData.append(
          this.documentTypes[4].documentType.code,
          this.workExperience
        );
        formData.append(
          this.documentTypes[28].documentType.code,
          this.workExperience2
        );
        formData.append(
          this.documentTypes[5].documentType.code,
          this.englishLanguage
        );
        formData.append(
          this.documentTypes[23].documentType.code,
          this.transcript
        );
        formData.append(
          this.documentTypes[52].documentType.code,
          this.transcript2
        );
        formData.append(this.documentTypes[20].documentType.code, this.payroll);
        formData.append(this.documentTypes[21].documentType.code, this.degree);
        formData.append(
          this.documentTypes[6].documentType.code,
          this.proCertificate
        );
        formData.append(
          this.documentTypes[29].documentType.code,
          this.proCertificate2
        );
        formData.append(
          this.documentTypes[30].documentType.code,
          this.proCertificate3
        );
        formData.append(
          this.documentTypes[31].documentType.code,
          this.proCertificate4
        );
        formData.append(
          this.documentTypes[32].documentType.code,
          this.proCertificate5
        );
        formData.append(
          this.documentTypes[this.docIdx].documentType.code,
          this.proDiploma
        );
        formData.append(
          this.documentTypes[this.docIdx2].documentType.code,
          this.proDiploma2
        );
        formData.append(
          this.documentTypes[this.docIdx3].documentType.code,
          this.proDiploma3
        );
        formData.append(
          this.documentTypes[this.docIdx4].documentType.code,
          this.proDiploma4
        );
        formData.append(
          this.documentTypes[this.docIdx5].documentType.code,
          this.proDiploma5
        );
        formData.append(
          this.documentTypes[8].documentType.code,
          this.proTranscript
        );
        formData.append(
          this.documentTypes[37].documentType.code,
          this.proTranscript2
        );
        formData.append(
          this.documentTypes[38].documentType.code,
          this.proTranscript3
        );
        formData.append(
          this.documentTypes[39].documentType.code,
          this.proTranscript4
        );
        formData.append(
          this.documentTypes[40].documentType.code,
          this.proTranscript5
        );
        formData.append(this.documentTypes[9].documentType.code, this.coc);
        formData.append(this.documentTypes[41].documentType.code, this.coc2);
        formData.append(this.documentTypes[42].documentType.code, this.coc3);
        if (this.educationalDocs != undefined) {
          formData.append(
            this.documentTypes[10].documentType.code,
            this.educationalDocs[0]
          );
          formData.append(
            this.documentTypes[11].documentType.code,
            this.educationalDocs[1]
          );
          formData.append(
            this.documentTypes[12].documentType.code,
            this.educationalDocs[2]
          );
          formData.append(
            this.documentTypes[13].documentType.code,
            this.educationalDocs[3]
          );
          formData.append(
            this.documentTypes[14].documentType.code,
            this.educationalDocs[4]
          );
        }

        if (this.applicantTypeId == 1) {
          formData.append(
            this.documentTypes[15].documentType.code,
            this.supportLetter
          );
        }
        if (this.applicantTypeId == 3) {
          formData.append(
            this.documentTypes[64].documentType.code,
            this.supportLetter
          );
        }
        formData.append(this.documentTypes[16].documentType.code, this.herqa);
        formData.append(
          this.documentTypes[18].documentType.code,
          this.renewedLicense
        );
        formData.append(
          this.documentTypes[19].documentType.code,
          this.professionalLicense
        );
        formData.append(
          this.documentTypes[52].documentType.code,
          this.professionalLicense2
        );
        formData.append(this.documentTypes[24].documentType.code, this.masters);
        formData.append(
          this.documentTypes[25].documentType.code,
          this.mastersTranscript
        );
        formData.append(
          this.documentTypes[57].documentType.code,
          this.mastersTranscript2
        );
        formData.append(this.documentTypes[26].documentType.code, this.phd);
        formData.append(
          this.documentTypes[27].documentType.code,
          this.phdTranscript
        );
        formData.append(
          this.documentTypes[58].documentType.code,
          this.phdTranscript2
        );
        formData.append(
          this.documentTypes[63].documentType.code,
          this.renewedLicenseFromHealthFacility
        );
        formData.append(
          this.documentTypes[65].documentType.code,
          this.requestLetterFromHiringHealthFacility
        );
        let license = {
          action: action,
          data: {
            applicantId: this.userId,
            applicantTypeId: this.applicantTypeId,
            education: {
              institutionId: this.education.institutionId,
              departmentId: this.education.departmentId,
            },
            residenceWoredaId: this.residenceWoredaId,
            professionalTypeIds: this.professionalTypeIds,
            paymentSlip: null,
            occupationTypeId: this.occupationTypeId,
            educationalLevelId: this.educationalLevelId,
            nativeLanguageId: this.nativeLanguageId,
            expertLevelId: this.expertLevelId,
            isLegal: this.checkBoxValue,
            otherEducationalInstitution: this.otherEducationalInstitution,
            otherProfessionalType: this.otherProfessionalType,
          },
        };
        this.$store
          .dispatch("newlicense/addNewLicense", license)
          .then((res) => {
            let licenseId = res.data.data.id;
            let payload = { document: formData, id: licenseId };
            this.$store
              .dispatch("newlicense/uploadDocuments", payload)
              .then((res) => {
                this.showLoading = false;
                if (res.data.status == "Success") {
                  this.showFlash = true;
                  setTimeout(() => {
                    this.$router.push({ path: "/menu" });
                  }, 1500);
                } else {
                  this.showErrorFlash = true;
                }
              })
              .catch((err) => {
                this.showErrorFlash = true;
              });
          });
      }
    },
    update(action) {
      this.showLoading = true;
      let license = {
        data: {
          action: action,
          data: {
            applicantId: this.licenseInfo.applicantId,
            applicantTypeId: this.licenseInfo.applicantTypeId,
            education: {
              departmentId: this.licenseInfo.education.departmentId,
              institutionId: this.licenseInfo.education.institutionId,
            },
            residenceWoredaId: this.residenceWoredaId,
            professionalTypeIds: this.professionalTypeIds,
            paymentSlip: null,
            occupationTypeId: this.occupationTypeId,
            educationalLevelId: this.educationalLevelId,
            nativeLanguageId: this.nativeLanguageId,
            expertLevelId: this.expertLevelId,
            isLegal: this.checkBoxValue,
            otherEducationalInstitution: this.otherEducationalInstitution,
            otherProfessionalType: this.otherProfessionalType,
          },
        },
        id: this.draftId,
      };

      if (this.draftId != undefined) {
        this.$store
          .dispatch("newlicense/editNewLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              this.showFlash = true;
              this.showLoading = false;
              setTimeout(() => {
                this.$router.push({ path: "/menu" });
              }, 1500);
            } else {
              this.showErrorFlash = true;
            }
          });
      } else {
        this.$store
          .dispatch("newlicense/addNewLicense", license.data)
          .then((res) => {
            if (res.data.status == "Success") {
              this.showFlash = true;
              this.showLoading = false;
              setTimeout(() => {
                this.$router.push({ path: "/menu" });
              }, 1500);
            }
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
      this.$store.dispatch("newlicense/withdraw", payload).then((res) => {
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
  mounted() {
    this.$nextTick(function() {
      window.setInterval(() => {
        this.showFlash = false;
        this.showErrorFlash = false;
      });
    });
  },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
.disabled {
  pointer-events: none;
  opacity: 0.3;
}
</style>
