<template>
  <div class="flex items-center justify-center">
    <RenderIllustration :illustration="illustration" />
    <Title :message="message" />
  </div>
</template>
<script>
import Title from "@/sharedComponents/Title";
import RenderIllustration from "@/sharedComponents/RenderIllustration";

export default {
  components: {
    Title,
    RenderIllustration
  },
  props: {
    message: {
      type: String,
      required: true
    },
    illustration: {
      type: String,
      required: true
    }
  },
  setup() {}
};
</script>
