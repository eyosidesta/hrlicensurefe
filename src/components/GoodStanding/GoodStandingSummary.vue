<template>
  <div v-if="this.showLoading2" class="bg-lightBlueB-200 h-screen max-w-4xl">
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
        <div
          :class="[
            this.profileInfo.alternativeName === null
              ? errorClass
              : activeClass,
          ]"
        >
          <label class="ml-4 text-primary-300"> Full Name</label>
          <h5 class="ml-4">
            {{
              this.profileInfo.alternativeName +
                " " +
                this.profileInfo.alternativeFatherName +
                " " +
                this.profileInfo.alternativeGrandFatherName
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
        <div v-for="i in documentsArray.length" v-bind:key="i">
          <div
            class="mr-4"
            v-for="item in documentsArray.slice((i - 1) * 1, i * 1)"
            v-bind="item"
            v-bind:value="item"
          >
            <Title class="" :message="item.documentType.name" />
            <picture>
              <img
                :src="
                  this.basePath +
                    item.filePath
                "
              />
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
              @click="draft(this.buttons[1].action)"
              variant="outline"
            >
              {{ this.buttons[1].name }}
            </button>

            <button
              v-if="this.buttons.length > 2"
              class="withdraw"
              @click="withdraw(this.buttons[2].action)"
              variant="outline"
            >
              {{ this.buttons[2].name }}
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
            @click="withdraw(this.buttons[2].action)"
            variant="outline"
          >
            {{ this.buttons[2]["name"] }}
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
    this.licenseCopy = this.getLicenseCopy;
    this.serviceFee = this.getServiceFee;
    this.goodstandingLetter = this.getLetter;
    if (this.licenseCopy != "" && this.licenseCopy != undefined) {
      if ("name" in this.licenseCopy) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "LC"),
            1
          );
        }
        var filePreview = await this.blobToBase64(this.licenseCopy);
        this.licenseCopy.docFile = filePreview;
        this.licenseCopy.title = "License Copy";
        this.docList.push(this.licenseCopy);
      }
    }
    if (this.goodstandingLetter != "" && this.goodstandingLetter != undefined) {
      if ("name" in this.goodstandingLetter) {
        if (this.draftId != undefined) {
          this.documentsArray.splice(
            this.documentsArray.findIndex((e) => e.documentTypeCode === "LHI"),
            1
          );
        }
        this.letterPreview = await this.blobToBase64(this.goodstandingLetter);
        this.goodstandingLetter.docFile = this.letterPreview;
        this.goodstandingLetter.title =
          "Work Experience and Support Letter from Organization";
        this.docList.push(this.goodstandingLetter);
      }
    }
    this.buttons = this.getButtons;
    this.fetchProfileInfo();
    this.setDocs();
    this.getDocumentSpecs();
    this.license = this.getLicense;
    this.applicantId = this.license.applicantId;
    this.applicantTypeId = this.license.applicantTypeId;
    this.professionalTypeIds = this.license.professionalTypeIds;
    this.expertLevelId = this.license.expertLevelId;
    this.buttons = this.getButtons;

    this.otherProfessionalType = this.license.otherProfessionalType;
    this.departmentId = this.license.departmentId;
  },
  data: () => ({
    basePath: "",
    filePreview: "",
    letterPreview: "",
    docList: [],
    documentsArray: [],
    show: false,
    profileInfo: {},
    applicantId: "",
    applicantTypeId: "",
    departmentId: "",
    professionalTypeIds: "",
    expertLevelId: "",
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

    licenseCopy: "",
    goodstandingLetter: "",

    applicationId: "",
    buttons: [],
    documentTypes: [],
    docs: [],

    checkBoxValue: true,
    showCheckBox: false,
  }),
  computed: {
    ...mapGetters({
      getLicense: "goodstanding/getLicense",

      getLicenseCopy: "goodstanding/getLicenseCopy",
      getLetter: "goodstanding/getGoodStandingLetter",

      getButtons: "goodstanding/getButtons",
      getApplicationId: "goodstanding/getApplicationId",
      getDraftData: "goodstanding/getDraft",
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
    blobToBase64(blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    fetchProfileInfo() {
      this.showLoading2 = true;
      this.$store
        .dispatch("goodstanding/getProfile", this.userId)
        .then((res) => {
          setTimeout(() => {
            this.profileInfo = res.data.data;

            this.show = true;
            this.showLoading2 = false;
          }, 10000);
        });
    },
    setDocs() {},

    getDocumentSpecs() {
      const applicationId = this.getApplicationId;
      this.$store
        .dispatch("goodstanding/getDocumentSpecs", applicationId)
        .then((res) => {
          this.documentTypes = res.data.data;
        });
    },
    submitBack() {
      this.$emit("changeActiveStateMinus");
    },
    async submitRequest(act) {
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
          .dispatch("goodstanding/editGoodstandingLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              let licenseId = this.draftId;
              let formData = new FormData();
              formData.append(
                this.documentTypes[1].documentType.code,
                this.licenseCopy
              );
              formData.append(
                this.documentTypes[2].documentType.code,
                this.goodstandingLetter
              );
              let payload = { document: formData, id: licenseId };
              this.$store
                .dispatch("goodstanding/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    this.showFlash = true;
                    this.showLoading = false;
                    setTimeout(() => {}, 1500);
                    this.$router.push({ path: "/menu" });
                  } else {
                    this.showErrorFlash = true;
                  }
                })
                .catch((err) => {});
            }
          });
      } else {
        let formData = new FormData();
        formData.append(
          this.documentTypes[1].documentType.code,
          this.licenseCopy
        );
        formData.append(
          this.documentTypes[2].documentType.code,
          this.goodstandingLetter
        );
        this.licenseInfo = this.getLicense;
        let license = {
          action: action,
          data: {
            applicantId: this.licenseInfo.applicantId,
            applicantTypeId: this.license.applicantTypeId,
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            applicantTitle: this.licenseInfo.applicantTitle,
            whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: this.licenseInfo.licenseIssuedDate,
            whoIssued: this.licenseInfo.whoIssued,
            licenseRegistrationNumber: this.licenseInfo
              .licenseRegistrationNumber,
            applicantPositionId: this.licenseInfo.applicantPositionId,
            professionalTypeIds: this.professionalTypeIds,
            expertLevelId: this.expertLevelId,
            islegal: this.checkBoxValue,
            otherProfessionalType: this.otherProfessionalType,
            departmentId: this.departmentId,
          },
        };
        this.$store
          .dispatch("goodstanding/addGoodstandingLicense", license)
          .then((res) => {
            let licenseId = res.data.data.id;
            let payload = { document: formData, id: licenseId };
            this.$store
              .dispatch("goodstanding/uploadDocuments", payload)
              .then((res) => {
                this.showLoading = false;
                if (res.data.status == "Success") {
                  this.showFlash = true;
                  setTimeout(() => {
                    this.$router.push({ path: "/menu" });
                  }, 3500);
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
          .dispatch("goodstanding/editGoodstandingLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              let licenseId = this.draftId;
              let formData = new FormData();
              formData.append(
                this.documentTypes[1].documentType.code,
                this.licenseCopy
              );
              formData.append(
                this.documentTypes[2].documentType.code,
                this.goodstandingLetter
              );
              let payload = { document: formData, id: licenseId };
              this.$store
                .dispatch("goodstanding/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    this.showFlash = true;
                    this.showLoading = false;
                    setTimeout(() => {}, 1500);
                    this.$router.push({ path: "/menu" });
                  } else {
                    this.showErrorFlash = true;
                  }
                })
                .catch((err) => {});
            }
          });
      } else {
        let formData = new FormData();
        formData.append(
          this.documentTypes[1].documentType.code,
          this.licenseCopy
        );
        formData.append(
          this.documentTypes[2].documentType.code,
          this.goodstandingLetter
        );
        this.licenseInfo = this.getLicense;
        let license = {
          action: action,
          data: {
            applicantId: this.licenseInfo.applicantId,
            applicantTypeId: this.license.applicantTypeId,
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            applicantTitle: this.licenseInfo.applicantTitle,
            whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: this.licenseInfo.licenseIssuedDate,
            whoIssued: this.licenseInfo.whoIssued,
            licenseRegistrationNumber: this.licenseInfo
              .licenseRegistrationNumber,
            applicantPositionId: this.licenseInfo.applicantPositionId,
            professionalTypeIds: this.professionalTypeIds,
            expertLevelId: this.licenseInfo.expertLevel,
            islegal: this.checkBoxValue,
            otherProfessionalType: this.otherProfessionalType,
            departmentId: this.departmentId,
          },
        };
        this.$store
          .dispatch("goodstanding/addGoodstandingLicense", license)
          .then((res) => {
            let licenseId = res.data.data.id;
            let payload = { document: formData, id: licenseId };
            this.$store
              .dispatch("goodstanding/uploadDocuments", payload)
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
      this.licenseInfo = this.getLicense;
      let license = {
        data: {
          action: action,
          data: {
            applicantId: this.licenseInfo.applicantId,
            applicantTypeId: this.license.applicantTypeId,
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            applicantTitle: this.licenseInfo.applicantTitle,
            whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: this.licenseInfo.licenseIssuedDate,
            whoIssued: this.licenseInfo.whoIssued,
            licenseRegistrationNumber: this.licenseInfo
              .licenseRegistrationNumber,
            applicantPositionId: this.licenseInfo.applicantPositionId,
            professionalTypeIds: this.professionalTypeIds,
            expertLevelId: this.licenseInfo.expertLevel,
            islegal: this.checkBoxValue,
            otherProfessionalType: this.otherProfessionalType,
            departmentId: this.departmentId,
          },
        },
        id: this.draftId,
      };

      if (this.draftId != undefined) {
        this.$store
          .dispatch("goodstanding/editGoodstandingLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              this.showFlash = true;
              this.showLoading = false;
              setTimeout(() => {}, 1500);
              this.$router.push({ path: "/menu" });
            } else {
              this.showErrorFlash = true;
            }
          });
      } else {
        this.$store
          .dispatch("goodstanding/addGoodstandingLicense", license.data)
          .then((res) => {
            if (res.data.status == "Success") {
              this.showFlash = true;
              this.showLoading = false;
              setTimeout(() => {}, 1500);
              this.$router.push({ path: "/menu" });
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
      this.$store.dispatch("goodstanding/withdraw", payload).then((res) => {
        if (res) {
          this.showFlash = true;
          this.showLoading = false;
          setTimeout(() => {}, 1500);
          this.$router.push({ path: "/menu" });
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
      }, 10000);
    });
  },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
</style>
