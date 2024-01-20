<template>
  <!-- w-full blue-gradient flex justify-center items-center -->
  <div
    class="w-full bg-white flex justify-center items-center py-large sm:py-xl renewal-wrapper"
    ref="wrapperRef"
  >
    <section
      class="content-wrapper flex flex-col md:flex-row justify-center md:justify-start items-center"
    >
      <transition name="slide-fade-to-right">
        <svg
          v-if="showElement"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 143.945 143.736"
          id="renewal-icon"
        >
          <defs>
            <linearGradient
              id="renewal"
              y1=".535"
              x2="1"
              y2=".537"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#285180" />
              <stop offset="1" stop-color="#4185d0" />
            </linearGradient>
          </defs>
          <path
            data-name="Intersection 45"
            d="M-16629 103.743a4.512 4.512 0 01-2.824-4.18 4.5 4.5 0 014.5-4.5 63.078 63.078 0 0062.975-63.029 62.608 62.608 0 00-18.48-44.533 62.511 62.511 0 00-44.494-18.5 63.075 63.075 0 00-62.979 63.029 62.873 62.873 0 0018 44.11v-8.1a4.5 4.5 0 014.494-4.5 4.5 4.5 0 014.5 4.5v18.016a4.5 4.5 0 01-4.5 4.507h-17.988a4.506 4.506 0 01-4.5-4.507 4.5 4.5 0 014.5-4.5h6.213a71.831 71.831 0 01-19.711-49.522 71.587 71.587 0 0121.082-50.935 71.472 71.472 0 0150.893-21.095 71.445 71.445 0 0150.859 21.128 71.581 71.581 0 0121.111 50.9 71.571 71.571 0 01-21.082 50.93 71.39 71.39 0 01-44 20.776zm27.291-40.274l-7.986-4.2a1.629 1.629 0 00-1.057 0l-7.977 4.2a3.591 3.591 0 01-1.652.428 2.829 2.829 0 01-1.66-.524 3.108 3.108 0 01-1.127-3.106l1.115-6.816h-36.988a5.1 5.1 0 01-5.1-5.1V5.278a5.1 5.1 0 015.1-5.1h63.432a5.11 5.11 0 015.1 5.1v43.07a5.107 5.107 0 01-5.1 5.1h-2.783l1.119 6.816a3.09 3.09 0 01-1.137 3.111 2.784 2.784 0 01-1.646.524 3.567 3.567 0 01-1.649-.43zm-5.943-8.074l5.643 2.968-1.09-6.657s-.01-.017-.01-.021l-.7-4.272a13.129 13.129 0 01-6.41 1.664 13.142 13.142 0 01-6.418-1.664l-1.795 10.95 5.643-2.968a5.561 5.561 0 012.57-.587 5.568 5.568 0 012.571.592zm10.693-19.59a13.2 13.2 0 01-2.959 8.338.157.157 0 01.012.059l.8 4.875h3.5a.742.742 0 00.73-.729V5.278a.742.742 0 00-.73-.729h-63.432a.741.741 0 00-.729.729v43.07a.741.741 0 00.729.729h37.705l.8-4.875a.157.157 0 01.012-.059 13.193 13.193 0 01-2.955-8.338 13.278 13.278 0 0113.26-13.272 13.283 13.283 0 0113.261 13.272zm-22.15 0a8.9 8.9 0 008.891 8.9 8.9 8.9 0 008.887-8.9 8.9 8.9 0 00-8.887-8.9 8.9 8.9 0 00-8.887 8.9zm-33.777-6.8a2.189 2.189 0 01-2.18-2.192 2.182 2.182 0 012.18-2.184h20.986a2.182 2.182 0 012.184 2.184A2.19 2.19 0 01-16631.9 29zm0-11.86a2.189 2.189 0 01-2.18-2.192 2.185 2.185 0 012.18-2.188h49.543a2.189 2.189 0 012.189 2.188 2.192 2.192 0 01-2.189 2.192z"
            transform="translate(16699.293 39.993)"
            fill="url(#renewal)"
          />
        </svg>
      </transition>
      <transition name="slide-fade-to-top">
        <section
          class="flex flex-col sm:ml-large items-center md:items-start"
          v-if="showElement"
        >
          <div class="flex flex-col items-center">
            <h1
              class="text-3xl sm:text-largeDisplay blue-text-gradient -mb-small"
            >
              Renewal
            </h1>
            <hr class="yellow-gradient glow separator border-none" />
          </div>
          <h3 class="mt-small text-primary-600 text-center">
            Renew existing previous license
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
<style lang="postcss">
.renewal-wrapper {
  min-height: 300px;
}
.new-license-wrapper {
  height: 370px;
}

.content-wrapper {
  width: 90%;
  max-width: 714px;
}

#renewal-icon {
  height: 143px !important;
}

</style>
