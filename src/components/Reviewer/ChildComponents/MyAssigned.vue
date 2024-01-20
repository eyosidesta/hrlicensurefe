<template>
  <div
    class="container"
    v-for="(item, index) in assignedToMe"
    v-bind:key="item.applicationStatus.name"
    v-bind:value="item.id"
  >
    <div
      v-if="index < 5"
      class="flex justify-center items-center ml-8 mt-0 mr-8 box-shadow-pop rounded-lg bg-lightGrey-100"
    >
      <div
        class="p-4 w-48 h-64"
        @Click="
          detail(
            `/admin/detail`,
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
import moment from "moment";
import { useRouter } from "vue-router";
export default {
  computed: {
    moment: () => moment,
  },
  name: "MyAssigned",
  props: ["assignedToMe"],
  setup() {
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
