<template>
  <div class="w-screen max-w-2xl mt-0 h-screen rounded-md">
    <div
      class="flex flex-col mt-large w-full bg-white blue-box-shadow-light rounded mb-large"
    >
      <div class="mt-large">
        <TitleWithIllustration
          illustration="PersonalInfo"
          message="Change Password"
        />
      </div>
      <new-password-form />
    </div>
  </div>
  
</template>

<script>
import TitleWithIllustration from "@/sharedComponents/TitleWithIllustration";
import NewPasswordForm from "./NewPasswordForm";

export default {
    components: {
        TitleWithIllustration,
        NewPasswordForm
    },
    name: "AdminPasswordInfo",
    setup() {
        return {
        } 
    }
}
</script>