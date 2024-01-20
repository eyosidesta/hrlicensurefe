<template>
  <ReviewerNavBar tab="Evaluation" />
  <div class="w-screen bg-white flex items-center justify-center">
    <div
      class="
        w-screen
        max-w-6xl
        mt-medium
        mb-large
        box-shadow-pop
        bg-lightGrey-100
      "
    >
      <div class="flex mb-large mt-medium justify-center">
        <div class="w-64 h-40 container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-lightBlueB-500 text-2xl">
                {{ accepted.length }}
              </h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class="text-lightBlueB-500 text-2xl">Accepted</h2>
            </div>
          </div>
        </div>
        <div class="flex justify-start flex-wrap ml-12">
          <div>
            <picture
              class="flex justify-center items-center mb-small"
              v-if="docs.length > 0"
            >
              <span
                v-if="
                  newLicense.applicant.profile.photo !== '' &&
                    newLicense.applicant.profile.photo !== null
                "
              >
                <img
                  :src="newLicense.applicant.profile.photo"
                  alt="profile picture"
                  class="w-20 h-12"
                />
              </span>
              <span v-else>
                <img
                  class="box-shadow-pop"
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                />
              </span>
            </picture>
            <div class="flex justify-center items-center">
              <div class="mt-2 mr-small w-1/2">
                <h4 class="text-left detailTitle">Applicant Name:</h4>
                <h4 class="text-left ml-3">
                  {{
                    newLicense.applicant.profile
                      ? newLicense.applicant.profile.name
                        ? newLicense.applicant.profile.name +
                          " " +
                          (newLicense.applicant.profile.fatherName
                            ? newLicense.applicant.profile.fatherName
                            : "-")
                        : "-"
                      : "-"
                  }}
                </h4>
              </div>
              <div class="mt-2 ml-small w-1/2">
                <!-- <h4 class="text-left detailTitle">Applicant Type:</h4>

                <h4 class="text-left ml-3">
                  {{
                    newLicense.applicantType
                      ? newLicense.applicantType.name
                      : "-"
                  }}
                </h4> -->
                <h4 class="text-left detailTitle">Department:</h4>
                <h4 class="text-left ml-3">
                  {{
                    newLicense.department
                      ? newLicense.department.name
                      : newLicense.education
                      ? newLicense.education.department
                        ? newLicense.education.department.name
                        : "-"
                      : "-"
                  }}
                </h4>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <div class="mt-2 mr-small w-1/2" v-if="!isGoodStanding">
                <h4 class="text-left detailTitle">Institution:</h4>
                <h4 class="text-left ml-3">
                  {{
                    newLicense.education
                      ? newLicense.otherEducationalInstitution
                        ? newLicense.otherEducationalInstitution
                        : newLicense.education.institution.name
                      : "-"
                  }}
                </h4>
              </div>

              <div class="mt-2 ml-small w-1/2" v-if="!isGoodStanding">
                <h4 class="text-left detailTitle">Institution Type:</h4>
                <h4 class="text-left ml-3">
                  {{
                    newLicense.education
                      ? newLicense.education.institution
                        ? newLicense.education.institution.institutionType
                          ? newLicense.education.institution.institutionType
                              .name
                          : "-"
                        : "-"
                      : "-"
                  }}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-12 w-64 h-40 container box-shadow-pop rounded-lg">
          <div class="mt-8">
            <div class="my-auto flex justify-center items-center">
              <h2 class="text-red-200 text-2xl">{{ rejected.length }}</h2>
            </div>
            <div class="flex justify-center items-center">
              <h2 class="text-red-200 text-2xl">Rejected</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="">
          <svg
            width="40"
            height="60"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            @click="previous()"
            v-if="index != 0"
          >
            <polyline
              points="30 10 10 30 30 50"
              stroke="rgba(103,128,159,1)"
              stroke-width="3"
              stroke-linecap="butt"
              fill="none"
              stroke-linejoin="round"
            >
              &gt;
            </polyline>
          </svg>
        </div>

        <div class="flex flex-col justify-center items-center ml-large">
          <div class="ml-medium">
            <label
              v-if="!showButtons"
              class="
                justify-center
                items-center
                ml-large
                text-grey-200 text-2xl
              "
            >
              {{ documentTypeName }}
            </label>
            <!-- <h5 class="ml-8 text-black-100 text-3xl">
              Addis Ababa
            </h5> -->
            <div class="flex justify-start flex-wrap">
              <!-- <div v-for="file in docs" v-bind:key="file.name">
                <Title class="" :message="file.name" />
                <picture>
                  <img :src="basePath + file.filePath" />
                </picture>
              </div> -->
              <div v-if="showButtons">
                <div class="flex justify-center">
                  <Title message="Summary" />
                </div>
                <div class="flex justify-start">
                  <Title message="Personal Info" />
                  <div>
                    <button @click="allowChangeName">change name?</button>
                    <i
                      class="fas fa-chevron-edit float-right mt-2"
                      @click="allowChangeName"
                    ></i>
                  </div>
                </div>
                <div class="flex flex-row">
                  <div
                    :class="[
                      profileInfo.name === null ? errorClass : activeClassd,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Full Name </label>
                    <h5 class="ml-8">
                      {{
                        (profileInfo.name ? profileInfo.name : "-") +
                          " " +
                          (profileInfo.fatherName
                            ? profileInfo.fatherName
                            : "-") +
                          " " +
                          (profileInfo.grandFatherName
                            ? profileInfo.grandFatherName
                            : "-")
                      }}
                    </h5>
                  </div>
                  <div v-if="!canChangeName" class="flex flex-row">
                    <div
                      :class="[
                        profileInfo.alternativeName === null
                          ? errorClass
                          : activeClass,
                      ]"
                    >
                      <!-- <div v-if="true"> -->
                      <label class="ml-8 titleColors">
                        Full Name In Amharic
                      </label>
                      <div>
                        <h5 class="ml-8">
                          {{
                            (profileInfo.alternativeName
                              ? profileInfo.alternativeName
                              : "-") +
                              " " +
                              (profileInfo.alternativeFatherName
                                ? profileInfo.alternativeFatherName
                                : "-") +
                              " " +
                              (profileInfo.alternativeGrandFatherName
                                ? profileInfo.alternativeGrandFatherName
                                : "-")
                          }}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div v-if="canChangeName" class="flex flex-row">
                    <div>
                      <label class="ml-8 titleColors">
                        Amharic First Name</label
                      >
                      <div>
                        <input
                          class="max-w-3xl ml-8"
                          type="text"
                          v-model="newLicense.applicant.profile.alternativeName"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="ml-8 titleColors">
                        Amharic Middle Name</label
                      >
                      <div>
                        <input
                          class="max-w-3xl ml-8"
                          type="text"
                          v-model="
                            newLicense.applicant.profile.alternativeFatherName
                          "
                        />
                      </div>
                    </div>
                    <div>
                      <label class="ml-8 titleColors"> Amharic Last Name</label>
                      <div>
                        <input
                          class="max-w-3xl ml-8"
                          type="text"
                          v-model="
                            newLicense.applicant.profile
                              .alternativeGrandFatherName
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row justify-center" v-if="canChangeName">
                  <div>
                    <button
                      style="backgroundcolor: red"
                      @click="changeAmharicName"
                    >
                      Save
                    </button>
                  </div>
                  <div>
                    &#160;
                    <button @click="disallowChangeName">cancel</button>
                  </div>
                </div>
                <div
                  v-if="showSpinner"
                  class="flex justify-center justify-items-center mt-24"
                >
                  <Spinner />
                </div>
                <div class="flex flex-row">
                  <div
                    :class="[
                      profileInfo.gender === null ? errorClass : activeClass,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Gender</label>
                    <h5 class="ml-8">
                      {{ profileInfo.gender ? profileInfo["gender"] : "-" }}
                    </h5>
                  </div>
                  <div
                    :class="[
                      profileInfo.nationality == null
                        ? errorClass
                        : activeClass,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Nationality</label>
                    <h5 class="ml-8">
                      {{
                        profileInfo.nationality
                          ? profileInfo.nationality.name
                          : "-"
                      }}
                    </h5>
                  </div>
                  <div
                    :class="[
                      profileInfo.maritalStatus.name === null
                        ? errorClass
                        : activeClass,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Marital Status</label>
                    <h5 class="ml-8">
                      {{
                        profileInfo.maritalStatus.name
                          ? profileInfo.maritalStatus.name
                          : "-"
                      }}
                    </h5>
                  </div>
                </div>
                <div class="flex justify-start">
                  <Title message="Contact" />
                </div>
                <div class="flex flex-row">
                  <div
                    :class="[
                      profileInfo.user.phoneNumber === null
                        ? errorClass
                        : activeClass,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Mobile Number</label>
                    <h5 class="ml-8">
                      {{
                        profileInfo.user.phoneNumber
                          ? profileInfo.user.phoneNumber
                          : "-"
                      }}
                    </h5>
                  </div>

                  <div
                    :class="[
                      profileInfo.user.emailAddress === null
                        ? errorClass
                        : activeClass,
                    ]"
                  >
                    <label class="ml-8 titleColors"> Email</label>
                    <h5 class="ml-8">
                      {{
                        profileInfo.user.emailAddress
                          ? profileInfo.user.emailAddress
                          : "-"
                      }}
                    </h5>
                  </div>
                </div>
                <div class="flex justify-start">
                  <Title message="Institution" />
                </div>
                <div class="flex flex-row">
                  <div>
                    <label class="ml-8 titleColors"> Department</label>
                    <h5 class="ml-8">
                      {{
                        newLicense.department
                          ? newLicense.department.name
                          : newLicense.education
                          ? newLicense.education.department
                            ? newLicense.education.department.name
                            : "-"
                          : "-"
                      }}
                    </h5>
                  </div>
                  <div v-if="!isGoodStanding">
                    <label class="ml-8 titleColors"> Institution Name</label>
                    <h5 class="ml-8">
                      {{
                        newLicense.otherEducationalInstitution
                          ? newLicense.otherEducationalInstitution
                          : newLicense.education
                          ? newLicense.education.institution
                            ? newLicense.education.institution.name
                            : "-"
                          : "-"
                      }}
                    </h5>
                  </div>
                  <div v-if="!isGoodStanding">
                    <label class="ml-8 titleColors"> Institution Type</label>
                    <h5 class="ml-8">
                      {{
                        newLicense.education
                          ? newLicense.education.institution
                            ? newLicense.education.institution.institutionType
                              ? newLicense.education.institution.institutionType
                                  .name
                              : "-"
                            : "-"
                          : "-"
                      }}
                    </h5>
                  </div>
                </div>
                <div class="flex justify-start">
                  <Title message="Professional Type" />
                </div>
                <div class="flex flex-row">
                  <div v-if="newLicense.professionalTypes.length > 0">
                    <div class="flex flex-col mb-medium mr-12 ml-8">
                      <!-- <div v-model="professionalTypeIds"> -->
                      <div style="background: lightgray; padding: 8px">
                        <p style="color: blue">Previous Professional Types</p>
                      </div>
                      <!-- <div>
                        <p>----------------------------------------</p>
                      </div> -->
                      <ul
                        v-for="(professionName,
                        index) in newLicense.professionalTypes"
                        v-bind:key="professionName.professionalTypeId"
                        v-bind:value="professionName.professionalTypeId"
                      >
                        <div class="grid grid-cols-1">
                          <li>
                            <input
                              v-on:click="
                                checkBoxClicked(
                                  professionName,
                                  true,
                                  index,
                                  $event
                                )
                              "
                              type="checkbox"
                              class="form-checkbox"
                              name="ckb"
                              :checked="professionName.showPrefixLink"
                            />
                            {{ professionName.professionalTypes.name }} |
                            {{
                              professionName.professionalTypes
                                .amharicProfessionalType
                            }}
                          </li>
                          <a
                            class="ml-5"
                            style="
                              text-decoration: underline;
                              font-style: italic;
                            "
                            @click="
                              professionName.showPrefix = !professionName.showPrefix
                            "
                            v-show="professionName.showPrefixLink"
                            >{{
                              professionName.showPrefix
                                ? "Hide Prefix?"
                                : "Show Prefix?"
                            }}</a
                          >
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-4 ml-8 mt-2">
                          <!-- <div class="flex flex-row ml-16 mr-8 mt-3 mb-3">
                            <div class="flex flex-col"> -->
                          <div
                            style="
                              float: left;
                              border-right: 1px solid lightgray;
                            "
                            v-if="
                              professionName.professionalTypes.name == 'Other'
                            "
                          >
                            <label style="display: block"
                              >Other professional Type Name:</label
                            >
                            <input
                              style="display: block"
                              type="text"
                              v-model="newLicense.otherProfessionalType"
                            />
                          </div>
                          <div
                            style="float: left"
                            v-show="
                              professionName.showPrefixLink &&
                                professionName.showPrefix
                            "
                          >
                            <label style="display: block">Prefix:</label>
                            <select
                              style="display: block"
                              class="select"
                              @change="
                                addPrefix(
                                  professionName.professionalTypeId,
                                  $event
                                )
                              "
                              :v-model="selectedOption + `${index}`"
                            >
                              <option
                                v-for="prefix in prefixList"
                                v-bind:key="prefix.id"
                                v-bind:value="prefix.name"
                              >
                                {{ prefix.name }}
                              </option>
                            </select>
                          </div>
                          <!-- </div>
                          </div> -->
                        </div>
                      </ul>
                      <div style="background: lightgray; padding: 8px">
                        <p style="color: blue">New Professional Types</p>
                      </div>
                      <!-- <div>
                        <p>----------------------------------------</p>
                      </div> -->
                      <ul
                        v-for="(newProfessionName, index) in professionalTypes"
                        v-bind:key="newProfessionName.id"
                        v-bind:value="newProfessionName.id"
                      >
                        <div class="grid grid-cols-1">
                          <li>
                            <input
                              v-on:click="
                                checkBoxClicked(
                                  newProfessionName,
                                  false,
                                  index,
                                  $event
                                )
                              "
                              type="checkbox"
                              class="form-checkbox"
                              name="nckb"
                            />
                            {{ newProfessionName.name }} |
                            {{ newProfessionName.amharicProfessionalType }}
                          </li>
                          <a
                            class="ml-5"
                            style="
                              text-decoration: underline;
                              font-style: italic;
                            "
                            @click="
                              newProfessionName.showPrefix = !newProfessionName.showPrefix
                            "
                            v-show="newProfessionName.showPrefixLink"
                            >{{
                              newProfessionName.showPrefix
                                ? "Hide Prefix?"
                                : "Show Prefix?"
                            }}</a
                          >
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-4 ml-8 mt-2">
                          <div
                            style="
                              float: left;
                              border-right: 1px solid lightgray;
                            "
                            v-if="
                              newProfessionName.showPrefixLink &&
                                newProfessionName.name == 'Other'
                            "
                          >
                            <label style="display: block"
                              >other profession name</label
                            >
                            <input
                              style="display: block"
                              type="text"
                              v-model="newLicense.otherProfessionalType"
                            />
                          </div>
                          <div
                            style="float: left"
                            v-show="
                              newProfessionName.showPrefixLink &&
                                newProfessionName.showPrefix
                            "
                          >
                            <label style="display: block">Prefix:</label>
                            <select
                              style="display: block"
                              @change="addPrefix(newProfessionName.id, $event)"
                              :v-model="newSelectedOptions + `${index}`"
                            >
                              <option
                                v-for="prefix in prefixList"
                                v-bind:key="prefix.name"
                                v-bind:value="prefix.name"
                              >
                                {{ prefix.name }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-if="!isGoodStanding">
                  <div class="flex justify-start">
                    <Title message="License Expiration Date" />
                  </div>
                  <div class="flex flex-col mb-medium w-1/2 ml-8 mr-12">
                    <input
                      class="max-w-3xl mr-5"
                      type="date"
                      v-model="newLicense.licenseExpirationDate"
                    />
                  </div>
                </div>
              </div>
              <div v-else>
                <picture v-if="docs.length > 0">
                  <div v-if="docs[index].fileName.split('.')[1] == 'pdf'">
                    <div>
                      <iframe
                        v-bind:src="
                          googleApi + '' +
                            docs[index].filePath
                        "
                      ></iframe>
                    </div>
                    <br />
                    <a @click="openPdfInNewTab(docs[index].filePath)"
                      >see pdf in detail</a
                    >
                  </div>

                  <div v-else>
                    <img
                      v-bind:src="
                        googleApi + '' +
                          docs[index].filePath
                      "
                    />
                  </div>
                </picture>
              </div>
              <div
                class="flex content-center justify-center pb-large"
                v-if="docs.length == 0"
              >
                <h2>No Documents To Show!!</h2>
              </div>
              <!-- {{docs[0].filePath}} -->
            </div>
          </div>
          <div class="mt-medium" v-if="!showButtons">
            <button class="mr-medium" @click="accept(docs[index])">
              Accept
            </button>
            <button class="decline" @click="reject(docs[index])">Reject</button>
            <button
              class=""
              variant="outline"
              @click="action('ReviewerDraftEvent')"
            >
              save as Draft
            </button>
          </div>
          <div class="relative pt-1 mt-medium">
            <div
              class="
                overflow-hidden
                h-2
                mb-4
                text-xs
                flex
                rounded
                bg-grey-100
                w-screen
                max-w-2xl
              "
            >
              <div
                :style="width"
                class="
                  shadow-none
                  flex flex-col
                  text-center
                  whitespace-nowrap
                  justify-center
                  bg-primary-400
                "
              ></div>
            </div>
          </div>
          <div>
            <div
              class="ml-10 h-3 relative max-w-xl rounded-full overflow-hidden"
            >
              <div class="w-full h-full absolute"></div>
              <div
                id="bar"
                class="
                  transition-all
                  ease-out
                  duration-1000
                  h-full
                  bg-green-500
                  relative
                  w-0
                "
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-center items-center mb-medium"
        v-if="showButtons && !showLoadingButtons"
      >
        <div
          v-for="button in buttons"
          v-bind:key="button.name"
          v-bind:value="button.id"
        >
          <button
            variant="outline"
            v-bind:class="button.class"
            @click="action(button.action)"
          >
            {{ button.name }}
          </button>
        </div>
      </div>
      <div
        v-if="showActionLoading"
        class="flex justify-center justify-items-center mt-2"
      >
        <Spinner />
      </div>
      <Modal v-if="showRemark">
        <div>
          <div
            class="
              card-wrapper
              bg-white
              sm:rounded-lg
              w-full
              flex
              justify-center
              relative
              mb-xl
              mt-large
            "
          >
            <div class="">
              <!--content-->
              <div class="w-full">
                <!--header-->
                <div
                  class="
                    flex
                    items-start
                    justify-between
                    border-b border-solid border-blueGray-200
                    mt-medium
                    rounded-t
                  "
                >
                  <h3 class="text-3xl font-semibold">Remark</h3>
                  <div
                    class="
                      bg-transparent
                      border-0
                      text-black
                      opacity-5
                      float-right
                      text-3xl
                      leading-none
                      font-semibold
                      outline-none
                      focus:outline-none
                    "
                    v-on:click="toggleModal()"
                  >
                    <span
                      class="
                        bg-transparent
                        text-black
                        opacity-5
                        h-6
                        w-6
                        text-2xl
                        block
                        outline-none
                        focus:outline-none
                      "
                    >
                      ×
                    </span>
                  </div>
                </div>
                <!--body-->
                <div class="modalBody pb-xl">
                  <div class="flex mt-medium justify-center"></div>
                  <div class="relative p-6 flex-auto w-full">
                    <div class="flex justify-center">
                      <div class="">
                        <svg
                          width="40"
                          height="60"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          @click="previousRemark()"
                          v-if="ind != 0"
                        >
                          <polyline
                            points="30 10 10 30 30 50"
                            stroke="rgba(103,128,159,1)"
                            stroke-width="3"
                            stroke-linecap="butt"
                            fill="none"
                            stroke-linejoin="round"
                          >
                            &gt;
                          </polyline>
                        </svg>
                      </div>

                      <div
                        class="
                          flex flex-col
                          justify-center
                          items-center
                          ml-large
                        "
                      >
                        <div class="ml-medium">
                          <label
                            class="
                              justify-center
                              items-center
                              ml-large
                              text-grey-200 text-2xl
                            "
                          >
                            {{ modalDocumentTypeName }}
                          </label>
                          <div
                            class="
                              flex
                              justify-center
                              flex-wrap
                              max-w-sm
                              rounded
                              overflow-hidden
                            "
                          >
                            <!-- <div v-for="file in docs" v-bind:key="file.name">
                              <Title class="" :message="file.name" />
                              <picture>
                                <img :src="basePath + file.filePath" />
                              </picture>
                            </div> -->
                            <picture
                              class="imageViewer"
                              v-if="rejectedObj.length > 0"
                            >
                              <img
                                v-bind:src="
                                  googleApi + '' +
                                    rejectedObj[ind].filePath
                                "
                              />
                            </picture>
                            <!-- {{docs[0].filePath}} -->
                          </div>
                        </div>
                      </div>

                      <div class="ml-large">
                        <svg
                          width="40"
                          height="60"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          @click="nextRemark()"
                          v-if="ind != rejected.length - 1"
                          class="hover:text-primary-60"
                        >
                          <polyline
                            points="10 10 30 30 10 50"
                            stroke="rgba(103,128,159,1)"
                            stroke-width="3"
                            stroke-linecap="butt"
                            fill="none"
                            stroke-linejoin="round"
                          >
                            &gt;
                          </polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <!--footer-->
                <textarea
                  v-model="newLicense.remark"
                  class="
                    resize-none
                    tArea
                    border
                    rounded-md
                    flex
                    mb-small
                    w-full
                  "
                ></textarea>
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    p-6
                    border-t border-solid border-blueGray-200
                    rounded-b
                  "
                >
                  <button
                    class="md-danger"
                    type="button"
                    v-on:click="toggleModal()"
                  >
                    Close
                  </button>
                  <button type="button" v-on:click="submitRemark()">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            v-if="showModal"
            class="opacity-25 fixed inset-0 z-40 bg-black"
          ></div> -->
          <div v-if="showDeclineFlash">
            <FlashMessage message="Operation Successful!" />
          </div>
          <div v-if="showErrorFlash">
            <ErrorFlashMessage message="Operation Failed!" />
          </div>
        </div>
      </Modal>
      <div v-if="showFlash">
        <FlashMessage message="Operation Successful!" />
      </div>
      <div v-if="showErrorFlash">
        <ErrorFlashMessage message="Operation Failed!" />
      </div>
      <div v-if="showOtherProfessionError">
        <ErrorFlashMessage
          message="Please type other profession type in the input field"
        />
      </div>
      <div v-if="showNameChangeFlash">
        <FlashMessage message="name change Successful!" />
      </div>
      <div v-if="showNameChangeErrorFlash">
        <ErrorFlashMessage message="name change Failed!" />
      </div>
      <div v-if="showLicenseDateRequirementError">
        <ErrorFlashMessage message="Please add Expiration date!" />
      </div>
      <div v-if="showProfessionChangeError">
        <ErrorFlashMessage
          message="you can't change profession if you are not approving"
        />
      </div>
      <div v-if="expirationDateExceedTodayError">
        <ErrorFlashMessage
          message="Error! license expiration date must exceed today"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";
import { googleApi } from "@/composables/baseURL";

import Title from "@/sharedComponents/Title";
import Modal from "@/sharedComponents/Modal";
import FlashMessage from "@/sharedComponents/FlashMessage";
import Spinner from "@/sharedComponents/Spinner";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import ReviewerNavBar from "@/components/Reviewer/ReviewerNavBar";
import moment from "moment";

export default {
  components: {
    Modal,
    FlashMessage,
    ErrorFlashMessage,
    ReviewerNavBar,
    Title,
    Spinner,
  },
  computed: {
    moment: () => moment,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    const options = ref([0, 1, 2]);
    const selectedOptions = ref([0]);
    const newSelectedOptions = ref([0]);

    let isPdf = ref(false);

    let pdfFilePath = ref("");

    let isGoodStanding = ref(false);

    let expirationDateExceedTodayError = ref(false);
    let isProfessionalTypeChanged = ref(false);

    let otherProfessionalType = ref();
    let showOtherProfessionError = ref(false);

    let professionalTypeIds = ref([]);
    let professionalTypeIdss = ref([]);
    let prefixList = ref([
      { name: "None", id: 0 },
      { name: "Consultant", id: 1 },
      { name: "Expert", id: 2 },
      { name: "Junior", id: 3 },
      { name: "Senior", id: 4 },
      { name: "Senior expert", id: 5 },
      { name: "Chief", id: 6 },
      { name: "Chief expert", id: 7 },
    ]);
    let prefix = ref();
    let canChangeName = ref(false);
    let showProfessionChangeError = ref(false);
    let showSpinner = ref(false);

    let showNameChangeFlash = ref(false);
    let showNameChangeErrorFlash = ref(false);

    let showLicenseDateRequirementError = ref(false);
    let departmentId = ref(0);

    let newLicense = ref({
      applicant: { profile: { name: "", fatherName: "" } },
      applicantType: { name: "" },
      education: {
        department: { name: "" },
        institution: { institutionType: {}, name: "" },
      },
      declinedFields: "",
      remark: "",
      documents: [{ filePath: "" }],
      applicationStatus: {
        buttons: [{ action: "", name: "" }],
      },
    });
    let buttons = ref([
      { action: "", name: "" },
      { action: "", name: "" },
      { action: "", name: "" },
      { action: "", name: "" },
    ]);

    let professionalTypePrefixes = ref([]);

    let documentTypes = ref([]);
    let documentTypeName = ref("");
    let modalDocumentTypeName = ref("");
    let docs = ref([]);
    let index = ref(0);
    let ind = ref(0);
    let amount = ref(1);
    let width = ref("width:11.11111%");
    let accepted = ref([]);
    let rejected = ref([]);
    let rejectedObj = ref([]);
    let showButtons = ref(false);
    let disableNext = ref(true);
    let nextClickable = ref(false);
    let foundInRejected = ref(false);
    let foundInAcceptted = ref(false);
    let isToChangeProfession = ref(false);
    let profileInfo = ref({});
    let activeClass = ref("active");
    let errorClass = ref("text-danger");
    let showRemark = ref(false);
    let applicationType = ref("");
    let applicantId = ref("");
    let showFlash = ref(false);
    let showErrorFlash = ref(false);
    let showDeclineFlash = ref(false);
    let sendDeclinedData = ref(true);
    let fromModalSendDeclinedData = ref(false);

    let showActionLoading = ref(false);
    let showLoadingButtons = ref(false);

    let professionalTypes = ref([]);
    let evaluateRoute = ref(
      "/admin/evaluate/" +
        route.params.applicationType +
        "/" +
        route.params.applicationId
    );
    const created = async (applicationTypeName, applicationId) => {
      applicationType.value = applicationTypeName;

      if (applicationType.value == "New License") {
        store
          .dispatch("reviewer/getNewLicenseApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            departmentId.value = res.data.data.education.department.id;
            getProfessionalTypesByDepartmentId(departmentId.value);
            profileInfo.value = newLicense.value.applicant.profile;
            buttons.value = res.data.data.applicationStatus.buttons;
            docs.value = res.data.data.documents;
            fetchDocumentTypes();
            for (
              let i = 0;
              i < newLicense.value.professionalTypes.length;
              i++
            ) {
              newLicense.value.professionalTypes[i].showPrefix = false;
              newLicense.value.professionalTypes[i].showPrefixLink = true;
              professionalTypeIdss.value.push(
                newLicense.value.professionalTypes[i].professionalTypeId
              );
            }
            if (newLicense.value.applicationStatus.code == "REVDRA") {
              rejected.value = newLicense.value.declinedFields;
              for (let i in newLicense.value.documents) {
                for (let j in rejected.value) {
                  if (
                    newLicense.value.documents[i].documentTypeCode ==
                    rejected.value[j]
                  ) {
                    rejectedObj.value.push(newLicense.value.documents[i]);
                    break;
                  }
                }
              }
              accepted.value = newLicense.value.acceptedFields;
              index.value = rejected.value.length + accepted.value.length;
              if (index.value == docs.value.length) {
                index.value -= 1;
              }
              amount.value = ((index.value + 1) / docs.value.length) * 100;
              width.value = "width:" + amount.value + "%";
              if (
                accepted.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                ) ||
                rejected.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                )
              ) {
                findDocumentType(documentTypes.value, docs.value[index.value]);
              }
            }
          });
      }
      if (applicationType.value == "Good Standing") {
        store
          .dispatch("reviewer/getGoodStandingApplication", applicationId)
          .then((res) => {
            isGoodStanding.value = true;
            newLicense.value = res.data.data;
            departmentId.value = res.data.data.departmentId;
            getProfessionalTypesByDepartmentId(departmentId.value);
            profileInfo.value = newLicense.value.applicant.profile;
            applicantId.value = res.data.data.applicantId;
            newLicense.value = {
              ...newLicense.value,
              ...res.data.data,
            };
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (allButtons) => {
                return allButtons.name != "Under supervision";
              }
            );
            buttons.value.forEach((button) => {
              button.name === "Approve"
                ? (button.name = "Verify")
                : (button.name = button.name);
            });
            docs.value = res.data.data.documents;
            fetchDocumentTypes();
            for (
              let i = 0;
              i < newLicense.value.professionalTypes.length;
              i++
            ) {
              newLicense.value.professionalTypes[i].showPrefix = false;
              newLicense.value.professionalTypes[i].showPrefixLink = true;
              professionalTypeIdss.value.push(
                newLicense.value.professionalTypes[i].professionalTypeId
              );
            }
            if (newLicense.value.applicationStatus.code == "REVDRA") {
              rejected.value = newLicense.value.declinedFields;
              for (let i in newLicense.value.documents) {
                for (let j in rejected.value) {
                  if (
                    newLicense.value.documents[i].documentTypeCode ==
                    rejected.value[j]
                  ) {
                    rejectedObj.value.push(newLicense.value.documents[i]);
                    break;
                  }
                }
              }
              accepted.value = newLicense.value.acceptedFields;
              index.value = rejected.value.length + accepted.value.length;
              if (index.value == docs.value.length) {
                index.value -= 1;
              }
              amount.value = ((index.value + 1) / docs.value.length) * 100;
              width.value = "width:" + amount.value + "%";
              if (
                accepted.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                ) ||
                rejected.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                )
              ) {
                findDocumentType(documentTypes.value, docs.value[index.value]);
              }
            }
          });
      }
      if (applicationType.value == "Verification") {
        store
          .dispatch("reviewer/getVerificationApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            departmentId.value = res.data.data.education.department.id;
            getProfessionalTypesByDepartmentId(departmentId.value);
            profileInfo.value = newLicense.value.applicant.profile;
            buttons.value = res.data.data.applicationStatus.buttons.filter(
              (allButtons) => {
                return allButtons.name != "Under supervision";
              }
            );
            buttons.value.forEach((button) => {
              button.name === "Approve"
                ? (button.name = "Verify")
                : (button.name = "-");
            });
            docs.value = res.data.data.documents;
            fetchDocumentTypes();
            for (
              let i = 0;
              i < newLicense.value.professionalTypes.length;
              i++
            ) {
              professionalTypeIdss.value.push(
                newLicense.value.professionalTypes[i].id
              );
            }
            if (newLicense.value.applicationStatus.code == "REVDRA") {
              rejected.value = newLicense.value.declinedFields;
              for (let i in newLicense.value.documents) {
                for (let j in rejected.value) {
                  if (
                    newLicense.value.documents[i].documentTypeCode ==
                    rejected.value[j]
                  ) {
                    rejectedObj.value.push(newLicense.value.documents[i]);
                    break;
                  }
                }
              }
              accepted.value = newLicense.value.acceptedFields;
              index.value = rejected.value.length + accepted.value.length;
              if (index.value == docs.value.length) {
                index.value -= 1;
              }
              amount.value = ((index.value + 1) / docs.value.length) * 100;
              width.value = "width:" + amount.value + "%";
              if (
                accepted.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                ) ||
                rejected.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                )
              ) {
                findDocumentType(documentTypes.value, docs.value[index.value]);
              }
            }
          });
      }
      if (applicationType.value == "Renewal") {
        store
          .dispatch("reviewer/getRenewalApplication", applicationId)
          .then((res) => {
            newLicense.value = res.data.data;
            departmentId.value = res.data.data.education.department.id;
            getProfessionalTypesByDepartmentId(departmentId.value);
            profileInfo.value = newLicense.value.applicant.profile;
            buttons.value = res.data.data.applicationStatus.buttons;
            docs.value = res.data.data.documents;
            fetchDocumentTypes();
            for (
              let i = 0;
              i < newLicense.value.professionalTypes.length;
              i++
            ) {
              newLicense.value.professionalTypes[i].showPrefix = false;
              newLicense.value.professionalTypes[i].showPrefixLink = true;
              professionalTypeIdss.value.push(
                newLicense.value.professionalTypes[i].professionalTypeId
              );
            }
            if (newLicense.value.applicationStatus.code == "REVDRA") {
              rejected.value = newLicense.value.declinedFields;
              for (let i in newLicense.value.documents) {
                for (let j in rejected.value) {
                  if (
                    newLicense.value.documents[i].documentTypeCode ==
                    rejected.value[j]
                  ) {
                    rejectedObj.value.push(newLicense.value.documents[i]);
                    break;
                  }
                }
              }
              accepted.value = newLicense.value.acceptedFields;
              index.value = rejected.value.length + accepted.value.length;
              if (index.value == docs.value.length) {
                index.value -= 1;
              }
              amount.value = ((index.value + 1) / docs.value.length) * 100;
              width.value = "width:" + amount.value + "%";
              if (
                accepted.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                ) ||
                rejected.value.includes(
                  docs.value[index.value - 1].documentTypeCode
                )
              ) {
                findDocumentType(documentTypes.value, docs.value[index.value]);
              }
            }
          });
      }
      applicationType.value = route.params.applicationType;
    };
    const fetchDocumentTypes = async () => {
      store.dispatch("reviewer/getDocumentTypes").then((res) => {
        documentTypes.value = res.data.data;
        findDocumentType(documentTypes.value, docs.value[0]);
      });
    };
    const next = (doc) => {
      if (nextClickable.value == true) {
        index.value = index.value + 1;
        amount.value = ((index.value + 1) / docs.value.length) * 100;
        width.value = "width:" + amount.value + "%";
        findDocumentType(documentTypes.value, docs.value[index.value]);
        nextClickable.value = false;
      }
      if (
        accepted.value.includes(doc.documentTypeCode) ||
        rejected.value.includes(doc.documentTypeCode)
      ) {
        nextClickable.value = true;
      }
    };
    const previous = () => {
      if (index.value == docs.value.length - 1) {
        showButtons.value = false;
      }
      index.value = index.value - 1;
      amount.value = ((index.value + 1) / docs.value.length) * 100;
      width.value = "width:" + amount.value + "%";
      findDocumentType(documentTypes.value, docs.value[index.value]);
      nextClickable.value = true;
    };
    const nextRemark = () => {
      if (ind.value != rejectedObj.value.length - 1) {
        ind.value = ind.value + 1;
        modalFindDocumentType(
          documentTypes.value,
          rejectedObj.value[ind.value]
        );
        nextClickable.value = false;
      }
    };
    const previousRemark = () => {
      ind.value = ind.value - 1;
      modalFindDocumentType(documentTypes.value, rejectedObj.value[ind.value]);
      nextClickable.value = true;
    };
    const findDocumentType = (obj, ab) => {
      for (var prop in obj) {
        if (obj[prop].code == ab.documentTypeCode) {
          documentTypeName.value = obj[prop].name;
        }
      }
    };

    const modalFindDocumentType = (obj, ab) => {
      for (var prop in obj) {
        if (obj[prop].code == ab.documentTypeCode) {
          modalDocumentTypeName.value = obj[prop].name;
        }
      }
    };
    const accept = (doc) => {
      nextClickable.value = true;
      if (accepted.value.length > 0) {
        if (!accepted.value.includes(doc.documentTypeCode)) {
          accepted.value.push(doc.documentTypeCode);
          if (index.value == docs.value.length - 1) {
            showButtons.value = true;
          } else {
            index.value = index.value + 1;
            amount.value = ((index.value + 1) / docs.value.length) * 100;
            width.value = "width:" + amount.value + "%";
            findDocumentType(documentTypes.value, docs.value[index.value]);
          }
          if (rejected.value.includes(doc.documentTypeCode)) {
            rejected.value.splice(
              rejected.value.indexOf(doc.documentTypeCode),
              1
            );
            rejectedObj.value.splice(rejectedObj.value.indexOf(doc), 1);
          }
        } else {
          if (index.value == docs.value.length - 1) {
            showButtons.value = true;
          } else {
            index.value = index.value + 1;
            amount.value = ((index.value + 1) / docs.value.length) * 100;
            width.value = "width:" + amount.value + "%";
            findDocumentType(documentTypes.value, docs.value[index.value]);
          }
        }
      } else {
        accepted.value.push(doc.documentTypeCode);
        if (index.value == docs.value.length - 1) {
          showButtons.value = true;
        } else {
          index.value = index.value + 1;
          amount.value = ((index.value + 1) / docs.value.length) * 100;
          width.value = "width:" + amount.value + "%";
          findDocumentType(documentTypes.value, docs.value[index.value]);
        }
        if (rejected.value.includes(doc.documentTypeCode)) {
          rejected.value.splice(
            rejected.value.indexOf(doc.documentTypeCode),
            1
          );
          rejectedObj.value.splice(rejectedObj.value.indexOf(doc), 1);
        }
      }
    };

    const reject = (doc) => {
      nextClickable.value = true;
      if (rejected.value.length > 0) {
        if (!rejected.value.includes(doc.documentTypeCode)) {
          rejected.value.push(doc.documentTypeCode);
          rejectedObj.value.push(doc);
          if (index.value == docs.value.length - 1) {
            showButtons.value = true;
          } else {
            index.value = index.value + 1;
            amount.value = ((index.value + 1) / docs.value.length) * 100;
            width.value = "width:" + amount.value + "%";
            findDocumentType(documentTypes.value, docs.value[index.value]);
          }
          if (accepted.value.includes(doc.documentTypeCode)) {
            accepted.value.splice(
              accepted.value.indexOf(doc.documentTypeCode),
              1
            );
          }
        } else {
          if (index.value == docs.value.length - 1) {
            showButtons.value = true;
          } else {
            index.value = index.value + 1;
            amount.value = ((index.value + 1) / docs.value.length) * 100;
            width.value = "width:" + amount.value + "%";
            findDocumentType(documentTypes.value, docs.value[index.value]);
          }
        }
      } else {
        rejected.value.push(doc.documentTypeCode);
        rejectedObj.value.push(doc);
        if (index.value == docs.value.length - 1) {
          showButtons.value = true;
        } else {
          index.value = index.value + 1;
          amount.value = ((index.value + 1) / docs.value.length) * 100;
          width.value = "width:" + amount.value + "%";
          findDocumentType(documentTypes.value, docs.value[index.value]);
        }
        if (accepted.value.includes(doc.documentTypeCode)) {
          accepted.value.splice(
            accepted.value.indexOf(doc.documentTypeCode),
            1
          );
        }
      }
    };

    const action = (actionValue) => {
      showActionLoading.value = true;
      showLoadingButtons.value = true;
      if (professionalTypeIdss.value.length > 0) {
        newLicense.value.professionalTypeIds = professionalTypeIdss.value;
        newLicense.value.professionalTypePrefixes =
          professionalTypePrefixes.value;
      } else {
        showProfessionChangeError.value = true;
        setTimeout(() => {
          showProfessionChangeError.value = false;
        }, 4000);
        professionalTypeIdss.value = [];
        professionalTypePrefixes.value = [];
        showActionLoading.value = false;
        showLoadingButtons.value = false;
        return;
      }

      let loopCounter = 0;

      for (let i = 0; i < professionalTypeIdss.value.length; i++) {
        let professionId = professionalTypeIdss.value[i];
        for (
          let j = 0;
          j < newLicense.value.professionalTypePrefixes.length;
          j++
        ) {
          if (
            newLicense.value.professionalTypePrefixes[j].professionalTypeId !=
            professionId
          ) {
            loopCounter++;
          }
        }
        if (loopCounter == newLicense.value.professionalTypePrefixes.length) {
          newLicense.value.professionalTypePrefixes.push({
            professionalTypeId: professionId,
            prefix: null,
          });
        }
        loopCounter = 0;
      }

      if (actionValue === "ApproveEvent") {
        if (
          newLicense.value.licenseExpirationDate === null &&
          !isGoodStanding.value
        ) {
          showLicenseDateRequirementError.value = true;
          setTimeout(() => {
            showLicenseDateRequirementError.value = false;
          }, 4000);
          showActionLoading.value = false;
          showLoadingButtons.value = false;
          return;
        } else if (
          !moment(newLicense.value.licenseExpirationDate).isAfter(new Date()) &&
          !isGoodStanding.value
        ) {
          expirationDateExceedTodayError.value = true;
          setTimeout(() => {
            expirationDateExceedTodayError.value = false;
          }, 4000);
          showActionLoading.value = false;
          showLoadingButtons.value = false;
          return;
        }
      }

      if (actionValue == "DeclineEvent") {
        showActionLoading.value = false;
        showLoadingButtons.value = false;
        let checkProfessionResult = false;
        newLicense.value.isProfessionChanged == false
          ? (checkProfessionResult = checkProfessionChanged(
              newLicense.value.professionalTypes
            ))
          : (checkProfessionResult = true);

        if (checkProfessionResult) {
          showProfessionChangeError.value = true;
          setTimeout(() => {
            showProfessionChangeError.value = false;
          }, 4000);
          // professionalTypeIdss.value = [];
          // professionalTypePrefixes.value = [];
          showActionLoading.value = false;
          showLoadingButtons.value = false;
          return;
        } else {
          showRemark.value = true;
          sendDeclinedData.value = false;
          if (fromModalSendDeclinedData.value == true) {
            sendDeclinedData.value = true;
          }
        }
      }

      if (actionValue == "ReviewerDraftEvent") {
        let checkProfessionResult = false;
        newLicense.value.isProfessionChanged == false
          ? (checkProfessionResult = checkProfessionChanged(
              newLicense.value.professionalTypes
            ))
          : (checkProfessionResult = true);

        if (checkProfessionResult) {
          newLicense.value.isProfessionChanged = true;
        }
      }

      if (prefix.value !== undefined) {
        newLicense.value.prefix = prefix.value;
      }
      if (professionalTypeIdss.value.length > 0) {
        newLicense.value.professionalTypeIds = professionalTypeIdss.value;
        newLicense.value.professionalTypePrefixes =
          professionalTypePrefixes.value;
      }
      newLicense.value.declinedFields = rejected.value;
      newLicense.value.acceptedFields = accepted.value;
      newLicense.value.certified = true;
      newLicense.value.certifiedDate = new Date();
      let req = {
        action: actionValue,
        data: newLicense.value,
      };
      if (
        applicationType.value == "New License" &&
        sendDeclinedData.value == true
      ) {
        store
          .dispatch("reviewer/editNewLicense", req)
          .then((res) => {
            showActionLoading.value = false;
            if (res.statusText == "Created") {
              showFlash.value = true;
              showDeclineFlash.value = true;
              setTimeout(() => {
                router.push("/admin/review");
              }, 3000);
            } else {
              showErrorFlash.value = true;
              setTimeout(() => {
                router.go();
              }, 3000);
            }
          })
          .catch((err) => {
            showErrorFlash.value = true;
            setTimeout(() => {
              router.go();
            }, 3000);
          });
      }
      if (
        applicationType.value == "Verification" &&
        sendDeclinedData.value == true
      ) {
        store.dispatch("reviewer/editVerification", req).then((res) => {
          showActionLoading.value = false;
          if (res.statusText == "Created") {
            showFlash.value = true;
            showDeclineFlash.value = true;
            setTimeout(() => {
              router.push("/admin/review");
            }, 3000);
          } else {
            showErrorFlash.value = true;
            setTimeout(() => {
              router.go();
            }, 3000);
          }
        });
      }
      if (
        applicationType.value == "Good Standing" &&
        sendDeclinedData.value == true
      ) {
        store.dispatch("reviewer/editGoodStanding", req).then((res) => {
          showActionLoading.value = false;
          if (res.statusText == "Created") {
            showFlash.value = true;
            showDeclineFlash.value = true;
            // let redirectUrl = "/admin/review";
            // if (req.action == "ApproveEvent") {
            //   redirectUrl =
            //     "/admin/finishedDetail/" +
            //     route.params.applicationType +
            //     "/" +
            //     route.params.applicationId +
            //     "/" +
            //     applicantId.value;
            // }
            setTimeout(() => {
              router.push("/admin/review");
            }, 3000);
          } else {
            showErrorFlash.value = true;
            setTimeout(() => {
              router.go();
            }, 3000);
          }
        });
      }
      if (
        applicationType.value == "Renewal" &&
        sendDeclinedData.value == true
      ) {
        store.dispatch("reviewer/editRenewal", req).then((res) => {
          showActionLoading.value = false;
          if (res.statusText == "Created") {
            showFlash.value = true;
            showDeclineFlash.value = true;
            setTimeout(() => {
              router.push("/admin/review");
            }, 3000);
          } else {
            showErrorFlash.value = true;
            setTimeout(() => {
              router.go();
            }, 3000);
          }
        });
      }
    };

    const submitRemark = () => {
      showRemark.value = !showRemark.value;
      sendDeclinedData.value = true;
      fromModalSendDeclinedData.value = true;
      action("DeclineEvent");
    };

    const toggleModal = () => {
      showRemark.value = !showRemark.value;
    };

    const openPdfInNewTab = (pdfPath) => {
      pdfFilePath.value = pdfPath;
      window.open(
        googleApi + "" + pdfPath,
        "_blank"
      );
    };

    const toChangeProfession = () => {
      isToChangeProfession.value = true;
    };
    const cancelProfessionChange = () => {
      isToChangeProfession.value = false;
    };
    const changeProfession = () => {};

    const getProfessionalTypesByDepartmentId = (id) => {
      let professionSelected = ref(false);
      store
        .dispatch("reviewer/getProfessionalTypeByDepartmentId", id)
        .then((res) => {
          res.data.data
            .filter(function(e) {
              for (let i in newLicense.value.professionalTypes) {
                if (
                  e.code ===
                  newLicense.value.professionalTypes[i].professionalTypes.code
                ) {
                  professionSelected.value = true;
                }
              }
              if (!professionSelected.value) {
                professionalTypes.value.push(e);
              }
              professionSelected.value = false;
            })
            .map((mapData) => {
              mapData.showPrefix = false;
              mapData.showPrefixLink = false;
              return mapData;
            });
        });
    };
    const allowChangeName = () => {
      canChangeName.value = true;
    };
    const disallowChangeName = () => {
      canChangeName.value = false;
    };
    const changeAmharicName = () => {
      showSpinner.value = true;
      const id = profileInfo.value.id;
      let newProfile = {
        alternativeName: newLicense.value.applicant.profile.alternativeName,
        alternativeFatherName:
          newLicense.value.applicant.profile.alternativeFatherName,
        alternativeGrandFatherName:
          newLicense.value.applicant.profile.alternativeGrandFatherName,
      };
      const profileData = [id, newProfile];
      store
        .dispatch("profile/changeUserProfile", profileData)
        .then(() => {
          showSpinner.value = false;
          canChangeName.value = false;
          showNameChangeFlash.value = true;
          setTimeout(() => {
            showNameChangeFlash.value = false;
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          canChangeName.value = false;
          showNameChangeErrorFlash.value = true;
          setTimeout(() => {
            showNameChangeErrorFlash.value = false;
          }, 3000);
        });
    };

    const checkResult = ref(false);
    const checkBoxClicked = (profession, previousProfession, index, event) => {
      checkResult.value = chkcontrol(index, previousProfession, event);
      if (checkResult.value) {
        if (event.target.checked) {
          previousProfession
            ? (newLicense.value.professionalTypes[index].showPrefixLink = true)
            : (professionalTypes.value[index].showPrefixLink = true);
          previousProfession
            ? professionalTypeIdss.value.push(profession.professionalTypes.id)
            : professionalTypeIdss.value.push(profession.id);
        } else {
          previousProfession
            ? (newLicense.value.professionalTypes[index].showPrefixLink = false)
            : (professionalTypes.value[index].showPrefixLink = false);
          previousProfession
            ? professionalTypeIdss.value.splice(
                professionalTypeIdss.value.indexOf(
                  profession.professionalTypes.id
                ),
                1
              )
            : professionalTypeIdss.value.splice(
                professionalTypeIdss.value.indexOf(profession.id),
                1
              );

          if (previousProfession) {
            professionalTypePrefixes.value = professionalTypePrefixes.value.filter(
              (data) => {
                return (
                  data.professionalTypeId != profession.professionalTypes.id
                );
              }
            );
          } else {
            professionalTypePrefixes.value = professionalTypePrefixes.value.filter(
              (data) => {
                return data.professionalTypeId != profession.id;
              }
            );
          }

          if (
            previousProfession &&
            profession.professionalTypes.name == "Other"
          ) {
            newLicense.value.otherProfessionalType = null;
          } else if (!previousProfession && profession.name == "Other") {
            newLicense.value.otherProfessionalType = null;
          }
        }
      }
    };

    const chkcontrol = (j, previousProfession, event) => {
      if (event.target.checked) {
        if (professionalTypeIdss.value.length == 3) {
          alert(
            "You can only select 3 professional types. Please Select only four!"
          );
          if (previousProfession) {
            document.getElementsByName("ckb")[j].checked = false;
            return false;
          } else {
            document.getElementsByName("nckb")[j].checked = false;
            return false;
          }
        }

        return true;
      }

      return true;
    };

    let countProLength = ref(0);
    const addPrefix = (professionId, event) => {
      if (professionalTypePrefixes.value.length === 0) {
        professionalTypePrefixes.value.push({
          professionalTypeId: professionId,
          prefix: event.target.value,
        });
        return;
      }
      for (let i = 0; i < professionalTypePrefixes.value.length; i++) {
        if (
          professionId !== professionalTypePrefixes.value[i].professionalTypeId
        ) {
          countProLength.value++;
          if (countProLength.value === professionalTypePrefixes.value.length) {
            professionalTypePrefixes.value.push({
              professionalTypeId: professionId,
              prefix: event.target.value,
            });
            countProLength.value = 0;
            return;
          }
        } else {
          professionalTypePrefixes.value.splice(
            professionalTypePrefixes.value.indexOf({
              professionalTypeId: professionId,
            }),
            1
          );
          if (event.target.value === "None") {
            return;
          }
          professionalTypePrefixes.value.push({
            professionalTypeId: professionId,
            prefix: event.target.value,
          });
          countProLength.value = 0;
          return;
        }
      }
    };

    const checkProfessionChanged = (previousProfessionType) => {
      let count = 0;
      if (previousProfessionType.length !== professionalTypeIdss.value.length) {
        return true;
      } else {
        for (let i = 0; i < previousProfessionType.length; i++) {
          for (let j = 0; j < previousProfessionType.length; j++) {
            if (
              previousProfessionType[i].professionalTypeId !=
              professionalTypeIdss.value[j]
            ) {
              count++;
            }
          }
          if (count == previousProfessionType.length) {
            return true;
          } else {
            count = 0;
          }
        }
      }
      return false;
    };

    onMounted(() => {
      created(route.params.applicationType, route.params.applicationId);
    });
    return {
      isPdf,
      newLicense,
      index,
      docs,
      next,
      previous,
      nextRemark,
      previousRemark,
      amount,
      width,
      documentTypes,
      findDocumentType,
      documentTypeName,
      accepted,
      rejected,
      accept,
      reject,
      buttons,
      action,
      showButtons,
      isToChangeProfession,
      profileInfo,
      disableNext,
      nextClickable,
      foundInRejected,
      foundInAcceptted,
      showRemark,
      toggleModal,
      activeClass,
      errorClass,
      submitRemark,
      applicationType,
      showFlash,
      showErrorFlash,
      showDeclineFlash,
      sendDeclinedData,
      fromModalSendDeclinedData,
      rejectedObj,
      ind,
      modalDocumentTypeName,
      modalFindDocumentType,
      evaluateRoute,
      pdfFilePath,
      openPdfInNewTab,
      toChangeProfession,
      cancelProfessionChange,
      changeProfession,
      professionalTypes,
      canChangeName,
      allowChangeName,
      disallowChangeName,
      changeAmharicName,
      showSpinner,
      showNameChangeFlash,
      showNameChangeErrorFlash,
      showLicenseDateRequirementError,
      professionalTypeIds,
      showProfessionChangeError,
      expirationDateExceedTodayError,
      prefixList,
      prefix,
      professionalTypeIdss,
      checkBoxClicked,
      addPrefix,
      options,
      selectedOptions,
      newSelectedOptions,
      otherProfessionalType,
      showOtherProfessionError,
      chkcontrol,
      checkResult,
      isProfessionalTypeChanged,
      checkProfessionChanged,
      isGoodStanding,
      showActionLoading,
      showLoadingButtons,
      googleApi,
    };
  },
};
</script>
<style>
.md-danger {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
  color: white;
}
a:hover {
  cursor: pointer;
}
.card-wrapper {
  width: 920px;
  height: 680px;
  box-shadow: 0px -8px 6px rgb(30 64 175 / 51%);
}
.modalBody {
  max-width: 620px !important;
  max-height: 420px !important;
}
.imageViewer {
  width: 320px;
  height: 320px !important;
}
.tArea {
  width: 620px;
}

.img {
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 120px;
  height: 120px;
  border-color: steelblue;
  background-color: steelblue;
}

#accepte {
  border-color: tomato;
}
svg:hover {
  color: #000000;
  cursor: pointer;
}
.decline {
  background-image: linear-gradient(to right, #d63232, #e63636) !important;
}
.detailTitle {
  color: dimgray;
}
@media only screen and (max-height: 1081px) {
  .card-wrapper {
    height: 640px;
  }
  .modalBody {
    max-width: 820px !important;
    max-height: 360px !important;
  }
  .imageViewer {
    width: 220px;
    height: 320px !important;
  }
  .tArea {
    width: 720px;
    height: 95px;
  }
  .titleColors {
    color: blue;
  }
  /* .tArea:focus {
    border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
    box-shadow: 0 0 0 3px hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) +
          40%), 0.8);
    outline: 3px solid transparent;
  } */
}
</style>
