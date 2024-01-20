<template>
  <section
    class="w-full bg-white shadow-md h-large px-tiny sm:px-small flex justify-between items-center fixed top-0 z-50 glass"
  >
    <div class="flex justify-center items-center">
      <RenderIllustration illustration="Logo" class="hidden sm:block" />
      <h3 class="ml-tiny font-AtkinsonHyperlegibleBold">HRIS - License</h3>
    </div>
    <button
      variant="outline"
      class="h-small"
      @click="$emit('setShowLogin', true)"
    >
      Log In
    </button>
  </section>
</template>
<script>
import RenderIllustration from "@/sharedComponents/RenderIllustration";
export default {
  components: { RenderIllustration },
  emits: ["setShowLogin"]
};
</script>
<style lang="postcss" scoped>
h3 {
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  background: linear-gradient(-70deg, #3674b9, #b5b173);
  -webkit-background-clip: text;
}
</style>
