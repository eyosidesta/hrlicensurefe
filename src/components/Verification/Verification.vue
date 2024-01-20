<template>
  <div class="overflow-x-hidden overflow-y-scroll">
    <Navigation />
    <div
      class="w-screen h-full pb-xl bg-lightBlueB-200 flex items-center justify-center"
    >
      <div class="w-screen max-w-4xl mt-medium">
        <div class="flex flex-col w-full  rounded mb-large">
          <h2 class="flex justify-center pb-medium">
            Verification
          </h2>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 1">
              <Institution
                :activeState="1"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
              />
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 2">
              <LicenseCopy
                :activeState="2"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
              />
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 3">
              <VerificationLetter
                :activeState="3"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
              />
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 4">
              <VerificationSummary
                :activeState="4"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
              />
            </div>
          </transition>
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
import Navigation from "@/views/Navigation";
import Institution from "./Institution.vue";
import VerificationSummary from "./VerificationSummary";
import VerificationLetter from "./LetterFromOrg";
import LicenseCopy from "./LicenseCopy";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
export default {
  created() {
    this.draftId = this.$route.params.id;
    this.draftStatus = this.$route.params.status;
    if (this.draftId != undefined) {
      this.fetchDraft(this.draftId);
    }
    this.fetchApplicationStatuses();
    this.fetchApplicationCategory();
  },
  data: () => ({
    activeState: 1,
    applicationStatuses: "",
    applicationCategories: "",
    documentSpecs: "",
    buttons: [],
    applicationId: "",
    draftId: "",
    draftStatus: "",
    showFlash: false,
    showErrorFlash: false,
    showLoading: false,
    declinedFields: [],
    acceptedFields: [],
    remark: "",
  }),
  components: {
    Navigation,
    Institution,
    VerificationSummary,
    VerificationLetter,
    LicenseCopy,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  methods: {
    submit(n) {
      this.activeState = n;
    },
    fetchApplicationStatuses() {
      this.$store
        .dispatch("verification/getApplicationStatuses")
        .then((res) => {
          const results = res.data.data;
          this.applicationStatuses = results;
          if (this.draftId != undefined) {
            if (this.draftStatus == "DRA") {
              let status = this.applicationStatuses.filter(function(e) {
                return e.code == "DRA";
              });
              this.buttons = status[0]["buttons"];

              let temp2 = "";
              temp2 = this.buttons[1];
              this.buttons[1] = this.buttons[2];
              this.buttons[2] = temp2;
            }
            if (this.draftStatus == "SUB") {
              let status = this.applicationStatuses.filter(function(e) {
                return e.code == "SUB";
              });
              this.buttons = status[0]["buttons"];
              let temp = "";
              temp = this.buttons[1];
              this.buttons[1] = this.buttons[2];
              this.buttons[2] = temp;
              let temp2 = "";
              temp2 = this.buttons[0];
              this.buttons[0] = this.buttons[2];
              this.buttons[2] = temp2;
            }
            if (this.draftStatus == "USUP") {
              let status = this.applicationStatuses.filter(function(e) {
                return e.code == "USUP";
              });
              this.buttons = status[0]["buttons"];
            }
            if (this.draftStatus == "DEC") {
              let status = this.applicationStatuses.filter(function(e) {
                return e.code == "DEC";
              });
              this.buttons = status[0]["buttons"];
              let temp3 = "";
              temp3 = this.buttons[1];
              this.buttons[1] = this.buttons[2];
              this.buttons[2] = temp3;
            }
          } else {
            let status = this.applicationStatuses.filter(function(e) {
              return e.code == "INIT";
            });
            this.buttons = status[0]["buttons"];
          }
          this.$store.dispatch("verification/setButtons", this.buttons);
        });
    },
    fetchApplicationCategory() {
      this.$store
        .dispatch("verification/getApplicationCategories")
        .then((res) => {
          const results = res.data.data;
          this.applicationCategories = results;
          const newApplicationData = this.applicationCategories.filter(
            (item) => {
              return item.name == "Verification";
            }
          );
          this.applicationId = newApplicationData[0]["id"];
          this.$store.dispatch(
            "verification/setApplicationId",
            this.applicationId
          );
          this.fetchDocumentSpec();
        });
    },
    fetchDocumentSpec() {
      this.$store
        .dispatch("verification/getDocumentSpecs", this.applicationId)
        .then((res) => {
          const results = res.data.data;
          this.documentSpecs = results;
          this.$store
            .dispatch("verification/setDocumentSpecs", this.documentSpecs)
            .then((res) => {});
        });
    },
    fetchDraft(id) {
      this.$store.dispatch("verification/getDraft", id).then((res) => {
        const results = res.data.data;
        this.declinedFields = results.declinedFields;
        this.acceptedFields = results.acceptedFields;
        this.remark = results.remark;
        this.$store.dispatch("verification/setDraft", results);
        this.$store.dispatch(
          "verification/storeDeclinedFields",
          this.declinedFields
        );
        this.$store.dispatch(
          "verification/storeAcceptedFields",
          this.acceptedFields
        );
        this.$store.dispatch("verification/storeRemark", this.remark);
      });
    },
  },
};
</script>
<style>
#navg a {
  margin-left: 20px;
  height: 45px;
  width: 45px;
  background-color: #d1d5db;
  color: white;
  border-radius: 100%;
  display: inline-block;
}
#navg a:hover {
  background-color: #2f639d;
  cursor: pointer;
}
#navg a:visited {
  background-color: #2f639d;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-out ease-in;
}
</style>
