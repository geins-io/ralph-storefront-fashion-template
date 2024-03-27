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
          main-image-sizes="(min-width: 2000px) 811px, 41vw"
          thumbnail-sizes="(min-width: 2000px) 399px, 23vw"
          :preloaded-image="preloadedImage"
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
            <!-- <CaToggleFavorite :prod-alias="prodAlias" :prod-id="product.productId" /> -->
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

          <LazyCaHtml
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

          <LazyCaVariantPicker
            v-if="hasVariants"
            :variants="baseVariants"
            :variants-data="variantPickerData"
            :title="
              baseVariantType === 'Color'
                ? $t('PICK_COLOR')
                : $t('PICK_VARIANT')
            "
            :type="baseVariantType === 'Color' ? 'color' : 'panel'"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          >
            <template #title>
              <p class="ca-variant-picker__title">
                {{
                  baseVariantType === 'Color'
                    ? $t('PICK_COLOR')
                    : $t('PICK_VARIANT')
                }}
                <span
                  v-if="baseVariantType === 'Color'"
                  class="ca-variant-picker__current"
                >
                  {{ baseVariantLabel }}
                </span>
              </p>
            </template>
          </LazyCaVariantPicker>

          <LazyCaVariantPicker
            v-if="hasMultipleDimensions"
            :variants="secondDimensionVariants"
            :variants-data="variantPickerData"
            :title="$t('PICK_VARIANT')"
            type="panel"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          />

          <LazyCaVariantPicker
            v-if="hasSkuVariants"
            :variants="skuVariants"
            :variants-data="variantPickerData"
            :title="$t('PICK_SKU')"
            type="display"
            @changeSku="skuChangeHandler"
            @notify="notifyHandler"
          >
            <template #title>
              <p class="ca-variant-picker__title">
                {{ $t('PICK_SKU') }}
                <span class="ca-variant-picker__current">
                  {{ chosenSkuLabel }}
                </span>
              </p>
            </template>
          </LazyCaVariantPicker>

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
            <LazyCaQuickAddProducts
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
/*
  Renders product page.

  @mixin MixProductPage - handles product page logic

*/

import MixProductPage from 'MixProductPage';

export default {
  name: 'ProductPage',
  mixins: [MixProductPage],
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {
    readMoreInAccordion() {
      this.$refs.accordion.openAccordion('description');
    },
  },
  meta: {
    pageType: 'Product Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/product-page';
</style>
