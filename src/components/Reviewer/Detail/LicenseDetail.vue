<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="AssignedToYou" />
    <div class="bg-lightBlueB-200 h-full">
      <div
        v-if="show"
        style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);"
        class="ml-8  mr-8 mb-12"
      >
        <div class="mt-large bg-white">
          <div v-if="reviewerId == loggedInAdminId" class="flex">
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
              v-if="!showButtons"
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg mt-small"
                @click="transferReview()"
              >
                Transfer To
              </button>
              <div
                v-if="showtransferLoading"
                class="flex justify-center justify-items-center mt-24"
              >
                <Spinner />
              </div>
            </div>
          </div>
          <!-- <div v-else class="flex">
            <div class="flex flex-col mb-medium w-2/3 ml-small mt-small"></div>
            <div class="flex flex-col mb-medium w-1/3 mr-small mt-small">
              <button
                class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
                @click="assignReviewer()"
              >
                Assign to me
              </button>
            </div>
          </div> -->
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
          <div v-if="license.applicationStatus.code === 'RETREV'">
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
                    evaluator.actionEvent
                      ? evaluator.actionEvent
                      : "Not Started"
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
          </div>
          <div class="flex justify-start flex-wrap"></div>
          <div v-if="reviewerId == loggedInAdminId">
            <div class="mt-12 flex justify-center">
              <div>
                <button @click="evaluate()">Start Evaluating</button>
              </div>
            </div>
            <!-- <div class="flex justify-center mt-8">
              <h6>
                If you don't have all the required informations you can come back
                and finish later.
              </h6>
            </div> -->
            <!-- <div class="flex justify-center mt-8 mb-8">
              <button variant="outline">I will finish Later</button>
            </div> -->
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
    <div v-if="showFlash">
      <FlashMessage message="Operation Successful!" />
    </div>
    <div v-if="showErrorFlash">
      <ErrorFlashMessage message="Operation Failed!" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Title from "@/sharedComponents/Title";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import { ref, onMounted } from "vue";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";

export default {
  props: ["activeState"],
  components: {
    Title,
    ReviewerNavBar,
    Spinner,
    FlashMessage,
    ErrorFlashMessage,
  },
  computed: {
    moment: () => moment,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let loading = ref(false);
    let showtransferLoading = ref(false);
    let showButtons = ref(false);

    let role = ref({});

    let admins = ref({});

    let regionId = JSON.parse(localStorage.getItem("allAdminData")).regionId;
    let expertLevelId = JSON.parse(localStorage.getItem("allAdminData"))
      .expertLevelId;

    let evaluators = ref([]);

    let transfer = ref({
      reviewerId: "",
      licenseId: "",
      createdByAdminId: "",
    });

    let userId = ref(null);
    let show = ref(false);
    let license = ref({
      applicant: {},
      applicantType: {},
    });
    let education = ref({
      institution: { name: "", institutionType: { name: "" } },
      department: { name: "" },
    });
    let department = ref({ name: "" });
    let profileInfo = ref({
      maritalStatus: {},
      woreda: {
        zone: {},
      },
      user: {},
      userType: {},
    });
    let applicantId = ref("");
    let licenseId = ref("");
    let applicantTypeId = ref("");
    // let education = ref({
    //   departmentId: "",
    //   institutionId: "",
    //   institutionTypeName: ""
    // });
    let activeClass = ref("active");
    let errorClass = ref("text-danger");
    let dataFetched = ref(false);
    let showFlash = ref(false);
    let showErrorFlash = ref(false);
    let profile = ref({});
    let applicationType = ref("");

    let loggedInAdminId = +localStorage.getItem("adminId");
    let reviewerId = ref(0);

    let showLoading = ref(false);

    const fetchRole = (id) => {
      store.dispatch("reviewer/getRoles", id).then((res) => {
        role.value = res.data.data.role;
      });
    };

    const fetchAdmins = () => {
      store.dispatch("reviewer/getAdmins").then((res) => {
        admins.value = res.data.data.filter(e => {
          return e.id !== loggedInAdminId;
        })
        console.log("admins value is ", admins.value)
      });
    };

    const fetchAdminsByRegion = (regionId) => {
      store.dispatch("reviewer/getAdminsByRegion", regionId).then((res) => {
        admins.value = res.data.data.filter(e => {
          return e.id !== loggedInAdminId
        });
        console.log("admins value is ", admins.value)
      });
    };

    const gen = () => {};

    const transferReview = () => {
      showtransferLoading.value = true;
      showButtons.value = true;
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
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/transferLicenseReview", transfer.value)

          .then((response) => {
            showtransferLoading.value = false;
            if (response.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000);
            } else {
              showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
            }
          })
          .catch((err) => {
            showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
          });
      }
      if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/transferVerificationReview", transfer.value)
          .then((response) => {
            showtransferLoading.value = false;
            if (response.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000)
            } else {
              showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
            }
          }).catch(err => {
            showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
          })
      }
      if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/transferRenewalReview", transfer.value)
          .then((response) => {
            showtransferLoading.value = false;
            if (response.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000)
            } else {
              showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
            }
          }).catch(err => {
            showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
          })
      }
      if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/transferGoodStandingReview", transfer.value)
          .then((response) => {
            showtransferLoading.value = false;
            if (response.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000)
            } else {
              showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
            }
          }).catch(err => {
            showErrorFlash.value = false;
            setTimeOut(() => {
              router.go();
            }, 3000);
          })
      }
    };

    const created = async (applicationTypeName, applicationId, applicantId) => {
      showLoading.value = true;
      licenseId.value = applicationId;
      applicationType.value = applicationTypeName;
      // applicantId.value = applicanttId;
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/getNewLicenseApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            reviewerId.value = license.value.reviewerId;
            evaluators.value = license.value.evaluators;
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
            reviewerId.value = license.value.reviewerId;
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId;
            education.value.departmentName = "-";
            education.value.institutionName = "-";
            education.value.institutionTypeName = "-";
          });
      }
      if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/getVerificationApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            reviewerId.value = license.value.reviewerId;
            evaluators.value = license.value.evaluators;
            show.value = true;
            profileInfo.value = license.value.applicant.profile;
            // applicantId.value = license.value.applicantId.toString();
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
        loading.value = true;
        store
          .dispatch("reviewer/getRenewalApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            license.value = res.data.data;
            reviewerId.value = license.value.reviewerId;
            evaluators.value = license.value.evaluators;
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
      const url =
        "/admin/evaluate" + "/" + applicationType.value + "/" + licenseId.value;
      router.push(url);
    };

    onMounted(() => {
      //userId.value = +localStorage.getItem("userId");
      loggedInAdminId = +localStorage.getItem("adminId");
      regionId = JSON.parse(localStorage.getItem("allAdminData")).regionId;
      userId = 2;

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
      reviewerId,
      loggedInAdminId,
      license,
      profileInfo,
      activeClass,
      errorClass,
      dataFetched,
      showFlash,
      showErrorFlash,
      profile,
      applicantId,
      licenseId,
      applicantTypeId,
      education,
      show,
      showtransferLoading,
      applicationType,
      showLoading,
      role,
      admins,
      transfer,
      gen,
      transferReview,
      created,
      evaluate,
      expertLevelId,
      evaluators,
      showButtons,
    };
  },
};
</script>
<style scoped>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
</style>
