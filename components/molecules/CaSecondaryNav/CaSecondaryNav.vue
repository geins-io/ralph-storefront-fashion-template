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
            frame: 'login',
          })
        "
      >
        {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
      </button>
      <NuxtLink
        v-else
        class="ca-secondary-nav__link"
        :to="$getPath('account-orders')"
      >
        {{ $t('ACCOUNT_TITLE') }}
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <NuxtLink class="ca-secondary-nav__link" :to="$getPath('favorites')">
        {{ $t('FAVORITES_LABEL') }} ({{ $store.state.favorites.length }})
      </NuxtLink>
    </CaSecondaryNavItem>
  </ul>
</template>
<script>
/*
  CaSecondaryNav is a reusable component that displays the links in the bottom of the mobile menu
*/
export default {
  name: 'CaSecondaryNav',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-secondary-nav';
</style>
