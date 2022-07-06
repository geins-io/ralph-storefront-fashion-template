<template>
  <component :is="baseTag" class="ca-product-card" @click="productClickHandler">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <NuxtLink
        class="ca-product-card__image-link"
        tabindex="-1"
        :to="product.canonicalUrl"
        :data-alias="product.alias"
      >
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-product-card__image"
          :class="{
            'ca-product-card__image--has-second': product.images.length > 1
          }"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.images[0]"
          :alt="product.brand.name + ' ' + product.name"
          sizes="(min-width: 1360px) 248px, (min-width: 1024px) 18.23vw, (min-width: 768px) 30.73vw, 48vw"
        />
        <CaImage
          v-else
          class="ca-product-card__image"
          :ratio="$config.productImageRatio"
          :src="require('~/assets/placeholders/product-image-square.png')"
          :alt="product.brand.name + ' ' + product.name"
        />
        <CaImage
          v-if="product.images !== null && product.images.length > 1"
          class="ca-product-card__image ca-product-card__image--second-image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.images[1]"
          :alt="product.brand.name + ' ' + product.name"
          sizes="(min-width: 1360px) 248px, (min-width: 1024px) 18.23vw, (min-width: 768px) 30.73vw, 48vw"
        />
      </NuxtLink>
      <CaCampaigns
        v-if="product.discountCampaigns && product.discountCampaigns.length"
        class="ca-product-card__campaigns"
        :campaigns="product.discountCampaigns"
      />
      <CaToggleFavorite
        class="ca-product-card__favorite"
        :prod-alias="product.alias"
      />
    </div>
    <CaSkeleton
      v-else
      class="ca-product-card__image-wrap"
      :ratio="$config.productImageRatio"
      :radius="false"
    />

    <div class="ca-product-card__info">
      <NuxtLink v-if="productPopulated" :to="product.canonicalUrl">
        <div class="ca-product-card__info-top">
          <CaBrandAndName
            :brand="product.brand.name"
            :name="product.name"
            name-tag="h2"
          />

          <CaPrice class="ca-product-card__price" :price="product.unitPrice" />
        </div>

        <CaStockDisplay
          class="ca-product-card__stock-display"
          :stock="product.totalStock"
        />
        <div v-if="hasColorVariants" class="ca-product-card__colors">
          Fler färger
        </div>
      </NuxtLink>
      <div v-else>
        <div class="ca-product-card__info-top">
          <div>
            <CaSkeleton width="30%" />
            <CaSkeleton width="70%" />
          </div>

          <CaSkeleton class="ca-product-card__price" width="20%" />
        </div>
      </div>
    </div>
  </component>
</template>
<script>
import MixProductCard from 'MixProductCard';

// @group Organisms
// @vuese
export default {
  name: 'CaProductCard',
  mixins: [MixProductCard],
  props: {},
  data: () => ({}),
  computed: {
    hasColorVariants() {
      return !!this.product?.variantDimensions?.find(
        i => i.dimension === 'Color'
      );
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-product-card {
  position: relative;
  &__image-wrap {
    line-height: 0;
    position: relative;
  }

  &__image {
    transition: opacity 250ms ease;
    opacity: 1;
    &--has-second {
      &:hover {
        opacity: 0;
      }
    }

    &--second-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }
  }

  ::v-deep .ca-product-card__image--second-image.ca-image--product::after {
    display: none;
  }

  &__image-link {
    display: block;
  }
  &__info {
    padding: $px12 $px10 0;
    display: block;
    @include bp(tablet) {
      padding: $px12 0 0;
    }
  }
  &__info-top {
    display: flex;
    justify-content: space-between;
    padding: 0 0 $px12;
    margin: 1.6em 0 0;
  }
  &__price {
    font-size: $font-size-m;
  }
  &__campaigns {
    position: absolute;
    top: rem-calc(10);
    left: rem-calc(10);
    z-index: 2;
    @include bp(tablet) {
      top: rem-calc(20);
      left: rem-calc(20);
    }
  }
  &__colors {
    text-transform: uppercase;
    font-size: $font-size-xs;
    margin: $px4 0 0;
  }
  &__stock-display {
    font-size: $font-size-xs;
  }

  ::v-deep .ca-toggle-favorite {
    width: 26px;
    height: 26px;
    top: auto;
    right: rem-calc(8);
    bottom: rem-calc(8);
    @include bp(tablet) {
      width: 36px;
      height: 36px;
      top: auto;
      right: $px12;
      bottom: $px12;
    }
  }
}
</style>
