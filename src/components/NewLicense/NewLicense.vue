<template>
  <div class="overflow-x-hidden overflow-y-scroll">
    <Navigation />
    <div
      class="w-screen h-full pb-xl bg-lightBlueB-200 flex items-center justify-center"
    >
      <div class="w-screen max-w-4xl mt-medium">
        <div class="flex flex-col w-full rounded mb-large">
          <h2 class="flex justify-center pb-medium">New License</h2>
          <transition name="fade" mode="out-in">
            <div v-if="this.activeState == 1">
              <Institution
                :activeState="1"
                @changeActiveState="activeState++"
                @changeActiveStateMinus="activeState--"
                @applicantTypeValue="applicantTypeSet"
                @nativeLanguageSet="nativeLanguage"
                @payrollDocumentSet="payrollDocumentSet"
                @diplomaSet="diplomaSet"
              />
            </div>
          </transition>
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.eduLevel == 'diploma'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
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
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <PayrollDoc
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
                <Diploma
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
          <div
            v-if="
              this.applicantType == 1 &&
                this.displayPayrollOption &&
                this.eduLevel == 'degree'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>

            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
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
                <LicenseSummary
                  :activeState="9"
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
                this.eduLevel == 'masters'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Masters
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <MastersTranscript
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
                <LicenseSummary
                  :activeState="11"
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
                this.eduLevel == 'phd'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Masters
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <MastersTranscript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <PhD
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PhDTranscript
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <Transcript
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
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
                !this.displayPayrollOption &&
                this.eduLevel == 'diploma'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
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
                <EducationalDoc
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
                <Diploma
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <LicenseSummary
                  :activeState="10"
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
                this.eduLevel == 'degree'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
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
                <LicenseSummary
                  :activeState="9"
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
                this.eduLevel == 'masters'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Masters
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <MastersTranscript
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
                <LicenseSummary
                  :activeState="11"
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
                this.eduLevel == 'phd'
            "
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <EducationalDoc
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
                <SupportLetterEthiopian
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <Degree
                  :activeState="7"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <Masters
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <MastersTranscript
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <PhD
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <PhDTranscript
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <Transcript
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
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
            v-if="this.applicantType == 2 && this.displayEnglishLanguageOption"
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <EnglishLanguageForeigner
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <HealthExamCert
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
                  @applicantTypeValue="applicantTypeSet"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <ProfessionalDocCertificateF
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <ProfessionalDocDiplomaF
                  :activeState="7"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <ProfessionalDocTranscriptF
                  :activeState="8"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <ProfessionalLicense
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <WorkExperienceF
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <RenewedLicenseOfHealthFacility
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 12">
                <RequestLetterFromHiringHealthFacility
                  :activeState="12"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
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
            v-if="this.applicantType == 2 && !this.displayEnglishLanguageOption"
          >
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>

            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 4">
                <HERQAF
                  :activeState="4"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                  @applicantTypeValue="applicantTypeSet"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 5">
                <ProfessionalDocCertificateF
                  :activeState="5"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <ProfessionalDocDiplomaF
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <ProfessionalDocTranscriptF
                  :activeState="7"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <ProfessionalLicense
                  :activeState="8"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <WorkExperienceF
                  :activeState="9"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <RenewedLicenseOfHealthFacility
                  :activeState="10"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <RequestLetterFromHiringHealthFacility
                  :activeState="11"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
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
          <div v-if="this.applicantType == 3">
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 2">
                <Passport
                  :activeState="2"
                  @changeActiveState="activeState++"
                  @changeActiveStateMinus="activeState--"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 3">
                <HealthExamCert
                  :activeState="3"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
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
                <ProfessionalDocCertificate
                  :activeState="5"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 6">
                <ProfessionalDocDiploma
                  :activeState="6"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 7">
                <ProfessionalDocTranscript
                  :activeState="7"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 8">
                <WorkExperienceFF
                  :activeState="8"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 9">
                <SupportLetterFromSponsorInstitution
                  :activeState="9"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 10">
                <ProfessionalLicenseE
                  :activeState="10"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.activeState == 11">
                <LicenseSummary
                  :activeState="11"
                  @changeActiveStateMinus="activeState--"
                  @changeActiveState="activeState++"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/views/Navigation";

import Institution from "./Institution.vue";
import Passport from "./Passport.vue";
import HealthExamCert from "./HealthExamCert.vue";

// ethiopian from abroad applicant's documents
import HERQA from "./Ethiopians F/HERQA";
import ProfessionalDocCertificate from "./Ethiopians F/ProfessionalDocCertificate";
import ProfessionalDocDiploma from "./Ethiopians F/ProfessionalDocDiploma";
import ProfessionalDocTranscript from "./Ethiopians F/ProfessionalDocTranscript";
import SupportLetterFromSponsorInstitution from "./Ethiopians F/SupportLetter";
import WorkExperienceF from "./Ethiopians F/WorkExperience.vue";
import ProfessionalLicenseE from "./Ethiopians F/ProfessionalLicense";

