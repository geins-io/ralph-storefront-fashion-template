<template>
  <ul class="ca-secondary-nav">
    <CaSecondaryNavItem class="ca-secondary-nav__item">
      <button
        v-if="!$store.getters['auth/authenticated']"
        type="button"
        class="ca-secondary-nav__link"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login'
          })
        "
      >
        {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
      </button>
      <NuxtLink
        v-else
        class="ca-secondary-nav__link"
        :to="localePath('account-orders')"
      >
        {{ $t('ACCOUNT_TITLE') }}
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <NuxtLink class="ca-secondary-nav__link" :to="localePath('favorites')">
        {{ $t('FAVORITES_LABEL') }} ({{ $store.state.favorites.length }})
      </NuxtLink>
    </CaSecondaryNavItem>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaSecondaryNav',
  mixins: [],
  props: {},
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
<style lang="scss">
.ca-secondary-nav {
  &__link {
    color: $c-text-primary;
  }
}
</style>
