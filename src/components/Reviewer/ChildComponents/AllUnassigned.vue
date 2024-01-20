<template>
  <div
    class="container flip-box"
    v-for="(item, index) in allUnassigned"
    v-bind:key="item.id"
    v-bind:value="item.id"
  >
    <div
      v-if="index < 5"
      class="flex justify-center items-center ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100 flip-box-front"
    >
      <div
        class="p-4 w-48 h-64"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <div class="flex content-center justify-center">
          <span v-if="item.applicant.profile.photo !== '' && item.applicant.profile.photo !== null">
                <img  :src="item.applicant.profile.photo" alt="profile picture"  class="w-20 h-12" />
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
        >
          unassigned
        </span>
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

    <div
      v-if="index < 5"
      class="absolute inset-0 flex justify-center items-center z-10 ml-8 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100 flip-box-back"
    >
      <div
        class="p-4 w-48 h-64"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @Click="
          detail(
            `/admin/unassignedDetail`,
            item.applicationType,
            item.id,
            item.applicant.id
          )
        "
      >
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
          {{ item.newLicenseCode ? item.newLicenseCode : "-" }}
        </span>
        <span
          class="text-lightBlueB-500 mt-tiny flex justify-end content-center"
        >
          {{ item.createdAt ? moment(item.createdAt).fromNow() : "-" }}
        </span>
        <div class="flex ml-small w-32 pt-small justify-center content-center">
          <button
            class="block mx-auto bg-lightBlue-300 hover:bg-lightBlue-600 hover:shadow-lg"
          >
            Assign to
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { useRouter } from "vue-router";
export default {
  computed: {
    moment: () => moment,
  },
  name: "AllUnassigned",
  props: ["allUnassigned"],
  setup(props) {
    const router = useRouter();
    const detail = (data, applicationType, applicationId, applicantId) => {
      const url =
        data + "/" + applicationType + "/" + applicationId + "/" + applicantId;
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
