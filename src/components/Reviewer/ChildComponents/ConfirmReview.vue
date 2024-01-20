<template>
  <div
    class="container"
    v-for="item in confirmReview"
    v-bind:key="item.id"
    v-bind:value="item.id"
  >
    <div
      class="flex justify-center items-center  ml-8 mt-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
    >
      <div
        class="p-4 w-48 h-64"
        @Click="
          detail(
            `/admin/confirmReviewDetail`,
            item.applicationType,
            item.id,
            item.applicant.id
          )
        "
      >
        <div class="flex content-center justify-center">
          <!-- <img class="box-shadow-pop" v-bind:src="item.picture.large" /> -->
          <span v-if="item.applicant.profile.photo !== '' && item.applicant.profile.photo !== null">
            <img :src="item.applicant.profile.photo" alt="profile picture"  class="w-20 h-12" />
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
        <br />
        <span
          class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
        >
          {{ item.applicationType ? item.applicationType : "-" }}
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
</template>

<script>
import { useRouter } from "vue-router";
import moment from "moment";
export default {
  computed: {
    moment: () => moment,
  },
  props: ["confirmReview"],
  name: "ConfirmReview",

  setup() {
    let router = useRouter();

    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
      router.push(url);
    };

    return {
      detail
    }
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
