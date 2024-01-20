<template>
  <div class="pl-large w-52 h-26" v-if="nothingToShow == true">
    <div class="flex content-center justify-center">
      <h2>Nothing To Show!</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "NothingToShow",
  props: ["nothingToShow"],
  setup() {
  },
};
</script>
