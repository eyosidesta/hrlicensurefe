<template
  ><div>
    <!-- <ReviewerNavBar tab="Report" /> -->
    <div class="flex flex-row">
      <!-- <div>
        <ReviewerSideBar style="width: 30vh" />
      </div> -->
      <div>
        <div class="px-4 sm:px-4">
          <div class="py-8">
            <div class="flex flex-row titile-container">
              <div class="ml-2 flex flex-row">
                <div>
                  <input
                    v-on:click="handleCheckBoxClick('newLicense', $event)"
                    type="checkbox"
                    class="bg-gray-50 mr-4 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    :checked="checked.newLicense"
                  />
                  <a class="text-2xl font-semibold leading-tight">
                    New License Report
                  </a>
                </div>
                <div class="ml-8">
                  <input
                    v-on:click="handleCheckBoxClick('renewal', $event)"
                    type="checkbox"
                    class="bg-gray-50 mr-4 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    :checked="checked.renewal"
                  />
                  <a class="text-2xl font-semibold leading-tight">
                    Renewal Report
                  </a>
                </div>
                <div class="ml-8">
                  <input
                    v-on:click="handleCheckBoxClick('goodStanding', $event)"
                    type="checkbox"
                    class="bg-gray-50 mr-4 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    :checked="checked.goodStanding"
                  />
                  <a class="text-2xl font-semibold leading-tight">
                    Goodstanding Report
                  </a>
                </div>
              </div>
              <div id="export" @click="exportTable()" class="ml-12">
                <a class="text-2xl font-semibold leading-tight">
                  <i class="fa fa-file-text" aria-hidden="true"></i>
                  Export
                </a>
              </div>
            </div>
            <div class="mt-8">
              <label>Filter By:</label>
            </div>

            <div class="max-w-3xl red">
              <input
                type="text"
                id="fname"
                name="fname"
                v-model="userSearchedName"
                class="mr-6"
                placeholder="search by name"
              />
              <span v-if="!searchingState">
                <Button class="ml-4" @click="searchByName()">search</Button>
              </span>
              <span v-else>
                <label for="lname" class="clear-lable" @click="clearSearch()"
                  >clear</label
                >
              </span>
            </div>

            <div class="flex filter-container">
              <div class="flex flex-col mb-medium w-72 mr-4">
                <label class="text-primary-700">Department</label>
                <select
                  class="max-w-3xl"
                  v-model="filter.deptType"
                  @change="filterDpartmentType(filter.deptType)"
                >
                  <option v-bind:key="filter.all" v-bind:value="filter.all"
                    >All</option
                  >
                  <option
                    v-for="department in departments"
                    v-bind:key="department.id"
                    v-bind:value="department"
                  >
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col mb-medium w-72 mr-4">
                <label class="text-primary-700">Professional Type</label>
                <select
                  class="max-w-3xl"
                  v-model="filter.profType"
                  @change="filterProfessionType(filter.profType)"
                >
                  <option v-bind:key="filter.all" v-bind:value="filter.all"
                    >All</option
                  >
                  <option
                    v-for="profession in professions"
                    v-bind:key="profession.name"
                    v-bind:value="profession.name"
                  >
                    {{ profession.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col mb-small w-72 mr-4">
                <label class="text-primary-700">Gender</label>
                <div class="flex w-full">
                  <div class="flex w-1/3">
                    <div class="flex flex-col w-60 mr-4">
                      <div class="flex py-2">
                        <input
                          type="radio"
                          id="both"
                          value=""
                          v-model="filter.gender"
                          @change="filterGender(filter.gender)"
                        />
                        <label class="ml-tiny text-primary-700" for="female">
                          Both
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col mb-small w-60 mr-4">
                    <div class="flex py-2">
                      <input
                        class="flex flex-col"
                        type="radio"
                        id="male"
                        value="male"
                        v-model="filter.gender"
                        @change="filterGender(filter.gender)"
                      />
                      <label
                        class="ml-tiny flex flex-col text-primary-700"
                        for="male"
                      >
                        Male
                      </label>
                    </div>
                  </div>
                  <div class="flex w-1/3">
                    <div class="flex flex-col w-60">
                      <div class="flex py-2">
                        <input
                          type="radio"
                          id="female"
                          value="female"
                          v-model="filter.gender"
                          @change="filterGender(filter.gender)"
                        />
                        <label class="ml-tiny text-primary-700" for="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col mb-small w-80 mr-4">
                <label class="text-primary-700">Application Statuses</label>
                <select
                  class="max-w-3xl"
                  clearable="{true}"
                  v-model="filter.status"
                  @change="filterAppStatus(filter.status)"
                >
                  <option v-bind:key="filter.all" v-bind:value="filter.all"
                    >All</option
                  >
                  <option
                    v-for="status in applicationStatuses"
                    v-bind:key="status.name"
                    v-bind:value="status.name"
                  >
                    {{ status.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col mb-small w-80 mr-4">
                <label class="text-primary-700">Expert Level</label>
                <select
                  class="max-w-3xl"
                  clearable="{true}"
                  v-model="filter.expertLevel"
                  @change="filterExpertLevel(filter.expertLevel)"
                >
                  <option v-bind:key="filter.all" v-bind:value="filter.all"
                    >All</option
                  >
                  <option
                    v-for="status in expertLevels"
                    v-bind:key="status.code"
                    v-bind:value="status.code"
                  >
                    {{ status.name }}
                  </option>
                </select>
              </div>
              <div
                class="flex flex-col mb-small w-80 mr-4"
                v-if="filter.expertLevel == 'REG'"
              >
                <label class="text-primary-700">Regions</label>
                <select
                  class="max-w-3xl"
                  clearable="{true}"
                  v-model="filter.region"
                  @change="filterRegions(filter.region)"
                >
                  <option v-bind:key="filter.all" v-bind:value="filter.all"
                    >All</option
                  >
                  <option
                    v-for="status in regions"
                    v-bind:key="status.name"
                    v-bind:value="status.name"
                  >
                    {{ status.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row mb-small w-80 mr-4">
                <label class="text-primary-700 mr-2">From</label>
                <input
                  v-model="filter.startDate"
                  class="max-w-3xl mr-5"
                  type="date"
                />
                <label class="text-primary-700 mr-2">To</label>
                <input
                  v-model="filter.endDate"
                  @change="filterDate(filter.startDate, filter.endDate)"
                  class="max-w-3xl mr-5"
                  type="date"
                />
              </div>
            </div>
            <div v-if="loader" style="margin-left: 45%; margin-top: 5%">
              <Spinner />
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 max-w-4xl">
              <label class="text-primary-700">Rows per page: </label>
              <select
                class="max-w-3xl mb-4"
                v-model="paginationSize"
                @change="handlePagSize($)"
                style="padding: 0px 35px 0px 5px; border: none; border-radius: unset; border-bottom: 2px solid lightblue;margin-left: 8px"
              >
                <option
                  v-for="size in paginationSizeList"
                  v-bind:key="size"
                  v-bind:value="size"
                >
                  {{ size }}
                </option>
              </select>
              <div
                id="printable"
                class="shadow-md rounded-lg"
                v-if="!showLoading"
              >
                <table class="leading-normal" id="myTable">
                  <thead>
                    <tr class="">
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        First Name
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Middle Name
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        License Status
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Professional Type
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Region
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        License Number
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Remark
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Issued Date
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Gender
                      </th>

                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        Birth Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in report" :key="item">
                      <td class="px-5 py-5 border-gray-200 bg-white text-sm">
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.name }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5  border-gray-200 bg-white text-sm">
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.fatherName }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5  border-gray-200 bg-white text-sm">
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.grandFatherName }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                        v-if="item.applicationStatus.name"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.applicationStatus.name }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                        v-if="
                          item.licenseProfessionalTypes[0].professionalTypes
                        "
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{
                                item.licenseProfessionalTypes[0]
                                  .professionalTypes.name
                                  ? item.licenseProfessionalTypes[0]
                                      .professionalTypes.name
                                  : "-"
                              }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                        v-if="item.region"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.region.name ? item.region.name : "-" }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                        v-if="item.license_no"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.license_no }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                        v-if="item.remark"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.remark }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="item.certifiedDate"
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{
                                moment(item.certifiedDate).format(
                                  "MMM DD, YYYY"
                                )
                              }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="item.applicant.phoneNumber"
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.applicant.phoneNumber }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="item.applicant.emailAddress"
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.applicant.emailAddress }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="item.gender"
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{ item.gender }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="item.dateOfBirth"
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {{
                                moment(item.dateOfBirth).format("MMM DD, YYYY")
                              }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5  border-gray-200 bg-white text-sm text-right"
                      >
                        <div class="flex">
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              ---
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <VueTailwindPagination
                :current="currentPage"
                :total="totalCount"
                :per-page="paginationSize"
                @page-changed="pageChanged($event)"
                text-before-input="Go to page"
                text-after-input="Go"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import ReviewerSideBar from "../Reviewer/ReviewerSideNav.vue";
import Spinner from "@/sharedComponents/Spinner";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import { saveAs } from "file-saver";
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  components: {
    ReviewerNavBar,
    Spinner,
    ReviewerSideBar,
    VueTailwindPagination,
  },

  computed: {
    moment: () => moment,
    getAllassignedToOthers() {
      return store.getters["reviewer/getAssignedForEveryOneSearched"];
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let expertlevelCode = ref("");
    let departmentValue = ref("");
    let professionTypeValue = ref("");
    let regionValue = ref("");
    let genderValue = ref("");
    let applicationStatusValue = ref("");
    let startDateValue = ref("1900-01-01");
    let endDateValue = ref("2100-01-01");

    let checked = ref({
      newLicense: true,
      renewal: true,
      goodStanding: true,
    });

    let selectedApplication = ref({
      newLicense: true,
      renewal: false,
      goodStanding: false,
      verification: false,
    });

    let currentPage = ref(1);
    let totalCount = ref();
    let lastIndex = ref(2);
    let report = ref([]);
    let showLoading = ref(false);
    let selectBackgroundColor = ref("newLicense");

    let searchingState = ref(false);

    let userSearchedName = ref("");

    let indexValue = ref(0);
    let paginationSize = ref(10);
    const paginationSizeList = [10, 25, 50, 100];
    let reportData = ref([]);
    let reportForRegions = ref([]);
    let allData = ref([]);

    let renewalData = ref([]);
    let newLicenseData = ref([]);
    let goodStandingData = ref([]);

    const pageChanged = (event) => {
      currentPage.value = event;
      indexValue.value = event - 1;
      paginateReport(reportData.value, indexValue.value);
    };
    const handlePagSize = () => {
      currentPage.value = 1;
      indexValue.value = 0;
      paginateReport(reportData.value, indexValue.value);
    };

    const handleCheckBoxClick = (type, event) => {
      if (!event.target.checked && type == "renewal") {
        let filterValue = reportData.value.filter((report) => {
          return !report.renewalCode;
        });
        paginateReport(filterValue, 0);
        reportData.value = filterValue;
        allData.value = filterValue;
      } else if (!event.target.checked && type == "newLicense") {
        let filterValue = reportData.value.filter((report) => {
          return !report.newLicenseCode;
        });
        paginateReport(filterValue, 0);
        reportData.value = filterValue;
        allData.value = filterValue;
      } else if (!event.target.checked && type == "goodStanding") {
        let filterValue = reportData.value.filter((report) => {
          return !report.goodStandingCode;
        });
        paginateReport(filterValue, 0);
        reportData.value = filterValue;
        allData.value = filterValue;
      } else if (event.target.checked && type == "renewal") {
        let mockRenewalData = reportData.value;
        mockRenewalData.push(...renewalData.value);
        reportData.value = mockRenewalData;
        allData.value = mockRenewalData;
        paginateReport(allData.value, 0);
      } else if (event.target.checked && type == "newLicense") {
        let mockNewLicenseData = reportData.value;
        mockNewLicenseData.push(...newLicenseData.value);
        reportData.value = mockNewLicenseData;
        allData.value = mockNewLicenseData;
        paginateReport(reportData.value, 0);
      } else if (event.target.checked && type == "goodStanding") {
        let mockGoodStandingData = reportData.value;
        mockGoodStandingData.push(...goodStandingData.value);
        reportData.value = mockGoodStandingData;
        allData.value = mockGoodStandingData;
        paginateReport(reportData.value, 0);
      }
    };

    let departments = ref([]);
    let professions = ref([]);
    let expertLevels = ref([
      { name: "Federal", id: 3, code: "FED" },
      { name: "Regional", id: 4, code: "REG" },
    ]);
    let regions = ref([]);
    let zones = ref([]);
    let woredas = ref([]);
    let applicationStatuses = ref([]);

    let filter = ref({
      deptType: "",
      profType: "",
      gender: "",
      region: "",
      zone: "",
      woreda: "",
      expertLevel: "",
      status: "",
      startDate: "",
      endDate: "",
      all: "",
    });

    let loader = ref(false);

    const changeBackgroundColor = (title) => {
      selectBackgroundColor.value = title;
    };

    const fetchNewLicenseReport = () => {
      loader.value = true;
      changeBackgroundColor("newLicense");
      store.dispatch("report/getNewLicenseReport").then((res) => {
        newLicenseData.value = res.data.data;
        reportData.value.push(...res.data.data);
        allData.value.push(...res.data.data);
        paginateReport(reportData.value, 0);
        store.dispatch("report/setReport", reportData.value);
        loader.value = false;
      });
    };

    const fetchRenewalReport = () => {
      loader.value = true;
      changeBackgroundColor("renewal");
      store.dispatch("report/getRenewalReport").then((res) => {
        renewalData.value = res.data.data;
        reportData.value.push(...res.data.data);
        allData.value.push(...res.data.data);
        paginateReport(reportData.value, 0);
        store.dispatch("report/setReport", reportData.value);
        loader.value = false;
      });
    };

    const fetchVerificationReport = () => {
      loader.value = true;
      changeBackgroundColor("verification");
      store.dispatch("report/getVerificationReport").then((res) => {
        reportData.value.push(...res.data.data);
        allData.value.push(...res.data.data);
        paginateReport(reportData.value, 0);
        store.dispatch("report/setReport", reportData.value);
        loader.value = false;
      });
    };
    const fetchGoodstandingReport = () => {
      loader.value = true;
      changeBackgroundColor("goodStanding");
      store.dispatch("report/getGoodstandingReport").then((res) => {
        goodStandingData.value = res.data.data;
        reportData.value.push(...res.data.data);
        allData.value.push(...res.data.data);
        paginateReport(reportData.value, 0);
        store.dispatch("report/setReport", reportData.value);
        loader.value = false;
      });
    };

    const paginateReport = (reportValue, index) => {
      report.value = reportValue.slice(
        index * paginationSize.value,
        index * paginationSize.value + paginationSize.value
      );
      totalCount.value = reportValue.length;
    };

    const fetchDepartmentType = () => {
      store.dispatch("goodstanding/getDepartmentType").then((res) => {
        departments.value = res.data.data;
      });
    };

    const fetchProfessionType = (deptId) => {
      store
        .dispatch("goodstanding/getProfessionalTypes", deptId)
        .then((res) => {
          professions.value = res.data.data;
        });
    };

    const fetchRegion = () => {
      store.dispatch("report/getRegions").then((res) => {
        regions.value = res.data.data;
      });
    };
    const fetchZones = (regionID) => {
      store.dispatch("report/getZones", regionID).then((res) => {
        zones.value = res.data.data;
      });
    };
    const fetchWoredas = (zoneID) => {
      store.dispatch("report/getWoredas", zoneID).then((res) => {
        woredas.value = res.data.data;
      });
    };
    const fetchApplicationStatuses = () => {
      store.dispatch("report/getapplicationStatuses").then((res) => {
        applicationStatuses.value = res.data.data.filter((application) => {
          return (
            application.code === "APP" ||
            application.code === "DEC" ||
            application.code === "CONF"
          );
        });
      });
    };

    const exportTable = () => {
      var blob = new Blob([document.getElementById("printable").innerHTML], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      });
      saveAs(blob, "Report.xls");
    };

    const searchByName = () => {
      searchingState.value = true;
      let filterByName = allData.value.filter((report) => {
        return (
          report.name.toLowerCase().includes(userSearchedName.value) ||
          report.fatherName.toLowerCase().includes(userSearchedName.value) ||
          report.grandFatherName.toLowerCase().includes(userSearchedName.value)
        );
      });
      paginateReport(filterByName, 0);
      reportData.value = filterByName;
    };

    const clearSearch = () => {
      searchingState.value = false;
      userSearchedName.value = "";
      reportData.value = allData.value;
      paginateReport(reportData.value, 0);
    };

    const filterProfessionType = (profType) => {
      professionTypeValue.value = profType;
      filterApplication();
    };
    const filterDpartmentType = (department) => {
      if (department) {
        departmentValue.value = department.name;
        professionTypeValue.value = "";
        filterApplication();
        fetchProfessionType(department.id);
      } else {
        departmentValue.value = "";
        professionTypeValue.value = "";
        filterApplication();
      }
    };

    const filterExpertLevel = (code) => {
      expertlevelCode.value = code;
      filterApplication();
    };

    const filterRegions = (name) => {
      regionValue.value = name;
      filterRegionalApplication();
    };

    const filterRegionalApplication = () => {
      let filterRegion = reportForRegions.value.filter((report) => {
        return report.region.name.includes(regionValue.value);
      });
      paginateReport(filterRegion, 0);
      reportData.value = filterRegion;
    };
    const filterApplication = () => {
      let filterValue = allData.value.filter((report) => {
        return genderValue.value
          ? report.gender === genderValue.value &&
              report.applicationStatus.name.includes(
                applicationStatusValue.value
              ) &&
              report.licenseProfessionalTypes[0].professionalTypes.department.name.includes(
                departmentValue.value
              ) &&
              report.licenseProfessionalTypes[0].professionalTypes.name.includes(
                professionTypeValue.value
              ) &&
              report.expertLevels.code.includes(expertlevelCode.value) &&
              !moment(startDateValue.value).isAfter(
                report.applicationStatus.updatedAt
              ) &&
              moment(endDateValue.value).isSameOrAfter(
                report.applicationStatus.updatedAt
              )
          : report.gender.includes(genderValue.value) &&
              report.applicationStatus.name.includes(
                applicationStatusValue.value
              ) &&
              report.licenseProfessionalTypes[0].professionalTypes.department.name.includes(
                departmentValue.value
              ) &&
              report.licenseProfessionalTypes[0].professionalTypes.name.includes(
                professionTypeValue.value
              ) &&
              report.expertLevels.code.includes(expertlevelCode.value) &&
              !moment(startDateValue.value).isAfter(
                report.applicationStatus.updatedAt
              ) &&
              moment(endDateValue.value).isSameOrAfter(
                report.applicationStatus.updatedAt
              );
      });
      paginateReport(filterValue, 0);
      reportData.value = filterValue;
      reportForRegions.value = reportData.value;
    };
    const filterProfession = (profType) => {
      var tableFilter = [];
      tableFilter = report.value;
      var tableFilter2 = [];
      for (var i = 0; i < tableFilter.length; i++) {
        if (tableFilter[i].professionalTypes != null) {
          tableFilter2.push(tableFilter[i]);
        }
      }
      if (profType == null) {
      } else {
        report.value = tableFilter2.filter(function(e) {
          return e.professionalTypes.name == profType;
        });
      }
    };

    const filterZone = (zone) => {
      fetchWoredas(zone.id);
      var tableFilter = [];
      tableFilter = report.value;
      var tableFilter2 = [];
      for (var i = 0; i < tableFilter.length; i++) {
        if (tableFilter[i].zone.name != null) {
          tableFilter2.push(tableFilter[i]);
        }
      }
      if (zone.name == null) {
        report.value = store.getter["report/getReport"];
      } else {
        report.value = tableFilter2.filter(function(e) {
          return e.zone.name == zone.name;
        });
      }
    };
    const filterWoreda = (woreda) => {
      var tableFilter = [];
      tableFilter = report.value;
      var tableFilter2 = [];
      for (var i = 0; i < tableFilter.length; i++) {
        if (tableFilter[i].woreda.name != null) {
          tableFilter2.push(tableFilter[i]);
        }
      }
      if (woreda.name == null) {
        report.value = store.getter["report/getReport"];
      } else {
        report.value = tableFilter2.filter(function(e) {
          return e.woreda.name == woreda.name;
        });
      }
    };
    const filterDate = (startDate, endDate) => {
      if (endDate == "") {
        startDateValue.value = "1900-01-01";
        endDateValue.value = "2100-01-01";
        filter.value.startDate = "";
      } else {
        startDateValue.value = startDate;
        endDateValue.value = endDate;
      }
      filterApplication();
    };
    const filterGender = (gender) => {
      genderValue.value = gender;
      filterApplication();
    };
    const filterAppStatus = (status) => {
      applicationStatusValue.value = status;
      filterApplication();
    };
    onMounted(() => {
      fetchNewLicenseReport();
      fetchRenewalReport();
      fetchGoodstandingReport();
      fetchRegion();
      fetchApplicationStatuses();
      fetchDepartmentType();
    });
    return {
      loader,
      report,
      exportTable,
      fetchNewLicenseReport,
      fetchRenewalReport,
      fetchVerificationReport,
      fetchGoodstandingReport,
      fetchRegion,
      fetchZones,
      fetchWoredas,
      fetchApplicationStatuses,
      professions,
      regions,
      zones,
      woredas,
      applicationStatuses,
      filter,
      filterProfession,
      filterGender,
      filterAppStatus,
      filterDate,
      filterZone,
      selectedApplication,
      changeBackgroundColor,
      currentPage,
      totalCount,
      paginationSize,
      paginationSizeList,
      pageChanged,
      handlePagSize,
      selectBackgroundColor,
      filterProfessionType,
      checked,
      handleCheckBoxClick,
      departments,
      filterDpartmentType,
      expertLevels,
      filterExpertLevel,
      filterRegions,
      searchByName,
      userSearchedName,
      clearSearch,
      searchingState,
    };
  },
};
</script>

<style>
.titile-container {
  flex-wrap: wrap;
}
.filter-container {
  flex-wrap: wrap;
}
.applicationType {
  background-color: #285180;
  color: #ffffff;
}
th {
  color: #648ea3;
  background-color: #eff6ff;
}
.sidenav {
  width: 500px;
}
#export {
  cursor: pointer;
}
a:link {
  color: yellow;
}
a {
  cursor: pointer;
  color: #648ea3;
}
a:visited {
  color: red;
  cursor: pointer;
}
a:active {
  color: red;
}
a:hover {
  color: #0b5980;
}
#printable {
  /* display: block; */
  width: 170vh;
  overflow-x: scroll;
  overflow-y: hidden;
}
.clear-lable {
  cursor: pointer;
}
</style>
