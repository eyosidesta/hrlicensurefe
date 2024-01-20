<template>
  <ReviewerNavBar tab="ConfirmReview" />
  <div class="w-screen bg-white flex items-center justify-center">
    <div
      class="w-screen max-w-6xl mt-medium mb-large box-shadow-pop bg-lightGrey-100"
    >
      <div class="flex mb-large mt-medium justify-center">
        <div class="w-64 h-40 container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-lightBlueB-500 text-2xl">
                {{ accepted.length }}
              </h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class=" text-lightBlueB-500 text-2xl">Accepted</h2>
            </div>
          </div>
        </div>
        <div class="flex justify-start flex-wrap ml-12">
          <div>
            <picture class="flex justify-center items-center mb-small">
              <!-- <img
                style="border-radius: 100%"
                v-bind:src="
                  'https://storage.googleapis.com/hris-lisence-dev/ +
                    'docs[1].filePath'
                "
                class="img"
              /> -->
              <img
                class="box-shadow-pop avaterImage"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              />
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

              <h4 class="mt-2 ml-small w-1/2">
                {{ "Applicant Type:  " + newLicense.applicantType.name }}
              </h4>
            </div>
            <div class="flex justify-center items-cente">
              <h4 class="mt-2 mr-tiny w-1/2">
                {{ "Department:  " + newLicense.education.department.name }}
              </h4>
              <h4 class="mt-2 ml-small w-1/2">
                Institution: {{newLicense.otherEducationalInstitution
                    ? newLicense.otherEducationalInstitution
                    : newLicense.education.institution.name
                }}
              </h4>
              <!-- <h4 class="mt-2">{{ "Institution:  " + newLicense.education.institution.name }}</h4> -->
            </div>
            <div class="flex justify-center items-center">
              <div class="mt-2 ml-small w-1/2"></div>
              <h4 class="mt-2 ml-small w-1/2">
                {{
                  "Institution Type:  " +
                    newLicense.education.institution.name
                }}
              </h4>
            </div>
          </div>
        </div>
        <div class="ml-12 w-64 h-40  container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-red-200 text-2xl">{{ rejected.length }}</h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class=" text-red-200 text-2xl">Rejected</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="">
          <svg
            width="40"
            height="60"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            @click="previous()"
            v-if="index != 0"
          >
            <polyline
              points="30 10 10 30 30 50"
              stroke="rgba(103,128,159,1)"
              stroke-width="3"
              stroke-linecap="butt"
              fill="none"
              stroke-linejoin="round"
            >
              &gt;
            </polyline>
          </svg>
        </div>

        <div class="flex flex-col justify-center items-center ml-large ">
          <div class="ml-medium">
            <label
              class="justify-center items-center ml-large text-grey-200 text-2xl"
            >
              <!-- <div
                v-if="
                  newLicense.documents[index].documentTypeCode ===
                    accepted[index]
                "
              > -->
              {{ documentTypeName }} | </label>
              <label
                :class="
                  'justify-center items-center text-' + 
                  approvedColor + 
                  ' text-2x1'
                "
              >
                {{ approvedOrRejected }}
              <!-- </div> -->
              <!-- <div
                v-else-if="
                  newLicense.documents[index].documentTypeCode ===
                    rejected[index]
                "
              >
                good license || Rejected
              </div> -->
            </label>
            <div class="flex justify-start flex-wrap">
              <picture v-if="docs.length > 0">
                <img
                  v-bind:src="
                    googleApi + '' +
                      docs[index].filePath
                  "
                />
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
          <!-- <div class="mt-medium" v-if="!showButtons">
            <button class="mr-medium" @click="accept(docs[index])">
              Accept
            </button>
            <button class="decline" @click="reject(docs[index])">Reject</button>
            <button
              class=""
              variant="outline"
              @click="action('ReviewerDraftEvent')"
            >
              save as Draft
            </button>
          </div> -->
          <div class="relative pt-1 mt-medium">
            <div
              class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-grey-100 w-screen max-w-2xl"
            >
              <div
                :style="width"
                class="shadow-none flex flex-col text-center whitespace-nowrap  justify-center bg-primary-400"
              ></div>
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

        <div class="ml-large">
          <svg
            width="40"
            height="60"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            @click="next(docs[index + 1])"
            v-if="index != docs.length && !lastIndex"
            class="hover:text-primary-60"
          >
            <polyline
              points="10 10 30 30 10 50"
              stroke="rgba(103,128,159,1)"
              stroke-width="3"
              stroke-linecap="butt"
              fill="none"
              stroke-linejoin="round"
            >
              &gt;
            </polyline>
          </svg>
        </div>
      </div>
      <div
        class="flex justify-center items-center mb-medium"
        v-if="showButtons && !showLoadingButtons"
      >
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
      </div>
      <div
        v-if="showLoadingconfirmed"
        class="flex content-center justify-center"
      >
        <Spinner />
      </div>
      <Modal v-if="showRemark">
        <div>
          <div
            class="card-wrapper bg-white sm:rounded-lg w-full flex justify-center relative mb-xl mt-large"
          >
            <div class="">
              <!--content-->
              <div class="w-full">
                <!--header-->
                <div
                  class="flex items-start justify-between border-b border-solid border-blueGray-200 mt-medium rounded-t"
                >
                  <h3 class="text-3xl font-semibold">
                    Remark
                  </h3>
                  <div
                    class=" bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    v-on:click="toggleModal()"
                  >
                    <span
                      class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                    >
                      ×
                    </span>
                  </div>
                </div>
                <!--body-->
                <div class="modalBody pb-xl">
                  <div class="flex mt-medium justify-center"></div>
                  <div class="relative p-6 flex-auto w-full">
                    <div class="flex justify-center">
                      <!-- <div class="">
                        <svg
                          width="40"
                          height="60"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          @click="previousRemark()"
                          v-if="ind != 0"
                        >
                          <polyline
                            points="30 10 10 30 30 50"
                            stroke="rgba(103,128,159,1)"
                            stroke-width="3"
                            stroke-linecap="butt"
                            fill="none"
                            stroke-linejoin="round"
                          >
                            &gt;
                          </polyline>
                        </svg>
                      </div> -->

                      <div
                        class="flex flex-col justify-center items-center ml-large"
                      >
                        <div class="ml-medium">
                          <!-- <label
                            class="justify-center items-center ml-large text-grey-200 text-2xl"
                          >
                            {{ modalDocumentTypeName }}
                          </label> -->
                          <!-- <div
                            class="flex justify-center flex-wrap max-w-sm rounded overflow-hidden"
                          >
                            <picture
                              class="imageViewer"
                              v-if="rejectedObj.length > 0"
                            >
                              <img
                                v-bind:src="
                                  googleApi + '' +
                                    rejectedObj[ind].filePath
                                "
                              />
                            </picture>
                          </div> -->
                        </div>
                      </div>

                      <!-- <div class="ml-large">
                        <svg
                          width="40"
                          height="60"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          @click="nextRemark()"
                          v-if="ind != rejected.length - 1"
                          class="hover:text-primary-60"
                        >
                          <polyline
                            points="10 10 30 30 10 50"
                            stroke="rgba(103,128,159,1)"
                            stroke-width="3"
                            stroke-linecap="butt"
                            fill="none"
                            stroke-linejoin="round"
                          >
                            &gt;
                          </polyline>
                        </svg>
                      </div> -->
                    </div>
                  </div>
                </div>
                <!--footer -->
                <textarea
                  v-model="newLicense.remark"
                  class="resize-none tArea border rounded-md flex mb-small w-full"
                ></textarea>
                <div
                  class="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b"
                >
                  <button
                    class="md-danger"
                    type="button"
                    v-on:click="toggleModal()"
                  >
                    Close
                  </button>
                  <button type="button" v-on:click="submitRemark()">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            v-if="showModal"
            class="opacity-25 fixed inset-0 z-40 bg-black"
          ></div> -->
          <div class="mr-3xl" v-if="evaluationSuccess">
            <FlashMessage message="Operation Successful!" />
          </div>
          <div v-if="showErrorFlash">
            <ErrorFlashMessage message="Operation Failed!" />
          </div>
        </div>
      </Modal>
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
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
    const router = useRouter();
    const store = useStore();

    const adminId = +localStorage.getItem("adminId");

    let approvedOrRejected = ref("");

    let evaluationSuccess = ref(false);
    let approvedColor = ref("lightBlueB-500");
    let showLoadingconfirmed = ref(false);
    let showLoadingButtons = ref(false);

    let accepted = ref([]);
    let req = ref({});
    let rejected = ref([]);
    let rejectedObj = ref([]);
    let amount = ref(1);
    let width = ref("width:11.11111%");
    let showButtons = ref(false);
    let isAccepted = ref(false);
    let showRemark = ref(false);
    let showFlash = ref(false);
    let showErrorFlash = ref(false);
    let lastIndex = ref(false);
    let sendDeclinedData = ref(true);
    let fromModalSendDeclinedData = ref(false);
    let documentTypes = ref([]);
    let documentTypeName = ref("");
    let modalDocumentTypeName = ref("");
    let evaluateData = ref({actionEvent: "", 
            remark: ""});
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
      evaluators: [{}],
      applicationStatus: {
        buttons: [{ action: "", name: "" }],
      },
    });

    let applicationType = ref("");

    let buttons = ref([{ action: "", name: "" }]);
    let docs = ref([]);
    let index = ref(0);
    let ind = ref(0);
    let filedsLength = ref(0);

    const created = async (applicationTypeName, applicationId) => {
      applicationType.value = applicationTypeName;

      if (applicationType.value === "Verification") {
        createdApplication("getVerificationApplication", applicationId);
      }
      if (applicationType.value === "Good Standing") {
        createdApplication("getGoodStandingApplication", applicationId);
      }
      if (applicationType.value === "New License") {
        createdApplication("getNewLicenseApplication", applicationId);
      }
      if (applicationType.value === "Renewal") {
        createdApplication("getRenewalApplication", applicationId);
      }
    };

    const createdApplication = (applicationType, applicationId) => {
      store
        .dispatch("reviewer/" + applicationType, applicationId)
        .then((res) => {
          newLicense.value = res.data.data;
          buttons.value = res.data.data.applicationStatus.buttons;
          if (applicationType == "getVerificationApplication") {
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (allButtons) => {
                return allButtons.name != "Under supervision";
              }
            );
            buttons.value.forEach((button) => {
              button.name === "Approve"
                ? (button.name = "Verify")
                : (button.name = button.name);
            });
          }
          docs.value = res.data.data.documents;
          if ((newLicense.value.applicationStatus.code = "APP")) {
            accepted.value = newLicense.value.acceptedFields;
            rejected.value = newLicense.value.declinedFields;
            rejectedObj.value = newLicense.value.declinedFields;
            filedsLength.value = accepted.value.length + rejected.value.length;
            amount.value = ((index.value + 1) / docs.value.length) * 100;
            width.value = "width: " + amount.value + "%";
            if (
              accepted.value.includes(
                docs.value[index.value].documentTypeCode
              ) ||
              rejected.value.includes(docs.value[index.value].documentTypeCode)
            ) {
              findDocumentType(documentTypes.value, docs.value[index.value]);
            }
          }
        });
    };

    const fetchDocumentTypes = async () => {
      store.dispatch("reviewer/getDocumentTypes").then((res) => {
        documentTypes.value = res.data.data;
      });
    };

    const next = (doc) => {
      if (index.value == docs.value.length - 1) {
        showButtons.value = true;
        lastIndex.value = true;
      } else {
        index.value = index.value + 1;
        amount.value = ((index.value + 1) / docs.value.length) * 100;
        width.value = "width:" + amount.value + "%";
        findDocumentType(documentTypes.value, docs.value[index.value]);
      }
    };

    const previous = (doc) => {
      index.value = index.value - 1;
      lastIndex.value = false;
      amount.value = ((index.value - 1) / docs.value.length) * 100;
      width.value = "width:" + amount.value + "%";
      findDocumentType(documentTypes.value, docs.value[index.value]);
      showButtons.value = false;
    };

    const action = (actionValue) => {
      newLicense.value.declinedFields = rejected.value;
      newLicense.value.acceptedFields = accepted.value;
      evaluateData.value = newLicense.value.evaluators;
      evaluateData.value = evaluateData.value.filter((evaluate) => {
        return evaluate.evaluatorId == adminId;
      });
      evaluateData.value[0].actionEvent = actionValue;
      if (actionValue == "ReturnToReviewerEvent") {
        showRemark.value = true;
        sendDeclinedData.value = false;
        if (fromModalSendDeclinedData.value == true) {
          sendDeclinedData.value = true;
        }
        evaluateData.value[0].remark = newLicense.value.remark;
      }
      
      req.value = {
        ...evaluateData.value[0],
      };
      if (sendDeclinedData.value == true) {
        if (applicationType.value == "Verification") {
          evaluateApplication("evaluatVerification", req.value);
        }
        if (applicationType.value == "Renewal") {
          evaluateApplication("evaluateRenewal", req.value);
        }
        if (applicationType.value == "Good Standing") {
          evaluateApplication("evaluateGoodStanding", req.value);
        }
        if (applicationType.value == "New License") {
          evaluateApplication("evaluateNewLicense", req.value);
        }
      }
    };

    const evaluateApplication = (applicationType, req) => {
      showLoadingconfirmed.value = true;
      showLoadingButtons.value = true;
        store.dispatch("reviewer/" + applicationType, req).then((res) => {
          showLoadingconfirmed.value = false;
          if (res.statusText == "Created") {
            showFlash.value = true;
            evaluationSuccess.value = true;
            setTimeout(() => {
              router.push("/admin/review");
            }, 2000);
          } else {
            showErrorFlash.value = true;
            setTimeout(() => {
              router.go();
            }, 2000);
          }
        });
    };

    const toggleModal = () => {
      showRemark.value = !showRemark.value;
    };
    const submitRemark = () => {
      showRemark.value = !showRemark.value;
      fromModalSendDeclinedData.value = true;
      action("ReturnToReviewerEvent");
    };

    const nextRemark = () => {
      if (ind.value != rejectedObj.value.length - 1) {
        ind.value = ind.value + 1;
        modalFindDocumentType(
          documentTypes.value,
          rejectedObj.value[ind.value]
        );
      }
    };
    const previousRemark = () => {
      ind.value = ind.value - 1;
      modalFindDocumentType(documentTypes.value, rejectedObj.value[ind.value]);
    };
    const findDocumentType = (obj, ab) => {
      approvedOrRejected.value = "Approved";
      approvedColor.value = "lightBlueB-500";
      for (var prop in obj) {
        if (obj[prop].code == ab.documentTypeCode) {
          documentTypeName.value = obj[prop].name;
        }
        for (var rejected in rejectedObj.value) {
          if (ab.documentTypeCode == rejectedObj.value[rejected]) {
            approvedColor.value = "red-200";
            approvedOrRejected.value = "Rejected";
          }
        }
      }
    };

    const modalFindDocumentType = (obj, ab) => {
      for (var prop in obj) {
        if (obj[prop].code == ab) {
          modalDocumentTypeName.value = obj[prop].name;
        }
      }
    };

    onMounted(() => {
      created(route.params.applicationType, route.params.applicationId);
      fetchDocumentTypes();
      findDocumentType(documentTypes.value, docs.value[0]);
    });
    return {
      accepted,
      rejected,
      rejectedObj,
      newLicense,
      index,
      ind,
      buttons,
      docs,
      amount,
      width,
      showButtons,
      showRemark,
      isAccepted,
      lastIndex,
      sendDeclinedData,
      fromModalSendDeclinedData,
      documentTypes,
      documentTypeName,
      modalDocumentTypeName,
      evaluationSuccess,
      showLoadingconfirmed,
      showFlash,
      showErrorFlash,
      next,
      previous,
      action,
      toggleModal,
      submitRemark,
      nextRemark,
      previousRemark,
      findDocumentType,
      modalFindDocumentType,
      approvedColor,
      approvedOrRejected,
      showLoadingButtons,
      googleApi
    };
  },
};
</script>

<style>
.avaterImage {
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  border-color: steelblue;
  background-color: steelblue;
}
.md-danger {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
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
