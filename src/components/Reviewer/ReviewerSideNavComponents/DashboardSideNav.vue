<template>
  <div class="mb-2">
    <li class=" justify-start static">
      <transition name="slide-fade-to-left">
        <div class="">
          <div
          @click="dashboardMenuHandler('dashboard')"
            class=" justify-center items-center "
          >
            <div class="p-1 ">
              <h3 class="text-lightBlueB-500 mt-tiny">
                <span style="color: white;">
                  <i class="mr-2 fa fa-dashboard"></i>
                </span>
                <span class="text-lg" style="color: white; "
                  >Dashboard</span
                >
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
    
    setup(props, {emit}) {
        const dashboardMenuHandler = (menu) => {
            emit("selectDashboardMenu", menu);
        }

        return {
            dashboardMenuHandler,
        }
    }
}
</script>
