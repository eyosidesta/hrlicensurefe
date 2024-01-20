<template>
  <!-- w-full blue-gradient flex justify-center items-center -->
  <div
    class="w-full blue-gradient flex justify-center items-center py-large sm:py-xl box-border"
    ref="wrapperRef"
  >
    <section
      class="content-wrapper-new-license w-full flex flex-col md:flex-row justify-center md:justify-start items-center"
    >
      <transition name="slide-fade-to-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 166.215 143.74"
          v-if="showElement"
        >
          <defs>
            <linearGradient
              id="newLicense"
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
            data-name="Intersection 39"
            d="M-16550.645 117.267l-18.014-9.483a3.815 3.815 0 00-2.389 0l-18.014 9.483a8.02 8.02 0 01-3.732.973 6.3 6.3 0 01-3.73-1.182 6.989 6.989 0 01-2.561-7.009l2.523-15.377h-83.5a11.53 11.53 0 01-11.516-11.512v-97.149a11.53 11.53 0 0111.516-11.512h143.188a11.525 11.525 0 0111.512 11.512v97.145a11.526 11.526 0 01-11.512 11.516h-6.271l2.52 15.373a6.978 6.978 0 01-2.561 7.013 6.325 6.325 0 01-3.727 1.182 8.035 8.035 0 01-3.732-.973zm-13.414-18.215l12.734 6.7-2.461-15.02a.19.19 0 01-.008-.046l-1.58-9.629a29.758 29.758 0 01-14.48 3.744 29.753 29.753 0 01-14.475-3.744l-4.049 24.7 12.734-6.7a12.6 12.6 0 015.789-1.325 12.619 12.619 0 015.796 1.32zM-16681.7-13.989V83.16a1.665 1.665 0 001.643 1.643h84.951c.053 0 .1 0 .158.008l1.807-11a.956.956 0 00.025-.126 29.792 29.792 0 01-6.67-18.81 29.967 29.967 0 0129.932-29.936 29.968 29.968 0 0129.938 29.936 29.792 29.792 0 01-6.67 18.81 1.182 1.182 0 00.025.13l1.8 10.992h7.889a1.669 1.669 0 001.645-1.643v-97.153a1.669 1.669 0 00-1.645-1.643h-143.187a1.665 1.665 0 00-1.641 1.643zm91.783 68.86a20.086 20.086 0 0020.063 20.064 20.087 20.087 0 0020.068-20.064 20.091 20.091 0 00-20.068-20.068 20.089 20.089 0 00-20.062 20.068zm-76.248-15.352a4.934 4.934 0 01-4.934-4.934 4.934 4.934 0 014.934-4.934h47.373a4.934 4.934 0 014.934 4.934 4.934 4.934 0 01-4.934 4.934zm0-26.754a4.934 4.934 0 01-4.934-4.934 4.934 4.934 0 014.934-4.934h111.844a4.932 4.932 0 014.934 4.934 4.932 4.932 0 01-4.934 4.934z"
            transform="translate(16691.572 25.501)"
            fill="url(#newLicense)"
          />
        </svg>
      </transition>
      <transition name="slide-fade-to-top">
        <section
          v-if="showElement"
          class="flex flex-col px-small sm:ml-large items-center md:items-start"
        >
          <div class="flex flex-col items-center">
            <h1
              class="text-3xl sm:text-largeDisplay white-text-gradient -mb-tiny sm:-mb-small"
            >
              New License
            </h1>
            <hr class="yellow-gradient separator border-none" />
          </div>
          <h3 class="mt-small text-primary-100 text-center block relative">
            Create and manage a new license request, follow up on the status.
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

.content-wrapper-new-license {
  max-width: 714px;
}

svg {
  height: 143px !important;
}

@screen sm {
  svg {
    width: 70%;
  }
}
</style>
