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
          <div id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 ml-medium mr-12">
              <label class="text-primary-700">Applicant Type</label>
              <select
                class="max-w-3xl"
                @change="checkApplicantType(licenseInfo.applicantTypeId)"
                v-model="licenseInfo.applicantTypeId"
              >
                <option
                  v-for="applicant in applicantTypes"
                  v-bind:key="applicant.name"
                  v-bind:value="applicant.id"
                >
                  {{ applicant.name }}
                </option>
              </select>
              <span style="color: red">{{
                licenseInfoErrors.applicantTypeId
              }}</span>
            </div>
            <div class="flex flex-col mb-small w-2/5 mr-12">
              <!-- <label class="text-primary-700">Expert Level</label>
              <select
                class="max-w-3xl"
                @change="checkExpertLevel(licenseInfo.expertLevelId)"
                v-model="licenseInfo.expertLevelId"
              >
                <option
                  v-for="expert in expertLevels"
                  v-bind:key="expert.name"
                  v-bind:value="expert.id"
                >
                  {{ expert.name }}
                </option>
              </select>
              <span style="color: red">{{
                licenseInfoErrors.expertLevelId
              }}</span> -->
            </div>
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
              <span style="color: red">{{
                licenseInfoErrors.education.departmentId
              }}</span>
            </div>
            <div class="flex flex-col mb-medium w-2/5 mr-12">
              <label class="text-primary-700">Educational Institution</label>
              <select v-model="licenseInfo.education.institutionId">
                <option
                  v-for="institution in institutions"
                  v-bind:key="institution.name"
                  v-bind:value="institution.id"
                >
                  {{ institution.name }}
                </option>
              </select>
              <span style="color: red">{{
                licenseInfoErrors.education.institutionId
              }}</span>
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
          <div v-if="showProfessionalTypes" id="main" class="flex pt-8 mt-4">
            <div class="flex flex-col mb-medium w-2/5 mr-12 ml-medium">
              <label class="text-primary-700">Professional Type</label>
              <select
                class="max-w-3xl select"
                multiple
                v-model="licenseInfo.professionalTypeIds"
              >
                <option
                  v-for="types in professionalTypes"
                  v-bind:key="types.name"
                  v-bind:value="types.id"
                >
                  {{ types.name }}
                </option>
              </select>
              <!-- <span style="color: red">{{
                licenseInfoErrors.professionalTypeIds
              }}</span> -->
            </div>
          </div>
        </form>
        <div
          v-if="this.showButtons && !this.draftStatus"
          class="flex justify-center mb-8"
        >
          <button @click="submit">
            Next
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
            Next
          </button>
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
          <button @click="submit">
            Next
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
            Next
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
            Next
          </button>
          <!-- <button @click="draft(this.buttons[0].action)" variant="outline">
            {{ this.buttons[0]["name"] }}
          </button> -->
          <button @click="update(this.buttons[1].action)" variant="outline">
            {{ this.buttons[1]["name"] }}
          </button>
        </div>
        <div class="mt-8">
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
    if (
      this.getLicense ||
      this.getLicense != undefined ||
      this.getLicense != null
    ) {
      let draftData = this.getLicense;
      this.licenseInfo.applicantId = draftData.applicantId;
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      this.licenseInfo.education.departmentId =
        draftData.education.departmentId;
      this.licenseInfo.education.institutionId =
        draftData.education.institutionId;
      this.licenseInfo.professionalTypeIds = draftData.professionalTypeIds;
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (this.licenseInfo.expertLevelId == 3) {
        this.showRegion = false;
      } else {
        this.showRegion = true;
      }
      if (draftData.regionId != undefined || draftData.regionId) {
        this.regionID = draftData.regionId;
        if (draftData.zoneId != undefined || draftData.zoneId) {
          this.zoneID = draftData.zoneId;
          if (
            draftData.residenceWoredaId != undefined ||
            draftData.residenceWoredaId
          ) {
            this.licenseInfo.residenceWoredaId = draftData.residenceWoredaId;
          }
        }
      }
    }
    this.fetchApplicantType();
    this.fetchInstitutions();
    this.fetchDepartments();
    this.fetchRegions();
    this.showLoading = true;
    setTimeout(() => {
      this.buttons = this.getButtons;
      this.showButtons = true;
      this.showLoading = false;
    }, 5000);
    this.draftId = this.$route.params.id;
    if (this.draftId != undefined) {
      setTimeout(() => {
        this.fetchDraft();
      }, 6500);
    }
  },
  computed: {
    ...mapGetters({
      getButtons: "verification/getButtons",
      getDraft: "verification/getDraft",
      getLicense: "verification/getLicense",
    }),
  },
  data: () => ({
    licenseInfo: {
      applicantId: +localStorage.getItem("userId"),
      applicantTypeId: null,
      education: {
        departmentId: null,
        institutionId: null,
      },
      residenceWoredaId: null,
      professionalTypeIds: [],
      expertLevelId: null,
    },
    licenseInfoErrors: {
      applicantTypeId: "",
      education: {
        departmentId: "",
        institutionId: "",
      },
      residenceWoredaId: "",
      regionId: "",
      zoneId: "",
      professionalTypeIds: [],
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
    showProfessionalTypes: false,
  }),

  methods: {
    // checkExpertLevel(expertLevel) {
    //   this.regionID = null;
    //   this.zoneID = null;
    //   this.licenseInfo.residenceWoredaId = null;
    //   if (expertLevel == 4) {
    //     this.showRegion = true;
    //   } else {
    //     this.showRegion = false;
    //   }
    // },
    checkApplicantType(applicantType) {
      this.regionID = null;
      this.zoneID = null;
      this.licenseInfo.residenceWoredaId = null;
      if (expertLevel == 1) {
        this.showRegion = true;
      } else {
        this.showRegion = false;
      }
      if (applicantType == 1) {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
    },
    draft(action) {
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
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            professionalTypeIds: this.licenseInfo.professionalTypeIds,
            expertLevelId: this.licenseInfo.expertLevelId,
          },
        },
        id: this.draftId,
      };
      if (this.draftId != undefined) {
        this.$store
          .dispatch("verification/editVerificationLicense", license)
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
          .dispatch("verification/addVerificationLicense", license.data)
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
            residenceWoredaId: this.licenseInfo.residenceWoredaId,
            professionalTypeIds: this.licenseInfo.professionalTypeIds,
            expertLevelId: this.licenseInfo.expertLevelId,
          },
        },
        id: this.draftId,
      };

      if (this.draftId != undefined) {
        this.$store
          .dispatch("verification/editVerificationLicense", license)
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
          .dispatch("verification/addVerificationLicense", license.data)
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
      this.$store.dispatch("verification/withdraw", payload).then((res) => {
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
        expertLevelId: this.licenseInfo.expertLevelId,
      };
      this.$emit("changeActiveState");
      this.$emit("applicantTypeValue", this.licenseInfo.applicantTypeId);
      this.$store.dispatch("verification/setLicense", license);
    },
    fetchApplicantType() {
      this.$store.dispatch("verification/getApplicantType").then((res) => {
        const results = res.data.data;
        this.applicantTypes = results;
      });
    },
    fetchInstitutions() {
      this.$store.dispatch("verification/getInstitution").then((res) => {
        const results = res.data.data;
        this.institutions = results;
      });
    },
    fetchDepartments() {
      this.$store.dispatch("verification/getDepartmentType").then((res) => {
        const results = res.data.data;
        this.departments = results;
      });
    },
    fetchRegions() {
      this.$store.dispatch("verification/getRegions").then((res) => {
        const regionsResult = res.data;
        this.regionArray = regionsResult.data;
      });
    },

    fetchZones() {
      this.$store
        .dispatch("verification/getZones", this.regionID)
        .then((res) => {
          const zonesResult = res.data;
          this.zoneArray = zonesResult.data;
        });
    },

    fetchWoredas() {
      this.$store
        .dispatch("verification/getWoredas", this.zoneID)
        .then((res) => {
          const woredasResult = res.data;
          this.woredaArray = woredasResult.data;
        });
    },
    fetchProfessionalType(id) {
      this.professionalTypes = [];
      this.showProfessionalTypes = true;
      this.$store
        .dispatch("verification/getProfessionalTypes", id)
        .then((res) => {
          this.professionalTypes = res.data.data;
        });
    },

    validateForm(formData) {
      const errors = {};

      if (!formData.applicantTypeId)
        errors.applicantTypeId = "Applicant Type Required";
      if (!formData.education.departmentId)
        errors.education.departmentId = "Department Required";
      if (!formData.education.institutionId)
        errors.education.institutionId = "Institution Required";
      if (!formData.residenceWoredaId)
        errors.residenceWoredaId = "Woreda Required";
      if (!formData.professionalTypeID)
        errors.professionalTypeID = "Professional Type Required";
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
    fetchDraft() {
      let draftData = this.getDraft;
      this.licenseInfo.applicantId = draftData.applicantId;
      this.licenseInfo.applicantTypeId = draftData.applicantTypeId;
      this.licenseInfo.education.departmentId =
        draftData.education.departmentId;
      this.licenseInfo.education.institutionId =
        draftData.education.institutionId;
      this.licenseInfo.professionalTypeIds = draftData.professionalTypeIds;
      this.licenseInfo.expertLevelId = draftData.expertLevelId;
      if (this.licenseInfo.applicantTypeId == 1) {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("REG");
          });
        });
      } else {
        this.$store.dispatch("verification/getExpertLevel").then((res) => {
          this.expertLevels = res.data.data.filter(function(e) {
            return e.code.includes("FED");
          });
        });
      }
      if (this.licenseInfo.expertLevelId == 3) {
        this.showRegion = false;
      } else {
        this.showRegion = true;
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
      this.$store
        .dispatch("verification/getZones", this.regionID)
        .then((res) => {
          const zonesResult = res.data;
          this.zoneArray = zonesResult.data;
        })
        .then((res) => {
          this.$store
            .dispatch("verification/getWoredas", this.zoneID)
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
