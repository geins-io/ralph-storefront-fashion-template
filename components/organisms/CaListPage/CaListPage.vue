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
      family="Productlist"
      area-name="The top part of the product list"
      :filters="widgetAreaFilters"
      :list-page-url="currentPath"
    />
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
        :loading="prevPageLoading"
        @loadprev="loadPrev"
        @reset="resetCurrentPage"
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
        :loading="nextPageLoading"
        @loadmore="loadMore"
        @reset="resetCurrentPage"
      />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="Below the product list"
      :filters="widgetAreaFilters"
    />
  </div>
</template>
<script>
/*
  CaListPage is the main component for the product list pages.
  Please refer to the documentation of MixListPage in Ralph UI for more info.
*/
import MixListPage from 'MixListPage';

export default {
  name: 'CaListPage',
  mixins: [MixListPage],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-list-page';
</style>
