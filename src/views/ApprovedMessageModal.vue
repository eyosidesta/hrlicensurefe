<template>
  <div
    class="
      card-wrapper
      max-w-4xl
      bg-white
      sm:rounded-lg
      p-large
      flex flex-row
      justify-center
      items-center
      relative
      pt-8
      pb-8
      shadow-2xl
    "
  >
    <div>
      <button
        id="myCheck"
        class="absolute top-0 right-0 mr-4 mt-4"
        @click="$emit('approvalModal', false)"
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
    </div>
    <div id="holder" class="flex justify-center rounded mb-medium pb-4">
      <div>
        <div class="flex flex-col pt-medium rounded mb-medium w-72">
          <div class="text-center">
            <span class="text-lg">
              Applicants are required to bring all original documents to
              licensing office.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {},
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {});
    return {};
  },
};
</script>
<style>
.card-wrapper {
  width: 600px;
  height: auto;
}
#holder {
  width: 600px;
  height: auto;
}
.photoFile {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 260px;
  position: absolute;
  cursor: pointer;
  border-radius: 0%;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

img {
  width: 250px;
  height: 250px;
  border-radius: 0px;
}
.withdraw {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
  border-color: tomato;
}
.close-svg {
  width: 16px;
}
</style>
