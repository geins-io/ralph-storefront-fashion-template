<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container" design="none" :class="modifiers">
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
<style lang="scss" scoped>
.ca-top-bar {
  $block: &;
  background: var(--top-bar-background, $c-topbar-bg);
  color: var(--top-bar-color, $c-text-inverse);
  font-size: $font-size-xs;
  z-index: $z-index-header;
  position: relative;
  body[style='overflow: hidden;'] &:not(.ca-top-bar--undistracted) {
    padding-right: var(--scrollbar-width);
  }
  &__container {
    height: $top-bar-height;
    line-height: $top-bar-height;
    @include flex-halign;
    transition: height 200ms ease;
    @include bp(laptop) {
      height: $top-bar-height-computer;
      line-height: $top-bar-height-computer;
    }
    &--scrolled {
      height: 5px;
      @include bp(laptop) {
        height: 6px;
      }
      &#{$block}__container--header-dark {
        height: 0;
      }

      #{$block}__usp {
        font-size: 0;
      }
    }
  }
  &__nav {
    margin: 0 auto 0 0;
    transition: font-size 200ms ease;
  }
  &__flag {
    margin-right: $px4;
    font-size: 15px;
  }
  &__usp {
    transition: font-size 200ms ease;

    @include calign;
  }
  &__lang-switcher {
    margin: 0 $px20 0 auto;
  }
  &__customer-type-toggle {
    margin: 0 0 0 $px20;
  }
}
</style>
