<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="price.isDiscounted" class="ca-price__regular">
      {{ regularPrice }}
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
  &__selling {
    white-space: nowrap;
  }
  &__regular {
    text-decoration: line-through;
    color: $c-text-secondary;
    margin-top: $px4;
    font-size: 0.9em;
  }
  &__ex-vat {
    margin-left: $px4;
    color: $c-text-secondary;
  }
  &--sale & {
    &__selling {
      color: $c-sale;
    }
  }
}
</style>
