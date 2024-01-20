<template>
  <div class="bg-lightBlueB-200">
    <ReviewerNavBar tab="applicantDetail" />
    <div class="bg-lightBlueB-200 h-full">
      <div
        v-if="show"
        style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);"
        class="ml-8  mr-8 mb-12"
      >
        <div class="mt-large bg-white">
          <div class="flex justify-center newLicenseDocs">
            <Title message="New License Documents" />
          </div>
          <picture v-if="docs.length > 0">
            <!-- <div v-if="docs[index].fileName.split('.')[1] == 'pdf'" > -->
            <!-- <div v-if="false">
                  <div>
                 <iframe v-bind:src="'https://storage.googleapis.com/hris-lisence-dev/' +
                      docs[index].filePath"
                       ></iframe>
                       </div>
                       <br />
                       <a @click="openPdfInNewTab(docs[index].filePath)">see pdf in detail</a>
                  </div>
                  
                  <div v-else>
                <img
                  v-bind:src="
                    'https://storage.googleapis.com/hris-lisence-dev/' +
                      docs[index].filePath
                  "
                />
                </div> -->
            <div class="grid grid-cols-3 gap-4 auto-cols-max p-5 m-5 text-center">
              <div v-for="file in docs" v-bind:key="file.documentTypeCode" class="pt-5">
                <Title :message="file.documentType.name" />
                <picture class="flex flex-col justify-center items-center m-tiny">
                  <img
                    :src="
                      'https://storage.googleapis.com/hris-lisence-dev/' +
                        file.filePath
                    "
                  />
                </picture>
              </div>
            </div>
          </picture>

          <div class="flex justify-center p-5">
            <button @click="navigateToEvaluation">Go To Evaluation</button>
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Title from "@/sharedComponents/Title";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { ref, onMounted } from "vue";
import Spinner from "@/sharedComponents/Spinner";
import moment from "moment";

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

    let show = ref(false);
    let showLoading = ref(false);
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
    let docs = ref([]);

    let showFlash = ref(false);
    let showErrorFlash = ref(false);

    let loggedInAdminId = +localStorage.getItem("adminId");

    const created = async (applicationId) => {
      showLoading.value = true;
      store
        .dispatch("reviewer/getNewLicenseApplication", applicationId)
        .then((res) => {
          showLoading.value = false;
          license.value = res.data.data;
          docs.value = license.value.documents;
          show.value = true;
        });
    };
    const navigateToEvaluation = () => {
      const url =
        "/admin/detail/Renewal/" +
        route.params.renewalApplicationId +
        "/" +
        route.params.renewalApplicantId;
      router.push(url);
    };

    onMounted(() => {
      created(route.params.newLicenseApplicationId);
    });

    return {
      license,
      loggedInAdminId,
      showFlash,
      showErrorFlash,
      show,
      created,
      showLoading,
      docs,
      navigateToEvaluation,
    };
  },
};
</script>
<style>
.text-danger > label,
.text-danger > h5 {
  color: red;
}
img {
  width: 300px;
  height: 300px;
}
.newLicenseDocs {
    background: aliceblue;
    padding: 1%;
    margin-bottom: 2%;
    border-bottom: 1px solid lightgray;
}
</style>
