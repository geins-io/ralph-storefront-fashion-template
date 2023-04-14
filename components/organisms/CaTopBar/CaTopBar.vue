<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container" design="none" :class="modifiers">
      <CaTopBarNavigation
        v-show="!undistracted"
        class="only-computer ca-top-bar__nav"
        menu-location-id="top-bar"
      />
      <div class="ca-top-bar__usp">{{ $t('USP_TEXT') }}</div>
      <CaMarketSelectorButton v-show="!undistracted" class="only-computer" />
    </CaContainer>
  </div>
</template>
<script>
/*
  A top bar component that is used on all pages.

  props:
    undistracted: Boolean
      If true, this is used by rthe undistrected layout and some elements might want to be hidden
*/
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-top-bar__container--scrolled': !this.$store.getters.siteIsAtTop,
        'ca-top-bar__container--header-dark':
          this.$config?.currentThemeSettings['header-theme'] === 'dark'
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-top-bar';
</style>
