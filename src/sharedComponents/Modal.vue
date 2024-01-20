<template>
  <div
    class="fixed w-screen h-screen top-0 left-0 glass z-50 flex justify-end sm:justify-center items-center flex-col"
  >
    <transition name="slide-fade-to-top">
      <slot v-if="showContent"></slot>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showContent: false
    };
  },
  mounted() {
    this.showContent = true;
  }
};
</script>
<style lang="postcss" scoped>
.close-section-wrapper {
  width: auto;
}

.slide-fade-to-top-enter-active,
.slide-fade-to-right-enter-active,
.slide-fade-to-left-enter-active {
  transition: all 0.8s ease-in;
}

.slide-fade-to-top-leave-active,
.slide-fade-to-right-leave-active,
.slide-fade-to-left-leave-active {
  transition: all 0.3s all-ease;
}

.slide-fade-to-top-enter-from,
.slide-fade-to-top-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-fade-to-right-enter-from,
.slide-fade-to-right-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-fade-to-left-enter-from,
.slide-fade-to-left-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
