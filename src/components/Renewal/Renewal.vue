<template>
  <div class="overflow-x-hidden overflow-y-scroll">
    <Navigation />
    <div
      class="w-screen h-full pb-xl bg-lightBlueB-200 flex items-center justify-center"
    >
      <div class="w-screen max-w-4xl mt-medium">
        <div class="flex flex-col w-full rounded mb-large">
          <h2 class="flex justify-center pb-medium">Renewal</h2>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 1">
              <Institution
                :activeState="1"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
                @applicantTypeValue="applicantTypeSet"
                @payrollDocumentSet="payrollDocumentSet"
                @firstTimeUserSet="firstTimeUserSet"
                @diplomaSet="diplomaSet"
              />
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 2">
              <HealthExamCert
                :activeState="2"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
              />
            </div>
          </transition>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                !this.firstTimeUser
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <PreviousLicenseL
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <CPDF
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <WorkExperience
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <LicenseSummary
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'diploma'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <COC
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Diploma
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <PayrollDoc
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <SupportLetterEthiopian
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <Transcript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <WorkExperience
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PreviousLicenseL
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <CPDF
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <LicenseSummary
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'degree'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Degree
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Diploma
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <PayrollDoc
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <SupportLetterEthiopian
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <Transcript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <WorkExperience
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PreviousLicenseL
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <CPDF
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <LicenseSummary
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'masters'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Degree
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Diploma
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <PayrollDoc
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <SupportLetterEthiopian
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <Transcript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <WorkExperience
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PreviousLicenseL
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <CPDF
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <Masters
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 14">
                <MastersTranscript
                  :activeState="14"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 15">
                <LicenseSummary
                  :activeState="15"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'phd'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Degree
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Diploma
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <PayrollDoc
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <SupportLetterEthiopian
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <Transcript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <WorkExperience
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PreviousLicenseL
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <CPDF
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <Masters
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 14">
                <MastersTranscript
                  :activeState="14"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 15">
                <PhD
                  :activeState="15"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 16">
                <PhDTranscript
                  :activeState="16"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 17">
                <LicenseSummary
                  :activeState="17"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                !this.displayPayrollOption &&
                !this.firstTimeUser
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <PreviousLicenseL
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <CPDF
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <WorkExperience
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <LicenseSummary
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                !this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'diploma'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Diploma
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <COC
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <SupportLetterEthiopian
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Transcript
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <WorkExperience
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <PreviousLicenseL
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <CPDF
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <LicenseSummary
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                !this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'degree'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Diploma
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Degree
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <EducationalDoc
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <SupportLetterEthiopian
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Transcript
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <WorkExperience
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <PreviousLicenseL
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <CPDF
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <LicenseSummary
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                !this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'masters'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Diploma
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Degree
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <Masters
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <MastersTranscript
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <EducationalDoc
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <SupportLetterEthiopian
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <Transcript
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <WorkExperience
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <PreviousLicenseL
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <CPDF
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 14">
                <LicenseSummary
                  :activeState="14"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div
            v-if="
              this.applicantType == 1 &&
                !this.displayPayrollOption &&
                this.firstTimeUser &&
                this.eduLevel == 'phd'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <Degree
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <Masters
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <MastersTranscript
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <PhD
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <PhDTranscript
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <EducationalDoc
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <SupportLetterEthiopian
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <Transcript
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <WorkExperience
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 13">
                <PreviousLicenseL
                  :activeState="13"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 14">
                <CPDF
                  :activeState="14"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                /></div
            ></transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 15">
                <LicenseSummary
                  :activeState="15"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div v-if="this.applicantType == 3 && !this.firstTimeUser">
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <PreviousLicenseF
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <CPDE
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <WorkExperience
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <LicenseSummary
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div v-if="this.applicantType == 3 && this.firstTimeUser">
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EnglishLanguageForeigner
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <HERQAF
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <ProfessionalLicense
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <RenewedLicense
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <WorkExperience
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <PreviousLicenseF
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <CPDE
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <LicenseSummary
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div v-if="this.applicantType == 2 && !this.firstTimeUser">
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <LetterFromHiringManagerForeigner
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <PreviousLicenseE
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <CPDL
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <WorkExperience
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <RenewedLicenseOfHealthFacility
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <LicenseSummary
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
          <div v-if="this.applicantType == 2 && this.firstTimeUser">
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <Passport
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <HERQA
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <WorkExperience
                  :activeState="5"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <PreviousLicenseE
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <CPDL
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <RenewedLicenseOfHealthFacility
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <LicenseSummary
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mr-3xl" v-if="showFlash">
    <FlashMessage message="Operation Successful!" />
  </div>
  <div v-if="showErrorFlash">
    <ErrorFlashMessage message="Operation Failed!" />
  </div>
