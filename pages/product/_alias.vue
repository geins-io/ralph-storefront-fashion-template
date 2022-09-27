<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product" :product="product" />
    <CaContainer>
      <CaBreadcrumbs
        v-if="product"
        :current="breadcrumbsCurrent"
        :product-name="product.name"
      />
      <CaSkeleton v-else class="ca-breadcrumbs" width="30%" />
      <section class="ca-product-page__section">
        <CaProductGallery
          v-if="product"
          class="ca-product-page__gallery"
          :images="productImages"
          :alt="product.brand.name + ' ' + product.name"
          :campaigns="product.discountCampaigns"
          thumbnail-mode="grid"
          gallery-mode="plain"
        />
        <div v-else class="ca-product-page__gallery ca-product-gallery">
          <div class="ca-product-gallery__slider">
            <div
              class="ca-product-gallery__slide ca-product-page__skeleton-main-slide"
            >
              <CaSkeleton
                class="ca-product-gallery__image"
                :ratio="$config.productImageRatio"
                :radius="false"
              />
            </div>
          </div>
        </div>
        <div v-if="product" class="ca-product-page__main">
          <div class="ca-product-page__main-top">
            <!-- <CaToggleFavorite :prod-alias="prodAlias" /> -->
            <CaBrandAndName
              :brand="product.brand.name"
              :brand-alias="product.brand.canonicalUrl"
              :name="product.name"
              name-tag="h1"
            />
            <CaPrice
              class="ca-product-page__price"
              :price="product.unitPrice"
            />
          </div>

          <CaHtml
            v-if="product && product.texts.text1"
            class="ca-product-page__product-summary"
            :content="product.texts.text1"
          />
          <!-- <a
            v-if="product && product.texts.text1"
            class="ca-product-page__read-more only-computer"
            href="#description-accordion-anchor"
            @click.prevent="readMoreInAccordion"
          >
            {{ $t('READ_MORE') }}
          </a> -->
          <CaVariantPicker
            v-if="hasVariants"
            :variants="baseVariants"
            :variants-data="variantPickerData"
            :title="
              baseVariantType === 'Color' ? $t('PICK_COLOR') : 'Välj lådstorlek'
            "
            :type="baseVariantType === 'Color' ? 'color' : 'panel'"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          >
            <template v-slot:title>
              <p class="ca-variant-picker__title">
                {{
                  baseVariantType === 'Color'
                    ? $t('PICK_COLOR')
                    : $t('PICK_VARIANT')
                }}
              </p>
            </template>
          </CaVariantPicker>

          <!-- <CaVariantPicker
            v-if="hasMultipleDimensions"
            :variants="secondDimensionVariants"
            :variants-data="variantPickerData"
            title="Välj lådstorlek"
            type="panel"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          /> -->

          <CaVariantPicker
            v-if="hasSkuVariants"
            :variants="skuVariants"
            :variants-data="variantPickerData"
            :title="$t('SKU_LABEL')"
            type="display"
            @changeSku="sizeChangeHandler"
            @notify="notifyHandler"
          >
            <template v-slot:title>
              <p class="ca-variant-picker__title">
                {{ $t('PICK_SIZE') }}
                <span class="ca-variant-picker__current">
                  {{ chosenSkuLabel }}
                </span>
              </p>
            </template>
          </CaVariantPicker>

          <CaStockDisplay
            class="ca-product-page__stock-display"
            :stock="currentStock"
            :product-quantity="quantity"
            :show-delivery-time="true"
          />

          <CaButton
            v-if="outOfStock && !hasSkuVariants"
            class="ca-product-page__buy-button"
            type="full-width"
            color="secondary"
            @clicked="notifyHandler(skuVariants[0])"
          >
            {{ $t('NOTIFY_PANEL_BUTTON') }}
          </CaButton>
          <CaButton
            v-else
            class="ca-product-page__buy-button"
            type="full-width"
            size="l"
            :loading="addToCartLoading"
            :disabled="outOfStock"
            @clicked="addToCartClick"
          >
            {{ $t('ADD_TO_CART') }}
          </CaButton>
          <div class="ca-product-page__usps">
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
            >
              {{ $t('USP_1') }}
            </CaIconAndText>
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
            >
              {{ $t('USP_2') }}
            </CaIconAndText>
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
            >
              {{ $t('USP_3') }}
            </CaIconAndText>
          </div>
          <CaProductAccordion
            v-if="product"
            ref="accordion"
            class="ca-product-page__accordion"
            :product="product"
          />
          <div
            v-if="$config.productShowRelated && relatedProductsRelated.length"
            class="ca-product-page__related"
          >
            <h3 class="ca-product-page__related-title">
              {{ $t('RELATED_PRODUCTS') }}
            </h3>
            <CaQuickAddProducts
              class="ca-product-page__related-products"
              :products="relatedProductsRelated"
            />
          </div>
        </div>
        <div
          v-else
          class="ca-product-page__main ca-product-page__main--skeleton"
        >
          <CaSkeleton width="30%" />
          <CaSkeleton width="50%" />
          <CaSkeleton width="20%" />
          <CaSkeleton width="70%" />
          <CaSkeleton
            class="ca-product-page__skeleton-button"
            width="100%"
            height="50px"
          />
        </div>
      </section>
    </CaContainer>
    <section class="ca-product-page__widget-section">
      <CaWidgetArea
        v-if="product"
        class="ca-product-page__widget-area"
        family="Product"
        area-name="Product detail page"
        :filters="widgetAreaFilters"
      />
    </section>
    <LazyCaNotifyPanel
      v-if="product"
      :product="product"
      :variant="currentNotifyVariant"
    />
  </div>
