<template>
  <div class="flex justify-center items">
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
        <div class="mt-small">
          <TitleWithIllustration
            illustration="Institution"
            message="Institution"
          />
        </div>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-10">
          <div id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 ml-medium mr-12">
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
            <div class="flex flex-col mb-small w-2/5 mr-12"></div>
          </div>
          <div id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 ml-medium mr-12">
              <label class="text-primary-700">Department</label>
              <select
                class="max-w-3xl"
                v-model="licenseInfo.education.departmentId"
                @change="
                  fetchProfessionalType(licenseInfo.education.departmentId)
                "
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
            <div class="flex flex-col mb-medium w-2/5 mr-12">
              <label class="text-primary-700">Educational Institution</label>
              <select
                v-model="institution"
                @change="checkOtherEducation(institution)"
              >
                <option
                  v-for="institution in institutions"
                  v-bind:key="institution.name"
                  v-bind:value="institution"
                >
                  {{ institution.name }}
                </option>
              </select>
              <span
                v-if="licenseInfoErrors.institutionId !== null"
                style="color: red"
                >{{ licenseInfoErrors.institutionId }}</span
              >
              <input
                v-model="licenseInfo.otherEducationalInstitution"
                v-if="showOtherEducation"
                class="mt-2"
                placeholder="Write Educational Institution"
                type="text"
              />
            </div>
          </div>
          <div v-if="this.showRegion" id="main" class="pt-8 mt-4">
            <div class="flex">
              <div class="flex flex-col mb-medium w-2/5 ml-medium mr-12">
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
              <div class="flex flex-col mb-medium w-2/5 mr-12">
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
              <div class="flex flex-col mb-medium w-2/5 ml-medium mr-12">
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
              </div>
            </div>
          </div>
          <div id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
              <label class="text-primary-700">Education Level </label>
              <select
                class="max-w-3xl"
                @change="setEducationLevel(licenseInfo.educationalLevelId)"
                v-model="licenseInfo.educationalLevelId"
              >
                <option
                  v-for="types in this.educationData"
                  v-bind:key="types.name"
                  v-bind:value="types.id"
                >
                  {{ types.name }}
                </option>
              </select>
              <span
                v-if="licenseInfoErrors.educationalLevelId !== null"
                style="color: red"
                >{{ licenseInfoErrors.educationalLevelId }}</span
              >
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
          <div v-if="this.displayPayrollDoc" id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
              <label class="text-primary-700">Occupation Type</label>
              <select
                class="max-w-3xl"
                @change="setPayrollDoc(licenseInfo.occupationTypeId)"
                v-model="licenseInfo.occupationTypeId"
              >
                <option
                  v-for="types in this.payrollData.data"
                  v-bind:key="types.name"
                  v-bind:value="types.id"
                >
                  {{ types.name }}
                </option>
              </select>
            </div>
          </div>
        </form>
        <div v-if="!showLoading">
          <div
            v-if="this.showButtons && !this.draftStatus"
            class="flex justify-center mb-8"
          >
            <button @click="submit">Apply</button>
            <button @click="draft(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="this.showButtons && this.draftStatus == 'DRA'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">Apply</button>
            <button @click="draft(this.buttons[2].action)" variant="outline">
              {{ this.buttons[2]["name"] }}
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
            v-if="this.showButtons && this.draftStatus == 'SUB'"
            class="flex justify-center mb-8"
          >
            <button @click="submit">Apply</button>
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
            <button @click="submit">Apply</button>
            <button @click="draft(this.buttons[0].action)" variant="outline">
              {{ this.buttons[0]["name"] }}
            </button>
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="
              this.showButtons &&
                (this.draftStatus == 'DEC' || this.draftStatus == 'CONF')
            "
            class="flex justify-center mb-8"
          >
            <button @click="submit">Apply</button>
            <!-- <button @click="draft(this.buttons[0].action)" variant="outline">
            {{ this.buttons[0]["name"] }}
          </button> -->
            <button @click="update(this.buttons[1].action)" variant="outline">
              {{ this.buttons[1]["name"] }}
            </button>
          </div>
        </div>
        <div class="pt-8">
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
import RenewalModal from "../../views/RenewalModal.vue";
export default {
  props: ["activeState"],
  components: {
    TitleWithIllustration,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
    RenewalModal,
  },

  async created() {
    this.draftStatus = this.$route.params.status;
    this.fetchApplicantType();
    this.fetchDepartments();
    this.fetchRegions();
    this.fetchFirstTimeUser();
    this.fetchPayrollData();
    this.fetchEducationLevel();

    this.showLoading = true;
    setTimeout(() => {
      this.buttons = this.getButtons;
      this.showButtons = true;
      this.showLoading = false;
    }, 5000);
    if (this.getLicense && Object.keys(this.getLicense).length != 0) {
      let draftData = this.getLicense;
      this.licenseInfo.applicantId = draftData.applicantId;
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      this.licenseInfo.education.departmentId =
        draftData.education.departmentId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.fetchInstitutions(true);
      } else {
        this.fetchInstitutions(false);
      }
      this.licenseInfo.education.institutionId =
        draftData.education.institutionId;
      this.licenseInfo.educationalLevelId = draftData.educationalLevelId;
      this.licenseInfo.nativeLanguageId = draftData.nativeLanguageId;
      this.setEducationLevel(this.licenseInfo.educationalLevelId);
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.$store.dispatch("renewal/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("renewal/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (this.licenseInfo.applicantTypeId == 1) {
        this.showRegion = true;
      } else {
        this.showRegion = false;
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
      if (this.licenseInfo.education.departmentId != "") {
        this.showProfessionalTypes = true;
        await this.fetchProfessionalType(
          this.licenseInfo.education.departmentId
        );
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
      getButtons: "renewal/getButtons",
      getDraft: "renewal/getDraft",
      getLicense: "renewal/getLicense",
    }),
  },
  data: () => ({
    licenseInfo: {
      applicantId: +localStorage.getItem("userId"),
      applicantTypeId: null,
      education: {
        departmentId: null,
        institutionId: null,
        id: null,
      },
      residenceWoredaId: null,
      professionalTypeIds: [],
      occupationTypeId: null,
      expertLevelId: null,
      educationalLevelId: null,
      otherEducationalInstitution: null,
      otherProfessionalType: null,
      applicationStatusId: null,
    },
    licenseInfoErrors: {
      applicantTypeId: null,
      departmentId: null,
      institutionId: null,
      educationalLevelId: null,
    },
    regionID: "",
    zoneID: "",

    regionArray: [],
    zoneArray: [],
    woredaArray: [],
    expertLevels: [],

    applicantTypes: [],
    institutions: [],
    departments: [],
    buttons: [],
    showButtons: false,
    showFlash: false,
    showErrorFlash: false,
    showLoading: false,
    showRegion: false,

    professionalTypes: [],

    displayPayrollDoc: false,
    payrollDocType: false,

    payrollData: "",
    firstTimeUser: false,

    educationData: [],
    showProfessionalTypes: false,

    professionalTypeRepeat: false,
    professionalTypeLimit: false,
    repeatedProfArray: [],

    institution: "",
    showOtherEducation: false,

    profession: "",
    showOtherProfession: false,
  }),

  methods: {
    fetchPayrollData() {
      this.$store.dispatch("lookups/getGovernment").then((res) => {
        if (res.data.status == "Success") {
          this.payrollData = res.data;
        } else {
        }
      });
    },
    fetchEducationLevel() {
      this.$store.dispatch("lookups/getEducationalLevel").then((res) => {
        if (res.data.status == "Success") {
          this.educationData = res.data.data;
        }
      });
    },
    checkOtherEducation(institution) {
      this.licenseInfo.education.institutionId = institution.id;
      if (institution.name == "Other") {
        this.showOtherEducation = true;
      } else {
        this.showOtherEducation = false;
      }
    },
    checkOtherProfession(profession, event) {
      this.professionalTypeRepeat = false;
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
    checkApplicantType(applicantType) {
      this.regionID = null;
      this.zoneID = null;
      this.licenseInfo.residenceWoredaId = null;
      if (applicantType == 1) {
        this.licenseInfo.expertLevelId = 4;
        this.fetchInstitutions(true);
        this.showRegion = true;
      } else {
        this.licenseInfo.expertLevelId = 3;
        this.fetchInstitutions(false);
        this.showRegion = false;
      }
      if (applicantType == 1) {
        this.$store.dispatch("newlicense/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("newlicense/getExpertLevel").then((res) => {
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
    setEducationLevel(educationLevelId) {
      if (educationLevelId == 1) {
        window.localStorage.setItem("educationalLevel", "diploma");
      } else if (educationLevelId == 2) {
        window.localStorage.setItem("educationalLevel", "degree");
      } else if (educationLevelId == 3) {
        window.localStorage.setItem("educationalLevel", "masters");
      } else {
        window.localStorage.setItem("educationalLevel", "phd");
      }
    },
    setPayrollDoc(id) {
      if (id == 2) {
        window.localStorage.setItem("payroll", "payroll");
      } else {
        window.localStorage.setItem("payroll", "non-payroll");
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
              education: {
                departmentId: this.licenseInfo.education.departmentId,
                institutionId: this.licenseInfo.education.institutionId,
                id: this.licenseInfo.education.id,
              },
              residenceWoredaId: this.licenseInfo.residenceWoredaId,
              professionalTypeIds: this.licenseInfo.professionalTypeIds,
              educationalLevelId: this.licenseInfo.educationalLevelId,
              paymentSlip: null,
              occupationTypeId: this.licenseInfo.occupationTypeId,
              expertLevelId: this.licenseInfo.expertLevelId,
              otherEducationalInstitution: this.licenseInfo
                .otherEducationalInstitution,
              otherProfessionalType: this.licenseInfo.otherProfessionalType,
              applicationStatusId: this.licenseInfo.applicationStatusId,
            },
          },
          id: this.draftId,
        };

        if (this.draftId != undefined) {
          this.$store
            .dispatch("renewal/editRenewalLicense", license)
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
            .dispatch("renewal/addRenewalLicense", license.data)
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
            education: {
              departmentId: this.licenseInfo.education.departmentId,
              institutionId: this.licenseInfo.education.institutionId,
              id: this.licenseInfo.education.id,
            },
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            professionalTypeIds: this.licenseInfo.professionalTypeIds,
            educationalLevelId: this.licenseInfo.educationalLevelId,
            paymentSlip: null,
            occupationTypeId: this.licenseInfo.occupationTypeId,
            expertLevelId: this.licenseInfo.expertLevelId,
            otherEducationalInstitution: this.licenseInfo
              .otherEducationalInstitution,
            otherProfessionalType: this.licenseInfo.otherProfessionalType,
            applicationStatusId: this.licenseInfo.applicationStatusId,
          },
        },
        id: this.draftId,
      };

      if (this.draftId != undefined) {
        this.$store
          .dispatch("renewal/editRenewalLicense", license)
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
          .dispatch("renewal/addRenewalLicense", license.data)
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
      this.$store.dispatch("renewal/withdraw", payload).then((res) => {
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
          education: {
            departmentId: this.licenseInfo.education.departmentId,
            institutionId: this.licenseInfo.education.institutionId,
          },
          regionId: this.regionID,
          zoneId: this.zoneID,
          residenceWoredaId: this.licenseInfo.residenceWoredaId,
          professionalTypeIds: this.licenseInfo.professionalTypeIds,
          educationalLevelId: this.licenseInfo.educationalLevelId,
          paymentSlip: null,
          occupationTypeId: this.licenseInfo.occupationTypeId,
          expertLevelId: this.licenseInfo.expertLevelId,
          otherEducationalInstitution: this.licenseInfo
            .otherEducationalInstitution,
          otherProfessionalType: this.licenseInfo.otherProfessionalType,
        };
        let profTypes = {
          professionalTypeIds: this.licenseInfo.professionalTypeIds,
        };
        if (this.$route.params.status == undefined) {
          this.$store
            .dispatch("renewal/searchProfessionalType", profTypes)
            .then((res) => {
              if (res.data.data.length > 0) {
                this.professionalTypeRepeat = true;
                this.repeatedProfArray = res.data.data;
              } else {
                this.$store.dispatch("renewal/searchNewLicense").then((res) => {
                  if (res.data.data == true) {
                    this.firstTimeUser = false;
                    window.localStorage.setItem(
                      "firstTimeUser",
                      this.firstTimeUser
                    );
                    this.$emit("changeActiveState");
                    this.$emit(
                      "applicantTypeValue",
                      this.licenseInfo.applicantTypeId
                    );
                    this.$emit(
                      "payrollDocumentSet",
                      this.licenseInfo.occupationTypeId
                    );
                    this.$emit("firstTimeUserSet", this.firstTimeUser);
                    this.$emit(
                      "diplomaSet",
                      this.licenseInfo.educationalLevelId
                    );
                    this.$store.dispatch("renewal/setLicense", license);
                  } else {
                    this.firstTimeUser = true;
                    window.localStorage.setItem(
                      "firstTimeUser",
                      this.firstTimeUser
                    );
                    this.$emit("changeActiveState");
                    this.$emit(
                      "applicantTypeValue",
                      this.licenseInfo.applicantTypeId
                    );
                    this.$emit(
                      "payrollDocumentSet",
                      this.licenseInfo.occupationTypeId
                    );
                    this.$emit("firstTimeUserSet", this.firstTimeUser);
                    this.$emit(
                      "diplomaSet",
                      this.licenseInfo.educationalLevelId
                    );
                    this.$store.dispatch("renewal/setLicense", license);
                  }
                });
              }
            });
        } else {
          this.$store.dispatch("renewal/searchNewLicense").then((res) => {
            if (res.data.data == true) {
              this.firstTimeUser = false;
              window.localStorage.setItem("firstTimeUser", this.firstTimeUser);
              this.$emit("changeActiveState");
              this.$emit(
                "applicantTypeValue",
                this.licenseInfo.applicantTypeId
              );
              this.$emit(
                "payrollDocumentSet",
                this.licenseInfo.occupationTypeId
              );
              this.$emit("firstTimeUserSet", this.firstTimeUser);
              this.$emit("diplomaSet", this.licenseInfo.educationalLevelId);
              this.$store.dispatch("renewal/setLicense", license);
            } else {
              this.firstTimeUser = true;
              window.localStorage.setItem("firstTimeUser", this.firstTimeUser);
              this.$emit("changeActiveState");
              this.$emit(
                "applicantTypeValue",
                this.licenseInfo.applicantTypeId
              );
              this.$emit(
                "payrollDocumentSet",
                this.licenseInfo.occupationTypeId
              );
              this.$emit("firstTimeUserSet", this.firstTimeUser);
              this.$emit("diplomaSet", this.licenseInfo.educationalLevelId);
              this.$store.dispatch("renewal/setLicense", license);
            }
          });
        }
      }
    },
    fetchApplicantType() {
      this.$store.dispatch("renewal/getApplicantType").then((res) => {
        const results = res.data.data;
        this.applicantTypes = results;
      });
    },
    fetchInstitutions(value) {
      this.$store.dispatch("renewal/getInstitution", value).then((res) => {
        const results = res.data.data;
        this.institutions = results;
        if (this.getLicense && Object.keys(this.getLicense).length != 0) {
          let draftData = this.getLicense;
          if (draftData.education.institutionId != null) {
            this.licenseInfo.education.institutionId =
              draftData.education.institutionId;
            for (var i = 0; i < this.institutions.length; i++) {
              if (
                this.institutions[i].id ==
                this.licenseInfo.education.institutionId
              ) {
                this.institution = this.institutions[i];
              }
            }
            if (this.institution.name == "Other") {
              this.showOtherEducation = true;
              this.licenseInfo.otherEducationalInstitution =
                draftData.otherEducationalInstitution;
            }
          }
        } else {
          let draftData = this.getDraft;
          if (draftData.education.institutionId != null) {
            this.licenseInfo.education.institutionId =
              draftData.education.institutionId;
            for (var i = 0; i < this.institutions.length; i++) {
              if (
                this.institutions[i].id ==
                this.licenseInfo.education.institutionId
              ) {
                this.institution = this.institutions[i];
              }
            }
            if (this.institution.name == "Other") {
              this.showOtherEducation = true;
              this.licenseInfo.otherEducationalInstitution =
                draftData.otherEducationalInstitution;
            }
          }
        }
      });
    },
    fetchDepartments() {
      this.$store.dispatch("renewal/getDepartmentType").then((res) => {
        const results = res.data.data;
        this.departments = results;
      });
    },
    fetchRegions() {
      this.$store.dispatch("renewal/getRegions").then((res) => {
        const regionsResult = res.data;
        this.regionArray = regionsResult.data;
      });
    },

    fetchZones() {
      this.$store.dispatch("renewal/getZones", this.regionID).then((res) => {
        const zonesResult = res.data;
        this.zoneArray = zonesResult.data;
      });
    },

    fetchWoredas() {
      this.$store.dispatch("renewal/getWoredas", this.zoneID).then((res) => {
        const woredasResult = res.data;
        this.woredaArray = woredasResult.data;
      });
    },
    fetchFirstTimeUser(id) {
      this.$store.dispatch("renewal/getProfessionalTypes").then((res) => {
        this.professionalTypes = res.data.data;
      });
    },
    async fetchProfessionalType(id) {
      this.professionalTypes = [];
      this.repeatedProfArray = "";
      this.licenseInfo.professionalTypeIds = [];
      this.showProfessionalTypes = true;
      await this.$store
        .dispatch("renewal/getProfessionalTypes", id)
        .then((res) => {
          this.professionalTypes = res.data.data;
        });
    },

    woredaChanged() {},
    validateForm(formData) {
      const errors = {};
      if (formData.applicantTypeId == null) {
        errors.applicantTypeId = "Applicant Type Required";
      }
      if (formData.education.departmentId == null) {
        errors.departmentId = "Department Required";
      }
      if (formData.education.institutionId == null) {
        errors.institutionId = "Institution Required";
      }
      if (formData.educationalLevelId == null) {
        errors.educationalLevelId = "Education Level Required";
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
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.fetchInstitutions(true);
      } else {
        this.fetchInstitutions(false);
      }
      this.licenseInfo.education.departmentId =
        draftData.education.departmentId;
      this.licenseInfo.education.institutionId =
        draftData.education.institutionId;
      this.licenseInfo.occupationTypeId = draftData.occupationTypeId;
      this.licenseInfo.educationalLevelId = draftData.educationalLevelId;
      this.licenseInfo.education.id = draftData.education.id;
      this.licenseInfo.applicationStatusId = draftData.applicationStatusId;
      this.setEducationLevel(this.licenseInfo.educationalLevelId);
      this.payrollData = draftData.occupationTypes;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.displayPayrollDoc = true;
        this.$store.dispatch("renewal/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
        this.fetchPayrollData();
        this.licenseInfo.occupationTypeId = draftData.occupationTypeId;
      } else {
        this.$store.dispatch("renewal/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
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
      if (this.licenseInfo.applicantTypeId == 1) {
        this.displayPayrollDoc = true;
      } else {
        this.displayPayrollDoc = false;
      }
      this.$store
        .dispatch("renewal/getZones", this.regionID)
        .then((res) => {
          const zonesResult = res.data;
          this.zoneArray = zonesResult.data;
        })
        .then((res) => {
          this.$store
            .dispatch("renewal/getWoredas", this.zoneID)
            .then((res) => {
              const woredasResult = res.data;
              this.woredaArray = woredasResult.data;
            });
        });
      if (this.licenseInfo.education.departmentId != "") {
        this.showProfessionalTypes = true;
        await this.fetchProfessionalType(
          this.licenseInfo.education.departmentId
        );
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
