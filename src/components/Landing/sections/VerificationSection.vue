<template>
  <!-- w-full blue-gradient flex justify-center items-center -->
  <div
    class="w-full blue-gradient flex justify-center items-center py-large sm:py-xl box-border"
    ref="wrapperRef"
  >
    <section
      class="content-wrapper flex  flex-col md:flex-row justify-center md:justify-start items-center"
    >
      <transition name="slide-fade-to-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-if="showElement"
          viewBox="0 0 151.438 143.74"
        >
          <defs>
            <linearGradient
              id="verification"
              x1="-.569"
              y1="-.524"
              x2="1"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#fde68a" />
              <stop offset="1" stop-color="#3674b9" />
            </linearGradient>
          </defs>
          <path
            data-name="Intersection 47"
            d="M-16575.818-621.759l-23.039-10.3-23.033 10.3h-.461l-12.693-22.051-25.068-5.307 2.682-25.48-17.141-19.032 17.141-19.037-2.682-25.48 25.068-5.307 12.693-22.047h.461l23.033 10.3 23.039-10.3h.461l12.689 22.047 25.07 5.307-2.684 25.48 17.146 19.037-17.146 19.032 2.684 25.48-25.07 5.307-12.689 22.051zm-3.328-11.222l10.762-18.7 21.115-4.469-2.26-21.455 14.434-16.027-14.434-16.031 2.26-21.455-21.115-4.465-10.762-18.7-19.711 8.8-19.709-8.8-10.76 18.7-21.117 4.465 2.26 21.455-14.434 16.031 14.434 16.027-2.26 21.455 21.117 4.469 10.76 18.7 19.709-8.808zm-52.385-61.063l6.279-6.276 19.766 19.758 31.744-35.562 6.627 5.911-38.006 42.584z"
            transform="translate(16674.572 765.5)"
            fill="url(#verification)"
          />
        </svg>
      </transition>
      <transition name="slide-fade-to-top">
        <section
          v-if="showElement"
          class="flex flex-col sm:ml-large items-center md:items-start"
        >
          <div class="flex flex-col items-center">
            <h1
              class="text-3xl sm:text-largeDisplay white-text-gradient -mb-tiny sm:-mb-small"
            >
              Verification
            </h1>
            <hr class="yellow-gradient separator border-none" />
          </div>
          <h3 class="mt-small text-primary-100 text-center">
            Verification of existing licenses
          </h3>
        </section>
      </transition>
    </section>
  </div>
</template>

<script>
import useIntersectionObserver from "@/composables/useIntersectionObserver";
export default {
  setup() {
    const { showElement, wrapperRef } = useIntersectionObserver();
    return {
      showElement,
      wrapperRef
    };
  }
};
</script>
<style lang="postcss" scoped>
.new-license-wrapper {
  height: 370px;
}

.content-wrapper {
  width: 90%;
  max-width: 714px;
}

svg {
  height: 143px !important;
}
</style>
