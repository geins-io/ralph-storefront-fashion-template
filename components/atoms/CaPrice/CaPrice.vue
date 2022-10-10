<template>
  <div class="ca-price" :class="modifiers">
    <template v-if="price.isDiscounted">
      <span class="ca-price__regular">
        {{ price.sellingPriceIncVatFormatted }}
      </span>
      <span class="ca-price__selling">
        {{ price.regularPriceIncVatFormatted }}
      </span>
    </template>

    <span v-else class="ca-price__regular">
      {{ price.regularPriceIncVatFormatted }}
    </span>

    <span v-if="!vatIncluded" class="ca-price__ex-vat">
      {{ $t('EX_VAT') }}
    </span>
  </div>
</template>
<script>
import MixPrice from 'MixPrice';
export default {
  name: 'CaPrice',
  mixins: [MixPrice]
};
</script>
<style lang="scss">
.ca-price {
  @include title;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &__regular {
    white-space: nowrap;
    font-size: 2rem;
  }
  &__selling {
    text-decoration: line-through;
    color: $c-text-secondary;
    margin-top: $px4;
    font-size: 0.9rem;
  }
  &__ex-vat {
    margin-left: $px4;
    color: $c-text-secondary;
  }
  &--sale & {
    &__regular {
      color: $c-sale;
    }
  }
}
</style>
