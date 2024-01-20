<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-primary-100"
  >
    <LoginCard />
  </div>
</template>
<script>
import LoginCard from "@/components/Login/Login";

export default {
  components: { LoginCard },
  data() {
    return {
      credentials: {
        emailAddress: "",
        password: "",
      },
      credentialsErrors: {
        emailAddress: undefined,
        password: undefined,
      },
    };
  },

  methods: {
    submit() {
      this.credentialsErrors = this.validateForm(this.credentials);
      if (Object.keys(this.credentialsErrors).length) return;
      let email = {
        emailAddress: this.credentials.emailAddress,
      };
      this.$store.dispatch("user/setContact", email);
      this.$router.push({ path: "/menu" });
    },
    validateForm(credentials) {
      const errors = {};
      if (!credentials.emailAddress) errors.emailAddress = "Email Required";
      if (!credentials.password) errors.password = "Password Required";

      if (
        credentials.ememailAddress &&
        !this.isEmail(credentials.emailAddress)
      ) {
        errors.email = "Invalid Email";
      }
      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },
};
</script>
<style lang="postcss" scoped>
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
