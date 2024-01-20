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
        v-for="item in licensedByDate"
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
                `/admin/certifiedUsersDetail`,
                item.applicationType,
                item.id,
                item.applicant.id
              )
            "
          >
            <div class="flex content-center justify-center">
              <!-- <img class="box-shadow-pop" v-bind:src="item.picture.large" /> -->
              <img
                class="box-shadow-pop"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              />
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
            <span
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              {{ item.applicationType ? item.applicationType : "-" }}
            </span>
            <span
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              On
              {{
                item.certifiedDate
                  ? moment(item.certifiedDate).format("MMM Do YY")
                  : "-"
              }}
            </span>
            <span
              class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
            >
              {{ item.newLicenseCode ? item.newLicenseCode : "-" }}
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
  props: ["licensedByDate"],
  setup(props) {
    const router = useRouter();
    
    let searchedApplicantsLength = props.licensedByDate.length;

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    onMounted(() => {
    });

    return {
      searchedApplicantsLength,
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
