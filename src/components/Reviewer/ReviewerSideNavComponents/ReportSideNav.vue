<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
            @click="reportMenuHandler('report')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 fa fa-file-text"></i>
                </span>
                <span class="text-lg" style="color: white; ">Report</span>
              </h3>
            </div>
          </div>
        </div></transition
      >
    </li>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const reportMenuHandler = (menu) => {
      emit("selectReportMenu", menu);
    };

    return {
      reportMenuHandler,
    };
  },
};
</script>
