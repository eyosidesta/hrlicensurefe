<template>
  <div class="flex justify-center">
    <div class="w-screen max-w-4xl">
      <div
        class="flex flex-col pt-large w-full bg-white blue-box-shadow-light rounded "
      >
        <TitleWithIllustration
          illustration="User"
          message="Photo"
          class="mt-8"
        />
        <form @submit.prevent="submit" class="mx-auto max-w-3xl w-full mt-8">
          <div class="flex justify-center">
            <div>
              <span v-if="showUpload">
                <label class="text-primary-700"
                  >Upload image:
                  <div class="dropbox">
                    <input
                      type="file"
                      id="letterFile"
                      class="photoFile"
                      ref="letterFileP"
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

              <h6 style="margin-top: 15px !important;">
                Your photo should be passport size
              </h6>
            </div>
          </div>
        </form>
        <div v-if="buttons" class="flex justify-center mb-8">
          <button @click="submit">
            Next
          </button>
          <button
            class="buttons[0].class"
            @click="draft(buttons[0].action)"
            variant="outline"
          >
            {{ buttons[0].name }}
          </button>
          <button
            v-if="buttons.length > 2"
            @click="withdraw(buttons[2].action)"
            variant="outline"
          >
            {{ buttons[2]["name"] }}
          </button>
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
c;

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

    const basePath = "https://hrlicensurebe.dev.k8s.sandboxaddis.com/";

    let message = ref({
      showFlash: false,
      showErrorFlash: false,
      showLoading: false,
    });

    let letterFile = ref("");
    let letterFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(true);

    let buttons = ref([]);
    let documentSpecs = ref([]);
    let userId = localStorage.getItem("userId");
    let licenseInfo = ref("");
    let draftData = ref("");

    let licenseCopy = ref("");
    let serviceFee = ref("");

    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      letterFile.value = "";
      filePreview.value = "";
      isImage.value = true;
    };
    const handleFileUpload = () => {
      showUpload.value = false;
      letterFile.value = letterFileP.value.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          showPreview.value = true;
          filePreview.value = reader.result;
        },
        false
      );

      if (letterFile.value) {
        if (/\.(jpe?g|png|gif)$/i.test(letterFile.value.name)) {
          isImage.value = true;
          reader.readAsDataURL(letterFile.value);
        } else if (/\.(pdf)$/i.test(letterFile.value.name)) {
          isImage.value = false;
          reader.readAsText(letterFile.value);
        }
      }
    };
    buttons = store.getters["verification/getButtons"];
    documentSpecs = store.getters["verification/getDocumentSpec"];
    licenseInfo = store.getters["verification/getLicense"];

    licenseCopy = store.getters["verification/getLicenseCopy"];
    serviceFee = store.getters["verification/getServiceFee"];

    const submit = () => {
      emit("changeActiveState");
      store.dispatch("verification/set_Verification_Letter", letterFile);
    };

    onMounted(() => {
      buttons = store.getters["verification/getButtons"];
      draftData = store.getters["verification/getDraft"];
      if (route.params.id) {
        for (let i = 0; i < draftData.documents.length; i++) {
          if (draftData.documents[i].documentTypeCode == "PSP") {
            showUpload.value = false;
            isImage.value = true;
            letterFile.value = draftData.documents[i];
            showPreview.value = true;
            filePreview.value = basePath + draftData.documents[i].filePath;
          }
        }
      }
    });
    const draft = (action) => {
      if (route.params.id) {
        if (letterFile) {
          // modify the drafData before dispatching
        } else {
          // just send the draftData
        }
      } else {
        let license = {
          action: action,
          data: {
            applicantId: userId,
            applicantTypeId: licenseInfo.applicantTypeId,
            education: {
              departmentId: licenseInfo.education.departmentId,
              institutionId: licenseInfo.education.institutionId,
            },
          },
        };
        store.dispatch("verification/addNewLicense", license).then((res) => {
          let licenseId = res.data.data.id;
          let formData = new FormData();
          formData.append(documentSpecs[0].documentType.code, letterFile);
          formData.append(documentSpecs[1].documentType.code, serviceFee);
          formData.append(documentSpecs[2].documentType.code, licenseCopy);

          let payload = { document: formData, id: licenseId };
          store
            .dispatch("verification/uploadDocuments", payload)
            .then((res) => {
              if (res.status == "Success") {
                showFlash.value = !showFlash.value;
                setTimeout(() => {
                  route.push({ path: "/menu" });
                }, 3000);
                router.push({ path: "/menu" });
              } else {
                showErrorFlash.value = !showErrorFlash.value;
              }
            })
            .catch((err) => {});
        });
      }
    };
    const withdraw = (action) => {
      let withdrawObj = {
        action: action,
        data: draftData,
      };
      let payload = {
        licenseId: draftData.id,
        withdrawData: withdrawObj,
      };
      store.dispatch("verification/withdraw", payload).then((res) => {
        if (res.data.status == "Success") {
          showFlash.value = !showFlash.value;
          setTimeout(() => {
            router.push({ path: "/menu" });
          }, 3000);
        } else {
          showErrorFlash.value = !showErrorFlash.value;
        }
      });
    };

    return {
      photoFile,
      photoFileP,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      handleFileUpload,
      reset,
      submit,
      draft,
      withdraw,
      buttons,
      draftData,
      basePath,
      message,
    };
  },
};
</script>
<style>
@import "../../styles/document-upload.css";
img {
  width: 250px;
  height: 250px;
}
</style>