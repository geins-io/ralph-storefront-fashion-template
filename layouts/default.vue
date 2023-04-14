<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader :theme="themes.header" />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <CaFooter :theme="themes.footer" />
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
    <LazyCaMarketPanel v-if="$store.state.channel.markets.length > 1" />
    <LazyCaSnackbar />
    <LazyCaModal />
    <LazyCaAddedToCart />
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';

export default {
  name: 'CaDefaultLayout',
  mixins: [MixGlobalInit],
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    },
    themes() {
      const themeSettings = this.$config.channelSettings.find(
        i => i.channelId === this.$store.state.channel.id
      ).themeSettings;
      return {
        header: themeSettings['header-theme'],
        footer: themeSettings['footer-theme']
      };
    }
  }
  // IMPORTANT NOTICE: If you decide to add a head() function here, you will overwrite default meta functionality that comes with MixGlobalInit from Ralph UI
};
</script>
<style lang="scss">
@import 'organisms/ca-layout-default';
</style>
