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
  The component for the top bar of the page, included in the header.

  props:
    undistracted: Boolean
      Set to true if used in the undistracted layout. If true, some elements might want to be hidden
*/
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-top-bar__container--scrolled': !this.$store.getters.siteIsAtTop,
        'ca-top-bar__container--header-dark':
          this.$config.currentChannelSettings.theme['header-theme'] === 'dark',
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-top-bar';
</style>
