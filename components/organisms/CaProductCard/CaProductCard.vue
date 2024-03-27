<template>
  <component :is="baseTag" class="ca-product-card">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <CaClickable
        class="ca-product-card__image-link"
        :href="product.canonicalUrl"
        :data-alias="product.alias"
        @clicked="productClickHandler"
      >
        <CaImage
          v-if="product.productImages && product.productImages.length > 0"
          class="ca-product-card__image"
          :class="{
            'ca-product-card__image--has-second':
              product.productImages.length > 1,
          }"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              (item) =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186,
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.productImages[0].fileName"
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
          v-if="product.productImages && product.productImages.length > 1"
          class="ca-product-card__image ca-product-card__image--second-image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              (item) =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186,
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.productImages[1].fileName"
          :alt="product.brand.name + ' ' + product.name"
          sizes="(min-width: 1360px) 248px, (min-width: 1024px) 18.23vw, (min-width: 768px) 30.73vw, 48vw"
        />
      </CaClickable>
      <CaCampaigns
        v-show="product.discountCampaigns && product.discountCampaigns.length"
        class="ca-product-card__campaigns"
        :campaigns="product.discountCampaigns || []"
      />
      <CaToggleFavorite
        class="ca-product-card__favorite"
        :prod-alias="product.alias"
        :prod-id="product.productId"
      />
    </div>
    <CaSkeleton
      v-else
      class="ca-product-card__image-wrap"
      :ratio="$config.productImageRatio"
      :radius="false"
    />

    <div class="ca-product-card__info">
      <CaClickable
        v-if="productPopulated"
        tabindex="-1"
        :href="product.canonicalUrl"
        @clicked="productClickHandler"
      >
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
          {{ $t('MULTIPLE_COLOURS') }}
        </div>
      </CaClickable>
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
/*
  This product is the main component for displaying a product card. 
  To understand more about this component, please read the documentation for the MixProductCard in Ralph UI
*/
import MixProductCard from 'MixProductCard';
export default {
  name: 'CaProductCard',
  mixins: [MixProductCard],
  props: {},
  data: () => ({}),
  computed: {
    hasColorVariants() {
      return !!this.product?.variantDimensions?.find(
        (i) => i.dimension === 'Color',
      );
    },
  },
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-product-card';
</style>
