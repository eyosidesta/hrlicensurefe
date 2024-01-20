<template>
  <div
    id="success"
    style="width: 320px"
    class="fixed top-0 right-0 m-6 pt-4 mr-large"
  >
    <div class="  bg-blue-200 rounded-lg px-4 py-3 box-shadow-pop" role="alert">
      <div class="flex">
        <div class="py-1"><RenderIllustration illustration="Success" /></div>
        <div>
          <p class="font-bold text-white">
            Success
          </p>
          <p class="text-sm text-white">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RenderIllustration from "@/sharedComponents/RenderIllustration";
export default {
  components: { RenderIllustration },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {},
};
</script>
<style scoped>
#success {
  -webkit-animation: linear;
  -webkit-animation-name: run;
  -webkit-animation-duration: 2s;
}
@-webkit-keyframes run {
  0% {
    right: -5%;
  }
  25% {
    right: -2%;
  }
  50% {
    right: 0%;
  }
  100% {
    right: 0.5%;
  }
}
</style>
