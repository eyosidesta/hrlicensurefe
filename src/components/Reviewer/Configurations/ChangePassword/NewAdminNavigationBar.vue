<template>
  <header class="px-10 py-3.5 inset-box-shadow bg-lightBlueB-100">
    <nav class="">
      <main class="flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/menu">
            <RenderIllustration
              class=""
              illustration="Logo"
              message="Address"
            />
          </router-link>
          <h2 class="text-md AtkinsonHyperlegibleBold text-primary-600 ml-2 ">
            HRIS - License
          </h2>
        </div>

        <div class="flex items-center space-x-5">
          <div class="relative inline-block text-left">
            <a
              class="focus:outline-none bg-lightBlueB-300 text-lightBlueB-400 hover:text-gray-800 w-7 h-7 rounded-full flex items-center justify-center"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
              href="#"
              v-on:click="showDropDown()"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-8 h-8 px-1 py-1"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M3,21 h18 C 21,12 3,12 3,21" />
              </svg>
            </a>
            <div
              v-if="showDD == true"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  @click="logout()"
                  class="block px-4 py-2 text-sm text-blue-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  id="logout"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import Navigation from "@/views/Navigation";
import Title from "@/sharedComponents/Title";
import RenderIllustration from "@/sharedComponents/RenderIllustration";
export default {
  components: {
    ReviewerNavBar,
    Navigation,
    Title,
    RenderIllustration,
  },
  name: "NewAdminNavigationBar",
  setup() {

    const router = useRouter();
    let showDD = ref(false);
    const showDropDown = () => {
      showDD.value = !showDD.value;
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("adminEmail")
      localStorage.removeItem("allAdminData")
      localStorage.removeItem("adminId");
      localStorage.removeItem("role");
      router.push({path: "/admin"});
    }
    onMounted(() => {});

    return {
      auth: false,
      token: "",
      showDD,
      showDropDown,
      logout,
    };
  },
};
</script>
