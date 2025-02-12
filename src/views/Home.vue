<template>
  <div>
    <hero />
    <section-about />
    <section-callout />
    <section-services />
    <section-pricing />
  </div>
</template>

<script>
import Hero from "@/components/sections/Hero";
import SectionAbout from "@/components/sections/About";
import SectionServices from "@/components/sections/Services";
import SectionCallout from "@/components/sections/Callout";
import SectionPricing from "@/components/sections/Pricing";

export default {
  name: 'Home',
  components: {
    Hero,
    SectionAbout,
    SectionServices,
    SectionCallout,
    SectionPricing,
  },
}
</script>

<style lang="scss" scoped>

</style>