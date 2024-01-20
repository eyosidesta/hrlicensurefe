export let dropdown = {
  newLicense: false,
  newLicenseAssigned: false,
  newLicenseUnderReview: false,
  newLicenseUnfinished: false,
  newLicenseUnconfirmed: false,
  newLicenseOnReview: false,
  newLicenseReEvaluate: false,
  newLicenseDeclineConfirmed: false,
  newLicenseUnderSuperVision: false,
  newLicenseUnderSuperVisionConfirmed: false,
  newLicenseConfirmed: false,
  newLicenseEvaluation: false,
  newLicenseReturnedEvaluation: false,
  newLicenseUnderEvaluation: false,
  newLicenseUnassignedEvaluation: false,
  newLicenseInReviewPayment: false,
  newLicenseDeclinedPayment: false,
  newLicenseLicensed: false,
  newLicenseUnassigned: false,
  
  
  renewal: false,
  renewalAssigned: false,
  renewalUnfinished: false,
  renewalUnconfirmed: false,
  renewalOnReview: false,
  renewalReEvaluate: false,
  renewalDeclined: false,
  renewalUnderSuperViesion: false,
  renewalConfirmed: false,
  renewalDeclineConfirmed: false,
  renewalUnderSuperVisionConfirmed: false,
  renewalEvaluation: false,
  renewalReturnedEvaluation: false,
  renewalUnderEvaluation: false,
  renewalUnassignedEvaluation: false,
  renewalInReviewPayment: false,
  renewalDeclinedPayment: false,
  renewalLicensed: false,
  renewalUnassigned: false,

  verification: false,
  verificationAssigned: false,
  verificationUnfinished: false,
  verificationApproved: false,
  verificationDeclined: false,
  verificationUnassigned: false,

  goodStanding: false,
  goodStandingAssigned: false,
  goodStandingUnfinished: false,
  goodStandingApproved: false,
  goodStandingDeclined: false,
  goodStandingPaymentReview: false,
  goodStandingInReviewPayment: false,
  goodStandingDeclinedPayment: false,
  goodStandingLicensed: false,
  goodStandingUnassigned: false,

  allLicensed: false,
  
};

