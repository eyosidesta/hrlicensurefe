<template>
  <div
    class="container"
    v-for="item in onReviewApplication"
    v-bind:key="item.id"
    v-bind:value="item.id"
  >
    <div
      class="flex justify-center items-center ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
    >
      <div
        class="p-4 w-48 h-64"
        @Click="detail(`/admin/on-review-detail`, item.id, item.applicant.id)"
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
        <span
          class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
          v-if="all_on_review == 'true'"
        >
          <i class="fas fa-user-cog"></i> &nbsp;
          {{ item.reviewer.name ? item.reviewer.name : "-" }}
        </span>
        <span
          class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
        >
          {{ app_type }}
        </span>
        <span
          class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
        >
          On
          {{ moment(item.createdAt).format("MMMM DD, YYYY") }}
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
</template>
<script>
import moment from "moment";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  computed: {
    moment: () => moment,
  },
  props: ["onReviewApplication", "app_type", "all_on_review"],
  name: "OnReviewApplications",
  setup(props) {
    let router = useRouter();
    const detail = (data, applicationId, applicantId) => {
      const url =
        data + "/" + props.app_type + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };
    return {
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
.hoveredCard {
  background-color: white;
}
/* .b{
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -50%);
} */
.flip-box {
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;
}
.flip-box-front,
.flip-box-back {
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  backface-visibility: hidden;
}

.flip-box-front {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-front {
  transform: rotateY(-180deg);
  transform-style: preserve-3d;
}

.flip-box-back {
  /* position: absolute; */
  transform: rotateY(180deg);
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-back {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}

.flip-box .inner {
  /* position:absolute;
  perspective: inherit;
  z-index: 2;
  transform: translateY(-50%)translateZ(60px) scale(.94); */
}
/* .box {
  position: relative;
} */

.b {
  /* position: absolute; */
}
</style>
