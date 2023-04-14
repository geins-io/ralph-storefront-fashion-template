<template>
  <header class="ca-header" :class="modifiers">
    <CaGlobalMessage v-if="$store.state.ancientBrowser">
      {{ $t('ANCIENT_BROWSER_MESSAGE') }}
    </CaGlobalMessage>
    <CaTopBar />
    <div class="ca-header__bar">
      <CaContainer class="ca-header__container" design="none">
        <CaIconButton
          class="ca-header__nav-toggle only-mobile"
          icon-name="menu"
          aria-label="Show menu"
          @clicked="$store.commit('contentpanel/open', { name: 'menu-panel' })"
        />
        <CaIconButton
          class="ca-header__search-toggle only-mobile"
          icon-name="search"
          aria-label="Show search"
          @clicked="() => (searchOpened = !searchOpened)"
        />
        <NuxtLink :to="$getPath('index')">
          <CaLogo
            class="ca-header__logo"
            :theme="theme"
            :alt="$t('LOGO_ALT_TEXT')"
          />
        </NuxtLink>
        <CaHeaderNavigation
          class="ca-header__main-nav only-computer"
          menu-location-id="main-desktop"
        />
        <CaSearch class="ca-header__search only-computer" />

        <CaFavorites
          class="ca-header__favorites only-computer"
          :show-text="false"
        />
        <CaIconButton
          v-if="!$store.getters['auth/authenticated']"
          class="ca-header__user-button"
          icon-name="user"
          :aria-label="$t('ACCOUNT_TITLE')"
          @clicked="$store.commit('contentpanel/open', accountInfo)"
        />

        <CaIconButton
          v-else
          class="ca-header__user-button"
          icon-name="user"
          :aria-label="$t('ACCOUNT_TITLE')"
          :href="localePath('account-orders')"
        />

        <CaMiniCart class="ca-header__cart" />
      </CaContainer>
    </div>

    <CaSearch
      class="only-mobile"
      :opened="searchOpened"
      :visible-when-site-is-at-top="false"
    />
  </header>
</template>
<script>
/*
  Header component for the site.
*/
export default {
  name: 'CaHeader',
  mixins: [],
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  data: () => ({
    searchOpened: false,
    accountInfo: {
      name: 'account',
      frame: 'login'
    }
  }),
  computed: {
    modifiers() {
      return {
        'ca-header--scrolled': !this.$store.getters.siteIsAtTop,
        'ca-header--dark': this.theme === 'dark',
        'ca-header--is-hidden': this.$store.state.headerHidden
      };
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-header';
</style>
