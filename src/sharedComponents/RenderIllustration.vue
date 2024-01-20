<template>
  <div>
    <Address v-if="illustration === 'Address'" />
    <Certificate v-if="illustration === 'Certificate'" />
    <Contact v-if="illustration === 'Contact'" />
    <GoodStanding v-if="illustration === 'GoodStanding'" />
    <Id v-if="illustration === 'Id'" />
    <Institution v-if="illustration === 'Institution'" />
    <Logo v-if="illustration === 'Logo'" />
    <MOH v-if="illustration === 'MOH'" />
    <PersonalInfo v-if="illustration === 'PersonalInfo'" />
    <Renewal v-if="illustration === 'Renewal'" />
    <SimpleCertificate v-if="illustration === 'SimpleCertificate'" />
    <Success v-if="illustration === 'Success'" />
    <Error v-if="illustration === 'Error'" />
    <User v-if="illustration === 'User'" />
    <Verification v-if="illustration === 'Verification'" />
  </div>
</template>
<script>
import Address from "./illustrations/address";
import Certificate from "./illustrations/certificate";
import Contact from "./illustrations/contact";
import GoodStanding from "./illustrations/goodStanding";
import Id from "./illustrations/id";
import Institution from "./illustrations/institution";
import Logo from "./illustrations/logo";
import MOH from "./illustrations/MOH";
import PersonalInfo from "./illustrations/personalInfo";
import Renewal from "./illustrations/renewal";
import SimpleCertificate from "./illustrations/simpleCertificate";
import Success from "./illustrations/success";
import Error from "./illustrations/error";
import User from "./illustrations/user";
import Verification from "./illustrations/verification";
export default {
  components: {
    Address,
    Certificate,
    Contact,
    GoodStanding,
    Id,
    Institution,
    Logo,
    MOH,
    PersonalInfo,
    Renewal,
    SimpleCertificate,
    Success,
    User,
    Verification,
    Error
  },
  props: {
    illustration: {
      type: String,
      required: true
    }
  },
  setup() {}
};
</script>

<style lang="postcss" scoped>
svg {
  height: 64px;
}
</style>
