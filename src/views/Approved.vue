<template>
  <Navigation />
  <div class="flex flex-row">
    <div class="sidenav">
      <SideNav />
    </div>
    <div class="menu">
      <div v-if="!this.showLoading" class="bg-lightBlueB-200">
        <h3
          style="color: #b30000; font-weight: bold"
          class="flex justify-center pt-medium"
        >
          Applicants are required to bring all original documents to licensing
          office.
        </h3>
        <div class="flex pl-12 pt-medium">
          <Title message="New License Approved Applications" />
        </div>
        <div v-if="this.newlicense.length == 0" class="flex pl-12 ml-6">
          <h4>Nothing to Show.</h4>
        </div>
        <div
          v-if="this.newlicense.length != 0"
          class="mt-medium rounded ml-large"
        >
          <div
            class="flex flex-wrap"
            v-for="i in this.newlicense.length"
            v-bind:key="i"
          >
            <div
              @click="openServiceFeeModal"
              class="container mb-medium"
              v-for="item in this.newlicense.slice((i - 1) * 4, i * 4)"
              v-bind:key="item"
              v-bind:value="item"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  ml-4
                  mr-4
                  box-shadow-pop
                  rounded-lg
                  bg-lightGrey-100
                  cursor-pointer
                "
              >
                <div class="p-4 w-auto h-auto">
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Applicant Type: &nbsp;</b>
                    {{ item.applicantType.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Status: &nbsp;</b>{{ item.applicationStatus.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Code: &nbsp;</b>{{ item.newLicenseCode }}
                  </span>
                  <span
                    v-if="item.certified == true"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>Yes
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>No
                  </span>
                  <span
                    v-if="item.reviewer.region"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b
                    >{{ item.reviewer.region.name }}
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b>{{ item.reviewer.name }}
                  </span>
                  <span
                    class="
                      mt-medium
                      text-lightBlueB-500
                      flex
                      justify-end
                      content-center
                    "
                  >
                    {{
                      item.createdAt
                        ? moment(item.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )
                        : "-"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!this.showLoading" class="bg-lightBlueB-200">
        <div class="flex pl-12 pt-medium">
          <Title message="Renewal Approved Applications" />
        </div>
        <div v-if="this.renewal.length == 0" class="flex pl-12 ml-6">
          <h4>Nothing to Show.</h4>
        </div>
        <div v-if="this.renewal.length != 0" class="mt-medium rounded ml-large">
          <div
            class="flex flex-wrap"
            v-for="i in this.renewal.length"
            v-bind:key="i"
          >
            <div
              @click="openServiceFeeModal"
              class="container mb-medium"
              v-for="item in this.renewal.slice((i - 1) * 4, i * 4)"
              v-bind:key="item"
              v-bind:value="item"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  ml-4
                  mr-4
                  box-shadow-pop
                  rounded-lg
                  bg-lightGrey-100
                  cursor-pointer
                "
              >
                <div class="p-4 w-auto h-auto">
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Applicant Type: &nbsp;</b>
                    {{ item.applicantType.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Status: &nbsp;</b>{{ item.applicationStatus.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Code: &nbsp;</b>{{ item.renewalCode }}
                  </span>
                  <span
                    v-if="item.certified == true"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>Yes
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>No
                  </span>
                  <span
                    v-if="item.reviewer.region"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b
                    >{{ item.reviewer.region.name }}
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b>{{ item.reviewer.name }}
                  </span>
                  <span
                    class="
                      mt-medium
                      text-lightBlueB-500
                      flex
                      justify-end
                      content-center
                    "
                  >
                    {{
                      item.createdAt
                        ? moment(item.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )
                        : "-"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!this.showLoading" class="bg-lightBlueB-200">
        <div class="flex pl-12 pt-medium">
          <Title message="Good Standing Approved Applications" />
        </div>
        <div
          v-if="this.goodstanding.length == 0"
          class="flex pl-12 ml-6 h-screen"
        >
          <h4>Nothing to Show.</h4>
        </div>
        <div
          v-if="this.goodstanding.length != 0"
          class="mt-medium rounded ml-large"
        >
          <div
            class="flex flex-wrap"
            v-for="i in this.goodstanding.length"
            v-bind:key="i"
          >
            <div
              @click="openServiceFeeModal"
              class="container mb-medium"
              v-for="item in this.goodstanding.slice((i - 1) * 4, i * 4)"
              v-bind:key="item"
              v-bind:value="item"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  ml-4
                  mr-4
                  box-shadow-pop
                  rounded-lg
                  bg-lightGrey-100
                  cursor-pointer
                "
              >
                <div class="p-4 w-auto h-auto">
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Applicant Type: &nbsp;</b>
                    {{ item.applicantType.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Status: &nbsp;</b>{{ item.applicationStatus.name }}
                  </span>
                  <span
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Code: &nbsp;</b>{{ item.goodStandingCode }}
                  </span>
                  <span
                    v-if="item.certified == true"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>Yes
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Certified: &nbsp;</b>No
                  </span>
                  <span
                    v-if="item.reviewer.region"
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b
                    >{{ item.reviewer.region.name }}
                  </span>
                  <span
                    v-else
                    class="text-lightBlueB-500 mt-tiny flex justify-start content-center"
                  >
                    <b>Reviewer Region: &nbsp;</b>{{ item.reviewer.name }}
                  </span>
                  <span
                    class="
                      mt-medium
                      text-lightBlueB-500
                      flex
                      justify-end
                      content-center
                    "
                  >
                    {{
                      item.createdAt
                        ? moment(item.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )
                        : "-"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showLoading"
        class="flex justify-center justify-items-center mt-24"
      >
        <Spinner />
      </div>
      <transition name="slide-fade-to-left">
        <Modal v-if="this.approvalModal">
          <ApprovedMessageModal @approvalModal="this.approvalModal = false" />
        </Modal>
      </transition>
    </div>
  </div>
</template>

<script>
import SideNav from "./SideNav.vue";
import Title from "@/sharedComponents/TitleWithIllustration";
import RenderIllustration from "@/sharedComponents/RenderIllustration";
import Navigation from "@/views/Navigation";
import Spinner from "@/sharedComponents/Spinner";
import Modal from "@/sharedComponents/Modal";
import ApprovedMessageModal from "@/views/ApprovedMessageModal.vue";
import moment from "moment";

export default {
  components: {
    Navigation,
    SideNav,
    Title,
    Spinner,
    RenderIllustration,
    Title,
    Modal,
    ApprovedMessageModal,
  },
  data: function() {
    return {
      license: [],
      newlicense: [],
      renewal: [],
      goodstanding: [],
      showLoading: false,
      showDD: false,
      auth: false,
      token: "",
      approvalModal: false,
      itemId: "",
      applicationType: "",
    };
  },
  async created() {
    this.fetchLicensebyId();
  },
  computed() {
    if (this.token != undefined) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  },
  methods: {
    moment: function(date) {
      return moment(date);
    },
    openServiceFeeModal(item) {
      this.approvalModal = true;
      this.itemId = item.id;
      if (item.newLicenseCode != undefined) {
        this.applicationType = "newlicense";
      }
      if (item.renewalCode != undefined) {
        this.applicationType = "renewal";
      }
      if (item.goodStandingCode != undefined) {
        this.applicationType = "goodstanding";
      }
      window.localStorage.setItem("itemId", this.itemId);
      window.localStorage.setItem("applicationType", this.applicationType);
    },
    showDropDown() {
      this.showDD = !this.showDD;
    },
    fetchLicensebyId() {
      this.showLoading = !this.showLoading;
      this.$store
        .dispatch("newlicense/getNewLicense")
        .then((res) => {
          this.license = res.data.data;
          if (this.license) {
            this.newlicense = this.license.filter(function(e) {
              if (e.expertLevelId === 3) {
                return e.applicationStatus.code === "APP";
              } else {
                return (
                  e.applicationStatusId == 16 && e.previousAppStatusId == 5
                );
              }
            });
          }
        })
        .then(() => {
          this.$store.dispatch("renewal/getRenewalLicense").then((res) => {
            this.license = res.data.data;
            if (this.license) {
              this.renewal = this.license.filter(function(e) {
                if (e.expertLevelId === 3) {
                  return e.applicationStatus.code === "APP";
                } else {
                  return (
                    e.applicationStatusId == 16 && e.previousAppStatusId == 5
                  );
                }
              });
            }
          });
        })
        .then(() => {
          this.$store
            .dispatch("goodstanding/getGoodStandingLicense")
            .then((res) => {
              this.license = res.data.data;
              this.showLoading = !this.showLoading;
              if (this.license) {
                this.goodstanding = this.license.filter(function(e) {
                  if (e.expertLevelId === 3) {
                    return e.applicationStatus.code === "APP";
                  } else {
                    return (
                      e.applicationStatusId == 16 && e.previousAppStatusId == 5
                    );
                  }
                });
              }
            });
        });
    },
  },
};
</script>
<style>
@media only screen and (max-width: 1024px) {
  .sidenav {
    display: none;
  }
}
.menu {
  width: 80%;
}
.sidenav {
  width: 20%;
}
</style>
