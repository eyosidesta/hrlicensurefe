<template>
  <ReviewerNavBar tab="Evaluation" />
  <div class="w-screen bg-white flex items-center justify-center">
    <div
      class="w-screen max-w-6xl mt-medium mb-large box-shadow-pop bg-lightGrey-100"
    >
      <div class="flex mb-large mt-medium justify-center">
        <div class="w-64 h-40 container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-lightBlueB-500 text-2xl">9</h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class="text-lightBlueB-500 text-2xl">Accepted</h2>
            </div>
          </div>
        </div>
        <div class="flex justify-start flex-wrap ml-12">
          <div>
            <picture class="flex justify-center items-center mb-small">
              <span v-if="paymentImage">
                <img
                  style="border-radius: 100%"
                  v-bind:src="
                    googleApi + '' +
                      paymentImage
                  "
                  class="img"
                />
              </span>
              <!-- <span v-else> -->
              <!-- <img
                    style="border-radius: 100%"
                    class="box-shadow-pop"
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                  /> -->
              <!-- </span> -->
            </picture>
            <div class="flex justify-center items-center">
              <h4 class="mt-2 mr-small w-1/2">{{ "Name: Eyosias Desta" }}</h4>

              <h4 class="mt-2 ml-small w-1/2">
                {{ "Applicant Type:  Foreiner" }}
              </h4>
            </div>
            <div class="flex justify-center items-cente">
              <h4 class="mt-2 mr-tiny w-1/2">{{ "Department:  Software" }}</h4>
              <h4 class="mt-2 ml-small w-1/2">{{ "Institution:  AAiT" }}</h4>
              <!-- <h4 class="mt-2">{{ "Institution:  " + newLicense.education.institution.name }}</h4> -->
            </div>
            <div class="flex justify-center items-center">
              <div class="mt-2 ml-small w-1/2"></div>
              <h4 class="mt-2 ml-small w-1/2">
                {{ "Institution Type:  Engineering Fac" }}
              </h4>
            </div>
          </div>
        </div>
        <div class="ml-12 w-64 h-40 container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-red-200 text-2xl">9</h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class="text-red-200 text-2xl">Rejected</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col justify-center items-center ml-large">
          <div class="ml-medium">
            <label
              class="justify-center items-center ml-large text-grey-200 text-2xl"
            >
              <!-- {{ documentTypeName }}
              good -->
            </label>
            <!-- <h5 class="ml-8 text-black-100 text-3xl">
              Addis Ababa
            </h5> -->
            <div class="flex justify-start flex-wrap">
              <!-- <div v-for="file in docs" v-bind:key="file.name">
                <Title class="" :message="file.name" />
                <picture>
                  <img :src="basePath + file.filePath" />
                </picture>
              </div> -->
              <!-- <Titile class="" :message="'good'" /> -->
              <div v-if="showLoading">
                <spinner />
              </div>
              <span v-if="paymentImage.length == 0 && !showLoading">
                <div>Document Not Found</div>
              </span>
              <!-- <span v-else> -->
              <picture>
                <img
                  v-bind:src="
                    googleApi + '' +
                      paymentImage
                  "
                />
              </picture>
              <!-- </span> -->
              <!-- {{docs[0].filePath}} -->
            </div>
          </div>
          <!-- <div class="mt-medium" v-if="!showButtons"> -->
          <div
            class="flex justfy-center items-center mt-medium"
            v-if="!showLoading"
          >
            <div
              v-for="button in buttons"
              :key="button.name"
              :value="button.id"
            >
              <button
                variant="outline"
                :class="button.class"
                @click="action(button.action)"
              >
                {{ button.name }}
              </button>
            </div>
            <!-- <button class="mr-medium" @click="accept()">Accept</button>
            <button class="decline" @click="reject()">Reject</button>
            <button
              class=""
              variant="outline"
              @click="action('ReviewerDraftEvent')"
            >
              save as Draft
            </button> -->
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
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { googleApi } from "@/composables/baseURL";

