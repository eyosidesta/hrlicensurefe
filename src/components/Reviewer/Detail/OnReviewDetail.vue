<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="onReviewDetail" />
    <div class="bg-lightBlueB-200 h-full">
      <div
        v-if="show"
        style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);"
        class="ml-8  mr-8 mb-12"
      >
        <div class="mt-large bg-white">
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
                {{
                  profileInfo.nationality ? profileInfo.nationality.name : "-"
                }}
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
          <div class="flex justify-start">
            <Title message="Status" />
          </div>
          <div class="flex flex-row">
            <div>
              <label class="ml-8"> Evaluator's Name</label>
              <h5 class="ml-8" v-for="evaluator in evaluators">
                {{
                  evaluator.evaluator.name
                    ? evaluator.evaluator.name
                    : "Not Found"
                }}
              </h5>
            </div>
            <div>
              <label class="ml-8"> Action</label>
              <h5 class="ml-8" v-for="evaluator in evaluators">
                {{
                  evaluator.actionEvent ? evaluator.actionEvent : "Not Started"
                }}
              </h5>
            </div>
            <div>
              <label class="ml-8"> Remark? </label>
              <h5 class="ml-8" v-for="evaluator in evaluators">
                {{ evaluator.remark ? evaluator.remark : "" }}
              </h5>
            </div>
          </div>
          <div class="flex justify-start flex-wrap"></div>
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

    let assignConfirmAdmin = ref({
      reviewersId: [],
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
    let evaluators = ref([]);

    let getReviewId = ref(0);

    let loggedInAdminId = +localStorage.getItem("adminId");
    let expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;

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
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
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
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
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
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
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
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
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

    onMounted(() => {
      created(
        route.params.applicationType,
        route.params.applicationId,
        route.params.applicantId
      );
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
      applicationType,
      licenseId,
      showLoading,
      expertLevelId,
      evaluators,
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
