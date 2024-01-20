<template>
  <div
    class="
      card-wrapper
      bg-white
      sm:rounded-lg
      w-full
      p-large
      flex flex-col
      justify-center
      items-center
      relative
      pt-8
      pb-8
    "
  >
    <button
      class="absolute top-0 right-0 mr-2 mt-2"
      @click="$emit('closeModal')"
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

    <Title message="Reset Password" />
    <label class="text-primary-700">Email address</label>
    <input class="w-full" type="email" required v-model="email" />
    <button
      class="
        block
        mx-auto
        w-1/2
        bg-lightBlue-500
        hover:bg-lightBlue-600
        hover:shadow-lg
      "
      v-on:click="sendEmails()"
    >
      Send
    </button>
    <span v-if="showLoading">
      <Spinner />
    </span>
    <div v-if="showFlash">
      <FlashMessage message="Email sent! Check Inbox or spam for the message" />
    </div>
    <div v-if="showFlashError">
      <ErrorMessage message="Something Went wrong please try again later" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Spinner from "@/sharedComponents/Spinner";
import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorMessage from "@/sharedComponents/ErrorFlashMessage";
import Title from "@/sharedComponents/Title";
import Modal from "@/sharedComponents/Modal";

export default {
  components: {
    Spinner,
    FlashMessage,
    Title,
    Modal,
    ErrorMessage,
  },
  setup() {
    let email = ref("");

    let showLoading = ref(false);
    let showFlash = ref(false);
    let showFlashError = ref(false);
    const store = useStore();
    const router = useRouter();
    const sendEmails = () => {
      let emailToBeSent = {
        email: email.value,
      };
      store
        .dispatch("profile/sendEmail", emailToBeSent)
        .then((res) => {
          showLoading.value = false;
          if (res.data.status === "Success") {
            showFlash.value = true;

            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            showLoading.value = false;
            showFlashError.value = true;

            setTimeout(() => {
              location.reload();
            }, 2500);
          }
        })
        .catch((err) => {
          showLoading.value = false;
          showFlashError.value = true;

          setTimeout(() => {
            location.reload();
          }, 2500);
        });
    };
    return {
      email,
      sendEmails,
      showLoading,
      showFlash,
      showFlashError,
    };
  },
};
</script>

<style lang="postcss" scoped>
.close-svg {
  width: 16px;
}

.card-wrapper {
  max-width: 450px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
  height: auto;
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
</style>
{"mode":"full","isActive":false}
