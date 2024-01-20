<template>
  <ReviewerNavBar tab="Evaluation" />
  <div class="w-screen bg-white flex items-center justify-center">
    <div
      class="w-screen max-w-6xl mt-medium mb-large box-shadow-pop bg-lightGrey-100"
    >
      <div class="flex mb-large mt-medium justify-center">
        <div class="flex justify-start flex-wrap ml-12">
          <div>
            <picture
              class="flex justify-center items-center mb-small"
              v-if="docs.length > 0"
            >
              <span
                v-if="
                  newLicense.applicant.profile.photo !== '' &&
                    newLicense.applicant.profile.photo !== null
                "
              >
                <img
                  :src="newLicense.applicant.profile.photo"
                  alt="profile picture"
                  class="w-20 h-12"
                />
              </span>
              <span v-else>
                <img
                  class="box-shadow-pop"
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                />
              </span>
            </picture>
            <div class="flex justify-center items-center">
              <h4 class="mt-2 mr-small w-1/2">
                {{
                  "Name: " +
                    newLicense.applicant.profile.name +
                    " " +
                    newLicense.applicant.profile.fatherName
                }}
              </h4>

              <!-- <h4 class="mt-2 ml-small w-1/2" v-if="newLicense.applicantType !== null">
                {{ "Applicant Type:  " + newLicense.applicantType.name }}
              </h4> -->
            </div>
            <div
              class="flex justify-center items-cente"
              v-if="newLicense.education !== undefined"
            >
              <h4 class="mt-2 mr-tiny w-1/2">
                {{ "Department:  " + newLicense.education.department.name }}
              </h4>
              <h4 class="mt-2 ml-small w-1/2">
                {{ "Institution:  " + newLicense.education.institution.name }}
              </h4>
            </div>
            <div
              class="flex justify-center items-center"
              v-if="newLicense.education !== undefined"
            >
              <div class="mt-2 ml-small w-1/2"></div>
              <h4 class="mt-2 ml-small w-1/2">
                {{
                  "Institution Type:  " + newLicense.education.institution
                    ? newLicense.education.institution.name
                    : "-"
                }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col justify-center items-center ml-large ">
          <div class="ml-medium">
            <label
              class="justify-center items-center ml-large text-grey-200 text-2xl"
            >
              {{ documentTypeName }} Payment Slip => {{ newLicense.paymentSlip}} ETB
            </label>

            <div class="flex justify-start flex-wrap">
              <picture v-if="docs.length > 0">
                <div v-if="docs[0].fileName.split('.')[1] == 'pdf'">
                  <div>
                    <iframe
                      v-bind:src="
                        googleApi + '' +
                          docs[0].filePath
                      "
                    ></iframe>
                  </div>
                  <br />
                  <a @click="openPdfInNewTab(docs[0].filePath)"
                    >see pdf in detail</a
                  >
                </div>

                <div v-else>
                  <img
                    v-bind:src="
                      googleApi + '' +
                        docs[0].filePath
                    "
                  />
                </div>
              </picture>
              <div
                class="flex content-center justify-center pb-large"
                v-if="docs.length == 0"
              >
                <h2>No Documents To Show!!</h2>
              </div>
              <!-- {{docs[0].filePath}} -->
            </div>
          </div>

          <div>
            <div
              class="ml-10 h-3 relative max-w-xl rounded-full overflow-hidden"
            >
              <div class="w-full h-full absolute"></div>
              <div
                id="bar"
                class="transition-all ease-out duration-1000 h-full bg-green-500 relative w-0"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center mb-medium">
        <!-- <div class="flex">
          <button  class="" variant="outline" @click="action(buttons[0].action)">{{buttons[0].name}}</button>
          <button class="" variant="outline" @click="action(buttons[2].action)">{{buttons[2].name}}</button>
          <div>
            <div class="flex"> 
              <button class="" @click="action(buttons[3].action)">{{buttons[3].name}}</button>
              <button class="decline display bg-red-200" @click="action(buttons[1].action)">{{buttons[1].name}}</button>
            </div>
          </div>
        </div> -->
        <div
          v-for="button in buttons"
          v-bind:key="button.name"
          v-bind:value="button.id"
        >
          <button
            variant="outline"
            v-bind:class="button.class"
            @click="action(button.action)"
          >
            {{ button.name }}
          </button>
        </div>
        <div
          v-if="showLoading"
          class="flex justify-center justify-items-center mt-24"
        >
          <Spinner />
        </div>
      </div>
      <div v-if="showFlash">
        <FlashMessage message="Operation Successful!" />
      </div>
      <div v-if="showErrorFlash">
        <ErrorFlashMessage message="Operation Failed!" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";
import { googleApi } from "@/composables/baseURL";

import Modal from "@/sharedComponents/Modal";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import Spinner from "@/sharedComponents/Spinner";

export default {
  components: {
    Modal,
    FlashMessage,
    ErrorFlashMessage,
    ReviewerNavBar,
    Spinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    let showLoading = ref(false);

    let isPdf = ref(false);

    let pdfFilePath = ref("");

    const newLicense = ref({
      applicant: { profile: { name: "", fatherName: "" } },
      applicantType: { name: "" },
      education: {
        department: { name: "" },
        institution: { institutionType: {}, name: "" },
      },
      declinedFields: "",
      remark: "",
      documents: [{ filePath: "" }],
      applicationStatus: {
        buttons: [{ action: "", name: "" }],
      },
    });
    let buttons = ref([
      { action: "", name: "" },
      { action: "", name: "" },
    ]);
    let modalDocumentTypeName = ref("");
    let docs = ref([]);
    let index = ref(0);
    let ind = ref(0);
    let showButtons = ref(false);
    let applicationType = ref("");
    let applicantId = ref("");
    let showFlash = ref(false);
    let showErrorFlash = ref(false);
    let showDeclineFlash = ref(false);
    let evaluateRoute = ref(
      "/admin/evaluate/" +
        route.params.applicationType +
        "/" +
        route.params.applicationId
    );
    const created = async (applicationTypeName, applicationId) => {
      applicationType.value = applicationTypeName;
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/getNewLicenseApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            docs.value = res.data.data.documents.filter((file) => {
              return file.documentTypeCode == "SF";
            });
          });
      } else if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/getRenewalApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            docs.value = res.data.data.documents.filter((file) => {
              return file.documentTypeCode == "SF";
            });
          });
      } else if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/getGoodStandingApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            applicantId.value = res.data.data.applicantId;
            buttons.value = res.data.data.applicationStatus.buttons;
            docs.value = res.data.data.documents.filter((file) => {
              return file.documentTypeCode == "SF";
            });
          });
      }
    };

    const action = (actionValue) => {
      showLoading.value = true;
      if (actionValue == "ApprovePaymentEvent") {
        newLicense.value.certified = true;
        newLicense.value.certifiedDate = new Date();
      }
      let req = {
        action: actionValue,
        data: newLicense.value,
      };
      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/editNewLicense", req)
          .then((res) => {
            showLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
          });
      } else if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/editRenewal", req)
          .then((res) => {
            showLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
          });
      } else if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/editVerification", req)
          .then((res) => {
            showLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
          });
      } else if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/editGoodStanding", req)
          .then((res) => {
            showLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              let redirectUrl = "/admin/review";
              if (req.action == "ApprovePaymentEvent") {
                redirectUrl =
                  "/admin/finishedDetail/" +
                  route.params.applicationType +
                  "/" +
                  route.params.applicationId +
                  "/" +
                  applicantId.value;
              }
              setTimeout(() => {
                router.push(`${redirectUrl}`);
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
          });
      }
    };

    const openPdfInNewTab = (pdfPath) => {
      pdfFilePath.value = pdfPath;
      window.open(
        googleApi + "" + pdfPath,
        "_blank"
      );
    };

    onMounted(() => {
      created(route.params.applicationType, route.params.applicationId);
    });
    return {
      isPdf,
      newLicense,
      index,
      docs,
      buttons,
      action,
      showLoading,
      showButtons,
      applicationType,
      showFlash,
      showErrorFlash,
      showDeclineFlash,
      ind,
      modalDocumentTypeName,
      evaluateRoute,
      pdfFilePath,
      openPdfInNewTab,
      googleApi
    };
  },
};
</script>
<style>
/* .pdfSize {
  width: 400px;
  height: 400px;
} */
.md-danger {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
}
a:hover {
  cursor: pointer;
}
.card-wrapper {
  width: 920px;
  height: 680px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}
.modalBody {
  max-width: 620px !important;
  max-height: 420px !important;
}
.imageViewer {
  width: 320px;
  height: 320px !important;
}
.tArea {
  width: 620px;
}

.img {
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 120px;
  height: 120px;
  border-color: steelblue;
  background-color: steelblue;
}

#accepte {
  border-color: tomato;
}
svg:hover {
  color: #000000;
  cursor: pointer;
}
.decline {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
}
@media only screen and (max-height: 1081px) {
  .card-wrapper {
    height: 640px;
  }
  .modalBody {
    max-width: 820px !important;
    max-height: 360px !important;
  }
  .imageViewer {
    width: 220px;
    height: 320px !important;
  }
  .tArea {
    width: 720px;
    height: 95px;
  }
  /* .tArea:focus {
    border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
    box-shadow: 0 0 0 3px hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) +
          40%), 0.8);
    outline: 3px solid transparent;
  } */
}
</style>
