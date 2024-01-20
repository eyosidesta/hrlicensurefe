<template>
  <div class="container" v-if="isUserCertified && isApplicationTypeFound">
    <div class="">
      <img class="moh-logo" src="../../../assets/image.png" />
    </div>
    <div class="title">
      <h2>Health Professionals Certificate</h2>
    </div>
    <div class="name">
      <span class="underline mt-12"
        >{{ certifiedUser.name ? certifiedUser.name : "" }}
        {{ certifiedUser.fatherName ? certifiedUser.fatherName : "" }}
        {{
          certifiedUser.grandFatherName ? certifiedUser.grandFatherName : ""
        }}</span
      >
      &#160;
      <span class="underline">
        {{ certifiedUser.alternativeName ? certifiedUser.alternativeName : "" }}
        {{
          certifiedUser.alternativeFatherName
            ? certifiedUser.alternativeFatherName
            : ""
        }}
        {{
          certifiedUser.alternativeGrandFatherName
            ? certifiedUser.alternativeGrandFatherName
            : ""
        }}
      </span>
    </div>
    <div class="description">
      <h4 class="flex justify-center mt-8 first-text text-2xl">
        Having duly satisfied the requirement of the ministry hereby
      </h4>
      <h4 class="flex justify-center second-text text-2xl">
        registered and licensed as
        <div class="profession">
          &nbsp;{{
            certificateDetail.professionalTypes
              ? certificateDetail.professionalTypes.name
              : ""
          }}
        </div>
      </h4>
    </div>
    <div class="mt-8 summary">
      <h4>
        The license is valid:<b
          >{{ moment(certificateDetail.certifiedDate).format("MMM DD, YYYY") }}
          -
          {{ moment(licenseExpireDate).format("MMM DD, YYYY") }}</b
        >
      </h4>
    </div>
    <div class="mt-8 last">
      <p class="text-lg">Ethiopian Ministry of Health</p>
    </div>
  </div>
  <div v-else-if="!isUserFound">
    <div class="flex justify-center content-center">
      <h1>User is not Found</h1>
    </div>
  </div>
  <div v-else-if="!isUserCertified && isUserFound">
    <div class="flex justify-center content-center">
      <h1>User is not Certified</h1>
    </div>
  </div>

  <div v-else-if="!isApplicationTypeFound">
    <div class="flex justify-center content-center">
      <h1>
        {{ applicationType }} Application type is not found for this request
      </h1>
    </div>
  </div>
</template>
<script>
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import Title from "@/sharedComponents/Title";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import store from "../../../store";
import Spinner from "@/sharedComponents/Spinner";
import image from "../../../assets/image.png";

import { toEthiopian } from "../Configurations/dateConvertor";

