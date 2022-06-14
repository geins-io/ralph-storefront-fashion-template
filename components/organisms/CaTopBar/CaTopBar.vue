<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container">
      <CaTopBarNavigation
        v-show="!undistracted"
        class="only-computer ca-top-bar__nav"
        menu-location-id="top-bar"
      />
      <div class="ca-top-bar__usp">{{ $t('USP_TEXT') }}</div>
    </CaContainer>
  </div>
</template>
<script>
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
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-top-bar {
  background: $c-topbar-bg;
  font-size: $font-size-xs;
  z-index: $z-index-header;
  position: relative;
  color: $c-text-inverse;
  body[style='overflow: hidden;'] &:not(.ca-top-bar--undistracted) {
    padding-right: var(--scrollbar-width);
  }
  &__container {
    height: $top-bar-height;
    line-height: $top-bar-height;
    @include flex-halign;
    @include bp(laptop) {
      height: $top-bar-height-computer;
      line-height: $top-bar-height-computer;
    }
  }
  &__nav {
    margin: 0 auto 0 0;
  }
  &__flag {
    margin-right: $px4;
    font-size: 15px;
  }
  &__usps {
    @include bp(desktop) {
      @include calign;
    }
  }
  &__usp {
    margin: 0 auto 0 0;
  }
  &__lang-switcher {
    margin: 0 $px20 0 auto;
  }
  &__customer-type-toggle {
    margin: 0 0 0 $px20;
  }
}
</style>
