<template>
  <div class="flex flex-col justify-center items-center m-tiny">
    <h2 class="font-AtkinsonHyperlegibleBold -mb-1 tracking-wide">
      {{ message }}
    </h2>
    <hr class="yellow-gradient border-none" />
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "No title"
    }
  },
  setup() {}
};
</script>
<style lang="postcss" scoped>
hr {
  width: 64px;
  height: 6px;
  border-radius: 3px;
}
</style>
