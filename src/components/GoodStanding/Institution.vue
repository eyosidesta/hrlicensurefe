<template>
  <div class="flex justify-center items">
    <div class="bg-lightBlueB-200 w-screen h-screen max-w-4xl">
      <div
        class="flex flex-col pt-large w-full bg-white blue-box-shadow-light rounded"
      >
        <div class="mt-small">
          <TitleWithIllustration
            illustration="Institution"
            message="Institution"
          />
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-10">
          <div id="main" class="mt-4 pt-8 pl-4">
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700">Applicant Type</label>
                <select
                  class="max-w-3xl"
                  v-model="licenseInfo.applicantTypeId"
                  @change="checkApplicantType(licenseInfo.applicantTypeId)"
                >
                  <option
                    v-for="applicant in applicantTypes"
                    v-bind:key="applicant.name"
                    v-bind:value="applicant.id"
                  >
                    {{ applicant.name }}
                  </option>
                </select>
                <span
                  v-if="licenseInfoErrors.applicantTypeId !== null"
                  style="color: red"
                  >{{ licenseInfoErrors.applicantTypeId }}</span
                >
              </div>
              <div class="flex flex-col mb-small w-2/5 mr-12 ml-medium"></div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700">Applicant Title</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="licenseInfo.applicantTitle"
                />
              </div>
              <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
                <label class="text-primary-700">Department</label>
                <select
                  class="max-w-3xl"
                  v-model="licenseInfo.departmentId"
                  @change="fetchProfessionalType(licenseInfo.departmentId)"
                >
                  <option
                    v-for="department in departments"
                    v-bind:key="department.name"
                    v-bind:value="department.id"
                  >
                    {{ department.name }}
                  </option>
                </select>
                <span
                  v-if="licenseInfoErrors.departmentId !== null"
                  style="color: red"
                  >{{ licenseInfoErrors.departmentId }}</span
                >
              </div>
            </div>
            <div
              v-if="showProfessionalTypes"
              class="flex flex-col items-start mb-6"
            >
              <label class="text-primary-700">Professional Type </label>
              <div
                class="flex"
                v-for="types in this.professionalTypes"
                v-bind:key="types.name"
                v-bind:value="types"
              >
                <input
                  v-on:click="checkOtherProfession(types, $event)"
                  type="checkbox"
                  class="bg-gray-50 mr-4 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                  :checked="types.checked"
                />
                <label
                  for="remember"
                  class="font-medium text-gray-900 dark:text-gray-300"
                  >{{ types.name }}</label
                >
              </div>
              <div v-if="professionalTypeRepeat">
                <span
                  style="font-size: 18px; color: red"
                  v-for="prof in this.repeatedProfArray"
                  v-bind:key="prof.name"
                  v-bind:value="prof.id"
                >
                  {{ prof.name }} was previously saved.
                </span>
              </div>
              <div v-if="professionalTypeLimit">
                <span style="font-size: 14px; color: red">
                  You can't select more than 3 professional types.
                </span>
              </div>
              <div>
                <input
                  v-model="licenseInfo.otherProfessionalType"
                  v-if="showOtherProfession"
                  class="mt-2"
                  placeholder="Write Other Profession"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div v-if="this.showRegion" id="main" class="mt-4 pt-8 pl-4">
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700">Region</label>
                <select
                  class="max-w-3xl"
                  v-model="regionID"
                  @change="fetchZones()"
                >
                  <option
                    v-for="types in regionArray"
                    v-bind:key="types.name"
                    v-bind:value="types.id"
                  >
                    {{ types.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
                <label class="text-primary-700">Zone</label>
                <select
                  class="max-w-3xl"
                  @change="fetchWoredas()"
                  v-model="zoneID"
                >
                  <option
                    v-for="types in zoneArray"
                    v-bind:key="types.name"
                    v-bind:value="types.id"
                  >
                    {{ types.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700">Woreda</label>
                <select
                  class="max-w-3xl"
                  v-model="licenseInfo.residenceWoredaId"
                  @change="woredaChanged()"
                >
                  <option
                    v-for="types in woredaArray"
                    v-bind:key="types.name"
                    v-bind:value="types.id"
                  >
                    {{ types.name }}
                  </option>
                </select>
                <span style="color: red">{{
                  licenseInfoErrors.residenceWoredaId
                }}</span>
              </div>
            </div>
          </div>
          <div id="main" class="mt-4 pt-8 pl-4">
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700"
                  >Organization Letter is written for:
                </label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="licenseInfo.whomGoodStandingFor"
                />
                <span style="color: red">{{
                  licenseInfoErrors.whomGoodStandingFor
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
                <label class="text-primary-700">License Issued Date</label>
                <input
                  class="max-w-3xl"
                  type="date"
                  v-model="licenseInfo.licenseIssuedDate"
                />
                <span style="color: red">{{
                  licenseInfoErrors.licenseIssuedDate
                }}</span>
              </div>
            </div>

            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 mr-12">
                <label class="text-primary-700"
                  >Who Issued Previous License</label
                >
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="licenseInfo.whoIssued"
                />
                <span style="color: red">{{
                  licenseInfoErrors.whoIssued
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
                <label class="text-primary-700"
                  >License Registration Number</label
                >
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="licenseInfo.licenseRegistrationNumber"
                />
                <span style="color: red">{{
                  licenseInfoErrors.licenseRegistrationNumber
                }}</span>
              </div>
            </div>
          </div>
          <!-- <div id="main" class="flex mt-4 pt-8 pl-4 mb-medium">
            <div class="flex flex-col mb-medium w-2/5 mr-12">
              <label class="text-primary-700">Applicant Position (Title)</label>
              <select
                class="max-w-3xl"
                v-model="licenseInfo.applicantPositionId"
              >
                <option
                  v-for="applicant in applicationPositions"
                  v-bind:key="applicant.name"
                  v-bind:value="applicant.id"
                >
                  {{ applicant.name }}
                </option>
              </select>
              <span style="color: red">{{
                licenseInfoErrors.applicantPositionId
              }}</span>
            </div>
          </div> -->
        </form>
        <div v-if="!showLoading">
          <div
            v-if="this.showButtons && !this.draftStatus"
            class="flex justify-center mb-8"
          >
            <button @click="submit">
              Apply
            </button>
            <button @click="draft(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="this.showButtons && this.draftStatus == 'DRA'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">
              Apply
            </button>
            <button @click="draft(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
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
            v-if="this.showButtons && this.draftStatus == 'SUB'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">
              Apply
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
            v-if="this.showButtons && this.draftStatus == 'USUP'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">
              Apply
            </button>
            <button @click="draft(this.buttons[0].action)" variant="outline">
              {{ this.buttons[0]["name"] }}
            </button>
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="this.showButtons && this.draftStatus == 'DEC'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">
              Apply
            </button>
            <!-- <button @click="draft(this.buttons[0].action)" variant="outline">
            {{ this.buttons[0]["name"] }}
          </button> -->
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
        </div>
        <div class="mt-12">
          <Spinner v-if="showLoading" />
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
import { mapGetters } from "vuex";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
export default {
  props: ["activeState"],
  components: {
    TitleWithIllustration,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },

  async created() {
    this.draftStatus = this.$route.params.status;
    this.fetchApplicantType();
    this.fetchDepartments();
    this.fetchRegions();
    this.fetchApplicationPositions();
    this.fetchDepartments();
    this.showLoading = true;
    setTimeout(() => {
      this.buttons = this.getButtons;
      this.showButtons = true;
      this.showLoading = false;
    }, 5000);
    if (this.getLicense && Object.keys(this.getLicense).length != 0) {
      let draftData = this.getLicense;
      this.licenseInfo.applicantId = draftData.applicantId;
      this.licenseInfo.applicantTitle = draftData.applicantTitle;
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.fetchInstitutions(true);
      } else {
        this.fetchInstitutions(false);
      }
      this.licenseInfo.whomGoodStandingFor = draftData.whomGoodStandingFor;
      this.licenseInfo.licenseIssuedDate = draftData.licenseIssuedDate;
      this.licenseInfo.whoIssued = draftData.whoIssued;
      this.licenseInfo.licenseRegistrationNumber =
        draftData.licenseRegistrationNumber;
      this.licenseInfo.applicantPositionId = draftData.applicantPositionId;
      this.licenseInfo.nativeLanguageId = draftData.nativeLanguageId;
      this.licenseInfo.professionalTypeIds = draftData.professionalTypeIds;
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
      this.licenseInfo.departmentId = draftData.departmentId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (
        draftData.regionId != undefined ||
        draftData.regionId ||
        draftData.regionId != ""
      ) {
        this.regionID = draftData.regionId;
        this.fetchZones();
        if (draftData.zoneId != undefined || draftData.zoneId) {
          this.zoneID = draftData.zoneId;
          this.fetchWoredas();
          if (
            draftData.residenceWoredaId != undefined ||
            draftData.residenceWoredaId
          ) {
            this.licenseInfo.residenceWoredaId = draftData.residenceWoredaId;
          }
        }
      }
      if (this.licenseInfo.departmentId != "") {
        this.showProfessionalTypes = true;
        await this.fetchProfessionalType(this.licenseInfo.departmentId);
        for (var j = 0; j < this.professionalTypes.length; j++) {
          for (var i = 0; i < draftData.professionalTypeIds.length; i++) {
            if (
              this.professionalTypes[j].id == draftData.professionalTypeIds[i]
            ) {
              this.professionalTypes[j].checked = true;
            }
          }
        }
        for (var k = 0; k < draftData.professionalTypeIds.length; k++) {
          this.licenseInfo.professionalTypeIds.push(
            draftData.professionalTypeIds[k]
          );
        }
      }
      if (
        draftData.otherProfessionalType != null ||
        draftData.otherProfessionalType != ""
      ) {
        this.showOtherProfession = true;
        this.licenseInfo.otherProfessionalType =
          draftData.otherProfessionalType;
      }
    } else if (this.$route.params.id != undefined) {
      this.draftId = this.$route.params.id;
      if (this.draftId != undefined) {
        setTimeout(() => {
          this.fetchDraft();
        }, 6500);
      }
    } else {
    }
  },
  computed: {
    ...mapGetters({
      getButtons: "goodstanding/getButtons",
      getDraft: "goodstanding/getDraft",
      getLicense: "goodstanding/getLicense",
    }),
  },
  data: () => ({
    licenseInfo: {
      applicantId: +localStorage.getItem("userId"),
      applicantTypeId: null,
      departmentId: null,
      residenceWoredaId: null,
      applicantTitle: null,
      whomGoodStandingFor: null,
      licenseIssuedDate: null,
      whoIssued: null,
      licenseRegistrationNumber: null,
      applicantPositionId: null,
      professionalTypeIds: [],
      otherProfessionalType: null,
      applicationStatusId: null,
    },

    licenseInfoErrors: {
      applicantTypeId: null,
      departmentId: null,
    },
    regionID: "",
    zoneID: "",

    regionArray: [],
    zoneArray: [],
    woredaArray: [],
    expertLevels: [],

    applicationPositions: [],
    applicantTypes: [],
    institutions: [],
    departments: [],
    buttons: [],
    showButtons: false,
    showFlash: false,
    showErrorFlash: false,
    showLoading: false,
    showRegion: false,

    professionalTypeRepeat: false,
    repeatedProfArray: [],

    professionalTypes: [],
    showProfessionalTypes: false,
    professionalTypeLimit: false,

    profession: "",
    showOtherProfession: false,
  }),

  methods: {
    checkApplicantType(applicantType) {
      this.regionID = null;
      this.zoneID = null;
      this.licenseInfo.residenceWoredaId = null;
      if (applicantType == 1) {
        this.licenseInfo.expertLevelId = 4;
        this.showRegion = true;
      } else {
        this.licenseInfo.expertLevelId = 3;
        this.showRegion = false;
      }
      if (applicantType == 1) {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (applicantType == 1) {
        this.displayPayrollDoc = true;
      } else {
        this.displayPayrollDoc = false;
      }
    },
    checkOtherProfession(profession, event) {
      if (!event.target.checked) {
        for (var i = 0; i < this.licenseInfo.professionalTypeIds.length; i++) {
          if (this.licenseInfo.professionalTypeIds[i] == profession.id) {
            this.licenseInfo.professionalTypeIds.splice(i, 1);
          }
        }
        if (profession.name == "Other") {
          this.showOtherProfession = false;
        }
      } else if (this.licenseInfo.professionalTypeIds.length + 1 > 3) {
        this.professionalTypeLimit = true;
        event.target.checked = false;
        for (var i = 0; i < this.licenseInfo.professionalTypeIds.length; i++) {
          if (this.licenseInfo.professionalTypeIds[i] == profession.id) {
            this.licenseInfo.professionalTypeIds.splice(i, 1);
          }
        }
      } else {
        this.professionalTypeLimit = false;
        this.repeatedProfArray = [];
        if (profession.name == "Other") {
          this.showOtherProfession = true;
        }
        if (!this.licenseInfo.professionalTypeIds.includes(profession.id)) {
          this.licenseInfo.professionalTypeIds.push(profession.id);
        } else {
          for (
            var i = 0;
            i < this.licenseInfo.professionalTypeIds.length;
            i++
          ) {
            if (this.licenseInfo.professionalTypeIds[i] == profession.id) {
              this.licenseInfo.professionalTypeIds.splice(i, 1);
            }
          }
        }
      }
    },
    draft(action) {
      this.licenseInfoErrors = this.validateForm(this.licenseInfo);
      if (
        this.licenseInfoErrors &&
        Object.keys(this.licenseInfoErrors).length === 0 &&
        Object.getPrototypeOf(this.licenseInfoErrors) === Object.prototype
      ) {
        this.showLoading = true;
        if (this.licenseInfo.professionalTypeIds.length <= 0) {
          this.licenseInfo.professionalTypeIds = [null];
        }
        let license = {
          data: {
            action: action,
            data: {
              applicantId: this.licenseInfo.applicantId,
              applicantTypeId: this.licenseInfo.applicantTypeId,
              residenceWoredaId: this.licenseInfo.residenceWoredaId,
              applicantTitle: this.licenseInfo.applicantTitle,
              whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
              licenseIssuedDate: this.licenseInfo.licenseIssuedDate,
              whoIssued: this.licenseInfo.whoIssued,
              licenseRegistrationNumber: this.licenseInfo
                .licenseRegistrationNumber,
              applicantPositionId: this.licenseInfo.applicantPositionId,
              professionalTypeIds: this.licenseInfo.professionalTypeIds,
              expertLevelId: this.licenseInfo.expertLevelId,
              otherProfessionalType: this.licenseInfo.otherProfessionalType,
              departmentId: this.licenseInfo.departmentId,
              applicationStatusId: this.licenseInfo.applicationStatusId,
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
                setTimeout(() => {
                  this.$router.push({ path: "/menu" });
                }, 1500);
              } else {
                this.showErrorFlash = true;
              }
            });
        } else {
          this.$store
            .dispatch("goodstanding/editGoodstandingLicense", license.data)
            .then((res) => {
              if (res.data.status == "Success") {
                this.showFlash = true;
                this.showLoading = false;
                setTimeout(() => {}, 1500);
                this.$router.push({ path: "/menu" });
              }
            });
        }
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
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            applicantTitle: this.licenseInfo.applicantTitle,
            whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: this.licenseInfo.licenseIssuedDate,
            whoIssued: this.licenseInfo.whoIssued,
            licenseRegistrationNumber: this.licenseInfo
              .licenseRegistrationNumber,
            applicantPositionId: this.licenseInfo.applicantPositionId,
            professionalTypeIds: this.licenseInfo.professionalTypeIds,
            expertLevelId: this.licenseInfo.expertLevelId,
            otherProfessionalType: this.licenseInfo.otherProfessionalType,
            departmentId: this.licenseInfo.departmentId,
            applicationStatusId: this.licenseInfo.applicationStatusId,
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
          .dispatch("goodstanding/editGoodstandingLicense", license.data)
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
        data: this.getDraft,
      };
      let payload = {
        licenseId: this.getDraft.id,
        withdrawData: withdrawObj,
      };
      this.$store.dispatch("goodstanding/withdraw", payload).then((res) => {
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
    },
    submit() {
      this.licenseInfoErrors = this.validateForm(this.licenseInfo);
      if (
        this.licenseInfoErrors &&
        Object.keys(this.licenseInfoErrors).length === 0 &&
        Object.getPrototypeOf(this.licenseInfoErrors) === Object.prototype
      ) {
        let license = {
          applicantId: this.licenseInfo.applicantId,
          applicantTypeId: this.licenseInfo.applicantTypeId,
          residenceWoredaId: this.licenseInfo.residenceWoredaId,
          applicantTitle: this.licenseInfo.applicantTitle,
          whomGoodStandingFor: this.licenseInfo.whomGoodStandingFor,
          licenseIssuedDate:
            this.licenseInfo.licenseIssuedDate + " 17:23:50.228+01",
          whoIssued: this.licenseInfo.whoIssued,
          licenseRegistrationNumber: this.licenseInfo.licenseRegistrationNumber,
          applicantPositionId: this.licenseInfo.applicantPositionId,
          professionalTypeIds: this.licenseInfo.professionalTypeIds,
          expertLevelId: this.licenseInfo.expertLevelId,
          otherProfessionalType: this.licenseInfo.otherProfessionalType,
          regionId: this.regionID,
          zoneId: this.zoneID,
          departmentId: this.licenseInfo.departmentId,
        };
        this.addressErrors = this.validateForm(license);
        let empty = true;
        if (empty == true) {
          this.$emit("changeActiveState");
          this.$emit("applicantTypeValue", this.licenseInfo.applicantTypeId);
          this.$store.dispatch("goodstanding/setLicense", license);
        }
      }
    },
    fetchApplicantType() {
      this.$store.dispatch("goodstanding/getApplicantType").then((res) => {
        const results = res.data.data;
        this.applicantTypes = results;
      });
    },
    fetchInstitutions() {
      this.$store.dispatch("goodstanding/getInstitution").then((res) => {
        const results = res.data.data;
        this.institutions = results;
      });
    },
    fetchDepartments() {
      this.$store.dispatch("goodstanding/getDepartmentType").then((res) => {
        const results = res.data.data;
        this.departments = results;
      });
    },
    fetchApplicationPositions() {
      this.$store.dispatch("goodstanding/getApplicantPosition").then((res) => {
        const applicationPositions = res.data.data;
        this.applicationPositions = applicationPositions;
      });
    },
    fetchRegions() {
      this.$store.dispatch("goodstanding/getRegions").then((res) => {
        const regionsResult = res.data;
        this.regionArray = regionsResult.data;
      });
    },
    fetchZones() {
      this.$store
        .dispatch("goodstanding/getZones", this.regionID)
        .then((res) => {
          const zonesResult = res.data;
          this.zoneArray = zonesResult.data;
        });
    },
    fetchWoredas() {
      this.$store
        .dispatch("goodstanding/getWoredas", this.zoneID)
        .then((res) => {
          const woredasResult = res.data;
          this.woredaArray = woredasResult.data;
        });
    },
    async fetchProfessionalType(id) {
      this.professionalTypes = [];
      this.repeatedProfArray = "";
      this.licenseInfo.professionalTypeIds = [];
      this.showProfessionalTypes = true;
      await this.$store
        .dispatch("goodstanding/getProfessionalTypes", id)
        .then((res) => {
          this.professionalTypes = res.data.data;
        });
    },
    validateForm(formData) {
      const errors = {};
      if (formData.applicantTypeId == null) {
        errors.applicantTypeId = "Applicant Type Required";
      }
      if (formData.departmentId == null) {
        errors.departmentId = "Department Required";
      }
      return errors;
    },

    isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }

      return true;
    },
    async fetchDraft() {
      let draftData = this.getDraft;
      this.licenseInfo.applicantId = draftData.applicantId;
      this.licenseInfo.applicantTitle = draftData.applicantTitle;
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      this.licenseInfo.whomGoodStandingFor = draftData.whomGoodStandingFor;
      this.licenseInfo.licenseIssuedDate = draftData.licenseIssuedDate;
      this.licenseInfo.whoIssued = draftData.whoIssued;
      this.licenseInfo.licenseRegistrationNumber =
        draftData.licenseRegistrationNumber;
      this.licenseInfo.applicantPositionId = draftData.applicantPositionId;
      this.licenseInfo.professionalTypeIds = draftData.professionalTypeIds;
      this.licenseInfo.departmentId = draftData.departmentId;
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
      this.licenseInfo.applicationStatusId = draftData.applicationStatusId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("goodstanding/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (this.licenseInfo.expertLevelId == 4) {
        this.showRegion = true;
      } else {
        this.showRegion = false;
      }
      if (draftData.woreda || draftData.woreda != undefined) {
        this.licenseInfo.residenceWoredaId = draftData.woreda.id;
        if (draftData.woreda.zone || draftData.woreda.zone != undefined) {
          this.zoneID = draftData.woreda.zone.id;
          if (
            draftData.woreda.zone.region ||
            draftData.woreda.zone.region != undefined
          ) {
            this.regionID = draftData.woreda.zone.region.id;
          }
        }
      }
      if (this.licenseInfo.departmentId != "") {
        this.showProfessionalTypes = true;
        await this.fetchProfessionalType(this.licenseInfo.departmentId);
        this.showOtherProfession = false;
        for (var k = 0; k < draftData.professionalTypes.length; k++) {
          if (
            draftData.professionalTypes[k].professionalTypes.name == "Other"
          ) {
            this.showOtherProfession = true;
            break;
          }
        }
        this.professionalTypes.map((profData) => {
          for (var j = 0; j < draftData.professionalTypes.length; j++) {
            if (
              profData.id == draftData.professionalTypes[j].professionalTypeId
            ) {
              profData.checked = true;
            }
            if (profData.name == "Other") {
              this.showOtherProfession = true;
            } else {
              this.showOtherProfession = false;
            }
          }
          return profData;
        });
      }
      if (draftData.professionalTypes.length > 0) {
        for (var k = 0; k < draftData.professionalTypes.length; k++) {
          this.licenseInfo.professionalTypeIds.push(
            draftData.professionalTypes[k].professionalTypeId
          );
        }
      }
      if (
        draftData.otherProfessionalType != null ||
        draftData.otherProfessionalType != ""
      ) {
        this.showOtherProfession = true;
        this.licenseInfo.otherProfessionalType =
          draftData.otherProfessionalType;
      }
      this.$store
        .dispatch("goodstanding/getZones", this.regionID)
        .then((res) => {
          const zonesResult = res.data;
          this.zoneArray = zonesResult.data;
        })
        .then((res) => {
          this.$store
            .dispatch("goodstanding/getWoredas", this.zoneID)
            .then((res) => {
              const woredasResult = res.data;
              this.woredaArray = woredasResult.data;
            });
        });
    },
  },
};
</script>

<style>
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
#main {
  border: 1px solid #cccccc;
  border-radius: 5px;
}
</style>
