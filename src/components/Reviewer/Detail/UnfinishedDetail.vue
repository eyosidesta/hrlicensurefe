<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="Unfinished" />
    <div class="bg-lightBlueB-200 h-full">
      <div
        v-if="show"
        style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);"
        class="ml-8  mr-8 mb-12"
      >
        <div class="mt-large bg-white">
          <div v-if="getReviewId == loggedInAdminId" class="flex">
            <div class="flex flex-col mb-medium w-2/3 ml-small mt-small"></div>
            <div class="flex flex-col mb-medium w-1/3 mr-small mt-small">
              <label class="text-primary-700">Transfer Review</label>
              <select
                class="max-w-3xl"
                v-model="transfer.reviewerId"
                @change="gen()"
              >
                <option
                  v-for="types in admins"
                  v-bind:key="types.name"
                  v-bind:value="types.id"
                >
                  {{ types.name }}
                </option>
              </select>
              <button
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg mt-small"
                @click="transferReview()"
              >
                Transfer To
              </button>
            </div>
          </div>
          <div class="flex justify-center"><Title message="Summary" /></div>
          <div class="flex justify-start">
            <Title message="Personal Info" />
          </div>
          <div class="flex flex-row">
            <div
              :class="[profileInfo.name === null ? errorClass : activeClass]"
            >
              <label class="ml-8"> Full Name</label>
              <h5 class="ml-8">
                {{
                  profileInfo.name +
                    " " +
                    profileInfo.fatherName +
                    " " +
                    profileInfo.grandFatherName
                }}
              </h5>
            </div>
            <div
              :class="[profileInfo.gender === null ? errorClass : activeClass]"
            >
              <label class="ml-8"> Gender</label>
              <h5 class="ml-8">
                {{ profileInfo.gender ? profileInfo["gender"] : "-" }}
              </h5>
            </div>
            <div
              :class="[
                profileInfo.nationality === null ? errorClass : activeClass,
              ]"
            >
              <label class="ml-8"> Nationality</label>
              <h5 class="ml-8">
                {{ profileInfo.nationality ? profileInfo.nationality.name : "-" }}
              </h5>
            </div>
            <div
              :class="[
                profileInfo.dateOfBirth === null ? errorClass : activeClass,
              ]"
            >
              <label class="ml-8"> Date of Birth</label>
              <h5 class="ml-8">
                {{
                  profileInfo.dateOfBirth
                    ? moment(profileInfo.dateOfBirth).format("MMM D, YYYY")
                    : "-"
                }}
              </h5>
            </div>
            <div
              :class="[
                profileInfo.maritalStatus.name === null
                  ? errorClass
                  : activeClass,
              ]"
            >
              <label class="ml-8"> Marital Status</label>
              <h5 class="ml-8">
                {{
                  profileInfo.maritalStatus.name
                    ? profileInfo.maritalStatus.name
                    : "-"
                }}
              </h5>
            </div>
          </div>

          <div class="flex justify-start" v-if="expertLevelId != 3">
            <Title message="Address" />
          </div>
          <div class="flex flex-row" v-if="expertLevelId != 3">
            <div
              :class="[
                license.woreda === null
                  ? errorClass
                  : license.woreda.zone === null
                  ? errorClass
                  : license.woreda.zone.region === null
                  ? errorClass
                  : activeClass,
              ]"
            >
              <label class="ml-8"> Region</label>
              <h5 class="ml-8">
                {{
                  license.woreda === null
                    ? "-"
                    : license.woreda.zone === null
                    ? "-"
                    : license.woreda.zone.region
                    ? license.woreda.zone.region.name
                    : "-"
                }}
              </h5>
            </div>
            <div
              :class="[
                license.woreda === null
                  ? errorClass
                  : license.woreda.zone === null
                  ? errorClass
                  : activeClass,
              ]"
            >
              <label class="ml-8"> Zone</label>
              <h5 class="ml-8">
                {{
                  license.woreda === null
                    ? "-"
                    : license.woreda.zone
                    ? license.woreda.zone.name
                    : "-"
                }}
              </h5>
            </div>
            <div :class="[license.woreda === null ? errorClass : activeClass]">
              <label class="ml-8"> Wereda</label>
              <h5 class="ml-8">
                {{ license.woreda ? license.woreda.name : "-" }}
              </h5>
            </div>
          </div>
          <div class="flex justify-start">
            <Title message="Contact" />
          </div>
          <div class="flex flex-row">
            <div
              :class="[
                profileInfo.user.phoneNumber === null
                  ? errorClass
                  : activeClass,
              ]"
            >
              <label class="ml-8"> Mobile Number</label>
              <h5 class="ml-8">
                {{
                  profileInfo.user.phoneNumber
                    ? profileInfo.user.phoneNumber
                    : "-"
                }}
              </h5>
            </div>

            <div
              :class="[
                profileInfo.user.emailAddress === null
                  ? errorClass
                  : activeClass,
              ]"
            >
              <label class="ml-8"> Email</label>
              <h5 class="ml-8">
                {{
                  profileInfo.user.emailAddress
                    ? profileInfo.user.emailAddress
                    : "-"
                }}
              </h5>
            </div>
          </div>
          <div class="flex justify-start">
            <Title message="Institution" />
          </div>
          <div class="flex flex-row">
            <div>
              <label class="ml-8"> Institution Name</label>
              <h5 class="ml-8" v-if="education.institutionName">
                {{ education.institutionName }}
              </h5>
            </div>
            <div>
              <label class="ml-8"> Department</label>
              <h5 class="ml-8" v-if="education.departmentName">
                {{ education.departmentName }}
              </h5>
            </div>
            <div>
              <label class="ml-8"> Institution Type</label>
              <h5 class="ml-8" v-if="education.institutionTypeName">
                {{ education.institutionTypeName }}
              </h5>
            </div>
          </div>
          <div class="flex justify-start flex-wrap">
            <!-- <div v-for="file in docs" v-bind:key="file.id">
              <Title class="" :message="file.fieldName" />
              <picture>
                <img :src="basePath + file.filePath" />
              </picture>
            </div> -->
          </div>
          <div v-if="getReviewId == loggedInAdminId">
            <div class="mt-12 flex justify-center">
              <div>
                <button @click="evaluate()">Continue Evaluating</button>
              </div>
            </div>
            <div class="flex justify-center mt-8">
              <h6>
                If you don't have all the required informations you can come
                back and finish later.
              </h6>
            </div>
            <div class="flex justify-center mt-8 mb-8">
              <button variant="outline" @click="backButton">back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Title from "@/sharedComponents/Title";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { ref, onMounted } from "vue";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";

