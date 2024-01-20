<template>
    <div>
        <NewAdminNavigationBar />
        <div
      class="w-screen h-full bg-lightBlueB-200 flex items-center justify-center"
    >
    <transition name="fade" mode="out-in">
        <AdminPasswordInfo />
    </transition>
        </div>
        </div>
</template>


<script>
import { onMounted } from '@vue/runtime-core'
import NewAdminNavigationBar from "@/components/Reviewer/Configurations/ChangePassword/NewAdminNavigationBar";
import AdminPasswordInfo from "@/components/Reviewer/Configurations/ChangePassword/AdminPasswordInfo";
export default {
    components: {
        NewAdminNavigationBar,
        AdminPasswordInfo
    },
    name: "ChangePassword",
    setup() {
        return {
            auth: false,
            token: "",
            showDD: false,
        };
        onMounted(() => {

        })
    }
}
</script>