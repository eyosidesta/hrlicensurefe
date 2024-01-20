<template>
  <div
    class="card-wrapper bg-primary-200 sm:rounded-lg p-large flex flex-col justify-center items-center relative"
  >
    <Title message="Required Documents for New License" />
    <button
      class="absolute top-0 right-0 mr-2 mt-2"
      @click="$emit('showTermsOfAgreementNL', false)"
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
    <span class="flex justify-center mt-small mb-small text-lg font-semibold">{{
      documentMessage
    }}</span>
    <div class="flex flex-row">
      <div class="ml-2">
        <h2>Foreigner</h2>
        <ul>
          <li>Passport</li>
          <li>Medical Certificate</li>
          <div class="tooltip">
            English Language Proficiency Certificate
            <span class="tooltiptext ml-4">
              For non-English speaking countries only
            </span>
          </div>
          <br />
          <div class="tooltip">
            Higher Education Relevance and Quality Agency
            <span class="tooltiptext ml-4">
              Equivalence Letter
            </span>
          </div>
          <br />
          <div class="tooltip">
            Authenticated Academic Document
            <span class="tooltiptext ml-4">
              Diploma, Transcript for both Under and Post-Graduate Certificate
            </span>
          </div>
          <br />
          <li>
            Authenticated Professional License from Country of Origin
          </li>
          <div class="tooltip">
            Current Work Experience / Goodstanding Letter
            <span class="tooltiptext ml-4">
              More than two years.
            </span>
          </div>
          <br />
          <div class="tooltip">
            Renewed License of Health Facility
            <span class="tooltiptext ml-4">
              Found in Ethiopia
            </span>
          </div>
          <br />
          <div class="tooltip">
            Request Letter from Hiring Health Facility
            <span class="tooltiptext ml-4">
              Found in Ethiopia
            </span>
          </div>
        </ul>
      </div>
      <div class="ml-2">
        <h2>Ethiopian</h2>
        <ul>
          <li>Residence ID</li>
          <li>Medical Certificate</li>
          <div class="tooltip">
            COC Certificate
            <span class="tooltiptext ml-4">
              Only for Diploma Graduates
            </span>
          </div>
          <br />
          <div class="tooltip">
            Academic Document
            <span class="tooltiptext ml-4">
              Diploma, Bachelor or MD, Masters or specialists, PhD
            </span>
          </div>
          <br />
          <li>
            8<sup>th</sup>, 10<sup>th</sup>, 12<sup>th</sup> Grade Certificate
          </li>
          <li>9<sup>th</sup> - 10<sup>th</sup> Grade Transcript</li>
          <li>11<sup>th</sup> - 12<sup>th</sup> Grade Transcript</li>
          <div class="tooltip">
            Payroll Document
            <span class="tooltiptext ml-4">
              Non-government Institutions
            </span>
          </div>
          <br />
          <div class="tooltip">
            Support Letter from Sponsored Institution
            <span class="tooltiptext ml-4">
              For those upgraded by the sponsorship of an Institution
            </span>
          </div>
          <br />
          <li>Work Experience</li>
          <li>Academic Transcript</li>
        </ul>
      </div>
      <div class="ml-2">
        <h2>Ethiopians from Abroad</h2>
        <ul>
          <div class="tooltip">
            Residence ID or Passport or Yellow Card
            <span class="tooltiptext ml-4">
              Proof of Ethiopian decent
            </span>
          </div>
          <br />
          <li>Medical Certificate</li>
          <div class="tooltip">
            Higher Education Relevance and Quality Agency
            <span class="tooltiptext ml-4">
              Equivalence letter
            </span>
          </div>
          <br />
          <div class="tooltip">
            Authenticated Academic Document
            <span class="tooltiptext ml-4">
              Diploma, Transcript for both Under and Post-Graduate Certificate
            </span>
          </div>
          <br />
          <li>
            Authenticated Professional License from Country of Origin
          </li>
          <div class="tooltip">
            Current Work Experience/ Goodstanding Letter
            <span class="tooltiptext ml-4">
              More than two years
            </span>
          </div>
          <br />
          <li>Support Letter from Sponsored Institution</li>
        </ul>
      </div>
    </div>

    <router-link to="/newLicense">
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
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #1e40af82;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted white; /* If you want dots under the hoverable text */
}
</style>
