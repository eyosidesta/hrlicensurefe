<template>
  <ModalIdle v-if="isIdle" />
  <router-view v-slot="{ Component }">
    <!-- <transition name="fade" mode="out-in"> -->
    <component :is="Component" />
    <!-- </transition> -->
  </router-view>
</template>

<script>
import ModalIdle from "./sharedComponents/ModalIdle";
export default {
  components: {
    ModalIdle,
  },
  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
  },
};
</script>

<style>
@import "styles/tailwind.postcss";
@import "styles/fonts.css";
@import "styles/design-system.css";
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
