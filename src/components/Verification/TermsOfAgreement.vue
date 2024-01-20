<template>
  <div
    class="card-wrapper max-w-7xl bg-primary-200 sm:rounded-lg p-large flex flex-col justify-center items-center relative"
  >
    <Title message="Required Documents for Verification" />
    <button
      class="absolute top-0 right-0 mr-2 mt-2"
      @click="$emit('showTermsOfAgreementV', false)"
      variant="rounded"
    >
      <svg
        viewBox="0 0 329.269 329"
        xmlns="http://www.w3.org/2000/svg"
        class="close-svg fill-current text-primary-100 relative"
      >
        <path
          d="M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
        />
      </svg>
    </button>
    <div>
      <span class="flex justify-center mt-small mb-small text-lg font-semibold">{{
        documentMessage
      }}</span>
      <div class="ml-8">
        <h2>For All Applicants</h2>
        <ul>
          <li>Letter from Hiring Organization</li>
          <li>License Copy</li>
        </ul>
      </div>
    </div>
    <router-link to="/verification">
      <h2 class="mt-4">Continue</h2>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import MESSAGE from "../../composables/documentMessage";
import { onMounted } from "@vue/runtime-core";
import Title from "@/sharedComponents/Title";

export default {
  components: { Title },

  setup() {
    let documentMessage = ref("");
    onMounted(() => {
      documentMessage.value = MESSAGE.DOC_MESSAGE;
    });
    return {
      documentMessage,
    };
  },
};
</script>
<style lang="postcss" scoped>
.close-svg {
  width: 16px;
}

.card-wrapper {
  width: auto;
  height: auto;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
</style>