</template>
<script>
import Navigation from "@/views/Navigation";
import Institution from "./Institution.vue";
import HealthExamCert from "./HealthExamCert";
import WorkExperience from "./WorkExperience";
import Passport from "./Passport.vue";

// ethiopian from abroad applicant's documents
import CPDE from "./Ethiopians F/CPD";
import PreviousLicenseE from "./Ethiopians F/PreviousLicenseE";
import HERQA from "./Ethiopians F/HERQA";

// ethiopian local applicant's documents
import CPDL from "./Ethiopians L/CPD";
import PreviousLicenseL from "./Ethiopians L/PreviousLicenseL";
import PayrollDoc from "./Ethiopians L/Payroll.vue";
import COC from "./Ethiopians L/COC";
import Degree from "./Ethiopians L/Degree.vue";
import Diploma from "./Ethiopians L/Diploma.vue";
import Transcript from "./Ethiopians L/Transcript.vue";
import EducationalDoc from "./Ethiopians L/EducationalDoc";
import SupportLetterEthiopian from "./Ethiopians L/SupportLetter";
import Masters from "./Ethiopians L/Masters.vue";
import MastersTranscript from "./Ethiopians L/MastersTranscript.vue";
import PhD from "./Ethiopians L/PhD.vue";
import PhDTranscript from "./Ethiopians L/PhDTranscript.vue";

// foreigner applicant's documents
import PreviousLicenseF from "./Foreigner/PreviousLicenseF";
import CPDF from "./Foreigner/CPD";
import RenewedLicenseOfHealthFacility from "./Foreigner/RenewedLicenseOfHealthFacility";
import EnglishLanguageForeigner from "./Foreigner/EnglishLanguage";
import HERQAF from "./Foreigner/HERQAF.vue";
import ProfessionalLicense from "./Foreigner/ProfessionalLicense";
import RenewedLicense from "./Foreigner/RenewedLicense";
import LetterFromHiringManagerForeigner from "./Foreigner/LetterFromHiringManager.vue";

import LicenseSummary from "./RenewalSummary";

import FlashMessage from "@/sharedComponents/FlashMessage";
import ErrorFlashMessage from "@/sharedComponents/ErrorFlashMessage";
import Spinner from "@/sharedComponents/Spinner";