// ethiopian local applicant's documents
import COC from "./Ethiopians L/COC";
import EducationalDoc from "./Ethiopians L/EducationalDoc";
import WorkExperience from "./Ethiopians L/WorkExperience";
import SupportLetterEthiopian from "./Ethiopians L/SupportLetter";
import PayrollDoc from "./Ethiopians L/Payroll.vue";
import Degree from "./Ethiopians L/Degree.vue";
import Diploma from "./Ethiopians L/Diploma.vue";
import Transcript from "./Ethiopians L/Transcript.vue";
import Masters from "./Ethiopians L/Masters.vue";
import MastersTranscript from "./Ethiopians L/MastersTranscript.vue";
import PhD from "./Ethiopians L/PhD.vue";
import PhDTranscript from "./Ethiopians L/PhDTranscript.vue";

// foreigner applicant's documents
import HERQAF from "./Foreigner/HERQAF.vue";
import RenewedLicenseOfHealthFacility from "./Foreigner/RenewedLicenseOfHealthFacility";
import RequestLetterFromHiringHealthFacility from "./Foreigner/RequestLetterFromHiringHealthFacility";
import EnglishLanguageForeigner from "./Foreigner/EnglishLanguage";
import ProfessionalDocCertificateF from "./Foreigner/ProfessionalDocCertificate";
import ProfessionalDocDiplomaF from "./Foreigner/ProfessionalDocDiploma";
import ProfessionalDocTranscriptF from "./Foreigner/ProfessionalDocTranscript";
import ProfessionalLicense from "./Foreigner/ProfessionalLicense";
import RenewedLicense from "./Foreigner/RenewedLicense";
import WorkExperienceFF from "./Foreigner/WorkExperience.vue";

import LicenseSummary from "./LicenseSummary.vue";

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
    activeState: 1,
    applicantType: 1,
    applicationStatuses: "",
    applicationCategories: "",
    documentSpecs: "",
    buttons: [],
    draftStatus: "",
    declinedFields: [],
    acceptedFields: [],
    remark: "",
    applicationId: "",
    draftId: "",
    displayLanguageOption: false,
    displayPayrollOption: false,
    eduLevel: "",
  }),
  components: {
    Navigation,
    Institution,
    Passport,
    HealthExamCert,
    HERQA,
    ProfessionalDocCertificate,
    ProfessionalDocDiploma,
    ProfessionalDocTranscript,
    SupportLetterFromSponsorInstitution,
    WorkExperienceF,
    ProfessionalLicenseE,
    COC,
    EducationalDoc,
    WorkExperience,
    SupportLetterEthiopian,
    PayrollDoc,
    Degree,
    Diploma,
    Transcript,
    Masters,
    MastersTranscript,
    PhD,
    PhDTranscript,
    HERQAF,
    RenewedLicenseOfHealthFacility,
    RequestLetterFromHiringHealthFacility,
    EnglishLanguageForeigner,
    ProfessionalDocCertificateF,
    ProfessionalDocDiplomaF,
    ProfessionalDocTranscriptF,
    ProfessionalLicense,
    RenewedLicense,
    WorkExperienceFF,
    LicenseSummary,
  },

  methods: {
    applicantTypeSet: function(params) {
      if (params == null || params == undefined || params == "") {
        this.applicantType = 3;
      } else {
        this.applicantType = params;
      }
    },
    nativeLanguage: function(params) {
      if (
        params == null ||
        params == undefined ||
        params == "" ||
        params == 1
      ) {
        this.displayEnglishLanguageOption = false;
      } else {
        this.displayEnglishLanguageOption = true;
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
    submit(n) {
      this.activeState = n;
    },
    fetchApplicationStatuses() {
      this.$store.dispatch("newlicense/getApplicationStatuses").then((res) => {
        const results = res.data.data;
        this.applicationStatuses = results;
        if (this.draftId != undefined) {
          if (this.draftStatus == "DRA") {
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
        this.$store.dispatch("newlicense/setButtons", this.buttons);
      });
    },
    fetchApplicationCategory() {
      this.$store
        .dispatch("newlicense/getApplicationCategories")
        .then((res) => {
          const results = res.data.data;
          this.applicationCategories = results;
          const newApplicationData = this.applicationCategories.filter(
            (item) => {
              return item.name == "New Application";
            }
          );
          this.applicationId = newApplicationData[0]["id"];
          this.$store.dispatch(
            "newlicense/setApplicationId",
            this.applicationId
          );
          this.fetchDocumentSpec();
        });
    },
    fetchDocumentSpec() {
      this.$store
        .dispatch("newlicense/getDocumentSpecs", this.applicationId)
        .then((res) => {
          const results = res.data.data;
          this.documentSpecs = results;
          this.$store
            .dispatch("newlicense/setDocumentSpecs", this.documentSpecs)
            .then((res) => {});
        });
    },
    fetchDraft(id) {
      this.$store.dispatch("newlicense/getDraft", id).then((res) => {
        const results = res.data.data;
        if (results.occupationTypeId == 2) {
          this.displayPayrollOption = false;
        } else {
          this.displayPayrollOption = true;
        }
        if (results.englishLanguageId == 1) {
          this.displayEnglishLanguageOption = false;
        } else {
          this.displayEnglishLanguageOption = true;
        }
        this.declinedFields = results.declinedFields;
        this.acceptedFields = results.acceptedFields;
        this.remark = results.remark;
        this.$store.dispatch("newlicense/setDraft", results);
        this.$store.dispatch(
          "newlicense/storeDeclinedFields",
          this.declinedFields
        );
        this.$store.dispatch(
          "newlicense/storeAcceptedFields",
          this.acceptedFields
        );
        this.$store.dispatch("newlicense/storeRemark", this.remark);
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
