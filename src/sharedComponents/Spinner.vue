<template>
  <div>
    <svg class="spinner" viewBox="0 0 50 50">
      <circle
        class="path"
        cx="24"
        cy="24"
        r="14"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  </div>
</template>
<script>
export default {
  components: {},

  data() {},
};
</script>

<style>
.spinner {
  animation: spin 2s linear infinite;
  z-index: 2;
  position: relative;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
}
.spinner .path {
  stroke: rgb(52, 144, 220);
  stroke-linecap: round;
  animation: spinner-path 1.5s ease-in-out infinite;
}
@keyframes spin {
  100% {
    transform: spin(360deg);
  }
}
@keyframes spinner-path {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
