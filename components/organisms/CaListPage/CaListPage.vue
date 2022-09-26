<template>
  <div class="ca-list-page" :class="modifier">
    <CaListTop
      v-if="!hideListInfo"
      :type="type"
      :list-info="listInfo"
      :breadcrumbs-current="breadcrumbsCurrent"
      :widget-area-filters="widgetAreaFilters"
    />
    <CaWidgetArea
      class="ca-list-page__widget-area"
      :family="widgetAreaVars[0].family"
      :area-name="widgetAreaVars[0].areaName"
      :filters="widgetAreaFilters"
      :is-parent-loaded="!isWidgetSmartQuery"
      :loaded-data="widgetData.widgetArea_0"
      @variables-change="isWidgetSmartQuery = true"
    />
    <div>
      <CaContainer>
        <CaListSettings
          v-if="showControls"
          :active-products="totalCount"
          :active-filters="totalFiltersActive"
          :current-sort="selection.sort"
          @sortchange="sortChangeHandler"
        />
        <CaActiveFilters
          v-if="showControls && selection"
          :selection="selection"
          :selection-active="filterSelectionActive"
          @selectionchange="filterChangeHandler"
          @reset="resetFilters"
        />
        <LazyCaFilterPanel
          :filters="filters"
          :selection="selection"
          :selection-active="filterSelectionActive"
          :total-products="totalCount"
          :total-filters-active="totalFiltersActive"
          @selectionchange="filterChangeHandler"
          @reset="resetFilters"
        />

        <CaListPagination
          v-show="currentMinCount > 1"
          direction="prev"
          :showing="showing"
          :total-count="totalCount"
          :min-count="currentMinCount"
          :max-count="currentMaxCount"
          :all-products-loaded="allProductsLoaded"
          :loading="$apollo.queries.products.loading"
          @loadprev="loadPrev"
        />

        <CaProductList
          class="ca-list-page__list"
          :skip="currentMinCount - 1"
          :page-size="pageSize"
          :products="productList"
          :products-fetched="productsFetched"
        />

        <CaListPagination
          v-if="showControls"
          direction="next"
          :showing="showing"
          :total-count="totalCount"
          :min-count="currentMinCount"
          :max-count="currentMaxCount"
          :all-products-loaded="allProductsLoaded"
          :loading="$apollo.queries.products.loading"
          @loadmore="loadMore"
        />
      </CaContainer>
      <CaWidgetArea
        class="ca-list-page__widget-area"
        family="Productlist"
        area-name="Below the product list"
        :filters="widgetAreaFilters"
      />
    </div>
  </div>
</template>
<script>
import MixListPage from 'MixListPage';

// @group Organisms
// @vuese
export default {
  name: 'CaListPage',
  mixins: [MixListPage],
  props: {},
  data: () => ({ isWidgetSmartQuery: false }),
  computed: {
    widgetAreaVars() {
      const obj = {
        family: 'Productlist',
        areaName: 'Above the product list',
        alias: '',
        preview: false
      };
      obj.filters = this.widgetAreaFilters;
      obj.customerType = this.$store.state.customerType;
      obj.displaySetting =
        this.$store.getters.viewport === 'phone' ? 'mobile' : 'desktop';
      const array = [];
      array.push(obj);
      return array;
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-list-page {
  &__image {
    margin: 0 0 $px32 0;
  }
  &__widget-area {
    margin: 0 0 $px32 0;
  }
  &__list {
    @include bp(phone-only) {
      margin: 0 rem-calc(-10);
    }
  }
}
</style>
