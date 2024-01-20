<template>
  <div>
    <div class="flex flex-wrap pb-medium rounded h-full">
      <div class="pl-large w-52 h-26" v-if="searchedApplicantsLength == 0">
        <div class="flex content-center justify-center">
          <h2>Nothing To Show!</h2>
        </div>
      </div>
      <div
        class="container"
        v-for="item in filteredData"
        v-bind:key="item.id"
        v-bind:value="item.id"
      >
        <div
          class="flex justify-center items-center ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
        >
          <div
            class="p-4 w-48 h-64"
            @Click="
              detail(
                `/admin/`,
                item.applicationType,
                item.id,
                item.applicant.id
              )
            "
          >
            <div class="flex content-center justify-center">
              <span
                v-if="
                  item.applicant.profile.photo !== '' &&
                    item.applicant.profile.photo !== null
                "
              >
                <img
                  :src="item.applicant.profile.photo"
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
            </div>
            <h4
              class="text-lightBlueB-500 mt-tiny flex justify-center content-center"
            >
              <b>{{
                item.applicant.profile.name
                  ? item.applicant.profile.name +
                    " " +
                    item.applicant.profile.fatherName
                  : "-"
              }}</b>
            </h4>
            <span v-if="applicationType == ''">
              <span
                class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
              >
                {{ item.applicationType ? item.applicationType : "-" }}
              </span>
            </span>
            <span
              v-else
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              {{ applicationType }}
            </span>
            <span
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              On
              {{
                item.createdAt
                  ? moment(item.createdAt).format("MMM Do YY")
                  : "-"
              }}
            </span>

            <span
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              {{
                app_type == "New License"
                  ? item.newLicenseCode
                    ? item.newLicenseCode
                    : "-"
                  : app_type == "Verification"
                  ? item.verificationCode
                    ? item.verificationCode
                    : "-"
                  : app_type == "Good Standing"
                  ? item.goodStandingCode
                    ? item.goodStandingCode
                    : "-"
                  : app_type == "Renewal"
                  ? item.renewalCode
                    ? item.renewalCode
                    : "-"
                  : "-"
              }}
            </span>

            <span
              class="text-lightBlueB-500 mt-tiny flex justify-end content-center"
            >
              {{ item.createdAt ? moment(item.createdAt).fromNow() : "-" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/sharedComponents/TitleWithIllustration";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import { useStore } from "vuex";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import moment from "moment";

export default {
  components: {
    ReviewerNavBar,
    Title,
  },
  computed: {
    moment: () => moment,
  },
  props: ["filteredData", "type", "app_type"],
  setup(props) {
    const router = useRouter();
    let applicationType = props.app_type;

    let searchedApplicantsLength = props.filteredData.length;
    let detailType = props.type;

    const detail = (data, applicationTypeName, applicationId, applicantId) => {
      if (applicationType === undefined) {
        applicationType = applicationTypeName;
      }
      const url =
        data +
        "" +
        detailType +
        "/" +
        applicationType +
        "/" +
        applicationId +
        "/" +
        applicantId;
      router.push(url);
    };

    onMounted(() => {});

    return {
      searchedApplicantsLength,
      applicationType,
      detail,
    };
  },
};
</script>
<style scoped>
img {
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  border-color: steelblue;
  background-color: steelblue;
}
.container {
  cursor: pointer;
}
</style>
