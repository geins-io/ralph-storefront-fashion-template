<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader :theme="themes.header" />
    <main class="ca-layout-default__main" :class="pageTypeClass">
      <Nuxt />
    </main>
    <CaFooter :theme="themes.footer" />
    <client-only>
      <transition name="fade">
        <div v-if="globalLoading" class="ca-layout-default__loading">
          <LazyCaSpinner class="ca-layout-default__spinner" />
        </div>
      </transition>
    </client-only>
    <LazyCaCookieConsent />
    <LazyCaDisplayCart />
    <LazyCaAccountPanel />
    <LazyCaMenuPanel menu-location-id="main-mobile" />
    <LazyCaMarketPanel
      v-if="$store.state.channel.markets.length > 1"
      mode="advanced"
    />
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
        'ca-layout-default--loading': this.$store.state.loading.loading,
      };
    },
    themes() {
      const themeSettings = this.$config.channelSettings.find(
        (i) => i.channelId === this.$store.state.channel.id,
      ).theme;
      return {
        header: themeSettings['header-theme'],
        footer: themeSettings['footer-theme'],
      };
    },
    pageTypeClass() {
      const routeName = this.$route?.name;
      const routeNameStripped = routeName
        ? routeName.split('-')[0].split('_')[0]
        : '';
      return 'ca-layout-default__main--' + routeNameStripped;
    },
    isPdp() {
      return this.$route?.name?.includes('pdp');
    },
  },
  // IMPORTANT NOTICE: If you decide to add a head() function here, you will overwrite default meta functionality that comes with MixGlobalInit from Ralph UI
};
</script>
<style lang="scss">
@import './styles/layouts/default-layout';
</style>
