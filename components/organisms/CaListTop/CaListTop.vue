<template>
  <div class="ca-list-top">
    <CaWidgetArea
      class="ca-list-top__widget-area"
      family="Productlist"
      area-name="Product list hero"
      :filters="widgetAreaFilters"
    />
    <CaContainer class="ca-list-top__container">
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <div class="ca-list-top__text">
        <h1 v-if="listInfo && !listInfo.hideTitle" class="ca-list-top__title">
          {{ listInfo.name }}
        </h1>
        <CaReadMore
          v-if="
            listInfo &&
              !!listInfo.primaryDescription &&
              !listInfo.hideDescription
          "
          class="ca-list-top__description"
          :max-height="$store.getters.viewportComputer ? 90 : 50"
        >
          <CaHtml :content="listInfo.primaryDescription" />
        </CaReadMore>
      </div>
    </CaContainer>
  </div>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaListTop',
  mixins: [],
  props: {
    type: {
      type: String,
      required: true
    },
    listInfo: {
      type: Object,
      default: () => {}
    },
    breadcrumbsCurrent: {
      type: Object,
      required: true
    },
    widgetAreaFilters: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-list-top {
  --title-text-color: #{$c-text-inverse};
  --body-text-color: #{$c-text-inverse};
  --primary-text-color: #{$c-text-inverse};
  --secondary-text-color: #{$c-text-inverse};

  background: $c-darkest-gray;
  margin: 0 0 rem-calc(50);
  max-height: 35vh;
  min-height: 35vh;
  overflow: hidden;
  position: relative;

  @include bp(tablet) {
    max-height: unset;
    min-height: 30vh;
    overflow: visible;
  }
  @include bp(laptop) {
    min-height: 50vh;
  }

  &__container {
    @include halign;
    bottom: rem-calc(80);
    @include bp(tablet) {
      bottom: auto;
      @include calign;
    }
  }
  &__text {
    width: 100%;
    @include bp(tablet) {
      width: 60%;
      max-width: 700px;
    }
  }
  &__title {
    font-size: rem-calc(36);
    font-weight: $font-weight-bold;
    margin: 0 0 $px4;
    @include bp(tablet) {
      font-size: rem-calc(62);
      margin: 0 0 $px8;
    }
    @include bp(laptop) {
      font-size: rem-calc(82);
    }
    &--skeleton {
      margin: 0 auto $px8;
      @include bp(tablet) {
        margin: 0 0 $px8;
      }
    }
  }

  &__description {
    &--skeleton {
      @include bp(tablet-down) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  &__subcategories {
    margin: $px20 -1.2rem 0 0;
    max-width: 100%;
    @include bp(laptop) {
      margin: -$px8;
      width: 40%;
      max-width: 525px;
    }
  }
}
</style>
