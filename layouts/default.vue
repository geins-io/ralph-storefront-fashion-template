<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader :theme="themes.header" />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <div>
      <LazyHydrate when-visible>
        <CaFooter :theme="themes.footer" />
      </LazyHydrate>
      <client-only>
        <transition name="fade">
          <div v-if="globalLoading" class="ca-layout-default__loading">
            <CaSpinner class="ca-layout-default__spinner" />
          </div>
        </transition>
      </client-only>
      <CaCookieConsent />
      <LazyCaDisplayCart />
      <LazyCaAccountPanel />
      <LazyCaMenuPanel menu-location-id="main-mobile" />
      <LazyCaSnackbar />
      <LazyCaModal />
      <LazyCaAddedToCart />
    </div>
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'CaDefaultLayout',
  components: {
    LazyHydrate
  },
  mixins: [MixGlobalInit],
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    },
    themes() {
      const themeSettings = this.$config.channelSettings.find(
        i => i.channelId === this.$store.state.channelId
      ).themeSettings;
      return {
        header: themeSettings['header-theme'],
        footer: themeSettings['footer-theme']
      };
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.ca-layout-default {
  $block: &;
  &__main {
    padding-top: $header-height;
    @include bp(laptop) {
      padding-top: $header-height-computer;
    }
  }
  &__loading {
    @include halign;
    position: fixed;
    top: $header-bar-height + $top-bar-height + $px12;
    z-index: $z-index-panel;
    background: $c-darkest-gray;
    padding: $px8;
    width: rem-calc(36px);
    height: rem-calc(36px);
    border-radius: 50%;
    @include bp(laptop) {
      top: $header-height-computer;
    }
  }
  &--loading {
    #{$block}__main {
      min-height: 100vh;
    }
  }
}
</style>
