<template>
  <div class="flex justify-center">
    <div class="bg-lightBlueB-200 w-screen h-screen max-w-4xl">
      <div
        class="flex flex-col pt-large w-full bg-white blue-box-shadow-light rounded "
      >
        <h2
          class="flex justify-center"
          v-if="declinedFieldsCheck"
          style="color: #e63636"
        >
          REJECTED
        </h2>
        <h6
          style="font-weight: bold;"
          class="flex justify-center ml-4 mr-4"
          v-if="declinedFieldsCheck"
        >
          Remark: <span class="ml-2" style="color: #e63636"> {{ remark }}</span>
        </h6>
        <h2
          class="flex justify-center"
          v-if="acceptedFieldsCheck"
          style="color: Green"
        >
          ACCEPTED
        </h2>
        <TitleWithIllustration
          illustration="Certificate"
          message="License Copy"
          class="mt-8"
        />
        <span class="flex justify-center">{{ documentMessage }}</span>
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-8">
          <div class="flex justify-center">
            <div>
              <span>
                <h2 v-if="!fileSizeExceed">{{ licenseFile.name }}</h2>
                <h2 v-if="!fileSizeExceed">{{ fileSize }}</h2>
                <h3 style="color: red" v-if="fileSizeExceed">
                  File size must be less than {{ maxSizeMB }} MB
                </h3>
              </span>
              <span v-if="showUpload">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="licenseFile"
                      class="photoFile"
                      ref="licenseFileP"
                      v-on:change="handleFileUpload()"
                      style="margin-bottom: 15px !important;"
                    />
                    <p>
                      Drag your file(s) here to begin<br />
                      or click to browse
                    </p>
                  </div>
                </label>
              </span>

              <picture v-if="!showUpload && isImage">
                <p>
                  <a href="javascript:void(0)" @click="reset()">Upload again</a>
                </p>
                <img v-bind:src="filePreview" v-show="showPreview" />
              </picture>

              <span v-if="!showUpload && !isImage">
                <img :src="filePreview" alt="" class="preview" />
              </span>
            </div>
          </div>
        </form>
        <div v-if="!message.showLoading">
          <div v-if="buttons && !draftStatus" class="flex justify-center mb-8">
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <button @click="draft(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'DRA'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <button @click="draft(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
            <button
              class="withdraw"
              @click="withdraw(buttons[2].action)"
              variant="outline"
            >
              {{ buttons[2]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'SUB'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <button
              class="withdraw"
              @click="withdraw(buttons[2].action)"
              variant="outline"
            >
              {{ buttons[2]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'USUP'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <button @click="draft(buttons[0].action)" variant="outline">
              {{ buttons[0]["name"] }}
            </button>
            <button @click="update(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
          <div
            v-if="buttons && draftStatus == 'DEC'"
            class="flex justify-center mb-8"
          >
            <button @click="submitBack">
              Back
            </button>
            <button @click="submit">
              Next
            </button>
            <!-- <button @click="draft(buttons[0].action)" variant="outline">
            {{ buttons[0]["name"] }}
          </button> -->
            <button @click="update(buttons[1].action)" variant="outline">
              {{ buttons[1]["name"] }}
            </button>
          </div>
        </div>

        <div v-if="message.showLoading">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  <div class="mr-3xl" v-if="message.showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="message.showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TitleWithIllustration from "@/sharedComponents/TitleWithIllustration";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import MESSAGE from "../../composables/documentMessage";
import MAX_FILE_SIZE from "../../composables/documentMessage";
import MAX_SIZE_MB from "../../composables/documentMessage";
import { googleApi } from "@/composables/baseURL";

export default {
  components: {
    TitleWithIllustration,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  props: ["activeState"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let message = ref({
      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
    });

    let fileSize = ref("");

    let licenseFile = ref("");
    let licenseFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(false);
    let isPdf = ref(false);
    let dataChanged = ref(false);
    let buttons = ref([]);
    let documentSpecs = ref([]);
    let userId = +localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");
    let draftStatus = ref("");

    let licenseCopyBack = ref("");

    let documentMessage = ref("");
    let maxFileSize = ref("");
    let maxSizeMB = ref("");
    let fileSizeExceed = ref(false);

    let declinedFields = ref([]);
    let acceptedFields = ref([]);
    let remark = ref("");

    let declinedFieldsCheck = ref(false);
    let acceptedFieldsCheck = ref(false);

    let goodStandingLetter = ref("");

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      licenseFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      fileSize.value = "";
      isPdf.value = false;
    };
    const handleFileUpload = () => {
      licenseFile.value = licenseFileP.value.files[0];
      let reader = new FileReader();
      isImage.value = true;
      let fileS = licenseFile.value.size;
      if (fileS <= maxFileSize.value / 1000) {
        fileSizeExceed.value = false;
        dataChanged.value = true;
        showUpload.value = false;
        if (fileS > 0 && fileS < 1000) {
          fileSize.value += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          fileSize.value = fileS / 1000 + "kB";
        } else {
          fileSize.value = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            showPreview.value = true;
            filePreview.value = reader.result;
          },
          false
        );
        if (licenseFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(licenseFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(licenseFile.value);
          } else if (/\.(pdf)$/i.test(licenseFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(licenseFile.value);
          }
        }
      } else {
        fileSizeExceed.value = true;
        licenseFile.value = "";
        isImage.value = true;
      }
    };
    buttons = store.getters["goodstanding/getButtons"];
    documentSpecs = store.getters["goodstanding/getDocumentSpec"];
    licenseInfo = store.getters["goodstanding/getLicense"];
    goodStandingLetter = store.getters["goodstanding/getGoodStandingLetter"];
    remark = store.getters["goodstanding/getRemark"];

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("goodstanding/set_License_Copy", licenseFile);
    };

    const submitBack = () => {
      emit("changeActiveStateMinus");
      store.dispatch("goodstanding/set_License_Copy", licenseFile);
    };

    onMounted(() => {
      documentMessage.value = MESSAGE.DOC_MESSAGE;
      maxFileSize.value = MAX_FILE_SIZE.MAX_FILE_SIZE;
      maxSizeMB.value = MAX_SIZE_MB.MAX_SIZE_MB;
      licenseCopyBack = store.getters["goodstanding/getLicenseCopy"];
      if (
        licenseCopyBack &&
        licenseCopyBack !== undefined &&
        licenseCopyBack !== null &&
        licenseCopyBack !== ""
      ) {
        dataChanged.value = true;
        showUpload.value = false;
        licenseFile.value = licenseCopyBack;
        let reader = new FileReader();
        let fileS = licenseFile.value.size;
        if (fileS > 0 && fileS < 1000) {
          fileSize.value += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          fileSize.value = fileS / 1000 + "kB";
        } else {
          fileSize.value = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          function() {
            showPreview.value = true;
            filePreview.value = reader.result;
          },
          false
        );
        if (licenseFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(licenseFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(licenseFile.value);
          } else if (/\.(pdf)$/i.test(licenseFile.value.name)) {
            isImage.value = false;
            isPdf.value = true;
            reader.readAsDataURL(licenseFile.value);
          }
        }
      }
      declinedFields = store.getters["goodstanding/getDeclinedFields"];
      acceptedFields = store.getters["goodstanding/getAcceptedFields"];
      if (declinedFields != undefined && declinedFields.includes("LC")) {
        declinedFieldsCheck.value = true;
      }
      if (acceptedFields != undefined && acceptedFields.includes("LC")) {
        acceptedFieldsCheck.value = true;
      }
      buttons = store.getters["goodstanding/getButtons"];
      draftData = store.getters["goodstanding/getDraft"];
      if (route.params.id) {
        draftStatus.value = route.params.status;
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "LC") {
            showUpload.value = false;
            if (draftData.documents[i].fileName.split(".")[1] == "pdf") {
              isPdf.value = true;
            } else {
              isImage.value = true;
            }
            licenseFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = googleApi + draftData.documents[i].filePath;
          }
        }
      }
    });
    const draft = (action) => {
      message.value.showLoading = true;
      if (route.params.id) {
        if (dataChanged.value) {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store
            .dispatch("goodstanding/editGoodstandingLicense", license)
            .then((res) => {
              if (res.data.status == "Success") {
                let licenseId = route.params.id;
                let formData = new FormData();
                formData.append(
                  documentSpecs[2].documentType.code,
                  licenseFile.value
                );
                let payload = { document: formData, id: licenseId };
                store
                  .dispatch("goodstanding/uploadDocuments", payload)
                  .then((res) => {
                    if (res.status == 200) {
                      message.value.showFlash = !message.value.showFlash;
                      message.value.showLoading = false;
                      setTimeout(() => {
                        router.push({ path: "/menu" });
                      }, 1500);
                    } else {
                      message.value.showErrorFlash = !message.value
                        .showErrorFlash;
                    }
                  })
                  .catch((err) => {});
              }
            });
        } else {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store
            .dispatch("goodstanding/editGoodstandingLicense", license)
            .then((res) => {
              if (res.data.status == "Success") {
                message.value.showFlash = !message.value.showFlash;
                message.value.showLoading = false;
                setTimeout(() => {
                  router.push({ path: "/menu" });
                }, 1500);
              } else {
                message.value.showErrorFlash = !message.value.showErrorFlash;
              }
            });
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: userId,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            applicantTitle: licenseInfo.applicantTitle,
            whomGoodStandingFor: licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: licenseInfo.licenseIssuedDate,
            whoIssued: licenseInfo.whoIssued,
            licenseRegistrationNumber: licenseInfo.licenseRegistrationNumber,
            applicantPositionId: licenseInfo.applicantPositionId,
            professionalTypeIds: licenseInfo.professionalTypeIds,
            expertLevelId: licenseInfo.expertLevelId,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store
          .dispatch("goodstanding/addGoodstandingLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              let licenseId = res.data.data.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[1].documentType.code,
                goodStandingLetter
              );

              formData.append(
                documentSpecs[2].documentType.code,
                licenseFile.value
              );
              let payload = { document: formData, id: licenseId };
              store
                .dispatch("goodstanding/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    message.value.showFlash = !message.value.showFlash;
                    message.value.showLoading = false;
                    setTimeout(() => {
                      router.push({ path: "/menu" });
                    }, 1500);
                  } else {
                    message.value.showErrorFlash = !message.value
                      .showErrorFlash;
                  }
                })
                .catch((err) => {});
            }
          });
      }
    };
    const update = (action) => {
      message.value.showLoading = true;
      if (route.params.id) {
        if (dataChanged.value) {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store
            .dispatch("goodstanding/editGoodstandingLicense", license)
            .then((res) => {
              if (res.data.status == "Success") {
                let licenseId = route.params.id;
                let formData = new FormData();
                formData.append(
                  documentSpecs[1].documentType.code,
                  letterFile.value
                );
                let payload = { document: formData, id: licenseId };
                store
                  .dispatch("goodstanding/uploadDocuments", payload)
                  .then((res) => {
                    if (res.status == 200) {
                      message.value.showFlash = !message.value.showFlash;
                      message.value.showLoading = false;
                      setTimeout(() => {
                        router.push({ path: "/menu" });
                      }, 1500);
                    } else {
                      message.value.showErrorFlash = !message.value
                        .showErrorFlash;
                    }
                  })
                  .catch((err) => {});
              }
            });
        } else {
          let license = {
            data: {
              action: action,
              data: draftData,
            },
            id: route.params.id,
          };
          store
            .dispatch("goodstanding/editGoodstandingLicense", license)
            .then((res) => {
              if (res.data.status == "Success") {
                message.value.showFlash = !message.value.showFlash;
                message.value.showLoading = false;
                setTimeout(() => {
                  router.push({ path: "/menu" });
                }, 1500);
              } else {
                message.value.showErrorFlash = !message.value.showErrorFlash;
              }
            });
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: userId,
            residenceWoredaId: licenseInfo.residenceWoredaId,
            applicantTitle: licenseInfo.applicantTitle,
            whomGoodStandingFor: licenseInfo.whomGoodStandingFor,
            licenseIssuedDate: licenseInfo.licenseIssuedDate,
            whoIssued: licenseInfo.whoIssued,
            licenseRegistrationNumber: licenseInfo.licenseRegistrationNumber,
            applicantPositionId: licenseInfo.applicantPositionId,
            professionalTypeIds: licenseInfo.professionalTypeIds,
            expertLevelId: licenseInfo.expertLevelId,
            otherProfessionalType: licenseInfo.otherProfessionalType,
          },
        };
        store
          .dispatch("goodstanding/addGoodstandingLicense", license)
          .then((res) => {
            if (res.data.status == "Success") {
              let licenseId = res.data.data.id;
              let formData = new FormData();
              formData.append(
                documentSpecs[1].documentType.code,
                letterFile.value
              );
              formData.append(documentSpecs[2].documentType.code, licenseCopy);
              let payload = { document: formData, id: licenseId };
              store
                .dispatch("goodstanding/uploadDocuments", payload)
                .then((res) => {
                  if (res.status == 200) {
                    message.value.showFlash = !message.value.showFlash;
                    message.value.showLoading = false;
                    setTimeout(() => {
                      router.push({ path: "/menu" });
                    }, 1500);
                  } else {
                    message.value.showErrorFlash = !message.value
                      .showErrorFlash;
                  }
                })
                .catch((err) => {});
            }
          });
      }
    };
    const withdraw = (action) => {
      message.value.showLoading = !message.value.showLoading;
      let withdrawObj = {
        action: action,
        data: draftData,
      };
      let payload = {
        licenseId: draftData.id,
        withdrawData: withdrawObj,
      };
      store.dispatch("goodstanding/withdraw", payload).then((res) => {
        if (res.data.status == "Success") {
          message.value.showLoading = !message.value.showLoading;
          message.value.showFlash = !message.value.showFlash;
          setTimeout(() => {
            router.push({ path: "/menu" });
          }, 1500);
        } else {
          message.value.showErrorFlash = !message.value.showErrorFlash;
        }
      });
    };

    return {
      licenseFile,
      licenseFileP,
      licenseCopyBack,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      isPdf,
      handleFileUpload,
      reset,
      submit,
      submitBack,
      draft,
      fileSize,
      withdraw,
      buttons,
      draftData,
      update,
      draftStatus,
      googleApi,
      message,
      dataChanged,
      goodStandingLetter,
      acceptedFields,
      declinedFields,
      remark,
      declinedFieldsCheck,
      acceptedFieldsCheck,
      documentMessage,
      fileSizeExceed,
      maxFileSize,
      maxSizeMB,
    };
  },
};
</script>
<style>
@import "../../styles/document-upload.css";
img {
  width: 250px;
  height: 250px;
  border-radius: 0%;
}
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
</style>