export default {
  created() {
    this.draftId = this.$route.params.id;
    this.draftStatus = this.$route.params.status;
    if (this.draftId != undefined) {
      this.fetchDraft(this.draftId);
    }
    this.fetchApplicationStatuses();
    this.fetchApplicationCategory();
  },
  data: () => ({
    firstTimeUser: false,
    activeState: 1,
    applicantType: 1,
    applicationStatuses: "",
    applicationCategories: "",
    documentSpecs: "",
    buttons: [],
    applicationId: "",
    draftId: "",
    declinedFields: [],
    acceptedFields: [],
    remark: "",
    displayPayrollOption: true,
    eduLevel: "",
  }),
  components: {
    Navigation,
    Institution,
    HealthExamCert,
    WorkExperience,
    Passport,
    CPDE,
    PreviousLicenseE,
    HERQA,
    CPDL,
    PreviousLicenseL,
    PayrollDoc,
    COC,
    Degree,
    Diploma,
    Transcript,
    EducationalDoc,
    SupportLetterEthiopian,
    Masters,
    MastersTranscript,
    PhD,
    PhDTranscript,
    PreviousLicenseF,
    CPDF,
    RenewedLicenseOfHealthFacility,
    EnglishLanguageForeigner,
    HERQAF,
    ProfessionalLicense,
    RenewedLicense,
    LetterFromHiringManagerForeigner,
    LicenseSummary,
    FlashMessage,
    ErrorFlashMessage,
    Spinner,
  },
  methods: {
    applicantTypeSet: function(params) {
      if (params == null || params == undefined || params == "") {
        this.applicantType = 3;
      } else {
        this.applicantType = params;
      }
    },
    payrollDocumentSet: function(params) {
      if (params == 2) {
        this.displayPayrollOption = true;
      } else {
        this.displayPayrollOption = false;
      }
    },
    diplomaSet: function(params) {
      if (params == 1) {
        this.eduLevel = "diploma";
      }
      if (params == 2) {
        this.eduLevel = "degree";
      }
      if (params == 3) {
        this.eduLevel = "masters";
      }
      if (params == 4) {
        this.eduLevel = "phd";
      }
    },
    firstTimeUserSet: function(params) {
      if (params) {
        this.firstTimeUser = true;
      } else {
        this.firstTimeUser = false;
      }
    },
    submit(n) {
      this.activeState = n;
    },
    fetchApplicationStatuses() {
      this.$store.dispatch("renewal/getApplicationStatuses").then((res) => {
        const results = res.data.data;
        this.applicationStatuses = results;
        if (this.draftId != undefined) {
          if (this.draftStatus == "DRA" || this.draftStatus == "CONF") {
            let status = this.applicationStatuses.filter(function(e) {
              return e.code == "DRA";
            });
            this.buttons = status[0]["buttons"];

            let temp2 = "";
            temp2 = this.buttons[1];
            this.buttons[1] = this.buttons[2];
            this.buttons[2] = temp2;
          }
          if (this.draftStatus == "SUB") {
            let status = this.applicationStatuses.filter(function(e) {
              return e.code == "SUB";
            });
            this.buttons = status[0]["buttons"];
            // let temp = "";
            // temp = this.buttons[1];
            // this.buttons[1] = this.buttons[2];
            // this.buttons[2] = temp;
            // let temp2 = "";
            // temp2 = this.buttons[0];
            // this.buttons[0] = this.buttons[2];
            // this.buttons[2] = temp2;
          }
          if (this.draftStatus == "USUP") {
            let status = this.applicationStatuses.filter(function(e) {
              return e.code == "USUP";
            });
            this.buttons = status[0]["buttons"];
          }
          if (this.draftStatus == "DEC") {
            let status = this.applicationStatuses.filter(function(e) {
              return e.code == "DEC";
            });
            this.buttons = status[0]["buttons"];
            let temp3 = "";
            temp3 = this.buttons[1];
            this.buttons[1] = this.buttons[2];
            this.buttons[2] = temp3;
          }
        } else {
          let status = this.applicationStatuses.filter(function(e) {
            return e.code == "INIT";
          });
          this.buttons = status[0]["buttons"];
        }
        this.$store.dispatch("renewal/setButtons", this.buttons);
      });
    },
    fetchApplicationCategory() {
      this.$store.dispatch("renewal/getApplicationCategories").then((res) => {
        const results = res.data.data;
        this.applicationCategories = results;
        const newApplicationData = this.applicationCategories.filter((item) => {
          return item.name == "Renewal Application";
        });
        this.applicationId = newApplicationData[0]["id"];
        this.$store.dispatch("renewal/setApplicationId", this.applicationId);
        this.fetchDocumentSpec();
      });
    },
    fetchDocumentSpec() {
      this.$store
        .dispatch("renewal/getDocumentSpecs", this.applicationId)
        .then((res) => {
          const results = res.data.data;
          this.documentSpecs = results;
          this.$store
            .dispatch("renewal/setDocumentSpecs", this.documentSpecs)
            .then((res) => {});
        });
    },
    fetchDraft(id) {
      this.$store.dispatch("renewal/getDraft", id).then((res) => {
        const results = res.data.data;
        this.$store
          .dispatch("renewal/searchNewLicense", results.professionalTypes.id)
          .then((res) => {
            if (res.data.data) {
              this.firstTimeUser = false;
            } else {
              this.firstTimeUser = true;
            }
          });
        if (results.occupationTypeId == 2) {
          this.displayPayrollOption = false;
        } else {
          this.displayPayrollOption = true;
        }
        this.declinedFields = results.declinedFields;
        this.acceptedFields = results.acceptedFields;
        this.remark = results.remark;
        this.$store.dispatch("renewal/setDraft", results);
        this.$store.dispatch(
          "renewal/storeDeclinedFields",
          this.declinedFields
        );
        this.$store.dispatch(
          "renewal/storeAcceptedFields",
          this.acceptedFields
        );
        this.$store.dispatch("renewal/storeRemark", this.remark);
      });
    },
  },
};
</script>
<style>
#navg a {
  margin-left: 20px;
  height: 45px;
  width: 45px;
  background-color: #d1d5db;
  color: white;
  border-radius: 100%;
  display: inline-block;
}
#navg a:hover {
  background-color: #2f639d;
  cursor: pointer;
}
#navg a:visited {
  background-color: #2f639d;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-out ease-in;
}
</style>