import moment from "moment";
export default {
  computed: {
    moment: () => moment,
    // getCertifiedUser() {
    //   return store.getters['reviewer/getUnassigned'][0]
    // }
  },
  components: {
    Title,
    ReviewerNavBar,
    Spinner,
  },
  setup() {
    const store = useStore();
    let route = useRoute();
    let show = ref(false);
    let certifiedUser = ref({});
    let certificateDetail = ref({});
    let licenseExpireDate = ref({});
    let showLoading = ref(false);
    let showApplicationLoading = ref(false);
    let isUserCertified = ref(true);
    let isUserFound = ref(true);
    let isApplicationTypeFound = ref(true);

    const applicationType = route.params.applicationType;

    const fetchCertifiedUser = () => {
      showLoading.value = true;
      store
        .dispatch("profile/getProfileByUserId", route.params.userId)
        .then((res) => {
          showLoading.value = false;
          if (res.data.data === undefined) {
            isUserFound.value = false;
            return;
          }
          certifiedUser.value = res.data.data;
          show.value = true;
        })
        .catch((error) => {
          isUserFound.value = false;
        });
    };

    const fetchApplication = () => {
      showApplicationLoading.value = true;
      if (route.params.applicationType === "Verification") {
        store
          .dispatch(
            "reviewer/getVerificationApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            if (res.data.data === undefined) {
              isApplicationTypeFound.value = false;
              return;
            }
            certificateDetail.value = res.data.data;
            if (
              route.params.userId != certificateDetail.value.applicantId ||
              certificateDetail.value.certified === false
            ) {
              isUserCertified.value = false;
            }
            licenseExpireDate.value = moment(
              certificateDetail.value.certifiedDate
            )._d;
            licenseExpireDate.value.setFullYear(
              licenseExpireDate.value.getFullYear() + 5
            );
          })
          .catch((error) => {});
      } else if (route.params.applicationType === "Good Standing") {
        store
          .dispatch(
            "reviewer/getGoodStandingApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            if (res.data.data === undefined) {
              isApplicationTypeFound.value = false;
              return;
            }
            certificateDetail.value = res.data.data;
            if (
              route.params.userId != certificateDetail.value.applicantId ||
              certificateDetail.value.certified === false
            ) {
              isUserCertified.value = false;
            }
            licenseExpireDate.value = moment(
              certificateDetail.value.certifiedDate
            )._d;
            licenseExpireDate.value.setFullYear(
              licenseExpireDate.value.getFullYear() + 5
            );
          });
      } else if (route.params.applicationType === "New License") {
        store
          .dispatch(
            "reviewer/getNewLicenseApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            if (res.data.data === undefined) {
              isApplicationTypeFound.value = false;
              return;
            }
            certificateDetail.value = res.data.data;
            if (
              route.params.userId != certificateDetail.value.applicantId ||
              certificateDetail.value.certified === false
            ) {
              isUserCertified.value = false;
            }
            licenseExpireDate.value = moment(
              certificateDetail.value.certifiedDate
            )._d;
            licenseExpireDate.value.setFullYear(
              licenseExpireDate.value.getFullYear() + 5
            );
          });
      } else if (route.params.applicationType === "Renewal") {
        store
          .dispatch(
            "reviewer/getRenewalApplication",
            route.params.applicationId
          )
          .then((res) => {
            showApplicationLoading.value = false;
            if (res.data.data === undefined) {
              isApplicationTypeFound.value = false;
              return;
            }
            certificateDetail.value = res.data.data;
            if (
              route.params.userId != certificateDetail.value.applicantId ||
              certificateDetail.value.certified === false
            ) {
              isUserCertified.value = false;
            }
            licenseExpireDate.value = moment(
              certificateDetail.value.certifiedDate
            )._d;
            licenseExpireDate.value.setFullYear(
              licenseExpireDate.value.getFullYear() + 5
            );
          });
      }
    };

    onMounted(() => {
      fetchCertifiedUser();
      fetchApplication();
    });
    return {
      show,
      certifiedUser,
      showLoading,
      certificateDetail,
      isUserCertified,
      isUserFound,
      licenseExpireDate,
      isApplicationTypeFound,
      applicationType,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 5%;
}
/* .container div {
  display: flex;
  align-self: center;
} */
.container img {
  width: 100px;
  height: 100px;
}
.title {
  position: relative;
  margin-top: 1%;
}
.title h2 {
  color: #000;
  font-size: 40px;
}
/* .name {
  justify-content: space-around;
} */
.name .underline {
  font-size: 28px;
  color: #707070;
}
.description .first-text {
  font-size: 25px;
  color: #707070;
}
.description h4 {
  color: #707070;
  font-size: 25px;
}
.profession {
  font-style: italic;
  color: #000;
}
.summary h4 {
  color: #707070;
}
.last p {
  color: #707070;
}
/* .name h4 > span {
  font-size: 40px;
} */
/* * {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  font-size: 17px;
}

.container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.container img {
  vertical-align: middle;
  opacity: 0.35;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); 
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}
 .flex-container {
  display: flex;
  justify-content: center;
  
}
.flex-container > div {
  margin: 40px;
  margin-top: -690px;
  color: black
}
.flex-center {
  padding-left: 25%;
  justify-content: center;
}
.flex-second-container {
  display: flex;
  justify-content: center;
}
.flex-second-container > div {
  margin: 40px;
  margin-top: -550px;
}
.userNotFound {
  margin-top: 10%;
} */
</style>
