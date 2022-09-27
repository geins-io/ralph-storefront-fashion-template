<template>
  <div class="ca-brand-and-name">
    <div v-if="brand !== ''" class="ca-brand-and-name__brand">
      <NuxtLink
        v-if="brandAlias !== ''"
        class="ca-brand-and-name__brand-link"
        :to="brandAlias"
      >
        {{ brand }}
      </NuxtLink>
      <span v-else>
        {{ brand }}
      </span>
    </div>
    <component :is="nameTag" class="ca-brand-and-name__name">
      {{ name }}
    </component>
  </div>
</template>
<script>
export default {
  name: 'CaBrandAndName',
  mixins: [],
  props: {
    brand: {
      type: String,
      default: ''
    },
    brandAlias: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    nameTag: {
      type: String,
      default: 'h2'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-brand-and-name {
  font-size: rem-calc(11);
  position: relative;
  margin: 0 3% 0 0;
  &__brand {
    text-transform: uppercase;
    position: absolute;
    top: -1.7em;
  }
  &__name {
    font-size: 1.5em;
  }
  .ca-product-page__main & {
    &__brand {
      font-size: rem-calc(12);
      @include bp(tablet) {
        font-size: rem-calc(14);
      }
    }
    &__name {
      font-size: rem-calc(24);
      @include bp(tablet) {
        font-size: rem-calc(32);
      }
    }
  }
}
</style>