export default {
  props: ["activeState"],
  components: {
    Title,
    ReviewerNavBar,
    Spinner,
  },
  computed: {
    moment: () => moment,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let userId = +localStorage.getItem("userId");
    let regionId = JSON.parse(localStorage.getItem("allAdminData")).regionId;

    let expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;

    let role = ref({});

    let admins = ref({});

    let transfer = ref({
      reviewerId: "",
      licenseId: "",
      createdByAdminId: "",
    });

    let show = ref(false);
    let showLoading = ref(false);
    let license = ref({
      applicant: {},
      applicantType: {},
      education: {
        institution: {
          institutionType: {},
        },
        department: {},
      },
    });
    let profileInfo = ref({
      maritalStatus: {},
      woreda: {
        zone: {},
      },
      user: {},
      userType: {},
    });
    let applicantId = ref("");
    let applicantTypeId = ref("");
    let education = ref({
      institution: { name: "", institutionType: { name: "" } },
      department: { name: "" },
    });
    let licenseId = ref("");
    let activeClass = ref("active");
    let errorClass = ref("text-danger");
    let dataFetched = ref(false);
    let showFlash = ref(false);
    let showErrorFlash = ref(false);
    let profile = ref({});
    let applicationType = ref("");

    let getReviewId = ref(0);

    let loggedInAdminId = +localStorage.getItem("adminId");

    const fetchRole = (id) => {
      store.dispatch("reviewer/getRoles", id).then((res) => {
        role.value = res.data.data.role;
      });
    };

    const fetchAdmins = () => {
      store.dispatch("reviewer/getAdmins").then((res) => {
        admins.value = res.data.data;
      });
    };

    const fetchAdminsByRegion = (regionId) => {
      store.dispatch("reviewer/getAdminsByRegion", regionId).then((res) => {
        admins.value = res.data.data;
      });
    };

    const gen = () => {};

    const transferReview = () => {
      // if (role.value.code === "TL" || role.value.code === "SA") {
      if (applicationType.value == "Good Standing") {
        transfer.value = {
          goodStandingId: route.params.applicationId,
          reviewerId: transfer.value.reviewerId,
          createdByAdminId: +localStorage.getItem("adminId"),
        };
      }
      if (applicationType.value == "Verification") {
        transfer.value = {
          verificationId: route.params.applicationId,
          reviewerId: transfer.value.reviewerId,
          createdByAdminId: +localStorage.getItem("adminId"),
        };
      }
      if (applicationType.value == "Renewal") {
        transfer.value = {
          renewalId: route.params.applicationId,
          reviewerId: transfer.value.reviewerId,
          createdByAdminId: +localStorage.getItem("adminId"),
        };
      }
      if (applicationType.value == "New License") {
        transfer.value = {
          licenseId: route.params.applicationId,
          reviewerId: transfer.value.reviewerId,
          createdByAdminId: +localStorage.getItem("adminId"),
        };
      }
      // }
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/transferLicenseReview", transfer.value)

          .then((response) => {
            if (response.statusText == "Created") {
              showFlash.value = true;
              router.push("/admin/review");
            }
          });
      }
      if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/transferVerificationReview", transfer.value)

          .then((response) => {
            if (response.statusText == "Created") {
              showFlash.value = true;
              router.push("/admin/review");
            }
          });
      }
      if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/transferRenewalReview", transfer.value)

          .then((response) => {
            if (response.statusText == "Created") {
              showFlash.value = true;
              router.push("/admin/review");
            }
          });
      }
      if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/transferGoodStandingReview", transfer.value)

          .then((response) => {
            if (response.statusText == "Created") {
              showFlash.value = true;
              router.push("/admin/review");
            }
          });
      }
    };

    const created = async (applicationTypeName, applicationId, applicantId) => {
      licenseId.value = applicationId;
      applicationType.value = applicationTypeName;
      showLoading.value = true;
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/getNewLicenseApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            getReviewId.value = license.value.reviewerId;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId;
            education.value.departmentName =
              license.value.education.department.name;
            if (license.value.otherEducationalInstitution) {
              education.value.institutionName =
                license.value.otherEducationalInstitution;
            } else {
              education.value.institutionName =
                license.value.education.institution.name;
              education.value.institutionTypeName =
                license.value.education.institution.name;
            }
          });
      }
      if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/getGoodStandingApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            getReviewId.value = license.value.reviewerId;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId;
            education.value.departmentName =
              license.value.education.department.name;
            if (license.value.otherEducationalInstitution) {
              education.value.institutionName =
                license.value.otherEducationalInstitution;
            } else {
              education.value.institutionName =
                license.value.education.institution.name;
              education.value.institutionTypeName =
                license.value.education.institution.name;
            }
          });
      }
      if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/getVerificationApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            getReviewId.value = license.value.reviewerId;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId;
            education.value.departmentName =
              license.value.education.department.name;
            if (license.value.otherEducationalInstitution) {
              education.value.institutionName =
                license.value.otherEducationalInstitution;
            } else {
              education.value.institutionName =
                license.value.education.institution.name;
              education.value.institutionTypeName =
                license.value.education.institution.name;
            }
          });
      }
      if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/getRenewalApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            getReviewId.value = license.value.reviewerId;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId;
            education.value.departmentName =
              license.value.education.department.name;
            if (license.value.otherEducationalInstitution) {
              education.value.institutionName =
                license.value.otherEducationalInstitution;
            } else {
              education.value.institutionName =
                license.value.education.institution.name;
              education.value.institutionTypeName =
                license.value.education.institution.name;
            }
          });
      }
    };

    const evaluate = () => {
      router.push(
        "/admin/evaluate/" + applicationType.value + "/" + licenseId.value
      );
    };
    const backButton = () => {
      router.push(
        "/admin/review"
      )
    }

    onMounted(() => {
      loggedInAdminId = +localStorage.getItem("adminId");
      regionId = JSON.parse(localStorage.getItem("allAdminData")).regionId;
      created(
        route.params.applicationType,
        route.params.applicationId,
        route.params.applicantId
      );

      fetchRole(loggedInAdminId);
      if (regionId !== null) {
        fetchAdminsByRegion(regionId);
      } else {
        fetchAdmins();
      }
    });

    return {
      userId,
      license,
      profileInfo,
      getReviewId,
      loggedInAdminId,
      activeClass,
      errorClass,
      dataFetched,
      showFlash,
      showErrorFlash,
      profile,
      applicantId,
      applicantTypeId,
      education,
      show,
      created,
      evaluate,
      applicationType,
      licenseId,
      showLoading,
      admins,
      role,
      transfer,
      gen,
      transferReview,
      expertLevelId,
      backButton,
    };
  },

  //   this.license = this.getLicense;
  //   this.applicantId = this.license.applicantId;
  //   this.applicantTypeId = this.license.applicantTypeId;
  //   this.education.departmentId = this.license.education.departmentId;
  //   this.education.institutionId = this.license.education.institutionId;
  //   this.docs = this.getDocs.data;
  // },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
</style>
