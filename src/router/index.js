import { createRouter, createWebHistory, useRouter } from "vue-router";
import Landing from "../components/Landing/Landing.vue";
const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/404Page.vue"),

    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "Home",
    component: Landing,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/landing",
    name: "Landing",
    component: () => import("../components/Landing/Landing.vue"),
  },
  {
    path: "/update-profile/:id",
    name: "UpdateProfile",
    component: () => import("../components/Profile/UpdateProfile.vue"),
  },
  {
    path: "/addProfile",
    name: "NewProfile",
    component: () => import("../components/Profile/NewProfile.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/Menu.vue"),
  },
  {
    path: "/resetpassword/:id",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
  },
  {
    path: "/licenseRequests",
    name: "LicenseRequests",
    component: () => import("../views/LicenseRequests.vue"),
  },
  {
    name: "Google-Form",
    path: "/google-form",
    component: {},
    meta: {
      RedirectExternalUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdHJh4WF9bBHgw7ewMHUzEr3a4dhvOjdF9aWu50PdQo_7no0Q/viewform",
    },
  },
  {
    path: "/approved",
    name: "Approved",
    component: () => import("../views/Approved.vue"),
  },
  {
    path: "/submitted",
    name: "Submitted",
    component: () => import("../views/Submitted.vue"),
  },
  {
    path: "/inReview",
    name: "InReview",
    component: () => import("../views/InReview.vue"),
  },
  {
    path: "/undersupervision",
    name: "UnderSupervision",
    component: () => import("../views/UnderSupervision.vue"),
  },
  {
    path: "/declined",
    name: "Declined",
    component: () => import("../views/Declined.vue"),
  },
  {
    path: "/withdrawn",
    name: "Withdraw",
    component: () => import("../views/Withdraw.vue"),
  },
  {
    path: "/pendingPayment",
    name: "PendingPayment",
    component: () => import("../views/PendingPayment.vue"),
  },
  {
    path: "/approvedPayment",
    name: "ApprovedPayment",
    component: () => import("../views/ApprovedPayment.vue"),
  },
  {
    path: "/declinedPayment",
    name: "DeclinedPayment",
    component: () => import("../views/DeclinedPayment.vue"),
  },
  {
    path: "/draft",
    name: "Draft",
    component: () => import("../views/Draft.vue"),
  },
  {
    path: "/newlicense",
    name: "NewLicense",
    component: () => import("../components/NewLicense/NewLicense.vue"),
  },

  {
    path: "/renewal",
    name: "Renewal",
    component: () => import("../components/Renewal/Renewal.vue"),
  },
  {
    path: "/verification",
    name: "Verification",
    component: () => import("../components/Verification/Verification.vue"),
  },
  {
    path: "/goodstanding",
    name: "GoodStanding",
    component: () => import("../components/GoodStanding/GoodStanding.vue"),
  },
  // {
  //   path: "/admin/review",
  //   name: "ReviewerHome",
  //   component: () => import("../components/Reviewer/Home.vue"),
  // },
  {
    path: "/admin/review",
    name: "ReviewerHome",
    component: () => import("../components/Reviewer/ReviewerMenu.vue"),
  },
  {
    path: "/admin/changePassword",
    name: "changeadminPassword",
    component: () =>
      import(
        "../components/Reviewer/Configurations/ChangePassword/ChangePassword.vue"
      ),
  },
  {
    path: "/admin/review/report",
    name: "report",
    component: () => import("../components/Report/Report.vue"),
  },
  {
    path: "/admin/review/dashboard",
    name: "dashboard",
    component: () => import("../components/Reviewer/Dashboard.vue"),
  },
  {
    path: "/myWork",
    name: "myWork",
    component: () => import("../components/Reviewer/MyWork.vue"),
  },
  {
    path: "/allWork",
    name: "allWork",
    component: () => import("../components/Reviewer/AllWork.vue"),
  },
  {
    path: "/admin/unfinished",
    name: "unfinished",
    component: () => import("../components/Reviewer/Unfinished.vue"),
  },
  {
    path: "/admin/unfinishedAll",
    name: "allUnfinished",
    component: () => import("../components/Reviewer/AllUnfinished.vue"),
  },
  {
    path: "/admin/unconfirmed",
    name: "unconfirmed",
    component: () => import("../components/Reviewer/Unconfirmed.vue"),
  },
  {
    path: "/admin/onreview",
    name: "onreview",
    component: () => import("../components/Reviewer/OnReview.vue"),
  },
  {
    path: "/admin/evaluateReview",
    name: "evaluateReview",
    component: () => import("../components/Reviewer/EvaluateReview.vue"),
  },
  {
    path: "/admin/assignedToYou",
    name: "assignedToYou",
    component: () => import("../components/Reviewer/AssignedToYou.vue"),
  },
  {
    path: "/admin/assignedToAll",
    name: "assignedToAll",
    component: () => import("../components/Reviewer/AllAssigned.vue"),
  },
  {
    path: "/admin/unassigned",
    name: "unassigned",
    component: () => import("../components/Reviewer/Unassigned.vue"),
  },
  {
    path: "/admin/allCertifiedUsers",
    name: "allCertifiedUsers",
    component: () => import("../components/Reviewer/AllCertifiedUsers.vue"),
  },
  {
    path: "/admin/allRegionCertifiedUsers",
    name: "allRegionCertifiedUsers",
    component: () =>
      import("../components/Reviewer/AllRegionCertifiedUsers.vue"),
  },
  {
    path: "/admin/certifiedUsers",
    name: "certifiedusers",
    component: () => import("../components/Reviewer/CertifiedUsers.vue"),
  },
  {
    path:
      "/admin/certifiedUsersDetail/:applicationType/:applicationId/:applicantId",
    name: "certifiedUsersDetail",
    component: () =>
      import("../components/Reviewer/Detail/CertifiedUsersDetail.vue"),
  },
  {
    path: "/scanned-certified-user/:applicationType/:userId/:applicationId",
    name: "scannedCertifiedUser",
    component: () =>
      import("../components/Reviewer/Detail/ScannedCertifiedUsers.vue"),
  },
  {
    path: "/qrcode-image",
    name: "qrcodeImage",
    component: () => import("../components/Reviewer/Detail/QrCodeImage.vue"),
  },
  {
    path: "/admin/pendingPayments",
    name: "pendingPayments",
    component: () => import("../components/Reviewer/PendingPayments.vue"),
  },
  {
    path: "/admin/allPendingPayments",
    name: "allPendingPayments",
    component: () => import("../components/Reviewer/AllPendingPayments.vue"),
  },
  {
    path: "/admin/pendingDetail/:applicationType/:applicationId/:applicantId",
    name: "pendingDetail",
    component: () => import("../components/Reviewer/Detail/PendingDetail.vue"),
  },
  {
    path: "/admin/evaluate/:applicationType/:applicationId",
    name: "evaluate",
    component: () => import("../components/Reviewer/Evaluate.vue"),
  },
  {
    path: "/admin/evaluatePayment/:applicationType/:applicationId",
    name: "evaluatePayment",
    component: () => import("../components/Reviewer/EvaluatePayment.vue"),
  },
  {
    path: "/admin/detail/:applicationType/:applicationId/:applicantId",
    name: "detail",
    component: () => import("../components/Reviewer/Detail/LicenseDetail.vue"),
  },
  {
    path:
      "/admin/unfinishedDetail/:applicationType/:applicationId/:applicantId",
    name: "unfinishedDetail",
    component: () =>
      import("../components/Reviewer/Detail/UnfinishedDetail.vue"),
  },
  {
    path: "/admin/finishedDetail/:applicationType/:applicationId/:status",
    name: "recentlyFinishedDetail",
    component: () =>
      import("../components/Reviewer/Detail/RecentlyFinishedDetail.vue"),
  },
  {
    path: "/admin/confirmReview/:applicationType/:applicantId",
    name: "confirmReview",
    component: () => import("../components/Reviewer/ConfirmAdminReview.vue"),
  },
  {
    path: "/admin/confirmReviewDetail/:applicationType/:applicationId/:status",
    name: "confirmReviewDetail",
    component: () =>
      import("../components/Reviewer/Detail/ConfirmReviewDetail.vue"),
  },
  {
    path:
      "/admin/evaluateApplicationDetail/:applicationType/:applicationId/:status",
    name: "evaluateApplicationDetail",
    component: () =>
      import("../components/Reviewer/Detail/EvaluateApplicationDetail.vue"),
  },

  {
    path:
      "/admin/unassignedDetail/:applicationType/:applicationId/:applicantId",
    name: "unassignedDetail",
    component: () =>
      import("../components/Reviewer/Detail/UnassignedDetail.vue"),
  },
  {
    path:
      "/admin/returnedToMeDetail/:applicationType/:applicationId/:applicantId",
    name: "returnedToMeDetail",
    component: () =>
      import("../components/Reviewer/Detail/ReturnedToMeDetail.vue"),
  },
  {
    path:
      "/admin/pending-payment-evaluation/:applicationType/:applicationId/:applicantId",
    name: "PendingPaymentEvaluation",
    component: () =>
      import("../components/Reviewer/Detail/PendingPaymentEvalaution.vue"),
  },
  {
    path: "/admin/reviewReturnedApplication/:applicationType/:applicationId",
    name: "reviewReturnedApplication",
    component: () =>
      import("../components/Reviewer/ReviewReturnedApplication.vue"),
  },
  {
    path: "/admin/confirmAssignedApplication/:applicationType/:applicationId",
    name: "confirmAssignedApplication",
    component: () =>
      import("../components/Reviewer/ConfirmAssignedApplication.vue"),
  },
  {
    path:
      "/admin/unconfirmedDetail/:applicationType/:applicationId/:applicantId",
    name: "unconfirmedDetail",
    component: () =>
      import("../components/Reviewer/Detail/UnconfirmedDetail.vue"),
  },
  {
    path:
      "/admin/othersUnconfirmedDetail/:applicationType/:applicationId/:applicantId",
    name: "othersUnconfirmedDetail",
    component: () =>
      import("../components/Reviewer/Detail/OthersUnconfirmedDetail.vue"),
  },
  {
    path:
      "/admin/returnedToOthersDetail/:applicationType/:applicationId/:applicantId",
    name: "returnedToOthersDetail",
    component: () =>
      import("../components/Reviewer/Detail/ReturnedToOthersDetail.vue"),
  },
  {
    path:
      "/admin/applicant-detail/:applicationType/:applicationId/:applicantId",
    name: "applicantDetail",
    component: () =>
      import("../components/Reviewer/Detail/ApplicantDetail.vue"),
  },
  {
    path:
      "/admin/on-review-detail/:applicationType/:applicationId/:applicantId",
    name: "onReviewDetail",
    component: () => import("../components/Reviewer/Detail/OnReviewDetail.vue"),
  },
  {
    path:
      "/admin/returned-application-detail/:applicationType/:applicationId/:applicantId",
    name: "returnedApplicationDetail",
    component: () =>
      import("../components/Reviewer/Detail/ReturnedApplicationDetail.vue"),
  },
  {
    path:
      "/admin/others-re-evaluate-detail/:applicationType/:applicationId/:applicantId",
    name: "othersReEvaluateDetail",
    component: () =>
      import("../components/Reviewer/Detail/OthersReEvaluateDetail.vue"),
  },
  {
    path:
      "/admin/newlicense-document/:newLicenseApplicationId/:newLicenseApplicantId/:renewalApplicationId/:renewalApplicantId",
    name: "newlicenseDocuments",
    component: () =>
      import("../components/Reviewer/Detail/NewLicenseDocumentsForRenewal.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../components/Landing/AdminLanding.vue"),
  },
  {
    path: "/admin/create",
    name: "CreateAdmin",
    component: () => import("../components/Reviewer/CreateAdmin.vue"),
  },
  {
    path: "/admin/newLicense/unassigned",
    name: "NewLicenseUnassigned",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/newLicenseUnassigned.vue"
      ),
  },
  {
    path: "/admin/newlicense/unfinished",
    name: "NewLicenseUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseUnfinished.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-unfinished",
    name: "NewLicenseOthersUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersUnfinished.vue"
      ),
  },
  {
    path: "/admin/newlicense/assigned-to-me",
    name: "NewLicenseAssignedToMe",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseAssigned.vue"
      ),
  },
  {
    path: "/admin/newlicense/assigned-to-others",
    name: "NewLicenseAssignedToOthers",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseAssignedToOthers.vue"
      ),
  },
  {
    path: "/admin/newlicense/finished",
    name: "NewLicenseFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseUnConfirmed.vue"
      ),
  },
  {
    path: "/admin/newlicense/all-finished",
    name: "NewLicenseAllFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseAllUnConfirmed.vue"
      ),
  },
  {
    path: "/admin/newlicense/declined",
    name: "NewLicenseDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseDeclined.vue"
      ),
  },
  {
    path: "/admin/newlicense/all-declined",
    name: "NewLicenseAllDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseAllDeclined.vue"
      ),
  },
  {
    path: "/admin/newlicense/under-super-vision",
    name: "NewLicenseUnderSuperVision",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseUnderSuperVision.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-under-super-vision",
    name: "NewLicenseOthersUnderSuperVision",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersUnderSuperVision.vue"
      ),
  },
  {
    path: "/admin/newlicense/approved-payment",
    name: "NewLicenseApprovedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseApprovedPayment.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-approved-payment",
    name: "NewLicenseOthersApprovedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersApprovedPayment.vue"
      ),
  },
  {
    path: "/admin/newlicense/declined-payment",
    name: "NewLicenseDeclinedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseDeclinedPayment.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-declined-payment",
    name: "NewLicenseOthersDeclinedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersDeclinedPayment.vue"
      ),
  },
  {
    path: "/admin/newlicense/on-review",
    name: "NewLicenesOnReview",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOnReview.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-on-review",
    name: "NewLicenesOthersOnReview",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersOnReview.vue"
      ),
  },
  {
    path: "/admin/newlicense/re-evaluate",
    name: "NewLicenseReEvaluate",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseReEvaluate.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-re-evaluate",
    name: "NewLicenseOthersReEvaluate",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersReEvaluate.vue"
      ),
  },
  {
    path: "/admin/newlicense/confirmed",
    name: "NewLicenseReConfirmed",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseConfirmed.vue"
      ),
  },
  {
    path: "/admin/newlicense/others-confirmed",
    name: "NewLicenseOthersReConfirmed",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/NewLicense/NewLicenseOthersConfirmed.vue"
      ),
  },

  {
    path: "/admin/verification/unassigned",
    name: "VerificationUnassigned",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationUnassigned.vue"
      ),
  },
  {
    path: "/admin/verification/unfinished",
    name: "VerificationUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationUnfinished.vue"
      ),
  },
  {
    path: "/admin/verification/others-unfinished",
    name: "VerificationOthersUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationOthersUnfinished.vue"
      ),
  },
  {
    path: "/admin/verification/assigned-to-me",
    name: "VerificationAssignedToMe",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationAssigned.vue"
      ),
  },
  {
    path: "/admin/verification/assigned-to-others",
    name: "VerificationAssignedToOthers",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationAssignedToOthers.vue"
      ),
  },
  {
    path: "/admin/verification/finished",
    name: "VerificationFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/verification/all-finished",
    name: "VerificationAllFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationAllUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/verification/declined",
    name: "VerificationDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationDeclined.vue"
      ),
  },
  {
    path: "/admin/verification/all-declined",
    name: "VerificationAllDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Verification/VerificationAllDeclined.vue"
      ),
  },
  {
    path: "/admin/renewal/unassigned",
    name: "RenewalUnassigned",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalUnassigned.vue"
      ),
  },
  {
    path: "/admin/renewal/unfinished",
    name: "RenewalUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalUnfinished.vue"
      ),
  },
  {
    path: "/admin/renewal/others-unfinished",
    name: "RenewalOthersUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersUnfinished.vue"
      ),
  },
  {
    path: "/admin/renewal/assigned-to-me",
    name: "RenewalAssignedToMe",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalAssigned.vue"
      ),
  },
  {
    path: "/admin/renewal/assigned-to-others",
    name: "RenewalAssignedToOthers",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalAssignedToOthers.vue"
      ),
  },
  {
    path: "/admin/renewal/finished",
    name: "RenewalFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/renewal/all-finished",
    name: "RenwalAllFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalAllUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/renewal/declined",
    name: "RenewalDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalDeclined.vue"
      ),
  },
  {
    path: "/admin/renewal/all-declined",
    name: "RenewalAllDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalAllDeclined.vue"
      ),
  },
  {
    path: "/admin/renewal/under-super-vision",
    name: "RenewalUnderSuperVision",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalUnderSuperVision.vue"
      ),
  },
  {
    path: "/admin/renewal/others-under-super-vision",
    name: "RenewalOthersUnderSuperVision",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersUnderSuperVision.vue"
      ),
  },
  {
    path: "/admin/renewal/approved-payment",
    name: "RenewalApprovedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalApprovedPayment.vue"
      ),
  },
  {
    path: "/admin/renewal/others-approved-payment",
    name: "RenewalOthersApprovedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersApprovedPayment.vue"
      ),
  },
  {
    path: "/admin/renewal/declined-payment",
    name: "RenewalDeclinedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalDeclinedPayment.vue"
      ),
  },
  {
    path: "/admin/renewal/others-declined-payment",
    name: "RenewalOthersDeclinedPayment",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersDeclinedPayment.vue"
      ),
  },
  {
    path: "/admin/renewal/on-review",
    name: "RenewalOnReview",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOnReview.vue"
      ),
  },
  {
    path: "/admin/renewal/others-on-review",
    name: "RenewalOthersOnReview",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersOnReview.vue"
      ),
  },
  {
    path: "/admin/renewal/re-evaluate",
    name: "RenewalReEvaluate",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalReEvaluate.vue"
      ),
  },
  {
    path: "/admin/renewal/others-re-evaluate",
    name: "RenewalOthersReEvaluate",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersReEvaluate.vue"
      ),
  },
  {
    path: "/admin/renewal/confirmed",
    name: "RenewalConfirmed",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalConfirmed.vue"
      ),
  },
  {
    path: "/admin/renewal/others-confirmed",
    name: "RenewalOthersConfirmed",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/Renewal/RenewalOthersConfirmed.vue"
      ),
  },

  {
    path: "/admin/goodstanding/unassigned",
    name: "GoodStandingUnassigned",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingUnassigned.vue"
      ),
  },
  {
    path: "/admin/goodstanding/unfinished",
    name: "GoodStandingUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingUnfinished.vue"
      ),
  },
  {
    path: "/admin/goodstanding/others-unfinished",
    name: "GoodStandingOthersUnfinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingOthersUnfinished.vue"
      ),
  },
  {
    path: "/admin/goodstanding/assigned-to-me",
    name: "GoodStandingAssignedToMe",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingAssigned.vue"
      ),
  },
  {
    path: "/admin/goodstanding/assigned-to-others",
    name: "GoodStandingAssignedToOthers",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingAssignedToOthers.vue"
      ),
  },
  {
    path: "/admin/goodstanding/finished",
    name: "GoodStandingFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/goodstanding/all-finished",
    name: "GoodStandingAllFinished",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingAllUnconfirmed.vue"
      ),
  },
  {
    path: "/admin/goodstanding/declined",
    name: "GoodStandingDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingDeclined.vue"
      ),
  },
  {
    path: "/admin/goodstanding/all-declined",
    name: "GoodStandingAllDeclined",
    component: () =>
      import(
        "../components/Reviewer/ApplicationTypes/GoodStanding/GoodStandingAllDeclined.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const auth = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.RedirectExternalUrl)) {
    const url = to.meta.RedirectExternalUrl;
    window.open(url, "_blank");
    return;
  }
  if (to.path.includes("/resetpassword")) {
    next();
  } else if (
    !auth &&
    to.path !== "/landing" &&
    to.path !== "/" &&
    to.path !== "/admin" &&
    to.name !== "scannedCertifiedUser"
  )
    next("/landing");
  else next();
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
