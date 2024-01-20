<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-primary-100"
  >
    <SignupCard />
  </div>
</template>
<script>
import SignupCard from "@/components/Signup/Signup";

export default {
  components: { SignupCard },
  data() {
    return {
      credentials: {
        emailAddress: "",
        phoneNumber: ""
      },
      // credentialsErrors: {
      //   email: undefined,
      //   password: undefined,
      //   confirmPassword: undefined,
      //   diffPassword: undefined,
      // },
      credentialsErrors: {
        emailAddress: undefined,
        phoneNumber: undefined
      }
    };
  },
  methods: {
    closeOption() {
      this.$emit("closeModal", false);
    },
    submit() {
      // this.credentialsErrors = this.validateForm(this.credentials);
      // if (Object.keys(this.credentialsErrors).length) return;
      let signup = {
        emailAddress: this.credentials.emailAddress,
        phoneNumber: this.credentials.phoneNumber
      };
      this.$store.dispatch("user/signUp", signup);
      this.$router.push({ path: "/addProfile" });
    },
    validateForm(credentials) {
      const errors = {};
      if (!credentials.emailAddress) errors.emailAddress = "Email Required";
      if (!credentials.phoneNumber)
        errors.phoneNumber = "Phone Number Required";
      // if (!credentials.confirmPassword)
      //   errors.confirmPassword = "Confirmation Password Required";
      if (credentials.emailAddress && !this.isEmail(credentials.emailAddress)) {
        errors.emailAddress = "Invalid Email";
      }
      // if (credentials.password != credentials.confirmPassword)
      //   errors.diffPassword = "Password does not match";
      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }
};
</script>

<style lang="postcss" scoped>
.close-svg {
  width: 16px;
}

.close-button {
  min-width: 48px;
  width: 48px;
  min-height: 48px;
  height: 48px;
  padding: 0;
  margin: 0;
  border-radius: 9999px !important;
  top: 10px;
  right: 10px;
}

.card-wrapper {
  max-width: 450px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}

@screen md {
  .card-wrapper {
    box-shadow: 0px 3px 6px #1e40af82;
  }
}
</style>
