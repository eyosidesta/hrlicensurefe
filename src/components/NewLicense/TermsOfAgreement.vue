<template>
  <div
    class="card-wrapper max-w-7xl bg-primary-200 sm:rounded-lg p-large flex flex-col justify-center items-center relative"
  >
    <Title message="Required Documents" />
    <button
      class="absolute top-0 right-0 mr-2 mt-2"
      @click="$emit('showTermsOfAgreement', false)"
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
    <div class="flex flex-row">
      <div class="ml-8">
        <h2>Foreigner</h2>
        <ul>
          <li>Photo</li>
          <li>Passport(Identification Card)</li>
          <li>Health Exam Certificate</li>
          <li>Professional Document Certificate</li>
          <li>Professional Document Diploma</li>
          <li>Professional Document Transcript</li>
          <li>English Language Certificate</li>
          <li>Service Fee</li>
        </ul>
      </div>
      <div class="ml-8">
        <h2>Local</h2>
        <ul>
          <li>Photo</li>
          <li>Passport(Identification Card)</li>
          <li>Health Exam Certificate</li>
          <li>COC</li>
          <li>8<sup>th</sup> Grade Certificate</li>
          <li>10<sup>th</sup> Grade Certificate</li>
          <li>12<sup>th</sup> Grade Certificate</li>
          <li>9<sup>th</sup> - 10<sup>th</sup> Transcript</li>
          <li>11<sup>th</sup> - 12<sup>th</sup> Transcript</li>
          <li>Support Letter</li>
          <li>Work Experience Certificate</li>
          <li>Service Fee</li>
        </ul>
      </div>
      <div class="ml-8">
        <h2>Foreigner Ethiopian</h2>
        <ul>
          <li>Photo</li>
          <li>Passport(Identification Card)</li>
          <li>Health Exam Certificate</li>
          <li>Professional Document Certificate</li>
          <li>Professional Document Diploma</li>
          <li>Professional Document Transcript</li>
          <li>HERQA</li>
          <li>Support Letter</li>
          <li>Service Fee</li>
        </ul>
      </div>
    </div>

    <router-link to="/newLicense">
      <h2 class="mt-4">Continue</h2>
    </router-link>
  </div>
</template>
<script>
import Title from "@/sharedComponents/Title";

export default {
  components: { Title },

  setup() {},
};
</script>
<style lang="postcss" scoped>
.close-svg {
  width: 16px;
}

.card-wrapper {
  max-width: 750px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
</style>