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
          @clicked="
            $store.commit('contentpanel/open', {
              name: 'menu-panel'
            })
          "
        />
        <CaIconButton
          class="ca-header__search-toggle only-mobile"
          icon-name="search"
          aria-label="Show search"
          @clicked="() => (searchOpened = !searchOpened)"
        />
        <NuxtLink to="/">
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
          @clicked="
            $store.commit('contentpanel/open', {
              name: 'account',
              frame: 'login'
            })
          "
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
    searchOpened: false
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
.ca-header {
  --header-bg: #{$c-lightest-gray};
  --header-text: #{$c-text-primary};

  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: $z-index-header;
  transform: translateY(0);
  transition: transform 450ms ease, background-color 200ms ease 450ms,
    mix-blend-mode 200ms ease 450ms;

  &__bar {
    background: var(--header-bg, #{$c-header-bg});
    color: var(--header-text, #{$c-text-primary});
    z-index: $z-index-header;
    position: relative;
    body[style='overflow: hidden;'] & {
      padding-right: var(--scrollbar-width);
    }
  }
  &__container {
    height: $header-bar-height;
    @include flex-valign;
    justify-content: space-between;

    @include bp(laptop) {
      height: $header-bar-height-computer;
    }
  }

  &__nav-toggle {
    @include flex-valign;
    font-size: rem-calc(24);
    color: var(--header-text, #{$c-text-primary});
    margin: 0 $px20 0 0;
  }

  &__search-toggle {
    margin-right: auto;
    font-size: rem-calc(24);
    color: var(--header-text, #{$c-text-primary});
    @include flex-valign;
  }

  &__logo {
    width: rem-calc(120px);
  }

  &__main-nav {
    margin: 0 0 0 2%;
    @include bp(desktop) {
      margin: 0 0 0 rem-calc(60);
    }
  }

  &__search {
    margin: 0 auto;
  }

  &__user-button {
    font-size: rem-calc(24);
    line-height: 1;
    margin: 0 rem-calc(20) 0 auto;
    color: var(--header-text, #{$c-text-primary});
    @include bp(laptop) {
      margin: 0 rem-calc(40) 0 rem-calc(10);
    }
  }

  &__favorites.ca-favorites {
    @include bp(laptop) {
      margin: 0 0 0 auto;
    }
  }

  &__nav-and-search {
    display: flex;
    align-items: center;
  }
  &--is-hidden {
    transform: translateY(-100%);
    @include bp(tablet-down) {
      .ca-search--visible {
        transform: translateY(-100%);
      }
    }
  }
  &--scrolled & {
    &__bar {
      box-shadow: $box-shadow;
    }
  }

  &--dark {
    --header-bg: #{$c-darkest-gray};
    --header-text: #{$c-text-inverse};
  }

  .ca-notification-badge {
    border: 1px solid var(--header-bg, #{$c-header-bg});
  }
}
</style>
