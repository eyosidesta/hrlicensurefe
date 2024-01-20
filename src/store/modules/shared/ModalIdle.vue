<template>
  <div class="overlay" v-if="token && token !== null">
    <div class="modal">
      <div class="modal__title">
        <span>Session Expired</span>
      </div>
      <div class="p-3">
        <p>You have left this browser idle for 30 minutes.</p>
        <p>{{ time }} second left</p>
      </div>
    </div>
  </div>

  <div v-if="showFlash">
    <FlashMessage message="Logged out!" />
  </div>
</template>

<script>
import FlashMessage from "@/sharedComponents/FlashMessage";

export default {
  components: {
    FlashMessage,
  },
  data() {
    return {
      time: 10,
      showFlash: false,
      token: null
    };
  },
  created() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    if (this.token && this.token !== null) {
      let timerId = setInterval(() => {
        this.time -= 1;
        if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);

        if (this.time < 1) {
          clearInterval(timerId);
          localStorage.removeItem("token");
          localStorage.removeItem("adminEmail");
          localStorage.removeItem("allAdminData");
          localStorage.removeItem("adminId");
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
          localStorage.removeItem("educationalLevel");

          this.$router.push("/");
          this.showFlash = true;
        }
      }, 1000);
    }
  },
};
</script>

<style lang="postcss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 500px;
  box-shadow: 1px 2px 4px rgba(153, 155, 168, 0.12);
  border-radius: 4px;
  @apply bg-white p-2;
}

.modal__title {
  color: #38404f;
  @apply flex items-center justify-between p-3 font-bold;
}
</style>