export const applicationTypeDD = (applicationDetail, dropdown) => {
  if (applicationDetail == "Renewal") {
    dropdown.renewal = !dropdown.renewal;
    dropdown.renewalUnderReview = false;
    dropdown.renewalLicensed = false;

    dropdown.newLicense = false;
    dropdown.verification = false;
    dropdown.goodStanding = false;
    dropdown.allLicensed = false;
    
  }
  if (applicationDetail == "NewLicense") {
    dropdown.newLicense = !dropdown.newLicense;
    dropdown.newLicenseUnderReview = false;
    dropdown.newLicenseLicensed = false;

    dropdown.goodStanding = false;
    dropdown.renewal = false;
    dropdown.verification = false;
    dropdown.allLicensed = false;
  }
  if (applicationDetail == "GoodStanding") {
    dropdown.goodStanding = !dropdown.goodStanding;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingDeclined = false;

    dropdown.newLicense = false;
    dropdown.renewal = false;
    dropdown.verification = false;
    dropdown.allLicensed = false;

  }
  if (applicationDetail == "Verification") {
    dropdown.verification = !dropdown.verification;
    dropdown.verificationAssigned = false;
    dropdown.verificationUnfinished = false;
    dropdown.verificationApproved = false;
    dropdown.verificationDeclined = false;

    dropdown.goodStanding = false;
    dropdown.newLicense = false;
    dropdown.renewal = false;
  }
  if (applicationDetail == "RenewalAssigned") {
    dropdown.renewalAssigned = !dropdown.renewalAssigned;
    dropdown.renewalUnfinished = false;
    dropdown.renewalEvaluation = false;
    dropdown.renewalPaymentReview = false;
    dropdown.renewalConfirmedEvaluation = false;
  }
  if (applicationDetail == "RenewalUnfinished") {
    dropdown.renewalUnfinished = !dropdown.renewalUnfinished;
    dropdown.renewalAssigned = false;
    dropdown.renewalEvaluation = false;
    dropdown.renewalPaymentReview = false;
    dropdown.renewalConfirmedEvaluation = false;
  }
  if (applicationDetail == "RenewalDeclined") {
    dropdown.renewalDeclined = !dropdown.renewalDeclined;
    dropdown.renewalUnderSuperVision = false;
    dropdown.renewalConfirmed = false;
  }
  if (applicationDetail == "RenewalUnderSuperVision") {
    dropdown.renewalUnderSuperVision = !dropdown.renewalUnderSuperVision;
    dropdown.renewalDeclined = false;
    dropdown.renewalConfirmed = false;
  }
  if (applicationDetail == "RenewalConfirmed") {
    dropdown.renewalConfirmed = !dropdown.renewalConfirmed;
    dropdown.renewalDeclined = false;
    dropdown.renewalUnderSuperVision = false;
  }
  if (applicationDetail == "RenewalDeclineConfirmed") {
    dropdown.renewalDeclineConfirmed = !dropdown.renewalDeclineConfirmed;
    dropdown.renewalConfirmed = false;
    dropdown.renewalUnderSuperVisionConfirmed = false;
  }
  if (applicationDetail == "RenewalUnderSuperVisionConfirmed") {
    dropdown.renewalUnderSuperVisionConfirmed = !dropdown.renewalUnderSuperVisionConfirmed;
    dropdown.renewalConfirmed = false;
    dropdown.renewalDeclineConfirmed = false;
  }
  if (applicationDetail == "RenewalUnassignedEvaluation") {
    dropdown.renewalUnassignedEvaluation = !dropdown.renewalUnassignedEvaluation;
    dropdown.renewalUnderEvaluation = false;
    dropdown.renewalEvaluationAssessment = false;
    dropdown.renewalReturnedEvaluation = false;
  }
  if (applicationDetail == "RenewalUnderEvaluation") {
    dropdown.renewalUnderEvaluation = !dropdown.renewalUnderEvaluation;
    dropdown.renewalUnassignedEvaluation = false;
    dropdown.renewalEvaluationAssessment = false;
    dropdown.renewalReturnedEvaluation = false;
  }
  if (applicationDetail == "RenewalEvaluationAssessment") {
    dropdown.renewalEvaluationAssessment = !dropdown.renewalEvaluationAssessment;
    dropdown.renewalUnderEvaluation = false;
    dropdown.renewalUnassignedEvaluation = false;
    dropdown.renewalReturnedEvaluation = false;
  }
  if (applicationDetail == "RenewalReturnedEvaluation") {
    dropdown.renewalReturnedEvaluation = !dropdown.renewalReturnedEvaluation;
    dropdown.renewalUnderEvaluation = false;
    dropdown.renewalEvaluationAssessment = false;
    dropdown.renewalUnassignedEvaluation = false;
  }
  if (applicationDetail == "RenewalEvaluation") {
    dropdown.renewalEvaluation = !dropdown.renewalEvaluation;
    dropdown.renewalPaymentReview = false;
    dropdown.renewalAssigned = false;
    dropdown.renewalUnfinished = false;
    dropdown.renewalConfirmedEvaluation = false;
    dropdown.renewalEvaluationAssessment = false;
    dropdown.renewalUnderEvaluation = false;
    dropdown.renewalUnassignedEvaluation = false;
    dropdown.renewalReturnedEvaluation = false;
  }
  if (applicationDetail == "RenewalConfirmedEvaluation") {
    dropdown.renewalConfirmedEvaluation = !dropdown.renewalConfirmedEvaluation;
    dropdown.renewalAssigned = false;
    dropdown.renewalUnfinished = false;
    dropdown.renewalEvaluation = false;
    dropdown.renewalConfirmed = false;
    dropdown.renewalDeclined = false;
    dropdown.renewalUnderSuperVision = false;
  }
  if (applicationDetail == "RenewalPaymentReview") {
    dropdown.renewalPaymentReview = !dropdown.renewalPaymentReview;
    dropdown.renewalAssigned = false;
    dropdown.renewalUnfinished = false;
    dropdown.renewalEvaluation = false;
    dropdown.renewalConfirmedEvaluation = false;
    dropdown.renewalInReviewPayment = false;
    dropdown.renewalDeclinedPayment = false;
  }
  if (applicationDetail == "RenewalInReviewPayment") {
    dropdown.renewalInReviewPayment = !dropdown.renewalInReviewPayment;
    dropdown.renewalDeclinedPayment = false;
  }
  if (applicationDetail == "RenewalDeclinedPayment") {
    dropdown.renewalDeclinedPayment = !dropdown.renewalDeclinedPayment;
    dropdown.renewalInReviewPayment = false;
  }
  if (applicationDetail == "RenewalLicensed") {
    dropdown.renewalLicensed = !dropdown.renewalLicensed;
    dropdown.renewalUnderReview = false;
    dropdown.renewalUnassigned = false;
  }

  if (applicationDetail == "RenewalUnderReview") {
    dropdown.renewalUnderReview = !dropdown.renewalUnderReview;
    dropdown.renewalLicensed = false;
    dropdown.renewalAssigned = false;
    dropdown.renewalUnfinished = false;
    dropdown.renewalEvaluation = false;
    dropdown.renewalPaymentReview = false;
    dropdown.renewalConfirmedEvaluation = false;
    dropdown.renewalUnassigned = false;
  }

  if (applicationDetail == "RenewalUnassigned") {
    dropdown.renewalUnassigned = !dropdown.renewalUnassigned;
    dropdown.renewalUnderReview = false;
    dropdown.renewalLicensed = false;
  }

  if (applicationDetail == "NewLicenseAssigned") {
    dropdown.newLicenseAssigned = !dropdown.newLicenseAssigned;
    dropdown.newLicenseUnfinished = false;
    dropdown.newLicenseEvaluation = false;
    dropdown.newLicensePaymentReview = false;
    dropdown.newLicenseConfirmedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseUnfinished") {
    dropdown.newLicenseUnfinished = !dropdown.newLicenseUnfinished;
    dropdown.newLicenseAssigned = false;
    dropdown.newLicenseEvaluation = false;
    dropdown.newLicensePaymentReview = false;
    dropdown.newLicenseConfirmedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseDeclineConfirmed") {
    dropdown.newLicenseDeclineConfirmed = !dropdown.newLicenseDeclineConfirmed;
    dropdown.newLicenseUnderSuperVisionConfirmed = false;
    dropdown.newLicenseConfirmed = false;
  }
  if (applicationDetail == "NewLicenseDeclined") {
    dropdown.newLicenseDeclined = !dropdown.newLicenseDeclined;
    dropdown.newLicenseUnderSuperVision = false;
    dropdown.newLicenseConfirmed = false;
  }
  if (applicationDetail == "NewLicenseUnderSuperVisionConfirmed") {
    dropdown.newLicenseUnderSuperVisionConfirmed = !dropdown.newLicenseUnderSuperVisionConfirmed;
    dropdown.newLicenseDeclineConfirmed = false;
    dropdown.newLicenseConfirmed = false;
  }
  if (applicationDetail == "NewLicenseUnderSuperVision") {
    dropdown.newLicenseUnderSuperVision = !dropdown.newLicenseUnderSuperVision;
    dropdown.newLicenseDeclined = false;
    dropdown.newLicenseConfirmed = false;
  }
  if (applicationDetail == "NewLicenseConfirmed") {
    dropdown.newLicenseConfirmed = !dropdown.newLicenseConfirmed;
    dropdown.newLicenseDeclineConfirmed = false;
    dropdown.newLicenseUnderSuperVision = false;
  }
  if (applicationDetail == "NewLicenseUnassignedEvaluation") {
    dropdown.newLicenseUnassignedEvaluation = !dropdown.newLicenseUnassignedEvaluation;
    dropdown.newLicenseUnderEvaluation = false;
    dropdown.newLicenseEvaluationAssessment = false;
    dropdown.newLicenseReturnedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseUnderEvaluation") {
    dropdown.newLicenseUnderEvaluation = !dropdown.newLicenseUnderEvaluation;
    dropdown.newLicenseUnassignedEvaluation = false;
    dropdown.newLicenseEvaluationAssessment = false;
    dropdown.newLicenseReturnedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseEvaluationAssessment") {
    dropdown.newLicenseEvaluationAssessment = !dropdown.newLicenseEvaluationAssessment;
    dropdown.newLicenseUnderEvaluation = false;
    dropdown.newLicenseUnassignedEvaluation = false;
    dropdown.newLicenseReturnedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseReturnedEvaluation") {
    dropdown.newLicenseReturnedEvaluation = !dropdown.newLicenseReturnedEvaluation;
    dropdown.newLicenseUnderEvaluation = false;
    dropdown.newLicenseEvaluationAssessment = false;
    dropdown.newLicenseUnassignedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseEvaluation") {
    dropdown.newLicenseEvaluation = !dropdown.newLicenseEvaluation;
    dropdown.newLicensePaymentReview = false;
    dropdown.newLicenseAssigned = false;
    dropdown.newLicenseUnfinished = false;
    dropdown.newLicenseConfirmedEvaluation = false;
    dropdown.newLicenseEvaluationAssessment = false;
    dropdown.newLicenseUnderEvaluation = false;
    dropdown.newLicenseUnassignedEvaluation = false;
    dropdown.newLicenseReturnedEvaluation = false;
  }
  if (applicationDetail == "NewLicenseConfirmedEvaluation") {
    dropdown.newLicenseConfirmedEvaluation = !dropdown.newLicenseConfirmedEvaluation;
    dropdown.newLicenseAssigned = false;
    dropdown.newLicenseUnfinished = false;
    dropdown.newLicenseEvaluation = false;
    dropdown.newLicenseConfirmed = false;
    dropdown.newLicenseDeclineConfirmed = false;
    dropdown.newLicenseUnderSuperVision = false;
  }
  if (applicationDetail == "NewLicensePaymentReview") {
    dropdown.newLicensePaymentReview = !dropdown.newLicensePaymentReview;
    dropdown.newLicenseAssigned = false;
    dropdown.newLicenseUnfinished = false;
    dropdown.newLicenseEvaluation = false;
    dropdown.newLicenseConfirmedEvaluation = false;
    dropdown.newLicenseInReviewPayment = false;
    dropdown.newLicenseDeclinedPayment = false;
  }
  if (applicationDetail == "NewLicenseInReviewPayment") {
    dropdown.newLicenseInReviewPayment = !dropdown.newLicenseInReviewPayment;
    dropdown.newLicenseDeclinedPayment = false;
  }
  if (applicationDetail == "NewLicenseDeclinedPayment") {
    dropdown.newLicenseDeclinedPayment = !dropdown.newLicenseDeclinedPayment;
    dropdown.newLicenseInReviewPayment = false;
  }
  if (applicationDetail == "NewLicenseUnderReview") {
    dropdown.newLicenseUnderReview = !dropdown.newLicenseUnderReview;
    dropdown.newLicenseLicensed = false;
    dropdown.newLicenseUnfinished = false;
    dropdown.newLicenseAssigned = false;
    dropdown.newLicenseEvaluation = false;
    dropdown.newLicensePaymentReview = false;
    dropdown.newLicenseConfirmedEvaluation = false;
    dropdown.newLicenseUnassigned = false;
  }
  if (applicationDetail == "NewLicenseUnassigned") {
    dropdown.newLicenseUnassigned = !dropdown.newLicenseUnassigned;
    dropdown.newLicenseUnderReview = false;
    dropdown.newLicenseLicensed = false;
  }
  if (applicationDetail == "NewLicenseLicensed") {
    dropdown.newLicenseLicensed = !dropdown.newLicenseLicensed;
    dropdown.newLicenseUnderReview = false;
    dropdown.newLicenseUnassigned = false;
  }

  if (applicationDetail == "VerificationUnassigned") {
    dropdown.verificationUnassigned = !dropdown.verificationUnassigned;
    dropdown.verificationAssigned = false;
    dropdown.verificationUnfinished = false;
    dropdown.verificationApproved = false;
    dropdown.verificationDeclined = false;
  }
  if (applicationDetail == "VerificationAssigned") {
    dropdown.verificationAssigned = !dropdown.verificationAssigned;
    dropdown.verificationUnfinished = false;
    dropdown.verificationApproved = false;
    dropdown.verificationDeclined = false;
    dropdown.verificationUnassigned = false;
  }
  if (applicationDetail == "VerificationUnfinished") {
    dropdown.verificationUnfinished = !dropdown.verificationUnfinished;
    dropdown.verificationAssigned = false;
    dropdown.verificationApproved = false;
    dropdown.verificationDeclined = false;
    dropdown.verificationUnassigned = false;
  }
  if (applicationDetail == "VerificationApproved") {
    dropdown.verificationApproved = !dropdown.verificationApproved;
    dropdown.verificationUnfinished = false;
    dropdown.verificationAssigned = false;
    dropdown.verificationDeclined = false;
    dropdown.verificationUnassigned = false;
  }
  if (applicationDetail == "VerificationDeclined") {
    dropdown.verificationDeclined = !dropdown.verificationDeclined;
    dropdown.verificationApproved = false;
    dropdown.verificationUnfinished = false;
    dropdown.verificationAssigned = false;
    dropdown.verificationUnassigned = false;
  }

  if (applicationDetail == "GoodStandingUnassigned") {
    dropdown.goodStandingUnassigned = !dropdown.goodStandingUnassigned;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingPaymentReview = false;
  }

  if (applicationDetail == "GoodStandingAssigned") {
    dropdown.goodStandingAssigned = !dropdown.goodStandingAssigned;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingPaymentReview = false;
    dropdown.goodStandingUnassigned = false;
  }
  if (applicationDetail == "GoodStandingUnfinished") {
    dropdown.goodStandingUnfinished = !dropdown.goodStandingUnfinished;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingPaymentReview = false;
    dropdown.goodStandingUnassigned = false;
  }
  if (applicationDetail == "GoodStandingApproved") {
    dropdown.goodStandingApproved = !dropdown.goodStandingApproved;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingPaymentReview = false;
    dropdown.goodStandingUnassigned = false;
  }
  if (applicationDetail == "GoodStandingDeclined") {
    dropdown.goodStandingDeclined = !dropdown.goodStandingDeclined;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingPaymentReview = false;
    dropdown.goodStandingUnassigned = false;
  }
  if (applicationDetail == "GoodStandingPaymentReview") {
    dropdown.goodStandingPaymentReview = !dropdown.goodStandingPaymentReview;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingLicensed = false;
    dropdown.goodStandingInReviewPayment = false;
    dropdown.goodStandingDeclinedPayment = false;
    dropdown.goodStandingUnassigned = false;
  }
  if (applicationDetail == "GoodStandingInReviewPayment") {
    dropdown.goodStandingInReviewPayment = !dropdown.goodStandingInReviewPayment;
    dropdown.goodStandingDeclinedPayment = false;
  }
  if (applicationDetail == "GoodStandingDeclinedPayment") {
    dropdown.goodStandingDeclinedPayment = !dropdown.goodStandingDeclinedPayment;
    dropdown.goodStandingInReviewPayment = false;
  }
  if (applicationDetail == "GoodStandingLicensed") {
    dropdown.goodStandingLicensed = !dropdown.goodStandingLicensed;
    dropdown.goodStandingDeclined = false;
    dropdown.goodStandingApproved = false;
    dropdown.goodStandingUnfinished = false;
    dropdown.goodStandingAssigned = false;
    dropdown.goodStandingPaymentReview = false;
    dropdown.goodStandingUnassigned = false;
  }

  if (applicationDetail == "AllLicensed") {
    dropdown.allLicensed = !dropdown.allLicensed;
    dropdown.newLicense = false;
    dropdown.verification = false;
    dropdown.goodStanding = false;
    dropdown.renewal = false;
  }
};
