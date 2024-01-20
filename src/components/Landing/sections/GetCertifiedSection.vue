<template>
  <section class="wrapper">
    <div
      class="illustration-and-message relative px-small pt-xl lg:pt-large xl:pt-0 box-border w-full flex flex-col-reverse lg:flex-row justify-end items-center"
    >
      <LandingIllustration
        class="block lg:absolute z-0 -mb-small sm:-mb-large"
      />
      <div
        class="content-wrapper-crtified flex justify-center flex-col lg:ml-small w-full sm:w-4/5 lg:w-5/12 z-10 -mb-large sm:-mb-xl lg:-mb-0"
      >
        <transition name="slide-fade-to-left">
          <section
            v-if="showContent"
            class="flex flex-col items-center lg:items-end"
          >
            <h1
              class="text-3xl sm:text-largeDisplay blue-text-gradient -mb-tiny sm:-mb-small"
            >
              Get Certified
            </h1>
            <hr
              class="yellow-gradient separator glow border-none separator-large"
            />
          </section>
        </transition>

        <section class="flex flex-col items-center">
          <transition name="fade">
            <h3
              class="mt-medium text-primary-600 text-center lg:text-left"
              v-if="showContent"
            >
              Everything you need for managing you medical licenses in Ethiopia.
            </h3>
          </transition>
          <transition name="fade">
            <h3
              class="mt-small text-primary-600 text-center lg:text-left"
              v-if="showContent"
            >
              Create, Manage and follow up on your license request online
            </h3>
          </transition>
          <transition name="slide-fade-to-left">
            <button
              class="mt-medium lg:mt-0 lg:self-end px-xl"
              v-if="showContent"
              @click="$emit('setShowSignup', true)"
            >
              Sign Up
            </button>
          </transition>
        </section>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, onMounted } from "vue";
import LandingIllustration from "./LandingIllustration";

export default {
  components: {
    LandingIllustration
  },
  emits: ["setShowSignup"],
  setup() {
    const showContent = ref(false);
    onMounted(() => {
      setTimeout(() => {
        showContent.value = true;
      }, 500);
    });
    return {
      showContent
    };
  }
};
</script>
<style lang="postcss" scoped>
.wrapper {
  @apply w-full bg-primary-100 flex justify-center items-center;
  height: auto;
}

svg {
  margin-top: 60px;
  height: auto;
  width: 98%;
}

@screen sm {
  svg {
    width: 70%;
  }
}

@screen lg {
  .wrapper {
    height: 500px;
  }
  svg {
    height: 530px;
    left: 0;
  }
}

.illustration-and-message {
  max-width: 1185px;
}

.content-wrapper-crtified {
  min-height: 300px;
}
</style>
