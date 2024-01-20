<template>
  <div class="overflow-x-hidden overflow-y-scroll">
    <Navigation />
    <div
      class="w-screen h-full bg-lightBlueB-200 flex items-center justify-center"
    >
      <div class="w-screen max-w-4xl mt-small h-full">
        <div
          class="flex flex-col mt-medium w-full bg-white blue-box-shadow-light rounded mb-large"
        >
          <div class="mt-large">
            <TitleWithIllustration
              illustration="PersonalInfo"
              message="Personal Info"
            />
          </div>
          <form
            class="mx-auto max-w-3xl w-full mt-10"
            @submit.prevent="updateProfile"
          >
            <div class="flex justify-center">
              <span>
                <h2>{{ photoFile.name }}</h2>
                <h2>{{ fileSize }}</h2>
              </span>
            </div>
            <div class="flex mb-4 justify-center">
              <span v-if="showUpload">
                <span>
                  <label class="text-primary-700 ml-4"
                    >Maximum size for profile picture is 3 MB
                  </label>
                </span>
                <br />
                <label class="text-primary-700 ml-4"
                  >Upload Profile Picture: (*)
                  <div class="dropbox">
                    <input
                      type="file"
                      id="photoFile"
                      class="photoFile"
                      ref="photoFileP"
                      v-on:change="handleFileUpload()"
                      style="margin-bottom: 15px !important;"
                    />
                    <!-- file format can be restricted by using accept=".jpeg,.jpg,.png,.pdf,...." -->
                    <p>
                      Drag your Profile Picture here to begin<br />
                      or click to browse
                    </p>
                  </div>
                  <div class="ml-8">
                    <span style="color: red">{{
                      personalInfoErrors.photo
                    }}</span>
                  </div>
                </label>
              </span>

              <picture v-if="!showUpload && isImage">
                <p class="ml-4">
                  <a href="javascript:void(0)" @click="reset()">Upload again</a>
                </p>
                <img v-bind:src="filePreview" v-show="showPreview" />
              </picture>
              <span v-if="photoSizeCheck" style="color: red"
                >Image size to big, Upload again. Image must be less than 3
                MB</span
              >
              <span v-if="!showUpload && !isImage && !photoSizeCheck">
                <img :src="filePreview" alt="" class="preview" />
              </span>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-6">
                <label class="text-primary-700">First Name (*)</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.name"
                />
                <span style="color: red">{{ personalInfoErrors.name }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 ml-12">
                <label class="text-primary-700">Father Name (*)</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.fatherName"
                />
                <span style="color: red">{{
                  personalInfoErrors.fatherName
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-6">
                <label class="text-primary-700">Grand Father Name (*)</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.grandFatherName"
                />
                <span style="color: red">{{
                  personalInfoErrors.grandFatherName
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 ml-12">
                <label class="text-primary-700">Name in Amharic</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.alternativeName"
                />
                <span style="color: red">{{
                  personalInfoErrors.alternativeName
                }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-12">
                <label class="text-primary-700">Father's Name in Amharic</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.alternativeFatherName"
                />
                <span style="color: red">{{
                  personalInfoErrors.alternativeFatherName
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 m1-12">
                <label class="text-primary-700"
                  >Grandfather's Name in Amharic</label
                >
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.alternativeGrandFatherName"
                />
                <span style="color: red">{{
                  personalInfoErrors.alternativeGrandFatherName
                }}</span>
              </div>
            </div>

            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-6">
                <label class="text-primary-700">Nationality (*)</label>
                <select
                  class="max-w-3xl"
                  v-model="personalInfo.nationalityId"
                  @change="fetchNationalities()"
                >
                  <option
                    v-for="types in state.nationalities"
                    v-bind:key="types.name"
                    v-bind:value="types.id"
                  >
                    {{ types.name }}
                  </option>
                </select>
                <span style="color: red">{{
                  personalInfoErrors.nationalityId
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 ml-12">
                <label class="text-primary-700">PO Box(Optional)</label>
                <input
                  class="max-w-3xl"
                  type="text"
                  v-model="personalInfo.poBox"
                />
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col mb-medium w-1/2 mr-6">
                <label class="text-primary-700">Date of birth (*)</label>
                <input
                  class="max-w-3xl"
                  type="date"
                  v-model="personalInfo.dateOfBirth"
                />
                <span style="color: red">{{
                  personalInfoErrors.dateOfBirth
                }}</span>
              </div>
              <div class="flex flex-col mb-medium w-1/2 ml-12">
                <div class="flex flex-col w-full">
                  <label class="text-primary-700">Gender</label>
                  <div class="flex w-full">
                    <div class="flex flex-col mb-small w-1/3">
                      <div class="flex py-2">
                        <input
                          class="flex flex-col"
                          type="radio"
                          id="male"
                          value="male"
                          v-model="personalInfo.gender"
                        />
                        <label
                          class="ml-tiny flex flex-col text-primary-700"
                          for="male"
                        >
                          Male
                        </label>
                      </div>
                    </div>
                    <div class="flex w-1/3">
                      <div class="flex flex-col w-1/3">
                        <div class="flex py-2">
                          <input
                            type="radio"
                            id="female"
                            value="female"
                            v-model="personalInfo.gender"
                          />
                          <label class="ml-tiny text-primary-700" for="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span style="color: red" class="mt-0">
                    {{ personalInfoErrors.gender }}</span
                  >
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="flex w-1/2 mb-small m1-12">
                <div class="flex flex-col w-full">
                  <label class="text-primary-700">Martial Status</label>
                  <div class="flex w-full">
                    <div class="flex flex-col w-1/3">
                      <div class="flex py-2">
                        <input
                          class="flex flex-col"
                          type="radio"
                          id="single"
                          value="1"
                          v-model="personalInfo.maritalStatusId"
                        />
                        <label
                          class="ml-tiny flex flex-col text-primary-700"
                          for="single"
                        >
                          Single
                        </label>
                      </div>
                    </div>
                    <div class="flex w-1/3">
                      <div class="flex flex-col w-1/3">
                        <div class="flex py-2">
                          <input
                            type="radio"
                            id="married"
                            value="2"
                            v-model="personalInfo.maritalStatusId"
                          />
                          <label class="ml-tiny text-primary-700" for="married">
                            Married
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="flex  flex-col w-1/3">
                      <div class="flex py-2">
                        <input
                          type="radio"
                          id="divorced"
                          value="3"
                          v-model="personalInfo.maritalStatusId"
                        />
                        <label class="ml-tiny text-primary-700" for="divorced">
                          Divorced
                        </label>
                      </div>
                    </div>
                  </div>
                  <span style="color: red">{{
                    personalInfoErrors.maritalStatusId
                  }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="!message.showLoading"
              class="flex mb-medium w-full mt-medium"
            >
              <button
                class="block mx-auto w-1/4  bg-lightBlue-500 hover:bg-lightBlue-600 hover:shadow-lg"
              >
                Update Profile
              </button>
            </div>
            <div v-else class="mt-4">
              <Spinner />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="mr-3xl" v-if="message.showFlash">
      <FlashMessage message="Login Successful!" />
    </div>
    <div v-if="message.showErrorFlash">
      <ErrorFlashMessage v-bind:message="message.errorMessage" />
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import TitleWithIllustration from "@/sharedComponents/TitleWithIllustration";
import Navigation from "@/views/Navigation";
import { useRoute, useRouter } from "vue-router";
import Spinner from "@/sharedComponents/Spinner";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";

export default {
  components: {
    TitleWithIllustration,
    Navigation,
    Spinner,
    FlashMessage,
    ErrorFlashMessage,
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

    let photoFile = ref("");
    let photoFileP = ref("");
    let showPreview = ref(false);
    let filePreview = ref("");
    let showUpload = ref(true);
    let isImage = ref(true);
    let photoSizeCheck = ref(false);
    let fileSize = ref("");
    let nationality = ref("");
    let maritalStatus = ref("");

    let personalInfo = ref({
      name: "",
      fatherName: "",
      grandFatherName: "",
      alternativeName: "",
      alternativeFatherName: "",
      alternativeGrandFatherName: "",
      gender: "",
      poBox: "",
      dateOfBirth: "",
      nationalityId: "",
      maritalStatusId: "",
      photo: "",
    });
    let personalInfoErrors = ref({
      name: "",
      fatherName: "",
      grandFatherName: "",
      alternativeName: "",
      alternativeFatherName: "",
      alternativeGrandFatherName: "",
      nationalityId: "",
      gender: "",
      maritalStatusId: "",
      photo: "",
    });
    let state = ref({
      userTypes: {},
      expertLevel: {},
      healthOffices: {},
      maritalStatuses: {},
      regions: {},
      zones: {},
      woreda: {},
      nationalities: {},
    });
    let id = ref({
      regionID: {},
      zoneID: {},
    });
    const reset = () => {
      showUpload.value = true;
      showPreview.value = false;
      photoFile.value = "";
      filePreview.value = "";
      isImage.value = true;
      photoSizeCheck.value = false;
      fileSize.value = "";
    };
    const handleFileUpload = async () => {
      showUpload.value = false;
      photoFile.value = photoFileP.value.files[0];
      let reader = new FileReader();
      if (photoFile.value.size > 3145728) {
        photoSizeCheck.value = true;
      } else {
        let fileS = photoFile.value.size;
        if (fileS > 0 && fileS < 1000) {
          fileSize.value += "B";
        } else if (fileS > 1000 && fileS < 1000000) {
          fileSize.value = fileS / 1000 + "kB";
        } else {
          fileSize.value = fileS / 1000000 + "MB";
        }
        reader.addEventListener(
          "load",
          async function() {
            showPreview.value = true;
            filePreview.value = reader.result;
            var base64 = reader.result;
            personalInfo.value.photo = base64;
          },
          false
        );
        if (photoFile.value) {
          if (/\.(jpe?g|png|gif)$/i.test(photoFile.value.name)) {
            isImage.value = true;
            reader.readAsDataURL(photoFile.value);
          } else if (/\.(pdf)$/i.test(photoFile.value.name)) {
            isImage.value = false;
            reader.readAsText(photoFile.value);
          }
        }
      }
    };
    const fetchNationalities = () => {
      store.dispatch("profile/getNationalities").then((res) => {
        const nationalities = res.data;
        state.value.nationalities = nationalities.data;
      });
    };
    const validateForm = (formData) => {
      const errors = {};
      if (!formData.photo) errors.photo = "Profile Picture Required";
      if (!formData.name) errors.name = "First Name Required";
      if (!formData.fatherName) errors.fatherName = "Father's Name Required";
      if (!formData.grandFatherName)
        errors.grandFatherName = "Grandfather's Name Required";
      if (!formData.nationalityId)
        errors.nationalityId = "Nationality Required";
      if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth Required";
      return errors;
    };
    const isEmpty = (obj) => {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    };
    const updateProfile = () => {
      message.value.showLoading = true;
      store
        .dispatch("profile/updateProfile", personalInfo.value)
        .then((res) => {
          if (res) {
            message.value.showLoading = false;
            message.value.showFlash = true;
            setTimeout(() => {
              router.push({ path: "/menu" });
            }, 1500);
          } else {
            message.value.showLoading = false;
            message.value.showErrorFlash = true;
            setTimeout(() => {
              message.value.showErrorFlash = false;
            }, 3000);
          }
        });
    };
    onMounted(() => {
      let userID = route.params.id.substring(1);
      store.dispatch("profile/getProfileByUserId", userID).then((res) => {
        const userData = res.data.data;
        personalInfo.value = userData;
        photoFile.value = userData.photo;
        showPreview.value = true;
        filePreview.value = photoFile.value;
        showUpload.value = false;
      });

      fetchNationalities();
    });
    return {
      photoFile,
      photoFileP,
      showPreview,
      filePreview,
      showUpload,
      isImage,
      fileSize,
      handleFileUpload,
      reset,
      personalInfo,
      personalInfoErrors,
      photoSizeCheck,
      validateForm,
      nationality,
      maritalStatus,
      isEmpty,
      state,
      id,
      fetchNationalities,
      updateProfile,
      message,
    };
  },
};
</script>
<style>
@import "../../styles/document-upload.css";
img {
  width: 150px;
  height: 150px;
}
.photoFile {
  opacity: 0; /* invisible but it's there! */
  width: 150px;
  height: 150px;
  position: absolute;
  cursor: pointer;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  height: 150px; /* minimum height */
  width: 200px;
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