import Modal from "@/sharedComponents/Modal";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import Spinner from "@/sharedComponents/Spinner";

// import created2 from "./Configurations/EvaluatingPayment/PaymentEvaluations";

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

    let applicationTypeName = ref("");
    let paymentImage = ref("");
    let documents = ref({});

    let responseDatas = ref({});

    let showLoading = ref(false);

    let buttons = ref([]);
    let SFValue = ref("");

    const created = async (applicationType, applicationId) => {
      showLoading.value = true;
      applicationTypeName.value = applicationType;
      if (applicationTypeName.value == "New License") {
        store
          .dispatch("reviewer/getNewLicenseApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            responseDatas.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            documents.value = res.data.data.documents;
            for (let doc in documents.value) {
              if (documents.value[doc].documentTypeCode == "SF") {
                SFValue.value = documents.value[doc].documentTypeCode;
                paymentImage.value = documents.value[doc].filePath;
              }
            }
          });
      }
      if (applicationTypeName.value == "Good Standing") {
        store
          .dispatch("reviewer/getGoodStandingApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            responseDatas.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            documents.value = res.data.data.documents;
            for (let doc in documents.value) {
              if (documents.value[doc].documentTypeCode == "SF") {
                SFValue.value = documents.value[doc].documentTypeCode;
                paymentImage.value = documents.value[doc].filePath;
              }
            }
          });
      }
      if (applicationTypeName.value == "Verification") {
        store
          .dispatch("reviewer/getVerificationApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            responseDatas.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            documents.value = res.data.data.documents;
            for (let doc in documents.value) {
              if (documents.value[doc].documentTypeCode == "SF") {
                SFValue.value = documents.value[doc].documentTypeCode;
                paymentImage.value = documents.value[doc].filePath;
              }
            }
          });
      }
      if (applicationTypeName.value == "Renewal") {
        store
          .dispatch("reviewer/getRenewalApplication", applicationId)
          .then((res) => {
            showLoading.value = false;
            responseDatas.value = res.data.data;
            buttons.value = res.data.data.applicationStatus.buttons;
            documents.value = res.data.data.documents;
            for (let doc in documents.value) {
              if (documents.value[doc].documentTypeCode == "SF") {
                SFValue.value = documents.value[doc].documentTypeCode;
                paymentImage.value = documents.value[doc].filePath;
              }
            }
          });
      }
    };

    const action = (actionValue) => {
      if (actionValue == "ApprovePaymentEvent") {
        if (responseDatas.value.acceptedFields == null) {
          responseDatas.value.acceptedFields = [SFValue.value];
        } else {
          responseDatas.value.acceptedFields.push(SFValue.value);
        }
        responseDatas.value.certified = true;
        responseDatas.value.certifiedDate = new Date();
      } else if (actionValue == "DeclinePaymentEvent") {
        if (responseDatas.value.declinedFields == null) {
          responseDatas.value.declinedFields = [SFValue.value];
        } else {
          responseDatas.value.declinedFields.push(SFValue.value);
        }
        responseDatas.value.certified = false;
        responseDatas.value.certifiedDate = null;
      }

      let req = {
        action: actionValue,
        data: responseDatas.value,
      };

      if (applicationTypeName.value == "New License") {
        store.dispatch("reviewer/editNewLicense", req).then((res) => {
          if (res.statusText == "Created") {
            alert("req updated successfully", res.statusText);
            setTimeout(() => {
              router.push("/admin/review");
            }, 3000);
          } else {
            setTimeout(() => {
              alert("something went wrong", res.statusText);
              router.go();
            }, 3000);
          }
        });
      }
    };

    onMounted(() => {
      created(route.params.applicationType, route.params.applicationId);
    });

    return {
      paymentImage,
      showLoading,
      buttons,
      action,
      googleApi
    };
  },
};
</script>
<style>
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