</template>

<script>
import MixAddToCart from 'MixAddToCart';
import MixVariantHandler from 'MixVariantHandler';
import MixProductPage from 'MixProductPage';

export default {
  name: 'ProductPage',
  mixins: [MixProductPage, MixAddToCart, MixVariantHandler],
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {
    readMoreInAccordion() {
      this.$refs.accordion.openAccordion('description');
    }
  },
  meta: {
    pageType: 'Product Page'
  }
};
</script>

<style lang="scss">
$column-width: 48%;
.ca-product-page {
  &__section {
    margin-bottom: $px20;
    @include bp(laptop) {
      align-items: flex-start;
      display: flex;
      justify-content: space-between;
      margin-bottom: $px56;
    }
  }
  &__main {
    margin: rem-calc(50) auto 0;
    max-width: rem-calc(540);
    position: relative;
    @include bp(laptop) {
      position: sticky;
      top: $header-height-computer;
      width: 44%;
      z-index: 1;
    }
    @include bp(desktop) {
      margin: rem-calc(60) auto 0;
    }
  }
  &__main-top {
    display: flex;
    justify-content: space-between;
  }
  &__gallery.ca-product-gallery {
    @include bp(laptop) {
      width: $column-width;
      margin-right: 3%;
    }
  }
  &__skeleton-main-slide {
    @include bp(tablet-down) {
      width: 69.5%;
      margin: 0 auto;
    }
  }
  &__price {
    font-size: rem-calc(24);

    .ca-price__regular {
      font-size: $font-size-m;
    }
    @include bp(tablet) {
      font-size: rem-calc(32);
    }
  }
  &__product-summary {
    margin: $px20 0 $px32;
  }
  &__campaigns {
    margin: 0 0 rem-calc(16);
  }
  &__variant-picker {
    margin-bottom: $default-spacing;
  }
  &__quantity {
    margin-bottom: $px16;
  }
  &__skeleton-button {
    .ca-skeleton + & {
      margin-top: $px32;
    }
  }
  &__buy-button.ca-button {
    margin-bottom: $px20;
  }
  &__stock-display {
    font-size: $font-size-m;
    margin: 0 0 $px20;
  }
  &__actions {
    margin-bottom: $px24;
  }
  &__usps {
    display: flex;
    justify-content: space-between;
  }
  &__usp.ca-icon-and-text {
    padding: 0 $px4;
    align-items: flex-start;
    .ca-icon {
      margin-top: 4px;
      @include bp(tablet) {
        margin-top: 2px;
      }
    }
  }
  &__specifications-box {
    @include bp(laptop) {
      width: $column-width;
      background: $c-lightest-gray;
      padding: 0 $px24 $px16;
    }
  }
  &__specifications-title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    padding: 1rem 0;
  }

  &__related {
    margin: $px32 0 $px20;
  }
  &__related-title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    margin: 0 0 $px20;
  }
}
</style>
