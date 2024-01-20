<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="recentlyFinished" />
    <div class="bg-lightBlueB-200 h-full">
      <div
        v-if="show"
        style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)"
        class="ml-8 mr-8 mb-12"
      >
        <div class="mt-large bg-white">
          <span
            v-if="
              isGoodStanding &&
                (license.applicationStatus.code === 'AP' ||
                  license.applicationStatus.code === 'APP') &&
                myRegion
            "
          >
            <button @click="GenerateLetter">Generate Letter</button>
          </span>
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
          <!-- <div class="flex justify-start">
            <Title message="Institution" />
          </div>
          <div class="flex flex-row">
            <div>
              <label class="ml-8"> Institution Name</label>
              <h5 class="ml-8">{{ education.institutionName }}</h5>
            </div>
            <div>
              <label class="ml-8"> Department</label>
              <h5 class="ml-8">{{ education.departmentName }}</h5>
            </div>
            <div>
              <label class="ml-8"> Institution Type</label>
              <h5 class="ml-8">{{ education.institutionTypeName }}</h5>
            </div>
          </div> -->
          <div class="flex justify-start flex-wrap"></div>
        </div>
      </div>
    </div>
    <span
      v-if="showLoading"
      class="flex justify-center justify-items-center mt-24"
    >
      <Spinner />
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Title from "@/sharedComponents/Title";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { mapGetters } from "vuex";
import { ref, onMounted } from "vue";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";
import jsPDF from "jspdf";

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
    let myRegion = ref(true);
    const expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;

    const adminRegionId = JSON.parse(localStorage.getItem("allAdminData"))
      .regionId;

    let show = ref(false);

    let showLoading = ref(false);
    let isUserApproved = ref(false);

    let isGoodStanding = ref(false);

    let goodStandingUser = ref({});
    let gender = ref("");
    let userProfile = ref({
      name: "",
      fatherName: "",
      grandFatherName: "",
    });
    let applicantPosition = ref("-");

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
      departmentId: "",
      institutionId: "",
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

    const GenerateLetter = () => {
      if (
        license.value.applicationStatus.code !== "AP" &&
        license.value.applicationStatus.code !== "APP"
      ) {
        // if user is not approved don't generate a good standing letter
        return;
      }

      const doc = new jsPDF({ orientation: "landscape" });
      const pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth;
      doc.setFontSize(20);
      doc.setFont("times", "bold");
      doc.text(40, 58, "To: " + license.value.whomGoodStandingFor + ".");
      doc.setFontSize(14);

      const letter = "LETTER OF GOOD STANDING";
      doc.text(letter, pageWidth / 2, 75, { align: "center" });
      const letterPosition = pageWidth / 2 - doc.getTextWidth(letter) / 2;
      doc.line(
        letterPosition,
        77,
        letterPosition + doc.getTextWidth(letter),
        77
      );
      doc.setFontSize(15);

      doc.setFont("times", "normal");
      doc.text(
        40,
        90,
        "This letter of good standing and " +
          "confirmation of registration is written" +
          " upon request of " +
          license.value.applicantTitle +
          " " +
          userProfile.value.name +
          " " +
          userProfile.value.fatherName +
          " " +
          userProfile.value.grandFatherName +
          "."
      );
      doc.text(
        40,
        100,
        userProfile.value.name +
          " " +
          userProfile.value.fatherName +
          " " +
          userProfile.value.grandFatherName +
          " " +
          "was registered as " +
          applicantPosition.value
           +
              " " +
              moment(license.value.licenseIssuedDate).format("MMMM D, YYYY") +
              " by " +
              license.value.whoIssued +
              ","
      );
      doc.text(
        40,
        110,
        `which is the responsible organ for registration and licensing of health professionals and ${
          gender.value == "male" ? "his" : "her"
        } registration`
      );
      doc.text(
        40,
        120,
        `number is ${license.value.licenseRegistrationNumber}.`
      );
      doc.text(
        40,
        130,
        `${
          gender.value == "male" ? "he" : "she"
        } has no any reported medico legal records and malpractices while ${
          gender.value == "male" ? "he" : "she"
        } has practiced ${
          gender.value == "male" ? "his" : "her"
        } medical profession`
      );
      doc.text(
        40,
        140,
        `in Ethiopia till ${moment(new Date()).format("MMMM DD, YYYY")}.`
      );
      doc.text(
        40,
        165,
        `Hence we appreciate any assistance, which will be rendered to ${
          gender.value == "male" ? "him" : "her"
        }.`
      );
      doc.text(40, 185, "With best regards");
      window.open(doc.output("bloburl"));
    };

    const created = async (applicationTypeName, applicationId, status) => {
      if (status === "approved" && applicationTypeName === "Good Standing") {
        isUserApproved.value = true;
      }
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
            goodStandingUser.value = res.data.data;
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
        isGoodStanding.value = true;
        store
          .dispatch("reviewer/getGoodStandingApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            goodStandingUser.value = res.data.data;
            if (
              goodStandingUser.value.woreda != null &&
              goodStandingUser.value.woreda.zone != null &&
              goodStandingUser.value.woreda.zone.region != null
            ) {
              if (
                adminRegionId != goodStandingUser.value.woreda.zone.region.id
              ) {
                myRegion.value = false;
              }
            } else {
              if (expertLevelId != goodStandingUser.value.expertLevelId) {
                myRegion.value = false;
              }
            }
            gender.value = res.data.data.applicant.profile.gender;
            if (res.data.data.applicant.profile) {
              userProfile.value.name = res.data.data.applicant.profile.name
                ? res.data.data.applicant.profile.name
                : "";
              userProfile.value.fatherName = res.data.data.applicant.profile
                .fatherName
                ? res.data.data.applicant.profile.fatherName
                : "";
              userProfile.value.grandFatherName = res.data.data.applicant
                .profile.grandFatherName
                ? res.data.data.applicant.profile.grandFatherName
                : "";
            }
            if(res.data.data.applicantPosition) {
              applicantPosition.value = res.data.data.applicantPosition.name ? res.data.data.applicantPosition.name : "-"
            }
            getReviewId.value = license.value.reviewerId;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // education.value.departmentName =
            //   license.value.education.department.name;
            // education.value.institutionName =
            //   license.value.education.institution.name;
            // education.value.institutionTypeName =
            //   license.value.education.institution.name;
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
        route.params.status
      );
    });

    return {
      license,
      profileInfo,
      activeClass,
      errorClass,
      dataFetched,
      getReviewId,
      showFlash,
      showErrorFlash,
      profile,
      applicantId,
      applicantTypeId,
      education,
      show,
      created,
      showLoading,
      applicationType,
      licenseId,
      isUserApproved,
      isGoodStanding,
      GenerateLetter,
      myRegion,
      expertLevelId,
    };
  },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
</style>
